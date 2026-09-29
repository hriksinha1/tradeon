import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { Button } from '../common/Button';
import {
  Smartphone,
  Monitor,
  BookOpen,
  ArrowRight,
  Menu,
  X,
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop primary links (clean, uncluttered)
  const desktopNavLinks: { label: string; view: ViewMode }[] = [
    { label: 'Products', view: 'products' },
    { label: 'How it works', view: 'how-it-works' },
    { label: 'Options', view: 'options' },
    { label: 'Mobile app', view: 'mobile-app' },
    { label: 'Security', view: 'security' },
  ];

  // Mobile drawer links
  const mobileNavLinks: { label: string; view: ViewMode }[] = [
    { label: 'Products', view: 'products' },
    { label: 'How it works', view: 'how-it-works' },
    { label: 'Options', view: 'options' },
    { label: 'Mobile app', view: 'mobile-app' },
    { label: 'Payments & Ledger', view: 'payments' },
    { label: 'Security', view: 'security' },
    { label: 'About', view: 'about' },
    { label: 'FAQ', view: 'faq' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: ViewMode) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#CBCAC2]/80 transition-all">
      {/* Utility Notice & Device Simulator Bar */}
      <div className="bg-[#F7F6F2] border-b border-[#E2E1DA] px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between text-[12px] text-[#5A5A53] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1FC777]" />
          <span className="font-semibold text-[#171A17]">Tradeon Platform Concept</span>
          <span className="text-[#CBCAC2] hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline text-[#5A5A53]">
            Web, iOS & Android preview with illustrative product listings
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Device Frame Viewport Switcher */}
          <div className="flex items-center bg-white border border-[#CBCAC2] rounded-[8px] p-0.5 shadow-2xs">
            <button
              onClick={() => setDeviceFrame('responsive')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                deviceFrame === 'responsive'
                  ? 'bg-[#1FC777] text-[#0C0F0C]'
                  : 'text-[#6B6B63] hover:text-[#171A17]'
              }`}
              title="Full Responsive Web View"
            >
              <Monitor className="w-3 h-3" />
              <span>Web</span>
            </button>
            <button
              onClick={() => setDeviceFrame('ios')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold transition-all cursor-pointer ${
                deviceFrame === 'ios'
                  ? 'bg-[#1FC777] text-[#0C0F0C]'
                  : 'text-[#6B6B63] hover:text-[#171A17]'
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
                  ? 'bg-[#1FC777] text-[#0C0F0C]'
                  : 'text-[#6B6B63] hover:text-[#171A17]'
              }`}
              title="Simulate Pixel 9 Pro"
            >
              <Smartphone className="w-3 h-3" />
              <span>Android</span>
            </button>
          </div>

          {/* Strategy Dossier Drawer Trigger */}
          <button
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#087A4A] bg-white hover:bg-[#E9FAF1] border border-[#A2E8C5] rounded-[8px] transition-colors shadow-2xs cursor-pointer"
            title="Inspect Master Product Strategy & Design Tokens"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#087A4A]" />
            <span className="hidden md:inline">Strategy Dossier</span>
            <span className="md:hidden">Dossier</span>
          </button>
        </div>
      </div>

      {/* Main Marketing Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-[10px] bg-[#1FC777] flex items-center justify-center text-[#0C0F0C] font-extrabold text-[18px] tracking-tight group-hover:bg-[#18B36A] transition-colors shadow-xs">
            T
          </div>
          <div>
            <span className="text-[20px] font-black tracking-tight text-[#171A17] block leading-none">
              Tradeon
            </span>
            <span className="text-[11px] font-medium text-[#6B6B63] block mt-0.5">
              Marketplace & Trading
            </span>
          </div>
        </button>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {desktopNavLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`text-[14px] font-medium transition-colors cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#087A4A] font-semibold'
                    : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1FC777] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden sm:inline-block px-3.5 py-2 text-[14px] font-medium text-[#5A5A53] hover:text-[#171A17] rounded-[10px] transition-colors cursor-pointer"
          >
            Sign in
          </button>

          <Button
            size="md"
            variant="primary"
            onClick={() => {
              setCurrentView('app-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 shadow-xs cursor-pointer font-bold"
          >
            <span>Explore platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5A5A53] hover:text-[#171A17] hover:bg-[#F7F6F2] rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#CBCAC2] bg-[#FFFFFF] px-4 py-5 space-y-2 shadow-xl">
          {mobileNavLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => handleNavClick(link.view)}
              className="w-full text-left px-3 py-2.5 rounded-[10px] text-[15px] font-medium text-[#171A17] hover:bg-[#F7F6F2] hover:text-[#087A4A] transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowRight className="w-4 h-4 text-[#A3A29A]" />
            </button>
          ))}
          <div className="pt-4 border-t border-[#E2E1DA] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-[14px] font-medium text-[#171A17] bg-[#F7F6F2] rounded-[10px] hover:bg-[#EFEEE9] transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => {
                setCurrentView('app-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-[14px] font-bold text-[#0C0F0C] bg-[#1FC777] hover:bg-[#18B36A] rounded-[10px] transition-colors shadow-2xs"
            >
              Explore platform
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
