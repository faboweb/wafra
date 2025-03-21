import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Providers } from 'providers';

import DashboardPage from 'screens/dashboard';
import DepositPage from 'screens/deposit';
import CheckoutPageWeb from 'screens/checkout.web';
import CheckoutPageMobile from 'screens/checkout.mobile';
import DepositingPage from 'screens/depositing';
import OnboardingScreen from '../screens/onboarding';
import PhoneInputScreen from '../screens/phone-input';
import PhoneVerificationScreen from '../screens/phone-verification';
import { Platform } from 'react-native';
import SplashScreen from '../screens/splash';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  PhoneInput: undefined;
  PhoneVerification: {
    phoneNumber: string;
    country: string;
  };
  Dashboard: undefined;
  Deposit: undefined;
  Checkout: {
    orderId: string;
    amount: number;
    currency: string;
  };
  Depositing: {
    orderId: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Providers>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="PhoneInput" component={PhoneInputScreen} />
          <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
          <Stack.Screen name="Dashboard" component={DashboardPage} />
          <Stack.Screen
            name="Deposit"
            component={DepositPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={Platform.OS === 'web' ? CheckoutPageWeb : CheckoutPageMobile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Depositing"
            component={DepositingPage}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </Providers>
    </NavigationContainer>
  );
}
