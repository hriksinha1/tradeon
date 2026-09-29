import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import {
  Smartphone,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Search,
  Check,
  ShieldCheck,
} from 'lucide-react';

export const MobileAppsShowcaseSection: React.FC = () => {
  const { setDeviceFrame, setCurrentView, products, wallet } = useTrading();
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const stages = [
    {
      kicker: 'Phase 01',
      title: 'Find it.',
      headline: 'Quick discovery without endless scrolling.',
      description:
        'Search products, filter by activity, or inspect trending units with clean indicative pricing and unit quotas right from your home feed.',
      screenContent: (
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E1DA]">
            <span className="text-xs font-bold text-[#171A17]">Marketplace</span>
            <span className="text-[10px] font-mono text-[#087A4A] bg-[#E9FAF1] px-2 py-0.5 rounded">Live</span>
          </div>

          <div className="p-2 bg-white rounded-[10px] border border-[#E2E1DA] flex items-center gap-2 text-xs text-[#6B6B63]">
            <Search className="w-3.5 h-3.5 text-[#5A5A53]" />
            <span>Search listed products...</span>
          </div>

          <div className="space-y-2 pt-1">
            {products.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-2.5 bg-white rounded-[12px] border border-[#E2E1DA] flex items-center justify-between shadow-2xs"
              >
                <div>
                  <div className="font-bold text-[13px] text-[#171A17]">{p.name}</div>
                  <div className="text-[10px] text-[#6B6B63]">
                    {p.availableUnits.toLocaleString()} units
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[13px] text-[#171A17] tabular-nums">
                    {formatINR(p.currentValue)}
                  </div>
                  <div className="text-[10px] font-semibold text-[#0A7A45]">+{p.changePercent}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      kicker: 'Phase 02',
      title: 'Understand it.',
      headline: 'All the context before you place a rupee.',
      description:
        'Tap any listing to inspect unit history, allocation limits, recent volatility, and double-entry settlement terms.',
      screenContent: (
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E1DA]">
            <div>
              <div className="font-bold text-[14px] text-[#171A17]">Atlas Contract</div>
              <div className="text-[10px] font-mono text-[#6B6B63]">ATLAS-01</div>
            </div>
            <span className="text-[14px] font-extrabold text-[#171A17] tabular-nums">₹2,450.00</span>
          </div>

          <div className="p-3 bg-white rounded-[12px] border border-[#E2E1DA] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#5A5A53]">Available quota</span>
              <span className="font-bold text-[#171A17]">4,200 units</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#5A5A53]">24h Movement</span>
              <span className="font-bold text-[#0A7A45]">+3.4%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#5A5A53]">Settlement rail</span>
              <span className="font-bold text-[#087A4A]">Direct Reconciled</span>
            </div>
          </div>

          <div className="p-2.5 bg-[#EFEEE9] rounded-[10px] text-[11px] text-[#5A5A53]">
            Verified commercial supply with direct seller double-entry settlement.
          </div>
        </div>
      ),
    },
    {
      kicker: 'Phase 03',
      title: 'Act.',
      headline: 'A bottom-sheet order slip with zero guesswork.',
      description:
        'Choose your quantity. The total debit, fee breakdown, and execution prompt are calculated right above your thumb before you commit.',
      screenContent: (
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E1DA]">
            <span className="font-bold text-[13px] text-[#171A17]">Order Slip</span>
            <span className="text-[11px] text-[#087A4A] font-semibold">Ready to submit</span>
          </div>

          <div className="p-3 bg-white rounded-[12px] border border-[#E2E1DA] flex justify-between items-center">
            <span className="text-xs text-[#5A5A53]">Quantity</span>
            <span className="font-bold text-[16px] text-[#171A17]">5 units</span>
          </div>

          <div className="p-3 bg-white rounded-[12px] border border-[#E2E1DA] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#5A5A53]">
              <span>5 × ₹2,450.00</span>
              <span className="font-semibold text-[#171A17]">₹12,250.00</span>
            </div>
            <div className="flex justify-between text-[#5A5A53]">
              <span>Platform fee (0.1%)</span>
              <span className="font-semibold text-[#171A17]">₹12.25</span>
            </div>
            <div className="pt-2 border-t border-[#EFEEE9] flex justify-between font-bold text-[13px] text-[#171A17]">
              <span>Total deduction</span>
              <span className="text-[#087A4A]">₹12,262.25</span>
            </div>
          </div>

          <div className="w-full py-2.5 bg-[#1FC777] text-[#0C0F0C] font-bold text-xs rounded-[10px] text-center shadow-xs">
            Authorize Order
          </div>
        </div>
      ),
    },
    {
      kicker: 'Phase 04',
      title: 'Keep track.',
      headline: 'A transparent ledger entry before you close the app.',
      description:
        'The moment your order fills, your wallet updates and an itemized receipt appears with sequential timestamp and updated running balance.',
      screenContent: (
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E1DA]">
            <span className="font-bold text-[13px] text-[#171A17]">Ledger Receipt</span>
            <span className="text-[10px] text-[#12A560] font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" />
              Cleared
            </span>
          </div>

          <div className="p-3 bg-white rounded-[12px] border border-[#E2E1DA] space-y-2">
            <div className="text-[10px] text-[#6B6B63] font-mono">ORD-9912084 · Just now</div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#171A17]">Bought 5 Atlas units</span>
              <span className="font-bold text-xs text-[#E5484D]">-₹12,262.25</span>
            </div>
            <div className="text-[11px] text-[#5A5A53] pt-1 border-t border-[#EFEEE9]">
              Updated Wallet Balance: <span className="font-bold text-[#171A17]">₹71,987.75</span>
            </div>
          </div>

          <div className="p-2.5 bg-[#E9FAF1] rounded-[10px] text-[11px] text-[#087A4A] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Auditable in your permanent transaction ledger</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#F7F6F2] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-14 sm:mb-20">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Mobile Experience
          </div>
          <h2 className="text-[34px] sm:text-[50px] font-extrabold text-[#171A17] tracking-tight leading-[1.1]">
            The whole product in your hand.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-[#5A5A53] leading-relaxed">
            Not a watered-down mobile web wrapper. A complete, fluid touch interface designed for native Apple iOS and Google Android devices.
          </p>
        </div>

        {/* Narrative Split: Authentic Human Photo + 4-Stage Step Walkthrough + Real Mobile Device */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Human Context Photo & Stage Steps */}
          <div className="lg:col-span-6 space-y-6">
            {/* Real Lifestyle Image */}
            <div className="relative rounded-[20px] overflow-hidden border border-[#CBCAC2] shadow-sm mb-6">
              <img
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80"
                alt="Person calmly using mobile application in a clean workspace"
                className="w-full h-48 sm:h-56 object-cover filter brightness-[0.98]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F0C]/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-[#1FC777] font-bold uppercase tracking-wider block">
                  On-the-go Clarity
                </span>
                <span className="text-sm font-semibold">
                  Every feature from the desktop terminal, thoughtfully scaled for handheld clarity.
                </span>
              </div>
            </div>

            {/* 4 Interactive Stages (Find it -> Understand it -> Act -> Keep track) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stages.map((stage, idx) => {
                const isSelected = activeStageIndex === idx;
                return (
                  <button
                    key={stage.title}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`p-4 rounded-[16px] text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#1FC777] shadow-sm'
                        : 'bg-white/60 border-[#E2E1DA] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-[#087A4A] font-semibold mb-1">
                      <span>{stage.kicker}</span>
                      <span className="text-[11px] text-[#6B6B63]">0{idx + 1}</span>
                    </div>
                    <div className="text-[18px] font-bold text-[#171A17]">{stage.title}</div>
                    <p className="text-xs text-[#5A5A53] mt-1 line-clamp-2 leading-relaxed">
                      {stage.headline}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Simulator Launchers */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  setDeviceFrame('ios');
                  setCurrentView('app-dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 cursor-pointer font-bold shadow-xs text-xs sm:text-sm"
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
                className="cursor-pointer text-xs sm:text-sm"
              >
                Launch Pixel 9 Pro Simulator
              </Button>
            </div>
          </div>

          {/* Right Column: Realistic Phone Frame Displaying Active Screen */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[300px] sm:w-[330px] h-[600px] sm:h-[630px] bg-[#0C0F0C] rounded-[48px] p-3 shadow-2xl border-4 border-[#2A2A26] relative">
              {/* Dynamic Island Header */}
              <div className="w-24 h-5 bg-[#000000] rounded-full absolute left-1/2 -translate-x-1/2 top-4 flex items-center justify-end px-2 z-30">
                <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
              </div>

              {/* Screen Glass */}
              <div className="w-full h-full bg-[#F7F6F2] rounded-[38px] overflow-hidden flex flex-col justify-between p-4 pt-10 text-left">
                {/* Active Screen Content */}
                <div className="pt-2">
                  <div className="text-[11px] font-semibold text-[#087A4A] uppercase tracking-wider mb-2">
                    {stages[activeStageIndex].kicker} · {stages[activeStageIndex].title}
                  </div>
                  {stages[activeStageIndex].screenContent}
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
