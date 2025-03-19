import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "@/hooks/useRouter";
import { TransakConfig, Transak } from "@transak/transak-sdk";
import { useAccount } from "@/hooks/useAccount";
import { query } from "@/data/query";

export default function Checkout() {
  const router = useRouter();
  const { depositAddress } = useAccount();
  const orderId = router.getParam("orderId");
  const amount = router.getParam("amount");
  const currency = router.getParam("currency");
  const transakConfig: TransakConfig = {
    apiKey: process.env.EXPO_PUBLIC_TRANSAK_API_KEY!,
    environment: Transak.ENVIRONMENTS.STAGING,
    partnerOrderId: orderId!,
    fiatAmount: Number(amount!),
    fiatCurrency: currency!,
    network: "base",
    cryptoCurrencyCode: "USDC",
    walletAddress: depositAddress!,
    disableWalletAddressForm: true,
    productsAvailed: "BUY",
  };
  const transak = new Transak(transakConfig);
  transak.init();

  const storeOrderId = async () => {
    try {
      await query(`${process.env.EXPO_PUBLIC_API_URL}/orders/${orderId}`, {
        method: "POST",
      });
    } catch (err: any) {
      throw new Error("Order wasn't tracked: ", err.message);
    }
  };

  Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
    router.push(`/(checkout)`);
  });

  Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, async (orderData) => {
    await storeOrderId();
  });

  Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, async (orderData) => {
    router.push(`/(dashboard)`);
  });

  Transak.on(Transak.EVENTS.TRANSAK_ORDER_FAILED, async (orderData) => {
    router.push(`/(checkout)?error=true`);
  });

  return (
    <View style={[styles.container]}>
      <View style={{ height: "100%" }}>
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
