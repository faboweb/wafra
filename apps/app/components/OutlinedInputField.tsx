import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import {
  FontFamily,
  FontSize,
  Color,
  Gap,
  Padding,
  Border,
} from "@/GlobalStyles";

export type OutlinedInputFieldType = {
  showCaption?: boolean;

  /** Variant props */
  assistiveText?: boolean;
  interactionState?: string;
  trailingOption?: string;
};

const OutlinedInputField = ({
  assistiveText = true,
  interactionState = "2. Focused",
  trailingOption = "Icon",
  showCaption = false,
}: OutlinedInputFieldType) => {
  return (
    <View style={styles.email}>
      <View style={styles.maincomponentOutlinedInput}>
        <View style={[styles.inputTextTrailingContent, styles.textFlexBox]}>
          <View style={[styles.leadingTextCursor, styles.textFlexBox]}>
            <Text style={styles.inputText}>Phone Number</Text>
            <View style={styles.cursor} />
          </View>
          <View style={[styles.trailingIconOrText, styles.textFlexBox]}>
            <Image
              style={styles.trailingIcon}
              contentFit="cover"
              source={require("@/assets/trailing-icon.png")}
            />
            <Text style={styles.trailingText}>Edit</Text>
          </View>
        </View>
        <View style={[styles.labelContainer, styles.textFlexBox]}>
          <View style={[styles.label, styles.labelFlexBox]}>
            <Text style={[styles.label1, styles.label1Typo]}>Label</Text>
          </View>
        </View>
      </View>
      {showCaption && (
        <View style={[styles.captionContainer, styles.labelFlexBox]}>
          <Text style={[styles.caption, styles.label1Typo]}>
            Assistive text
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  labelFlexBox: {
    paddingVertical: 0,
    height: 22,
    alignItems: "center",
    flexDirection: "row",
  },
  label1Typo: {
    fontFamily: FontFamily.caption,
    lineHeight: 16,
    fontSize: FontSize.caption_size,
    textAlign: "left",
    letterSpacing: 0,
  },
  inputText: {
    textAlign: "left",
    color: Color.textSecondary,
    fontFamily: FontFamily.subtitle1,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0,
    fontSize: FontSize.subtitle1_size,
  },
  cursor: {
    backgroundColor: Color.primary500,
    width: 1,
    height: 17,
    display: "none",
  },
  leadingTextCursor: {
    gap: Gap.gap_5xs,
  },
  trailingIcon: {
    width: 24,
    height: 24,
    display: "none",
  },
  trailingText: {
    textAlign: "right",
    color: Color.link,
    display: "none",
    fontFamily: FontFamily.subtitle1,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0,
    fontSize: FontSize.subtitle1_size,
  },
  trailingIconOrText: {
    width: 60,
    gap: Gap.gap_3xs,
    height: 24,
  },
  inputTextTrailingContent: {
    marginTop: -12,
    right: 12,
    left: 16,
    justifyContent: "space-between",
    top: "50%",
    position: "absolute",
    flexDirection: "row",
  },
  label1: {
    color: Color.link,
  },
  label: {
    backgroundColor: Color.widgetBackground,
    paddingHorizontal: Padding.p_9xs,
    flex: 1,
  },
  labelContainer: {
    marginTop: -38,
    right: 0,
    left: 0,
    paddingLeft: Padding.p_xs,
    paddingRight: Padding.p_2xs,
    display: "none",
    top: "50%",
    position: "absolute",
    flexDirection: "row",
  },
  maincomponentOutlinedInput: {
    borderRadius: Border.br_9xs,
    borderStyle: "solid",
    borderColor: Color.border,
    borderWidth: 1,
    height: 56,
    alignSelf: "stretch",
  },
  caption: {
    flex: 1,
    color: Color.textSecondary,
    fontFamily: FontFamily.caption,
    lineHeight: 16,
    fontSize: FontSize.caption_size,
  },
  captionContainer: {
    paddingHorizontal: Padding.p_base,
    display: "none",
    alignSelf: "stretch",
  },
  email: {
    borderRadius: Border.br_81xl,
    alignSelf: "stretch",
  },
});

export default OutlinedInputField;
