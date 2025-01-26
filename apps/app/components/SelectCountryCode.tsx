import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Toggleicon from "@/assets/toggle-icon.svg";
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Gap,
  Border,
} from "@/GlobalStyles";

const SelectCountryCode = () => {
  return (
    <View style={styles.inputBox}>
      <View style={[styles.inputTextAddons, styles.inputFlexBox]}>
        <Image
          style={styles.addonLeftIcon}
          contentFit="cover"
          source={require("@/assets/addon-left.png")}
        />
        <View style={[styles.inputTextBox, styles.inputFlexBox]}>
          <Text style={styles.inputValue}>+1</Text>
        </View>
        <View style={styles.addonRight} />
        <Image
          source={require("@/assets/toggle-icon.svg")}
          style={[
            styles.toggleIcon,
            {
              width: 20,
              height: 20,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFlexBox: {
    flex: 1,
    flexDirection: "row",
  },
  addonLeftIcon: {
    width: 24,
    height: 16,
  },
  inputValue: {
    fontSize: FontSize.subtitle1_size,
    lineHeight: 24,
    fontFamily: FontFamily.textMdL24Regular,
    color: Color.colorTextNeutralSubtle100,
    textAlign: "left",
  },
  inputTextBox: {
    overflow: "hidden",
    flex: 1,
  },
  addonRight: {
    width: 16,
    justifyContent: "center",
    display: "none",
    height: 16,
    alignItems: "center",
  },
  toggleIcon: {},
  inputTextAddons: {
    alignSelf: "stretch",
    paddingHorizontal: Padding.p_xs,
    paddingVertical: 0,
    gap: Gap.gap_3xs,
    alignItems: "center",
  },
  inputBox: {
    shadowColor: "#fcfcfd",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 1,
    borderRadius: Border.br_7xs,
    backgroundColor: Color.widgetBackground,
    borderStyle: "solid",
    borderColor: Color.colorBorderPrimaryBold100,
    borderWidth: 1,
    width: 160,
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
});

export default SelectCountryCode;
