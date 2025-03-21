import React from 'react';
import { View, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAccount } from '../hooks/useAccount';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { account } = useAccount();
  const [isInitialMount] = React.useState(true);

  React.useEffect(() => {
    const initializeApp = async () => {
      // Add a small delay to show the splash screen
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (account) {
        console.log('Account exists, navigating to Dashboard');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' as never }],
        });
      } else {
        console.log('No account, navigating to Onboarding');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' as never }],
        });
      }
    };

    if (isInitialMount) {
      initializeApp();
    }
  }, [account, navigation, isInitialMount]);

  return (
    <View className="flex-1">
      <Image
        source={require('../assets/splash.png')}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashScreen;
