import { wfrToken } from "@/contracts.js";
import prisma from "@/db";
import { getEarliestTransaction } from "@/services/history.js";
import {
  getRedemptionQueue,
  getRedemptionQueueForAddress,
} from "@/services/redemptions.js";

async function getTokenBalance(address: string): Promise<bigint> {
  const balance = await wfrToken.balanceOf(address);
  return balance;
}

async function getBalance(address: string) {
  const tokenBalance = await getTokenBalance(address);
  const redeeming = await getRedemptionQueueForAddress(address);
  return {
    address,
    tokenBalance,
    redeeming: redeeming.reduce(
      (acc, item) => acc + BigInt(item.amount),
      BigInt(0)
    ),
  };
}

function upsertAccountBalance(
  address: string,
  availableBalance: bigint,
  liquidBalance: bigint
) {
  return prisma.accountBalance.upsert({
    where: { address },
    update: {
      balance: liquidBalance,
      availableBalance,
    },
    create: {
      address,
      balance: liquidBalance,
      availableBalance,
      yieldLastUpdatedAt: new Date(),
    },
  });
}

async function updateAllBalances() {
  await getRedemptionQueue();

  const accounts = await prisma.wallet.findMany();
  const balances = await Promise.all(
    accounts.map((a) => getBalance(a.address))
  );
  await prisma.$transaction(
    accounts.map((account, index) =>
      upsertAccountBalance(
        account.address,
        balances[index].tokenBalance,
        balances[index].tokenBalance + balances[index].redeeming
      )
    )
  );
}

export async function updateWalletBalance(address: string) {
  const { tokenBalance, redeeming } = await getBalance(address);
  const totalBalance = tokenBalance + redeeming;
  return upsertAccountBalance(address, tokenBalance, totalBalance);
}

export async function updateAccountYield(address: string) {
  const accountBalance = await prisma.accountBalance.findFirst({
    where: { address },
  });
  if (!accountBalance) {
    return;
  }

  let yieldLastUpdatedAt: Date | undefined = accountBalance.yieldLastUpdatedAt;
  if (!yieldLastUpdatedAt) {
    yieldLastUpdatedAt = await getEarliestTransaction(address);
  }
  // there was no tx on the wallet so no balance
  if (!yieldLastUpdatedAt) {
    return;
  }

  const fundMetricsNow = await prisma.fundMetrics.findFirst({
    orderBy: {
      timestamp: "desc",
    },
  });
  const fundMetricsThen = await prisma.fundMetrics.findFirst({
    where: {
      timestamp: {
        gte: yieldLastUpdatedAt,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });
  if (!fundMetricsNow || !fundMetricsThen) {
    return;
  }

  const timeYield = fundMetricsNow.sharePrice - fundMetricsThen.sharePrice;
  const effectiveYield =
    (BigInt(Math.round(timeYield * 100000)) * accountBalance?.balance) /
    BigInt(100000);

  return {
    address,
    data: {
      yieldLastUpdatedAt: new Date(),
      effectiveYield: {
        increment: effectiveYield,
      },
    },
  };
}

async function getYieldSince(from: Date) {
  const fundMetricsNow = await prisma.fundMetrics.findFirst({
    orderBy: {
      timestamp: "desc",
    },
  });
  const fundMetricsThen = await prisma.fundMetrics.findFirst({
    where: {
      timestamp: {
        gte: from,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });
  if (!fundMetricsNow || !fundMetricsThen) {
    return 0;
  }
  return fundMetricsNow.sharePrice - fundMetricsThen.sharePrice;
}

// on start
updateAllBalances();
