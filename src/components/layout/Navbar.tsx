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
    <header className="sticky top-0 z-40 border-b border-[#2B3139] bg-[#111418] text-[#F5F5F5] select-none">
      <div className="mx-auto flex h-14 max-w-[1560px] items-center justify-between gap-3 px-4 lg:px-6">
        {/* Left: Brand + Terminal Nav */}
        <div className="flex items-center gap-6">
          {/* Tradeon Wordmark & Icon */}
          <button
            onClick={() => navigate('app-dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
            aria-label="Tradeon Terminal Home"
          >
            <div className="w-7 h-7 rounded-[4px] bg-[#F0B90B] flex items-center justify-center text-[#181A20] font-black text-[15px] group-hover:bg-[#F8D12F] transition-colors shadow-xs">
              T
            </div>
            <span className="text-[17px] font-bold tracking-tight text-[#F5F5F5]">
              Tradeon
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider text-[#848E9C] border border-[#2B3139] px-1.5 py-0.5 rounded-[3px]">
              PRO
            </span>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Terminal Navigation">
            <button
              onClick={() => navigate('app-dashboard')}
              className={`px-3 py-1.5 text-[13px] font-medium rounded-[4px] transition-colors cursor-pointer ${
                currentView === 'app-dashboard' || currentView === 'dashboard'
                  ? 'text-[#F0B90B] bg-[#1E2329]'
                  : 'text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#161A1E]'
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
                      ? 'text-[#F0B90B] bg-[#1E2329]'
                      : 'text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#161A1E]'
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
                    ? 'text-[#F0B90B] bg-[#1E2329]'
                    : 'text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#161A1E]'
                }`}
              >
                <span>Wallet</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full pt-1 w-44 z-50 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="bg-[#1E2329] border border-[#2B3139] rounded-[6px] shadow-2xl p-1 text-[13px]">
                  <button
                    onClick={() => navigate('app-wallet')}
                    className="flex w-full items-center justify-between px-3 py-2 text-left rounded-[4px] text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#2B3139]"
                  >
                    <span>Overview</span>
                    <WalletIcon className="w-3.5 h-3.5 text-[#848E9C]" />
                  </button>
                  <button
                    onClick={() => navigate('app-ledger')}
                    className="flex w-full items-center justify-between px-3 py-2 text-left rounded-[4px] text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#2B3139]"
                  >
                    <span>Transaction Ledger</span>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#848E9C]" />
                  </button>
                  <button
                    onClick={() => navigate('watchlist')}
                    className="flex w-full items-center justify-between px-3 py-2 text-left rounded-[4px] text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#2B3139]"
                  >
                    <span>Watchlist</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#848E9C]" />
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
            className="hidden sm:flex items-center gap-2 h-8 px-2.5 rounded-[4px] bg-[#161A1E] border border-[#2B3139] text-[#848E9C] hover:border-[#474F59] hover:text-[#F5F5F5] text-[12px] transition-colors cursor-pointer"
            aria-label="Search assets (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#848E9C]" />
            <span>Search coin, pair, contract</span>
            <kbd className="text-[10px] bg-[#1E2329] border border-[#363C45] px-1 py-0.2 rounded text-[#848E9C]">
              ⌘K
            </kbd>
          </button>

          {/* Wallet Balance Display */}
          <div className="relative">
            <button
              onClick={() => navigate('app-wallet')}
              className="flex items-center gap-2 h-8 px-2.5 rounded-[4px] bg-[#161A1E] border border-[#2B3139] hover:border-[#363C45] transition-colors cursor-pointer text-left"
              aria-label="View wallet balance"
            >
              <WalletIcon className="w-3.5 h-3.5 text-[#F0B90B]" />
              <div className="text-[12px]">
                <span className="text-[#848E9C] hidden md:inline">Bal: </span>
                <span className="font-semibold text-[#F5F5F5] tabular-nums">
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
            className="relative p-2 text-[#848E9C] hover:text-[#F5F5F5] hover:bg-[#1E2329] rounded-[4px] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F6465D]" />
            )}
          </button>

          {/* Profile & Settings Trigger */}
          <button
            onClick={() => navigate('app-profile')}
            className={`p-2 rounded-[4px] transition-colors cursor-pointer ${
              currentView === 'app-profile'
                ? 'text-[#F0B90B] bg-[#1E2329]'
                : 'text-[#848E9C] hover:text-[#F5F5F5] hover:bg-[#1E2329]'
            }`}
            aria-label="Profile and Settings"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Switch to Marketing Website link */}
          <button
            onClick={() => navigate('home')}
            className="hidden xl:flex items-center gap-1 text-[11px] font-medium text-[#848E9C] hover:text-[#F0B90B] px-2 py-1 transition-colors cursor-pointer"
            title="Go to Marketing Home"
          >
            <span>Marketing</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-[#848E9C] hover:text-[#F5F5F5] lg:hidden rounded-[4px]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#2B3139] bg-[#111418] px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#2B3139]">
            <button
              onClick={() => navigate('app-dashboard')}
              className="text-left px-3 py-2 text-[13px] font-medium text-[#B7BDC6] hover:text-[#F0B90B] hover:bg-[#1E2329] rounded-[4px]"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('app-markets')}
              className="text-left px-3 py-2 text-[13px] font-medium text-[#B7BDC6] hover:text-[#F0B90B] hover:bg-[#1E2329] rounded-[4px]"
            >
              Markets
            </button>
            <button
              onClick={() => navigate('app-product-detail')}
              className="text-left px-3 py-2 text-[13px] font-medium text-[#B7BDC6] hover:text-[#F0B90B] hover:bg-[#1E2329] rounded-[4px]"
            >
              Trade Terminal
            </button>
            <button
              onClick={() => navigate('app-options')}
              className="text-left px-3 py-2 text-[13px] font-medium text-[#B7BDC6] hover:text-[#F0B90B] hover:bg-[#1E2329] rounded-[4px]"
            >
              Options
            </button>
            <button
              onClick={() => navigate('app-portfolio')}
              className="text-left px-3 py-2 text-[13px] font-medium text-[#B7BDC6] hover:text-[#F0B90B] hover:bg-[#1E2329] rounded-[4px]"
            >
              Portfolio
            </button>
            <button
              onClick={() => navigate('app-orders')}
              className="text-left px-3 py-2 text-[13px] font-medium text-[#B7BDC6] hover:text-[#F0B90B] hover:bg-[#1E2329] rounded-[4px]"
            >
              Orders
            </button>
            <button
              onClick={() => navigate('app-wallet')}
              className="text-left px-3 py-2 text-[13px] font-medium text-[#B7BDC6] hover:text-[#F0B90B] hover:bg-[#1E2329] rounded-[4px]"
            >
              Wallet
            </button>
            <button
              onClick={() => navigate('app-ledger')}
              className="text-left px-3 py-2 text-[13px] font-medium text-[#B7BDC6] hover:text-[#F0B90B] hover:bg-[#1E2329] rounded-[4px]"
            >
              Ledger
            </button>
          </div>
          <div className="pt-2 flex items-center justify-between text-[13px]">
            <button
              onClick={() => navigate('home')}
              className="text-[#848E9C] hover:text-[#F0B90B]"
            >
              Switch to Public Site
            </button>
            <Button size="xs" variant="primary" onClick={() => { setIsAddFundsOpen(true); setMobileOpen(false); }}>
              Deposit Funds
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
