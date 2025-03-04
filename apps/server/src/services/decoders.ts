import { ethers } from "ethers";

export function decodeUSDCLog(log: any) {
  // Event: Transfer(address indexed from, address indexed to, uint256 value)
  if (!log.topics || log.topics.length < 3) {
    throw new Error("Invalid log format: missing topics");
  }

  // For indexed parameters, get them from topics instead of data
  const from = ethers.getAddress("0x" + log.topics[1].slice(26));
  const to = ethers.getAddress("0x" + log.topics[2].slice(26));

  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
    ["uint256"],
    log.data
  );

  return {
    from,
    to,
    amount: decoded[0],
  };
}

export function decodeDepositLog(log: any) {
  // Event: Deposit(address indexed user, uint256 amount, address receiver)
  if (!log.topics || log.topics.length < 2) {
    throw new Error("Invalid log format: missing topics");
  }

  // Get indexed user from topics
  const user = ethers.getAddress("0x" + log.topics[1].slice(26));

  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
    ["uint256", "address"],
    log.data
  );

  return {
    user,
    amount: decoded[0],
    to: decoded[1],
  };
}

export const decodeRedemptionLog = (log: any) => {
  // Event: RedemptionRequested(address indexed user, uint256 amount, uint256 index)
  if (!log.topics || log.topics.length < 2) {
    throw new Error("Invalid log format: missing topics");
  }

  // Get indexed user from topics
  const user = ethers.getAddress("0x" + log.topics[1].slice(26));

  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
    ["uint256", "uint256"],
    log.data
  );

  return {
    to: user,
    amount: decoded[0],
    index: decoded[1],
  };
};

export const decodeRedemptionProcessLog = (log: any) => {
  // Event: RedemptionProcessed(uint256 start, uint256 end, address[] processedRedemptions)
  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
    ["uint256", "uint256", "address[]"],
    log.data
  );
  return {
    start: decoded[0],
    end: decoded[1],
    users: decoded[2],
  };
};

export const decodeProtocolFeesCollectedLog = (log: any) => {
  // Event: ProtocolFeesCollected(uint256 feeAmount, uint256 sharesToMint, address treasury)
  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
    ["uint256", "uint256", "address"],
    log.data
  );
  return {
    feeAmount: decoded[0],
    sharesToMint: decoded[1],
    treasury: decoded[2],
  };
};
