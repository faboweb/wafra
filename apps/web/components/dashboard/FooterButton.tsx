import { Image, Text, View } from 'react-native';

export type FooterButtonType = {
  image: any;
  caption: string;
  disabled?: boolean;
};

const FooterButton = ({ image, caption, disabled }: FooterButtonType) => {
  return (
    <View className={`w-[77px] items-center gap-1 ${disabled ? 'opacity-50' : ''}`}>
      <Image source={image} style={{ width: 24, height: 24 }} />
      <Text className="self-stretch text-[11px] font-inter text-[#010e01] text-center">
        {caption}
      </Text>
    </View>
  );
};

export default FooterButton;
