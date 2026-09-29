import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

export const ProblemRecognitionSection: React.FC = () => {
  const { setCurrentView } = useTrading();

  const observations = [
    {
      kicker: 'Observation 01',
      title: 'You shouldn’t need five tabs to understand one order.',
      detail:
        'Most platforms scatter product context, order slips, fees, and settlement status across multiple disconnected windows. We bring the product information, unit limits, total cost, and execution status onto one calm surface.',
    },
    {
      kicker: 'Observation 02',
      title: 'The important context should be visible before you act.',
      detail:
        'You should know the available unit supply, indicative pricing, and net debit before confirming. No fine-print calculations or surprises after you commit.',
    },
    {
      kicker: 'Observation 03',
      title: 'Your records should still make sense two weeks later.',
      detail:
        'A transaction record shouldn’t be an obscure reference hash with no context. Every entry shows the product name, exact unit count, price per unit, and your updated wallet balance.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Editorial Section Intro */}
        <div className="max-w-3xl mb-14 sm:mb-18 space-y-4">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            A More Honest Approach
          </div>
          <h2 className="text-[34px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            Most platforms show you the number. We want you to understand the number.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-[#5A5A53] leading-relaxed">
            Trading software often piles on visual noise to look powerful. We designed Tradeon around a simpler human principle: decisions are better when you actually understand what you are doing.
          </p>
        </div>

        {/* Split Editorial Composition: Human Lifestyle Photography + Typography Observations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Human Moment (Context & Calm Decision Making) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[24px] overflow-hidden border border-[#CBCAC2] shadow-[0_20px_45px_rgba(0,0,0,0.08)] bg-[#EFEEE9]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                alt="Professional thoughtfully reviewing context before making an informed decision"
                className="w-full h-[460px] sm:h-[520px] object-cover object-top filter brightness-[0.98]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F0C]/80 via-transparent to-transparent" />

              {/* Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white p-4 bg-[#0C0F0C]/70 backdrop-blur-md rounded-[16px] border border-white/10">
                <div className="text-xs text-[#1FC777] font-semibold uppercase tracking-wider">
                  The Human Context
                </div>
                <div className="text-[15px] font-bold mt-1 leading-snug">
                  “I don’t want to guess. I want the context before I confirm.”
                </div>
                <div className="text-[12px] text-[#CBCAC2] mt-0.5">
                  Deliberate, informed trading decisions over impulsive clicks.
                </div>
              </div>
            </div>

            {/* Subtle floating assurance pill */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[16px] p-3.5 shadow-md items-center gap-3">
              <div className="w-8 h-8 rounded-[10px] bg-[#E9FAF1] text-[#087A4A] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#171A17]">Transparent Pricing</div>
                <div className="text-[#6B6B63]">Zero hidden surcharges</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Short Product Observations (Non-Card Typography Rows) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-8 divide-y divide-[#E2E1DA]">
              {observations.map((item, idx) => (
                <div key={idx} className={idx === 0 ? '' : 'pt-7'}>
                  <div className="text-xs font-bold text-[#087A4A] uppercase tracking-wider mb-2">
                    {item.kicker}
                  </div>
                  <h3 className="text-[20px] sm:text-[23px] font-bold text-[#171A17] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#5A5A53] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Quiet Link to Full Story */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  setCurrentView('how-it-works');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-[15px] font-bold text-[#087A4A] hover:text-[#065A36] cursor-pointer"
              >
                <span>Follow the journey from discovery to settlement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
