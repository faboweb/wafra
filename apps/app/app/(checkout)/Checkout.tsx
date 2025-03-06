import * as React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
  TransakWebView,
  Environments,
  Events,
  TransakConfig,
  EventTypes,
} from "@transak/react-native-sdk";
import { useAccount } from "@/hooks/useAccount";
import { useRoute } from "@react-navigation/native";

export default function Checkout() {
  const router = useRouter();
  const route = useRoute();
  const account = useAccount();
  const params = route.params as {
    orderId: string;
    amount: number;
    currency: string;
  };

  const transakConfig = {
    apiKey: process.env.EXPO_PUBLIC_TRANSAK_API_KEY!,
    environment: Environments.STAGING,
    partnerOrderId: params.orderId,

    // Add other configuration options as needed
  };

  const handleTransakEvent = (event: EventTypes) => {
    if (event === Events.ORDER_COMPLETED) {
      console.log("Order successful");
      router.push("/DepositSuccess");
    }
    if (event === Events.ORDER_FAILED) {
      console.log("Order failed");
      router.push("/?error=true");
    }
  };

  return (
    <View style={styles.container}>
      <TransakWebView
        transakConfig={transakConfig}
        onTransakEvent={handleTransakEvent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
