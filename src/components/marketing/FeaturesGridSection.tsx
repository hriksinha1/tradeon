import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ArrowRight, Check } from 'lucide-react';

export const FeaturesGridSection: React.FC = () => {
  const { setCurrentView } = useTrading();

  const principles = [
    {
      num: '01',
      title: 'Clarity over clutter.',
      text: 'Every interface element must justify its presence. If a metric or button does not directly help the user understand or act, it gets removed.',
    },
    {
      num: '02',
      title: 'Show the important thing first.',
      text: 'What is this product? What is it worth right now? How much cash do I have available? The essentials should never be hidden behind three nested tabs.',
    },
    {
      num: '03',
      title: 'Every action must have a visible consequence.',
      text: 'When you place an order, you should immediately see your available cash update, your product holding adjust, and a permanent ledger entry created.',
    },
    {
      num: '04',
      title: 'Your records should make sense three months later.',
      text: 'A good transaction ledger isn’t a mystery code. It explains clearly: what was bought, at what price, what fee was charged, and what your balance became.',
    },
    {
      num: '05',
      title: 'Complex workflows should still feel calm.',
      text: 'Options contracts and limit orders are powerful tools. They should look understandable, clean, and bounded, not intimidating.',
    },
    {
      num: '06',
      title: 'Web and mobile are the same product.',
      text: 'Mobile is not a stripped-down afterthought. The exact same data, ledger audit, and order capabilities follow you wherever you go.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Product Manifesto
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            What we believe trading interfaces should feel like.
          </h2>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            We didn’t set out to copy Wall Street screens or build another crypto casino. We built a product around restraint, transparency, and respect for the user’s attention.
          </p>
        </div>

        {/* 6 Principles in an Editorial 2-Column Modular Layout (Not 3 identical cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-[#EFEEE9] pt-12">
          {principles.map((item) => (
            <div key={item.num} className="space-y-3 pb-8 border-b border-[#EFEEE9]">
              <div className="text-xs font-bold text-[#087A4A] tracking-wider">
                Principle {item.num}
              </div>
              <h3 className="text-[22px] font-bold text-[#171A17] tracking-tight">
                {item.title}
              </h3>
              <p className="text-[15px] text-[#5A5A53] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Thought */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 text-xs text-[#6B6B63]">
          <span>Built for the moment you decide to act.</span>
          <button
            onClick={() => {
              setCurrentView('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-[#087A4A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Read more about our design philosophy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
