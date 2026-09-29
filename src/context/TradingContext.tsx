import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  ViewMode,
  DeviceFrameType,
  Product,
  Position,
  Order,
  Transaction,
  OptionContract,
  Wallet,
  NotificationItem,
  UserProfile,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_POSITIONS,
  INITIAL_ORDERS,
  INITIAL_TRANSACTIONS,
  INITIAL_OPTIONS,
  INITIAL_NOTIFICATIONS,
  CURRENT_USER,
} from '../constants/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface TradingContextType {
  // Navigation & View
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  deviceFrame: DeviceFrameType;
  setDeviceFrame: (frame: DeviceFrameType) => void;

  // Data & State
  products: Product[];
  positions: Position[];
  orders: Order[];
  transactions: Transaction[];
  options: OptionContract[];
  watchlist: string[];
  wallet: Wallet;
  notifications: NotificationItem[];
  user: UserProfile;

  // Modals & Panels
  isBuySellOpen: boolean;
  buySellConfig: { side: 'buy' | 'sell'; product: Product | null };
  openBuySell: (side: 'buy' | 'sell', product?: Product) => void;
  closeBuySell: () => void;

  isAddFundsOpen: boolean;
  setIsAddFundsOpen: (open: boolean) => void;

  isWithdrawOpen: boolean;
  setIsWithdrawOpen: (open: boolean) => void;

  selectedTransaction: Transaction | null;
  openTransactionDetail: (txn: Transaction) => void;
  closeTransactionDetail: () => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  isDossierOpen: boolean;
  setIsDossierOpen: (open: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;

  // Actions
  executeOrder: (
    side: 'buy' | 'sell',
    product: Product,
    quantity: number,
    price: number,
    type: 'market' | 'limit'
  ) => { success: boolean; message: string; orderId?: string };

  addFunds: (amount: number, method: string) => void;
  withdrawFunds: (amount: number, destinationAccount: string) => boolean;
  cancelOrder: (orderId: string) => void;
  toggleWatchlist: (productId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateUserProfile: (updated: Partial<UserProfile>) => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [selectedProductId, setSelectedProductId] = useState<string>('ATLAS-01');
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrameType>('responsive');

  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [positions, setPositions] = useState<Position[]>(INITIAL_POSITIONS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [options] = useState<OptionContract[]>(INITIAL_OPTIONS);
  const [watchlist, setWatchlist] = useState<string[]>(['ATLAS-01', 'ORBIT-08', 'PULSE-32']);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);

  // Available trading balance: ₹84,250
  const [availableBalance, setAvailableBalance] = useState<number>(84250);

  // Modals state
  const [isBuySellOpen, setIsBuySellOpen] = useState(false);
  const [buySellConfig, setBuySellConfig] = useState<{ side: 'buy' | 'sell'; product: Product | null }>({
    side: 'buy',
    product: INITIAL_PRODUCTS[0],
  });
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Wallet calculation
  const wallet: Wallet = useMemo(() => {
    const invested = positions.reduce((acc, p) => acc + p.totalCurrent, 0);
    return {
      availableBalance,
      pendingBalance: 0,
      investedValue: invested,
      totalValue: availableBalance + invested,
      currency: 'INR',
    };
  }, [availableBalance, positions]);

  const openBuySell = (side: 'buy' | 'sell', product?: Product) => {
    const targetProduct = product || products.find((p) => p.id === selectedProductId) || products[0];
    setBuySellConfig({ side, product: targetProduct });
    setIsBuySellOpen(true);
  };

  const closeBuySell = () => {
    setIsBuySellOpen(false);
  };

  const openTransactionDetail = (txn: Transaction) => {
    setSelectedTransaction(txn);
  };

  const closeTransactionDetail = () => {
    setSelectedTransaction(null);
  };

  const toggleWatchlist = (productId: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Watchlist', `Item ${productId} removed.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Watchlist', `Item ${productId} added to your favorites.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const executeOrder = (
    side: 'buy' | 'sell',
    product: Product,
    quantity: number,
    price: number,
    type: 'market' | 'limit'
  ) => {
    const totalOrderCost = quantity * price;
    const fee = Number((totalOrderCost * 0.001).toFixed(2)); // 0.1% platform fee

    if (side === 'buy') {
      const totalRequired = totalOrderCost + fee;
      if (totalRequired > availableBalance) {
        showToast('Insufficient Balance', 'Please add funds to your wallet to complete this order.', 'error');
        return { success: false, message: 'Insufficient trading balance' };
      }

      const newBal = availableBalance - totalRequired;
      setAvailableBalance(newBal);

      const orderId = `ORD-${Math.floor(2850 + Math.random() * 500)}`;
      const newOrder: Order = {
        id: orderId,
        productId: product.id,
        productName: product.name,
        side: 'buy',
        type,
        quantity,
        price,
        totalValue: totalOrderCost,
        fee,
        status: 'completed',
        createdAt: 'Just now',
        executionTime: 'Immediate fill',
      };
      setOrders((prev) => [newOrder, ...prev]);

      // Ledger entry
      const now = new Date();
      const newTxn: Transaction = {
        id: `TXN-${Math.floor(90300 + Math.random() * 1000)}`,
        date: 'Today',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: `Purchase ${quantity} ${product.unitMeasure} · ${product.name} (${product.id})`,
        type: 'buy',
        amount: -Number(totalRequired.toFixed(2)),
        fee,
        runningBalance: Number(newBal.toFixed(2)),
        status: 'completed',
        reference: `REF-${orderId}-B`,
        paymentMethod: 'Trading Balance',
      };
      setTransactions((prev) => [newTxn, ...prev]);

      // Update positions
      setPositions((prev) => {
        const existing = prev.find((p) => p.productId === product.id);
        if (existing) {
          const totalQty = existing.quantity + quantity;
          const totalCost = existing.totalInvested + totalOrderCost;
          const avgVal = totalCost / totalQty;
          const currentTotal = totalQty * product.currentValue;
          const pnl = currentTotal - totalCost;
          const pnlPercent = (pnl / totalCost) * 100;
          return prev.map((p) =>
            p.productId === product.id
              ? {
                  ...p,
                  quantity: totalQty,
                  averageValue: Number(avgVal.toFixed(2)),
                  totalInvested: Number(totalCost.toFixed(2)),
                  totalCurrent: Number(currentTotal.toFixed(2)),
                  pnl: Number(pnl.toFixed(2)),
                  pnlPercent: Number(pnlPercent.toFixed(2)),
                }
              : p
          );
        } else {
          const currentTotal = quantity * product.currentValue;
          const pnl = currentTotal - totalOrderCost;
          const pnlPercent = totalOrderCost > 0 ? (pnl / totalOrderCost) * 100 : 0;
          const newPos: Position = {
            id: `POS-${Math.floor(10 + Math.random() * 90)}`,
            productId: product.id,
            productName: product.name,
            quantity,
            averageValue: price,
            currentValue: product.currentValue,
            totalInvested: totalOrderCost,
            totalCurrent: currentTotal,
            pnl: Number(pnl.toFixed(2)),
            pnlPercent: Number(pnlPercent.toFixed(2)),
          };
          return [...prev, newPos];
        }
      });

      // Notification
      const newNotif: NotificationItem = {
        id: `NOTIF-${Date.now()}`,
        title: 'Buy Order Filled',
        message: `Successfully purchased ${quantity} units of ${product.name} for ₹${totalOrderCost.toLocaleString('en-IN')}.`,
        category: 'orders',
        timestamp: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      showToast(
        'Order Executed',
        `Bought ${quantity} units of ${product.name} at ₹${price.toLocaleString('en-IN')}.`,
        'success'
      );

      return { success: true, message: 'Order filled successfully', orderId };
    } else {
      // Sell Order
      const currentPos = positions.find((p) => p.productId === product.id);
      if (!currentPos || currentPos.quantity < quantity) {
        showToast('Insufficient Holding', `You only hold ${currentPos ? currentPos.quantity : 0} units of ${product.name}.`, 'error');
        return { success: false, message: 'Holding quantity insufficient' };
      }

      const netProceeds = totalOrderCost - fee;
      const newBal = availableBalance + netProceeds;
      setAvailableBalance(newBal);

      const orderId = `ORD-${Math.floor(2850 + Math.random() * 500)}`;
      const newOrder: Order = {
        id: orderId,
        productId: product.id,
        productName: product.name,
        side: 'sell',
        type,
        quantity,
        price,
        totalValue: totalOrderCost,
        fee,
        status: 'completed',
        createdAt: 'Just now',
        executionTime: 'Immediate fill',
      };
      setOrders((prev) => [newOrder, ...prev]);

      // Ledger entry
      const now = new Date();
      const newTxn: Transaction = {
        id: `TXN-${Math.floor(90300 + Math.random() * 1000)}`,
        date: 'Today',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: `Sale of ${quantity} ${product.unitMeasure} · ${product.name} (${product.id})`,
        type: 'sell',
        amount: Number(netProceeds.toFixed(2)),
        fee,
        runningBalance: Number(newBal.toFixed(2)),
        status: 'completed',
        reference: `REF-${orderId}-S`,
        paymentMethod: 'Trading Balance',
      };
      setTransactions((prev) => [newTxn, ...prev]);

      // Update positions
      setPositions((prev) => {
        return prev
          .map((p) => {
            if (p.productId === product.id) {
              const remainingQty = p.quantity - quantity;
              if (remainingQty <= 0) return null;
              const newInvested = p.averageValue * remainingQty;
              const newCurrent = remainingQty * product.currentValue;
              const pnl = newCurrent - newInvested;
              const pnlPercent = (pnl / newInvested) * 100;
              return {
                ...p,
                quantity: remainingQty,
                totalInvested: Number(newInvested.toFixed(2)),
                totalCurrent: Number(newCurrent.toFixed(2)),
                pnl: Number(pnl.toFixed(2)),
                pnlPercent: Number(pnlPercent.toFixed(2)),
              };
            }
            return p;
          })
          .filter(Boolean) as Position[];
      });

      // Notification
      const newNotif: NotificationItem = {
        id: `NOTIF-${Date.now()}`,
        title: 'Sell Order Filled',
        message: `Successfully sold ${quantity} units of ${product.name} for ₹${netProceeds.toLocaleString('en-IN')}.`,
        category: 'orders',
        timestamp: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      showToast(
        'Order Completed',
        `Sold ${quantity} units of ${product.name}. ₹${netProceeds.toLocaleString('en-IN')} added to balance.`,
        'success'
      );

      return { success: true, message: 'Sell order executed', orderId };
    }
  };

  const addFunds = (amount: number, method: string) => {
    if (amount <= 0) return;
    const newBal = availableBalance + amount;
    setAvailableBalance(newBal);

    const now = new Date();
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(90300 + Math.random() * 1000)}`,
      date: 'Today',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: `Wallet Deposit via ${method}`,
      type: 'deposit',
      amount: amount,
      fee: 0,
      runningBalance: Number(newBal.toFixed(2)),
      status: 'completed',
      reference: `DEP-${Date.now().toString().slice(-6)}`,
      paymentMethod: method,
    };
    setTransactions((prev) => [newTxn, ...prev]);

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Funds Added Successfully',
      message: `₹${amount.toLocaleString('en-IN')} has been credited to your trading wallet via ${method}.`,
      category: 'payments',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('Funds Deposited', `₹${amount.toLocaleString('en-IN')} has been added to your available balance.`, 'success');
  };

  const withdrawFunds = (amount: number, destinationAccount: string): boolean => {
    if (amount <= 0 || amount > availableBalance) {
      showToast('Withdrawal Failed', 'Withdrawal amount exceeds available trading balance.', 'error');
      return false;
    }

    const fee = 10; // Nominal transfer fee
    const netWithdrawal = amount;
    const newBal = availableBalance - netWithdrawal;
    setAvailableBalance(newBal);

    const now = new Date();
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(90300 + Math.random() * 1000)}`,
      date: 'Today',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: `Withdrawal to ${destinationAccount}`,
      type: 'withdrawal',
      amount: -amount,
      fee,
      runningBalance: Number(newBal.toFixed(2)),
      status: 'completed',
      reference: `WDR-${Date.now().toString().slice(-6)}`,
      paymentMethod: destinationAccount,
    };
    setTransactions((prev) => [newTxn, ...prev]);

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Withdrawal Initiated',
      message: `₹${amount.toLocaleString('en-IN')} is being transferred to ${destinationAccount}.`,
      category: 'payments',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(
      'Withdrawal Processed',
      `₹${amount.toLocaleString('en-IN')} sent to ${destinationAccount}.`,
      'success'
    );
    return true;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
    );
    showToast('Order Cancelled', `Order #${orderId} was cancelled.`, 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    showToast('Profile Updated', 'Changes saved successfully.', 'success');
  };

  return (
    <TradingContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        deviceFrame,
        setDeviceFrame,
        products,
        positions,
        orders,
        transactions,
        options,
        watchlist,
        wallet,
        notifications,
        user,
        isBuySellOpen,
        buySellConfig,
        openBuySell,
        closeBuySell,
        isAddFundsOpen,
        setIsAddFundsOpen,
        isWithdrawOpen,
        setIsWithdrawOpen,
        selectedTransaction,
        openTransactionDetail,
        closeTransactionDetail,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isDossierOpen,
        setIsDossierOpen,
        toasts,
        showToast,
        dismissToast,
        executeOrder,
        addFunds,
        withdrawFunds,
        cancelOrder,
        toggleWatchlist,
        markNotificationRead,
        markAllNotificationsRead,
        updateUserProfile,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};
