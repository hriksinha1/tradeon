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
    <section className="py-20 sm:py-28 bg-[#0B0E11] text-[#F5F5F5] border-b border-[#2B3139]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14 sm:mb-18 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Trust & Architecture
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.12]">
            Confidence comes from visibility, not vague promises.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            We don’t rely on buzzwords or exaggerated security claims. True confidence comes from clear interfaces, explicit confirmations, session awareness, and an audit trail that never hides what happened.
          </p>
        </div>

        {/* 4 Trust Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {trustPrinciples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-[10px] bg-[#161A1E] border border-[#2B3139] space-y-3.5 transition-all hover:border-[#363C45]"
              >
                <div className="w-10 h-10 rounded-[8px] bg-[#1E2329] border border-[#2B3139] text-[#F0B90B] flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-[18px] font-bold text-[#F5F5F5] tracking-tight">
                  {item.title}
                </h3>

                <p className="text-[14px] text-[#848E9C] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Honest Trust Disclosure Box */}
        <div className="mt-10 p-6 sm:p-7 rounded-[10px] bg-[#111418] border border-[#2B3139] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="text-sm font-bold text-[#F5F5F5] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0ECB81]" />
              <span>Platform Integrity Disclosure</span>
            </div>
            <p className="text-xs text-[#848E9C] leading-relaxed">
              Tradeon operates with real-time double-entry ledgers, cryptographic order hashing, and segregated internal balances to ensure absolute transparency across all listed products.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('security');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#F0B90B] hover:underline cursor-pointer whitespace-nowrap"
          >
            <span>Read full security architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
