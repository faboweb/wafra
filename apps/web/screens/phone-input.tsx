import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from '../components/ui/text';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/ui/button';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { requestVerificationCode } from '../lib/thirdweb';

const PhoneInputScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const phoneNumber = parsePhoneNumberFromString(phone);
      if (phoneNumber) {
        if (phoneNumber.isValid()) {
          if (phoneNumber.country) {
            setError('');
            setCountry(phoneNumber.country);
          } else {
            setError('Need to use international prefix');
          }
        } else {
          setError('Invalid phone number');
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [phone]);

  const handleContinue = async () => {
    if (!phone) {
      setError('Please enter a valid phone number and country code');
      return;
    }

    try {
      await requestVerificationCode(phone);
      navigation.navigate('PhoneVerification' as never, {
        phone,
        country,
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View className="flex-1 bg-wafra-yellow p-6">
      <Text className="text-[32px] leading-[56px] font-semibold font-poppins text-wafra-gray text-center mb-8">
        Open Your Account
      </Text>
      <View className="flex-1 justify-center">
        <View className="items-center">
          <View className="w-full px-4">
            <TextInput
              className="w-full h-16 bg-white rounded-lg px-4 text-xl"
              placeholder="Phone Number"
              placeholderTextColor="#71717a"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
            {error && <Text className="text-red-500 mt-2 text-center">{error}</Text>}
          </View>
        </View>
      </View>
      <Button onPress={handleContinue}>
        <Text className="text-white text-base font-medium font-poppins">Continue</Text>
      </Button>
    </View>
  );
};

export default PhoneInputScreen;
