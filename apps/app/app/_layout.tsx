import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThirdwebProvider } from "thirdweb/react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";
import { AccountProvider } from "@/hooks/useAccount";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    DMSans: require("@/assets/fonts/DMSans-Regular.ttf"),
    DMSansBold: require("@/assets/fonts/DMSans-Bold.ttf"),
    // TODO
  });
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AccountProvider>
      <ThirdwebProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StatusBar />
          <Stack
            screenOptions={{
              // Hide the header for all other routes.
              headerShown: false,
              statusBarBackgroundColor: "#dfffdf",
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                statusBarBackgroundColor: "#dfffdf",
                headerStyle: {
                  backgroundColor: "#dfffdf",
                },
              }}
            />
            <Stack.Screen
              name="(onboard)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="dashboard"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="+not-found"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </ThirdwebProvider>
    </AccountProvider>
  );
}
