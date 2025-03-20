import * as React from "react";
import { Image } from "@/components/CrossPlatformImage";
import { StyleSheet, Text, View } from "react-native";
import Btn from "@/components/Btn";
import { FontSize, FontFamily, Color } from "@/GlobalStyles";
import { useRouter } from "@/hooks/useRouter";
import { useInsetColor } from "@/hooks/useInsetColor";
import { useAccount } from "@/hooks/useAccount";
import { useEffect } from "react";

const Onboarding = () => {
  const router = useRouter();
  const { setInsetColors } = useInsetColor();
  const { account } = useAccount();

  React.useEffect(() => {
    setInsetColors(
      Color.colorLightgoldenrodyellow,
      Color.colorLightgoldenrodyellow
    );
  }, []);

  useEffect(() => {
    if (account) {
      router.push("/(dashboard)");
    }
  }, [account]);

  return (
    <View style={styles.onboarding}>
      <Image source={"@/assets/vector-2.svg"} style={styles.ornamentIcon} />
      <Image source={"@/assets/ornament1.svg"} style={styles.ornamentIcon} />
      <Text style={[styles.aNewEra, styles.aNewEraPosition]}>
        A New Era of Saving Money!
      </Text>
      <Image
        style={styles.imageIcon}
        contentFit="cover"
        source={"@/assets/image@3x.png"}
      />
      <Image
        style={styles.ornamentIcon2}
        contentFit="cover"
        source={"@/assets/ornament3@3x.png"}
      />
      <Image
        style={[styles.wafraConcept1b1Icon, styles.aNewEraPosition]}
        contentFit="cover"
        source={"@/assets/logo.svg"}
      />
      <Btn
        style={{
          marginTop: "auto",
          marginBottom: 24,
          marginLeft: 24,
          marginRight: 24,
        }}
        caption="Get Started"
        onButtonPress={() => router.push("/(onboard)/SignUp")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  aNewEraPosition: {
    left: 24,
    position: "absolute",
  },
  ornamentIcon: {
    top: 461,
    left: -94,
    position: "absolute",
  },
  ornamentIcon1: {
    top: "22.12%",
    right: "25.68%",
    bottom: "72.35%",
    left: "12.08%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  aNewEra: {
    top: 152,
    fontSize: FontSize.size_21xl,
    lineHeight: 56,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorGray_100,
    textAlign: "left",
    width: 327,
  },
  imageIcon: {
    top: 353,
    left: 61,
    width: 342,
    height: 465,
    position: "absolute",
  },
  ornamentIcon2: {
    top: 372,
    left: 294,
    width: 45,
    height: 45,
    position: "absolute",
    overflow: "hidden",
  },
  wafraConcept1b1Icon: {
    top: 80,
    width: 111,
    height: 33,
    overflow: "hidden",
  },
  onboarding: {
    backgroundColor: Color.colorLightgoldenrodyellow,
    flex: 1,
    overflow: "hidden",
  },
});

export default Onboarding;
