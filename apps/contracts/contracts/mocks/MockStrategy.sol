// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interfaces/IStrategy.sol";

contract MockStrategy is IStrategy {
    IERC20 public usdc;

    constructor(address _usdc) {
        usdc = IERC20(_usdc);
    }

    function deposit(uint256 amount) external override {
        // Transfer USDC from sender to this contract
        usdc.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(
        uint256 amount,
        address receiver
    ) external override returns (uint256) {
        usdc.transfer(receiver, amount);
        return amount;
    }

    function totalValue() external view override returns (uint256) {
        return usdc.balanceOf(address(this));
    }

    function strategyName() external pure override returns (string memory) {
        return "Mock Strategy";
    }
}
