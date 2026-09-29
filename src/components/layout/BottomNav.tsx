import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { LayoutDashboard, Compass, ArrowLeftRight, PieChart, User } from 'lucide-react';
import { ViewMode } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, openBuySell } = useTrading();

  const navItems: { label: string; view: ViewMode; icon: React.ReactNode }[] = [
    { label: 'Home', view: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Markets', view: 'markets', icon: <Compass className="w-5 h-5" /> },
    { label: 'Portfolio', view: 'portfolio', icon: <PieChart className="w-5 h-5" /> },
    { label: 'Profile', view: 'profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E5E4] px-3 py-1.5 flex items-center justify-around max-w-lg mx-auto sm:hidden shadow-lg">
      {/* Home */}
      <button
        onClick={() => setCurrentView('dashboard')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
          currentView === 'dashboard' ? 'text-[#6A2E62]' : 'text-[#8A8A8A] hover:text-[#171717]'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[11px] font-semibold mt-0.5">Home</span>
      </button>

      {/* Markets */}
      <button
        onClick={() => setCurrentView('markets')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
          currentView === 'markets' ? 'text-[#6A2E62]' : 'text-[#8A8A8A] hover:text-[#171717]'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[11px] font-semibold mt-0.5">Markets</span>
      </button>

      {/* Central Trade Action */}
      <div className="relative -top-3">
        <button
          onClick={() => openBuySell('buy')}
          className="w-12 h-12 rounded-full bg-[#6A2E62] text-white flex items-center justify-center shadow-md hover:bg-[#56234F] active:scale-95 transition-transform"
          aria-label="Open Trading Drawer"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>
      </div>

      {/* Portfolio */}
      <button
        onClick={() => setCurrentView('portfolio')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
          currentView === 'portfolio' ? 'text-[#6A2E62]' : 'text-[#8A8A8A] hover:text-[#171717]'
        }`}
      >
        <PieChart className="w-5 h-5" />
        <span className="text-[11px] font-semibold mt-0.5">Portfolio</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => setCurrentView('profile')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
          currentView === 'profile' ? 'text-[#6A2E62]' : 'text-[#8A8A8A] hover:text-[#171717]'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[11px] font-semibold mt-0.5">Profile</span>
      </button>
    </nav>
  );
};
