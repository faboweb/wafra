import { useQuery } from "@tanstack/react-query";
import { useAccount } from "./useAccount";

export interface Transaction {
  id: string;
  type:
    | "usdc.transfer"
    | "deposit"
    | "redemption.requested"
    | "redemption.processed"
    | "fund.transfer";
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  status?: "pending" | "completed" | "failed";
}

export interface HistoricalBalance {
  timestamp: Date;
  balance: string;
  convertedBalance: number;
  currency: string;
}

export interface TransactionWithConversionRate extends Transaction {
  conversionRate: {
    rate: number;
    timestamp: Date;
    currency: string;
  };
  convertedValue: number;
}

interface UseHistoryOptions {
  from?: Date;
  to?: Date;
  currency?: string;
}

async function fetchHistory(
  address: string,
  options: UseHistoryOptions = {}
): Promise<{ transactions: Transaction[]; total: number }> {
  const params = new URLSearchParams({
    from:
      options.from?.toISOString() ||
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    to: options.to?.toISOString() || new Date().toISOString(),
    currency: options.currency || "USD",
  });

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/history/${address}?${params}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }
  return response.json();
}

export function useHistory(options: UseHistoryOptions = {}) {
  const { account } = useAccount();

  return useQuery({
    queryKey: ["history", account?.address, options],
    queryFn: () => fetchHistory(account?.address || "", options),
    enabled: !!account?.address,
    staleTime: 1000 * 60 * 5,
    // refetchInterval: 30000, // Refetch every 30 seconds
  });
}
