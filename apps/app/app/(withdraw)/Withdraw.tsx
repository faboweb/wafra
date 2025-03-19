import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useRouter } from "@/hooks/useRouter";
import {
  TransakWebView,
  Environments,
  TransakConfig,
  EventTypes,
} from "@transak/react-native-sdk";

export default function Checkout() {
  const router = useRouter();
  const orderId = router.getParam("orderId");
  const amount = router.getParam("amount");
  const currency = router.getParam("currency");

  const transakConfig: TransakConfig = {
    apiKey: process.env.EXPO_PUBLIC_TRANSAK_API_KEY!,
    environment: Environments.STAGING,
    partnerOrderId: orderId!,
    cryptoAmount: Number(amount!),
    network: "base",
    cryptoCurrencyCode: "USDC",
    productsAvailed: "SELL",

    // Add other configuration options as needed
  };

  const handleTransakEvent = (event: EventTypes) => {
    console.log(event);
  };

  return (
    <View style={styles.container}>
      <TransakWebView
        transakConfig={transakConfig}
        onTransakEvent={handleTransakEvent}
      />
      <View>
        <Button title="Abort" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
