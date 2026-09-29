import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode, DeviceFrameType } from '../../types';
import { Button } from '../common/Button';
import {
  TrendingUp,
  Smartphone,
  Monitor,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  Layers,
  Shield,
  HelpCircle,
} from 'lucide-react';

export const MarketingNavbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    deviceFrame,
    setDeviceFrame,
    setIsDossierOpen,
    setIsAuthModalOpen,
  } = useTrading();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks: { label: string; view: ViewMode }[] = [
    { label: 'Products', view: 'products' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'Options', view: 'options' },
    { label: 'Mobile App', view: 'mobile-app' },
    { label: 'Payments & Ledger', view: 'payments' },
    { label: 'Security', view: 'security' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#CBCAC2] shadow-2xs">
      {/* Top Banner: Device Simulator & Strategy Dossier */}
      <div className="bg-[#E9FAF1] border-b border-[#CFF3E0] px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between text-[12px] text-[#087A4A] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1FC777] animate-pulse" />
          <span className="font-semibold text-[#0C0F0C]">Tradeon Production Preview</span>
          <span className="text-[#A2E8C5] hidden sm:inline">|</span>
          <span className="hidden sm:inline text-[#087A4A]">
            Meadow Green Design System · Web & Native Mobile Ready
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Device Frame Switcher */}
          <div className="flex items-center bg-white border border-[#CBCAC2] rounded-[8px] p-0.5 shadow-2xs">
            <button
              onClick={() => setDeviceFrame('responsive')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                deviceFrame === 'responsive'
                  ? 'bg-[#1FC777] text-[#0C0F0C]'
                  : 'text-[#6B6B63] hover:text-[#171717]'
              }`}
              title="Full Responsive Web"
            >
              <Monitor className="w-3 h-3" />
              <span>Web</span>
            </button>
            <button
              onClick={() => setDeviceFrame('ios')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                deviceFrame === 'ios'
                  ? 'bg-[#1FC777] text-[#0C0F0C]'
                  : 'text-[#6B6B63] hover:text-[#171717]'
              }`}
              title="iPhone 16 Pro Simulation"
            >
              <Smartphone className="w-3 h-3" />
              <span>iOS</span>
            </button>
            <button
              onClick={() => setDeviceFrame('android')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                deviceFrame === 'android'
                  ? 'bg-[#1FC777] text-[#0C0F0C]'
                  : 'text-[#6B6B63] hover:text-[#171717]'
              }`}
              title="Pixel 9 Pro Simulation"
            >
              <Smartphone className="w-3 h-3" />
              <span>Android</span>
            </button>
          </div>

          {/* Dossier button */}
          <button
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-[#087A4A] bg-white hover:bg-[#E9FAF1] border border-[#A2E8C5] rounded-[8px] transition-colors shadow-2xs cursor-pointer"
            title="Inspect Master Product Strategy & Design Tokens"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#12A560]" />
            <span className="hidden md:inline">Strategy & Tokens Dossier</span>
            <span className="md:hidden">Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#1FC777] flex items-center justify-center text-[#0C0F0C] font-extrabold text-[18px] tracking-tight group-hover:bg-[#18B36A] transition-colors shadow-xs">
              T
            </div>
            <div>
              <span className="text-[20px] font-black tracking-tight text-[#171A17] block leading-none">
                Tradeon
              </span>
              <span className="text-[10px] uppercase font-bold text-[#087A4A] tracking-wider block mt-0.5">
                Trading Marketplace
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => {
                  setCurrentView(link.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative py-1 text-[14px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#087A4A] font-bold'
                    : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1FC777] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden sm:inline-block px-3.5 py-2 text-[14px] font-semibold text-[#5A5A53] hover:text-[#171A17] hover:bg-[#EFEEE9] rounded-[10px] transition-colors cursor-pointer"
          >
            Sign In
          </button>

          <Button
            size="md"
            variant="primary"
            onClick={() => {
              setCurrentView('app-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5A5A53] hover:text-[#171A17] hover:bg-[#EFEEE9] rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#CBCAC2] bg-[#FFFFFF] px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => {
                setCurrentView(link.view);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-left px-3 py-2.5 rounded-[8px] text-[15px] font-semibold text-[#171A17] hover:bg-[#E9FAF1] hover:text-[#087A4A] transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowRight className="w-4 h-4 text-[#A3A29A]" />
            </button>
          ))}
          <div className="pt-3 border-t border-[#EFEEE9] flex flex-col gap-2">
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-[14px] font-semibold text-[#171A17] bg-[#EFEEE9] rounded-[10px]"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setCurrentView('app-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-[14px] font-bold text-[#0C0F0C] bg-[#1FC777] rounded-[10px]"
            >
              Open Interactive Platform Prototype
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
