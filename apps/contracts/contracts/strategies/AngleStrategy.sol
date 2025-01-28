// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IStrategy.sol";

contract StrategyAngle is IStrategy {
    IERC20 public usdc;
    IERC20 public ausd;

    constructor(address _usdc, address _ausd) {
        usdc = IERC20(_usdc);
        ausd = IERC20(_ausd);
    }

    function deposit(uint256 amount) external override {
        usdc.transferFrom(msg.sender, address(this), amount);
        // Placeholder: actual Angle Protocol deposit or swap logic
        ausd.transfer(msg.sender, amount);
    }

    function withdraw(uint256 amount) external override returns (uint256) {
        // Placeholder: actual Angle Protocol withdrawal or reverse swap logic
        ausd.transferFrom(msg.sender, address(this), amount);
        usdc.transfer(msg.sender, amount);
        return amount;
    }

    function totalValue() external view override returns (uint256) {
        // Placeholder: track AUSD balance or on-chain logic for current value
        return ausd.balanceOf(address(this));
    }

    function strategyName() external pure override returns (string memory) {
        return "Angle Savings";
    }
}
