import { Pressable } from 'react-native';
import { Text } from '../ui/text';
import { LucideIcon } from 'lucide-react-native';

export type FooterButtonType = {
  icon: LucideIcon;
  caption: string;
  disabled?: boolean;
  onPress: () => void;
};

export const FooterButton = ({ icon: Icon, caption, disabled, onPress }: FooterButtonType) => {
  return (
    <Pressable
      className={`w-[77px] items-center gap-1 ${disabled ? 'opacity-50' : ''}`}
      onPress={onPress}>
      <Icon
        size={24}
        className={!disabled ? 'text-wafra-black' : 'text-wafra-gray'}
        color={!disabled ? '#010e01' : '#71717a'}
      />
      <Text className="self-stretch text-[11px] font-inter text-wafra-black text-center">
        {caption}
      </Text>
    </Pressable>
  );
};
