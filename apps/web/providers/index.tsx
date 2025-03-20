import * as React from 'react';
import { ThemeProviderWrapper } from './theme';
// import { ThirdwebProvider } from 'thirdweb/react';
import { AccountProvider } from '../hooks/useAccount';
import { CurrencyProvider } from '../hooks/useCurrency';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThirdwebProvider> */}
      <CurrencyProvider>
        <AccountProvider>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </AccountProvider>
      </CurrencyProvider>
      {/* </ThirdwebProvider> */}
    </QueryClientProvider>
  );
}
