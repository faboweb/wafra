import { View, Text, ScrollView } from 'react-native';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

interface Transaction {
  id: string;
  description: string;
  amount: string;
  date: string;
  type: 'income' | 'expense';
}

const transactions: Transaction[] = [
  {
    id: '1',
    description: 'Salary',
    amount: '+$3,000.00',
    date: '2024-03-20',
    type: 'income',
  },
  {
    id: '2',
    description: 'Rent',
    amount: '-$1,500.00',
    date: '2024-03-19',
    type: 'expense',
  },
  {
    id: '3',
    description: 'Freelance Work',
    amount: '+$500.00',
    date: '2024-03-18',
    type: 'income',
  },
];

export function TransactionHistory() {
  return (
    <Card className="p-4">
      <Text className="text-lg font-semibold mb-4">Recent Transactions</Text>
      <ScrollView>
        {transactions.map((transaction) => (
          <View
            key={transaction.id}
            className="flex-row justify-between items-center py-3 border-b border-gray-200 last:border-0">
            <View>
              <Text className="text-base font-medium text-gray-900">{transaction.description}</Text>
              <Text className="text-sm text-gray-500">{transaction.date}</Text>
            </View>
            <View className="items-end">
              <Text
                className={cn(
                  'text-base font-medium',
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                )}>
                {transaction.amount}
              </Text>
              <Badge
                variant={transaction.type === 'income' ? 'default' : 'destructive'}
                className="mt-1">
                {transaction.type}
              </Badge>
            </View>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
}
