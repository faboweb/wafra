import { Request, Response } from "express";
import prisma from "@/db";

export async function getDepositStatus(req: Request, res: Response) {
  const { id: orderId } = req.params;

  try {
    const order = await prisma.orders.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order.status);
  } catch (error) {
    console.error("Error fetching deposit status:", error);
    res.status(500).json({ error: "Failed to fetch deposit status" });
  }
}
