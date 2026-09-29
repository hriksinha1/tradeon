import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { LayoutDashboard, Compass, ArrowLeftRight, PieChart, User } from 'lucide-react';
import { ViewMode } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, openBuySell } = useTrading();

  const isHomeActive = currentView === 'app-dashboard' || currentView === 'dashboard';
  const isMarketsActive = currentView === 'app-markets' || currentView === 'markets';
  const isPortfolioActive = currentView === 'app-portfolio' || currentView === 'portfolio';
  const isProfileActive = currentView === 'app-profile' || currentView === 'profile';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#CBCAC2] px-3 py-1.5 flex items-center justify-around max-w-lg mx-auto sm:hidden shadow-lg">
      {/* Home */}
      <button
        onClick={() => setCurrentView('app-dashboard')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
          isHomeActive ? 'text-[#087A4A] font-bold' : 'text-[#6B6B63] hover:text-[#171A17]'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[11px] font-semibold mt-0.5">Home</span>
      </button>

      {/* Markets */}
      <button
        onClick={() => setCurrentView('app-markets')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
          isMarketsActive ? 'text-[#087A4A] font-bold' : 'text-[#6B6B63] hover:text-[#171A17]'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[11px] font-semibold mt-0.5">Markets</span>
      </button>

      {/* Central Trade Action */}
      <div className="relative -top-3">
        <button
          onClick={() => openBuySell('buy')}
          className="w-12 h-12 rounded-full bg-[#1FC777] text-[#0C0F0C] flex items-center justify-center shadow-md hover:bg-[#18B36A] active:scale-95 transition-transform cursor-pointer font-bold"
          aria-label="Open Trading Drawer"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>
      </div>

      {/* Portfolio */}
      <button
        onClick={() => setCurrentView('app-portfolio')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
          isPortfolioActive ? 'text-[#087A4A] font-bold' : 'text-[#6B6B63] hover:text-[#171A17]'
        }`}
      >
        <PieChart className="w-5 h-5" />
        <span className="text-[11px] font-semibold mt-0.5">Portfolio</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => setCurrentView('app-profile')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
          isProfileActive ? 'text-[#087A4A] font-bold' : 'text-[#6B6B63] hover:text-[#171A17]'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[11px] font-semibold mt-0.5">Profile</span>
      </button>
    </nav>
  );
};
