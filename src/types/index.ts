export type ViewMode =
  | 'landing'
  | 'dashboard'
  | 'markets'
  | 'product-detail'
  | 'options'
  | 'portfolio'
  | 'orders'
  | 'wallet'
  | 'ledger'
  | 'watchlist'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'support'
  | 'dossier';

export type DeviceFrameType = 'responsive' | 'ios' | 'android';

export interface Product {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  change: number;
  changePercent: number;
  availableUnits: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  description: string;
  unitMeasure: string;
  status: 'active' | 'limited' | 'settled';
  history: {
    '1D': number[];
    '1W': number[];
    '1M': number[];
    '3M': number[];
    '1Y': number[];
    'ALL': number[];
  };
}

export interface Position {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  averageValue: number;
  currentValue: number;
  totalInvested: number;
  totalCurrent: number;
  pnl: number;
  pnlPercent: number;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  quantity: number;
  price: number;
  totalValue: number;
  fee: number;
  status: 'completed' | 'open' | 'pending' | 'cancelled';
  createdAt: string;
  executionTime?: string;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  description: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal' | 'fee' | 'adjustment';
  amount: number;
  fee: number;
  runningBalance: number;
  status: 'completed' | 'processing' | 'failed';
  reference: string;
  paymentMethod?: string;
}

export interface OptionContract {
  id: string;
  productRef: string;
  symbol: string;
  strike: number;
  expiry: string;
  type: 'call' | 'put';
  bid: number;
  ask: number;
  premium: number;
  change: number;
  volume: number;
  openInterest: number;
}

export interface Wallet {
  availableBalance: number;
  pendingBalance: number;
  investedValue: number;
  totalValue: number;
  currency: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'orders' | 'payments' | 'portfolio' | 'security' | 'system';
  timestamp: string;
  read: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: string;
  kycStatus: 'verified' | 'pending' | 'unverified';
  twoFactorEnabled: boolean;
  joinedDate: string;
  accountNumber: string;
}
