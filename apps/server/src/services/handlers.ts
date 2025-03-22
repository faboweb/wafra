import { ethers } from "ethers";
import {
  decodeUSDCLog,
  decodeDepositLog,
  decodeRedemptionLog,
  decodeRedemptionProcessLog,
  decodeProtocolFeesCollectedLog,
} from "./decoders";
import prisma from "../db";
import { transfer } from "./transfer";
import { updateAccountYield } from "./balance";
import { depositAddresses } from "./wallets";

const USDC_CONTRACT = process.env.USDC_CONTRACT!.toLowerCase();
const FUND_CONTRACT = process.env.FUND_CONTRACT!.toLowerCase();

export interface TopicHandler {
  signature: string;
  decoder: (log: any) => any | null;
  handler: (decoded: any, log: any) => Promise<void>;
  contract: string;
  filter?: (log: any) => boolean;
}

export const usdcTransferHandler: TopicHandler = {
  signature: "Transfer(address,address,uint256)",
  decoder: decodeUSDCLog,
  contract: USDC_CONTRACT,
  filter: (log: any) => {
    const to = "0x" + log.topics[2].slice(-26);
    return depositAddresses.includes(to);
  },
  handler: async (decoded, log) => {
    const address = decoded.to;

    console.log(`🔹 USDC Transfer detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);
    console.log(`From: ${decoded.from}`);
    console.log(`To: ${decoded.to}`);
    console.log(`Amount: ${ethers.formatUnits(decoded.amount, 6)} USDC`);

    await prisma.transaction.upsert({
      create: {
        type: "usdc.transfer",
        hash: log.transactionHash,
        blockNumber: log.blockNumber,
        from: decoded.from,
        to: decoded.to,
        value: decoded.amount.toString(),
      },
      update: {},
      where: { hash: log.transactionHash },
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
      await prisma.$transaction([
        prisma.deposit.upsert({
          create: {
            referenceHash: log.transactionHash,
            from: address,
            to: ownerAddress,
            value: decoded.amount.toString(),
            depositTxHash,
            transferTxHash,
          },
          update: {},
          where: { referenceHash: log.transactionHash },
        }),
        prisma.order.update({
          where: {
            depositAddress: address,
            usdcAmount: decoded.amount,
          },
          data: {
            status: "completed",
          },
        }),
      ]);
      console.log(`Transfer successful: ${depositTxHash}`);
    } catch (error: any) {
      await prisma.deposit.upsert({
        create: {
          referenceHash: log.transactionHash,
          from: address,
          value: decoded.amount.toString(),
          error: error.message,
        },
        update: {},
        where: { referenceHash: log.transactionHash },
      });
      console.log(`Transfer unsuccessful: ${error.message}`);
    }
  },
};

export const depositHandler: TopicHandler = {
  signature: "Deposit(address,uint256,address)",
  decoder: decodeDepositLog,
  contract: FUND_CONTRACT,
  handler: async (decoded, log) => {
    console.log(`🔹 Deposit detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);
    console.log(`Amount: ${ethers.formatUnits(decoded.amount, 6)} USDC`);
    const updateAccountYieldTx = await updateAccountYield(decoded.to);
    const txs = [
      prisma.transaction.upsert({
        create: {
          type: "deposit",
          hash: log.transactionHash,
          blockNumber: log.blockNumber,
          from: decoded.to,
          to: FUND_CONTRACT,
          value: decoded.amount.toString(),
        },
        update: {},
        where: { hash: log.transactionHash },
      }),
      prisma.accountBalance.upsert({
        where: { address: decoded.to },
        update: {
          balance: { increment: decoded.amount.toString() },
          availableBalance: { increment: decoded.amount.toString() },
        },
        create: {
          address: decoded.to,
          balance: decoded.amount.toString(),
          availableBalance: decoded.amount.toString(),
          yieldLastUpdatedAt: new Date(),
        },
      }),
    ];
    if (updateAccountYieldTx) {
      txs.push(
        prisma.accountBalance.update({
          where: { address: updateAccountYieldTx.address },
          data: updateAccountYieldTx.data,
        })
      );
    }

    await prisma.$transaction(txs);
  },
};

export const redemptionHandler: TopicHandler = {
  signature: "RedemptionRequested(address,uint256,uint256)",
  decoder: decodeRedemptionLog,
  contract: FUND_CONTRACT,
  handler: async (decoded, log) => {
    console.log(`🔹 Redemption detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);
    console.log(`Amount: ${ethers.formatUnits(decoded.amount, 6)} USDC`);

    const updateAccountYieldTx = await updateAccountYield(decoded.to);
    const txs = [
      prisma.transaction.upsert({
        create: {
          type: "redemption.requested",
          hash: log.transactionHash,
          blockNumber: log.blockNumber,
          from: decoded.to,
          to: FUND_CONTRACT,
          value: decoded.amount.toString(),
        },
        update: {},
        where: { hash: log.transactionHash },
      }),
      prisma.redemptionQueue.upsert({
        create: {
          address: decoded.to,
          amount: decoded.amount.toString(),
          txHash: log.transactionHash,
          index: decoded.index,
        },
        update: {},
        where: { index: decoded.index, txHash: log.transactionHash },
      }),
      prisma.accountBalance.update({
        where: { address: decoded.to },
        data: {
          availableBalance: { decrement: decoded.amount.toString() },
        },
      }),
    ];
    if (updateAccountYieldTx) {
      txs.push(
        prisma.accountBalance.update({
          where: { address: updateAccountYieldTx.address },
          data: updateAccountYieldTx.data,
        })
      );
    }

    await prisma.$transaction(txs);

    return;
  },
};

export const redemptionProcessHandler: TopicHandler = {
  signature: "RedemptionProcessed(uint256,uint256,address[])",
  decoder: decodeRedemptionProcessLog,
  contract: FUND_CONTRACT,
  handler: async (decoded, log) => {
    console.log(`🔹 Redemption process detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);

    const { start, end, users } = decoded;

    const queue = await prisma.redemptionQueue.findMany({
      where: {
        index: {
          lte: end,
          gte: start,
        },
        status: "pending",
      },
    });

    await prisma.$transaction(
      users.map((user: any) => {
        return prisma.redemptionQueue.updateMany({
          where: {
            address: user,
            index: {
              lte: end,
              gte: start,
            },
          },
          data: {
            status: "processed",
          },
        });
      })
    );

    await prisma.$transaction(
      queue.map(({ address, amount }) => {
        return prisma.transaction.upsert({
          create: {
            type: "redemption.processed",
            hash: log.transactionHash,
            blockNumber: log.blockNumber,
            from: FUND_CONTRACT,
            to: address,
            value: amount.toString(),
          },
          update: {},
          where: { hash: log.transactionHash },
        });
      })
    );
  },
};

export const protocolFeesCollectedHandler: TopicHandler = {
  signature: "ProtocolFeesCollected(uint256,uint256,address)",
  decoder: decodeProtocolFeesCollectedLog,
  contract: FUND_CONTRACT,
  handler: async (decoded, log) => {
    console.log(
      `🔹 Protocol fees collected detected in block ${log.blockNumber}`
    );
  },
};

export const transferHandler: TopicHandler = {
  signature: "Transfer(address,address,uint256)",
  decoder: decodeUSDCLog,
  contract: FUND_CONTRACT,
  handler: async (decoded, log) => {
    console.log(`🔹 Fund Transfer detected in block ${log.blockNumber}`);
    console.log(`TX Hash: ${log.transactionHash}`);
    console.log(`From: ${decoded.from}`);
    console.log(`To: ${decoded.to}`);
    console.log(`Amount: ${ethers.formatUnits(decoded.amount, 6)} USDC`);

    await prisma.transaction.upsert({
      create: {
        type: "fund.transfer",
        hash: log.transactionHash,
        blockNumber: log.blockNumber,
        from: decoded.from,
        to: decoded.to,
        value: decoded.amount.toString(),
      },
      update: {},
      where: { hash: log.transactionHash },
    });
  },
};

export const topicHandlers: TopicHandler[] = [
  usdcTransferHandler,
  depositHandler,
  redemptionHandler,
  redemptionProcessHandler,
  protocolFeesCollectedHandler,
  transferHandler,
];
