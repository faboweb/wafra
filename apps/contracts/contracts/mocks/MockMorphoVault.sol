// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockMorphoVault {
    IERC20 public immutable asset;
    IERC20 public immutable shares;
    uint256 public constant EXCHANGE_RATE = 1e18; // 1:1 exchange rate for simplicity

    constructor(address _asset, address _shares) {
        asset = IERC20(_asset);
        shares = IERC20(_shares);
    }

    function deposit(uint256 assets, address receiver) external returns (uint256) {
        require(asset.transferFrom(msg.sender, address(this), assets), "Transfer failed");
        uint256 sharesToMint = (assets * EXCHANGE_RATE) / 1e18;
        require(shares.transfer(receiver, sharesToMint), "Share transfer failed");
        return sharesToMint;
    }

    function withdraw(uint256 assets, address receiver, address owner) external returns (uint256) {
        uint256 sharesToBurn = (assets * EXCHANGE_RATE) / 1e18;
        require(shares.transferFrom(owner, address(this), sharesToBurn), "Share transfer failed");
        require(asset.transfer(receiver, assets), "Asset transfer failed");
        return sharesToBurn;
    }

    function redeem(uint256 shares_, address receiver, address owner) external returns (uint256) {
        require(shares.transferFrom(owner, address(this), shares_), "Share transfer failed");
        uint256 assets = (shares_ * 1e18) / EXCHANGE_RATE;
        require(asset.transfer(receiver, assets), "Asset transfer failed");
        return assets;
    }

    function maxDeposit(address) external pure returns (uint256) {
        return type(uint256).max;
    }

    function maxWithdraw(address owner) external view returns (uint256) {
        uint256 shareBalance = shares.balanceOf(owner);
        return (shareBalance * 1e18) / EXCHANGE_RATE;
    }

    function previewRedeem(uint256 shares_) external pure returns (uint256) {
        return (shares_ * 1e18) / EXCHANGE_RATE;
    }

    function previewWithdraw(uint256 assets) external pure returns (uint256) {
        return (assets * EXCHANGE_RATE) / 1e18;
    }
} 