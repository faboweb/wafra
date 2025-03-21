import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useAccount } from '../hooks/useAccount';
import { useCurrency } from '../hooks/useCurrency';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { NumberKeyboard } from '../components/ui/number-keyboard';

export default function DepositScreen() {
  const [amount, setAmount] = React.useState(100);
  const navigation = useNavigation();
  const { account } = useAccount();
  const { currency } = useCurrency();

  // React.useEffect(() => {
  //   if (!account) {
  //     navigation.navigate('Login' as never);
  //   }
  // }, [account]);

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

  return (
    <View className="flex-1 bg-wafra-green-lightest">
      <View className="flex-1 p-4">
        <View className="flex-row items-center mb-4">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft className="text-wafra-gray" size={24} />
          </Pressable>
        </View>

        <View className="items-center mb-8 flex-1 justify-center">
          <Card className="w-full p-4">
            <Text className="text-2xl font-semibold text-wafra-gray mb-4 text-center">Deposit</Text>
            <Input
              value={amount.toString()}
              editable={true}
              className="text-2xl font-bold text-center"
              onChangeText={(text) => setAmount(Number(text))}
              keyboardType="numeric"
              autoFocus
            />
            <Text className="text-sm text-wafra-gray mb-4 relative" style={{ left: 10, top: -30 }}>
              {currency}
            </Text>
          </Card>
        </View>

        <View className="px-4 pb-6">
          <View className="w-full">
            <NumberKeyboard
              showDribble={false}
              onPress={(val) => setAmount(amount * 10 + val)}
              onDelete={() => setAmount(Math.floor(amount / 10))}
            />
            <View className="mt-4">
              <Button onPress={deposit} className="w-full">
                <Text className="">Deposit</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
