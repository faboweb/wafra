import { Request, Response } from "express";
import { ethers } from "ethers";
import prisma from "@/db";
import { updateWalletBalance } from "@/services/balance.js";
import { addWallet } from "@/services/wallets.js";

export async function getBalance(req: Request, res: Response) {
  try {
    const address = req.params.address;
    const currency = (req.query.currency as string) || "USD";

    if (!address || !ethers.isAddress(address)) {
      return res.status(400).send({ message: "Address is required" });
    }

    const wallet = await prisma.wallet.findFirst({
      where: { address },
    });

    if (!wallet) {
      await addWallet(address);
      await updateWalletBalance(address);
    }

    await updateWalletBalance(address);
    const balance = await prisma.accountBalance.findFirst({
      where: { address },
    });

    const rate = await prisma.currencyRate.findFirst({
      where: { currency },
      orderBy: { timestamp: "desc" },
    });

    if (!rate) {
      return res.status(400).send({ message: "Currency not supported" });
    }

    const fundMetrics = await prisma.fundMetrics.findFirst({
      orderBy: { timestamp: "desc" },
    });

    function toCurrency(shares: bigint) {
      const amountInUsd =
        Number(
          (shares * BigInt(fundMetrics!.sharePrice * 100000)) / BigInt(100000)
        ) / 1000000;
      return amountInUsd * Number(rate.rate);
    }

    res.status(200).send({
      address,
      balance: {
        balance: toCurrency(balance!.balance),
        availableBalance: toCurrency(balance!.availableBalance),
        effectiveYield: toCurrency(balance!.effectiveYield),
      },
    });
  } catch (err) {
    console.error("Error getting balance:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
