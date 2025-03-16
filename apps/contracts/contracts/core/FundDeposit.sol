// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./FundStrategy.sol";

abstract contract FundDeposit is FundStrategy {
    function _deposit(uint256 amount, address userAddress) internal {
        require(amount > 0, "Invalid deposit");
        require(userAddress != address(0), "Invalid user address");

        // Transfer USDC to the contract
        usdc.transferFrom(msg.sender, address(this), amount);

        // Mint Fund tokens to the user
        _mintFundTokenForDeposit(amount, userAddress);

        emit Deposit(msg.sender, amount, userAddress);
    }

    function deposit(uint256 amount) external nonReentrant {
        _deposit(amount, msg.sender);
    }

    function depositTo(
        uint256 amount,
        address receiverAddress
    ) external nonReentrant {
        _deposit(amount, receiverAddress);
    }

    function _mintFundTokenForDeposit(
        uint256 depositAmount,
        address account
    ) internal {
        uint256 fundValue = totalValue() - depositAmount;
        uint256 currentSupply = fundToken.totalSupply();

        uint256 sharesToMint;
        if (currentSupply == 0 || fundValue == 0) {
            // If first deposit or no value, mint 1:1
            sharesToMint = depositAmount;
        } else {
            // we need to multiply by 1e18 to avoid precision loss
            sharesToMint =
                (depositAmount * currentSupply * 1e18) /
                fundValue /
                1e18;
        }
        if (sharesToMint == 0) {
            revert(
                string.concat(
                    "Shares to mint is 0. Supply: ",
                    Strings.toString(currentSupply),
                    " Value: ",
                    Strings.toString(fundValue),
                    " Deposit: ",
                    Strings.toString(depositAmount)
                )
            );
        }

        fundToken.mint(account, sharesToMint);
    }

    event Deposit(address indexed user, uint256 amount, address receiver);
}
