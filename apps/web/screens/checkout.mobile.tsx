import * as React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TransakWebView, Transak, Events } from '@transak/react-native-sdk';
import { useAccount } from '@/hooks/useAccount';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { createTransakConfig } from '@/lib/transak';
import { storeOrderId } from 'lib/transak';

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

  const transakConfig = createTransakConfig({
    orderId,
    amount,
    currency,
    depositAddress: depositAddress!,
  });

  const handleTransakEvent = (event: Transak.EVENTS) => {
    console.log('event', event);

    if (event === Events.ORDER_FAILED) {
      navigation.navigate('Deposit', { error: true });
    }

    if (event === Events.ORDER_CREATED) {
    }

    if (event === Events.ORDER_PROCESSING) {
      setOrderProcessing?.(true);
    }

    if (event === Events.ORDER_COMPLETED) {
      navigation.navigate('Depositing', { orderId } as never);
    }

    if (event === Events.ORDER_CANCELLED) {
      navigation.navigate('Deposit');
    }

    if (event === Events.ORDER_SUCCESSFUL) {
      navigation.navigate('Depositing', { orderId } as never);
    }

    if (event === Events.WIDGET_CLOSE) {
      navigation.navigate('Deposit');
    }
  };

  return (
    <View className="flex-1">
      <View className={`h-${orderProcessing ? '0' : 'full'}`}>
        <TransakWebView transakConfig={transakConfig} onTransakEvent={handleTransakEvent} />
        <View className="p-4">
          <Button variant="destructive" onPress={() => navigation.navigate('Deposit')}>
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
