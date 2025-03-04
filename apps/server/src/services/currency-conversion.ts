import { CurrencyRate, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

interface ExchangeRates {
  [key: string]: number;
}

async function fetchLatestRates(): Promise<ExchangeRates> {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/USD`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch rates");
    }

    const data = await response.json();
    return {
      EUR: data.rates.EUR,
      GBP: data.rates.GBP,
      INR: data.rates.INR,
      EGP: data.rates.EGP,
      AED: data.rates.AED,
      // Add more currencies as needed
    };
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
}

export async function updateCurrencyRates() {
  try {
    const rates = await fetchLatestRates();

    // Create all rate records in a single transaction
    await prisma.$transaction(
      Object.entries(rates).map(([currency, rate]) =>
        prisma.currencyRate.create({
          data: {
            currency,
            rate: new Decimal(rate),
            timestamp: new Date(),
          },
        })
      )
    );

    console.log("Currency rates updated successfully");
  } catch (error) {
    console.error("Error updating currency rates:", error);
  }
}

export async function getRates(): Promise<Record<string, number>> {
  const rates = await prisma.currencyRate.findMany({
    orderBy: {
      timestamp: "desc",
    },
    distinct: ["currency"],
  });

  return rates.reduce((acc: Record<string, number>, rate: CurrencyRate) => {
    acc[rate.currency] = Number(rate.rate);
    return acc;
  }, {} as Record<string, number>);
}

// Update immediately on start
updateCurrencyRates();

// Then update every 10 minutes
setInterval(updateCurrencyRates, 10 * 60 * 1000);
