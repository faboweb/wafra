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
import { Platform, StyleSheet, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    DMSans: require("@/assets/fonts/DMSans-Regular.ttf"),
    DMSansBold: require("@/assets/fonts/DMSans-Bold.ttf"),
    // TODO
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThirdwebProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View style={[styles.statusBarBackground]}></View>
        <Stack
          screenOptions={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
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
  );
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Platform.OS === "ios" ? 40 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "#dfffdf",
  },
});
