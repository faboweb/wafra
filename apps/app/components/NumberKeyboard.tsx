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
      {showDribble && (
        <Image
          source={require("@/assets/vector-2.svg")}
          style={[
            styles.vectorIcon,
            {
              width: 633,
              height: 291,
              position: "absolute",
            },
          ]}
        />
      )}
      <Text style={[styles.text]} onPress={() => onPress(1)}>
        1
      </Text>
      <Text style={[styles.text]} onPress={() => onPress(2)}>
        2
      </Text>
      <Text style={[styles.text]} onPress={() => onPress(3)}>
        3
      </Text>
      <Text style={[styles.text]} onPress={() => onPress(4)}>
        4
      </Text>
      <Text style={[styles.text]} onPress={() => onPress(5)}>
        5
      </Text>
      <Text style={[styles.text]} onPress={() => onPress(6)}>
        6
      </Text>
      <Text style={[styles.text]} onPress={() => onPress(7)}>
        7
      </Text>
      <Text style={[styles.text]} onPress={() => onPress(8)}>
        8
      </Text>
      <Text style={[styles.text]} onPress={() => onPress(9)}>
        9
      </Text>
      <Text
        style={[
          styles.text,
          {
            visibility: "hidden",
          },
        ]}
      ></Text>
      <Text style={[styles.text]} onPress={() => onPress(0)}>
        0
      </Text>
      <Pressable
        onPress={onDelete}
        style={[
          styles.text,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Image
          source={require("@/assets/frame.svg")}
          style={[
            {
              width: 32,
              height: 32,
            },
          ]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIcon: {
    top: 64,
    left: 0,
  },
  text: {
    textAlign: "center",
    color: Color.colorGray_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    lineHeight: 60,
    letterSpacing: 0.6,
    fontSize: FontSize.size_13xl,
    width: "33.333%",
    height: 64,
    // backgroundColor: Color.colorBeige,
  },
  numberKeyboard: {
    overflow: "hidden",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 375,
  },
});

export default NumberKeyboard;
