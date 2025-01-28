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
        address _usdc
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        // without these, no one has a role and the contract is bricked
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
        _setRoleAdmin(CONTROLLER_ROLE, ADMIN_ROLE);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(CONTROLLER_ROLE, msg.sender);

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
        usdc.approve(address(aavePool), amount);
        aavePool.supply(address(usdc), amount, msg.sender, 0);
    }

    function withdraw(
        uint256 amount
    ) external override onlyRole(CONTROLLER_ROLE) returns (uint256) {
        return aavePool.withdraw(address(usdc), amount, msg.sender);
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
