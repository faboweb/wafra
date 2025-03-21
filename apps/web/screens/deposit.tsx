import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useAccount } from '@/hooks/useAccount';
import { useCurrency } from '@/hooks/useCurrency';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NumberKeyboard } from '@/components/ui/number-keyboard';

export default function DepositScreen() {
  const [amount, setAmount] = React.useState(100);
  const navigation = useNavigation();
  const { account } = useAccount();
  const { currency } = useCurrency();

  React.useEffect(() => {
    if (!account) {
      navigation.navigate('Login' as never);
    }
  }, [account]);

  const deposit = () => {
    if (!account) return;

    const orderId = Math.random().toString(36).substring(2, 15);
    navigation.navigate(
      'Checkout' as never,
      {
        orderId,
        amount,
        currency,
      } as never
    );
  };

  if (!account) {
    return null;
  }

  return (
    <View className="flex-1 bg-wafra-green-lightest">
      <View className="flex-1 p-4">
        <View className="flex-row items-center mb-4">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft className="text-wafra-gray" size={24} />
          </Pressable>
        </View>

        <View className="items-center mb-8">
          <Text className="text-2xl font-semibold text-wafra-gray mb-4">Deposit</Text>
          <Card className="w-full p-4">
            <Input
              value={amount.toString()}
              prefix={currency}
              editable={false}
              className="text-2xl font-bold text-center"
            />
          </Card>
        </View>

        <View className="flex-1">
          <NumberKeyboard
            showDribble={false}
            onPress={(val) => setAmount(amount * 10 + val)}
            onDelete={() => setAmount(Math.floor(amount / 10))}
          />
          <View className="mt-4">
            <Button onPress={deposit} className="w-full">
              Deposit
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
