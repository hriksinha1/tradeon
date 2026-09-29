import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  Search,
  Bell,
  Wallet as WalletIcon,
  BookOpen,
  Smartphone,
  Monitor,
  User,
  Plus,
} from 'lucide-react';
import { ViewMode, DeviceFrameType } from '../../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    wallet,
    setIsAddFundsOpen,
    setIsSearchOpen,
    setIsDossierOpen,
    notifications,
    deviceFrame,
    setDeviceFrame,
  } = useTrading();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks: { label: string; view: ViewMode }[] = [
    { label: 'Dashboard', view: 'dashboard' },
    { label: 'Markets', view: 'markets' },
    { label: 'Options', view: 'options' },
    { label: 'Portfolio', view: 'portfolio' },
    { label: 'Orders', view: 'orders' },
    { label: 'Ledger', view: 'ledger' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] transition-all">
      {/* Utility Bar: Mode selector & Confidential Platform banner */}
      <div className="bg-[#FAF4F9] border-b border-[#F3E5F1] px-4 sm:px-8 py-1.5 flex items-center justify-between text-[12px] text-[#6A2E62]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16803C]" />
          <span className="font-semibold">Interactive Prototype Preview</span>
          <span className="text-[#A8A29E] hidden md:inline">·</span>
          <span className="hidden md:inline text-[#78716C]">
            Neutral Product Abstraction · Production-Ready Design System
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Device Frame Viewport Switcher */}
          <div className="flex items-center bg-white border border-[#E7E5E4] rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => setDeviceFrame('responsive')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                deviceFrame === 'responsive'
                  ? 'bg-[#6A2E62] text-white'
                  : 'text-[#6B6B6B] hover:text-[#171717]'
              }`}
              title="Full Responsive Web"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">Web</span>
            </button>
            <button
              onClick={() => setDeviceFrame('ios')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                deviceFrame === 'ios'
                  ? 'bg-[#6A2E62] text-white'
                  : 'text-[#6B6B6B] hover:text-[#171717]'
              }`}
              title="Simulate iOS App"
            >
              <Smartphone className="w-3 h-3" />
              <span>iOS</span>
            </button>
            <button
              onClick={() => setDeviceFrame('android')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                deviceFrame === 'android'
                  ? 'bg-[#6A2E62] text-white'
                  : 'text-[#6B6B6B] hover:text-[#171717]'
              }`}
              title="Simulate Android App"
            >
              <Smartphone className="w-3 h-3" />
              <span>Android</span>
            </button>
          </div>

          {/* Master Product Context & Design Tokens Drawer Button */}
          <button
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#6A2E62] bg-[#F7EFF6] hover:bg-[#ECD6E9] border border-[#ECD6E9] rounded-lg transition-colors shadow-2xs"
            title="Inspect Master Product Strategy & Design Tokens"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Master Strategy & Tokens</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#6A2E62] flex items-center justify-center text-white font-bold text-[16px] tracking-tight group-hover:bg-[#56234F] transition-colors shadow-sm">
              A
            </div>
            <div>
              <span className="text-[19px] font-bold tracking-tight text-[#171717] block leading-none">
                AURA
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#8A8A8A] tracking-wider block mt-0.5">
                Exchange
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => setCurrentView(link.view)}
                className={`relative py-1 text-[14px] font-medium transition-colors ${
                  isActive ? 'text-[#6A2E62] font-semibold' : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6A2E62] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions & utility buttons */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#8A8A8A] bg-[#F5F5F4] hover:bg-[#E7E5E4] border border-[#E7E5E4] rounded-lg transition-colors"
            title="Search products and transactions (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[12px]">Search</span>
            <kbd className="hidden md:inline text-[10px] bg-white border border-[#D6D3D1] px-1 py-0.2 rounded font-mono text-[#78716C]">
              ⌘K
            </kbd>
          </button>

          {/* Available Balance preview pill */}
          <button
            onClick={() => setCurrentView('wallet')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#FAF4F9] hover:bg-[#F3E5F1] border border-[#ECD6E9] rounded-lg transition-colors text-left"
            title="View Wallet Balance"
          >
            <WalletIcon className="w-3.5 h-3.5 text-[#6A2E62]" />
            <div className="leading-tight">
              <span className="block text-[10px] text-[#78716C] uppercase font-semibold">Available</span>
              <span className="block text-[13px] font-semibold text-[#171717] tabular-nums">
                {formatINR(wallet.availableBalance)}
              </span>
            </div>
          </button>

          {/* Primary Action CTA */}
          <Button
            size="sm"
            onClick={() => setIsAddFundsOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Funds</span>
          </Button>

          {/* Notifications button */}
          <button
            onClick={() => setCurrentView('notifications')}
            className="relative p-2 text-[#6B6B6B] hover:text-[#171717] hover:bg-[#F5F5F4] rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C62828] rounded-full" />
            )}
          </button>

          {/* Profile button */}
          <button
            onClick={() => setCurrentView('profile')}
            className={`p-1.5 rounded-lg border transition-colors ${
              currentView === 'profile'
                ? 'border-[#6A2E62] bg-[#F7EFF6] text-[#6A2E62]'
                : 'border-[#E7E5E4] hover:bg-[#F5F5F4] text-[#57534E]'
            }`}
            aria-label="User Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
