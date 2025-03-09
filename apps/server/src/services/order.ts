import prisma from "@/db";
import { Order, Transaction } from "@prisma/client";

export async function getFormattedOrders(
  address: string
): Promise<Partial<Transaction>[]> {
  const wallet = await prisma.wallet.findUnique({
    where: {
      address,
    },
    select: {
      depositAddress: true,
    },
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  const orders = await prisma.order.findMany({
    where: {
      depositAddress: wallet?.depositAddress,
      status: {
        in: ["pending", "payed"],
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  return orders.map((order: Order) => ({
    id: order.id,
    hash: String(order.id),
    type: "purchase-" + order.status,
    value: String((order.amount * 10) ^ 6), // usd to micro usd
    createdAt: order.timestamp,
  }));
}
