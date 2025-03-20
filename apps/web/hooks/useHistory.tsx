import { useQuery } from '@tanstack/react-query';
import { useAccount } from './useAccount';
import { query } from '@/lib/query';

export interface Transaction {
  id: string;
  type:
    | 'usdc.transfer'
    | 'deposit'
    | 'redemption.requested'
    | 'redemption.processed'
    | 'fund.transfer';
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  status?: 'pending' | 'completed' | 'failed';
}

export interface HistoricalBalance {
  timestamp: Date;
  balance: string;
  convertedBalance: number;
  currency: string;
}

interface UseHistoryOptions {
  from?: Date;
  to?: Date;
  currency?: string;
}

async function fetchHistory(
  address: string,
  options: UseHistoryOptions = {}
): Promise<Transaction[]> {
  const params = new URLSearchParams({
    from:
      options.from?.toISOString() || new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    to: options.to?.toISOString() || new Date().toISOString(),
    currency: options.currency || 'USD',
  });

  const response = await query(`${process.env.NEXT_PUBLIC_API_URL}/history/${address}?${params}`);
  return response;
}

export function useHistory(options: UseHistoryOptions = {}) {
  const { account } = useAccount();

  return useQuery({
    queryKey: ['history', account?.address, options],
    queryFn: () => fetchHistory(account?.address || '', options),
    enabled: !!account?.address,
    staleTime: 1000 * 60 * 5,
  });
}
