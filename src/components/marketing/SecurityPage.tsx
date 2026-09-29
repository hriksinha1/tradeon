import React from 'react';
import { useTrading } from '../../context/TradingContext';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Laptop,
  CheckCircle2,
  FileCheck,
  Server,
  AlertCircle,
} from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const { setCurrentView } = useTrading();

  const securityPillars = [
    {
      icon: <KeyRound className="w-6 h-6 text-[#1FC777]" />,
      title: 'Two-Factor Authentication (2FA)',
      desc: 'Mandatory multi-factor verification for sensitive operations including withdrawals, API key generation, and password resets.',
    },
    {
      icon: <Laptop className="w-6 h-6 text-[#1FC777]" />,
      title: 'Active Session Authorization',
      desc: 'Real-time visibility into signed-in devices, IP geolocation, and instant remote revocation of any compromised session.',
    },
    {
      icon: <Lock className="w-6 h-6 text-[#1FC777]" />,
      title: 'End-to-End Encryption',
      desc: 'All communications between client devices (Web, iOS, Android) and backend servers are secured via TLS 1.3 with AES-256 at rest.',
    },
    {
      icon: <Server className="w-6 h-6 text-[#1FC777]" />,
      title: 'Segregated Data Architecture',
      desc: 'Decoupled Appwrite services strictly separate user identity from ledger balances and transaction history to guarantee confidentiality.',
    },
  ];

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
            Enterprise Trust
          </span>
          <h1 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight mt-3">
            Security & Compliance Architecture
          </h1>
          <p className="mt-3 text-[17px] text-[#5A5A53]">
            Protecting client assets, personal identifiers, and financial records with institutional security standards across Web, iOS, and Android platforms.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {securityPillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-xs space-y-3"
            >
              <div className="w-12 h-12 rounded-[14px] bg-[#E9FAF1] border border-[#A2E8C5] flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-[19px] font-bold text-[#171A17]">{p.title}</h3>
              <p className="text-[14px] text-[#5A5A53] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Custody & Audit Guarantee Card */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-7 h-7 text-[#12A560]" />
            <h2 className="text-[22px] font-bold text-[#171A17]">
              Custody & Asset Protection Protocol
            </h2>
          </div>
          <p className="text-[15px] text-[#5A5A53] leading-relaxed max-w-3xl">
            User funds are held in segregated banking escrow pools separate from operational company expenses. Automated reconciliation checks run continuously to ensure that every rupee logged on user ledger balances corresponds with audited banking reserves.
          </p>

          <div className="mt-6 pt-6 border-t border-[#EFEEE9] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[13px] text-[#087A4A] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#12A560]" />
              <span>Full Audit Trail Ready</span>
            </div>
            <button
              onClick={() => {
                setCurrentView('app-profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#EFEEE9] hover:bg-[#E2E1DA] text-[#171A17] font-semibold text-[13px] rounded-[10px] transition-colors cursor-pointer"
            >
              Manage Security Settings in App →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
