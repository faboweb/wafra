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

const Dashboard = () => {
  const { account } = useAccount();
  const { data: balances } = useBalances();
  const { data: transactions, isLoading: isHistoryLoading } = useHistory();
  const { formatCurrency } = useCurrency();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (!account) {
      navigation.navigate('Login');
    }
  }, [account, navigation]);

  const handleDeposit = () => {
    navigation.navigate('Deposit');
  };

  const handleSend = () => {
    navigation.navigate('Send');
  };

  const handleWithdraw = () => {
    navigation.navigate('Withdraw');
  };

  const handleViewAllHistory = () => {
    navigation.navigate('History');
  };

  const handleWalletPress = () => {
    navigation.navigate('Wallet');
  };

  const handleEarnPress = () => {
    navigation.navigate('Earn');
  };

  const formattedTransactions: Transaction[] =
    transactions?.map((tx) => ({
      icon: tx.type === 'deposit' ? ArrowDownToLine : Send,
      title: tx.type === 'deposit' ? 'Deposit' : 'Transfer',
      amount: formatCurrency(Number(tx.value)),
      isPositive: tx.type === 'deposit',
    })) || [];

  return (
    <View className="flex-1 bg-white">
      <Header />
      <ScrollView className="flex-1 px-4">
        <Balance
          totalBalance={formatCurrency(balances?.balance || 0)}
          profit={formatCurrency(balances?.effectiveYield || 0)}
        />
        <QuickActions onDeposit={handleDeposit} onSend={handleSend} onWithdraw={handleWithdraw} />
        <WalletAndEarn
          wallet={{
            amount: formatCurrency(balances?.availableBalance || 0),
            apy: 0.44,
            onPress: handleWalletPress,
          }}
          earn={{
            amount: formatCurrency(0),
            apy: 0.44,
            onPress: handleEarnPress,
          }}
        />
        <History
          transactions={formattedTransactions}
          onViewAll={handleViewAllHistory}
          onDeposit={handleDeposit}
          isLoading={isHistoryLoading}
        />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Dashboard;
