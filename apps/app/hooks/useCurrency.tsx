import countries from "@/constants/countries";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CurrencyContextProps {
  currency: string;
  currencySymbol: string;
  setCurrency: (currency: string) => void;
  formatCurrency: (amount: number | bigint) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<string>("EUR");
  const [currencySymbol, setCurrencySymbol] = useState<string>("€");

  const formatCurrency = (amount: number | bigint) => {
    return (
      amount?.toLocaleString(undefined, {
        style: "currency",
        currency: currency,
      }) || "0"
    );
  };

  React.useEffect(() => {
    setCurrencySymbol(
      countries.find((c) => c.currency === currency)?.currencySymbol || "€"
    );
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{ currency, currencySymbol, setCurrency, formatCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextProps => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
