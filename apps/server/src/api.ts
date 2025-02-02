import { ethers } from "ethers";
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/deposit/address", async (req: any, res: any) => {
  try {
    const headers = req.headers;
    const authorization = headers.authorization;
    if (authorization !== process.env.AUTHORIZATION) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const depositData = req.body;
    const address = depositData.address;
    if (!address || !ethers.isAddress(address)) {
      return res.status(400).send({ message: "Address is required" });
    }

    let depositWallet = await prisma.wallet.findFirst({
      where: {
        address,
      },
    });

    if (!depositWallet) {
      const newDepositWallet = ethers.Wallet.createRandom();
      depositWallet = {
        address,
        depositAddress: newDepositWallet.address,
        privateKey: newDepositWallet.privateKey,
      };
      await prisma.wallet.create({
        data: depositWallet,
      });
    }

    res.status(200).send({ depositAddress: depositWallet.depositAddress });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/health", async (req: any, res: any) => {
  res.status(200).send({ message: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
