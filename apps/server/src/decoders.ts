import { ethers } from "ethers";

export function decodeUSDCLog(log: any) {
  try {
    if (!log.topics || log.topics.length < 3) {
      throw new Error("Invalid log format: missing topics");
    }

    const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
      ["uint256"],
      log.data
    );

    return {
      from: ethers.getAddress("0x" + log.topics[1].slice(26)),
      to: ethers.getAddress("0x" + log.topics[2].slice(26)),
      amount: decoded[0],
    };
  } catch (error) {
    console.error("Error decoding USDC log:", error);
    return null;
  }
}

export function decodeDepositLog(log: any) {
  try {
    const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
      ["uint256"],
      log.data
    );
    return {
      amount: decoded[0],
    };
  } catch (error) {
    console.error("Error decoding deposit log:", error);
    return null;
  }
}

export function decodeDepositToLog(log: any) {
  try {
    const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
      ["uint256"],
      log.data
    );
    return {
      to: ethers.getAddress("0x" + log.topics[1].slice(26)),
      amount: decoded[0],
    };
  } catch (error) {
    console.error("Error decoding depositTo log:", error);
    return null;
  }
}

export function decodeWithdrawLog(log: any) {
  try {
    const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
      ["uint256"],
      log.data
    );
    return {
      amount: decoded[0],
    };
  } catch (error) {
    console.error("Error decoding withdraw log:", error);
    return null;
  }
}

export const decodeRedemptionLog = (log: any) => {
  return {
    to: log.args[0],
    amount: log.args[1],
  };
};

export const decodeRedemptionProcessLog = (log: any) => {
  return {
    start: log.args[0],
    end: log.args[1],
    requests: log.args[2],
  };
};
