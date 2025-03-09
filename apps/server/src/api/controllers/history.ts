import { Request, Response } from "express";
import { ethers } from "ethers";
import { getTransactionsWithConversionRate } from "@/services/history.js";

export async function getHistory(req: Request, res: Response) {
  try {
    const address = req.params.address;
    if (!address || !ethers.isAddress(address)) {
      return res.status(400).send({ message: "Address is required" });
    }

    const from = req.query.from
      ? new Date(req.query.from as string)
      : new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
    const to = req.query.to ? new Date(req.query.to as string) : new Date();
    const currency = (req.query.currency as string) || "USD";

    const history = await getTransactionsWithConversionRate(
      address,
      from,
      to,
      currency
    );

    res.status(200).send(history);
  } catch (err) {
    console.error("Error getting history:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
