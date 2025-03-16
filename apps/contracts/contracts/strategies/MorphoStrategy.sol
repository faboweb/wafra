// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/math/SignedMath.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IStrategy.sol";
import "hardhat/console.sol";

interface IMorphoVault is IERC20 {
    function deposit(
        uint256 assets,
        address receiver
    ) external returns (uint256 shares);

    function withdraw(
        uint256 assets,
        address receiver,
        address owner
    ) external returns (uint256 shares);

    function redeem(
        uint256 shares,
        address receiver,
        address owner
    ) external returns (uint256 assets);

    function maxDeposit(address) external view returns (uint256);

    function maxWithdraw(address owner) external view returns (uint256);

    function previewRedeem(uint256 shares) external view returns (uint256);

    function previewWithdraw(uint256 assets) external view returns (uint256);

    function asset() external view returns (address);
}

contract MorphoStrategy is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    IStrategy
{
    using SignedMath for uint256;

    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    IMorphoVault public vault;
    IERC20 public asset;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _vault,
        address expectedAsset, // usdc
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

        vault = IMorphoVault(_vault);

        require(vault.asset() == expectedAsset, "Invalid vault asset");
        asset = IERC20(vault.asset());
    }

    //-------------------------------------------------------------------------
    // Actions
    //-------------------------------------------------------------------------

    function deposit(
        uint256 amount
    ) external override onlyRole(CONTROLLER_ROLE) {
        asset.transferFrom(msg.sender, address(this), amount);
        asset.approve(address(vault), amount);
        vault.deposit(amount, address(this));
    }

    function withdraw(
        uint256 amount,
        address receiver
    ) external override onlyRole(CONTROLLER_ROLE) returns (uint256) {
        return vault.withdraw(amount, receiver, address(this));
    }

    //--------------------------------------------------------------------------
    // Queries
    //--------------------------------------------------------------------------

    function totalValue() external view override returns (uint256) {
        uint256 shares = vault.balanceOf(address(this));
        return vault.previewRedeem(shares);
    }

    function strategyName() external pure returns (string memory) {
        return "Morpho USDC Vault Strategy";
    }

    //--------------------------------------------------------------------------
    // UUPS Upgrade
    //--------------------------------------------------------------------------

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(ADMIN_ROLE) {}

    //--------------------------------------------------------------------------
    // Emergency Functions
    //--------------------------------------------------------------------------

    function emergencyWithdraw()
        external
        onlyRole(CONTROLLER_ROLE)
        returns (uint256)
    {
        uint256 shares = vault.balanceOf(address(this));
        if (shares > 0) {
            vault.redeem(shares, address(this), address(this));
        }

        uint256 balance = asset.balanceOf(address(this));
        if (balance > 0) {
            asset.transfer(msg.sender, balance);
        }

        return balance;
    }
}
