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
      kicker: 'Stage 01 · Catalog',
      headline: 'Find listed products with clear context.',
      description:
        'Browse available products without distracting noise. Every listing shows current indicative value, available unit supply, and 24-hour turnover.',
      icon: Compass,
      previewSnippet: {
        label: 'Active Listing',
        value: 'ATLAS-01 · ₹2,480.00',
        subtext: '1,240 units available in marketplace quota',
      },
    },
    {
      id: 'review',
      name: 'Review',
      kicker: 'Stage 02 · Context',
      headline: 'Inspect historical movement and unit availability.',
      description:
        'Before you act, see price history, order depth, and commercial context. You should never have to guess what you are looking at.',
      icon: FileText,
      previewSnippet: {
        label: 'Product Context',
        value: '+2.84% 24h Movement',
        subtext: 'Double-entry settlement verified with clearing desk',
      },
    },
    {
      id: 'trade',
      name: 'Execute',
      kicker: 'Stage 03 · Orders',
      headline: 'Place buy and sell orders with clear fees.',
      description:
        'Specify units, see transparent fee calculations in advance, and confirm before execution. No surprise slippage.',
      icon: ArrowRightLeft,
      previewSnippet: {
        label: 'Order Simulation',
        value: 'Buy 10 Units · ₹24,800.00',
        subtext: '0.10% platform fee shown prior to signature',
      },
    },
    {
      id: 'manage',
      name: 'Track',
      kicker: 'Stage 04 · Holdings',
      headline: 'Monitor your positions with live mark-to-market.',
      description:
        'Keep track of entry prices, current values, and net unrealized gains across every asset you hold in your portfolio.',
      icon: PieChart,
      previewSnippet: {
        label: 'Position Ledger',
        value: '₹4,82,640 Portfolio Valuation',
        subtext: '12 active product positions marked to market',
      },
    },
    {
      id: 'wallet',
      name: 'Settle',
      kicker: 'Stage 05 · Wallet',
      headline: 'Move money with segregated escrow rails.',
      description:
        'Deposit via instant UPI or Net Banking, and withdraw directly to verified domestic bank accounts within 2 hours.',
      icon: Wallet,
      previewSnippet: {
        label: 'Liquid Balance',
        value: '₹84,250 Available Cash',
        subtext: 'Instant IMPS bank withdrawal ready',
      },
    },
    {
      id: 'audit',
      name: 'Audit',
      kicker: 'Stage 06 · Accounting',
      headline: 'A clear double-entry record of every event.',
      description:
        'Every trade, deposit, withdrawal, and fee adjustment writes an immutable running-balance ledger entry exportable as CSV.',
      icon: Receipt,
      previewSnippet: {
        label: 'Verified Entry',
        value: 'TXN-90342 · Balanced',
        subtext: 'Double-entry cryptographic verification',
      },
    },
  ];

  const current = steps[activeStepIndex];
  const IconComponent = current.icon;

  return (
    <section className="py-20 sm:py-24 bg-white text-[#181A20] border-b border-[#EAECEF] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="text-[12px] font-bold text-[#946800] tracking-wider uppercase">
            Platform Workflow
          </div>
          <h2 className="text-[30px] sm:text-[42px] font-bold text-[#181A20] tracking-tight leading-[1.12]">
            One place to discover products, act on them, and keep track of what happens next.
          </h2>
          <p className="text-[16px] text-[#707A8A] leading-relaxed">
            Tradeon brings product discovery, straightforward order execution, and double-entry accounting into one coherent terminal across web and mobile.
          </p>
        </div>

        {/* Ecosystem Interactive Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Step Selector */}
          <div className="lg:col-span-5 space-y-1.5">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx === activeStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-[6px] transition-all flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-[#FEF6D8]/50 border-[#F0B90B] shadow-xs'
                      : 'bg-white border-[#DFE2E6] hover:border-[#CFD3D8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-[4px] flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-[#F0B90B] text-[#181A20]'
                          : 'bg-[#F5F6F8] text-[#707A8A]'
                      }`}
                    >
                      <StepIcon className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    <div>
                      <div className="text-[11px] text-[#707A8A] font-mono">{step.kicker}</div>
                      <div
                        className={`text-[15px] font-bold ${
                          isActive ? 'text-[#181A20]' : 'text-[#707A8A]'
                        }`}
                      >
                        {step.name}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#946800] translate-x-1' : 'text-[#CFD3D8]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Step Stage Details */}
          <div className="lg:col-span-7 bg-white border border-[#DFE2E6] rounded-[6px] p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex items-center gap-3 pb-4 border-b border-[#EAECEF]">
              <div className="w-10 h-10 rounded-[4px] bg-[#FEF6D8] border border-[#FCDD80] text-[#946800] flex items-center justify-center">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-[#946800] uppercase">
                  {current.kicker}
                </span>
                <h3 className="text-[20px] font-bold text-[#181A20]">{current.headline}</h3>
              </div>
            </div>

            <p className="text-[15px] text-[#474D57] leading-relaxed">
              {current.description}
            </p>

            {/* Contextual Metric Snippet */}
            <div className="p-4 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6] space-y-1 text-[13px] tabular-nums font-mono">
              <span className="text-[11px] text-[#707A8A] font-semibold uppercase block font-sans">
                {current.previewSnippet.label}
              </span>
              <span className="text-[18px] font-bold text-[#181A20] block">
                {current.previewSnippet.value}
              </span>
              <span className="text-[12px] text-[#02A063] flex items-center gap-1.5 pt-1 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {current.previewSnippet.subtext}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentView('app-dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-[14px] font-bold text-[#946800] hover:underline cursor-pointer"
              >
                <span>Launch this stage in Tradeon Terminal</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatTradeonIsSection;
