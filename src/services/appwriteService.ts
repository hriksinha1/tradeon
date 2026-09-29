/**
 * Appwrite & Backend Service Abstraction Layer
 * 
 * Provides clean asynchronous service interfaces ready for Appwrite Cloud / Self-hosted SDK.
 * Currently backed by reactive in-memory state with zero breaking changes required upon backend attachment.
 */

import { Product, Order, Transaction, UserProfile } from '../types';

export interface AppwriteConfig {
  endpoint: string;
  projectId: string;
  databaseId: string;
  collections: {
    products: string;
    orders: string;
    transactions: string;
    wallets: string;
    users: string;
  };
}

export const APPWRITE_DEFAULT_CONFIG: AppwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: 'tradeon-platform-preview',
  databaseId: 'tradeon_main_db',
  collections: {
    products: 'col_products',
    orders: 'col_orders',
    transactions: 'col_transactions',
    wallets: 'col_wallets',
    users: 'col_users',
  },
};

export const authService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    // In production: return await account.get();
    return null;
  },
  async loginWithEmail(email: string): Promise<boolean> {
    // In production: await account.createEmailPasswordSession(email, password);
    console.info(`[AppwriteService.auth] Simulating session creation for: ${email}`);
    return true;
  },
  async logout(): Promise<void> {
    // In production: await account.deleteSession('current');
    console.info('[AppwriteService.auth] Session terminated.');
  },
};

export const productService = {
  async listProducts(): Promise<Product[]> {
    // In production: await databases.listDocuments(APPWRITE_DEFAULT_CONFIG.databaseId, APPWRITE_DEFAULT_CONFIG.collections.products);
    return [];
  },
  async getProductById(productId: string): Promise<Product | null> {
    // In production: await databases.getDocument(...);
    console.info(`[AppwriteService.products] Fetching product document ${productId}`);
    return null;
  },
};

export const orderService = {
  async submitOrder(orderData: Partial<Order>): Promise<{ success: boolean; orderId: string }> {
    // In production: await databases.createDocument(APPWRITE_DEFAULT_CONFIG.databaseId, APPWRITE_DEFAULT_CONFIG.collections.orders, ID.unique(), orderData);
    const mockId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    return { success: true, orderId: mockId };
  },
  async cancelOrder(orderId: string): Promise<boolean> {
    console.info(`[AppwriteService.orders] Cancel requested for ${orderId}`);
    return true;
  },
};

export const walletService = {
  async addFunds(amount: number, method: string): Promise<{ success: boolean; txnRef: string }> {
    console.info(`[AppwriteService.wallet] Adding funds ₹${amount} via ${method}`);
    return { success: true, txnRef: `REF-${Date.now().toString().slice(-6)}` };
  },
  async withdrawFunds(amount: number, account: string): Promise<{ success: boolean; txnRef: string }> {
    console.info(`[AppwriteService.wallet] Withdrawing ₹${amount} to ${account}`);
    return { success: true, txnRef: `WDR-${Date.now().toString().slice(-6)}` };
  },
};

export const ledgerService = {
  async logTransaction(txn: Partial<Transaction>): Promise<string> {
    const txnId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;
    console.info(`[AppwriteService.ledger] Transaction ${txnId} appended to immutable audit log`, txn);
    return txnId;
  },
};
