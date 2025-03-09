import { fundContract } from "@/contracts.js";
import prisma from "@/db.js";

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
