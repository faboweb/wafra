import * as React from 'react';
import { View } from 'react-native';
import Header from '../components/dashboard/Header';
import { Overview } from '../components/dashboard/Overview';
import { TransactionHistory } from '../components/dashboard/TransactionHistory';
import { Footer } from '../components/dashboard/Footer';
import { useAccount } from '../hooks/useAccount';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const { account } = useAccount();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (!account) {
      navigation.navigate('Login');
    }
  }, []);

  return (
    <View className="flex-1 w-full h-full bg-transparent p-6">
      <View className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-[#dfffdf] to-white" />
      <Header />
      <Overview />
      <TransactionHistory />
      <Footer />
    </View>
  );
};

export default Dashboard;
