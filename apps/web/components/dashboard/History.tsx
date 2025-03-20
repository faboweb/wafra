import { Text, View } from 'react-native';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Banknote, ArrowDownToLine, Send } from 'lucide-react-native';

type Transaction = {
  icon: any;
  title: string;
  amount: string;
  isPositive: boolean;
};

type TransactionItemProps = {
  transaction: Transaction;
};

const TransactionItem = ({ transaction }: TransactionItemProps) => (
  <View className="flex-row items-center justify-between py-2">
    <View className="flex-row items-center gap-3">
      <View className="w-10 h-10 rounded-full bg-wafra-green-light items-center justify-center">
        <transaction.icon size={20} className="text-wafra-green" />
      </View>
      <View>
        <Text className="text-base font-medium text-wafra-black">{transaction.title}</Text>
        <Text className="text-sm text-wafra-gray">Today, 12:30 PM</Text>
      </View>
    </View>
    <Text
      className={`text-base font-medium ${transaction.isPositive ? 'text-wafra-green' : 'text-wafra-black'}`}>
      {transaction.isPositive ? '+' : '-'}
      {transaction.amount}
    </Text>
  </View>
);

const TransactionSkeleton = () => (
  <View className="flex-row items-center justify-between py-2">
    <View className="flex-row items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <View className="gap-1">
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-32 h-4" />
      </View>
    </View>
    <Skeleton className="w-20 h-5" />
  </View>
);

const NoTransactionsCard = ({ onDeposit }: { onDeposit: () => void }) => (
  <Card className="mt-4">
    <CardContent className="items-center py-8">
      <View className="w-16 h-16 rounded-full bg-wafra-green-light items-center justify-center mb-4">
        <Banknote size={32} className="text-wafra-green" />
      </View>
      <Text className="text-xl font-semibold text-wafra-black mb-2">Start Investing Now</Text>
      <Text className="text-wafra-gray text-center mb-6">
        Make your first deposit and start earning with Wafra
      </Text>
      <Button onPress={onDeposit} className="bg-wafra-green">
        <Text className="text-white font-medium">Deposit</Text>
      </Button>
    </CardContent>
  </Card>
);

type HistoryProps = {
  transactions: Transaction[];
  onViewAll: () => void;
  onDeposit: () => void;
  isLoading?: boolean;
};

export const History = ({ transactions, onViewAll, onDeposit, isLoading }: HistoryProps) => {
  if (isLoading) {
    return (
      <Card className="mt-4">
        <CardHeader className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-wafra-black">History</Text>
          <Button variant="ghost" onPress={onViewAll}>
            <Text className="text-wafra-green">View All</Text>
          </Button>
        </CardHeader>
        <CardContent>
          {[1, 2, 3, 4, 5].map((i) => (
            <TransactionSkeleton key={i} />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return <NoTransactionsCard onDeposit={onDeposit} />;
  }

  return (
    <Card className="mt-4">
      <CardHeader className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-wafra-black">History</Text>
        <Button variant="ghost" onPress={onViewAll}>
          <Text className="text-wafra-green">View All</Text>
        </Button>
      </CardHeader>
      <CardContent>
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
      </CardContent>
    </Card>
  );
};
