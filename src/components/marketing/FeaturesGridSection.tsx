import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ArrowRight } from 'lucide-react';

export const FeaturesGridSection: React.FC = () => {
  const { setCurrentView } = useTrading();

  const manifesto = [
    {
      num: '01',
      title: 'Clarity over clutter.',
      text: 'Every interface element must justify its presence. If a metric, button, or animated chart does not directly help you understand the product or make a sound decision, we remove it.',
    },
    {
      num: '02',
      title: 'Context before action.',
      text: 'What is this product? What is it worth right now? How many units are available? You should always have clear context before you commit a single rupee.',
    },
    {
      num: '03',
      title: 'Visible consequences.',
      text: 'When you place an order, you immediately see your available cash update, your product holding adjust, and a permanent ledger entry created. No hidden debits or mysterious balance drops.',
    },
    {
      num: '04',
      title: 'Useful records.',
      text: 'A transaction record shouldn’t be an obscure bank reference with no context. It explains clearly: what was bought, at what price, what fee was charged, and what your balance became.',
    },
    {
      num: '05',
      title: 'One product, everywhere.',
      text: 'Mobile is not a stripped-down afterthought. The exact same data, ledger audit, and order capabilities follow you whether you are at your desk or checking your phone.',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 sm:mb-20">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Product Manifesto
          </div>
          <h2 className="text-[34px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            What we believe trading interfaces should feel like.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-[#5A5A53] leading-relaxed">
            We built Tradeon around restraint, transparency, and respect for your attention. Five principles guide every screen we build.
          </p>
        </div>

        {/* Typographic Manifesto Spread: Generous whitespace, editorial dividers */}
        <div className="space-y-12">
          {manifesto.map((item, idx) => (
            <div
              key={item.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 pt-8 border-t border-[#E2E1DA] items-baseline"
            >
              <div className="lg:col-span-2 font-mono text-sm font-bold text-[#087A4A]">
                {item.num} / 05
              </div>

              <div className="lg:col-span-4">
                <h3 className="text-[24px] sm:text-[28px] font-extrabold text-[#171A17] tracking-tight leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="lg:col-span-6">
                <p className="text-[16px] sm:text-[17px] text-[#5A5A53] leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Footer Link */}
        <div className="mt-16 pt-8 border-t border-[#CBCAC2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#6B6B63]">
          <span>Built for the moment you decide to act.</span>
          <button
            onClick={() => {
              setCurrentView('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-[#087A4A] hover:underline flex items-center gap-1.5 cursor-pointer text-sm"
          >
            <span>Read more about our design philosophy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
