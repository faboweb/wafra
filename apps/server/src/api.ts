import { ethers } from "ethers";
import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(express.json());

app.post("/deposit/new", async (req: any, res: any) => {
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

    const wallet = ethers.Wallet.createRandom();
    await prisma.wallet.create({
      data: {
        address,
        depositAddress: wallet.address,
        privateKey: wallet.privateKey,
      },
    });

    res.status(200).send({ depositAddress: wallet.address });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

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
    const wallet = await prisma.wallet.findFirst({
      where: {
        address,
      },
    });

    if (!wallet) {
      res.status(500).send({ error: "Wallet not initialized" });
      return;
    }
    res.status(200).send({ depositAddress: wallet.address });
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
