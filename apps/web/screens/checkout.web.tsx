import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TransakConfig, Transak } from '@transak/transak-sdk';
import { useAccount } from '@/hooks/useAccount';
import { query } from '@/lib/query';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { depositAddress } = useAccount();
  const { orderId, amount, currency } = route.params as {
    orderId: string;
    amount: number;
    currency: string;
  };

  const transakConfig: TransakConfig = {
    apiKey: process.env.EXPO_PUBLIC_TRANSAK_API_KEY!,
    environment: Transak.ENVIRONMENTS.STAGING,
    partnerOrderId: orderId,
    fiatAmount: amount,
    fiatCurrency: currency,
    network: 'base',
    cryptoCurrencyCode: 'USDC',
    walletAddress: depositAddress!,
    disableWalletAddressForm: true,
    productsAvailed: 'BUY',
  };

  const storeOrderId = async () => {
    try {
      await query(`/orders/${orderId}`, {
        method: 'POST',
      });
    } catch (err: any) {
      throw new Error("Order wasn't tracked: ", err.message);
    }
  };

  useEffect(() => {
    const transak = new Transak(transakConfig);
    transak.init();

    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      transak.close();
      navigation.navigate('Deposit' as never);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, async (orderData) => {
      await storeOrderId();
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, async (orderData) => {
      navigation.navigate('Dashboard' as never);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_FAILED, async (orderData) => {
      navigation.navigate('Deposit' as never, { error: true } as never);
    });

    return () => {
      transak.close();
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Processing...</Text>
    </View>
  );
}
