import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useRouter } from "@/hooks/useRouter";
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
  const { depositAddress } = useAccount();
  const params = route.params as {
    orderId: string;
    amount: number;
    currency: string;
  };

  const transakConfig: TransakConfig = {
    apiKey: process.env.EXPO_PUBLIC_TRANSAK_API_KEY!,
    environment: Environments.STAGING,
    partnerOrderId: params.orderId,
    cryptoAmount: params.amount,
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
