import * as React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
// import OutlinedInputField from "./OutlinedInputField";
import { FontSize, FontFamily, Color, Gap, Padding } from "@/GlobalStyles";
// import Dropdown from "react-native-input-select";
// import countries from "@/constants/countries";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const PhoneForm = ({
  onChange,
}: {
  onChange: (country: string, phoneNumber: string) => void;
}) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const phoneNumber = parsePhoneNumberFromString(value);
      if (phoneNumber) {
        if (phoneNumber.isValid()) {
          if (phoneNumber.country) {
            setError("");
            onChange(phoneNumber.country, phoneNumber.number);
          } else {
            setError("Need to use international prefix");
          }
        } else {
          setError("Invalid phone number");
        }
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <View style={[styles.form, styles.formFlexBox]}>
      <View style={styles.formFlexBox}>
        <View style={styles.loginForm}>
          {/* <Dropdown
            label="Country"
            placeholder="Select your country..."
            options={countries}
            selectedValue={country}
            onValueChange={(value: any) => setCountry(value)}
            isSearchable
          /> */}
          {/* <Text style={styles.thisIsPermanent}>This is permanent</Text> */}
          <TextInput
            style={styles.inputValue}
            placeholder="Phone Number"
            placeholderTextColor={Color.colorTextNeutralSubtle100}
            onChangeText={setValue}
          />
          {error && <Text style={styles.error}>{error}</Text>}
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
    width: "100%",
    height: 100,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  form: {
    overflow: "hidden",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: 0,
  },
  error: {
    color: "#FF0000",
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  inputValue: {
    // borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    height: 64,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: Color.colorWhitesmoke,
    fontSize: FontSize.size_xl,
  },
});

export default PhoneForm;
