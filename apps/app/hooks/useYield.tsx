import { useQuery } from "@tanstack/react-query";

export const useYield = () => {
  return useQuery({
    queryKey: ["yield"],
    queryFn: async () => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/yield`, {
        headers: {
          Authorization: process.env.EXPO_PUBLIC_API_KEY || "",
        },
      });
      const data = await response.json();
      return data.yield;
    },
    // staleTime: 1000 * 60 * 60 * 24,
  });
};
