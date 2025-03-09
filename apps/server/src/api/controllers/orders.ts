import { Request, Response } from "express";
import prisma from "@/db";
import { getOrderById } from "@/services/transak.js";
import { getFormattedOrders } from "@/services/order.js";

export async function createOrder(req: Request, res: Response) {
  try {
    const { id: orderId } = req.params;

    const order = await getOrderById(orderId);

    await prisma.order.create({
      data: {
        orderId,
        foreignOrderId: order.id,
        currency: order.fiatCurrency,
        amount: order.fiatAmount,
        usdcAmount: BigInt(order.cryptoAmount * 10 ** 6),
        depositAddress: order.walletAddress,
      },
    });

    res.json({ orderId });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getOrders(req: Request, res: Response) {
  try {
    console.log("Getting orders");
    const { address } = req.params;
    const { currency } = req.query;
    const orders = await getFormattedOrders(address, currency as string);

    res.json(orders);
  } catch (err) {
    console.error("Error getting orders:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
