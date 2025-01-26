import * as React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import { FontFamily, FontSize, Color, Gap } from "@/GlobalStyles";

export type UnderlineInputType = {
  prefix?: string;
  onChangeText?: (text: string) => void;
  value?: number;
};

const UnderlineInput = ({
  prefix = "EGP",
  onChangeText,
  value: externalValue,
}: UnderlineInputType) => {
  const [value, setValue] = React.useState(externalValue);

  React.useEffect(() => {
    setValue(externalValue);
  }, [externalValue]);

  return (
    <View style={styles.textfield}>
      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>{prefix}</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="10000"
          value={value?.toString()}
          // placeholderTextColor={Color.colorGray_100}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  prefix: {
    fontWeight: "600",
    fontFamily: FontFamily.poppinsLight,
    fontSize: FontSize.size_13xl,
    letterSpacing: 0.6,
    lineHeight: 38,
  },
  input: {
    fontSize: FontSize.size_13xl,
    letterSpacing: 0.6,
    lineHeight: 38,
  },
  inputContainer: {
    fontSize: FontSize.size_13xl,
    letterSpacing: 0.6,
    lineHeight: 38,
    color: Color.colorGray_100,
    textAlign: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  border: {
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderTopWidth: 1,
    width: 328,
    height: 1,
  },
  textfield: {
    alignItems: "center",
    justifyContent: "center",
    gap: Gap.gap_sm,
    zIndex: 1,
  },
});

export default UnderlineInput;
