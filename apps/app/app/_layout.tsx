import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Providers } from "../providers/providers";
import RouterMobile from "./_router.mobile";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <Providers>
      <RouterMobile />
    </Providers>
  );
}
