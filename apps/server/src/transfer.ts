/**
 * @fileoverview USDC Transfer and Deposit Module
 * This module handles USDC token transfers and deposits using the ERC20 permit functionality
 * and interacts with a fund contract for final deposits.
 *
 * @requires ethers
 * @requires @prisma/client
 * @requires dotenv
 */

import { ethers, TypedDataDomain, Wallet, Signature } from "ethers";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

// Initialize core services
const prisma = new PrismaClient();
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);

// Contract addresses from environment variables
const usdcContractAddress = process.env.USDC_CONTRACT!;
const fundContractAddress = process.env.FUND_CONTRACT!;

/**
 * USDC Contract interface with required ERC20 and permit functions
 */
const usdcContract = new ethers.Contract(
  usdcContractAddress,
  [
    "function approve(address spender, uint256 amount) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function nonces(address owner) view returns (uint256)",
    "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
    "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
    "function version() view returns (string)",
    "function name() view returns (string)",
    "function allowance(address owner, address spender) view returns (uint256)",
  ],
  provider
);

/**
 * Fund Contract interface with deposit function
 */
const fundContract = new ethers.Contract(
  fundContractAddress,
  ["function deposit(uint256 amount, string calldata userMemo)"],
  provider
);

// Initialize transfer wallet from private key
const transferWallet = new ethers.Wallet(
  process.env.TRANSFER_WALLET_PRIVATE_KEY!,
  provider
);

/**
 * Transfers USDC from a user's deposit address to the fund contract
 * The process involves:
 * 1. Getting permission to transfer USDC using permit
 * 2. Transferring USDC to the transfer wallet
 * 3. Approving the fund contract to spend the USDC
 * 4. Depositing the USDC into the fund contract
 *
 * @param {string} depositAddress - The deposit address to transfer from
 * @param {number} amount - The amount of USDC to transfer (in base units)
 * @returns {Promise<{transferTxHash: string, depositTxHash: string, ownerAddress: string}>}
 * @throws {Error} If wallet not found or invalid
 */
export async function transfer(depositAddress: string, amount: number) {
  // Retrieve wallet data from database
  const walletData = await prisma.wallet.findFirst({
    where: { depositAddress },
  });

  if (!walletData) {
    throw new Error("Wallet not found");
  }

  // Create wallet instance and verify address matches
  const wallet = new ethers.Wallet(walletData.privateKey, provider);

  if (wallet.address !== walletData.depositAddress) {
    throw new Error("Invalid wallet");
  }

  console.log(
    "Depositing",
    ethers.formatUnits(amount, 6),
    "USDC to",
    walletData.address
  );

  // Step 1: Get permission to transfer using permit
  await permitUsdcTransfer(amount, wallet);

  // Step 2: Transfer USDC to transfer wallet
  let tx = await usdcContract
    .connect(transferWallet)
    // @ts-ignore
    .transferFrom(wallet.address, transferWallet.address, amount);
  await tx.wait();
  console.log(
    "Moved",
    ethers.formatUnits(amount, 6),
    "USDC to",
    transferWallet.address
  );
  const transferTxHash = tx.hash;

  // Step 3: Approve fund contract to spend USDC
  tx = await usdcContract
    .connect(transferWallet)
    // @ts-ignore
    .approve(fundContractAddress, amount);
  await tx.wait();
  console.log(
    "Approved",
    ethers.formatUnits(amount, 6),
    "USDC for",
    fundContractAddress
  );

  // Step 4: Deposit USDC into fund contract
  tx = await fundContract
    .connect(transferWallet)
    // @ts-ignore
    .deposit(BigInt(amount), wallet.address);
  await tx.wait();
  const depositTxHash = tx.hash;

  return {
    transferTxHash,
    depositTxHash,
    ownerAddress: walletData.address,
  };
}

/**
 * Gets permission to transfer USDC using the permit functionality
 * This avoids the need for a separate approve transaction from the user
 *
 * @param {number} amount - The amount of USDC to permit transfer of
 * @param {Wallet} wallet - The wallet to get permission from
 * @throws {Error} If permit transaction fails
 */
async function permitUsdcTransfer(amount: number, wallet: Wallet) {
  // Get current nonce for the wallet
  const nonce = await usdcContract.nonces(wallet.address);
  // Set deadline to 20 minutes from now
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);

  // Fetch domain data for EIP-712 typed data
  const name = await usdcContract.name();
  const version = await usdcContract.version();
  const chainId = BigInt((await provider.getNetwork()).chainId);

  const domain: TypedDataDomain = {
    name,
    version,
    chainId,
    verifyingContract: usdcContractAddress,
  };

  // Define EIP-712 typed data structure
  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  // Create permit message
  const value = {
    owner: wallet.address,
    spender: transferWallet.address,
    value: BigInt(amount),
    nonce: BigInt(nonce),
    deadline,
  };

  // Sign the permit message
  const signature = await wallet.signTypedData(domain, types, value);
  const sig = Signature.from(signature);

  // Check if we already have sufficient allowance
  const allowanceBefore = await usdcContract.allowance(
    wallet.address,
    transferWallet.address
  );
  if (BigInt(allowanceBefore) >= BigInt(amount)) {
    console.log("Allowance sufficient. Skipping permit.");
    return;
  }

  // Submit permit transaction
  try {
    const permitTx = await usdcContract
      .connect(transferWallet)
      // @ts-ignore
      .permit(
        wallet.address,
        transferWallet.address,
        BigInt(amount),
        deadline,
        sig.v,
        sig.r,
        sig.s
      );

    await permitTx.wait();
  } catch (error) {
    console.error("Permit transaction failed:", error);
    throw error;
  }
}
