import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { useInsetColor } from "@/hooks/useInsetColor";
import { useEffect } from "react";

export default function RootLayoutInner() {
  const insets = useSafeAreaInsets();
  const { topInsetColor, bottomInsetColor } = useInsetColor();

  useEffect(() => {
    console.log(topInsetColor, bottomInsetColor);
  }, [topInsetColor, bottomInsetColor]);

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#dfffdf",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundImage: `linear-gradient(to bottom, ${topInsetColor}, ${bottomInsetColor})`,
      }}
    >
      <StatusBar />
      <Stack
        screenOptions={{
          // Hide the header for all other routes.
          headerShown: false,
          statusBarBackgroundColor: topInsetColor,
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
    </View>
  );
}
