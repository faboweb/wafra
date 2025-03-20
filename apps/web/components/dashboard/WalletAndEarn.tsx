import { Text, View } from 'react-native';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ChevronRight } from 'lucide-react-native';

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
        <Text className="text-base font-medium">{title}</Text>
        <ChevronRight size={16} className="text-foreground" />
      </View>
    </CardHeader>
    <CardContent>
      <Text className="text-xl font-semibold mb-1">{amount}</Text>
      <Text className="text-sm text-[#71717a]">{apy} Avg. APY</Text>
    </CardContent>
  </Card>
);

type WalletAndEarnProps = {
  wallet: {
    amount: string;
    apy: string;
    onPress?: () => void;
  };
  earn: {
    amount: string;
    apy: string;
    onPress?: () => void;
  };
};

export const WalletAndEarn = ({ wallet, earn }: WalletAndEarnProps) => {
  return (
    <View className="flex-row px-4 gap-4 mt-4">
      <StatCard title="Wallet" amount={wallet.amount} apy={wallet.apy} onPress={wallet.onPress} />
      <StatCard title="Earn" amount={earn.amount} apy={earn.apy} onPress={earn.onPress} />
    </View>
  );
};
