// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStrategy {
    function deposit(uint256 amount) external;

    function withdraw(
        uint256 amount,
        address receiver
    ) external returns (uint256);

    function totalValue() external view returns (uint256);

    function strategyName() external pure returns (string memory);
}
