import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Btn from "@/components/Btn";
import { FontSize, FontFamily, Color, Border } from "@/GlobalStyles";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccount } from "@/hooks/useAccount";

const UnlockScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { account, unlock } = useAccount();

  React.useEffect(() => {
    if (account) {
      router.push("/(dashboard)");
    }
  }, []);

  // React.useEffect(() => {
  //   enableFaceId();
  // }, []);

  return (
    <View style={styles.fingerprint}>
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: Color.colorLightgoldenrodyellow,
        }}
      />
      <View style={[styles.hero, styles.heroLayout]}>
        <View style={[styles.frame, styles.heroLayout]}>
          <Text style={[styles.enableFingerprint, styles.scanning67FlexBox]}>
            Unlock Wafra
          </Text>
          <View style={styles.fingerprint1}>
            <Image
              style={[styles.frameIcon, styles.framePosition]}
              contentFit="cover"
              source={require("@/assets/frame1.png")}
            />
          </View>
        </View>
      </View>
      <View style={[styles.buttongroup]}>
        <Btn
          icon={false}
          caption="Next"
          onButtonPress={() => unlock()}
          style={{
            width: "100%",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroLayout: {
    alignItems: "center",
    overflow: "hidden",
  },
  scanning67FlexBox: {
    textAlign: "center",
    letterSpacing: 0.4,
  },
  framePosition: {
    position: "absolute",
    overflow: "hidden",
  },
  enableFingerprint: {
    fontSize: FontSize.size_lg,
    lineHeight: 25,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorGray_100,
  },
  scanning: {
    fontFamily: FontFamily.dMSansRegular,
  },
  text: {
    fontWeight: "700",
    fontFamily: FontFamily.dMSansBold,
  },
  scanning67: {
    fontSize: FontSize.size_sm,
    lineHeight: 22,
    color: Color.colorBlack,
  },
  frame1: {
    marginTop: 95.5,
    marginLeft: -172,
    top: "50%",
    left: "50%",
    width: 344,
    alignItems: "center",
  },
  frameIcon: {
    top: 0,
    left: 0,
    height: 181,
    width: 136,
  },
  fingerprint1: {
    height: 235,
    width: 136,
  },
  frame: {
    justifyContent: "center",
    gap: 54,
  },
  hero: {
    zIndex: 0,
  },
  buttongroup: {
    marginTop: "auto",
  },
  fingerprint: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorLightgoldenrodyellow,
    flex: 1,
    height: "100%",
    padding: 24,
    paddingTop: 200,
    overflow: "hidden",
  },
});

export default UnlockScreen;
