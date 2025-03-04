import { ethers, keccak256, toUtf8Bytes } from "ethers";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { decodeUSDCLog } from "../src/services/tx-listener.js";
dotenv.config();

const prisma = new PrismaClient();

const main = async () => {
  const TRANSFER_EVENT_SIGNATURE = keccak256(
    toUtf8Bytes("Transfer(address,address,uint256)")
  );
  const USDC_CONTRACT = process.env.USDC_CONTRACT!.toLowerCase();
  const RPC_URL = process.env.RPC_URL;
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const logs = await provider.getLogs({
    fromBlock: 25843307,
    toBlock: 25843307,
    address: USDC_CONTRACT,
    topics: [TRANSFER_EVENT_SIGNATURE],
  });

  console.log(logs);

  const depositAddresses = await prisma.wallet
    .findMany({
      select: { depositAddress: true },
    })
    .then((wallets: any[]) => wallets.map((wallet) => wallet.depositAddress));

  console.log(depositAddresses);

  logs.map(decodeUSDCLog).some((decoded: any) => {
    depositAddresses.includes(decoded.from) &&
      console.log(`🔹 USDC Transfer detected in block ${decoded.blockNumber}`);
  });
};

main();
