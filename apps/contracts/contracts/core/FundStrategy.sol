// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./FundStorage.sol";

abstract contract FundStrategy is FundStorage {
    function addStrategy(
        address _strategy,
        uint256 _weight
    ) external onlyRole(CONTROLLER_ROLE) nonReentrant {
        try IStrategy(_strategy).strategyName() returns (string memory) {
            // Strategy interface exists
        } catch {
            revert("Invalid strategy implementation");
        }
        try IStrategy(_strategy).totalValue() returns (uint256) {
            // Strategy interface exists
        } catch {
            revert("Invalid strategy implementation");
        }
        strategies.push(IStrategy(_strategy));
        strategyWeights.push(_weight);
    }

    function setStrategyWeights(
        uint256[] calldata _weights
    ) external onlyRole(CONTROLLER_ROLE) nonReentrant {
        require(_weights.length == strategies.length, "Length mismatch");
        uint256 total;
        for (uint256 i = 0; i < _weights.length; i++) {
            total += _weights[i];
        }
        require(total > 0, "Invalid weights");

        for (uint256 j = 0; j < _weights.length; j++) {
            strategyWeights[j] = _weights[j];
        }
    }

    function getStrategies() external view returns (StrategyInfo[] memory) {
        require(strategies.length == strategyWeights.length, "Not configured");

        StrategyInfo[] memory result = new StrategyInfo[](strategies.length);
        for (uint256 i = 0; i < strategies.length; i++) {
            result[i] = StrategyInfo({
                strategyAddress: address(strategies[i]),
                strategyName: strategies[i].strategyName(),
                strategyWeight: strategyWeights[i],
                value: strategies[i].totalValue()
            });
        }
        return result;
    }

    function removeStrategy(
        uint16 index
    ) external onlyRole(CONTROLLER_ROLE) nonReentrant {
        require(index < strategies.length, "Index out of range");

        strategies[index].emergencyWithdraw();

        strategies[index] = strategies[strategies.length - 1];
        strategies.pop();
        strategyWeights[index] = strategyWeights[strategyWeights.length - 1];
        strategyWeights.pop();
    }

    function deployCapital() external onlyRole(CONTROLLER_ROLE) nonReentrant {
        require(
            strategies.length == strategyWeights.length,
            "strategies not configured properly"
        );

        uint256 totalCapital = usdc.balanceOf(address(this));
        for (uint256 i = 0; i < strategies.length; i++) {
            totalCapital += strategies[i].totalValue();
        }

        uint256 totalWeight = 0;
        for (uint256 w = 0; w < strategyWeights.length; w++) {
            totalWeight += strategyWeights[w];
        }
        if (totalWeight == 0) {
            return;
        }

        for (uint256 i = 0; i < strategies.length; i++) {
            uint256 desired = (totalCapital * strategyWeights[i]) / totalWeight;
            uint256 current = strategies[i].totalValue();
            if (current > desired) {
                strategies[i].withdraw(current - desired, address(this));
            }
        }

        uint256 remaining = usdc.balanceOf(address(this));
        for (uint256 i = 0; i < strategies.length; i++) {
            uint256 desired = (totalCapital * strategyWeights[i]) / totalWeight;
            uint256 current = strategies[i].totalValue();
            if (current < desired) {
                uint256 toDeposit = desired - current;
                if (toDeposit > remaining) {
                    toDeposit = remaining;
                }
                if (toDeposit > 0) {
                    usdc.approve(address(strategies[i]), toDeposit);
                    strategies[i].deposit(toDeposit);
                    remaining -= toDeposit;
                }
            }
        }
    }

    function _withdrawFromStrategies(uint256 amount) internal {
        uint256 remaining = amount;
        uint256 totalWeight = 0;
        for (uint256 i = 0; i < strategies.length; i++) {
            totalWeight += strategyWeights[i];
        }

        // withdraw from the strats according to weights
        for (uint256 i = 0; i < strategies.length; i++) {
            if (remaining == 0) break;
            uint256 reversedIndex = strategies.length - 1 - i;
            uint256 stratValue = strategies[reversedIndex].totalValue();
            if (stratValue == 0) continue;

            uint256 weightedWithdraw = (strategyWeights[reversedIndex] *
                amount) / totalWeight;
            if (weightedWithdraw >= remaining) {
                weightedWithdraw = remaining;
            }
            if (weightedWithdraw > stratValue) {
                weightedWithdraw = stratValue;
            }

            if (weightedWithdraw > 0) {
                strategies[reversedIndex].withdraw(
                    weightedWithdraw,
                    address(this)
                );
                remaining -= weightedWithdraw;
            }
        }

        if (remaining == 0) return;

        // now take the rest linearly from the strats
        for (uint256 i = 0; i < strategies.length; i++) {
            uint256 stratValue = strategies[i].totalValue();
            if (stratValue == 0) continue;
            if (stratValue >= remaining) {
                strategies[i].withdraw(remaining, address(this));
                remaining = 0;
                break;
            }
            strategies[i].withdraw(stratValue, address(this));
            remaining -= stratValue;
        }

        if (remaining > 0) {
            revert("Insufficient funds in strategies");
        }
    }

    function withdraw(uint256 amount, address receiver) public nonReentrant {
        _withdrawFromStrategies(amount);
        usdc.transfer(receiver, amount);
        emit Withdrawal(msg.sender, amount, receiver);
    }

    function emergencyWithdraw() public nonReentrant onlyRole(CONTROLLER_ROLE) {
        uint256 amount = 0;
        for (uint256 i = 0; i < strategies.length; i++) {
            amount += strategies[i].emergencyWithdraw();
        }

        emit EmergencyWithdraw(amount);
    }

    event Withdrawal(
        address indexed user,
        uint256 amount,
        address indexed receiver
    );
    event EmergencyWithdraw(uint256 amount);
}
