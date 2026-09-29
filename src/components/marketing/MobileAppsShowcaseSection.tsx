import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import {
  Smartphone,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Layers,
  ArrowLeftRight,
  PieChart,
  User,
  Compass,
  Receipt,
  Wallet,
} from 'lucide-react';

export const MobileAppsShowcaseSection: React.FC = () => {
  const { setDeviceFrame, setCurrentView, products, wallet } = useTrading();
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const mobileScreens = [
    {
      id: '01',
      title: 'Home & Activity',
      tagline: '“Good evening. 2 things changed today.”',
      description: 'Quiet, calm overview of your total liquid balance, intraday trajectory, and active positions without visual screaming.',
      screenContent: (
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E1DA]">
            <span className="text-[11px] text-[#6B6B63]">Good evening</span>
            <span className="text-[10px] font-mono text-[#087A4A]">Live connected</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-[#6B6B63]">Total portfolio</span>
            <div className="text-[22px] font-extrabold text-[#171A17] tabular-nums mt-0.5">
              {formatINR(wallet.totalValue)}
            </div>
            <div className="text-[11px] font-semibold text-[#0A7A45] mt-0.5">
              +1.42% today (+₹6,840)
            </div>
          </div>
          <div className="p-3 bg-white rounded-[12px] border border-[#E2E1DA]">
            <div className="text-[10px] text-[#6B6B63]">Available cash</div>
            <div className="text-[16px] font-bold text-[#171A17] tabular-nums">
              {formatINR(wallet.availableBalance)}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: '02',
      title: 'Product Discovery',
      tagline: '“Find a product. Review it. Decide.”',
      description: 'Browse verified listings with clear unit valuations, available supply quotas, and historical spread indicators.',
      screenContent: (
        <div className="space-y-2 text-left">
          <div className="text-[11px] font-bold text-[#171A17] pb-1 border-b border-[#E2E1DA]">
            Featured listings
          </div>
          {products.slice(0, 3).map((p) => (
            <div key={p.id} className="p-2.5 bg-white rounded-[10px] border border-[#E2E1DA] flex items-center justify-between">
              <div>
                <div className="font-bold text-[13px] text-[#171A17]">{p.name}</div>
                <div className="text-[10px] text-[#6B6B63]">{p.category} · {p.availableUnits} units</div>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-[13px] text-[#171A17] tabular-nums">{formatINR(p.currentValue)}</div>
                <div className="text-[10px] font-semibold text-[#0A7A45]">+{p.changePercent}%</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: '03',
      title: 'Buy & Sell Slip',
      tagline: '“Review before you place it.”',
      description: 'Clear quantity steppers, transparent platform fees, and instant settlement calculations right at your thumb.',
      screenContent: (
        <div className="space-y-2.5 text-left">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E1DA]">
            <span className="font-bold text-[12px] text-[#171A17]">Order unit</span>
            <span className="text-[10px] font-mono text-[#087A4A]">ATLAS-01</span>
          </div>
          <div className="p-2.5 bg-white rounded-[10px] border border-[#E2E1DA] flex justify-between items-center text-xs">
            <span>Units</span>
            <span className="font-bold text-[15px] text-[#171A17]">5 units</span>
          </div>
          <div className="p-2.5 bg-white rounded-[10px] border border-[#E2E1DA] space-y-1 text-[11px]">
            <div className="flex justify-between text-[#5A5A53]">
              <span>Price per unit</span>
              <span className="font-semibold text-[#171A17]">{formatINR(2480)}</span>
            </div>
            <div className="flex justify-between text-[#5A5A53]">
              <span>Fee (0.1%)</span>
              <span className="font-semibold text-[#171A17]">{formatINR(12)}</span>
            </div>
            <div className="pt-1 border-t border-[#EFEEE9] flex justify-between font-bold text-[#171A17]">
              <span>Total deduction</span>
              <span className="text-[#087A4A]">{formatINR(12412)}</span>
            </div>
          </div>
          <div className="w-full py-2 bg-[#1FC777] text-[#0C0F0C] font-bold text-[12px] rounded-[8px] text-center">
            Confirm buy order
          </div>
        </div>
      ),
    },
    {
      id: '04',
      title: 'Ledger & Trace',
      tagline: '“Every action leaves a useful trail.”',
      description: 'Double-entry transaction history with verifiable timestamps, running cash balances, and immutable audit keys.',
      screenContent: (
        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between pb-1 border-b border-[#E2E1DA]">
            <span className="font-bold text-[12px] text-[#171A17]">Recent ledger entries</span>
            <span className="text-[10px] text-[#087A4A]">Audit verified</span>
          </div>
          <div className="p-2 bg-white rounded-[8px] border border-[#E2E1DA] text-[11px]">
            <div className="flex justify-between font-bold">
              <span>Bought 5 units Atlas</span>
              <span className="text-[#171A17]">-₹12,412</span>
            </div>
            <div className="text-[10px] text-[#6B6B63] mt-0.5">Bal after: ₹71,838 · ORD-9912084</div>
          </div>
          <div className="p-2 bg-white rounded-[8px] border border-[#E2E1DA] text-[11px]">
            <div className="flex justify-between font-bold">
              <span>UPI Top-up</span>
              <span className="text-[#0A7A45]">+₹5,000</span>
            </div>
            <div className="text-[10px] text-[#6B6B63] mt-0.5">Bal after: ₹84,250 · TXN-88219</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F7F6F2] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Native Mobile Experience
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            The whole product in your hand.
          </h2>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            Not a shrunk-down desktop dashboard. A purposeful, ergonomic experience engineered natively for Apple iOS 18 with Dynamic Island awareness and Google Android 15 Material precision.
          </p>
        </div>

        {/* Dual Simulator Launchers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Screen Selector */}
          <div className="lg:col-span-6 space-y-4">
            {mobileScreens.map((screen, idx) => {
              const isSelected = activeScreenIndex === idx;
              return (
                <div
                  key={screen.id}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`p-6 rounded-[20px] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#1FC777] shadow-sm'
                      : 'bg-white/60 border-[#E2E1DA] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-[#087A4A] font-semibold">
                    <span>Screen {screen.id}</span>
                    <span className="text-[#6B6B63]">{screen.title}</span>
                  </div>
                  <h3 className="mt-2 text-[18px] font-bold text-[#171A17]">
                    {screen.tagline}
                  </h3>
                  <p className="mt-1.5 text-[14px] text-[#5A5A53] leading-relaxed">
                    {screen.description}
                  </p>
                </div>
              );
            })}

            {/* Launchers */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  setDeviceFrame('ios');
                  setCurrentView('app-dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 cursor-pointer font-bold shadow-xs"
              >
                <span>Launch iPhone 16 Pro Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setDeviceFrame('android');
                  setCurrentView('app-dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer"
              >
                Launch Pixel 9 Pro Simulator
              </Button>
            </div>
          </div>

          {/* Right: Realistic Phone Frame Displaying Active Screen */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[310px] sm:w-[340px] h-[640px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-[#2A2A26] relative">
              {/* Dynamic Island */}
              <div className="w-24 h-5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-4 flex items-center justify-end px-2 z-30">
                <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
              </div>

              {/* Screen Glass */}
              <div className="w-full h-full bg-[#F7F6F2] rounded-[38px] overflow-hidden flex flex-col justify-between p-4 pt-10 text-left">
                {/* Active Screen Content */}
                <div className="pt-2">
                  {mobileScreens[activeScreenIndex].screenContent}
                </div>

                {/* Bottom Home Indicator */}
                <div className="h-4 flex items-center justify-center">
                  <div className="w-24 h-1 bg-[#171A17]/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
