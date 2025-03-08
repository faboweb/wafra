import { ethers } from "ethers";
import prisma from "../db";

// in memory cache
export let depositAddresses: string[] = [];
export let wallets: string[] = [];

prisma.wallet.findMany().then((wallets) => {
  wallets.map((wallet) => wallet.address);
  depositAddresses = wallets.map((wallet) => wallet.depositAddress);
});

export async function addWallet(address: string) {
  const newDepositWallet = ethers.Wallet.createRandom();
  const wallet = {
    address,
    depositAddress: newDepositWallet.address,
    privateKey: newDepositWallet.privateKey,
  };

  depositAddresses.push(wallet.depositAddress);
  wallets.push(wallet.address);

  return await prisma.wallet.create({
    data: wallet,
  });
}
