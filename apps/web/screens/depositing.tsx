import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

interface DepositStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  value: string;
  transferTxHash?: string;
  depositTxHash?: string;
  error?: string;
}

export default function DepositingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [shouldPoll, setShouldPoll] = useState(true);
  const orderId = (route.params as any)?.orderId;

  const { data: depositStatus, error } = useQuery<DepositStatus>({
    queryKey: ['deposit-status', orderId],
    queryFn: async () => {
      const response = await fetch(`/api/deposits/${orderId}/status`);
      if (!response.ok) throw new Error('Failed to fetch deposit status');
      return response.json();
    },
    refetchInterval: shouldPoll ? 3000 : false,
    enabled: !!orderId,
  });

  useEffect(() => {
    if (depositStatus?.status === 'completed' || depositStatus?.status === 'failed') {
      setShouldPoll(false);
    }
  }, [depositStatus?.status]);

  useEffect(() => {
    if (
      process.env.EXPO_PUBLIC_ENVIRONMENT === 'development' ||
      process.env.EXPO_PUBLIC_ENVIRONMENT === 'staging'
    ) {
      fetch(`/api/deposits/${orderId}/complete`).then((res) => {
        if (res.ok) {
          console.log('Deposit completed');
        } else {
          console.log('Deposit failed');
        }
      });
    }
  }, []);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 mb-4">Error: {error.message}</Text>
        <Button onPress={() => navigation.navigate('Dashboard' as never)}>Try Again</Button>
      </View>
    );
  }

  if (depositStatus?.status === 'failed') {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 mb-4">
          Deposit failed: {depositStatus.error || 'Unknown error'}
        </Text>
        <Button onPress={() => navigation.navigate('Dashboard' as never)}>Back to Dashboard</Button>
      </View>
    );
  }

  if (depositStatus?.status === 'completed') {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-2xl font-bold mb-4">
          You have successfully deposited ${Number(depositStatus.value).toLocaleString()}
        </Text>
        <Button onPress={() => navigation.navigate('Dashboard' as never)}>Done</Button>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-xl mb-4">
        {depositStatus?.status === 'processing'
          ? 'Processing your deposit...'
          : 'Initiating deposit...'}
      </Text>
      <ActivityIndicator size="large" color="#22c55e" />
    </View>
  );
}
