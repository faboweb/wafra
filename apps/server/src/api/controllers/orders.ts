import { Request, Response } from "express";
import { OrderRequest } from "../types";
import prisma from "@/db";
import { getOrderById } from "@/services/transak";

export async function createOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.body as OrderRequest;

    const order = await getOrderById(orderId);

    await prisma.order.create({
      data: {
        id: orderId,
        currency: order.fiatCurrency,
        amount: order.fiatAmount,
        usdcAmount: order.cryptoAmount,
        depositAddress: order.walletAddress,
      },
    });

    res.status(200).send({ orderId });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
