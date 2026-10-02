import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Activity, FileSpreadsheet } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

export const ProblemRecognitionSection: React.FC = () => {
  const { setCurrentView } = useTrading();

  const observations = [
    {
      kicker: 'Principle 01',
      title: 'You shouldn’t need five tabs to understand one order.',
      detail:
        'Most platforms scatter product context, order slips, fees, and settlement status across multiple disconnected windows. We bring the product information, unit limits, total cost, and execution status onto one calm surface.',
    },
    {
      kicker: 'Principle 02',
      title: 'The important context must be visible before you act.',
      detail:
        'You should know the available unit supply, indicative pricing, and net debit before confirming. No fine-print calculations or surprises after you commit.',
    },
    {
      kicker: 'Principle 03',
      title: 'Your records should still make sense two weeks later.',
      detail:
        'A transaction record shouldn’t be an obscure reference hash with no context. Every entry shows the product name, exact unit count, price per unit, and your updated wallet balance.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white text-[#181A20] border-b border-[#EAECEF] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Editorial Section Intro */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="text-[12px] font-bold text-[#946800] tracking-wider uppercase">
            A More Honest Approach
          </div>
          <h2 className="text-[30px] sm:text-[42px] font-bold text-[#181A20] tracking-tight leading-[1.12]">
            Most platforms show you the number. We want you to understand the position.
          </h2>
          <p className="text-[16px] text-[#707A8A] leading-relaxed">
            Trading software often piles on visual noise to look powerful. We designed Tradeon around a simpler principle: decisions are better when you actually understand what you are doing.
          </p>
        </div>

        {/* Split Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Styled Terminal Concept Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-[6px] overflow-hidden border border-[#DFE2E6] bg-white p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAECEF]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F0B90B]" />
                  <span className="text-[12px] font-mono text-[#946800] font-bold">PRE-TRADE CONTEXT ENGINE</span>
                </div>
                <span className="text-[11px] text-[#02A063] font-semibold">Active</span>
              </div>

              <div className="space-y-3 text-[12px]">
                <div className="p-3 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[4px] space-y-1">
                  <span className="text-[#707A8A] text-[11px] block">Market Depth & Counterparty Reserve</span>
                  <div className="flex justify-between font-bold text-[#181A20] text-[13px]">
                    <span>Quota Allocation:</span>
                    <span className="text-[#02A063] tabular-nums font-mono">1,240 Units Available</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[4px] space-y-1">
                  <span className="text-[#707A8A] text-[11px] block">All-Inclusive Fee Transparency</span>
                  <div className="flex justify-between font-bold text-[#181A20] text-[13px]">
                    <span>Exchange Fee:</span>
                    <span className="text-[#946800] tabular-nums font-mono">0.10% (Explicitly itemized)</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[4px] space-y-1">
                  <span className="text-[#707A8A] text-[11px] block">Settlement Journaling</span>
                  <div className="flex justify-between font-bold text-[#181A20] text-[13px]">
                    <span>Running Audit Record:</span>
                    <span className="text-[#02A063]">Double-Entry Balanced</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[12px] text-[#707A8A] border-t border-[#EAECEF]">
                Know what you're buying before you buy. Your orders, balances and transactions in one place.
              </div>
            </div>
          </div>

          {/* Right Column: Three Core Observations */}
          <div className="lg:col-span-7 space-y-4">
            {observations.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[6px] bg-white border border-[#DFE2E6] space-y-2 hover:border-[#CFD3D8] transition-colors shadow-xs"
              >
                <span className="text-[11px] font-mono font-bold text-[#946800] uppercase">
                  {item.kicker}
                </span>
                <h3 className="text-[18px] font-bold text-[#181A20] tracking-tight">{item.title}</h3>
                <p className="text-[14px] text-[#707A8A] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemRecognitionSection;
