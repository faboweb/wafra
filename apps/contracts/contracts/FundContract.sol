// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./WFRToken.sol";
import "./interfaces/IStrategy.sol";

contract FundContract is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuard
{
    IERC20 public usdc;
    WFRToken public wfrToken;
    IStrategy[] public strategies;
    uint256[] public strategyWeights;

    // The principle of the fund we don't charge fees on as
    // it didn't have any gains yet
    // or we charged fees on it already
    uint256 public fundPrincipleAfterFees;
    uint256 public protocolFee;
    address public treasury;
    address public treasuryManager;

    struct RedemptionRequest {
        address user;
        uint256 amount;
    }

    RedemptionRequest[] public redemptionQueue;

    mapping(address => bool) public whitelisted;

    modifier onlyWhitelisted() {
        require(
            owner() == msg.sender || whitelisted[msg.sender],
            "Not allowed"
        );
        _;
    }

    modifier onlyTreasuryManager() {
        require(
            msg.sender == treasuryManager || msg.sender == owner(),
            "Not allowed"
        );
        _;
    }

    function initialize(address _usdc, address _wfrToken) external initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();

        usdc = IERC20(_usdc);
        wfrToken = WFRToken(_wfrToken);
        protocolFee = 10; // Default protocol fee
        whitelisted[msg.sender] = true;
        treasury = msg.sender; // Default treasury is contract deployer
    }

    //--------------------------------------------------------------------------
    // Access Control
    //--------------------------------------------------------------------------

    function setWhitelist(address _addr, bool _allowed) external onlyOwner {
        require(_addr != address(0), "Invalid address");
        whitelisted[_addr] = _allowed;
    }

    function setTreasuryManager(address _manager) external onlyOwner {
        require(_manager != address(0), "Invalid address");
        treasuryManager = _manager;
    }

    function updateTreasury(address _newTreasury) external onlyTreasuryManager {
        require(_newTreasury != address(0), "Invalid address");
        treasury = _newTreasury;
    }

    //--------------------------------------------------------------------------
    // Strategy Management
    //--------------------------------------------------------------------------

    function addStrategy(
        address _strategy,
        uint256 _weight
    ) external onlyWhitelisted {
        strategies.push(IStrategy(_strategy));
        strategyWeights.push(_weight);
    }

    function setStrategyWeights(
        uint256[] calldata _weights
    ) external onlyWhitelisted {
        require(_weights.length == strategies.length, "Length mismatch");
        uint256 total;
        for (uint256 i = 0; i < _weights.length; i++) {
            total += _weights[i];
        }
        require(total > 0, "Invalid weights");

        for (uint256 j = 0; j < _weights.length; j++) {
            strategyWeights[j] = _weights[j];
        }
    }

    //--------------------------------------------------------------------------
    // Deposit
    //--------------------------------------------------------------------------

    /**
     * @dev Deposits USDC into the fund, mints WFR tokens based on fund share price
     */
    function deposit(
        uint256 amount,
        string calldata userMemo
    ) external nonReentrant {
        require(amount > 0, "Invalid deposit");

        // Transfer USDC to the contract
        usdc.transferFrom(msg.sender, address(this), amount);

        // Mint WFR tokens to the user
        _mintWFRForDeposit(amount, msg.sender);

        // Update the principle of the fund we don't charge fees on
        fundPrincipleAfterFees += amount;

        emit Deposit(msg.sender, amount, userMemo);
    }

    function _mintWFRForDeposit(
        uint256 depositAmount,
        address account
    ) internal {
        uint256 fundValue = _currentFundValue();
        uint256 currentSupply = wfrToken.totalSupply();

        uint256 sharesToMint;
        if (currentSupply == 0 || fundValue == 0) {
            // If first deposit or no value, mint 1:1
            sharesToMint = depositAmount;
        } else {
            // sharesToMint = depositAmount * currentSupply / fundValue
            sharesToMint = (depositAmount * currentSupply) / fundValue;
        }

        wfrToken.mint(account, sharesToMint);
    }

    //--------------------------------------------------------------------------
    // Deploy Capital
    //--------------------------------------------------------------------------

    /**
     * @dev Deploys contract USDC to each strategy according to strategyWeights
     */
    function deployCapital() external onlyWhitelisted nonReentrant {
        require(strategies.length == strategyWeights.length, "Not configured");

        uint256 balance = usdc.balanceOf(address(this));
        uint256 totalWeight;
        for (uint256 w = 0; w < strategyWeights.length; w++) {
            totalWeight += strategyWeights[w];
        }

        for (uint256 i = 0; i < strategies.length; i++) {
            uint256 amount = (balance * strategyWeights[i]) / totalWeight;
            if (amount > 0) {
                usdc.approve(address(strategies[i]), amount);
                strategies[i].deposit(amount);
            }
        }
    }

    //--------------------------------------------------------------------------
    // Redemption
    //--------------------------------------------------------------------------

    /**
     * @dev User requests redemption by transferring WFR tokens into this contract.
     *      The tokens remain locked here until redeemed in a batch by `processRedemptionsBatch`.
     */
    function requestRedemption(uint256 amount) external nonReentrant {
        require(wfrToken.balanceOf(msg.sender) >= amount, "Insufficient WFR");

        wfrToken.transferFrom(msg.sender, address(this), amount);

        redemptionQueue.push(RedemptionRequest(msg.sender, amount));
    }

    /**
     * @dev Processes redemptions after ensuring fees are collected
     */
    function processRedemptionsBatch(
        uint256 start,
        uint256 batchSize
    ) external onlyWhitelisted nonReentrant {
        if (redemptionQueue.length == 0) return;

        // First collect any pending fees
        uint256 currentValue = _currentFundValue();
        if (currentValue > fundPrincipleAfterFees) {
            this.collectProtocolFees();
        }

        require(start < redemptionQueue.length, "Start out of range");
        uint256 end = start + batchSize;
        if (end > redemptionQueue.length) {
            end = redemptionQueue.length;
        }

        uint256 totalSupply = wfrToken.totalSupply();
        require(totalSupply > 0, "No WFR tokens exist");

        // Process each redemption without taking additional fees
        for (uint256 i = start; i < end; i++) {
            RedemptionRequest memory request = redemptionQueue[i];
            if (request.amount == 0) continue; // Skip already processed requests

            uint256 userShares = request.amount;
            uint256 userValue = (currentValue * userShares) / totalSupply;

            // Burn tokens and transfer USDC
            wfrToken.burn(address(this), userShares);
            usdc.transfer(request.user, userValue);
            redemptionQueue[i].amount = 0;
        }

        // Update fundPrincipleAfterFees to reflect redemptions
        fundPrincipleAfterFees = _currentFundValue();

        emit RedemptionProcessed(start, end);
    }

    //--------------------------------------------------------------------------
    // Fee Calculation (Separate from Redemption)
    //--------------------------------------------------------------------------

    /**
     * @dev Collects protocol fees on any new gains since last collection
     * @return feeAmount The amount of fees collected
     */
    function collectProtocolFees()
        external
        onlyWhitelisted
        nonReentrant
        returns (uint256)
    {
        uint256 currentValue = _currentFundValue();
        require(
            currentValue > fundPrincipleAfterFees,
            "No new gains to collect"
        );

        // Calculate new gains since last fee collection
        uint256 newGains = currentValue - fundPrincipleAfterFees;

        // Calculate fee amount
        uint256 feeAmount = (newGains * protocolFee) / 100;

        // Calculate shares to mint
        uint256 totalSupply = wfrToken.totalSupply();
        uint256 sharesToMint = (feeAmount * totalSupply) / currentValue;

        // Mint to treasury this dilutes everyone proportionally
        // This has the same effect as withdrawing the fee and sending it to the treasury
        wfrToken.mint(treasury, sharesToMint);

        // Update tracking
        fundPrincipleAfterFees = currentValue;

        emit ProtocolFeesCollected(feeAmount, sharesToMint, treasury);
        return sharesToMint;
    }

    //--------------------------------------------------------------------------
    // Internal Helpers
    //--------------------------------------------------------------------------

    function _currentFundValue() internal view returns (uint256) {
        uint256 total;
        for (uint256 i = 0; i < strategies.length; i++) {
            total += strategies[i].totalValue();
        }
        total += usdc.balanceOf(address(this));
        return total;
    }

    function _withdrawFromStrategies(uint256 amount) internal {
        uint256 remaining = amount;
        for (uint256 i = 0; i < strategies.length; i++) {
            uint256 val = strategies[i].totalValue();
            if (val == 0) continue;

            uint256 toWithdraw = remaining < val ? remaining : val;
            strategies[i].withdraw(toWithdraw);
            remaining -= toWithdraw;

            if (remaining == 0) break;
        }
    }

    //--------------------------------------------------------------------------
    // UUPS Upgrade
    //--------------------------------------------------------------------------

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    //--------------------------------------------------------------------------
    // Queries
    //--------------------------------------------------------------------------

    /**
     * @dev Returns the current gains that haven't had fees taken yet
     */
    function getPendingFees() external view returns (uint256) {
        uint256 currentValue = _currentFundValue();
        if (currentValue <= fundPrincipleAfterFees) return 0;

        uint256 newGains = currentValue - fundPrincipleAfterFees;
        return (newGains * protocolFee) / 100;
    }

    /**
     * @dev Returns the current redemption queue
     */
    function getRedemptionQueue()
        external
        view
        returns (RedemptionRequest[] memory)
    {
        return redemptionQueue;
    }

    /**
     * Events
     */

    event ProtocolFeesCollected(
        uint256 feeAmount,
        uint256 sharesToMint,
        address treasury
    );
    event Deposit(address indexed user, uint256 amount, string memo);
    event RedemptionProcessed(uint256 start, uint256 end);
}
