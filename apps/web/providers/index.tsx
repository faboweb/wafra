import * as React from 'react';
import { ThemeProviderWrapper } from './theme';
import { ThirdwebProvider } from '../node_modules/thirdweb/dist/esm/exports/react.js';
import { AccountProvider } from '../hooks/useAccount';
import { CurrencyProvider } from '../hooks/useCurrency';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        <CurrencyProvider>
          <AccountProvider>
            <SafeAreaProvider>
              <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
            </SafeAreaProvider>
          </AccountProvider>
        </CurrencyProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}
