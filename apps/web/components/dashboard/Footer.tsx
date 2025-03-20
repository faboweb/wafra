import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Home, TrendingUp, CreditCard, Users } from 'lucide-react-native';
import { FooterButton } from './FooterButton';
export const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleHomePress = () => {
    navigation.navigate('Dashboard');
  };

  const handleEarnPress = () => {
    navigation.navigate('Earn');
  };

  const handleCardPress = () => {
    navigation.navigate('Card');
  };

  const handleReferralsPress = () => {
    navigation.navigate('Referrals');
  };

  return (
    <View className="overflow-hidden w-full absolute bottom-0 left-0">
      <View className="bg-wafra-green-lightest w-full h-[72px] px-4 py-2 gap-4 items-center">
        <View className="flex-row gap-3 items-center">
          <FooterButton
            icon={Home}
            caption="Home"
            disabled={route.name !== 'Dashboard'}
            onPress={handleHomePress}
          />
          <FooterButton
            icon={TrendingUp}
            caption="Earn"
            disabled={route.name !== 'Earn'}
            onPress={handleEarnPress}
          />
          <FooterButton
            icon={CreditCard}
            caption="Card"
            disabled={route.name !== 'Card'}
            onPress={handleCardPress}
          />
          <FooterButton
            icon={Users}
            caption="Referrals"
            disabled={route.name !== 'Referrals'}
            onPress={handleReferralsPress}
          />
        </View>
      </View>
    </View>
  );
};
