import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { Button } from '../common/Button';
import { ArrowRight, Menu, X } from 'lucide-react';

const primaryLinks: { label: string; view: ViewMode }[] = [
  { label: 'Products', view: 'products' },
  { label: 'How it works', view: 'how-it-works' },
  { label: 'Options', view: 'options' },
  { label: 'Mobile', view: 'mobile-app' },
  { label: 'Security', view: 'security' },
];

const moreLinks: { label: string; view: ViewMode }[] = [
  { label: 'Payments & Ledger', view: 'payments' },
  { label: 'About', view: 'about' },
  { label: 'FAQ', view: 'faq' },
  { label: 'Contact', view: 'contact' },
];

export const MarketingNavbar: React.FC = () => {
  const { currentView, setCurrentView, setIsAuthModalOpen } = useTrading();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const goTo = (view: ViewMode) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
        <button onClick={() => goTo('home')} className="flex items-center gap-2.5 text-left" aria-label="Tradeon home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-lg font-bold text-white">T</span>
          <span className="text-xl font-bold tracking-tight text-foreground">Tradeon</span>
        </button>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <button key={link.view} onClick={() => goTo(link.view)} aria-current={currentView === link.view ? 'page' : undefined} className={`relative py-2 text-sm font-medium transition-colors ${currentView === link.view ? 'text-brand' : 'text-secondary-foreground hover:text-foreground'}`}>
              {link.label}
              {currentView === link.view && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand" />}
            </button>
          ))}
          <details className="relative">
            <summary className="cursor-pointer list-none py-2 text-sm font-medium text-secondary-foreground hover:text-foreground">More</summary>
            <div className="absolute right-0 top-10 flex min-w-44 flex-col gap-1 rounded-xl border border-border-subtle bg-white p-2 shadow-lg">
              {moreLinks.map((link) => <button key={link.view} onClick={() => goTo(link.view)} className="rounded-lg px-3 py-2 text-left text-sm text-secondary-foreground hover:bg-surface-soft hover:text-foreground">{link.label}</button>)}
            </div>
          </details>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsAuthModalOpen(true)} className="hidden px-3 py-2 text-sm font-semibold text-secondary-foreground hover:text-foreground sm:block">Sign in</button>
          <Button size="md" variant="primary" onClick={() => goTo('app-dashboard')} className="flex items-center gap-2 font-semibold">
            Get started <ArrowRight className="size-4" />
          </Button>
          <button onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-lg p-2 text-secondary-foreground lg:hidden" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && <div className="border-t border-border-subtle bg-white px-4 py-5 lg:hidden"><nav className="flex flex-col gap-1" aria-label="Mobile navigation">{[...primaryLinks, ...moreLinks].map((link) => <button key={link.view} onClick={() => goTo(link.view)} className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium text-foreground hover:bg-surface-soft">{link.label}<ArrowRight className="size-4 text-muted-foreground" /></button>)}</nav><div className="mt-4 border-t border-border-subtle pt-4"><button onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }} className="w-full rounded-lg px-3 py-3 text-center text-sm font-semibold text-foreground">Sign in</button></div></div>}
    </header>
  );
};

export default MarketingNavbar;
