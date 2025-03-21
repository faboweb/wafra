import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '../components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/ui/button';
import { useAccount } from '../hooks/useAccount';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const { account } = useAccount();

  React.useEffect(() => {
    if (account) {
      console.log('account', account);
      navigation.navigate('Dashboard');
    }
  }, [account]);

  return (
    <View className="flex-1 bg-wafra-yellow">
      <Image
        source={require('../assets/vector-2.svg')}
        className="absolute top-[461px] -left-[94px]"
      />
      <Image
        source={require('../assets/dribble-line-green.svg')}
        className="absolute top-[461px] -left-[94px]"
      />
      <Text className="absolute top-[152px] left-6 text-[32px] leading-[56px] font-semibold font-poppins text-wafra-gray">
        A New Era of Saving Money!
      </Text>
      <Image
        source={require('../assets/women-phone.png')}
        className="absolute top-[353px] left-[61px] w-[342px] h-[465px]"
      />
      <Image
        source={require('../assets/new-dribble.png')}
        className="absolute top-[372px] left-[294px] w-[45px] h-[45px]"
      />
      <Image
        source={require('../assets/logo.svg')}
        className="absolute top-20 left-6 w-[111px] h-[33px]"
      />
      <Button
        className="absolute bottom-6 left-6 right-6"
        onPress={() => navigation.navigate('PhoneInput' as never)}>
        <Text className="text-white text-base font-medium font-poppins">Get Started</Text>
      </Button>
    </View>
  );
};

export default OnboardingScreen;
