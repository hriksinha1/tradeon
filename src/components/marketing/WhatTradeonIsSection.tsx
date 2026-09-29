import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import {
  Compass,
  FileText,
  ArrowRightLeft,
  Wallet,
  PieChart,
  Receipt,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface EcosystemStep {
  id: string;
  name: string;
  kicker: string;
  headline: string;
  description: string;
  icon: React.ElementType;
  previewSnippet: {
    label: string;
    value: string;
    subtext: string;
  };
}

export const WhatTradeonIsSection: React.FC = () => {
  const { setCurrentView } = useTrading();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps: EcosystemStep[] = [
    {
      id: 'discover',
      name: 'Discover',
      kicker: 'Step 01 · Catalog',
      headline: 'Find listed products with clear context.',
      description:
        'Browse available products without being blinded by flashing tickers. Every listing shows current indicative value, available unit supply, and 24-hour activity.',
      icon: Compass,
      previewSnippet: {
        label: 'Active Listing',
        value: 'ATLAS-01 · ₹2,450.00',
        subtext: '4,200 units available in marketplace quota',
      },
    },
    {
      id: 'review',
      name: 'Review',
      kicker: 'Step 02 · Context',
      headline: 'Inspect historical movement and unit availability.',
      description:
        'Before you act, see price history, unit allocations, and commercial context. You should never have to guess what you are looking at.',
      icon: FileText,
      previewSnippet: {
        label: 'Product Context',
        value: '+3.4% 24h Movement',
        subtext: 'Double-entry settlement verified with seller',
      },
    },
    {
      id: 'trade',
      name: 'Buy & Sell',
      kicker: 'Step 03 · Execution',
      headline: 'Place orders with full breakdown before confirmation.',
      description:
        'Specify your exact quantity. Tradeon calculates total costs, unit allocation, and settlement timing in real time before you click confirm.',
      icon: ArrowRightLeft,
      previewSnippet: {
        label: 'Order Ticket',
        value: '5 Units · ₹12,250.00',
        subtext: 'Zero hidden processing fees',
      },
    },
    {
      id: 'wallet',
      name: 'Wallet',
      kicker: 'Step 04 · Liquidity',
      headline: 'Deposit and withdraw through transparent rails.',
      description:
        'Move money into your trading wallet with instant UPI, net banking, or debit cards. Your available balance is reconciled with every order.',
      icon: Wallet,
      previewSnippet: {
        label: 'Wallet Balance',
        value: '₹24,850.00 Available',
        subtext: 'Instant deposit tracking with bank reference',
      },
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      kicker: 'Step 05 · Ownership',
      headline: 'Track active holdings and realized returns.',
      description:
        'See all open positions, acquired units, average purchase price, and current market valuations grouped cleanly on one calm dashboard.',
      icon: PieChart,
      previewSnippet: {
        label: 'Holdings Valuation',
        value: '₹84,200.00 Net Value',
        subtext: '12 active product contracts in custody',
      },
    },
    {
      id: 'ledger',
      name: 'Ledger',
      kicker: 'Step 06 · Accounting',
      headline: 'Every rupee leaves an immutable, auditable trail.',
      description:
        'Later, you will want to know where every rupee went. Tradeon logs every order, debit, credit, and withdrawal to a double-entry ledger with a running balance.',
      icon: Receipt,
      previewSnippet: {
        label: 'Ledger Entry',
        value: 'TXN-88219 · Cleared',
        subtext: 'Running balance: ₹24,850.00 after settlement',
      },
    },
  ];

  const current = steps[activeStepIndex];
  const IconComponent = current.icon;

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18 space-y-4">
          <div className="text-xs font-semibold text-[#005EA8] tracking-wider uppercase">
            The Complete Product
          </div>
          <h2 className="text-[34px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            One place to discover products, act on them, and keep track of what happens next.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-[#5A5A53] leading-relaxed">
            Tradeon brings product discovery, straightforward order execution, and double-entry accounting into one coherent experience across web and mobile.
          </p>
        </div>

        {/* Ecosystem Interactive Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Horizontal / Vertical Step Selector */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-semibold text-[#6B6B63] mb-3 uppercase tracking-wider">
              Ecosystem Stages
            </div>

            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx === activeStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-4 rounded-[14px] transition-all flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-[#F7F6F2] border-[#0070BA] shadow-xs'
                      : 'bg-transparent border-transparent hover:bg-[#F7F6F2]/60 hover:border-[#E2E1DA]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-[10px] flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-[#0070BA] text-[#0C0F0C]'
                          : 'bg-[#EFEEE9] text-[#5A5A53]'
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="text-xs text-[#6B6B63] font-medium">{step.kicker}</div>
                      <div
                        className={`text-[16px] font-bold ${
                          isActive ? 'text-[#171A17]' : 'text-[#5A5A53]'
                        }`}
                      >
                        {step.name}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#005EA8] translate-x-1' : 'text-[#CBCAC2]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Stage Story & Live Preview Visual */}
          <div className="lg:col-span-7 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[24px] p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-[#E2E1DA] pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#0070BA] text-[#0C0F0C] flex items-center justify-center font-bold">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#005EA8] uppercase tracking-wider block">
                    {current.kicker}
                  </span>
                  <h3 className="text-[22px] font-bold text-[#171A17]">{current.name} Experience</h3>
                </div>
              </div>

              <span className="text-xs font-mono text-[#6B6B63] bg-[#EFEEE9] px-2.5 py-1 rounded-[6px]">
                0{activeStepIndex + 1} / 06
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-[24px] sm:text-[28px] font-bold text-[#171A17] leading-snug">
                {current.headline}
              </h4>
              <p className="text-[16px] sm:text-[17px] text-[#5A5A53] leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Stage Preview Snippet Box */}
            <div className="bg-[#FFFFFF] border border-[#E2E1DA] rounded-[16px] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6B6B63]">
                <span className="font-semibold text-[#171A17]">{current.previewSnippet.label}</span>
                <span className="text-[#005EA8] flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Live in Platform
                </span>
              </div>

              <div className="text-[20px] sm:text-[22px] font-extrabold text-[#171A17] tabular-nums">
                {current.previewSnippet.value}
              </div>

              <div className="text-xs text-[#5A5A53] pt-2 border-t border-[#EFEEE9]">
                {current.previewSnippet.subtext}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  setCurrentView('app-dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#171A17] text-[#FFFFFF] hover:bg-[#0C0F0C] font-semibold text-sm rounded-[10px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Preview {current.name} in interactive terminal</span>
                <ArrowRight className="w-4 h-4 text-[#0070BA]" />
              </button>

              <button
                onClick={() => {
                  setCurrentView('how-it-works');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-[#005EA8] hover:underline cursor-pointer"
              >
                Read full {current.name.toLowerCase()} specification →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
