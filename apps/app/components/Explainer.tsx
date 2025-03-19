import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Border, Color, FontSize, FontFamily } from "@/GlobalStyles";
import { Image } from "@/components/CrossPlatformImage";

const Explainer = () => {
  return (
    <View style={styles.explainer}>
      <View style={styles.card}>
        <View style={styles.cardChild} />
        <View style={styles.frame}>
          <Image
            source={require("@/assets/unlock-icon.svg")}
            style={{
              width: 56,
              height: 56,
            }}
          />
          <Text style={styles.byEnablingFingerprint}>
            By enabling fingerprint, Login becomes easier and faster.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardChild: {
    borderRadius: Border.br_5xl,
    backgroundColor: Color.widgetBackground,
    width: 144,
    height: 116,
    marginTop: 28,
  },
  frameChild: {
    position: "relative",
  },
  byEnablingFingerprint: {
    fontSize: FontSize.subtitle1_size,
    letterSpacing: 0.5,
    lineHeight: 26,
    fontFamily: FontFamily.dMSansRegular,
    color: Color.colorBlack,
    textAlign: "center",
    width: 120,
    marginTop: 68,
  },
  frame: {
    width: 327,
    height: 144,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: -279,
  },
  card: {
    width: 327,
    height: 144,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  explainer: {
    width: 327,
    height: 153,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1,
  },
});

export default Explainer;
