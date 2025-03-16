// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./FundToken.sol";
import "../interfaces/IStrategy.sol";

abstract contract FundStorage is
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable,
    AccessControlUpgradeable
{
    struct StrategyInfo {
        address strategyAddress;
        string strategyName;
        uint256 strategyWeight;
        uint256 value;
    }

    // Core token contracts
    IERC20 public usdc;
    FundToken public fundToken;

    // Strategy management
    IStrategy[] public strategies;
    uint256[] public strategyWeights;

    // Fee management
    uint256 public weeklyFeeRate = 3770; // 0.0377% weekly -> 2% APY
    uint256 public lastFeeCollection;
    address public treasury;

    // Referrals
    uint256 public referralRate = 2500000; // 25% of yield collected -> 0.5% APY
    uint256 public referredRate = 500000; // 5% of yield collected -> 0.1% APY

    // Events
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");

    // Total value of the fund based on value in strategies and usdc balance
    function totalValue() public view virtual returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < strategies.length; i++) {
            total += strategies[i].totalValue();
        }
        total += usdc.balanceOf(address(this));
        return total;
    }

    // value of tokens in USD according to share in fund value
    function fundAmount(uint256 amount) public view returns (uint256) {
        return (amount * fundToken.totalSupply()) / totalValue();
    }
}
