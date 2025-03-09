import React, { createContext, useContext, useState, ReactNode } from "react";
import { useCurrency } from "./useCurrency";
import countries from "@/constants/countries";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { query } from "@/data/query";
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
  unlock: () => void;
}

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const { currency, setCurrency } = useCurrency();
  const [depositAddress, setDepositAddress] = useState<string | null>(null);

  const router = useRouter();

  React.useEffect(() => {
    const getAccount = async () => {
      const result = await SecureStore.getItemAsync("account");
      if (result) {
        setAccount(JSON.parse(result));
      }
    };

    getAccount();
  }, []);

  const signOut = async () => {
    await SecureStore.deleteItemAsync("account");
    await AsyncStorage.removeItem("account");

    router.push("/(onboard)");

    setAccount(null);
    setDepositAddress(null);
    setCurrency("USD");
  };

  const signIn = async (account: Account) => {
    setAccount(account);

    await SecureStore.setItemAsync("account", JSON.stringify(account), {
      requireAuthentication: true,
    });
    await AsyncStorage.setItem("account", "true");

    router.push("/(dashboard)");
  };

  const unlock = async () => {
    const faceIdResult = await LocalAuthentication.authenticateAsync();
    if (faceIdResult.success) {
      try {
        const result = await SecureStore.getItemAsync("account", {
          requireAuthentication: true,
        });
        if (!result) {
          router.push("/(onboard)");
          return;
        }
        setAccount(JSON.parse(result));
        router.push("/(dashboard)");
      } catch (err) {
        console.log("failed", err);
      }
    }
  };

  React.useEffect(() => {
    console.log("getDepositAddress", account);
    const getDepositAddress = async () => {
      if (!account?.address) return;
      const response = await query(
        `${process.env.EXPO_PUBLIC_API_URL}/deposit/address/${account.address}`
      );
      setDepositAddress(response.depositAddress);
    };

    getDepositAddress();
  }, [account?.address]);

  React.useEffect(() => {
    if (account?.country) {
      const country = countries.find((c) => c.value === account.country);
      if (country) {
        setCurrency(country.currency);
      }
    }
  }, [account?.country]);

  return (
    <AccountContext.Provider
      value={{ account, depositAddress, signIn, signOut, unlock }}
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
