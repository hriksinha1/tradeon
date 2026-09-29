import React from 'react';
import { useTrading } from '../../context/TradingContext';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Laptop,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const { setCurrentView } = useTrading();

  const securityPillars = [
    {
      icon: <KeyRound className="w-5 h-5 text-[#1FC777]" />,
      title: 'Two-Factor Authentication (2FA)',
      desc: 'Mandatory secondary verification for sensitive actions including fund withdrawals, password updates, and session authorizations.',
    },
    {
      icon: <Laptop className="w-5 h-5 text-[#1FC777]" />,
      title: 'Active Session Awareness',
      desc: 'Complete real-time visibility into all active web and mobile device sessions with one-tap remote revocation for any unrecognized device.',
    },
    {
      icon: <Lock className="w-5 h-5 text-[#1FC777]" />,
      title: 'Transport Encryption & Storage Isolation',
      desc: 'All communications between client devices and servers use standard TLS 1.3 encryption with strict database token isolation.',
    },
    {
      icon: <FileCheck className="w-5 h-5 text-[#1FC777]" />,
      title: 'Auditable Ledger Records',
      desc: 'Every financial state change is logged in a double-entry accounting structure with mathematical verification of running balances.',
    },
  ];

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Security & Controls
          </div>
          <h1 className="text-[38px] sm:text-[54px] font-extrabold text-[#171A17] tracking-tight leading-[1.08]">
            Confidence comes from visibility.
          </h1>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            Security isn’t a marketing badge. It belongs in the foundation: clear session boundaries, multi-factor account locks, and complete audit readiness across web, iOS, and Android.
          </p>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {securityPillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-7 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-[12px] bg-[#E9FAF1] flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-[19px] font-bold text-[#171A17]">{p.title}</h3>
              <p className="text-[14px] text-[#5A5A53] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Responsible Engineering Commitment */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] p-8 sm:p-10 shadow-xs space-y-4">
          <h2 className="text-[22px] font-bold text-[#171A17]">
            Responsible Platform Principles
          </h2>
          <p className="text-[15px] text-[#5A5A53] leading-relaxed max-w-3xl">
            This prototype is designed to reflect real-world operational security patterns. User credentials, authentication tokens, and transaction ledgers are decoupled from presentation components. When deployed to production, custodial funds are held in segregated banking clearing pools with full double-entry reconciliation.
          </p>

          <div className="pt-4 border-t border-[#EFEEE9] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#087A4A]">
              <CheckCircle2 className="w-4 h-4 text-[#12A560]" />
              <span>Full audit trail ready</span>
            </div>
            <button
              onClick={() => {
                setCurrentView('app-profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#EFEEE9] hover:bg-[#E2E1DA] text-[#171A17] font-semibold text-xs rounded-[8px] transition-colors cursor-pointer"
            >
              Manage security in terminal →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
