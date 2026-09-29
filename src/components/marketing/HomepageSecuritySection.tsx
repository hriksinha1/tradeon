import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ShieldCheck, Eye, Lock, Smartphone, RefreshCw, ArrowRight } from 'lucide-react';

export const HomepageSecuritySection: React.FC = () => {
  const { setCurrentView } = useTrading();

  const trustPrinciples = [
    {
      icon: Eye,
      title: 'Visible confirmation before you commit',
      description:
        'No order is ever placed invisibly. You review exact unit quantities, unit prices, and net debits on a structured slip before any funds leave your wallet.',
    },
    {
      icon: Lock,
      title: 'Protected account & session awareness',
      description:
        'Know which devices have active sessions. Revoke unfamiliar access immediately, with password and passkey verification on sensitive operations.',
    },
    {
      icon: RefreshCw,
      title: 'Double-entry running balance trail',
      description:
        'Every transaction updates your wallet balance with a corresponding ledger entry and sequential reference. You can reconcile every rupee anytime.',
    },
    {
      icon: Smartphone,
      title: 'Platform-level biometric support',
      description:
        'Native Apple Face ID / Touch ID and Android Biometric Prompt are supported on our mobile apps so your orders are authorized by you alone.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14 sm:mb-18 space-y-4">
          <div className="text-xs font-semibold text-[#005EA8] tracking-wider uppercase">
            Trust & Control
          </div>
          <h2 className="text-[34px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            Confidence comes from visibility, not vague promises.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-[#5A5A53] leading-relaxed">
            We don’t rely on buzzwords or exaggerated security claims. True confidence comes from clear interfaces, explicit confirmations, session awareness, and an audit trail that never hides what happened.
          </p>
        </div>

        {/* 4 Trust Principles in an Asymmetric 2x2 Clean Layout (No generic AI cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {trustPrinciples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-[20px] bg-[#F7F6F2] border border-[#CBCAC2] space-y-4 transition-all hover:border-[#0070BA]"
              >
                <div className="w-10 h-10 rounded-[12px] bg-[#FFFFFF] border border-[#E2E1DA] text-[#005EA8] flex items-center justify-center font-bold shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-[20px] font-bold text-[#171A17] tracking-tight">
                  {item.title}
                </h3>

                <p className="text-[15px] text-[#5A5A53] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Honest Trust Disclosure Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-[20px] bg-[#F7F6F2] border border-[#E2E1DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="text-sm font-bold text-[#171A17]">
              Our Honest Disclosure Policy
            </div>
            <p className="text-xs text-[#5A5A53] leading-relaxed">
              Tradeon operates as an interactive digital marketplace prototype. All product quotes, unit counts, and order executions presented on this preview are illustrative simulations designed to demonstrate platform ergonomics and double-entry accounting.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('security');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#005EA8] hover:underline cursor-pointer whitespace-nowrap"
          >
            <span>Read full security architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
