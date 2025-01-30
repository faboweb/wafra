// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/math/SignedMath.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IAToken.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "../interfaces/IStrategy.sol";

contract AaveStrategy is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    IStrategy
{
    using SignedMath for uint256;

    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    IERC20 public usdc;
    IPool public aavePool;
    IAToken public aToken;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _aavePool,
        address _aToken,
        address _usdc,
        address admin,
        address controller
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        // without these, no one has a role and the contract is bricked
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
        _setRoleAdmin(CONTROLLER_ROLE, ADMIN_ROLE);
        _grantRole(ADMIN_ROLE, admin);
        _grantRole(CONTROLLER_ROLE, admin);
        _grantRole(CONTROLLER_ROLE, controller);

        aavePool = IPool(_aavePool);
        aToken = IAToken(_aToken);
        usdc = IERC20(_usdc);
    }

    //-------------------------------------------------------------------------
    // Actions
    //-------------------------------------------------------------------------

    function deposit(
        uint256 amount
    ) external override onlyRole(CONTROLLER_ROLE) {
        usdc.transferFrom(msg.sender, address(this), amount); // TODO can we do this directly?
        usdc.approve(address(aavePool), amount);
        aavePool.deposit(address(usdc), amount, address(this), 0);
    }

    function withdraw(
        uint256 amount,
        address receiver
    ) external override onlyRole(CONTROLLER_ROLE) returns (uint256) {
        uint256 balance = aavePool.withdraw(
            address(usdc),
            amount,
            address(this)
        );
        usdc.transfer(receiver, balance);
        return balance;
    }

    //--------------------------------------------------------------------------
    // Queries
    //--------------------------------------------------------------------------

    function totalValue() external view override returns (uint256) {
        return aToken.balanceOf(address(this));
    }

    function strategyName() external pure returns (string memory) {
        return "Aave USDC Lending";
    }

    //--------------------------------------------------------------------------
    // UUPS Upgrade
    //--------------------------------------------------------------------------

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(ADMIN_ROLE) {}
}
