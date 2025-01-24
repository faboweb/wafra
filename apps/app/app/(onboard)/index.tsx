import { Button, TextInput, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { client } from "@/constants/thirdweb";
import { preAuthenticate } from "thirdweb/wallets";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import { useRef, useState } from "react";

import countries from "../../constants/countries";

export default function WelcomeScreen({}) {
  const router = useRouter();
  const [country, setCountry] = useState();
  const [phone, setPhoneNumber] = useState("");

  const connect = async () => {
    const countryCode = countries.find((c) => c.value === country)?.phoneCode;
    const phoneNumber = countryCode + phone;
    console.log("Phone number", phoneNumber);
    await preAuthenticate({
      client,
      strategy: "phone",
      phoneNumber,
    });
    router.push("/verify?phone=" + phoneNumber + "&country=" + country);
  };

  return (
    <View style={{ gap: 2, padding: 16 }}>
      <ThemedText type="subtitle">Welcome To Wafra</ThemedText>
      <ThemedText type="subtext">Start Making Money</ThemedText>
      <View style={{ marginVertical: 16 }}>
        <ThemedText type="subtext">Country</ThemedText>

        <Picker
          selectedValue={country}
          onValueChange={(itemValue) => setCountry(itemValue)}
        >
          {countries.map((c) => (
            <Picker.Item key={c.value} label={c.label} value={c.value} />
          ))}
        </Picker>
        <ThemedText type="subtext">Phone Number</ThemedText>
        <TextInput
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
      <Button onPress={() => connect()} title="Continue" />
    </View>
  );
}
