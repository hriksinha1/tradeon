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
      icon: <KeyRound className="w-5 h-5 text-[#F0B90B]" />,
      title: 'Two-Factor Authentication (2FA)',
      desc: 'Mandatory secondary verification for sensitive actions including fund withdrawals, password updates, and session authorizations.',
    },
    {
      icon: <Laptop className="w-5 h-5 text-[#F0B90B]" />,
      title: 'Active Session Awareness',
      desc: 'Complete real-time visibility into all active web and mobile device sessions with one-tap remote revocation for any unrecognized device.',
    },
    {
      icon: <Lock className="w-5 h-5 text-[#F0B90B]" />,
      title: 'Transport Encryption & Isolation',
      desc: 'All communications between client devices and servers use standard TLS 1.3 encryption with strict database token isolation.',
    },
    {
      icon: <FileCheck className="w-5 h-5 text-[#F0B90B]" />,
      title: 'Auditable Ledger Records',
      desc: 'Every financial state change is logged in a double-entry accounting structure with mathematical verification of running balances.',
    },
  ];

  return (
    <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Security & Controls
          </div>
          <h1 className="text-[34px] sm:text-[48px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.08]">
            Confidence comes from visibility.
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            Security isn’t a marketing badge. It belongs in the foundation: clear session boundaries, multi-factor account locks, and complete audit readiness across web, iOS, and Android.
          </p>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {securityPillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#161A1E] border border-[#2B3139] hover:border-[#363C45] rounded-[10px] p-6 space-y-3 transition-all shadow-sm"
            >
              <div className="w-10 h-10 rounded-[8px] bg-[#1E2329] border border-[#2B3139] flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-[18px] font-bold text-[#F5F5F5]">{p.title}</h3>
              <p className="text-[14px] text-[#848E9C] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Responsible Engineering Commitment */}
        <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-[20px] font-bold text-[#F5F5F5]">
            Responsible Platform Principles
          </h2>
          <p className="text-[14px] text-[#848E9C] leading-relaxed max-w-3xl">
            This platform is designed to reflect real-world operational security patterns. User credentials, authentication tokens, and transaction ledgers are decoupled from presentation components. When deployed to production, custodial funds are held in segregated banking clearing pools with full double-entry reconciliation.
          </p>

          <div className="pt-4 border-t border-[#2B3139] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0ECB81]">
              <CheckCircle2 className="w-4 h-4 text-[#0ECB81]" />
              <span>Full cryptographic audit trail active</span>
            </div>
            <button
              onClick={() => {
                setCurrentView('app-profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#1E2329] hover:bg-[#23282F] text-[#F5F5F5] hover:text-[#F0B90B] font-semibold text-xs rounded-[6px] border border-[#2B3139] transition-colors cursor-pointer"
            >
              Manage Security in Terminal →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
