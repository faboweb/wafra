import { fundContract, wfrToken } from "../contracts";
import prisma from "@/db";

async function updateFundMetrics() {
  console.log("Updating fund metrics");

  // check if fund metric exists for last 15 minutes
  const fundMetric = await prisma.fundMetrics.findFirst({
    where: {
      timestamp: {
        gte: new Date(Date.now() - 15 * 60 * 1000),
      },
    },
  });

  if (fundMetric) {
    console.log("Fund metrics already exists");
    return;
  }

  try {
    const [totalSupply, totalValue] = await Promise.all([
      wfrToken.totalSupply(),
      fundContract.totalValue(),
    ]);

    // Calculate share price (totalValue / totalSupply)
    const sharePrice =
      totalSupply === BigInt(0)
        ? 0
        : Number((totalValue * BigInt(1000)) / totalSupply) / 1000;

    await prisma.fundMetrics.create({
      data: {
        totalSupply: totalSupply.toString(),
        totalValue: totalValue.toString(),
        sharePrice,
      },
    });

    console.log("Fund metrics updated successfully");
  } catch (error) {
    console.error("Error updating fund metrics:", error);
  }
}

export async function getAnnualizedYield() {
  const fundMetricsLatest = await prisma.fundMetrics.findFirst({
    orderBy: {
      timestamp: "desc",
    },
  });
  const fundMetricsAMonthAgo = await prisma.fundMetrics.findFirst({
    where: {
      timestamp: {
        lte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  if (!fundMetricsLatest || !fundMetricsAMonthAgo) {
    return 0;
  }

  const monthlyYield =
    (Number(fundMetricsLatest?.sharePrice) -
      Number(fundMetricsAMonthAgo?.sharePrice)) /
    Number(fundMetricsAMonthAgo?.sharePrice);
  const annualizedYield = Math.pow(1 + monthlyYield, 12) - 1;

  return annualizedYield;
}

// Update immediately on start
updateFundMetrics();

// Then update every 15 minutes
setInterval(updateFundMetrics, 15 * 60 * 1000);
