import { Text, View } from 'react-native';

type BalanceProps = {
  totalBalance: string;
  profit: string;
};

export const Balance = ({ totalBalance, profit }: BalanceProps) => {
  return (
    <View className="px-4 py-6">
      <Text className="text-[#71717a] text-sm mb-1">Total Balance</Text>
      <Text className="text-[32px] font-semibold mb-1">{totalBalance}</Text>
      <Text className="text-[#22c55e] text-lg">{profit}</Text>
    </View>
  );
};
