import { createThirdwebClient, getContract } from 'thirdweb';
import { base, baseSepolia } from '../node_modules/thirdweb/dist/esm/exports/chains';
import { inAppWallet, preAuthenticate } from '../node_modules/thirdweb/dist/esm/exports/wallets';

// Configuration
const clientId = process.env.EXPO_PUBLIC_THIRDWEB_CLIENT_ID!;

if (!clientId) {
  throw new Error('Missing EXPO_PUBLIC_THIRDWEB_CLIENT_ID - make sure to set it in your .env file');
}

export const client = createThirdwebClient({
  clientId,
});

export const chain = baseSepolia;

// Contracts
export const contract = getContract({
  client,
  address: '0x82e50a6BF13A70366eDFC871f8FB8a428C43Dc03',
  chain,
});

export const usdcContract = getContract({
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  chain: base,
  client,
});

// Types
export interface Account {
  phone: string;
  country: string;
  address: string;
}

// Functions
export async function connectWallet(phone: string, otp: string): Promise<Account> {
  const wallet = inAppWallet();
  const phoneNumber = phone.trim().startsWith('+') ? phone.trim() : '+' + phone.trim();

  const account = await wallet.connect({
    client,
    chain: base,
    strategy: 'phone',
    phoneNumber,
    verificationCode: otp,
  });

  return {
    phone: phoneNumber,
    country: phoneNumber.slice(1, 3), // Extract country code from phone number
    address: account.address,
  };
}

export async function requestVerificationCode(phone: string): Promise<void> {
  await preAuthenticate({
    client,
    strategy: 'phone',
    phoneNumber: phone,
  });
}
