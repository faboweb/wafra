import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color, Gap } from "../GlobalStyles";

const Hero = () => {
  return (
    <View style={styles.hero}>
      <View style={styles.frame}>
        <View
          style={[
            styles.frame1,
            {
              position: "relative",
            },
          ]}
        >
          <Image
            source={require("@/assets/ornament4.svg")}
            style={{
              width: 499,
              height: 229,
              position: "absolute",
            }}
          />
          <View style={styles.frame2}>
            <Text style={styles.deposit}>Deposit</Text>
            <Image
              source={require("@/assets/picture.svg")}
              style={{
                width: 164,
                height: 164,
              }}
            />
          </View>
        </View>
        {/* <Image
          source={require("@/assets/frame2.svg")}
          style={[
            styles.frameIcon,
            {
              width: 24,
              height: 36,
            },
          ]}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ornamentIcon: {
    position: "relative",
  },
  deposit: {
    position: "relative",
    fontSize: FontSize.size_lg,
    letterSpacing: 0.4,
    lineHeight: 25,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorGray_100,
    textAlign: "center",
  },
  pictureIcon: {
    position: "relative",
  },
  frame2: {
    width: 219,
    height: 207,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: Gap.gap_md,
    marginTop: 12,
  },
  frame1: {
    width: 499,
    height: 229,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  frameIcon: {
    position: "relative",
    overflow: "hidden",
    marginLeft: -413,
  },
  frame: {
    width: 499,
    height: 229,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  hero: {
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 0,
  },
});

export default Hero;
