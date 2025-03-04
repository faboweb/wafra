import { fundContract, wfrToken } from "./contracts.js";
import prisma from "./db.js";

export async function getTokenBalance(address: string): Promise<bigint> {
  const balance = await wfrToken.balanceOf(address);
  return balance;
}

export async function getRedemptionQueue(): Promise<
  { user: string; amount: bigint }[]
> {
  const redemptionQueue = await fundContract.getRedemptionQueue();

  const queue = redemptionQueue.map((item: any) => ({
    user: item.user,
    amount: item.amount,
  }));

  // Add redemption queue items to database
  await prisma.$transaction(
    queue.map((item: any, index: number) =>
      prisma.redemptionQueue.upsert({
        where: {
          index: BigInt(index),
        },
        create: {
          index: BigInt(index),
          address: item.user,
          amount: item.amount.toString(),
          status: item.amount === BigInt(0) ? "completed" : "pending",
        },
        update: {
          address: item.user,
          amount: item.amount.toString(),
          status: item.amount === BigInt(0) ? "completed" : "pending",
        },
      })
    )
  );

  return queue;
}

export async function getRedemptionQueueForAddress(
  address: string
): Promise<{ index: bigint; amount: string }[]> {
  const queueItems = await prisma.redemptionQueue.findMany({
    where: {
      address,
      status: "pending",
    },
    orderBy: {
      index: "asc",
    },
    select: {
      index: true,
      amount: true,
    },
  });
  return queueItems;
}

export async function updateAllBalances() {
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

function upsertAccountBalance(
  address: string,
  tokenBalance: bigint,
  balance: bigint
) {
  return prisma.accountBalance.upsert({
    where: { address },
    update: { availableBalance: tokenBalance, balance, updatedAt: new Date() },
    create: {
      address,
      availableBalance: tokenBalance,
      balance,
      updatedAt: new Date(),
      yieldLastUpdatedAt: new Date(),
    },
  });
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

export async function updateWalletBalance(address: string) {
  const { tokenBalance, redeeming } = await getBalance(address);
  const totalBalance = tokenBalance + redeeming;
  return upsertAccountBalance(address, tokenBalance, totalBalance);
}

// on start
updateAllBalances();
