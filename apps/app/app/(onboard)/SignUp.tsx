import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import PhoneForm from "@/components/PhoneForm";
import Btn from "@/components/Btn";
import {
  FontSize,
  FontFamily,
  Color,
  Gap,
  Padding,
  Border,
} from "../../GlobalStyles";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  return (
    <View style={styles.signUp}>
      <View style={[styles.topsection, styles.heroFlexBox]}>
        <View style={[styles.hero, styles.heroSpaceBlock]}>
          <Image
            source={require("@/assets/ornament.svg")}
            style={[
              styles.ornamentIcon,
              {
                width: 462,
                height: 152,
              },
            ]}
          />
          <Text style={styles.openYourAccount}>Open Your Account</Text>
        </View>
        <PhoneForm />
      </View>
      <View style={[styles.buttongroup, styles.heroSpaceBlock]}>
        <Btn
          caption="Continue"
          onButtonPress={() => router.push("/PhoneVerification")}
        />
        <View style={styles.buttongroupChild} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroFlexBox: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  heroSpaceBlock: {
    paddingVertical: 0,
    overflow: "hidden",
  },
  ornamentIcon: {
    top: 7,
    left: -55,
    position: "absolute",
    zIndex: 0,
  },
  openYourAccount: {
    fontSize: FontSize.size_21xl,
    lineHeight: 56,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorGray_100,
    textAlign: "center",
    zIndex: 1,
    flex: 1,
  },
  hero: {
    height: 241,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 50,
    alignSelf: "stretch",
    alignItems: "center",
  },
  topsection: {
    gap: Gap.gap_2xl,
    zIndex: 0,
  },
  buttongroupChild: {
    backgroundColor: Color.colorGainsboro,
    width: 100,
    height: 24,
  },
  buttongroup: {
    bottom: 0,
    left: 0,
    width: 375,
    paddingHorizontal: Padding.p_5xl,
    zIndex: 1,
    position: "absolute",
  },
  signUp: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorLightgoldenrodyellow,
    width: "100%",
    height: 812,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xl,
    gap: 167,
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
});

export default SignUp;
