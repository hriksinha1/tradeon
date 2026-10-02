import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { LayoutDashboard, Compass, ArrowLeftRight, PieChart, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, openBuySell, products } = useTrading();

  const navItems = [
    {
      label: 'Home',
      view: 'app-dashboard' as const,
      icon: LayoutDashboard,
      isActive: currentView === 'app-dashboard' || currentView === 'dashboard',
    },
    {
      label: 'Markets',
      view: 'app-markets' as const,
      icon: Compass,
      isActive: currentView === 'app-markets' || currentView === 'markets',
    },
    {
      label: 'Portfolio',
      view: 'app-portfolio' as const,
      icon: PieChart,
      isActive: currentView === 'app-portfolio' || currentView === 'portfolio',
    },
    {
      label: 'Profile',
      view: 'app-profile' as const,
      icon: User,
      isActive: currentView === 'app-profile' || currentView === 'profile',
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EAECEF] px-2 py-1.5 flex items-center justify-around sm:hidden select-none shadow-lg"
      aria-label="Mobile Navigation"
    >
      {/* First two items */}
      {navItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => {
              setCurrentView(item.view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-[6px] transition-colors cursor-pointer ${
              item.isActive
                ? 'text-[#181A20] font-bold'
                : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}

      {/* Central Quick Trade Action Button */}
      <div className="-mt-5">
        <button
          onClick={() => {
            if (products.length > 0) {
              openBuySell('buy', products[0]);
            } else {
              setCurrentView('app-markets');
            }
          }}
          className="w-11 h-11 rounded-full bg-[#F0B90B] text-[#181A20] shadow-md hover:bg-[#F8D12F] flex items-center justify-center transition-transform active:scale-95 cursor-pointer border-2 border-white"
          aria-label="Quick Trade Order"
        >
          <ArrowLeftRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Last two items */}
      {navItems.slice(2).map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => {
              setCurrentView(item.view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-[6px] transition-colors cursor-pointer ${
              item.isActive
                ? 'text-[#181A20] font-bold'
                : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
