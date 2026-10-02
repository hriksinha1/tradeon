import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  const { setCurrentView } = useTrading();

  const handleNav = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0E11] text-[#848E9C] border-t border-[#2B3139] pt-16 pb-12 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[4px] bg-[#F0B90B] flex items-center justify-center text-[#181A20] font-black text-[16px] shadow-xs">
                T
              </div>
              <span className="text-[20px] font-bold text-[#F5F5F5] tracking-tight">Tradeon</span>
            </div>
            <p className="text-[14px] text-[#B7BDC6] max-w-sm leading-relaxed">
              Professional digital trading and asset marketplace built for high-throughput order execution, clear market depth, and auditable accounting.
            </p>
            <div className="flex items-center gap-2 text-[12px] text-[#F0B90B]">
              <span className="w-2 h-2 rounded-full bg-[#F0B90B]" />
              <span className="font-semibold text-[#848E9C]">Real-Time Trading Terminal & Market Engine</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#F5F5F5] mb-3">Platform</h4>
            <ul className="space-y-2 text-[13px] text-[#848E9C]">
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Products & Markets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('mobile-app')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Mobile Application
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('options')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Options Contracts
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('app-dashboard')} className="text-[#F0B90B] font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                  <span>Trading Terminal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#F5F5F5] mb-3">Accounting</h4>
            <ul className="space-y-2 text-[13px] text-[#848E9C]">
              <li>
                <button onClick={() => handleNav('payments')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Wallet & Gateway
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('security')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Security Architecture
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('app-ledger')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Transaction Ledger
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Help & FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#F5F5F5] mb-3">Company & Legal</h4>
            <ul className="space-y-2 text-[13px] text-[#848E9C]">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  About Tradeon
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Support Desk
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Financial Regulatory & Illustrative Notice */}
        <div className="pt-8 border-t border-[#2B3139] space-y-4">
          <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[6px] text-[12px] text-[#848E9C] leading-relaxed">
            <span className="font-bold text-[#F5F5F5] block mb-1">Market Data Notice:</span>
            Digital trading involves financial risk. Product specifications, live bids, order depth, and statistics shown are illustrative of platform capabilities and reflect active testnet allocations.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#5E6673] gap-2">
            <span>© {new Date().getFullYear()} Tradeon Financial Platform. All rights reserved.</span>
            <div className="flex items-center gap-4 text-[#848E9C]">
              <button onClick={() => handleNav('privacy')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">Privacy</button>
              <span>·</span>
              <button onClick={() => handleNav('terms')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">Terms</button>
              <span>·</span>
              <button onClick={() => handleNav('contact')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">Support</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
