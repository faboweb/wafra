import axios from "axios";
import Pusher from "pusher-js";
const pusher = new Pusher("1d9ffac87de599c61283", { cluster: "ap2" });

export type EventId =
  | "ORDER_CREATED"
  | "ORDER_COMPLETED"
  | "ORDER_FAILED"
  | "ORDER_CANCELLED"
  | "ORDER_PROCESSING";

export interface Event {
  webhookData: OrderData;
  eventId: EventId;
  createdAt: string;
}
export interface OrderData {
  id: string;
  walletAddress: string;
  createdAt: string;
  status: string;
  fiatCurrency: string;
  userId: string;
  cryptoCurrency: string;
  isBuyOrSell: string;
  fiatAmount: number;
  ipAddress: string;
  amountPaid: number;
  paymentOptionId: string;
  walletLink: string;
  quoteId: string;
  orderProcessingType: string;
  addressAdditionalData: boolean;
  network: string;
  conversionPrice: number;
  cryptoAmount: number;
  totalFeeInFiat: number;
  fiatAmountInUsd: number;
  countryCode: string;
  stateCode: string;
  userKycType: string;
  cardPaymentData: {
    orderId: string;
    paymentId: string;
    pgData: any;
    liquidityProvider: string;
    updatedAt: string;
    status: string;
    processedOn: string;
  };
  statusHistories: any[];
  isFirstOrder: boolean;
  updatedAt: string;
  completedAt: string;
  transactionHash: string;
  transactionLink: string;
  conversionPriceData: {
    _id: string;
    id: string;
    createdAt: string;
    fiatCurrency: string;
    cryptoCurrency: string;
    paymentMethod: string;
    fiatAmount: number;
    network: string;
    cryptoAmount: number;
    isBuyOrSell: string;
    conversionPrice: number;
    marketConversionPrice: number;
    slippage: number;
    cryptoLiquidityProvider: string;
    fiatLiquidityProvider: string;
    partnerApiKey: string;
    sourceTokenAmount: number;
    sourceToken: string;
    notes: any[];
    fiatFeeAmount: number;
    feeDecimal: number;
    swaps: any[];
    fees: any[];
    fiatAmountInUsd: number;
    internalFees: any[];
    cost: any;
  };
  partnerFeeInLocalCurrency: number;
}

let accessToken: string,
  expiresAt = 0;
const getAccessToken = async () => {
  if (!accessToken || Date.now() > expiresAt) {
    await getRefreshToken();
  }
  return accessToken;
};

const request = async (url: string) => {
  const accessToken = await getAccessToken();
  const { data } = await axios({
    url: process.env.TRANSAK_API_URL + url,
    headers: {
      accept: "application/json",
      "access-token": accessToken,
    },
  });
  return data;
};

const getRefreshToken = async () => {
  console.log("Getting refresh token");
  const options = {
    url: process.env.TRANSAK_API_URL + "/partners/api/v2/refresh-token",
    method: "POST",
    headers: {
      accept: "application/json",
      "api-secret": process.env.TRANSAK_API_SECRET!,
      "content-type": "application/json",
    },
    data: { apiKey: process.env.TRANSAK_API_KEY! },
  };
  const { data } = await axios(options).then(({ data }: any) => data);
  accessToken = data.accessToken;
  expiresAt = data.expiresAt;
};

export const getOrderById = async (orderId: string) => {
  const { data } = await request(
    `/partners/api/v2/orders?startDate=${new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-CA")}&endDate=${new Date().toLocaleDateString(
      "en-CA"
    )}`
  );

  const order = data.find((order: any) => order.partnerOrderId === orderId);

  return order;
};

export const listenToOrder = async (
  orderId: string,
  callback: (orderId: string, eventId: EventId, orderData: OrderData) => void
) => {
  const channelName = `${process.env.TRANSAK_API_KEY}_${orderId}`;
  const channel = pusher.subscribe(channelName);

  channel.bind_global((eventId: EventId, orderData: OrderData) => {
    console.log(`${eventId} ${orderData}`);
    callback(orderId, eventId, orderData);

    if (
      eventId === "ORDER_COMPLETED" ||
      eventId === "ORDER_FAILED" ||
      eventId === "ORDER_CANCELLED"
    ) {
      pusher.unsubscribe(channelName);
    }
  });

  setTimeout(() => {
    pusher.unsubscribe(channelName);
  }, 60 * 60 * 1000); // 1 hour
};
