import { Image, View } from 'react-native';
import FooterButton from './FooterButton';

export const Footer = () => {
  return (
    <View className="overflow-hidden w-full absolute bottom-0 left-0">
      <View className="bg-[#eff1ef] w-full h-[72px] px-4 py-2 gap-4 items-center">
        <View className="flex-row gap-3 items-center">
          <FooterButton image={require('@/assets/home04.svg')} caption="Home" />
          <FooterButton image={require('@/assets/tradeup.svg')} caption="Earn" disabled />
          <FooterButton image={require('@/assets/creditcard.svg')} caption="Card" disabled />
          <FooterButton image={require('@/assets/starfour.svg')} caption="Referrals" disabled />
        </View>
        <Image
          source={require('@/assets/vector-1.svg')}
          style={{ maxHeight: '100%', width: 120 }}
        />
      </View>
    </View>
  );
};
