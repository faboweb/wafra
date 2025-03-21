import { Text, View } from 'react-native';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ChevronRight } from 'lucide-react-native';
import { useCurrency } from '../../hooks/useCurrency';

type StatCardProps = {
  title: string;
  amount: string;
  apy: string;
  onPress?: () => void;
};

const StatCard = ({ title, amount, apy, onPress }: StatCardProps) => (
  <Card className="flex-1" onPress={onPress}>
    <CardHeader className="pb-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-medium text-wafra-black">{title}</Text>
        <ChevronRight size={16} className="text-wafra-black" />
      </View>
    </CardHeader>
    <CardContent>
      <Text className="text-xl font-semibold mb-1 text-wafra-black">{amount}</Text>
      <Text className="text-sm text-wafra-gray">{apy} Avg. APY</Text>
    </CardContent>
  </Card>
);

type WalletAndEarnProps = {
  wallet: {
    amount: number;
    apy: string;
    onPress?: () => void;
  };
  earn: {
    amount: number;
    apy: string;
    onPress?: () => void;
  };
};

export const WalletAndEarn = ({ wallet, earn }: WalletAndEarnProps) => {
  const { formatCurrency } = useCurrency();
  return (
    <View className="flex-row px-4 gap-4 mt-4">
      <StatCard
        title="Wallet"
        amount={formatCurrency(wallet?.amount || 0)}
        apy={wallet?.apy || '0%'}
        onPress={wallet?.onPress}
      />
      <StatCard
        title="Earn"
        amount={earn?.amount || '0'}
        apy={earn?.apy || '0%'}
        onPress={earn?.onPress}
      />
    </View>
  );
};
