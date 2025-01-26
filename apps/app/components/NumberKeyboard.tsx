import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "@/GlobalStyles";

export type NumberKeyboardType = {
  showDribble?: boolean;
  onPress: (value: number) => void;
  onDelete?: () => void;
};

const NumberKeyboard = ({
  showDribble,
  onPress,
  onDelete,
}: NumberKeyboardType) => {
  return (
    <View style={styles.numberKeyboard}>
      <View style={[styles.rectangleParent, styles.vectorIconLayout]}>
        {/* <View style={styles.groupChild} />
        <View style={[styles.groupItem, styles.groupLayout]} />
        <View style={[styles.groupInner, styles.groupLayout]} />
        <View style={[styles.rectangleView, styles.groupLayout]} />
        <View style={[styles.groupChild1, styles.groupLayout]} />
        <View style={[styles.groupChild2, styles.groupChildPosition1]} />
        <View style={[styles.groupChild3, styles.groupChildPosition1]} />
        <View style={[styles.groupChild4, styles.groupChildPosition1]} />
        <View style={[styles.groupChild5, styles.groupChildPosition1]} />
        <View style={[styles.groupChild6, styles.groupChildPosition]} />
        <View style={[styles.groupChild7, styles.groupChildPosition]} />
        <View style={[styles.groupChild8, styles.groupChildPosition]} />
        <View style={[styles.groupChild9, styles.groupChildPosition]} /> */}
        {/* {showDribble && (
          <Image
            source={require("@/assets/vector-2.svg")}
            style={[
              styles.vectorIcon,
              styles.vectorIconLayout,
              {
                width: 633,
                height: 291,
              },
            ]}
          />
        )} */}
        <Pressable onPress={onDelete}>
          <Image
            source={require("@/assets/frame.svg")}
            style={[
              styles.frameIcon,
              {
                width: 32,
                height: 32,
              },
            ]}
          />
        </Pressable>
        <Text style={[styles.text, styles.textRow1]} onPress={() => onPress(1)}>
          1
        </Text>
        <Text
          style={[styles.text1, styles.textRow1]}
          onPress={() => onPress(2)}
        >
          2
        </Text>
        <Text
          style={[styles.text2, styles.textRow1]}
          onPress={() => onPress(3)}
        >
          3
        </Text>
        <Text
          style={[styles.text3, styles.textRow2]}
          onPress={() => onPress(4)}
        >
          4
        </Text>
        <Text
          style={[styles.text4, styles.textRow2]}
          onPress={() => onPress(5)}
        >
          5
        </Text>
        <Text
          style={[styles.text5, styles.textRow2]}
          onPress={() => onPress(6)}
        >
          6
        </Text>
        <Text
          style={[styles.text6, styles.textRow3]}
          onPress={() => onPress(7)}
        >
          7
        </Text>
        <Text
          style={[styles.text7, styles.textRow3]}
          onPress={() => onPress(8)}
        >
          8
        </Text>
        <Text
          style={[styles.text8, styles.textRow1]}
          onPress={() => onPress(0)}
        >
          0
        </Text>
        <Text
          style={[styles.text9, styles.textRow3]}
          onPress={() => onPress(9)}
        >
          9
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout: {
    width: 633,
    position: "absolute",
  },
  groupLayout: {
    height: 80,
    width: 109,
    left: 102,
    backgroundColor: Color.colorLightgoldenrodyellow,
    position: "absolute",
  },
  groupChildPosition1: {
    left: 211,
    height: 80,
    width: 109,
    backgroundColor: Color.colorLightgoldenrodyellow,
    position: "absolute",
  },
  groupChildPosition: {
    left: 319,
    height: 80,
    width: 109,
    backgroundColor: Color.colorLightgoldenrodyellow,
    position: "absolute",
  },
  textRow1: {
    textAlign: "center",
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    lineHeight: 45,
    letterSpacing: 0.6,
    fontSize: FontSize.size_13xl,
    position: "absolute",
  },
  textRow2: {
    top: 112,
    textAlign: "center",
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    lineHeight: 45,
    letterSpacing: 0.6,
    fontSize: FontSize.size_13xl,
    position: "absolute",
  },
  textRow3: {
    top: 192,
    textAlign: "center",
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    lineHeight: 45,
    letterSpacing: 0.6,
    fontSize: FontSize.size_13xl,
    position: "absolute",
  },
  groupChild: {
    left: 78,
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorLightgoldenrodyellow,
    top: 0,
    position: "absolute",
    height: 447,
    width: 375,
  },
  groupItem: {
    top: 14,
  },
  groupInner: {
    top: 94,
  },
  rectangleView: {
    top: 174,
  },
  groupChild1: {
    top: 254,
  },
  groupChild2: {
    top: 14,
  },
  groupChild3: {
    top: 94,
  },
  groupChild4: {
    top: 174,
  },
  groupChild5: {
    top: 254,
  },
  groupChild6: {
    top: 14,
  },
  groupChild7: {
    top: 94,
  },
  groupChild8: {
    top: 174,
  },
  groupChild9: {
    top: 254,
  },
  vectorIcon: {
    top: 64,
    left: 0,
  },
  frameIcon: {
    top: 278,
    left: 358,
    position: "absolute",
    overflow: "hidden",
  },
  text: {
    left: 151,
    top: 32,
    textAlign: "center",
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    lineHeight: 45,
    letterSpacing: 0.6,
    fontSize: FontSize.size_13xl,
  },
  text1: {
    left: 256,
    top: 32,
    textAlign: "center",
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    lineHeight: 45,
    letterSpacing: 0.6,
    fontSize: FontSize.size_13xl,
  },
  text2: {
    left: 364,
    top: 32,
    textAlign: "center",
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    lineHeight: 45,
    letterSpacing: 0.6,
    fontSize: FontSize.size_13xl,
  },
  text3: {
    left: 146,
  },
  text4: {
    left: 256,
  },
  text5: {
    left: 363,
  },
  text6: {
    left: 147,
  },
  text7: {
    left: 256,
  },
  text8: {
    top: 272,
    left: 255,
  },
  text9: {
    left: 363,
  },
  rectangleParent: {
    left: -78,
    top: 0,
    width: 633,
    height: 447,
  },
  numberKeyboard: {
    overflow: "hidden",
    height: 447,
    width: 375,
  },
});

export default NumberKeyboard;
