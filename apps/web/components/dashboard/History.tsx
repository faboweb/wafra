import { Text, View } from 'react-native';
import { Button } from '../ui/button';
import { ArrowDownToLine, Banknote, Wallet, Send } from 'lucide-react-native';

export type Transaction = {
  icon: any;
  title: string;
  amount: string;
  isPositive?: boolean;
  onPress?: () => void;
};

const TransactionItem = ({
  icon: Icon,
  title,
  amount,
  isPositive = true,
  onPress,
}: Transaction) => (
  <View className="flex-row items-center justify-between py-4" onPress={onPress}>
    <View className="flex-row items-center gap-3">
      <View className="w-10 h-10 rounded-full bg-[#e8f5e8] items-center justify-center">
        <Icon size={20} className="text-foreground" />
      </View>
      <Text className="text-base">{title}</Text>
    </View>
    <Text className={isPositive ? 'text-[#22c55e]' : 'text-[#ef4444]'}>
      {isPositive ? amount : `-${amount}`}
    </Text>
  </View>
);

type HistoryProps = {
  transactions: Transaction[];
  onViewAll?: () => void;
};

export const History = ({ transactions, onViewAll }: HistoryProps) => {
  return (
    <View className="px-4 mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-medium">History</Text>
        <Button variant="ghost" className="h-auto p-0" onPress={onViewAll}>
          <Text className="text-sm text-[#22c55e]">View All</Text>
        </Button>
      </View>
      {transactions.map((transaction, index) => (
        <TransactionItem key={index} {...transaction} />
      ))}
    </View>
  );
};
