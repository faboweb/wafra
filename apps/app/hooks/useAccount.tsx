import React, { createContext, useContext, useState, ReactNode } from "react";

interface Account {
  country: string;
  address: string;
  phone: string;
}

interface AccountContextProps {
  account: Account | null;
  setAccount: (account: Account) => void;
}

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
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
