// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./FundStorage.sol";
import "./FundReferrals.sol";

abstract contract FundFeeCollection is FundStorage, FundReferrals {
    // Events
    event ProtocolFeesCollected(
        uint256 feeAmount,
        uint256 fundTokenAmount,
        address treasury
    );

    /**
     * @notice Collects protocol fees by minting new shares to the treasury
     * @dev Fees are collected weekly as a flat 2% APY on total supply
     */
    function collectProtocolFees()
        external
        onlyRole(CONTROLLER_ROLE)
        nonReentrant
    {
        require(
            block.timestamp >= lastFeeCollection + 1 weeks,
            "Too soon to collect fees"
        );

        uint256 currentValue = totalValue();
        uint256 _totalSupply = fundToken.totalSupply();
        require(_totalSupply > 0, "No supply");

        // Calculate weekly rate (2% APY = ~0.0377% weekly)
        // weekly_rate = (1 + 0.02)^(1/52) - 1
        // Approximated as 0.0377% = 3.77 basis points per week
        uint256 weeklyRate = weeklyFeeRate;

        // Calculate fund tokens to mint based on weekly rate
        uint256 fundTokenAmount = (_totalSupply * weeklyRate) / 10000 / 100; // percentage is 1e6 and then we need to div by percent

        // Mint new fund tokens to treasury
        fundToken.mint(treasury, fundTokenAmount);

        // Update last collection time
        lastFeeCollection = block.timestamp;

        emit ProtocolFeesCollected(
            (currentValue * weeklyRate) / 10000 / 100, // percentage is 1e6 and then we need to div by percent
            fundTokenAmount,
            treasury
        );

        distribute();
    }

    function setWeeklyFeeRate(uint256 _fee) external onlyOwner {
        require(_fee <= 50000, "Fee too high"); // 0.5% per week -> > 28% per year
        weeklyFeeRate = _fee;
    }

    function setTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Invalid address");
        treasury = _newTreasury;
    }

    /**
     * @notice Returns the amount of fees that can be collected
     * @return The amount of fund tokens that would be minted as fees
     */
    function getPendingFees() external view returns (uint256) {
        if (block.timestamp < lastFeeCollection + 1 weeks) return 0;

        uint256 _totalSupply = fundToken.totalSupply();
        if (_totalSupply == 0) return 0;

        return (_totalSupply * weeklyFeeRate) / 10000 / 100; // 3.77 basis points weekly rate
    }
}
