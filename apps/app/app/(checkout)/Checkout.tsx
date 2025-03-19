import * as React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
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
import { useState } from "react";
import { query } from "@/data/query";

export default function Checkout() {
  const router = useRouter();
  const route = useRoute();
  const { depositAddress } = useAccount();
  const params = route.params as {
    orderId: string;
    amount: number;
    currency: string;
  };
  const [orderProcessing, setOrderProcessing] = useState(false);
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
      await query(
        `${process.env.EXPO_PUBLIC_API_URL}/orders/${params.orderId}`,
        {
          method: "POST",
        }
      );
    } catch (err: any) {
      throw new Error("Order wasn't tracked: ", err.message);
    }
  };

  const handleTransakEvent = async (event: EventTypes) => {
    if (event === Events.ORDER_COMPLETED) {
      console.log("Order successful");
      setOrderProcessing(false);

      router.push(`/(dashboard)`);
    }
    if (event === Events.ORDER_FAILED) {
      console.log("Order failed");
      setOrderProcessing(false);

      router.push("/?error=true");
    }
    if (event === Events.ORDER_CREATED) {
      await storeOrderId();
    }
    if (event === Events.ORDER_PROCESSING) {
      setOrderProcessing(true);
    }

    console.log("Transak event: ", event);
  };

  const abortOrder = async () => {
    setOrderProcessing(false);
    router.back();
  };

  console.log("Order processing: ", orderProcessing);

  return (
    <View style={[styles.container]}>
      <View style={{ height: orderProcessing ? "0%" : "100%" }}>
        <TransakWebView
          transakConfig={transakConfig}
          onTransakEvent={handleTransakEvent}
        />
        <View>
          <Button title="Abort" onPress={abortOrder} />
        </View>
      </View>
      <View style={{ height: orderProcessing ? "100%" : "0%" }}>
        <Text>Processing...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
