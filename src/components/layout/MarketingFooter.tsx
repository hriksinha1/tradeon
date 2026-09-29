import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  const { setCurrentView } = useTrading();

  const handleNav = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171A17] text-white border-t border-[#2A2A26] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#1FC777] flex items-center justify-center text-[#0C0F0C] font-black text-[16px]">
                T
              </div>
              <span className="text-[22px] font-bold text-white tracking-tight">Tradeon</span>
            </div>
            <p className="text-[14px] text-[#A3A29A] max-w-sm leading-relaxed">
              A modern digital trading and product marketplace platform built around clarity, control, and transparent transactions across Web, iOS, and Android.
            </p>
            <div className="flex items-center gap-2 text-[12px] text-[#1FC777]">
              <span className="w-2 h-2 rounded-full bg-[#1FC777]" />
              <span className="font-semibold">Meadow Green Design System Specification</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-[14px] text-[#A3A29A]">
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-white transition-colors cursor-pointer">
                  Products & Markets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How it Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('mobile-app')} className="hover:text-white transition-colors cursor-pointer">
                  Mobile Application
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('options')} className="hover:text-white transition-colors cursor-pointer">
                  Options Contracts
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('app-preview')} className="text-[#1FC777] font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                  <span>Interactive App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white mb-3">Infrastructure</h4>
            <ul className="space-y-2 text-[14px] text-[#A3A29A]">
              <li>
                <button onClick={() => handleNav('payments')} className="hover:text-white transition-colors cursor-pointer">
                  Wallet & Payments
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('security')} className="hover:text-white transition-colors cursor-pointer">
                  Security Architecture
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('app-ledger')} className="hover:text-white transition-colors cursor-pointer">
                  Audited Ledger
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white mb-3">Company & Legal</h4>
            <ul className="space-y-2 text-[14px] text-[#A3A29A]">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Platform
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Required Mandatory Disclaimer Box */}
        <div className="pt-8 border-t border-[#2A2A26] space-y-4">
          <div className="p-4 bg-[#2A2A26]/60 border border-[#40403B] rounded-[12px] text-[12px] text-[#A3A29A] leading-relaxed">
            <span className="font-bold text-white block mb-1">Confidential Prototype Disclaimer:</span>
            Product names, values and interface examples shown on this website are illustrative and may change based on the final product definition, operating model and applicable requirements. The platform architecture is designed with neutral product abstractions to accommodate verified business listings upon client disclosure.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#6B6B63] gap-2">
            <span>© {new Date().getFullYear()} Tradeon Platform Foundation. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors">Privacy</button>
              <span>·</span>
              <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors">Terms</button>
              <span>·</span>
              <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">Inquiries</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
