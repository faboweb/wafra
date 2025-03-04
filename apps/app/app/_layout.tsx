import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Providers } from "./providers";
import { View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#dfffdf",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Providers>
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
            name="(dashboard)"
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
      </Providers>
    </View>
  );
}
