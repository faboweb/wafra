import { Button, TextInput, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import countries from "../../constants/countries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FUND_CONTRACT } from "@/constants/addresses";
import {
  onRampSDKNativeEvent,
  startOnrampSDK,
} from "@onramp.money/onramp-react-native-sdk";
import { useActiveAccount } from "thirdweb/react";

export default function WelcomeScreen({}) {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState();
  const [amount, setAmount] = useState(100);
  const account = useActiveAccount();

  useEffect(() => {
    AsyncStorage.getItem("account").then((value) => {
      if (!value) {
        return;
      }
      const account = JSON.parse(value);
      setSelectedCountry(account.country);
    });
  });

  const deposit = async () => {
    console.log(account);
    startOnrampSDK({
      appId: 1424661, // Replace this with the appID obtained during onboarding
      walletAddress: account?.address, // Replace with the user's wallet address
      flowType: 1, // 1 -> Onramp, 2 -> Offramp, 3 -> Merchant checkout
      // fiatType: 1, // 1 -> INR, 2 -> TRY (Turkish Lira) etc. visit Fiat Currencies page to view full list of supported fiat currencies
      // paymentMethod: 1, // 1 -> Instant transfer (UPI), 2 -> Bank transfer (IMPS/FAST)
      // ... Include other configuration options here
      addressTag: account?.address,
      fiatAmount: 100,
    });
  };

  useEffect(() => {
    const onRampEventListener = onRampSDKNativeEvent.addListener(
      "widgetEvents",
      async (eventData) => {
        console.log("Received onRampEvent:", eventData);
        if (eventData.type === "ONRAMP_WIDGET_CLOSE_REQUEST_CONFIRMED") {
          return;
        }
        // router.push("/confirmation");
      }
    );

    return () => {
      onRampEventListener.remove();
    };
  }, []);

  return (
    <View style={{ gap: 2, padding: 16 }}>
      <ThemedText>How much do you want to invest?</ThemedText>
      <TextInput
        keyboardType="numeric"
        placeholder="Enter amount"
        onChangeText={(t) => setAmount(Number(t))}
      />
      <ThemedText>Your Country</ThemedText>
      <Picker
        selectedValue={
          countries.find((c) => c.value === selectedCountry)?.value
        }
        onValueChange={(itemValue: any) => setSelectedCountry(itemValue)}
      >
        {countries.map((country) => (
          <Picker.Item
            key={country.value}
            label={country.label}
            value={country.value}
          />
        ))}
      </Picker>

      <Button onPress={() => deposit()} title="Deposit" />
    </View>
  );
}
