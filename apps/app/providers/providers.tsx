import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ThirdwebProvider } from "thirdweb/react";
import { AccountProvider } from "@/hooks/useAccount";
import { CurrencyProvider } from "@/hooks/useCurrency";
import { ReactNode } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuProvider } from "react-native-popup-menu";
import { InsetColorProvider } from "@/hooks/useInsetColor";
import { RouterProvider } from "@/providers/RouterProvider";

export function Providers({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider>
        <CurrencyProvider>
          <AccountProvider>
            <ThirdwebProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <InsetColorProvider>
                  <MenuProvider>{children}</MenuProvider>
                </InsetColorProvider>
              </ThemeProvider>
            </ThirdwebProvider>
          </AccountProvider>
        </CurrencyProvider>
      </RouterProvider>
    </QueryClientProvider>
  );
}
