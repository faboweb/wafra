import * as React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const PinInput = ({ value }: { value: number | undefined }) => {
  return (
    <View style={styles.verification}>
      <TextInput
        style={[
          styles.text,
          {
            letterSpacing: 20,
            lineHeight: 52,
            fontSize: 48,
            fontFamily: FontFamily.mono,
          },
        ]}
        value={value?.toString()}
        maxLength={6}
        keyboardType="numeric"
        returnKeyType="done"
      />
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginLeft: -8,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={[styles.verificationChild]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verificationChild: {
    // position: "absolute",
    // top: 53,
    // left: 0,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderTopWidth: 2,
    width: 36,
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
  text: {},
  text1: {
    position: "absolute",
    top: 0,
    left: 18,
    fontSize: FontSize.size_13xl,
    letterSpacing: 0.6,
    lineHeight: 45,
    fontWeight: "500",
    fontFamily: FontFamily.dMSansBold,
    color: Color.colorGray_100,
    textAlign: "center",
  },
  verification: {
    height: 53,
    marginLeft: 1,
  },
});

export default PinInput;
