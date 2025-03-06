import prisma from "../db.js";
import { getEarliestTransaction } from "./history.js";

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

export async function getYieldSince(from: Date) {
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
