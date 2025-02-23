import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { topicHandlers } from "./handlers.js";

dotenv.config();

const prisma = new PrismaClient();

// Load environment variables
const RPC_URL = process.env.RPC_URL!;
const USDC_CONTRACT = process.env.USDC_CONTRACT!.toLowerCase();

// Create a provider
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Get the latest block from Prisma
async function getLatestStoredBlock() {
  const latestBlock = await prisma.block.findFirst({
    orderBy: { blockNumber: "desc" },
  });
  const block = latestBlock?.blockNumber || 0;
  const minBlock = Number(process.env.MIN_BLOCK) || 0;
  return block < minBlock ? minBlock : block;
}

// Track the latest block
let latestBlockNumber = 0;
let blockProcessing = false;

async function checkNewBlocks() {
  if (blockProcessing) return;
  blockProcessing = true;
  try {
    if (latestBlockNumber === 0) {
      latestBlockNumber = Number(await getLatestStoredBlock());
    }

    const currentBlockNumber = await provider.getBlockNumber();
    const startBlockNumber = latestBlockNumber + 1;

    let timeStart = Date.now();
    while (currentBlockNumber > latestBlockNumber) {
      console.log(`Processing Block: ${latestBlockNumber + 1}`);

      const endBlock = Math.min(currentBlockNumber, latestBlockNumber + 10);
      await processBlock(latestBlockNumber + 1, endBlock);

      latestBlockNumber = endBlock;

      const remainingBlocks = currentBlockNumber - endBlock;
      if (remainingBlocks > 0) {
        const timeEnd = Date.now();
        const timeElapsed = timeEnd - timeStart;
        const timeRemaining =
          timeElapsed > 0
            ? (timeElapsed * remainingBlocks) / (endBlock - startBlockNumber)
            : 0;
        console.log(
          `Blocks remaining: ${remainingBlocks}, Time remaining: ${
            timeRemaining / 1000 / 60
          } min`
        );
      }
    }
  } catch (error) {
    console.error("Error fetching block number:", error);
  }
  blockProcessing = false;
}

export async function processBlock(fromBlock: number, toBlock: number) {
  try {
    const block = await provider.getBlock(toBlock);
    if (!block) return;

    for (const handler of topicHandlers) {
      const logs = await provider.getLogs({
        fromBlock,
        toBlock,
        address: USDC_CONTRACT,
        topics: [handler.signature],
      });

      for (const log of logs) {
        const decoded = handler.decoder(log);
        if (decoded) {
          await handler.handler(decoded, log);
        }
      }
    }

    if (!block.hash) throw new Error("Block hash is null");
    await prisma.block.create({
      data: {
        hash: block.hash,
        blockNumber: block.number,
        timestamp: new Date(block.timestamp * 1000),
      },
    });
  } catch (error) {
    console.error(`Error processing blocks ${fromBlock} ${toBlock}:`, error);
  }
}

// Poll for new blocks every 10 seconds
setInterval(checkNewBlocks, 10000);

console.log("🔍 Monitoring for incoming transactions...");
