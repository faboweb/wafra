import React, { createContext, useContext, useState, ReactNode } from "react";
import { useCurrency } from "./useCurrency";
import countries from "@/constants/countries";
import { useRouter as useExpoRouter } from "expo-router"; // For Expo Router on mobile and web
import { query } from "@/data/query";
import { useStorage } from "./useStorage";

interface Account {
  country: string;
  address: string;
  phone: string;
}

interface AccountContextProps {
  account: Account | null;
  depositAddress: string | null;
  signIn: (account: Account) => void;
  signOut: () => void;
  isMobile: boolean;
}

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

const isMobile =
  // @ts-ignore
  typeof window !== "undefined" && typeof window.Expo === "object";

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const { currency, setCurrency } = useCurrency();
  const [depositAddress, setDepositAddress] = useState<string | null>(null);
  const router = useExpoRouter();
  const storage = useStorage();

  React.useEffect(() => {
    // Fetch account from SecureStore if available
    const getAccount = async () => {
      try {
        const result = await storage.getItem<Account>("account");
        if (result) {
          setAccount(result);
        }
      } catch (error) {
        console.error("Error fetching account from storage", error);
      }
    };

    getAccount();
  }, []);

  const signOut = async () => {
    try {
      // Remove account from SecureStore on mobile and AsyncStorage on web
      await storage.removeItem("account");

      setAccount(null);
      setDepositAddress(null);
      setCurrency("USD");

      router.push("/(onboard)");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const signIn = async (account: Account) => {
    try {
      await storage.setItem("account", account);
      setAccount(account);

      router.push("/(dashboard)");
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  React.useEffect(() => {
    if (account?.country) {
      const country = countries.find((c) => c.value === account.country);
      if (country) {
        setCurrency(country.currency);
      }
    }
  }, [account?.country]);

  // Get deposit address from API
  React.useEffect(() => {
    if (!account || !account.address) return;

    const getDepositAddress = async () => {
      try {
        const response = await query(
          `${process.env.EXPO_PUBLIC_API_URL}/deposit/address/${account.address}`
        );
        setDepositAddress(response.depositAddress);
      } catch (error) {
        console.error("Error fetching deposit address", error);
      }
    };

    getDepositAddress();
  }, [account?.address]);

  return (
    <AccountContext.Provider
      value={{ account, depositAddress, signIn, signOut, isMobile }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextProps => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
