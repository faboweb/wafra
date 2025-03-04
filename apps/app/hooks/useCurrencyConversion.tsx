import { useQuery } from "@tanstack/react-query";

interface ConversionRates {
  USD: number;
  EUR: number;
  GBP: number;
  INR: number;
  EGP: number;
  // Add more currencies as needed
}

const CurrencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  EGP: "£",
};

async function fetchConversionRates(): Promise<ConversionRates> {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/rates`, {
    headers: {
      Authorization: process.env.EXPO_PUBLIC_API_KEY || "",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch conversion rates");
  }
  return response.json();
}

export function useCurrencyConversion() {
  const {
    data: rates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currency-conversion"],
    queryFn: fetchConversionRates,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const convert = (amountInUSD: number, toCurrency: keyof ConversionRates) => {
    if (!rates) return null;
    return (
      CurrencySymbols[toCurrency] +
      " " +
      (amountInUSD * rates[toCurrency]).toLocaleString()
    );
  };

  return {
    rates,
    convert,
    isLoading,
    error,
  };
}
