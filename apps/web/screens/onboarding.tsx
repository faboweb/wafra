import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '../components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/ui/button';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-wafra-yellow">
      {/* Logo */}
      <Image
        source={require('../assets/logo.svg')}
        style={{
          width: 111,
          height: 33,
        }}
      />

      {/* Main Content */}
      <View className="flex-1 px-6 pt-32">
        <View className="relative">
          <Text
            className="text-5xl leading-[56px] font-semibold font-poppins text-black"
            style={{
              fontSize: 42,
              lineHeight: 56,
              fontFamily: 'Poppins-Bold',
            }}>
            A New Era of{'\n'}Saving Money!
          </Text>
          <Image
            source={require('../assets/dribble-line-green.svg')}
            style={{
              width: 180,
              height: 8,
            }}
          />
        </View>

        <View className="flex-1"></View>

        {/* Bottom Image */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
          <Image
            source={require('../assets/women-phone.png')}
            style={{
              width: 320,
              height: 500,
            }}
          />
          <Image
            source={require('../assets/new-dribble.png')}
            style={{
              width: 60,
              height: 60,
              position: 'absolute',
              top: 16,
              right: 30,
            }}
          />
        </View>

        {/* Bottom Button */}
        <View className="mb-8">
          <Button
            onPress={() => navigation.navigate('PhoneInput' as never)}
            className="w-full bg-black rounded-full py-4">
            <Text className="text-white text-base font-medium font-poppins">Get Started</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
