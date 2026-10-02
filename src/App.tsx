/**
 * Tradeon — Modern Financial Trading & Product Marketplace Platform
 * 
 * Features:
 * - Confidential Product Abstraction Layer
 * - Tradeon Black (#0B0E11) & Yellow Accent (#F0B90B) Financial Trading Environment
 * - Complete Marketing Website (Home, Products, How It Works, Options, Mobile App, Payments, Security, About, FAQ, Contact, Terms, Privacy)
 * - Complete Interactive Platform Application (Dashboard, Markets, Product Details, Options, Portfolio, Orders, Wallet, Ledger, Profile)
 * - Multi-Platform simulation (Desktop Web 1440px baseline, iPhone 16 Pro, Pixel 9 Pro)
 * - Appwrite Decoupled Enterprise Service Architecture
 */

import React from 'react';
import { TradingProvider, useTrading } from './context/TradingContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { ToastContainer } from './components/common/Toast';
import { Modal } from './components/common/Modal';

// Marketing components
import { MarketingNavbar } from './components/marketing/MarketingNavbar';
import { ProductsPage } from './components/marketing/ProductsPage';
import { HowItWorksPage } from './components/marketing/HowItWorksPage';
import { MobileAppPage } from './components/marketing/MobileAppPage';
import { OptionsPage } from './components/marketing/OptionsPage';
import { PaymentsPage } from './components/marketing/PaymentsPage';
import { SecurityPage } from './components/marketing/SecurityPage';
import { AboutAndLegalPages } from './components/marketing/AboutAndLegalPages';

// Modals
import { BuySellModal } from './components/modals/BuySellModal';
import { AddFundsModal } from './components/modals/AddFundsModal';
import { WithdrawModal } from './components/modals/WithdrawModal';
import { TransactionModal } from './components/modals/TransactionModal';
import { SearchModal } from './components/modals/SearchModal';
import { ProductDossierModal } from './components/modals/ProductDossierModal';

// Application Views
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
  const { currentView, isAuthModalOpen, setIsAuthModalOpen } = useTrading();

  // Marketing views list
  const isMarketingView = [
    'home',
    'landing',
    'products',
    'how-it-works',
    'mobile-app',
    'options',
    'payments',
    'security',
    'about',
    'faq',
    'contact',
    'privacy',
    'terms',
  ].includes(currentView);

  const renderCurrentView = () => {
    switch (currentView) {
      // Marketing Views
      case 'home':
      case 'landing':
        return <LandingPage />;
      case 'products':
        return <ProductsPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'mobile-app':
        return <MobileAppPage />;
      case 'options':
        return <OptionsPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'security':
        return <SecurityPage />;
      case 'about':
        return <AboutAndLegalPages page="about" />;
      case 'faq':
        return <AboutAndLegalPages page="faq" />;
      case 'contact':
        return <AboutAndLegalPages page="contact" />;
      case 'privacy':
        return <AboutAndLegalPages page="privacy" />;
      case 'terms':
        return <AboutAndLegalPages page="terms" />;

      // Interactive App Views
      case 'app-preview':
      case 'app-dashboard':
      case 'dashboard':
        return <DashboardView />;
      case 'app-markets':
      case 'markets':
        return <MarketsView />;
      case 'app-product-detail':
      case 'product-detail':
        return <ProductDetailView />;
      case 'app-options':
        return <OptionsTradingView />;
      case 'app-portfolio':
      case 'portfolio':
        return <PortfolioView />;
      case 'app-orders':
      case 'orders':
        return <OrdersView />;
      case 'app-wallet':
      case 'wallet':
        return <WalletView />;
      case 'app-ledger':
      case 'ledger':
        return <LedgerView />;
      case 'app-profile':
      case 'profile':
        return <ProfileView />;
      case 'watchlist':
        return <WatchlistView />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      case 'support':
        return <HelpSupportView />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <DeviceFrame>
      {/* Top Navbar dynamically switches between Marketing and Trading Terminal */}
      {isMarketingView ? <MarketingNavbar /> : <Navbar />}

      {/* Main View Area */}
      <main className="flex-1 pb-20 sm:pb-8">
        {renderCurrentView()}
      </main>

      {/* Mobile Bottom Navigation shown in App Terminal mode */}
      {!isMarketingView && <BottomNav />}

      {/* Interactive Global Modals */}
      <BuySellModal />
      <AddFundsModal />
      <WithdrawModal />
      <TransactionModal />
      <SearchModal />
      <ProductDossierModal />

      {/* Auth Modal for Sign In / Sign Up testing */}
      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title="Account Access"
        subtitle="Sign in or register your Tradeon account"
        maxWidth="md"
      >
        <AuthView />
      </Modal>

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
