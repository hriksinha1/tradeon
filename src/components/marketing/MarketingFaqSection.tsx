import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

export const MarketingFaqSection: React.FC = () => {
  const { setCurrentView } = useTrading();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What can users trade on Tradeon?',
      a: 'Users can interact with products listed and supplied directly by the platform owner’s business. Built with a neutral product architecture, the platform easily accommodates inventory allocations, ownership units, digital product rights, or proprietary contracts once commercial operations launch.',
    },
    {
      q: 'Will the exact product category change later?',
      a: 'Yes. The underlying traded asset is intentionally confidential during this prototype phase. The design, order slips, wallet calculations, and double-entry ledger are engineered as a flexible foundation that maps cleanly to the client’s real business model.',
    },
    {
      q: 'How does the Buy and Sell process operate?',
      a: 'You can execute instant Market orders matched directly against business inventory or place Limit orders specifying your exact target price. Orders settle directly against your internal wallet cash balance with zero guesswork.',
    },
    {
      q: 'What are option contracts in Tradeon?',
      a: 'Tradeon supports structured Call and Put options for users who want predefined risk parameters. Each contract features a fixed strike price, defined expiry cycle, and an upfront premium calculation. Upon expiry, in-the-money contracts settle directly to cash.',
    },
    {
      q: 'How are transaction charges and platform fees presented?',
      a: 'Every platform fee is calculated and shown on the order review slip before you confirm. We charge zero hidden processing fees, and every deduction is permanently logged in your double-entry transaction history.',
    },
    {
      q: 'What appears in my transaction ledger?',
      a: 'Every event: wallet top-ups, order deductions, unit sales, fees, and option settlements. Each entry includes the exact timestamp, transaction type, counterparty reference, debit/credit split, and your resulting running balance.',
    },
    {
      q: 'Is the platform available on mobile devices?',
      a: 'Yes. Tradeon is built for Web (1440px desktop baseline), Apple iOS 18 (with Dynamic Island live activity integration), and Google Android 15. You can test each device simulator directly on this website.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F7F6F2] border-b border-[#CBCAC2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Clarity First
          </div>
          <h2 className="text-[36px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            Straightforward answers.
          </h2>
          <p className="text-[17px] text-[#5A5A53]">
            Common questions regarding marketplace listings, double-entry settlement, and multi-platform availability.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[18px] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F6F2]/60 transition-colors"
                >
                  <span className="text-[17px] font-bold text-[#171A17]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#1FC777] text-[#0C0F0C]' : 'bg-[#EFEEE9] text-[#6B6B63]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-[15px] text-[#5A5A53] leading-relaxed border-t border-[#EFEEE9]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quiet Contact Row */}
        <div className="mt-14 p-6 bg-white border border-[#CBCAC2] rounded-[20px] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-[16px] font-bold text-[#171A17]">Have a specialized question?</h4>
            <p className="text-xs text-[#5A5A53] mt-0.5">
              Our engineering team can discuss order matching mechanics, custody, and settlement rails.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-[#EFEEE9] hover:bg-[#E2E1DA] text-[#171A17] font-bold rounded-[10px] text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <span>Talk to product team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
