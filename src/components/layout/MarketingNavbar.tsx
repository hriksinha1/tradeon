import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { Button } from '../common/Button';
import { Menu, X, ArrowRight, User } from 'lucide-react';

export const MarketingNavbar: React.FC = () => {
  const { currentView, setCurrentView, setIsAuthModalOpen } = useTrading();
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
    { label: 'Markets', view: 'app-markets' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'Products', view: 'products' },
    { label: 'Options', view: 'options' },
    { label: 'Security', view: 'security' },
    { label: 'About', view: 'about' },
  ];

  const handleNavClick = (view: ViewMode) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 select-none ${
        isScrolled
          ? 'bg-[#0B0E11]/95 backdrop-blur-md border-b border-[#2B3139] shadow-lg'
          : 'bg-[#0B0E11] border-b border-[#1E2329]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark + brand icon */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
          aria-label="Tradeon Home"
        >
          <div className="w-8 h-8 rounded-[4px] bg-[#F0B90B] flex items-center justify-center text-[#181A20] font-black text-[16px] group-hover:bg-[#F8D12F] transition-colors shadow-xs">
            T
          </div>
          <span className="text-[20px] font-bold tracking-tight text-[#F5F5F5] block leading-none">
            Tradeon
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links with subtle hover */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Marketing Navigation">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`text-[14px] font-medium transition-colors cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#F0B90B] font-semibold'
                    : 'text-[#B7BDC6] hover:text-[#F5F5F5]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-[2px] bg-[#F0B90B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions (Log In, Sign Up / Trade Terminal) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-[14px] font-semibold text-[#B7BDC6] hover:text-[#F5F5F5] px-3 py-1.5 transition-colors cursor-pointer"
          >
            Log In
          </button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsAuthModalOpen(true)}
            className="border-[#363C45] hover:border-[#F0B90B]"
          >
            Sign Up
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleNavClick('app-dashboard')}
            className="flex items-center gap-1.5 font-bold"
          >
            <span>Trade Terminal</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Button
            size="xs"
            variant="primary"
            onClick={() => handleNavClick('app-dashboard')}
          >
            Terminal
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#B7BDC6] hover:text-[#F5F5F5] rounded-[4px] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#111418] border-b border-[#2B3139] px-6 py-5 shadow-2xl space-y-3 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2 pb-3 border-b border-[#1E2329]">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`text-left text-[15px] font-medium py-1.5 transition-colors ${
                  currentView === link.view ? 'text-[#F0B90B] font-bold' : 'text-[#B7BDC6] hover:text-[#F5F5F5]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('faq')}
              className="text-left text-[15px] font-medium py-1.5 text-[#848E9C] hover:text-[#F5F5F5]"
            >
              FAQ
            </button>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="primary"
              fullWidth
              size="sm"
              onClick={() => handleNavClick('app-dashboard')}
              className="font-bold"
            >
              Launch Trading Terminal
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                fullWidth
                size="xs"
                onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
              >
                Log In
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="xs"
                onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MarketingNavbar;
