import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  Search,
  Bell,
  Wallet as WalletIcon,
  User,
  Plus,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react';
import { ViewMode } from '../../types';

interface NavItem {
  label: string;
  view: ViewMode;
  badge?: string;
}

const mainNav: NavItem[] = [
  { label: 'Markets', view: 'app-markets' },
  { label: 'Trade', view: 'app-product-detail' },
  { label: 'Options', view: 'app-options' },
  { label: 'Portfolio', view: 'app-portfolio' },
  { label: 'Orders', view: 'app-orders' },
];

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    wallet,
    setIsAddFundsOpen,
    setIsSearchOpen,
    notifications,
  } = useTrading();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navigate = (view: ViewMode) => {
    setCurrentView(view);
    setMobileOpen(false);
    setWalletDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTradeActive = currentView === 'app-product-detail' || currentView === 'product-detail';
  const isOrdersActive = currentView === 'app-orders' || currentView === 'orders';
  const isLedgerActive = currentView === 'app-ledger' || currentView === 'ledger';

  return (
    <header className="sticky top-0 z-40 border-b border-[#EAECEF] bg-white text-[#181A20] select-none shadow-xs">
      <div className="mx-auto flex h-14 max-w-[1560px] items-center justify-between gap-3 px-4 lg:px-6">
        {/* Left: Brand + Terminal Nav */}
        <div className="flex items-center gap-6">
          {/* Tradeon Wordmark & Icon */}
          <button
            onClick={() => navigate('app-dashboard')}
            className="flex items-center gap-2 text-left focus:outline-none cursor-pointer group"
            aria-label="Tradeon Terminal Home"
          >
            <div className="w-7 h-7 rounded-[4px] bg-[#F0B90B] flex items-center justify-center text-[#181A20] font-black text-[15px] group-hover:bg-[#F8D12F] transition-colors shadow-xs">
              T
            </div>
            <span className="text-[17px] font-bold tracking-tight text-[#181A20]">
              Tradeon
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider text-[#707A8A] border border-[#DFE2E6] bg-[#F5F6F8] px-1.5 py-0.5 rounded-[3px]">
              PRO
            </span>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Terminal Navigation">
            <button
              onClick={() => navigate('app-dashboard')}
              className={`px-3 py-1.5 text-[13px] font-medium rounded-[4px] transition-colors cursor-pointer ${
                currentView === 'app-dashboard' || currentView === 'dashboard'
                  ? 'text-[#181A20] bg-[#F5F6F8] font-bold border border-[#EAECEF]'
                  : 'text-[#474D57] hover:text-[#181A20] hover:bg-[#F5F6F8]'
              }`}
            >
              Dashboard
            </button>

            {mainNav.map((item) => {
              const isActive =
                currentView === item.view ||
                (item.view === 'app-product-detail' && isTradeActive) ||
                (item.view === 'app-orders' && (isOrdersActive || isLedgerActive));

              return (
                <button
                  key={item.view}
                  onClick={() => navigate(item.view)}
                  className={`px-3 py-1.5 text-[13px] font-medium rounded-[4px] transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#181A20] bg-[#F5F6F8] font-bold border border-[#EAECEF]'
                      : 'text-[#474D57] hover:text-[#181A20] hover:bg-[#F5F6F8]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Money Activity Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium rounded-[4px] transition-colors cursor-pointer ${
                  isLedgerActive || currentView === 'app-wallet' || currentView === 'wallet'
                    ? 'text-[#181A20] bg-[#F5F6F8] font-bold border border-[#EAECEF]'
                    : 'text-[#474D57] hover:text-[#181A20] hover:bg-[#F5F6F8]'
                }`}
              >
                <span>Wallet</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full pt-1 w-44 z-50 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="bg-white border border-[#DFE2E6] rounded-[6px] shadow-xl p-1 text-[13px]">
                  <button
                    onClick={() => navigate('app-wallet')}
                    className="flex w-full items-center justify-between px-3 py-2 text-left rounded-[4px] text-[#474D57] hover:text-[#181A20] hover:bg-[#F5F6F8]"
                  >
                    <span>Overview</span>
                    <WalletIcon className="w-3.5 h-3.5 text-[#707A8A]" />
                  </button>
                  <button
                    onClick={() => navigate('app-ledger')}
                    className="flex w-full items-center justify-between px-3 py-2 text-left rounded-[4px] text-[#474D57] hover:text-[#181A20] hover:bg-[#F5F6F8]"
                  >
                    <span>Transaction Ledger</span>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#707A8A]" />
                  </button>
                  <button
                    onClick={() => navigate('watchlist')}
                    className="flex w-full items-center justify-between px-3 py-2 text-left rounded-[4px] text-[#474D57] hover:text-[#181A20] hover:bg-[#F5F6F8]"
                  >
                    <span>Watchlist</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#707A8A]" />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Right: Quick Search, Balance, Deposit CTA, Alerts, User Profile */}
        <div className="flex items-center gap-2">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 h-8 px-2.5 rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] text-[#707A8A] hover:border-[#CFD3D8] hover:text-[#181A20] text-[12px] transition-colors cursor-pointer"
            aria-label="Search assets (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#707A8A]" />
            <span>Search coin, pair, contract</span>
            <kbd className="text-[10px] bg-white border border-[#DFE2E6] px-1 py-0.2 rounded text-[#707A8A]">
              ⌘K
            </kbd>
          </button>

          {/* Wallet Balance Display */}
          <div className="relative">
            <button
              onClick={() => navigate('app-wallet')}
              className="flex items-center gap-2 h-8 px-2.5 rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] hover:border-[#CFD3D8] transition-colors cursor-pointer text-left"
              aria-label="View wallet balance"
            >
              <WalletIcon className="w-3.5 h-3.5 text-[#B78103]" />
              <div className="text-[12px]">
                <span className="text-[#707A8A] hidden md:inline">Bal: </span>
                <span className="font-bold text-[#181A20] tabular-nums font-mono">
                  {formatINR(wallet.availableBalance)}
                </span>
              </div>
            </button>
          </div>

          {/* Yellow Deposit CTA Button */}
          <Button
            size="xs"
            variant="primary"
            onClick={() => setIsAddFundsOpen(true)}
            className="flex items-center gap-1 font-bold h-8"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Deposit</span>
          </Button>

          {/* Notifications Trigger */}
          <button
            onClick={() => navigate('notifications')}
            className="relative p-2 text-[#707A8A] hover:text-[#181A20] hover:bg-[#F5F6F8] rounded-[4px] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#CF304A]" />
            )}
          </button>

          {/* Profile & Settings Trigger */}
          <button
            onClick={() => navigate('app-profile')}
            className={`p-2 rounded-[4px] transition-colors cursor-pointer ${
              currentView === 'app-profile'
                ? 'text-[#181A20] bg-[#F5F6F8]'
                : 'text-[#707A8A] hover:text-[#181A20] hover:bg-[#F5F6F8]'
            }`}
            aria-label="Profile and Settings"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Switch to Marketing Website */}
          <button
            onClick={() => navigate('home')}
            className="hidden xl:inline-flex items-center gap-1 text-[11px] font-semibold text-[#707A8A] hover:text-[#181A20] px-2 py-1 rounded-[4px] hover:bg-[#F5F6F8] transition-colors cursor-pointer"
            title="View public marketplace overview"
          >
            <span>Website</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 text-[#707A8A] hover:text-[#181A20] hover:bg-[#F5F6F8] rounded-[4px] cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#EAECEF] bg-white px-4 py-3 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#707A8A] px-2 pt-1">
            Trading Terminal Navigation
          </div>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => navigate('app-dashboard')}
              className={`text-left px-3 py-2 rounded-[4px] text-xs font-medium transition-colors ${
                currentView === 'app-dashboard' || currentView === 'dashboard'
                  ? 'text-[#181A20] bg-[#F5F6F8] font-bold'
                  : 'text-[#474D57] hover:bg-[#F5F6F8]'
              }`}
            >
              Dashboard
            </button>
            {mainNav.map((item) => (
              <button
                key={item.view}
                onClick={() => navigate(item.view)}
                className={`text-left px-3 py-2 rounded-[4px] text-xs font-medium transition-colors ${
                  currentView === item.view
                    ? 'text-[#181A20] bg-[#F5F6F8] font-bold'
                    : 'text-[#474D57] hover:bg-[#F5F6F8]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigate('app-ledger')}
              className="text-left px-3 py-2 rounded-[4px] text-xs text-[#474D57] hover:bg-[#F5F6F8]"
            >
              Ledger
            </button>
            <button
              onClick={() => navigate('app-wallet')}
              className="text-left px-3 py-2 rounded-[4px] text-xs text-[#474D57] hover:bg-[#F5F6F8]"
            >
              Wallet
            </button>
            <button
              onClick={() => navigate('watchlist')}
              className="text-left px-3 py-2 rounded-[4px] text-xs text-[#474D57] hover:bg-[#F5F6F8]"
            >
              Watchlist
            </button>
            <button
              onClick={() => navigate('app-profile')}
              className="text-left px-3 py-2 rounded-[4px] text-xs text-[#474D57] hover:bg-[#F5F6F8]"
            >
              Profile
            </button>
          </div>

          <div className="pt-2 border-t border-[#EAECEF] flex items-center justify-between">
            <button
              onClick={() => navigate('home')}
              className="text-xs text-[#707A8A] hover:text-[#181A20]"
            >
              Return to Website
            </button>
            <Button size="xs" variant="primary" onClick={() => setIsAddFundsOpen(true)}>
              Deposit Funds
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
