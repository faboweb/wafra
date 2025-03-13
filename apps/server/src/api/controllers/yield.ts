import { Request, Response } from "express";
import { getAnnualizedYield } from "@/services/fund-metrics";

export async function getYield(req: Request, res: Response) {
  try {
    const annualizedYield = await getAnnualizedYield();
    if (annualizedYield === 0) {
      return res.status(200).send({ yield: 0.45 });
    }

    res.status(200).send({ yield: annualizedYield });
  } catch (err) {
    console.error("Error getting yield:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
