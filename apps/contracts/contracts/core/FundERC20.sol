// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./FundStorage.sol";

// This abstraction allows to query value of tokens in comparison to actual token amount
// A simplification for UIs and users
abstract contract FundERC20 is FundStorage, ERC20Upgradeable {
    /**
     * @notice Returns the number of decimals used for user representation
     */
    function decimals() public pure override returns (uint8) {
        return 6;
    }

    /**
     * @notice Returns the total supply of tokens
     * @dev This represents the total value of the fund
     */
    function totalSupply() public view override returns (uint256) {
        return totalValue();
    }

    /**
     * @notice Returns the balance of the given account
     * @param account The address to query the balance of
     * @return The account's balance in USDC value
     */
    function balanceOf(address account) public view override returns (uint256) {
        uint256 _totalSupply = fundToken.totalSupply();
        if (_totalSupply == 0) return 0;
        return (fundToken.balanceOf(account) * totalValue()) / _totalSupply;
    }

    /**
     * @notice Transfer tokens to a specified address
     * @param recipient The address to transfer to
     * @param amount The amount to transfer
     */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        uint256 senderBalance = balanceOf(msg.sender);
        require(senderBalance >= amount, "Insufficient balance");

        uint256 _totalSupply = fundToken.totalSupply();
        require(_totalSupply > 0, "No supply");

        uint256 fundTokenAmount = (amount * _totalSupply) / totalValue();
        fundToken.burn(msg.sender, fundTokenAmount);
        fundToken.mint(recipient, fundTokenAmount);

        return true;
    }

    /**
     * @notice Transfer tokens from one address to another
     * @param sender The address to transfer from
     * @param recipient The address to transfer to
     * @param amount The amount to transfer
     */
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        uint256 senderBalance = balanceOf(sender);
        require(senderBalance >= amount, "Insufficient balance");

        uint256 currentAllowance = fundToken.allowance(sender, msg.sender);
        require(currentAllowance >= amount, "Insufficient allowance");

        uint256 _totalSupply = fundToken.totalSupply();
        require(_totalSupply > 0, "No supply");

        uint256 fundTokenAmount = (amount * _totalSupply) / totalValue();
        fundToken.burn(sender, fundTokenAmount);
        fundToken.mint(recipient, fundTokenAmount);

        return true;
    }
} 