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
      title: 'Deposit Initiated',
      desc: 'You specify an amount (e.g. ₹5,000) and authorize settlement via UPI QR, bank intent, or Net Banking.',
      badge: 'Zero platform fee',
    },
    {
      num: '02',
      title: 'Gateway Clearing',
      desc: 'The payment gateway settles funds into the platform clearing escrow with immediate reference confirmation.',
      badge: 'Instant IMPS/UPI clearing',
    },
    {
      num: '03',
      title: 'Wallet Credit & Ledger',
      desc: 'Your internal trading wallet available balance is credited, and an immutable ledger credit entry is permanently logged.',
      badge: 'Running balance verified',
    },
    {
      num: '04',
      title: 'Instant Execution Ready',
      desc: 'Funds are immediately liquid to purchase products or structured options without waiting days for clearing.',
      badge: '100% available liquidity',
    },
  ];

  return (
    <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Settlement Rails & Ledger
          </div>
          <h1 className="text-[34px] sm:text-[48px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.08]">
            Move money. Know what happened.
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            Straightforward deposit workflows, transparent wallet balances, and a clean transaction ledger that records every rupee with an updated running balance.
          </p>
        </div>

        {/* 3 Metric Balance Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 space-y-3">
            <span className="text-xs font-semibold text-[#848E9C] uppercase tracking-wider block font-mono">
              Available Cash Balance
            </span>
            <div className="text-[30px] font-extrabold text-[#F5F5F5] tabular-nums font-mono">
              {formatINR(wallet.availableBalance)}
            </div>
            <p className="text-xs text-[#848E9C] leading-relaxed">
              Liquid funds ready for instantaneous order execution or direct bank withdrawal.
            </p>
            <div className="pt-3 border-t border-[#2B3139]">
              <button
                onClick={() => setIsAddFundsOpen(true)}
                className="text-xs font-bold text-[#F0B90B] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Add funds via UPI →</span>
              </button>
            </div>
          </div>

          <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 space-y-3">
            <span className="text-xs font-semibold text-[#848E9C] uppercase tracking-wider block font-mono">
              Total Portfolio Equity
            </span>
            <div className="text-[30px] font-extrabold text-[#F0B90B] tabular-nums font-mono">
              {formatINR(wallet.totalValue)}
            </div>
            <p className="text-xs text-[#848E9C] leading-relaxed">
              Marked-to-market valuation across all active product unit holdings and cash.
            </p>
            <div className="pt-3 border-t border-[#2B3139]">
              <button
                onClick={() => setCurrentView('app-portfolio')}
                className="text-xs font-bold text-[#F0B90B] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View holdings breakdown →</span>
              </button>
            </div>
          </div>

          <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 space-y-3">
            <span className="text-xs font-semibold text-[#848E9C] uppercase tracking-wider block font-mono">
              Ledger Trace Status
            </span>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0ECB81]" />
              <span className="text-[22px] font-bold text-[#F5F5F5]">Reconciled</span>
            </div>
            <p className="text-xs text-[#848E9C] leading-relaxed">
              Every transaction maps to an itemized record with an updated running balance.
            </p>
            <div className="pt-3 border-t border-[#2B3139]">
              <button
                onClick={() => setCurrentView('app-ledger')}
                className="text-xs font-bold text-[#F0B90B] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Audit full ledger →</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Stage Payment Lifecycle */}
        <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 sm:p-8 shadow-sm mb-12 space-y-6">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-[20px] font-bold text-[#F5F5F5]">
              The Complete Deposit & Settlement Lifecycle
            </h2>
            <p className="text-xs text-[#848E9C]">
              How your money travels from your bank account into your trading wallet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lifecycleStages.map((stage) => (
              <div key={stage.num} className="p-4 bg-[#111418] rounded-[8px] border border-[#2B3139] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F0B90B] font-mono">{stage.num}</span>
                  <span className="text-[10px] text-[#0ECB81] font-mono bg-[#102A22] px-1.5 py-0.5 rounded-[4px]">{stage.badge}</span>
                </div>
                <h3 className="font-bold text-[15px] text-[#F5F5F5]">{stage.title}</h3>
                <p className="text-xs text-[#848E9C] leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Double-Entry Principles Grid */}
        <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 sm:p-8 shadow-sm">
          <div className="max-w-2xl mb-6 space-y-1">
            <h2 className="text-[20px] font-bold text-[#F5F5F5]">
              Double-Entry Accounting Architecture
            </h2>
            <p className="text-xs text-[#848E9C]">
              In strict compliance with financial accounting standards, every transaction affects exactly two accounts: a debit and a credit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#111418] rounded-[8px] border border-[#2B3139] space-y-2.5">
              <div className="font-bold text-[14px] text-[#F5F5F5]">When Buying a Product</div>
              <ul className="text-xs text-[#848E9C] space-y-2">
                <li><strong className="text-[#0ECB81]">Debit:</strong> Product Holding Account (Increases asset quantity)</li>
                <li><strong className="text-[#F6465D]">Credit:</strong> Wallet Cash Balance (Decreases cash by exact order cost)</li>
                <li>Unique order reference key permanently bound to the running balance.</li>
              </ul>
            </div>

            <div className="p-4 bg-[#111418] rounded-[8px] border border-[#2B3139] space-y-2.5">
              <div className="font-bold text-[14px] text-[#F5F5F5]">When Depositing via UPI</div>
              <ul className="text-xs text-[#848E9C] space-y-2">
                <li><strong className="text-[#0ECB81]">Debit:</strong> Platform Gateway Clearing Escrow</li>
                <li><strong className="text-[#F0B90B]">Credit:</strong> User Available Trading Cash</li>
                <li>Bank payment reference hash attached for institutional cross-verification.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
