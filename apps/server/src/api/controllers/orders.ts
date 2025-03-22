import { Request, Response } from "express";
import { getFormattedOrders, listenToOrderFlow } from "@/services/order.js";

// we are not creating the order here, we are just listening to the order creation flow from Transak
export async function createOrder(req: Request, res: Response) {
  try {
    const { id: orderId } = req.params;

    listenToOrderFlow(orderId);

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
