import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import { Search, Bell, Wallet as WalletIcon, User, Plus, Menu, X, ChevronDown } from 'lucide-react';
import { ViewMode } from '../../types';

const links: { label: string; view: ViewMode }[] = [
  { label: 'Overview', view: 'app-dashboard' },
  { label: 'Discover', view: 'app-markets' },
  { label: 'Portfolio', view: 'app-portfolio' },
];

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, wallet, setIsAddFundsOpen, setIsSearchOpen, notifications } = useTrading();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const navigate = (view: ViewMode) => { setCurrentView(view); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const activityActive = ['app-orders', 'app-ledger', 'app-wallet'].includes(currentView);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-18 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('app-dashboard')} className="flex shrink-0 items-center gap-3 text-left" aria-label="Tradeon overview">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-base font-bold text-white">T</span>
          <span className="text-xl font-bold tracking-tight text-foreground">Tradeon</span>
        </button>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map((link) => <button key={link.view} onClick={() => navigate(link.view)} aria-current={currentView === link.view ? 'page' : undefined} className={`relative py-3 text-sm font-semibold ${currentView === link.view ? 'text-brand' : 'text-secondary-foreground hover:text-foreground'}`}>
            {link.label}{currentView === link.view && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand" />}
          </button>)}
          <div className="relative group">
            <button className={`flex items-center gap-1 py-3 text-sm font-semibold ${activityActive ? 'text-brand' : 'text-secondary-foreground hover:text-foreground'}`}>Activity <ChevronDown className="size-4" /></button>
            <div className="invisible absolute right-0 top-11 min-w-40 rounded-xl border border-border-subtle bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              <button onClick={() => navigate('app-orders')} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-soft">Orders</button>
              <button onClick={() => navigate('app-ledger')} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-soft">Money activity</button>
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsSearchOpen(true)} className="hidden items-center gap-2 rounded-xl border border-border-input bg-white px-3 py-2 text-sm text-muted-foreground hover:border-brand sm:flex" aria-label="Search products"><Search className="size-4" /><span>Search</span><kbd className="rounded border border-border-subtle px-1 text-xs">⌘K</kbd></button>
          <button onClick={() => navigate('app-wallet')} className="hidden items-center gap-2 rounded-xl border border-border-subtle bg-surface-tint px-3 py-1.5 text-left sm:flex" aria-label="Open wallet"><WalletIcon className="size-4 text-brand" /><span><span className="block text-xs text-muted-foreground">Wallet</span><span className="block text-sm font-bold tabular-nums">{formatINR(wallet.availableBalance)}</span></span></button>
          <Button size="sm" variant="primary" onClick={() => setIsAddFundsOpen(true)} className="hidden items-center gap-1.5 sm:flex"><Plus className="size-4" /> Add funds</Button>
          <button onClick={() => navigate('notifications')} className="relative rounded-xl p-2 text-secondary-foreground hover:bg-surface-soft" aria-label="Notifications"><Bell className="size-5" />{unreadCount > 0 && <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-negative" />}</button>
          <button onClick={() => navigate('app-profile')} className="rounded-xl border border-border-subtle p-2 text-secondary-foreground hover:border-brand" aria-label="Profile"><User className="size-5" /></button>
          <button onClick={() => setMobileOpen((open) => !open)} className="rounded-xl p-2 lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>
      {mobileOpen && <nav className="border-t border-border-subtle bg-white px-4 py-3 lg:hidden" aria-label="Mobile navigation"><div className="flex flex-col gap-1">{links.map((link) => <button key={link.view} onClick={() => navigate(link.view)} className="rounded-lg px-3 py-3 text-left font-semibold hover:bg-surface-soft">{link.label}</button>)}<button onClick={() => navigate('app-orders')} className="rounded-lg px-3 py-3 text-left font-semibold hover:bg-surface-soft">Orders</button><button onClick={() => navigate('app-ledger')} className="rounded-lg px-3 py-3 text-left font-semibold hover:bg-surface-soft">Money activity</button><Button onClick={() => { setIsAddFundsOpen(true); setMobileOpen(false); }} className="mt-2">Add funds</Button></div></nav>}
    </header>
  );
};

export default Navbar;
