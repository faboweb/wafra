import { Text, View } from 'react-native';
import { useCurrency } from '../../hooks/useCurrency';
type BalanceProps = {
  totalBalance: number;
  profit: number;
};

export const Balance = ({ totalBalance, profit }: BalanceProps) => {
  const { formatCurrency } = useCurrency();
  return (
    <View className="px-4 py-6">
      <Text className="text-wafra-gray text-sm mb-1">Total Balance</Text>
      <Text className="text-[32px] font-semibold mb-1 text-wafra-black">
        {formatCurrency(totalBalance || 0)}
      </Text>
      <Text className="text-wafra-green text-lg">{formatCurrency(profit || 0)}</Text>
    </View>
  );
};
