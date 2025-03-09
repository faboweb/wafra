import { useAccount } from "./useAccount";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useCurrency } from "./useCurrency";
import { query } from "@/data/query";

interface Balance {
  balance: number;
  availableBalance: number;
  effectiveYield: number;
}

export function useBalances(): UseQueryResult<Balance> {
  const { account } = useAccount();
  const { currency } = useCurrency();
  return useQuery({
    queryKey: ["balances", account?.address, currency],
    queryFn: async () => {
      const response = await query(
        `${process.env.EXPO_PUBLIC_API_URL}/balance/${account?.address}?currency=${currency}`
      );
      return response.balance || {};
    },
    throwOnError: true,
    staleTime: 1000 * 60 * 5,
  });
}
