import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Banknote, ArrowDownToLine, Wallet, Send } from 'lucide-react-native';
import { useAccount } from '@/hooks/useAccount';
import { useBalances } from '@/hooks/useBalances';
import { useHistory } from '@/hooks/useHistory';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/dashboard/Header';
import { Balance } from '@/components/dashboard/Balance';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { WalletAndEarn } from '@/components/dashboard/WalletAndEarn';
import { History, Transaction } from '@/components/dashboard/History';
import { Footer } from '@/components/dashboard/Footer';
import { CrossPlatformGradient } from 'components/ui/CrossPlatformGradient';

const Dashboard = () => {
  const navigation = useNavigation();
  const { account } = useAccount();
  const { data: balances, refetch: refetchBalances } = useBalances();
  const { data: transactions, isLoading } = useHistory();
  const { formatCurrency } = useCurrency();

  React.useEffect(() => {
    if (!account) {
      navigation.navigate('Login');
    }
  }, [account]);

  const formattedTransactions = transactions?.map((tx) => ({
    ...tx,
    icon: tx.type === 'deposit' ? 'arrow-down-circle' : 'arrow-up-circle',
    title: tx.type === 'deposit' ? 'Deposit' : 'Transfer',
  }));

  if (!account) {
    return null;
  }

  return (
    <View className="flex-1 bg-gradient-to-b from-wafra-green-lightest to-white">
      <ScrollView className="flex-1 px-4">
        <Header />
        <Balance
          balance={balances?.total || 0}
          effectiveYield={balances?.effectiveYield || 0}
          onRefresh={refetchBalances}
        />
        <QuickActions
          onDeposit={() => navigation.navigate('Deposit')}
          onSend={() => {}}
          onWithdraw={() => {}}
        />
        <WalletAndEarn
          availableBalance={balances?.available || 0}
          earnedBalance={balances?.earned || 0}
          yield={balances?.yield || 0}
          effectiveYield={balances?.effectiveYield || 0}
        />
        <History transactions={formattedTransactions || []} isLoading={isLoading} />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
