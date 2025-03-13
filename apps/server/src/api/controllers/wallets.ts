import { Request, Response } from "express";
import { ethers } from "ethers";
import prisma from "@/db";
import { addWallet } from "@/services/wallets";

export async function getDepositAddress(req: Request, res: Response) {
  try {
    const address = req.params.address;
    if (!address || !ethers.isAddress(address)) {
      return res.status(400).send({ message: "Address is required" });
    }

    let depositWallet = await prisma.wallet.findFirst({
      where: { address },
    });

    if (!depositWallet) {
      depositWallet = await addWallet(address);
    }

    res.status(200).send({ depositAddress: depositWallet.depositAddress });
  } catch (err) {
    console.error("Error getting deposit address:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
