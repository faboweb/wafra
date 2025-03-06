import { ethers } from "ethers";
import express from "express";
import cors from "cors";
import { updateWalletBalance } from "./query.js";
import prisma from "./db.js";
import { getRates } from "./services/currency-conversion.js";
import { getTransactionsWithConversionRate } from "./services/history.js";
import { getAnnualizedYield } from "./services/fund-metrics.js";
import { getYieldSince } from "./services/balance.js";
import { addWallet } from "./services/wallets.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/deposit/address/:address", async (req: any, res: any) => {
  try {
    const headers = req.headers;
    const authorization = headers.authorization;
    if (
      process.env.AUTHORIZATION &&
      authorization !== process.env.AUTHORIZATION
    ) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const address = req.params.address;
    if (!address || !ethers.isAddress(address)) {
      return res.status(400).send({ message: "Address is required" });
    }

    let depositWallet = await prisma.wallet.findFirst({
      where: {
        address,
      },
    });

    if (!depositWallet) {
      depositWallet = await addWallet(address);
    }

    res.status(200).send({ depositAddress: depositWallet.depositAddress });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/balance/:address", async (req: any, res: any) => {
  try {
    const headers = req.headers;
    const authorization = headers.authorization;
    if (
      process.env.AUTHORIZATION &&
      authorization !== process.env.AUTHORIZATION
    ) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const address = req.params.address;
    if (!address || !ethers.isAddress(address)) {
      return res.status(400).send({ message: "Address is required" });
    }

    const currency = req.query.currency || "USD";

    const wallet = await prisma.wallet.findFirst({
      where: {
        address,
      },
    });

    if (!wallet) {
      await addWallet(address);
      await updateWalletBalance(address);
    }

    await updateWalletBalance(address);
    const balance = await prisma.accountBalance.findFirst({
      where: {
        address,
      },
    });

    const recentYield = await getYieldSince(balance!.yieldLastUpdatedAt);

    const fundMetrics = await prisma.fundMetrics.findFirst({
      orderBy: {
        timestamp: "desc",
      },
    });

    const rate = await prisma.currencyRate.findFirst({
      where: {
        currency,
      },
    });

    if (!rate) {
      return res.status(400).send({ message: "Currency not supported" });
    }

    // balances are in token units, those are with 6 decimals
    // we need to convert them first to usd units not to lose precision
    // then we need to convert them to the requested currency
    function toCurrency(shares: bigint) {
      const amountInUsd =
        Number(
          (shares * BigInt(fundMetrics!.sharePrice * 100000)) / BigInt(100000)
        ) / 1000000;

      const amountInCurrency = amountInUsd * Number(rate?.rate);

      return amountInCurrency;
    }

    res.status(200).send({
      address,
      balance: {
        balance: toCurrency(balance!.balance),
        availableBalance: toCurrency(balance!.availableBalance),
        effectiveYield: toCurrency(
          BigInt(recentYield) + balance!.effectiveYield
        ),
      },
    });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/rates", async (req: any, res: any) => {
  const rates = await getRates();
  res.status(200).send(rates);
});

app.get("/history/:address", async (req: any, res: any) => {
  const address = req.params.address;
  if (!address || !ethers.isAddress(address)) {
    return res.status(400).send({ message: "Address is required" });
  }

  const from =
    req.query.from || new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
  const to = req.query.to || new Date();
  const currency = req.query.currency || "USD";

  const history = await getTransactionsWithConversionRate(
    address,
    from,
    to,
    currency
  );

  res.status(200).send(history);
});

app.get("/yield", async (req: any, res: any) => {
  const annualizedYield = await getAnnualizedYield();
  if (annualizedYield === 0) {
    return res.status(200).send({ yield: 0.45 });
  }

  res.status(200).send({ yield: annualizedYield });
});

app.post("/order", async (req: any, res: any) => {
  const { address, amount, currency } = req.body;

  // create random id
  const id = Math.random().toString(36).substring(2, 15);

  res.status(200).send({
    orderId: id,
  });
});

app.get("/health", async (req: any, res: any) => {
  res.status(200).send({ message: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
