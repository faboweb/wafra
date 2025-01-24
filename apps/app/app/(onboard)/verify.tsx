import { View, Button } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { TextInput } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { inAppWallet } from "thirdweb/wallets";
import { client } from "@/constants/thirdweb";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export default function VerifyScreen({}) {
  const router = useRouter();
  const { phone, country } = useLocalSearchParams<{
    phone: string;
    country: string;
  }>();
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    console.log("verifying otp", phone, otp);
    var wallet = inAppWallet();
    try {
      const account = await wallet.connect({
        client,
        chain: {
          id: 1,
          rpc: "https://mainnet.infura.io/v3/1c9b1b3f3b8b4f",
        },
        strategy: "phone",
        phoneNumber: "+" + phone.trim(),
        verificationCode: otp,
      });
      const localAccount = JSON.stringify({
        phone,
        country,
        address: account.address,
      });
      await AsyncStorage.setItem("account", localAccount);
      await SecureStore.setItemAsync("account", localAccount, {
        requireAuthentication: true,
      });
      router.push("../dashboard");
    } catch (err) {
      console.log("Failed to verify OTP", err);
    }
  };

  return (
    <View style={{ gap: 2, padding: 16 }}>
      <ThemedText type="title">Enter OTP</ThemedText>

      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <Button onPress={() => verifyOtp()} title="Verify" />
    </View>
  );
}
