import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import {
  TrendingUp,
  Shield,
  Smartphone,
  BookOpen,
  ArrowUpRight,
  Heart,
} from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  const { setCurrentView, setIsDossierOpen } = useTrading();

  const handleNav = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171A17] text-[#A3A29A] pt-16 pb-12 border-t border-[#2A2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#2A2A26]">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#1FC777] flex items-center justify-center text-[#0C0F0C] font-black text-[16px]">
                T
              </div>
              <span className="text-[20px] font-black tracking-tight text-white">Tradeon</span>
            </div>
            <p className="text-[14px] text-[#A3A29A] max-w-sm leading-relaxed">
              A modern digital trading and product marketplace platform built around clarity, real-time control, and transparent double-entry financial settlement.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsDossierOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2A2A26] hover:bg-[#40403B] text-white text-[12px] font-semibold rounded-[8px] transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#1FC777]" />
                <span>Strategy Dossier</span>
              </button>
              <button
                onClick={() => handleNav('app-dashboard')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1FC777] hover:bg-[#18B36A] text-[#0C0F0C] text-[12px] font-bold rounded-[8px] transition-colors cursor-pointer"
              >
                <span>Launch App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Listed Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('options')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Options Trading
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mobile-app')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  iOS & Android Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('payments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Payments & Ledger
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive App */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-4">
              Interactive Prototype
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={() => handleNav('app-dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trading Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('app-markets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Live Market Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('app-portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portfolio Breakdown
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('app-orders')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Execution
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('app-wallet')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wallet & Gateway
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('app-ledger')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Audit Ledger
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Compliance */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={() => handleNav('security')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Security Controls
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ & Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Confidentiality Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#6B6B63]">
          <div>
            <span>© 2026 Tradeon Platform. All rights reserved.</span>
            <span className="block mt-1 text-[#5A5A53]">
              Confidential Product Architecture — Built for Client Advance Demonstration.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#1FC777]">
              <span className="w-2 h-2 rounded-full bg-[#1FC777]" />
              <span>Production Foundation Ready</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
