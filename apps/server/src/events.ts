import { keccak256, toUtf8Bytes } from "ethers";

// Event signatures
export const TRANSFER_EVENT_SIGNATURE = keccak256(
  toUtf8Bytes("Transfer(address,address,uint256)")
);
export const DEPOSIT_EVENT_SIGNATURE = keccak256(
  toUtf8Bytes("Deposit(uint256)")
);
export const DEPOSIT_TO_EVENT_SIGNATURE = keccak256(
  toUtf8Bytes("DepositTo(address,uint256)")
);
export const WITHDRAW_EVENT_SIGNATURE = keccak256(
  toUtf8Bytes("Withdraw(uint256)")
);
export const REDEMPTION_EVENT_SIGNATURE = "Redemption(address,uint256)";
export const REDEMPTION_PROCESS_EVENT_SIGNATURE =
  "RedemptionProcess(address,uint256)";
