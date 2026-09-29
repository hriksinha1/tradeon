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
  ArrowRight,
  CreditCard,
  Building,
  Smartphone,
  Clock,
} from 'lucide-react';

export const PaymentsAndLedgerSection: React.FC = () => {
  const { wallet, transactions, setIsAddFundsOpen, setIsWithdrawOpen, setCurrentView } = useTrading();
  const [activePaymentStep, setActivePaymentStep] = useState(0);

  const previewTransactions = transactions.slice(0, 4);

  const paymentSteps = [
    {
      step: '01',
      title: 'Add funds',
      detail: 'Specify the amount in ₹ INR you wish to deposit to your available balance.',
    },
    {
      step: '02',
      title: 'Select method',
      detail: 'Choose between standard UPI, direct Net Banking, or supported Debit Cards.',
    },
    {
      step: '03',
      title: 'Review amount',
      detail: 'Confirm exact deposit amount and verified merchant recipient with zero hidden fees.',
    },
    {
      step: '04',
      title: 'Instant ledger credit',
      detail: 'Funds immediately credit to your available wallet with a logged reference code.',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#0C0F0C] text-[#FFFFFF] border-b border-[#2A2A26] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section 1: Wallet & Payments Header */}
        <div className="max-w-3xl space-y-4 mb-14 sm:mb-18">
          <div className="text-xs font-semibold text-[#1FC777] tracking-wider uppercase">
            Wallet & Payments
          </div>
          <h2 className="text-[34px] sm:text-[48px] font-extrabold text-white tracking-tight leading-[1.12]">
            Moving money should never feel like a mystery.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-[#A3A29A] leading-relaxed">
            Deposit funds, track active holdings, and execute withdrawals with transparent status at every step.
          </p>
        </div>

        {/* 2-Column Split: Clean Wallet Overview + Interactive Payment Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 sm:mb-28">
          {/* Left Column: Wallet Balance Card */}
          <div className="lg:col-span-5 bg-[#171A17] border border-[#2A2A26] rounded-[24px] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A2A26]">
              <span className="text-xs font-semibold text-[#A3A29A] uppercase tracking-wider">
                Trading Wallet
              </span>
              <span className="text-xs text-[#1FC777] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1FC777]" />
                <span>Active</span>
              </span>
            </div>

            <div>
              <span className="text-xs text-[#A3A29A] block">Total portfolio valuation</span>
              <div className="text-[36px] sm:text-[42px] font-extrabold text-white tabular-nums mt-1">
                {formatINR(wallet.totalValue)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#2A2A26]">
              <div className="p-4 bg-[#202320] rounded-[14px] border border-[#2A2A26]">
                <span className="text-xs text-[#A3A29A] block">Available to trade</span>
                <span className="text-[20px] font-bold text-white tabular-nums block mt-0.5">
                  {formatINR(wallet.availableBalance)}
                </span>
              </div>

              <div className="p-4 bg-[#202320] rounded-[14px] border border-[#2A2A26]">
                <span className="text-xs text-[#A3A29A] block">Allocated in units</span>
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
                className="flex items-center justify-center gap-1.5 cursor-pointer shadow-xs font-bold text-sm"
              >
                <ArrowDownLeft className="w-4 h-4" />
                <span>Add funds (UPI / Bank)</span>
              </Button>

              <Button
                variant="outline"
                fullWidth
                onClick={() => setIsWithdrawOpen(true)}
                className="flex items-center justify-center gap-1.5 cursor-pointer text-white border-[#40403B] hover:bg-[#202320] text-sm"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Withdraw</span>
              </Button>
            </div>

            {/* Generic Payment Methods Supported */}
            <div className="pt-3 border-t border-[#2A2A26]">
              <div className="text-[11px] text-[#A3A29A] uppercase tracking-wider mb-2 font-semibold">
                Supported Methods
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-[#202320] rounded-[10px] border border-[#2A2A26]">
                  <Smartphone className="w-4 h-4 text-[#1FC777] mx-auto mb-1" />
                  <span className="text-white block font-medium">UPI / QR</span>
                </div>
                <div className="p-2.5 bg-[#202320] rounded-[10px] border border-[#2A2A26]">
                  <Building className="w-4 h-4 text-[#1FC777] mx-auto mb-1" />
                  <span className="text-white block font-medium">Bank Transfer</span>
                </div>
                <div className="p-2.5 bg-[#202320] rounded-[10px] border border-[#2A2A26]">
                  <CreditCard className="w-4 h-4 text-[#1FC777] mx-auto mb-1" />
                  <span className="text-white block font-medium">Debit Cards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Payment Journey */}
          <div className="lg:col-span-7 bg-[#171A17] border border-[#2A2A26] rounded-[24px] p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-[20px] font-bold text-white">How a deposit flows</h3>
              <p className="text-xs text-[#A3A29A] mt-0.5">
                Every rupee is credited with a verified reference and transparent status.
              </p>
            </div>

            <div className="space-y-4">
              {paymentSteps.map((step, idx) => (
                <div
                  key={step.step}
                  onClick={() => setActivePaymentStep(idx)}
                  className={`p-4 rounded-[16px] border transition-all cursor-pointer flex items-start gap-4 ${
                    activePaymentStep === idx
                      ? 'bg-[#202320] border-[#1FC777]'
                      : 'bg-[#171A17] border-[#2A2A26] hover:bg-[#202320]/60'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#2A2A26] text-[#1FC777] font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {step.step}
                  </div>
                  <div className="space-y-1">
                    <div className="text-[15px] font-bold text-white">{step.title}</div>
                    <div className="text-xs text-[#A3A29A] leading-relaxed">{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#202320] rounded-[14px] border border-[#2A2A26] flex items-center justify-between text-xs text-[#A3A29A]">
              <span>Need to review transaction history?</span>
              <button
                onClick={() => {
                  setCurrentView('app-ledger');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#1FC777] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View all records</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Ledger Trace ("Later, you'll want to know where every rupee went.") */}
        <div className="border-t border-[#2A2A26] pt-16 sm:pt-20">
          <div className="max-w-3xl space-y-4 mb-12">
            <div className="text-xs font-semibold text-[#1FC777] tracking-wider uppercase">
              Transaction Records
            </div>
            <h2 className="text-[32px] sm:text-[44px] font-extrabold text-white tracking-tight leading-[1.12]">
              Later, you’ll want to know where every rupee went.
            </h2>
            <p className="text-[17px] text-[#A3A29A] leading-relaxed">
              Every transaction updates your wallet change, logs the reference, and calculates a running balance. No mysterious discrepancies or missing entries.
            </p>
          </div>

          {/* Visual Ledger Trace Progression */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10 text-xs">
            <div className="p-4 bg-[#171A17] border border-[#2A2A26] rounded-[16px]">
              <span className="text-[#1FC777] font-bold block mb-1">01 · Action</span>
              <span className="font-bold text-white text-sm block">Order or Deposit</span>
              <span className="text-[#A3A29A] mt-0.5 block">Explicit quantity and price confirmed</span>
            </div>

            <div className="p-4 bg-[#171A17] border border-[#2A2A26] rounded-[16px]">
              <span className="text-[#1FC777] font-bold block mb-1">02 · Wallet Change</span>
              <span className="font-bold text-white text-sm block">Instant Debit/Credit</span>
              <span className="text-[#A3A29A] mt-0.5 block">Available cash immediately updates</span>
            </div>

            <div className="p-4 bg-[#171A17] border border-[#2A2A26] rounded-[16px]">
              <span className="text-[#1FC777] font-bold block mb-1">03 · Running Balance</span>
              <span className="font-bold text-white text-sm block">Recorded Total</span>
              <span className="text-[#A3A29A] mt-0.5 block">Snapshot balance preserved for audit</span>
            </div>

            <div className="p-4 bg-[#171A17] border border-[#2A2A26] rounded-[16px]">
              <span className="text-[#1FC777] font-bold block mb-1">04 · Reference Code</span>
              <span className="font-bold text-white text-sm block">Unique Hash</span>
              <span className="text-[#A3A29A] mt-0.5 block">Reference code for easy tracking</span>
            </div>
          </div>

          {/* Ledger Table Rows */}
          <div className="bg-[#171A17] border border-[#2A2A26] rounded-[24px] overflow-hidden">
            <div className="p-5 border-b border-[#2A2A26] flex items-center justify-between">
              <span className="font-bold text-white text-sm">Recent Ledger Entries</span>
              <span className="text-xs text-[#A3A29A]">Sequential running totals</span>
            </div>

            <div className="divide-y divide-[#2A2A26]">
              {previewTransactions.map((tx) => {
                const isCredit = tx.type === 'deposit' || tx.type === 'sell';
                return (
                  <div
                    key={tx.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#202320] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[15px] text-white">{tx.description}</span>
                        <span className="text-xs font-mono text-[#A3A29A]">{tx.id}</span>
                      </div>
                      <div className="text-xs text-[#A3A29A] flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {tx.date} at {tx.time} · Ref: {tx.reference}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div
                        className={`text-[16px] font-bold tabular-nums ${
                          isCredit ? 'text-[#1FC777]' : 'text-white'
                        }`}
                      >
                        {isCredit ? '+' : '-'}{formatINR(Math.abs(tx.amount))}
                      </div>
                      <div className="text-xs text-[#A3A29A] tabular-nums mt-0.5">
                        Running balance: <span className="text-white font-medium">{formatINR(tx.runningBalance)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
