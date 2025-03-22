import { Platform } from 'react-native';
import { TransakConfig, Transak, Events } from '@transak/transak-sdk';
import { query } from './query';

interface CreateTransakConfig {
  orderId: string;
  amount: number;
  currency: string;
  depositAddress: string;
}

export function createTransakConfig({
  orderId,
  amount,
  currency,
  depositAddress,
}: CreateTransakConfig): TransakConfig {
  return {
    apiKey: process.env.EXPO_PUBLIC_TRANSAK_API_KEY!,
    environment: 'STAGING',
    partnerOrderId: orderId,
    fiatAmount: Number(amount),
    fiatCurrency: currency,
    network: 'base',
    cryptoCurrencyCode: 'USDC',
    walletAddress: depositAddress,
    disableWalletAddressForm: true,
    productsAvailed: 'BUY',
  };
}
