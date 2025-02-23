import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";
import { transfer } from "./transfer.js";
import {
  TRANSFER_EVENT_SIGNATURE,
  DEPOSIT_EVENT_SIGNATURE,
  DEPOSIT_TO_EVENT_SIGNATURE,
  REDEMPTION_EVENT_SIGNATURE,
  REDEMPTION_PROCESS_EVENT_SIGNATURE,
} from "./events.js";
import {
  decodeUSDCLog,
  decodeDepositLog,
  decodeDepositToLog,
  decodeRedemptionLog,
  decodeRedemptionProcessLog,
} from "./decoders.js";

const prisma = new PrismaClient();

export interface TopicHandler {
  signature: string;
  decoder: (log: any) => any | null;
  handler: (decoded: any, log: any) => Promise<void>;
}

export const usdcTransferHandler: TopicHandler = {
  signature: TRANSFER_EVENT_SIGNATURE,
  decoder: decodeUSDCLog,
  handler: async (decoded, log) => {
    const depositAddresses = await prisma.wallet
      .findMany({
        select: { depositAddress: true },
      })
      .then((wallets: any[]) => wallets.map((wallet) => wallet.depositAddress));

    const address = decoded.to;
    if (!depositAddresses.includes(address)) return;

    console.log(`🔹 USDC Transfer detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);
    console.log(`From: ${decoded.from}`);
    console.log(`To: ${decoded.to}`);
    console.log(`Amount: ${ethers.formatUnits(decoded.amount, 6)} USDC`);

    await prisma.transaction.create({
      data: {
        type: "usdc.transfer",
        hash: log.transactionHash,
        blockNumber: log.blockNumber,
        from: decoded.from,
        to: decoded.to,
        value: decoded.amount.toString(),
      },
    });

    // Check if deposit already done
    const deposit = await prisma.deposit.findFirst({
      where: { referenceHash: log.transactionHash },
    });
    if (deposit) {
      console.log("Deposit already processed");
      return;
    }

    try {
      const { transferTxHash, depositTxHash, ownerAddress } = await transfer(
        address,
        decoded.amount
      );
      await prisma.deposit.create({
        data: {
          referenceHash: log.transactionHash,
          from: address,
          to: ownerAddress,
          value: decoded.amount.toString(),
          depositTxHash,
          transferTxHash,
        },
      });
      console.log(`Transfer successful: ${depositTxHash}`);
    } catch (error: any) {
      await prisma.deposit.create({
        data: {
          referenceHash: log.transactionHash,
          from: address,
          value: decoded.amount.toString(),
          error: error.message,
        },
      });
      console.log(`Transfer unsuccessful: ${error.message}`);
    }
  },
};

export const depositHandler: TopicHandler = {
  signature: DEPOSIT_EVENT_SIGNATURE,
  decoder: decodeDepositLog,
  handler: async (decoded, log) => {
    console.log(`🔹 Deposit detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);
    console.log(`Amount: ${ethers.formatUnits(decoded.amount, 6)} USDC`);

    await prisma.accountBalance.upsert({
      where: { address: decoded.to },
      update: {
        balance: { increment: decoded.amount.toString() },
        availableBalance: { increment: decoded.amount.toString() },
      },
      create: {
        address: decoded.to,
        balance: decoded.amount.toString(),
        availableBalance: decoded.amount.toString(),
      },
    });
  },
};

export const depositToHandler: TopicHandler = {
  signature: DEPOSIT_TO_EVENT_SIGNATURE,
  decoder: decodeDepositToLog,
  handler: async (decoded, log) => {
    console.log(`🔹 DepositTo detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);
    console.log(`To: ${decoded.to}`);
    console.log(`Amount: ${ethers.formatUnits(decoded.amount, 6)} USDC`);

    await prisma.accountBalance.upsert({
      where: { address: decoded.to },
      update: {
        balance: { increment: decoded.amount.toString() },
        availableBalance: { increment: decoded.amount.toString() },
      },
      create: {
        address: decoded.to,
        balance: decoded.amount.toString(),
        availableBalance: decoded.amount.toString(),
      },
    });
  },
};

export const redemptionHandler: TopicHandler = {
  signature: REDEMPTION_EVENT_SIGNATURE,
  decoder: decodeRedemptionLog,
  handler: async (decoded, log) => {
    console.log(`🔹 Redemption detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);
    console.log(`Amount: ${ethers.formatUnits(decoded.amount, 6)} USDC`);

    await prisma.$transaction([
      prisma.redemptionQueue.create({
        data: {
          address: decoded.to,
          amount: decoded.amount.toString(),
          txHash: log.transactionHash,
        },
      }),
      prisma.accountBalance.update({
        where: { address: decoded.to },
        update: {
          availableBalance: { decrement: decoded.amount.toString() },
        },
      }),
    ]);

    return;
  },
};

export const redemptionProcessHandler: TopicHandler = {
  signature: REDEMPTION_PROCESS_EVENT_SIGNATURE,
  decoder: decodeRedemptionProcessLog,
  handler: async (decoded, log) => {
    console.log(`🔹 Redemption process detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);
    console.log(`Amount: ${ethers.formatUnits(decoded.amount, 6)} USDC`);

    await prisma.redemptionQueue.update({
      where: { txHash: log.transactionHash },
    });
  },
};

export const topicHandlers: TopicHandler[] = [
  usdcTransferHandler,
  depositHandler,
  depositToHandler,
  redemptionHandler,
  redemptionProcessHandler,
];
