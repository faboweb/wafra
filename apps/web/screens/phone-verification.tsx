import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../components/ui/text';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../components/ui/button';
import { NumberKeyboard } from '../components/ui/number-keyboard';
import OTPInput, { OTPInputRef } from '../components/ui/otp-input';
import { useAccount } from '../hooks/useAccount';
import { connectWallet, requestVerificationCode } from '../lib/thirdweb';

const PhoneVerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { signIn } = useAccount();
  const [otp, setOTP] = React.useState('');
  const otpRef = React.useRef<OTPInputRef>(null);

  const phone = (route.params as any)?.phone || '';

  const verifyOtp = async () => {
    try {
      const account = await connectWallet(phone, otp);
      signIn(account);
    } catch (err) {
      console.log('Failed to verify OTP', err);
    }
  };

  const requestAgain = async () => {
    try {
      await requestVerificationCode(phone);
    } catch (err) {
      console.log('Failed to request code again', err);
    }
  };

  const handleKeyPress = (value: number) => {
    if (otp.length < 6) {
      setOTP(otp + value);
      // Focus next input after a short delay to ensure state is updated
      setTimeout(() => {
        otpRef.current?.focusNext(otp.length);
      }, 50);
    }
  };

  const handleDelete = () => {
    if (otp.length > 0) {
      setOTP(otp.slice(0, -1));
      // Focus the current input after a short delay to ensure state is updated
      setTimeout(() => {
        otpRef.current?.focusPrevious(otp.length);
      }, 50);
    }
  };

  return (
    <View className="flex-1 bg-wafra-yellow">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Text className="text-2xl">←</Text>
        </Pressable>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-4 justify-center">
        <View className="items-center gap-4">
          <Text className="text-center">
            <Text className="text-sm font-dm-sans text-black">We sent you an SMS code to </Text>
            <Text className="text-base font-bold font-dm-sans text-wafra-green">
              {phone.trim().startsWith('+') ? phone.trim() : '+' + phone.trim()}
            </Text>
          </Text>

          <OTPInput ref={otpRef} value={otp} onChange={setOTP} />

          <View className="flex-row gap-3 w-full items-center justify-center">
            <Text className="text-sm text-black">Didn't receive code?</Text>
            <Pressable onPress={requestAgain}>
              <Text className="text-sm font-bold text-wafra-green">Request Again</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="px-4 pb-6">
        <View className="w-full">
          <NumberKeyboard showDribble onPress={handleKeyPress} onDelete={handleDelete} />
        </View>
        <Button className="mt-6" onPress={verifyOtp}>
          <Text className="text-white text-base font-medium font-poppins">Verify</Text>
        </Button>
      </View>
    </View>
  );
};

export default PhoneVerificationScreen;
