import prisma from "@/db";
import { Order, Transaction } from "@prisma/client";
import { addConversionRates } from "./history.js";
import { listenToOrder, EventId, OrderData } from "./transak.js";
import { mockDeposit } from "./mock-deposits.js";

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

// TODO handle server dying in betwee, relisten to orders
export async function listenToOrderFlow(orderId: string) {
  // TODO handle errors
  listenToOrder(orderId, (orderId, eventId, orderData) => {
    updateOrderStatus(orderId, eventId, orderData);
  });
}

export async function updateOrderStatus(
  orderId: string,
  eventId: EventId,
  orderData: OrderData
) {
  console.log(
    "Updating order status from Transak",
    eventId,
    JSON.stringify(orderData)
  );

  if (eventId === "ORDER_CREATED") {
    await prisma.order.create({
      data: {
        orderId,
        foreignOrderId: orderData.id,
        currency: orderData.fiatCurrency,
        amount: orderData.fiatAmount,
        usdcAmount: BigInt(orderData.cryptoAmount * 10 ** 6),
        depositAddress: orderData.walletAddress,
        status: "created",
      },
    });
  }
  if (eventId === "ORDER_COMPLETED") {
    await prisma.order.update({
      where: {
        foreignOrderId: orderData.id,
      },
      data: {
        status: "payed",
      },
    });

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test" ||
      process.env.NODE_ENV === "staging"
    ) {
      await mockDeposit(orderId, orderData.walletAddress, orderData.fiatAmount);
    }
  }
  if (eventId === "ORDER_FAILED") {
    await prisma.order.update({
      where: {
        foreignOrderId: orderData.id,
      },
      data: {
        status: "failed",
      },
    });
  }
  if (eventId === "ORDER_CANCELLED") {
    await prisma.order.update({
      where: {
        foreignOrderId: orderData.id,
      },
      data: {
        status: "cancelled",
      },
    });
  }
  if (eventId === "ORDER_PROCESSING") {
    await prisma.order.update({
      where: {
        foreignOrderId: orderData.id,
      },
      data: {
        status: "processing",
      },
    });
  }
}
