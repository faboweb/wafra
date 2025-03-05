import React, { createContext, useContext, useState, ReactNode } from "react";

interface InsetColorContextProps {
  topInsetColor: string;
  bottomInsetColor: string;
  setTopInsetColor: (color: string) => void;
  setBottomInsetColor: (color: string) => void;
  setInsetColors: (top: string, bottom: string) => void;
}

const InsetColorContext = createContext<InsetColorContextProps | undefined>(
  undefined
);

export const InsetColorProvider = ({ children }: { children: ReactNode }) => {
  const [topInsetColor, setTopInsetColor] = useState<string>("#000000");
  const [bottomInsetColor, setBottomInsetColor] = useState<string>("#000000");

  const setInsetColors = (top: string, bottom: string) => {
    setTopInsetColor(top);
    setBottomInsetColor(bottom);
  };

  return (
    <InsetColorContext.Provider
      value={{
        topInsetColor,
        bottomInsetColor,
        setTopInsetColor,
        setBottomInsetColor,
        setInsetColors,
      }}
    >
      {children}
    </InsetColorContext.Provider>
  );
};

export const useInsetColor = () => {
  const context = useContext(InsetColorContext);
  if (context === undefined) {
    throw new Error("useInsetColor must be used within an InsetColorProvider");
  }
  return context;
};
