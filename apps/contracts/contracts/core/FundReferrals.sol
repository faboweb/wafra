// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "./FundStorage.sol";

abstract contract FundReferrals is FundStorage {
    using EnumerableMap for EnumerableMap.AddressToAddressMap;
    EnumerableMap.AddressToAddressMap private referrals;

    event ReferralAdded(address indexed referrer, address indexed referred);
    event Distribution(uint256 distributedFees);

    function addReferral(address referrer) public {
        referrals.set(msg.sender, referrer);

        emit ReferralAdded(referrer, msg.sender);
    }

    function distribute() internal {
        uint256 supply = fundToken.totalSupply();
        if (supply == 0) return; // No supply means no one to distribute fees to

        uint256 distributedFees = 0;
        address[] memory allReferrals = referrals.keys();
        for (uint32 i = 0; i < allReferrals.length; i++) {
            address referred = allReferrals[i];
            uint256 balance = fundToken.balanceOf(referred);
            uint256 feeShare = (balance * weeklyFeeRate) / 100;
            uint256 referralShare = (referralRate * feeShare) / 100;
            uint256 referredShare = (referredRate * feeShare) / 100;
            fundToken.transfer(referrals.get(referred), referralShare);
            fundToken.transfer(referred, referredShare);
            distributedFees += referralShare;
            distributedFees += referredShare;
        }

        emit Distribution(distributedFees);
    }
}
