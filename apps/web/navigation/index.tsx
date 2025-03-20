import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Providers } from 'providers';

import DashboardPage from 'screens/dashboard';

export type RootStackParamList = {
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Providers>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen
            name="Dashboard"
            component={DashboardPage}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </Providers>
    </NavigationContainer>
  );
}
