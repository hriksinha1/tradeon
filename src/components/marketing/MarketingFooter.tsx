import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { BookOpen, ArrowUpRight } from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  const { setCurrentView, setIsDossierOpen } = useTrading();

  const handleNav = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171A17] text-[#A3A29A] pt-20 pb-14 border-t border-[#2A2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#2A2A26]">
          {/* Brand & Purpose (Col 1-5) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#0070BA] flex items-center justify-center text-[#0C0F0C] font-black text-[16px]">
                T
              </div>
              <span className="text-[20px] font-black tracking-tight text-white">Tradeon</span>
            </div>

            <p className="text-[14px] text-[#A3A29A] max-w-sm leading-relaxed">
              A modern digital trading and product marketplace platform built around clarity, real-time control, and transparent double-entry financial settlement.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsDossierOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2A2A26] hover:bg-[#40403B] text-white text-[12px] font-semibold rounded-[8px] transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0070BA]" />
                <span>Strategy Dossier</span>
              </button>

              <button
                onClick={() => handleNav('app-dashboard')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0070BA] hover:bg-[#005EA8] text-[#0C0F0C] text-[12px] font-bold rounded-[8px] transition-colors cursor-pointer"
              >
                <span>Launch App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Platform Links (Col 6-7) */}
          <div className="lg:col-span-2">
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
                  Mobile Apps
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

          {/* Interactive Prototype Jump (Col 8-9) */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-4">
              Interactive Prototype
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={() => handleNav('app-dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terminal Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('app-markets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Markets Catalog
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
                  Transaction Ledger
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Company (Col 10-12) */}
          <div className="lg:col-span-3">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-4">
              Company & Trust
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <button
                  onClick={() => handleNav('security')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Security Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Design Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
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

        {/* Bottom Bar with Mandatory Disclaimer */}
        <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-[12px] text-[#6B6B63]">
          <div className="max-w-2xl leading-relaxed">
            <p>
              Product names, values, screens and examples shown here are illustrative and may change with the final product definition, operating model and applicable requirements.
            </p>
            <p className="mt-1">
              © 2026 Tradeon. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[#A3A29A]">
            <span>Meadow Green Design System</span>
            <span aria-hidden="true">·</span>
            <span>League Spartan Typography</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
