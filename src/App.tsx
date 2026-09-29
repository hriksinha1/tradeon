/**
 * Aura Exchange - Trading & Product Marketplace Platform
 * 
 * Features:
 * - Confidential Product Abstraction Layer
 * - #6A2E62 Brand Color & League Spartan Typography System
 * - Real reactive trading state (Wallet, Orders, Positions, Ledger, Options, Notifications)
 * - Multi-Platform simulation (Desktop Web 1440px, iPhone 16 Pro, Pixel 9 Pro)
 * - Interactive Master Product Strategy & Design Tokens Dossier
 */

import React from 'react';
import { TradingProvider, useTrading } from './context/TradingContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { ToastContainer } from './components/common/Toast';

// Modals
import { BuySellModal } from './components/modals/BuySellModal';
import { AddFundsModal } from './components/modals/AddFundsModal';
import { WithdrawModal } from './components/modals/WithdrawModal';
import { TransactionModal } from './components/modals/TransactionModal';
import { SearchModal } from './components/modals/SearchModal';
import { ProductDossierModal } from './components/modals/ProductDossierModal';

// Views
import { LandingPage } from './components/views/LandingPage';
import { DashboardView } from './components/views/DashboardView';
import { MarketsView } from './components/views/MarketsView';
import { ProductDetailView } from './components/views/ProductDetailView';
import { OptionsTradingView } from './components/views/OptionsTradingView';
import { PortfolioView } from './components/views/PortfolioView';
import { OrdersView } from './components/views/OrdersView';
import { WalletView } from './components/views/WalletView';
import { LedgerView } from './components/views/LedgerView';
import { WatchlistView } from './components/views/WatchlistView';
import { NotificationsView } from './components/views/NotificationsView';
import { ProfileView } from './components/views/ProfileView';
import { SettingsView } from './components/views/SettingsView';
import { HelpSupportView } from './components/views/HelpSupportView';
import { AuthView } from './components/views/AuthView';

const MainAppContent: React.FC = () => {
  const { currentView } = useTrading();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardView />;
      case 'markets':
        return <MarketsView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'options':
        return <OptionsTradingView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'orders':
        return <OrdersView />;
      case 'wallet':
        return <WalletView />;
      case 'ledger':
        return <LedgerView />;
      case 'watchlist':
        return <WatchlistView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      case 'support':
        return <HelpSupportView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <DeviceFrame>
      {/* Top Bar with 3-Zone contract */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1 pb-20 sm:pb-8">
        {renderCurrentView()}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Interactive Global Modals */}
      <BuySellModal />
      <AddFundsModal />
      <WithdrawModal />
      <TransactionModal />
      <SearchModal />
      <ProductDossierModal />

      {/* Reactive Action Feedback Toast Container */}
      <ToastContainer />
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <TradingProvider>
      <MainAppContent />
    </TradingProvider>
  );
}
