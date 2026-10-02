import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { Button } from '../common/Button';
import { Menu, X, ArrowRight, User } from 'lucide-react';

const primaryLinks: { label: string; view: ViewMode }[] = [
  { label: 'Markets', view: 'markets' },
  { label: 'Products', view: 'products' },
  { label: 'How it Works', view: 'how-it-works' },
  { label: 'Options', view: 'options' },
  { label: 'Mobile App', view: 'mobile-app' },
  { label: 'Security', view: 'security' },
];

const secondaryLinks: { label: string; view: ViewMode }[] = [
  { label: 'Payments & Settlement', view: 'payments' },
  { label: 'About Tradeon', view: 'about' },
  { label: 'Knowledge Base & FAQ', view: 'faq' },
  { label: 'Help & Contact', view: 'contact' },
];

export const MarketingNavbar: React.FC = () => {
  const { currentView, setCurrentView, setIsAuthModalOpen, user } = useTrading();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (view: ViewMode) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#0B0E11]/95 backdrop-blur-md border-[#2B3139] shadow-lg shadow-black/40'
          : 'bg-[#0B0E11] border-[#2B3139]'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => goTo('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
            aria-label="Tradeon home"
          >
            <div className="flex size-8 items-center justify-center rounded-[6px] bg-[#F0B90B] text-black font-extrabold text-base tracking-tighter shadow-sm transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 4.2l5 2.8v4.4c0 3.32-2.13 6.4-5 7.4-2.87-1-5-4.08-5-7.4V9l5-2.8z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[19px] font-extrabold tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors">
                  TRADE<span className="text-[#F0B90B]">ON</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] bg-[#1E2329] text-[#848E9C] border border-[#2B3139] font-mono">
                  PRO
                </span>
              </div>
            </div>
          </button>

          {/* Primary desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary marketing navigation">
            {primaryLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => goTo(link.view)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-[6px] text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#F0B90B] bg-[#1E2329]'
                      : 'text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#161A1E]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                onBlur={() => setTimeout(() => setMoreMenuOpen(false), 200)}
                className="px-3 py-1.5 rounded-[6px] text-sm font-medium text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#161A1E] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>More</span>
                <span className="text-[10px] text-[#848E9C]">▼</span>
              </button>

              {moreMenuOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-56 rounded-[8px] border border-[#2B3139] bg-[#161A1E] p-1.5 shadow-xl shadow-black/60 z-50">
                  {secondaryLinks.map((link) => (
                    <button
                      key={link.view}
                      onClick={() => goTo(link.view)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#1E2329] rounded-[4px] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo('markets')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#B7BDC6] hover:text-[#F5F5F5] px-2.5 py-1.5 rounded-[6px] hover:bg-[#161A1E] transition-colors cursor-pointer"
          >
            <span className="size-2 rounded-full bg-[#0ECB81] animate-pulse" />
            <span className="font-mono">Catalog 24h</span>
          </button>

          {user ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => goTo('dashboard')}
              className="hidden sm:flex items-center gap-1.5"
            >
              <User className="size-3.5 text-[#F0B90B]" />
              <span>{user.name.split(' ')[0]}</span>
            </Button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#161A1E] rounded-[6px] transition-colors cursor-pointer"
            >
              Log In
            </button>
          )}

          <Button
            size="sm"
            variant="primary"
            onClick={() => goTo('dashboard')}
            className="flex items-center gap-1.5 font-bold shadow-md cursor-pointer"
          >
            <span>Trade Now</span>
            <ArrowRight className="size-3.5" />
          </Button>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-[6px] p-1.5 text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#161A1E] lg:hidden cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2B3139] bg-[#111418] px-4 py-4 space-y-3">
          <div className="text-[11px] font-semibold text-[#848E9C] uppercase tracking-wider px-2">
            Navigation
          </div>
          <div className="grid grid-cols-2 gap-1">
            {primaryLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => goTo(link.view)}
                className={`text-left px-3 py-2 rounded-[6px] text-xs font-medium transition-colors ${
                  currentView === link.view
                    ? 'text-[#F0B90B] bg-[#1E2329]'
                    : 'text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#161A1E]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-[#2B3139] pt-3 text-[11px] font-semibold text-[#848E9C] uppercase tracking-wider px-2">
            Platform Resources
          </div>
          <div className="grid grid-cols-2 gap-1">
            {secondaryLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => goTo(link.view)}
                className="text-left px-3 py-1.5 rounded-[6px] text-xs text-[#848E9C] hover:text-[#F5F5F5] hover:bg-[#161A1E]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-[#2B3139] pt-3 flex items-center justify-between">
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-[#B7BDC6] hover:text-[#F5F5F5] px-3 py-2"
            >
              Sign In
            </button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => goTo('dashboard')}
              className="text-xs font-bold"
            >
              Launch Terminal
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
