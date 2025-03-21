import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Providers } from 'providers';

import DashboardPage from 'screens/dashboard';
import DepositPage from 'screens/deposit';
import CheckoutPage from 'screens/checkout';
import DepositingPage from 'screens/depositing';
import OnboardingScreen from '../screens/onboarding';
import PhoneInputScreen from '../screens/phone-input';
import PhoneVerificationScreen from '../screens/phone-verification';

export type RootStackParamList = {
  Onboarding: undefined;
  PhoneInput: undefined;
  PhoneVerification: {
    phone: string;
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
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
          }}>
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
            component={CheckoutPage}
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
