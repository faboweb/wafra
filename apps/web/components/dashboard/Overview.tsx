import { View, Text } from 'react-native';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

function StatCard({ title, value, change, isPositive }: StatCardProps) {
  return (
    <Card className="p-4">
      <Text className="text-sm text-gray-600">{title}</Text>
      <Text className="text-2xl font-bold text-gray-900 mt-1">{value}</Text>
      {change && (
        <Badge variant={isPositive ? 'default' : 'secondary'} className="mt-2">
          {change}
        </Badge>
      )}
    </Card>
  );
}

export function Overview() {
  return (
    <View className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <StatCard title="Total Balance" value="$12,345.67" change="+2.4%" isPositive />
      <StatCard title="Monthly Income" value="$3,456.78" change="+1.2%" isPositive />
      <StatCard title="Monthly Expenses" value="$2,345.67" change="-0.8%" isPositive={false} />
    </View>
  );
}
