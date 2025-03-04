import { useAccount } from "./useAccount";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useCurrency } from "./useCurrency";

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
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/balance/${account?.address}?currency=${currency}`,
        {
          headers: {
            Authorization: process.env.EXPO_PUBLIC_AUTHORIZATION || "",
          },
        }
      );
      const res = await response.json();
      return res.balance;
    },
    throwOnError: true,
    staleTime: 1000 * 60 * 5,
  });
}
