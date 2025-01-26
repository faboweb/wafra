import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import SelectCountryCode from "./SelectCountryCode";
import OutlinedInputField from "./OutlinedInputField";
import { FontSize, FontFamily, Color, Gap, Padding } from "@/GlobalStyles";

const PhoneForm = () => {
  return (
    <View style={[styles.form, styles.formFlexBox]}>
      <View style={styles.formFlexBox}>
        <View style={styles.loginForm}>
          <SelectCountryCode />
          <Text style={styles.thisIsPermanent}>This is permanent</Text>
          <OutlinedInputField
            assistiveText
            interactionState="1 Default"
            trailingOption="None"
            showCaption={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formFlexBox: {
    justifyContent: "center",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  thisIsPermanent: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0.4,
    fontFamily: FontFamily.textMdL24Regular,
    color: Color.colorBlack,
    textAlign: "left",
  },
  loginForm: {
    height: 178,
    gap: Gap.gap_xl,
    alignSelf: "stretch",
  },
  form: {
    overflow: "hidden",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: 0,
  },
});

export default PhoneForm;
