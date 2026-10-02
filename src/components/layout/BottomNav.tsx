import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { LayoutDashboard, Compass, ArrowLeftRight, PieChart, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, openBuySell } = useTrading();

  const isHomeActive = currentView === 'app-dashboard' || currentView === 'dashboard';
  const isMarketsActive = currentView === 'app-markets' || currentView === 'markets';
  const isPortfolioActive = currentView === 'app-portfolio' || currentView === 'portfolio';
  const isProfileActive = currentView === 'app-profile' || currentView === 'profile';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#111418]/95 backdrop-blur-md border-t border-[#2B3139] px-3 py-1 flex items-center justify-around max-w-lg mx-auto sm:hidden shadow-2xl select-none">
      {/* Home */}
      <button
        onClick={() => setCurrentView('app-dashboard')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] transition-colors cursor-pointer ${
          isHomeActive ? 'text-[#F0B90B] font-bold' : 'text-[#848E9C] hover:text-[#F5F5F5]'
        }`}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span className="text-[11px] mt-0.5">Home</span>
      </button>

      {/* Markets */}
      <button
        onClick={() => setCurrentView('app-markets')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] transition-colors cursor-pointer ${
          isMarketsActive ? 'text-[#F0B90B] font-bold' : 'text-[#848E9C] hover:text-[#F5F5F5]'
        }`}
      >
        <Compass className="w-4 h-4" />
        <span className="text-[11px] mt-0.5">Markets</span>
      </button>

      {/* Central Trade Action */}
      <div className="relative -top-3">
        <button
          onClick={() => openBuySell('buy')}
          className="w-11 h-11 rounded-full bg-[#F0B90B] text-[#181A20] flex items-center justify-center shadow-lg hover:bg-[#F8D12F] active:scale-95 transition-transform cursor-pointer font-bold"
          aria-label="Open Trading Drawer"
        >
          <ArrowLeftRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Portfolio */}
      <button
        onClick={() => setCurrentView('app-portfolio')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] transition-colors cursor-pointer ${
          isPortfolioActive ? 'text-[#F0B90B] font-bold' : 'text-[#848E9C] hover:text-[#F5F5F5]'
        }`}
      >
        <PieChart className="w-4 h-4" />
        <span className="text-[11px] mt-0.5">Portfolio</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => setCurrentView('app-profile')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] transition-colors cursor-pointer ${
          isProfileActive ? 'text-[#F0B90B] font-bold' : 'text-[#848E9C] hover:text-[#F5F5F5]'
        }`}
      >
        <User className="w-4 h-4" />
        <span className="text-[11px] mt-0.5">Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
