import { Text, View } from 'react-native';
import { Button } from '../ui/button';
import { ArrowDownToLine, Send, ArrowUpFromLine } from 'lucide-react-native';

type QuickAction = {
  icon: any;
  label: string;
  onPress?: () => void;
};

const QuickActionButton = ({ icon: Icon, label, onPress }: QuickAction) => (
  <Button variant="ghost" className="flex-1 items-center gap-2 py-3 flex-col" onPress={onPress}>
    <View className="rounded-xl bg-gray-100 items-center justify-center p-4 web:transition-colors web:duration-200 web:hover:bg-wafra-green-light">
      <Icon
        size={20}
        className="text-gray-600 web:transition-colors web:duration-200 web:group-hover:text-wafra-green"
        color="#4b5563"
      />
    </View>
    <Text className="text-sm text-wafra-gray">{label}</Text>
  </Button>
);

type QuickActionsProps = {
  onDeposit?: () => void;
  onSend?: () => void;
  onWithdraw?: () => void;
};

export const QuickActions = ({ onDeposit, onSend, onWithdraw }: QuickActionsProps) => {
  return (
    <View className="flex-row px-4 gap-2">
      <QuickActionButton icon={ArrowDownToLine} label="Deposit" onPress={onDeposit} />
      <QuickActionButton icon={Send} label="Send" onPress={onSend} />
      <QuickActionButton icon={ArrowUpFromLine} label="Withdraw" onPress={onWithdraw} />
    </View>
  );
};
