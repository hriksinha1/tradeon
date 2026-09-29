import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  Wallet,
  Receipt,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Lock,
  ArrowRight,
  CreditCard,
  Building,
  Smartphone,
} from 'lucide-react';

export const PaymentsAndLedgerSection: React.FC = () => {
  const { wallet, transactions, setIsAddFundsOpen, setIsWithdrawOpen, setCurrentView } = useTrading();
  const [selectedTxn, setSelectedTxn] = useState<number>(0);

  const previewTransactions = transactions.slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-[#171A17] text-[#FFFFFF] border-b border-[#2A2A26] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="text-xs font-semibold text-[#1FC777] tracking-wider uppercase">
            Financial Transparency
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold text-white tracking-tight leading-[1.12]">
            When you need to know where every rupee went.
          </h2>
          <p className="text-[18px] text-[#A3A29A] leading-relaxed">
            No mystery balances. No delayed reconciliation. Every unit trade, top-up, and withdrawal is tracked through an immutable double-entry ledger with visible running totals.
          </p>
        </div>

        {/* 2-Column High-Contrast Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Internal Wallet & Payment Gateway Rails */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#2A2A26] border border-[#40403B] rounded-[24px] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#A3A29A] uppercase tracking-wider">
                  Internal Wallet
                </span>
                <span className="text-xs font-bold text-[#1FC777] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1FC777]" />
                  <span>Real-time reconciled</span>
                </span>
              </div>

              <div>
                <span className="text-xs text-[#A3A29A]">Total liquid & allocated value</span>
                <div className="text-[36px] sm:text-[42px] font-extrabold text-white tabular-nums mt-1">
                  {formatINR(wallet.totalValue)}
                </div>
              </div>

              {/* Balance Split */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#40403B]">
                <div className="p-4 bg-[#171A17] rounded-[14px] border border-[#2A2A26]">
                  <span className="text-xs text-[#A3A29A] block">Available cash</span>
                  <span className="text-[20px] font-bold text-white tabular-nums block mt-0.5">
                    {formatINR(wallet.availableBalance)}
                  </span>
                </div>

                <div className="p-4 bg-[#171A17] rounded-[14px] border border-[#2A2A26]">
                  <span className="text-xs text-[#A3A29A] block">In active products</span>
                  <span className="text-[20px] font-bold text-[#1FC777] tabular-nums block mt-0.5">
                    {formatINR(wallet.totalValue - wallet.availableBalance)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setIsAddFundsOpen(true)}
                  className="flex items-center justify-center gap-1.5 cursor-pointer shadow-xs font-bold"
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Add funds (UPI)</span>
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setIsWithdrawOpen(true)}
                  className="flex items-center justify-center gap-1.5 cursor-pointer text-white border-[#5A5A53] hover:bg-[#40403B]"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Withdraw</span>
                </Button>
              </div>
            </div>

            {/* Supported Payment Rails */}
            <div className="p-6 bg-[#2A2A26] border border-[#40403B] rounded-[20px] space-y-3">
              <span className="text-xs font-semibold text-[#A3A29A] uppercase tracking-wider block">
                Instant Gateway Rails
              </span>
              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="p-3 bg-[#171A17] rounded-[12px] border border-[#2A2A26]">
                  <Smartphone className="w-4 h-4 text-[#1FC777] mx-auto mb-1" />
                  <span className="font-bold text-white block">UPI / QR</span>
                  <span className="text-[10px] text-[#A3A29A]">Instant</span>
                </div>
                <div className="p-3 bg-[#171A17] rounded-[12px] border border-[#2A2A26]">
                  <Building className="w-4 h-4 text-[#1FC777] mx-auto mb-1" />
                  <span className="font-bold text-white block">Net Banking</span>
                  <span className="text-[10px] text-[#A3A29A]">Direct debit</span>
                </div>
                <div className="p-3 bg-[#171A17] rounded-[12px] border border-[#2A2A26]">
                  <CreditCard className="w-4 h-4 text-[#1FC777] mx-auto mb-1" />
                  <span className="font-bold text-white block">Cards / IMPS</span>
                  <span className="text-[10px] text-[#A3A29A]">Bank payout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Audited Double-Entry Ledger */}
          <div className="lg:col-span-7 bg-[#2A2A26] border border-[#40403B] rounded-[24px] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-5 border-b border-[#40403B]">
              <div>
                <h3 className="text-[20px] font-bold text-white">Live Ledger Trace</h3>
                <p className="text-xs text-[#A3A29A] mt-0.5">
                  Every debit matches a credit. Every record preserves the running balance.
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentView('app-ledger');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-[#1FC777] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full ledger view</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Transactions List */}
            <div className="space-y-3">
              {previewTransactions.map((tx, idx) => {
                const isCredit = tx.type === 'deposit' || tx.type === 'sell';
                return (
                  <div
                    key={tx.id}
                    onClick={() => setSelectedTxn(idx)}
                    className="p-4 bg-[#171A17] hover:bg-[#202320] border border-[#40403B] rounded-[16px] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] text-white">{tx.description}</span>
                        <span className="text-[11px] font-mono text-[#A3A29A]">{tx.id}</span>
                      </div>
                      <div className="text-[11px] text-[#A3A29A] mt-0.5">
                        {tx.date} at {tx.time} · {tx.reference}
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className={`font-bold text-[15px] tabular-nums ${isCredit ? 'text-[#1FC777]' : 'text-white'}`}>
                        {isCredit ? '+' : '-'}{formatINR(Math.abs(tx.amount))}
                      </div>
                      <div className="text-[11px] text-[#A3A29A] tabular-nums">
                        Balance after: {formatINR(tx.runningBalance)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Zero Variance Guarantee Banner */}
            <div className="p-4 bg-[#171A17] border border-[#40403B] rounded-[16px] flex items-center justify-between text-xs text-[#A3A29A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1FC777]" />
                <span>Double-entry mathematical integrity: Zero balance variance</span>
              </div>
              <span className="text-white font-mono font-semibold">100% Audit pass</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
