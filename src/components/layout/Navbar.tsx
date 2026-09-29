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
  ArrowLeft,
  ArrowRight,
  TrendingUp,
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

  const appNavLinks: { label: string; view: ViewMode }[] = [
    { label: 'Dashboard', view: 'app-dashboard' },
    { label: 'Markets', view: 'app-markets' },
    { label: 'Options', view: 'app-options' },
    { label: 'Portfolio', view: 'app-portfolio' },
    { label: 'Orders', view: 'app-orders' },
    { label: 'Ledger', view: 'app-ledger' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#CBCAC2] shadow-2xs transition-all">
      {/* Utility Bar: Mode selector & Confidential Platform banner */}
      <div className="bg-[#F0FAFF] border-b border-[#DFF6FF] px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between text-[12px] text-[#005EA8] gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 font-bold text-[#0C0F0C] hover:text-[#005EA8] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#16803C]" />
            <span>Marketing Website</span>
          </button>
          <span className="text-[#A2E8C5] hidden md:inline">|</span>
          <span className="hidden md:inline text-[#005EA8] font-medium">
            Interactive Trading Simulation · Meadow Green #0070BA Foundation
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Device Frame Viewport Switcher */}
          <div className="flex items-center bg-white border border-[#CBCAC2] rounded-[8px] p-0.5 shadow-2xs">
            <button
              onClick={() => setDeviceFrame('responsive')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                deviceFrame === 'responsive'
                  ? 'bg-[#0070BA] text-[#0C0F0C]'
                  : 'text-[#6B6B63] hover:text-[#171717]'
              }`}
              title="Full Responsive Web"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">Web</span>
            </button>
            <button
              onClick={() => setDeviceFrame('ios')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                deviceFrame === 'ios'
                  ? 'bg-[#0070BA] text-[#0C0F0C]'
                  : 'text-[#6B6B63] hover:text-[#171717]'
              }`}
              title="Simulate iPhone 16 Pro"
            >
              <Smartphone className="w-3 h-3" />
              <span>iOS</span>
            </button>
            <button
              onClick={() => setDeviceFrame('android')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                deviceFrame === 'android'
                  ? 'bg-[#0070BA] text-[#0C0F0C]'
                  : 'text-[#6B6B63] hover:text-[#171717]'
              }`}
              title="Simulate Pixel 9 Pro"
            >
              <Smartphone className="w-3 h-3" />
              <span>Android</span>
            </button>
          </div>

          {/* Master Product Context & Design Tokens Drawer Button */}
          <button
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-[#005EA8] bg-white hover:bg-[#F0FAFF] border border-[#A2E8C5] rounded-[8px] transition-colors shadow-2xs cursor-pointer"
            title="Inspect Master Product Strategy & Design Tokens"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#16803C]" />
            <span className="hidden sm:inline">Design System Dossier</span>
            <span className="sm:hidden">Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('app-dashboard')}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-[8px] bg-[#0070BA] flex items-center justify-center text-[#0C0F0C] font-extrabold text-[16px] tracking-tight group-hover:bg-[#005EA8] transition-colors shadow-2xs">
              T
            </div>
            <div>
              <span className="text-[19px] font-black tracking-tight text-[#171A17] block leading-none">
                Tradeon
              </span>
              <span className="text-[10px] uppercase font-bold text-[#005EA8] tracking-wider block mt-0.5">
                Terminal
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {appNavLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => setCurrentView(link.view)}
                className={`relative py-1 text-[14px] font-semibold transition-colors cursor-pointer ${
                  isActive ? 'text-[#005EA8]' : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070BA] rounded-full" />
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
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#5A5A53] bg-[#F7F6F2] hover:bg-[#EFEEE9] border border-[#CBCAC2] rounded-[10px] transition-colors cursor-pointer"
            title="Search products and transactions (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#6B6B63]" />
            <span className="hidden md:inline text-[12px] font-medium">Search</span>
            <kbd className="hidden md:inline text-[10px] bg-white border border-[#CBCAC2] px-1 py-0.2 rounded font-mono text-[#5A5A53]">
              ⌘K
            </kbd>
          </button>

          {/* Available Balance preview pill */}
          <button
            onClick={() => setCurrentView('app-wallet')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F0FAFF] hover:bg-[#DFF6FF] border border-[#A2E8C5] rounded-[10px] transition-colors text-left cursor-pointer"
            title="View Wallet Balance"
          >
            <WalletIcon className="w-4 h-4 text-[#005EA8]" />
            <div className="leading-tight">
              <span className="block text-[10px] text-[#005EA8] uppercase font-bold">
                Available
              </span>
              <span className="block text-[13px] font-extrabold text-[#0C0F0C] tabular-nums">
                {formatINR(wallet.availableBalance)}
              </span>
            </div>
          </button>

          {/* Primary Action CTA */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsAddFundsOpen(true)}
            className="flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Funds</span>
          </Button>

          {/* Notifications button */}
          <button
            onClick={() => setCurrentView('notifications')}
            className="relative p-2 text-[#5A5A53] hover:text-[#171A17] hover:bg-[#F7F6F2] rounded-lg transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E5484D] rounded-full" />
            )}
          </button>

          {/* Profile button */}
          <button
            onClick={() => setCurrentView('app-profile')}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              currentView === 'app-profile'
                ? 'border-[#0070BA] bg-[#F0FAFF] text-[#005EA8]'
                : 'border-[#CBCAC2] hover:bg-[#F7F6F2] text-[#5A5A53]'
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
