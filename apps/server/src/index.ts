import { ethers, keccak256, toUtf8Bytes } from "ethers";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

// Load environment variables
const RPC_URL = process.env.RPC_URL!;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS!.toLowerCase();
const USDC_CONTRACT = process.env.USDC_CONTRACT!.toLowerCase();

// ERC-20 Transfer event signature (Keccak-256 hash of Transfer(address,address,uint256))
const TRANSFER_EVENT_SIGNATURE = keccak256(
  toUtf8Bytes("Transfer(address,address,uint256)")
);

// Create a provider
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Get the latest block from Prisma
async function getLatestStoredBlock() {
  const latestBlock = await prisma.block.findFirst({
    orderBy: { blockNumber: "desc" },
  });
  return latestBlock ? latestBlock.blockNumber : 25769444;
}

// Track the latest block
let latestBlockNumber = 0;

async function checkNewBlocks() {
  try {
    if (latestBlockNumber === 0) {
      latestBlockNumber = await getLatestStoredBlock();
    }

    const currentBlockNumber = await provider.getBlockNumber();

    if (currentBlockNumber > latestBlockNumber) {
      console.log(`New block detected: ${currentBlockNumber}`);

      await processBlock(latestBlockNumber + 1, currentBlockNumber);

      latestBlockNumber = currentBlockNumber;
    }
  } catch (error) {
    console.error("Error fetching block number:", error);
  }
}

async function processBlock(fromBlock: number, toBlock: number) {
  try {
    const block = await provider.getBlock(toBlock);
    if (!block) return;

    const logs = await provider.getLogs({
      fromBlock,
      toBlock,
      address: USDC_CONTRACT,
      topics: [TRANSFER_EVENT_SIGNATURE],
    });

    for (const log of logs) {
      const decoded = decodeUSDCLog(log);
      if (decoded) {
        if (decoded.to.toLowerCase() === WALLET_ADDRESS) {
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
        }
      }
    }

    await prisma.block.create({
      data: {
        blockNumber: block.number,
        hash: block.hash,
        timestamp: new Date(block.timestamp * 1000),
      },
    });
  } catch (error) {
    console.error(`Error processing blocks ${fromBlock} ${toBlock}:`, error);
  }
}

function decodeUSDCLog(log: any) {
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

// Poll for new blocks every 10 seconds
setInterval(checkNewBlocks, 10000);

console.log("🔍 Monitoring for incoming transactions...");
