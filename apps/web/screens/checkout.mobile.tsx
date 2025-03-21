import * as React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  TransakWebView,
  Environments,
  Events,
  TransakConfig,
  EventTypes,
} from '@transak/react-native-sdk';
import { useAccount } from '@/hooks/useAccount';
import { useState } from 'react';
import { query } from '@/lib/query';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { depositAddress } = useAccount();
  const { orderId, amount, currency } = route.params as {
    orderId: string;
    amount: number;
    currency: string;
  };
  const [orderProcessing, setOrderProcessing] = useState(false);

  const transakConfig: TransakConfig = {
    apiKey: process.env.EXPO_PUBLIC_TRANSAK_API_KEY!,
    environment: Environments.STAGING,
    partnerOrderId: orderId,
    fiatAmount: Number(amount),
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

  const handleTransakEvent = async (event: EventTypes) => {
    if (event === Events.ORDER_COMPLETED) {
      console.log('Order successful');
      setOrderProcessing(false);
      navigation.navigate('Dashboard' as never);
    }
    if (event === Events.ORDER_FAILED) {
      console.log('Order failed');
      setOrderProcessing(false);
      navigation.navigate('Deposit' as never, { error: true } as never);
    }
    if (event === Events.ORDER_CREATED) {
      await storeOrderId();
    }
    if (event === Events.ORDER_PROCESSING) {
      setOrderProcessing(true);
    }

    console.log('Transak event: ', event);
  };

  const abortOrder = async () => {
    setOrderProcessing(false);
    navigation.navigate('Deposit' as never);
  };

  console.log('Order processing: ', orderProcessing);

  return (
    <View className="flex-1">
      <View className={`h-${orderProcessing ? '0' : 'full'}`}>
        <TransakWebView transakConfig={transakConfig} onTransakEvent={handleTransakEvent} />
        <View className="p-4">
          <Button variant="destructive" onPress={abortOrder}>
            <Text>Abort</Text>
          </Button>
        </View>
      </View>
      <View className={`h-${orderProcessing ? 'full' : '0'} items-center justify-center`}>
        <Text className="text-lg font-medium">Processing...</Text>
      </View>
    </View>
  );
}
