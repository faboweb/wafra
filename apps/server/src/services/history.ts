import { CurrencyRate, Transaction } from "@prisma/client";
import prisma from "@/db.js";

export interface HistoricalBalance {
  timestamp: Date;
  balance: bigint;
  convertedBalance: number;
  currency: string;
}

export interface TransactionWithConversionRate extends Transaction {
  conversionRate: CurrencyRate;
  convertedValue: number;
}

export async function getTransactionsWithConversionRate(
  address: string,
  from: Date,
  to: Date,
  currency: string
): Promise<TransactionWithConversionRate[]> {
  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [{ from: address }, { to: address }],
      AND: [{ createdAt: { gte: from } }, { createdAt: { lte: to } }],
    },
  });
  return await addConversionRates(transactions, currency);
}

// TODO refactor into other file
export async function addConversionRates(
  transactions: Partial<Transaction>[],
  currency: string
): Promise<TransactionWithConversionRate[]> {
  if (transactions.length === 0) {
    return [];
  }

  const from = transactions[0].createdAt;
  const to = transactions[transactions.length - 1].createdAt;
  const conversionRates = await prisma.currencyRate.findMany({
    where: {
      currency: currency,
      AND: [{ timestamp: { gte: from } }, { timestamp: { lte: to } }],
    },
  });
  // find the conversion rate for the latest timestamp
  const latestConversionRates = await prisma.currencyRate.findFirst({
    where: {
      currency: currency,
      timestamp: {
        gte: to,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });
  if (latestConversionRates) {
    conversionRates.push(latestConversionRates);
  }

  const transactionsWithConversionRate: TransactionWithConversionRate[] = [];
  for (const tx of transactions) {
    const conversionRate = conversionRates.find(
      (rate: CurrencyRate) => rate.timestamp > tx.createdAt
    );
    if (!conversionRate) {
      throw new Error(`No conversion rate found for ${currency}`);
    }
    const usdValue =
      Number((BigInt(tx.value) * BigInt(100)) / BigInt(10 ** 6)) / 100;
    transactionsWithConversionRate.push({
      ...tx,
      conversionRate,
      convertedValue: usdValue * conversionRate.rate.toNumber(),
    });
  }
  return transactionsWithConversionRate;
}

export async function getHistoricalBalances(
  address: string,
  from: Date,
  to: Date,
  currency: string
): Promise<HistoricalBalance[]> {
  const balance = await prisma.accountBalance.findFirst({
    where: {
      address,
    },
  });
  if (!balance) {
    return [];
  }

  // Get all transactions for this address
  const transactions = await getTransactionsWithConversionRate(
    address,
    from,
    to,
    currency
  );

  let runningBalance = balance.balance;
  const balanceHistory: HistoricalBalance[] = [];

  // Calculate running balance at each transaction
  for (const tx of transactions) {
    const amount = BigInt(tx.value);

    if (tx.to === address) {
      switch (tx.type) {
        case "deposit":
          runningBalance = runningBalance + amount;
          break;
        case "redemption.processed":
          runningBalance = runningBalance - amount;
          break;
        case "fund.transfer":
          runningBalance = runningBalance + amount;
          break;
      }
    } else {
      switch (tx.type) {
        case "fund.transfer":
          runningBalance = runningBalance - amount;
          break;
      }
    }
    const convertedBalance =
      Number(amount / BigInt(10 ** 6)) * tx.conversionRate.rate.toNumber();
    const histBalance: HistoricalBalance = {
      timestamp: tx.createdAt,
      balance: runningBalance,
      convertedBalance,
      currency,
    };

    balanceHistory.push(histBalance);
  }

  // filter balances to one per day
  const filteredBalanceHistory = balanceHistory.filter(
    (balance, index, self) =>
      index ===
      self.findIndex(
        (t) => t.timestamp.toDateString() === balance.timestamp.toDateString()
      )
  );

  return filteredBalanceHistory;
}

export async function getEarliestTransaction(address: string) {
  const transactions = await prisma.transaction.findFirst({
    where: {
      from: address,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return transactions?.createdAt;
}
