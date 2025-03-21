import { Request, Response } from "express";
import prisma from "@/db";
import { getOrderById } from "@/services/transak.js";

export async function getDepositStatus(req: Request, res: Response) {
  const { id: orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { orderId: orderId },
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

export async function completeDeposit(req: Request, res: Response) {
  // Only allow in staging environment
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Not allowed in production" });
  }

  const { id: orderId } = req.params;
  const order = await getOrderById(orderId);

  const randomHash = () =>
    crypto.getRandomValues(new Uint8Array(32)).toString();

  // Ethereum addresses are 20 bytes (40 hex chars) + '0x' prefix
  const randomAddress = () => {
    const addr = crypto.getRandomValues(new Uint8Array(20));
    return (
      "0x" +
      Array.from(addr)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
  };

  try {
    await prisma.$transaction([
      prisma.deposit.create({
        data: {
          referenceHash: randomHash(),
          from: randomAddress(),
          to: order.depositAddress,
          value: order.amount.toString(),
          depositTxHash: randomHash(),
          transferTxHash: randomHash(),
        },
      }),
      prisma.order.update({
        where: {
          orderId: orderId,
        },
        data: {
          status: "deposited",
        },
      }),
    ]);

    res.status(200).json({
      message: "Order completed successfully",
    });
  } catch (error) {
    console.error("Error completing deposit:", error);
    res.status(500).json({ error: "Failed to complete deposit" });
  }
}
