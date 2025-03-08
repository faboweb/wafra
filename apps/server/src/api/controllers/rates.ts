import { Request, Response } from "express";
import { getRates as getCurrencyRates } from "@/services/currency-conversion";

export async function getRates(req: Request, res: Response) {
  try {
    const rates = await getCurrencyRates();
    res.status(200).send(rates);
  } catch (err) {
    console.error("Error getting rates:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
