import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

export const MarketingFaqSection: React.FC = () => {
  const { setCurrentView } = useTrading();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What can I trade?',
      a: 'You can discover and trade products listed directly on the platform marketplace. The platform uses a neutral product architecture built for units, allocations, and tradeable product contracts. We do not trade stocks, Bitcoin, gold, or silver.',
    },
    {
      q: 'How does product discovery work?',
      a: 'Browse the product catalog with transparent indicative valuations, 24-hour activity trends, and available unit supply limits. Every listing shows context before you act, so you never have to guess what you are looking at.',
    },
    {
      q: 'How do I buy or sell?',
      a: 'Choose your desired product, specify your quantity of units, and review the exact cost and fee breakdown on an order slip. Once you confirm, the order executes against your wallet balance and immediately generates a transparent ledger receipt.',
    },
    {
      q: 'What are options?',
      a: 'Options-style contracts (Call and Put) provide bounded risk parameters for more structured strategies. A Call contract gives you defined upside exposure above a strike level, while a Put contract acts as downside protection. Risk is strictly capped at the upfront premium paid.',
    },
    {
      q: 'How does the wallet work?',
      a: 'Your internal trading wallet holds available cash for orders. You can deposit funds via UPI, bank transfer, or debit cards. Your wallet updates in real time whenever an order is placed, an option is acquired, or funds are withdrawn.',
    },
    {
      q: 'How are transactions recorded?',
      a: 'Every event—deposits, unit purchases, sales, and withdrawals—is recorded in a double-entry ledger. Each entry includes the exact timestamp, transaction type, reference code, debit or credit amount, and your resulting running balance.',
    },
    {
      q: 'Can I use the product on mobile?',
      a: 'Yes. Tradeon has been designed for native Apple iOS and Google Android mobile devices. You can also test the full interactive experience directly in the interactive simulator on this website.',
    },
    {
      q: 'When will the final product category be disclosed?',
      a: 'The underlying product category is intentionally confidential during this platform demonstration and preview phase. The user experience, order workflows, and accounting layers are fully functional and ready to map directly to the commercial category upon official launch.',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#F7F6F2] border-b border-[#CBCAC2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
          <div className="text-xs font-semibold text-[#005EA8] tracking-wider uppercase">
            Clarity First
          </div>
          <h2 className="text-[34px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            Straightforward answers.
          </h2>
          <p className="text-[17px] text-[#5A5A53]">
            Common questions regarding marketplace listings, order execution, and platform availability.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[16px] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-[17px] font-bold text-[#171A17] leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#0070BA] text-[#0C0F0C]' : 'bg-[#EFEEE9] text-[#6B6B63]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[15px] text-[#5A5A53] leading-relaxed border-t border-[#EFEEE9] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Link */}
        <div className="mt-12 text-center text-sm text-[#5A5A53]">
          <span>Have a question not covered here? </span>
          <button
            onClick={() => {
              setCurrentView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-[#005EA8] hover:underline cursor-pointer"
          >
            Talk to our team →
          </button>
        </div>
      </div>
    </section>
  );
};
