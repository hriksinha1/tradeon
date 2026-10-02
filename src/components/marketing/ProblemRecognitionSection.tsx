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
    <section className="py-20 sm:py-24 bg-[#0B0E11] text-[#F5F5F5] border-b border-[#2B3139] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Editorial Section Intro */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="text-[12px] font-bold text-[#F0B90B] tracking-wider uppercase">
            A More Honest Approach
          </div>
          <h2 className="text-[30px] sm:text-[42px] font-bold text-[#F5F5F5] tracking-tight leading-[1.12]">
            Most platforms show you the number. We want you to understand the position.
          </h2>
          <p className="text-[16px] text-[#848E9C] leading-relaxed">
            Trading software often piles on visual noise to look powerful. We designed Tradeon around a simpler principle: decisions are better when you actually understand what you are doing.
          </p>
        </div>

        {/* Split Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Styled Terminal Concept Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-[6px] overflow-hidden border border-[#2B3139] bg-[#111418] p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2329]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F0B90B]" />
                  <span className="text-[12px] font-mono text-[#F0B90B] font-bold">PRE-TRADE CONTEXT ENGINE</span>
                </div>
                <span className="text-[11px] text-[#0ECB81] font-semibold">Active</span>
              </div>

              <div className="space-y-3 text-[12px]">
                <div className="p-3 bg-[#161A1E] border border-[#2B3139] rounded-[4px] space-y-1">
                  <span className="text-[#848E9C] text-[11px] block">Market Depth & Counterparty Reserve</span>
                  <div className="flex justify-between font-bold text-[#F5F5F5] text-[13px]">
                    <span>Quota Allocation:</span>
                    <span className="text-[#0ECB81] tabular-nums">1,240 Units Available</span>
                  </div>
                </div>

                <div className="p-3 bg-[#161A1E] border border-[#2B3139] rounded-[4px] space-y-1">
                  <span className="text-[#848E9C] text-[11px] block">All-Inclusive Fee Transparency</span>
                  <div className="flex justify-between font-bold text-[#F5F5F5] text-[13px]">
                    <span>Exchange Fee:</span>
                    <span className="text-[#F0B90B] tabular-nums">0.10% (Explicitly itemized)</span>
                  </div>
                </div>

                <div className="p-3 bg-[#161A1E] border border-[#2B3139] rounded-[4px] space-y-1">
                  <span className="text-[#848E9C] text-[11px] block">Settlement Journaling</span>
                  <div className="flex justify-between font-bold text-[#F5F5F5] text-[13px]">
                    <span>Running Audit Record:</span>
                    <span className="text-[#0ECB81]">Double-Entry Balanced</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[12px] text-[#848E9C] border-t border-[#1E2329]">
                Know what you're buying before you buy. Your orders, balances and transactions in one place.
              </div>
            </div>
          </div>

          {/* Right Column: Three Core Observations */}
          <div className="lg:col-span-7 space-y-6">
            {observations.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[6px] bg-[#111418] border border-[#2B3139] space-y-2 hover:border-[#363C45] transition-colors"
              >
                <span className="text-[11px] font-mono font-bold text-[#F0B90B] uppercase">
                  {item.kicker}
                </span>
                <h3 className="text-[18px] font-bold text-[#F5F5F5] tracking-tight">{item.title}</h3>
                <p className="text-[14px] text-[#848E9C] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemRecognitionSection;
