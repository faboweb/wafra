import prisma from "@/db";
import { Order, Transaction } from "@prisma/client";
import { addConversionRates } from "./history.js";

export async function getFormattedOrders(
  address: string,
  currency: string
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

  return addConversionRates(
    orders.map((order: Order) => ({
      id: order.id,
      hash: order.orderId,
      type: "purchase-" + order.status,
      value: order.usdcAmount.toString(),
      createdAt: order.timestamp,
    })),
    currency || "USD"
  );
}
