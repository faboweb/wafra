import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Transak } from '@transak/transak-sdk';
import { useAccount } from '@/hooks/useAccount';
import { Text } from '@/components/ui/text';
import { createTransakConfig } from '@/lib/transak';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { depositAddress } = useAccount();

  const { orderId, amount, currency } = route.params as {
    orderId: string;
    amount: number;
    currency: string;
  };

  const transakConfig = createTransakConfig({
    orderId,
    amount,
    currency,
    depositAddress: depositAddress!,
  });

  useEffect(() => {
    if (!depositAddress) {
      alert('No deposit address found');
      navigation.navigate('Dashboard' as never);
      return;
    }

    const transak = new Transak(transakConfig);
    transak.init();

    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      console.log(Transak.EVENTS.TRANSAK_WIDGET_CLOSE);
      transak.close();
      navigation.navigate('Deposit' as never);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, async (orderData) => {
      console.log(Transak.EVENTS.TRANSAK_ORDER_CREATED);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, async (orderData) => {
      console.log(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL);
      transak.close();
      navigation.navigate('Depositing' as never, { orderId } as never);
    });

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_FAILED, async (orderData) => {
      console.log(Transak.EVENTS.TRANSAK_ORDER_FAILED);
      transak.close();
      navigation.navigate('Deposit' as never, { error: true } as never);
    });

    return () => {
      transak.close();
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-medium">Processing...</Text>
    </View>
  );
}
