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
  Lock,
  Layers,
  FileCheck,
} from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const { wallet, transactions, setIsAddFundsOpen, setIsWithdrawOpen, setCurrentView } = useTrading();

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
            Financial Rails
          </span>
          <h1 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight mt-3">
            Payments & Immutable Ledger
          </h1>
          <p className="mt-3 text-[17px] text-[#5A5A53]">
            Tradeon is engineered with institutional financial integrity. Real-time payment gateway settlement, transparent internal wallet balances, and a mathematical double-entry transaction ledger.
          </p>
        </div>

        {/* 3 Overview Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B63] block">
              Available Cash Balance
            </span>
            <div className="text-[28px] font-extrabold text-[#171A17] tabular-nums mt-1">
              {formatINR(wallet.availableBalance)}
            </div>
            <p className="text-[12px] text-[#5A5A53] mt-2">
              Liquid funds ready for instantaneous order execution or bank withdrawal.
            </p>
            <div className="mt-4 pt-3 border-t border-[#EFEEE9]">
              <button
                onClick={() => setIsAddFundsOpen(true)}
                className="text-[12px] font-bold text-[#087A4A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Add Cash via UPI →</span>
              </button>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B63] block">
              Allocated Product Equity
            </span>
            <div className="text-[28px] font-extrabold text-[#087A4A] tabular-nums mt-1">
              {formatINR(wallet.totalValue - wallet.availableBalance)}
            </div>
            <p className="text-[12px] text-[#5A5A53] mt-2">
              Marked-to-market valuation across all active product positions.
            </p>
            <div className="mt-4 pt-3 border-t border-[#EFEEE9]">
              <button
                onClick={() => setCurrentView('app-portfolio')}
                className="text-[12px] font-bold text-[#087A4A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Asset Breakdown →</span>
              </button>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B63] block">
              Ledger Health Status
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-[#12A560]" />
              <span className="text-[20px] font-bold text-[#171A17]">100% Balanced</span>
            </div>
            <p className="text-[12px] text-[#5A5A53] mt-2">
              Zero variance between debit allocations, credits, and gateway confirmations.
            </p>
            <div className="mt-4 pt-3 border-t border-[#EFEEE9]">
              <button
                onClick={() => setCurrentView('app-ledger')}
                className="text-[12px] font-bold text-[#087A4A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Audit Full Ledger →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Double-Entry Principles Grid */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-8 shadow-xs mb-12">
          <h2 className="text-[22px] font-bold text-[#171A17] mb-4">
            Double-Entry Accounting Architecture
          </h2>
          <p className="text-[15px] text-[#5A5A53] max-w-3xl leading-relaxed mb-6">
            In compliance with standard financial accounting requirements, every transaction recorded on Tradeon affects exactly two entries: a debit and a credit. This mathematical constraint ensures that funds can never be created or destroyed erroneously.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-2">
              <div className="flex items-center gap-2 text-[#087A4A] font-bold text-[14px]">
                <FileCheck className="w-4 h-4 text-[#1FC777]" />
                <span>When Buying a Product:</span>
              </div>
              <ul className="text-[13px] text-[#5A5A53] space-y-1.5 pl-6 list-disc">
                <li>
                  <strong className="text-[#171A17]">Debit:</strong> Product Holding Account (Increases asset quantity)
                </li>
                <li>
                  <strong className="text-[#171A17]">Credit:</strong> Wallet Cash Balance (Decreases cash by exact order cost)
                </li>
                <li>Transaction reference recorded with immutable timestamp and price quote.</li>
              </ul>
            </div>

            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-2">
              <div className="flex items-center gap-2 text-[#087A4A] font-bold text-[14px]">
                <FileCheck className="w-4 h-4 text-[#1FC777]" />
                <span>When Depositing Funds (UPI / Net Banking):</span>
              </div>
              <ul className="text-[13px] text-[#5A5A53] space-y-1.5 pl-6 list-disc">
                <li>
                  <strong className="text-[#171A17]">Debit:</strong> Platform Gateway Clearing Account
                </li>
                <li>
                  <strong className="text-[#171A17]">Credit:</strong> User Available Trading Balance
                </li>
                <li>Bank payment reference ID attached for cross-institution verification.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
