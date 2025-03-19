import React from "react";
import { Platform } from "react-native";
import { BrowserRouter } from "react-router-dom";

type RouterProviderProps = {
  children: React.ReactNode;
};

export function RouterProvider({ children }: RouterProviderProps) {
  // On mobile, we don't need this provider as Expo Router handles it
  if (Platform.OS !== "web") {
    return <>{children}</>;
  }

  // On web, wrap with BrowserRouter
  return <BrowserRouter>{children}</BrowserRouter>;
}
