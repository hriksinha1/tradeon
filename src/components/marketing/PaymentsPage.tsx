import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  Wallet,
  Receipt,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Smartphone,
  Building,
  CreditCard,
} from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const { wallet, transactions, setIsAddFundsOpen, setIsWithdrawOpen, setCurrentView } = useTrading();

  const lifecycleStages = [
    {
      num: '01',
      title: 'Deposit initiated',
      desc: 'You choose an amount (e.g. ₹5,000) and authorize payment via UPI QR, bank intent, or Net Banking.',
      badge: 'Zero platform fee',
    },
    {
      num: '02',
      title: 'Gateway clearing',
      desc: 'The payment gateway settles the funds into the platform clearing escrow with immediate reference confirmation.',
      badge: 'Instant IMPS/UPI clearing',
    },
    {
      num: '03',
      title: 'Wallet credit & double-entry',
      desc: 'Your internal trading wallet available balance is credited, and an immutable ledger credit entry is permanently logged.',
      badge: 'Running balance verified',
    },
    {
      num: '04',
      title: 'Available for instant order execution',
      desc: 'Funds are immediately liquid to purchase products or structured options without waiting days for clearing.',
      badge: '100% available liquidity',
    },
  ];

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Payment Rails & Wallet
          </div>
          <h1 className="text-[38px] sm:text-[54px] font-extrabold text-[#171A17] tracking-tight leading-[1.08]">
            Move money. Know what happened.
          </h1>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            Straightforward deposit workflows, transparent wallet balances, and a clean transaction ledger that records every rupee with an updated running balance.
          </p>
        </div>

        {/* 3 Metric Balance Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs space-y-3">
            <span className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider block">
              Available Cash Balance
            </span>
            <div className="text-[32px] font-extrabold text-[#171A17] tabular-nums">
              {formatINR(wallet.availableBalance)}
            </div>
            <p className="text-xs text-[#5A5A53]">
              Liquid funds ready for instantaneous order execution or direct bank withdrawal.
            </p>
            <div className="pt-3 border-t border-[#EFEEE9]">
              <button
                onClick={() => setIsAddFundsOpen(true)}
                className="text-xs font-bold text-[#087A4A] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Add funds via UPI →</span>
              </button>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs space-y-3">
            <span className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider block">
              Allocated Product Equity
            </span>
            <div className="text-[32px] font-extrabold text-[#087A4A] tabular-nums">
              {formatINR(wallet.totalValue - wallet.availableBalance)}
            </div>
            <p className="text-xs text-[#5A5A53]">
              Marked-to-market valuation across all active product unit holdings.
            </p>
            <div className="pt-3 border-t border-[#EFEEE9]">
              <button
                onClick={() => setCurrentView('app-portfolio')}
                className="text-xs font-bold text-[#087A4A] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View holdings breakdown →</span>
              </button>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs space-y-3">
            <span className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider block">
              Ledger Trace Status
            </span>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12A560]" />
              <span className="text-[24px] font-bold text-[#171A17]">Reconciled</span>
            </div>
            <p className="text-xs text-[#5A5A53]">
              Every transaction maps to an itemized record with an updated running balance.
            </p>
            <div className="pt-3 border-t border-[#EFEEE9]">
              <button
                onClick={() => setCurrentView('app-ledger')}
                className="text-xs font-bold text-[#087A4A] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Audit full ledger →</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Stage Payment Lifecycle Walkthrough */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] p-8 shadow-xs mb-14 space-y-8">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-[22px] font-bold text-[#171A17]">
              The Complete Deposit & Settlement Lifecycle
            </h2>
            <p className="text-xs text-[#5A5A53]">
              How your money travels from your bank account into your trading wallet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifecycleStages.map((stage) => (
              <div key={stage.num} className="p-5 bg-[#F7F6F2] rounded-[18px] border border-[#E2E1DA] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#087A4A]">{stage.num}</span>
                  <span className="text-[#6B6B63]">{stage.badge}</span>
                </div>
                <h3 className="font-bold text-[16px] text-[#171A17]">{stage.title}</h3>
                <p className="text-xs text-[#5A5A53] leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Double-Entry Principles Grid */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] p-8 shadow-xs">
          <div className="max-w-2xl mb-6 space-y-1">
            <h2 className="text-[22px] font-bold text-[#171A17]">
              Double-Entry Accounting Architecture
            </h2>
            <p className="text-xs text-[#5A5A53]">
              In strict compliance with financial accounting standards, every transaction affects exactly two accounts: a debit and a credit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-3">
              <div className="font-bold text-[15px] text-[#171A17]">When Buying a Product</div>
              <ul className="text-xs text-[#5A5A53] space-y-2">
                <li><strong className="text-[#171A17]">Debit:</strong> Product Holding Account (Increases asset quantity)</li>
                <li><strong className="text-[#171A17]">Credit:</strong> Wallet Cash Balance (Decreases cash by exact order cost)</li>
                <li>Unique order reference key permanently bound to the running balance.</li>
              </ul>
            </div>

            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-3">
              <div className="font-bold text-[15px] text-[#171A17]">When Depositing via UPI</div>
              <ul className="text-xs text-[#5A5A53] space-y-2">
                <li><strong className="text-[#171A17]">Debit:</strong> Platform Gateway Clearing Escrow</li>
                <li><strong className="text-[#171A17]">Credit:</strong> User Available Trading Cash</li>
                <li>Bank payment reference hash attached for institutional cross-verification.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
