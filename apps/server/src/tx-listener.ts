import { ethers, keccak256, toUtf8Bytes } from "ethers";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { transfer } from "./transfer";
dotenv.config();

const prisma = new PrismaClient();

// Load environment variables
const RPC_URL = process.env.RPC_URL!;
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
  return latestBlock?.blockNumber < process.env.MIN_BLOCK!
    ? process.env.MIN_BLOCK!
    : latestBlock?.blockNumber || 0;
}

// Track the latest block
let latestBlockNumber = 0;
let blockProcessing = false;
async function checkNewBlocks() {
  if (blockProcessing) return;
  blockProcessing = true;
  try {
    if (latestBlockNumber === 0) {
      latestBlockNumber = await getLatestStoredBlock();
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

    const logs = await provider.getLogs({
      fromBlock,
      toBlock,
      address: USDC_CONTRACT,
      topics: [TRANSFER_EVENT_SIGNATURE],
    });

    const depositAddresses = await prisma.wallet
      .findMany({
        select: { depositAddress: true },
      })
      .then((wallets: any[]) => wallets.map((wallet) => wallet.depositAddress));

    for (const log of logs) {
      const decoded = decodeUSDCLog(log);
      if (decoded) {
        const address = decoded.to;
        if (depositAddresses.includes(address)) {
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

          // transfer the deposited USDC to the owner's address in the fund
          try {
            // check if deposit already done
            const deposit = await prisma.deposit.findFirst({
              where: {
                referenceHash: log.transactionHash,
              },
            });
            if (deposit) {
              console.log("Deposit already processed");
              continue;
            }

            const { hash, ownerAddress } = await transfer(
              address,
              decoded.amount
            );
            await prisma.deposit.create({
              data: {
                referenceHash: log.transactionHash,
                from: address,
                to: ownerAddress,
                value: decoded.amount.toString(),
                hash,
              },
            });

            console.log(`Transfer successful: ${hash}`);
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

// Poll for new blocks every 10 seconds
setInterval(checkNewBlocks, 10000);

console.log("🔍 Monitoring for incoming transactions...");
