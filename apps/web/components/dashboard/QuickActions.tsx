import { Text, View } from 'react-native';
import { Button } from '../ui/button';
import { ArrowDownToLine, Send, ArrowUpFromLine } from 'lucide-react-native';

type QuickAction = {
  icon: any;
  label: string;
  onPress?: () => void;
};

const QuickActionButton = ({ icon: Icon, label, onPress }: QuickAction) => (
  <Button variant="ghost" className="flex-1 items-center gap-2 py-3" onPress={onPress}>
    <View className="w-12 h-12 rounded-full bg-[#e8f5e8] items-center justify-center">
      <Icon size={24} className="text-foreground" />
    </View>
    <Text className="text-sm text-[#71717a]">{label}</Text>
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
