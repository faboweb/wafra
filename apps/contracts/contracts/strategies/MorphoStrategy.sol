// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/math/SignedMath.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@morpho-blue/interfaces/IMorpho.sol";
import "@morpho-blue/interfaces/IIrm.sol";
import "../interfaces/IStrategy.sol";

contract MorphoStrategy is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    IStrategy
{
    using SignedMath for uint256;

    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    IERC20 public usdc;
    IMorpho public morpho;
    Id public marketId;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _morpho,
        bytes32 _marketId,
        address _usdc,
        address admin,
        address controller
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
        _setRoleAdmin(CONTROLLER_ROLE, ADMIN_ROLE);
        _grantRole(ADMIN_ROLE, admin);
        _grantRole(CONTROLLER_ROLE, admin);
        _grantRole(CONTROLLER_ROLE, controller);

        morpho = IMorpho(_morpho);
        marketId = Id.wrap(_marketId);
        usdc = IERC20(_usdc);
    }

    //-------------------------------------------------------------------------
    // Actions
    //-------------------------------------------------------------------------

    function deposit(
        uint256 amount
    ) external override onlyRole(CONTROLLER_ROLE) {
        usdc.transferFrom(msg.sender, address(this), amount);
        usdc.approve(address(morpho), amount);
        morpho.supply(marketId, amount, 0, address(this));
    }

    function withdraw(
        uint256 amount,
        address receiver
    ) external override onlyRole(CONTROLLER_ROLE) returns (uint256) {
        uint256 balance = morpho.withdraw(marketId, amount, 0, address(this), receiver);
        return balance;
    }

    //--------------------------------------------------------------------------
    // Queries
    //--------------------------------------------------------------------------

    function totalValue() external view override returns (uint256) {
        MarketParams memory market = morpho.market(marketId);
        (uint256 supplyAssets, ) = morpho.position(marketId, address(this));
        return supplyAssets;
    }

    function strategyName() external pure returns (string memory) {
        return "Morpho Blue USDC Lending";
    }

    //--------------------------------------------------------------------------
    // UUPS Upgrade
    //--------------------------------------------------------------------------

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(ADMIN_ROLE) {}
}
