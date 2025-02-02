import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { transfer } from "../src/transfer";
dotenv.config();

const prisma = new PrismaClient();

const main = async () => {
  const failedDeposits = await prisma.deposit.findMany({
    where: {
      error: {
        not: null,
      },
      referenceHash: {
        not: null, // TODO handle
      },
    },
  });
  failedDeposits.map(async (deposit: any) => {
    // get tx
    const transaction = await prisma.transaction.findFirst({
      where: {
        hash: deposit.referenceHash,
      },
    });
    if (!transaction) {
      console.error("Transaction not found", deposit.referenceHash);
    }
    // retry deposit
    try {
      const { transferTxHash, depositTxHash, ownerAddress } = await transfer(
        deposit.from,
        Number(deposit.value)
      );
      await prisma.deposit.update({
        where: {
          id: deposit.id,
        },
        data: {
          transferTxHash,
          depositTxHash,
          to: ownerAddress,
          error: null, // important so we don't do this again
        },
      });
      console.log(`Deposit successful: ${depositTxHash}`);
    } catch (error: any) {
      await prisma.deposit.update({
        where: {
          id: deposit.id,
        },
        data: {
          error: error.message,
        },
      });
      console.error(`Deposit failed: ${error.message}`, error);
    }
  });
};

main();
