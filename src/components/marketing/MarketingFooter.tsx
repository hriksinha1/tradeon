import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { ArrowUpRight } from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  const { setCurrentView } = useTrading();

  const handleNav = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0E11] text-[#848E9C] pt-16 pb-12 border-t border-[#2B3139] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2B3139]">
          {/* Brand & Purpose (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[4px] bg-[#F0B90B] flex items-center justify-center text-[#181A20] font-black text-[16px] shadow-xs">
                T
              </div>
              <span className="text-[20px] font-bold tracking-tight text-[#F5F5F5]">Tradeon</span>
            </div>

            <p className="text-[14px] text-[#B7BDC6] max-w-sm leading-relaxed">
              Professional digital trading and asset marketplace built for high-throughput order execution, clear market depth, and auditable accounting.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleNav('app-dashboard')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F0B90B] hover:bg-[#F8D12F] text-[#181A20] text-[13px] font-bold rounded-[4px] transition-colors cursor-pointer shadow-xs"
              >
                <span>Launch Terminal</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Platform Links (Col 6-7) */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#F5F5F5] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Listed Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('options')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Options Trading
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mobile-app')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Mobile Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('payments')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Payments & Ledger
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Prototype Jump (Col 8-9) */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#F5F5F5] mb-4">
              Terminal
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <button
                  onClick={() => handleNav('app-dashboard')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Terminal Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('app-markets')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Markets Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('app-wallet')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Wallet & Gateway
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('app-ledger')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Transaction Ledger
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Company (Col 10-12) */}
          <div className="lg:col-span-3">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#F5F5F5] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <button
                  onClick={() => handleNav('security')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Security Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  About Platform
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  FAQ & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Contact Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-[12px] text-[#5E6673]">
          <div className="max-w-2xl leading-relaxed">
            <p>
              Trade with more context. Real-time product contracts, market depth, and clear transaction records.
            </p>
            <p className="mt-1">
              © {new Date().getFullYear()} Tradeon. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[#848E9C]">
            <span>Trading Terminal</span>
            <span aria-hidden="true">·</span>
            <span>League Spartan</span>
            <span aria-hidden="true">·</span>
            <span>Tabular Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
