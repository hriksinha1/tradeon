import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

export const MarketingFaqSection: React.FC = () => {
  const { setCurrentView } = useTrading();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What types of products or assets are traded on Tradeon?',
      a: 'The platform hosts business-listed and verified products, structured asset allocations, and unit rights supplied directly by the operator. Built with an institutional neutral abstraction layer, the platform effortlessly maps to physical goods, commodity quotas, digital rights, or proprietary contracts without requiring core code changes.',
    },
    {
      q: 'How does trading execution and price matching work?',
      a: 'Users can place instant Market Orders executed at live quotes or place Limit Orders specifying minimum acceptable prices. Settlement is reconciled immediately against the user’s internal wallet and double-entry transaction ledger.',
    },
    {
      q: 'How are option-style contracts structured?',
      a: 'Tradeon supports structured Call and Put option contracts featuring predetermined expiry cycles (weekly/monthly), defined strike values, and upfront premium calculations. This enables hedging and strategic exposure with clearly bounded risk parameters.',
    },
    {
      q: 'Which payment rails and withdrawal methods are supported?',
      a: 'The platform integrates with major payment gateways supporting instant UPI (Google Pay, PhonePe, Paytm), Net Banking across 50+ financial institutions, and credit/debit cards. Withdrawals are processed directly to verified bank accounts via IMPS/NEFT with double-entry confirmation.',
    },
    {
      q: 'Is the platform available on mobile devices?',
      a: 'Yes. Tradeon is engineered with 100% parity across Web (1440px desktop baseline), iOS (iPhone with Dynamic Island and native navigation ergonomics), and Android (Pixel with Material 3 fluidity). You can preview each device directly in this interactive simulator.',
    },
    {
      q: 'How does the Appwrite backend integration operate?',
      a: 'The frontend is decoupled from data persistence via clean service interfaces (authService, productService, orderService, walletService, ledgerService). Connecting to an Appwrite Cloud or self-hosted instance is straightforward by simply passing endpoint and project credentials into the service layer.',
    },
  ];

  return (
    <section className="py-20 bg-[#F7F6F2] border-b border-[#CBCAC2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E9FAF1] border border-[#A2E8C5] rounded-full text-[12px] font-bold text-[#087A4A] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#1FC777]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-[34px] sm:text-[44px] font-extrabold text-[#171A17] tracking-tight">
            Common questions answered.
          </h2>
          <p className="mt-2 text-[16px] text-[#5A5A53]">
            Essential details regarding marketplace trading mechanics, settlement integrity, and multi-platform architecture.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#FFFFFF] border border-[#E2E1DA] rounded-[16px] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F6F2]/50 transition-colors"
                >
                  <span className="text-[16px] sm:text-[17px] font-bold text-[#171A17]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#1FC777] text-[#0C0F0C]' : 'bg-[#EFEEE9] text-[#5A5A53]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[14px] sm:text-[15px] text-[#5A5A53] leading-relaxed border-t border-[#EFEEE9]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact help card */}
        <div className="mt-12 p-6 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[18px] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-[16px] font-bold text-[#171A17]">Have a specialized requirement?</h4>
            <p className="text-[13px] text-[#5A5A53] mt-0.5">
              Our engineering team can customize matching rules, settlement cycles, and gateway providers.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-[#1FC777] hover:bg-[#18B36A] text-[#0C0F0C] font-bold rounded-[10px] text-[13px] flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
          >
            <span>Contact Product Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
