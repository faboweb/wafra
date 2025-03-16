// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./FundStorage.sol";
import "./FundStrategy.sol";
import "./FundFeeCollection.sol";
import "./FundERC20.sol";

// FundStrategy defines extensions like UUPSUpgradeable, ReentrancyGuardUpgradeable, OwnableUpgradeable
contract FundContract is
    FundStorage,
    FundStrategy,
    FundFeeCollection,
    FundERC20
{
    function initialize(
        address _usdc,
        address _fundToken
    ) external initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
        __ERC20_init("Wafra Lending Union", "WLU");

        usdc = IERC20(_usdc);
        fundToken = FundToken(_fundToken);
        treasury = msg.sender; // Default treasury is contract deployer
        lastFeeCollection = block.timestamp;
    }

    //--------------------------------------------------------------------------
    // UUPS Upgrade
    //--------------------------------------------------------------------------

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function upgradeToken(address newImplementation) external onlyOwner {
        UUPSUpgradeable(address(fundToken)).upgradeToAndCall(
            newImplementation,
            ""
        );
    }
}
