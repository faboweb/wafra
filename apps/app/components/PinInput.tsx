import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const PinInput = () => {
  return (
    <View style={styles.verification}>
      <View style={styles.verificationChild} />
      <View style={styles.verificationItem} />
      <View style={styles.verificationInner} />
      <View style={styles.lineView} />
      <Text style={styles.text}>8</Text>
      <Text style={styles.text1}>3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  verificationChild: {
    position: "absolute",
    top: 53,
    left: 0,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderTopWidth: 1,
    width: 57,
    height: 1,
  },
  verificationItem: {
    position: "absolute",
    top: 53,
    left: 72,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderTopWidth: 1,
    width: 57,
    height: 1,
  },
  verificationInner: {
    position: "absolute",
    top: 53,
    left: 144,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderTopWidth: 1,
    width: 57,
    height: 1,
  },
  lineView: {
    position: "absolute",
    top: 53,
    left: 216,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderTopWidth: 1,
    width: 57,
    height: 1,
  },
  text: {
    position: "absolute",
    top: 0,
    left: 70,
    fontSize: FontSize.size_13xl,
    letterSpacing: 0.6,
    lineHeight: 45,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorGray_100,
    textAlign: "center",
  },
  text1: {
    position: "absolute",
    top: 0,
    left: 18,
    fontSize: FontSize.size_13xl,
    letterSpacing: 0.6,
    lineHeight: 45,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorGray_100,
    textAlign: "center",
  },
  verification: {
    width: 272,
    height: 53,
    marginLeft: 1,
  },
});

export default PinInput;
