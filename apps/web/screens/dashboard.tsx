import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Banknote, ArrowDownToLine, Wallet, Send } from 'lucide-react-native';
import { useAccount } from '@/hooks/useAccount';
import Header from '@/components/dashboard/Header';
import { Balance } from '@/components/dashboard/Balance';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { WalletAndEarn } from '@/components/dashboard/WalletAndEarn';
import { History, Transaction } from '@/components/dashboard/History';
import { Footer } from '@/components/dashboard/Footer';

const Dashboard = () => {
  const { account } = useAccount();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (!account) {
      navigation.navigate('Login');
    }
  }, [account, navigation]);

  const transactions: Transaction[] = [
    {
      icon: Banknote,
      title: 'Payouts February',
      amount: 'E£12,345.67',
      isPositive: true,
    },
    {
      icon: ArrowDownToLine,
      title: 'Bond Payout',
      amount: 'E£9,876.54',
      isPositive: true,
    },
    {
      icon: Wallet,
      title: 'Deposited',
      amount: 'E£4,567.89',
      isPositive: true,
    },
    {
      icon: Send,
      title: 'Sent To @ahmed',
      amount: 'E£3,765.43',
      isPositive: false,
    },
  ];

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

  return (
    <View className="flex-1 bg-white">
      <Header />
      <ScrollView className="flex-1">
        <Balance totalBalance="E£20,116.99" profit="+E£20,116.99" />
        <QuickActions onDeposit={handleDeposit} onSend={handleSend} onWithdraw={handleWithdraw} />
        <WalletAndEarn
          wallet={{
            amount: 'E£20,116.99',
            apy: '30%',
            onPress: handleWalletPress,
          }}
          earn={{
            amount: 'E£5,116.99',
            apy: '45%',
            onPress: handleEarnPress,
          }}
        />
        <History transactions={transactions} onViewAll={handleViewAllHistory} />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Dashboard;
