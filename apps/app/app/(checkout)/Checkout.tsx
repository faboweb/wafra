import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
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
    fiatAmount: params.amount,
    fiatCurrency: params.currency,
    network: "base",
    cryptoCurrencyCode: "USDC",
    walletAddress: depositAddress!,
    disableWalletAddressForm: true,
    productsAvailed: "BUY",

    // Add other configuration options as needed
  };

  const storeOrderId = async () => {
    try {
      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          Authorization: process.env.EXPO_PUBLIC_AUTHORIZATION || "",
        },
        body: JSON.stringify({ ...params, depositAddress }),
      });
    } catch (err: any) {
      throw new Error("Order wasn't tracked: ", err.message);
    }
  };

  const handleTransakEvent = async (event: EventTypes) => {
    if (event === Events.ORDER_COMPLETED) {
      console.log("Order successful");

      router.push(`/(dashboard)`);
    }
    if (event === Events.ORDER_FAILED) {
      console.log("Order failed");
      router.push("/?error=true");
    }
    if (event === Events.ORDER_CREATED) {
      await storeOrderId();
    }

    console.log("Transak event: ", event);
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
