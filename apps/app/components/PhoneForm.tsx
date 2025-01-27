import * as React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
// import OutlinedInputField from "./OutlinedInputField";
import { FontSize, FontFamily, Color, Gap, Padding } from "@/GlobalStyles";
import Dropdown from "react-native-input-select";
import countries from "@/constants/countries";

const PhoneForm = ({
  onChange,
}: {
  onChange: (country: string, phoneNumber: string) => void;
}) => {
  const [country, setCountry] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {
    if (country && phoneNumber) onChange(country, phoneNumber);
  }, [country, phoneNumber]);

  return (
    <View style={[styles.form, styles.formFlexBox]}>
      <View style={styles.formFlexBox}>
        <View style={styles.loginForm}>
          <Dropdown
            label="Country"
            placeholder="Select your country..."
            options={countries}
            selectedValue={country}
            onValueChange={(value: any) => setCountry(value)}
            isSearchable
          />
          <Text style={styles.thisIsPermanent}>This is permanent</Text>
          <TextInput
            // style={styles.inputValue}
            placeholder="Phone Number"
            placeholderTextColor={Color.colorTextNeutralSubtle100}
            onChangeText={setPhoneNumber}
          />
          {/* <OutlinedInputField
            assistiveText
            interactionState="1 Default"
            trailingOption="None"
            showCaption={false}
          /> */}
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
