import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { Button } from '../common/Button';
import { Menu, X, ArrowRight, Smartphone, BookOpen } from 'lucide-react';

export const MarketingNavbar: React.FC = () => {
  const { currentView, setCurrentView, setIsDossierOpen } = useTrading();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; view: ViewMode }[] = [
    { label: 'Products', view: 'products' },
    { label: 'How it Works', view: 'how-it-works' },
    { label: 'Options', view: 'options' },
    { label: 'Mobile App', view: 'mobile-app' },
    { label: 'Payments', view: 'payments' },
    { label: 'Security', view: 'security' },
  ];

  const handleNavClick = (view: ViewMode) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Confidential Client Notice Strip */}
      <div className="bg-[#171A17] text-white text-[12px] px-4 sm:px-8 py-2 flex items-center justify-between border-b border-[#2A2A26]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0070BA]" />
            <span className="font-semibold text-white/95">Client Pre-Advance Presentation</span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <span className="text-white/70 hidden sm:inline">
              Meadow Green Design Foundation · Neutral Product Abstraction
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDossierOpen(true)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-[#0070BA] hover:text-[#3ACF8B] transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Color & Design System PDF</span>
            </button>
            <span className="text-white/30 hidden md:inline">|</span>
            <button
              onClick={() => handleNavClick('app-preview')}
              className="hidden md:flex items-center gap-1.5 text-[11px] font-bold text-white hover:text-[#0070BA] transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Interactive App Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E1DA] shadow-xs'
            : 'bg-[#F7F6F2] border-b border-[#E2E1DA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#0070BA] flex items-center justify-center text-[#0C0F0C] font-black text-[18px] tracking-tight group-hover:bg-[#005EA8] transition-colors shadow-2xs">
              T
            </div>
            <div>
              <span className="text-[22px] font-bold tracking-tight text-[#171717] block leading-none">
                Tradeon
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A5A53] block mt-0.5">
                Marketplace
              </span>
            </div>
          </button>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`text-[15px] font-medium transition-colors cursor-pointer py-1 relative ${
                    isActive
                      ? 'text-[#005EA8] font-bold'
                      : 'text-[#5A5A53] hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0070BA] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('faq')}
              className="text-[14px] font-semibold text-[#5A5A53] hover:text-[#171717] px-3 py-2 cursor-pointer"
            >
              FAQ
            </button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleNavClick('contact')}
            >
              Contact Team
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleNavClick('app-preview')}
              className="flex items-center gap-1.5"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleNavClick('app-preview')}
            >
              Preview
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171717] hover:bg-[#EFEEE9] rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#FFFFFF] border-b border-[#E2E1DA] px-6 py-6 shadow-xl space-y-4 animate-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`text-left text-[16px] font-semibold py-1.5 ${
                    currentView === link.view ? 'text-[#005EA8]' : 'text-[#171717]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('faq')}
                className="text-left text-[16px] font-semibold py-1.5 text-[#5A5A53]"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-left text-[16px] font-semibold py-1.5 text-[#5A5A53]"
              >
                About Platform
              </button>
            </nav>

            <div className="pt-4 border-t border-[#EFEEE9] flex flex-col gap-2.5">
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={() => handleNavClick('app-preview')}
              >
                Launch Interactive App Preview
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="md"
                onClick={() => handleNavClick('contact')}
              >
                Talk to Product Team
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
