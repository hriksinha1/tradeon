import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

export const MarketingFaqSection: React.FC = () => {
  const { setCurrentView } = useTrading();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What can I trade on Tradeon?',
      a: 'You can discover and trade products listed directly on the marketplace. The platform uses a neutral product architecture built for units, allocations, and tradeable product contracts with defined settlement parameters.',
    },
    {
      q: 'How does product discovery work?',
      a: 'Browse the product catalog with transparent indicative valuations, 24-hour activity trends, and available unit supply limits. Every listing shows context before you act, so you never have to guess what you are looking at.',
    },
    {
      q: 'How do I buy or sell?',
      a: 'Choose your desired product, specify your quantity of units, and review the exact cost and fee breakdown on a structured order slip. Once you confirm, the order executes against your wallet balance and immediately generates a transparent ledger receipt.',
    },
    {
      q: 'What are structured options contracts?',
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
      a: 'Yes. Tradeon has been designed for high-density mobile interfaces with full terminal capability, responsive depth books, and instant order routing.',
    },
    {
      q: 'How is account security enforced?',
      a: 'Active session management, biometric authentication support, 2FA authorization for sensitive withdrawals, and cryptographic ledger verification safeguard your funds and orders.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0E11] text-[#F5F5F5] border-b border-[#2B3139]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Knowledge Base
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.12]">
            Straightforward answers.
          </h2>
          <p className="text-[16px] text-[#848E9C]">
            Common questions regarding marketplace listings, order execution, and platform availability.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#161A1E] border border-[#2B3139] rounded-[8px] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#1E2329]/50 transition-colors"
                >
                  <span className="text-[16px] font-bold text-[#F5F5F5] leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#F0B90B] text-[#181A20]' : 'bg-[#1E2329] text-[#848E9C]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[14px] text-[#848E9C] leading-relaxed border-t border-[#2B3139] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Link */}
        <div className="mt-12 text-center text-xs text-[#848E9C]">
          <span>Have a question not covered here? </span>
          <button
            onClick={() => {
              setCurrentView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-[#F0B90B] hover:underline cursor-pointer"
          >
            Talk to our support team →
          </button>
        </div>
      </div>
    </section>
  );
};
