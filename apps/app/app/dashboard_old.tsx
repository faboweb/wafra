import { Button, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useActiveAccount } from "thirdweb/react";
import { client } from "@/constants/thirdweb";
import { getWalletBalance } from "thirdweb/wallets";
import { useRouter } from "expo-router";
import {
  startOnrampSDK,
  onRampSDKNativeEvent,
} from "@onramp.money/onramp-react-native-sdk";

import React from "react";

interface WelcomeScreenProps {}

const FUND_ERC2_ADDRESS = "";
export default function WelcomeScreen({}: WelcomeScreenProps) {
  const router = useRouter();
  const account = useActiveAccount();
  const [balance, setBalance] = React.useState(0);

  const FUND_CONTRACT = account?.address; // just funding own account for now

  React.useEffect(() => {
    const onRampEventListener = onRampSDKNativeEvent.addListener(
      "widgetEvents",
      async (eventData) => {
        // Handle all events here
        console.log("Received onRampEvent:", eventData);
        updateBalance();
      }
    );

    return () => {
      onRampEventListener.remove();
    };
  }, []);

  const updateBalance = async () => {
    if (!account) {
      return;
    }
    // TODO get from server
    var data = await getWalletBalance({
      client,
      chain: {
        id: 1,
        rpc: "https://mainnet.infura.io/v3/1c9b1b3f3b8b4f",
      },
      address: account.address,
      tokenAddress: FUND_ERC2_ADDRESS,
    });
    setBalance(parseFloat(data.displayValue));
  };

  React.useEffect(() => {
    updateBalance();
  }, [account]);

  const deposit = () => {
    startOnrampSDK({
      appId: 1424661, // Replace this with the appID obtained during onboarding
      walletAddress: FUND_CONTRACT, // Replace with the user's wallet address
      flowType: 1, // 1 -> Onramp, 2 -> Offramp, 3 -> Merchant checkout
      // fiatType: 1, // 1 -> INR, 2 -> TRY (Turkish Lira) etc. visit Fiat Currencies page to view full list of supported fiat currencies
      // paymentMethod: 1, // 1 -> Instant transfer (UPI), 2 -> Bank transfer (IMPS/FAST)
      // ... Include other configuration options here
      addressTag: account?.address,
    });
  };

  const withdraw = () => {
    startOnrampSDK({
      appId: 1424661, // Replace this with the appID obtained during onboarding
      walletAddress: account?.address, // Replace with the user's wallet address
      flowType: 2, // 1 -> Onramp, 2 -> Offramp, 3 -> Merchant checkout
      // fiatType: 1, // 1 -> INR, 2 -> TRY (Turkish Lira) etc. visit Fiat Currencies page to view full list of supported fiat currencies
      // paymentMethod: 1, // 1 -> Instant transfer (UPI), 2 -> Bank transfer (IMPS/FAST)
      // ... Include other configuration options here
    });
  };

  return (
    <View style={{ gap: 2, padding: 16 }}>
      <ThemedText type="title">Welcome To Wafra</ThemedText>
      <ThemedText type="subtitle">{account?.address}</ThemedText>
      <Button onPress={() => deposit()} title="Deposit" />
      <Button onPress={() => withdraw()} title="Withdraw" />
      <ThemedText type="subtext">Balance: {balance}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
