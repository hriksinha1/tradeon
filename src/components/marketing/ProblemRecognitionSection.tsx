import React from 'react';
import { ArrowRight, Eye, CheckCircle2, Sliders, Shield } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

export const ProblemRecognitionSection: React.FC = () => {
  const { setCurrentView } = useTrading();

  const frustrations = [
    {
      quote: '“I don’t want five screens open just to understand one transaction.”',
      solution: 'Everything unified',
      description: 'Product information, your available cash, the order slip, and the resulting ledger record live in one coherent view.',
    },
    {
      quote: '“I want to know what I’m buying before I commit.”',
      solution: 'Clear product context',
      description: 'Every listing shows available business inventory, indicative valuations, historical movement, and clear unit measures.',
    },
    {
      quote: '“I want a clean history when I need it later.”',
      solution: 'Audited double-entry ledger',
      description: 'Every rupee added, deducted, or held in contracts is timestamped with verifiable running balances.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            A More Honest Approach
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            Most platforms give you the number. We want you to understand the number.
          </h2>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            Financial software has spent years adding complexity to look serious. We built Tradeon around a simpler belief: complex operations should still feel calm, predictable, and completely transparent.
          </p>
        </div>

        {/* 3 Human Frustrations vs Tradeon Reality - Varied Editorial Layout (Not 3 identical cards) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {frustrations.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[20px] bg-[#F7F6F2] border border-[#E2E1DA] flex flex-col justify-between space-y-6 hover:border-[#1FC777] transition-all"
            >
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#087A4A]">
                  0{idx + 1} · {item.solution}
                </div>
                <blockquote className="text-[17px] font-bold text-[#171A17] leading-snug">
                  {item.quote}
                </blockquote>
                <p className="text-[14px] text-[#5A5A53] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E1DA] flex items-center gap-2 text-xs font-semibold text-[#171A17]">
                <CheckCircle2 className="w-4 h-4 text-[#12A560]" />
                <span>Built into the core interface</span>
              </div>
            </div>
          ))}
        </div>

        {/* Split Editorial Manifesto Callout */}
        <div className="mt-16 p-8 sm:p-12 rounded-[24px] bg-[#F7F6F2] border border-[#CBCAC2] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#171A17] tracking-tight">
              One clear model across web and mobile.
            </h3>
            <p className="text-[15px] text-[#5A5A53] leading-relaxed">
              Whether you are evaluating listings on a desktop screen or placing an order from your phone, Tradeon preserves the exact same mental model, data clarity, and execution confidence.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-[14px] font-bold text-[#087A4A] hover:text-[#0A603C] hover:underline cursor-pointer whitespace-nowrap"
          >
            <span>Read how the product works</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
