// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/math/SignedMath.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IAToken.sol";
import "../interfaces/IStrategy.sol";

contract AaveStrategy is IStrategy {
    using SignedMath for uint256;

    IERC20 public immutable usdc;
    IPool public aavePool;
    IAToken public aToken;

    constructor(address _aavePool, address _aToken, address _usdc) {
        aavePool = IPool(_aavePool);
        aToken = IAToken(_aToken);
        usdc = IERC20(_usdc);
    }

    function deposit(uint256 amount) external override {
        usdc.approve(address(aavePool), amount);
        aavePool.supply(address(usdc), amount, msg.sender, 0);
    }

    function withdraw(uint256 amount) external override returns (uint256) {
        return aavePool.withdraw(address(usdc), amount, msg.sender);
    }

    function totalValue() external view override returns (uint256) {
        return aToken.balanceOf(address(this));
    }

    function strategyName() external pure returns (string memory) {
        return "Aave USDC Lending";
    }
}
