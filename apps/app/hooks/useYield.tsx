import { useQuery } from "@tanstack/react-query";
import { query } from "@/data/query";

export const useYield = () => {
  return useQuery({
    queryKey: ["yield"],
    queryFn: async () => {
      const response = await query(`${process.env.EXPO_PUBLIC_API_URL}/yield`);
      return response.yield;
    },
    // staleTime: 1000 * 60 * 60 * 24,
  });
};
