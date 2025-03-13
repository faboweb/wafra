import { useQuery } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import { query } from "@/data/query";

export interface Transaction {
  id: string;
  type:
    | "usdc.transfer"
    | "deposit"
    | "redemption.requested"
    | "redemption.processed"
    | "fund.transfer"
    | "purchase-pending"
    | "purchase-payed";
  hash?: string;
  blockNumber?: number;
  timestamp: string;
  from?: string;
  to?: string;
  value: string;
}

async function fetchOrders(
  address: string,
  currency: string
): Promise<Transaction[]> {
  console.log("fetchOrders", address);
  const response = await query(
    `${process.env.EXPO_PUBLIC_API_URL}/orders/${address}?currency=${currency}`
  );
  console.log("orders", response);
  return response;
}

export function useOrders({ currency }: { currency: string }) {
  const { account } = useAccount();

  return useQuery({
    queryKey: ["orders", account?.address, currency],
    queryFn: () => fetchOrders(account?.address || "", currency),
    enabled: !!account?.address,
    staleTime: 1000 * 60 * 5,
    // refetchInterval: 30000, // Refetch every 30 seconds
  });
}
