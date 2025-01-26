import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Icons from "@/assets/icons.svg";
import PinInput from "@/components/PinInput";
import NumberKeyboard from "@/components/NumberKeyboard";
import Btn from "@/components/Btn";
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Border,
} from "../../GlobalStyles";
import { useRouter } from "expo-router";

const PhoneVerification = () => {
  const router = useRouter();

  return (
    <View style={styles.phoneVerification}>
      <View style={styles.headerParent}>
        <View style={styles.header}>
          <View style={styles.frame}>
            <Icons style={styles.icons} width={24} height={24} />
            <Text style={styles.phoneVerification1}>Phone Verification</Text>
          </View>
        </View>
        <Text style={styles.weSentYouContainer}>
          <Text style={styles.weSentYou}>{`We sent you an SMS code to
`}</Text>
          <Text style={styles.text}>+62 812 3456 789</Text>
        </Text>
        <View style={styles.form}>
          <PinInput />
          <Text style={styles.didntReceiveCodeContainer}>
            <Text
              style={styles.didntReceiveCode}
            >{`Didn’t receive code? `}</Text>
            <Text style={styles.requestAgain}>Request Again</Text>
          </Text>
        </View>
      </View>
      <View style={styles.keyboard}>
        <View style={styles.frame1}>
          <NumberKeyboard showDribble color="Green" line />
          <View style={styles.buttongroup}>
            <Btn
              icon={false}
              size="Large"
              getStarted="Verify"
              onButtonPress={() => router.push("/Fingerprint")}
            />
            <View style={styles.buttongroupChild} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    position: "relative",
    overflow: "hidden",
  },
  phoneVerification1: {
    position: "relative",
    fontSize: FontSize.size_lg,
    letterSpacing: 0.4,
    lineHeight: 25,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorGray_100,
    textAlign: "center",
  },
  frame: {
    width: 251,
    height: 25,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 53,
  },
  header: {
    alignSelf: "stretch",
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  weSentYou: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorBlack,
  },
  text: {
    fontSize: FontSize.subtitle1_size,
    fontWeight: "700",
    fontFamily: FontFamily.dMSansBold,
    color: "#21897e",
  },
  weSentYouContainer: {
    position: "relative",
    textAlign: "center",
  },
  didntReceiveCode: {
    fontFamily: FontFamily.dMSansRegular,
  },
  requestAgain: {
    fontWeight: "700",
    fontFamily: FontFamily.dMSansBold,
  },
  didntReceiveCodeContainer: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0.4,
    color: Color.colorBlack,
    textAlign: "center",
    height: 19,
    marginLeft: 2,
  },
  form: {
    alignSelf: "stretch",
    height: 99,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 27,
  },
  headerParent: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: Padding.p_5xl,
    paddingTop: Padding.p_5xl,
    gap: 35,
    zIndex: 0,
  },
  buttongroupChild: {
    position: "relative",
    backgroundColor: Color.colorGainsboro,
    width: 100,
    height: 24,
  },
  buttongroup: {
    width: 327,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: -92,
  },
  frame1: {
    flex: 1,
    height: 447,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  keyboard: {
    alignSelf: "stretch",
    position: "absolute",
    bottom: 0,
    left: 0,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1,
  },
  phoneVerification: {
    position: "relative",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.widgetBackground,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 74,
  },
});

export default PhoneVerification;
