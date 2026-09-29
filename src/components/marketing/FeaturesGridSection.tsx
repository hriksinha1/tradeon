import React from 'react';
import { useTrading } from '../../context/TradingContext';
import {
  ShieldCheck,
  Zap,
  BookOpenCheck,
  TrendingUp,
  Smartphone,
  Server,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const FeaturesGridSection: React.FC = () => {
  const { setCurrentView } = useTrading();

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-[#1FC777]" />,
      badge: 'Execution Speed',
      title: 'Real-time Market & Limit Trading',
      description:
        'Execute transactions at instantaneous market prices or place targeted limit orders. Transparent fee calculations ensure zero hidden deductions.',
      cta: 'Explore Trading Flows',
      view: 'how-it-works' as const,
    },
    {
      icon: <BookOpenCheck className="w-6 h-6 text-[#1FC777]" />,
      badge: 'Financial Integrity',
      title: 'Audited Double-Entry Ledger',
      description:
        'Every unit acquisition, sell order, deposit, and payout is logged with an immutable audit hash and running balance verification.',
      cta: 'Inspect Ledger Model',
      view: 'payments' as const,
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#1FC777]" />,
      badge: 'Advanced Contracts',
      title: 'Structured Options Trading',
      description:
        'Hedge or participate in defined price movements with Call and Put contracts featuring transparent strike prices, premiums, and automated expiry settlement.',
      cta: 'View Options Mechanics',
      view: 'options' as const,
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#1FC777]" />,
      badge: 'Unified UX',
      title: 'Web, iOS & Android Parity',
      description:
        'Engineered consistently across 1440px Desktop Web, iPhone 16 Pro (Dynamic Island & iOS haptics), and Android Pixel 9 Pro gesture interfaces.',
      cta: 'Test Device Simulator',
      view: 'mobile-app' as const,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#1FC777]" />,
      badge: 'Bank-Grade Custody',
      title: 'Secure Account & Asset Custody',
      description:
        'Two-factor authentication, device authorization, session management, and encrypted payment gateway rails protect investor capital.',
      cta: 'Review Security Controls',
      view: 'security' as const,
    },
    {
      icon: <Server className="w-6 h-6 text-[#1FC777]" />,
      badge: 'Modular Stack',
      title: 'Appwrite Enterprise Architecture',
      description:
        'Decoupled service layer ready for seamless Appwrite Cloud or self-hosted integration across Auth, Products, Orders, Wallets, and Ledger databases.',
      cta: 'View Architecture',
      view: 'about' as const,
    },
  ];

  return (
    <section className="py-20 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
            Platform Principles
          </span>
          <h2 className="text-[34px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight mt-3">
            Engineered for clarity, control, and scale.
          </h2>
          <p className="mt-3 text-[17px] text-[#5A5A53]">
            Every interaction is structured to provide institutional transparency without unnecessary complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#F7F6F2] hover:bg-[#FFFFFF] border border-[#E2E1DA] hover:border-[#1FC777] rounded-[20px] p-6 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[14px] bg-[#FFFFFF] border border-[#CBCAC2] group-hover:border-[#1FC777] flex items-center justify-center shadow-2xs transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-2.5 py-0.5 rounded-full border border-[#CFF3E0]">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-[19px] font-bold text-[#171A17] group-hover:text-[#087A4A] transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[14px] text-[#5A5A53] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E1DA]">
                <button
                  onClick={() => {
                    setCurrentView(feature.view);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#087A4A] group-hover:text-[#0A603C] hover:underline cursor-pointer"
                >
                  <span>{feature.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
