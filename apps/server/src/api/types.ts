export interface DepositRequest {
  from: string;
  to?: string;
  value: string;
}

export interface DepositResponse {
  id: number;
  status: "pending" | "processing" | "completed" | "failed";
  transferTxHash?: string;
  depositTxHash?: string;
  value: string;
  error?: string;
}

export interface OrderRequest {
  orderId: string;
  depositAddress: string;
  amount: string;
  currency: string;
}

export interface OrderResponse {
  orderId: string;
}

// Add other types as needed
