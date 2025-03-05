export enum OrderStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export enum OrderType {
  LIMIT = "Limit",
  MARKET = "Market",
  STANDARD = "Standard"
}

export enum RejectReasons {
  INSUFFICIENT_FUNDS = "Insufficient Funds",
  INVALID_ACCOUNT = "Invalid Account",
  FRAUD_SUSPECTED = "Fraud Suspected",
}

export enum FailReasons {
  NETWORK_ERROR = "Network Error",
  SERVER_ERROR = "Server Error",
  TIMEOUT = "Timeout",
}

export interface OrderDetails {
  id: number
  type?: OrderType
  user: {
    name: string
    email: string
    phone?: string
  }
  amount: string
  status: OrderStatus
  createdAt: string
  accountType?: string
  platformType?: string
  platformLogin?: string
  platformPassword?: string
  server?: string
  startingBalance?: number
  currentBalance?: number
  profitTarget?: number
  paymentProof?: string
  order_id?: string
  paymentMethod?: string
  txid?: string
  sessionId?: string
  terminalId?: string
  reason?: string
} 