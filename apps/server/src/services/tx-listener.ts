import { ethers } from "ethers";
import dotenv from "dotenv";
import { TopicHandler, topicHandlers } from "./handlers";
import prisma from "@/db";

dotenv.config();

// Load environment variables
const RPC_URL = process.env.RPC_URL!;

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

    // group handlers by contract
    const handlersByContract = topicHandlers.reduce((acc, handler) => {
      acc[handler.contract] = [...(acc[handler.contract] || []), handler];
      return acc;
    }, {} as Record<string, TopicHandler[]>);

    let errors = [];
    for (const contract in handlersByContract) {
      const topics = handlersByContract[contract]
        .map((h) => h.signature)
        .map((s) => ethers.id(s));
      const logs = await provider.getLogs({
        fromBlock,
        toBlock,
        address: contract,
        topics: [topics],
      });

      try {
        for (const handler of handlersByContract[contract]) {
          for (const log of logs) {
            if (log.topics[0] !== ethers.id(handler.signature)) continue;
            if (handler.filter && !handler.filter(log)) continue;

            const decoded = handler.decoder(log);
            if (decoded) {
              await handler.handler(decoded, log);
            }
          }
        }
      } catch (err) {
        console.error(`Error processing block ${toBlock}:`, err);
        errors.push(err);
      }
    }

    if (!block.hash) throw new Error("Block hash is null");
    if (!process.env.FORCE_BLOCK) {
      await prisma.block.create({
        data: {
          hash: block.hash,
          blockNumber: block.number,
          timestamp: new Date(block.timestamp * 1000),
          error:
            errors.length > 0
              ? errors.map((e: any) => e.message).join(", ")
              : null,
        },
      });
    }
    if (errors.length > 0) {
      console.error(
        `Error processing blocks ${fromBlock} ${toBlock}:`,
        errors.map((e: any) => e.message).join(", ")
      );
    }
  } catch (error) {
    console.error(`Error processing blocks ${fromBlock} ${toBlock}:`, error);
  }
}

// Poll for new blocks every 10 seconds
if (!process.env.FORCE_BLOCK) {
  checkNewBlocks();
  setInterval(checkNewBlocks, 10000);
} else {
  console.log("🔍 Processing block from", process.env.FORCE_BLOCK);
  processBlock(
    Number(process.env.FORCE_BLOCK),
    Number(process.env.FORCE_BLOCK) + 5
  ).then(() => {
    console.log("🔍 Done processing blocks from", process.env.FORCE_BLOCK);
  });
}

console.log("🔍 Monitoring for incoming transactions...");
