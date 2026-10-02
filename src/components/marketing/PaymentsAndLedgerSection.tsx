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
      title: 'Specify Amount',
      detail: 'Choose the amount in ₹ INR you wish to allocate to your available wallet balance.',
    },
    {
      step: '02',
      title: 'Select Rail',
      detail: 'Choose between instant UPI Intent, direct Net Banking, or supported Debit Cards.',
    },
    {
      step: '03',
      title: 'Review Breakdown',
      detail: 'Confirm exact deposit amount and verified merchant recipient with zero hidden fees.',
    },
    {
      step: '04',
      title: 'Instant Ledger Credit',
      detail: 'Funds immediately credit to your available balance with an immutable reference code.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0E11] text-[#F5F5F5] border-b border-[#2B3139] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section 1: Wallet & Payments Header */}
        <div className="max-w-3xl space-y-3 mb-14 sm:mb-18">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Settlement & Double-Entry Ledger
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.12]">
            Moving money should never feel like a mystery.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            Deposit funds, track active holdings, and execute withdrawals with verifiable settlement status at every step.
          </p>
        </div>

        {/* 2-Column Split: Step Explanation & Interactive Payment Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-3">
              {paymentSteps.map((step, idx) => (
                <div
                  key={step.step}
                  onClick={() => setActivePaymentStep(idx)}
                  className={`p-4 sm:p-5 rounded-[8px] border transition-all cursor-pointer ${
                    activePaymentStep === idx
                      ? 'bg-[#161A1E] border-[#F0B90B]/50'
                      : 'bg-[#111418] border-[#2B3139] hover:border-[#363C45]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`text-xs font-mono font-bold px-2 py-1 rounded-[4px] shrink-0 ${
                        activePaymentStep === idx
                          ? 'bg-[#F0B90B] text-[#181A20]'
                          : 'bg-[#1E2329] text-[#848E9C]'
                      }`}
                    >
                      {step.step}
                    </div>

                    <div className="space-y-1">
                      <div className="text-[16px] font-bold text-[#F5F5F5]">
                        {step.title}
                      </div>
                      <p className="text-[13px] text-[#848E9C] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#848E9C]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0ECB81]" />
                Zero processing deductions
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0ECB81]" />
                Instant ledger reconciliation
              </span>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 sm:p-8 space-y-6 shadow-xl shadow-black/40">
              <div className="flex items-center justify-between pb-4 border-b border-[#2B3139]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#1E2329] border border-[#2B3139] flex items-center justify-center text-[#F0B90B]">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#848E9C]">Internal Trading Wallet</div>
                    <div className="text-sm font-bold text-[#F5F5F5]">Primary INR Account</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#848E9C]">Available Cash</div>
                  <div className="text-[20px] font-extrabold text-[#F5F5F5] tabular-nums font-mono">
                    {formatINR(wallet.availableBalance)}
                  </div>
                </div>
              </div>

              {/* Rails Pill Selectors */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#848E9C]">Verified Settlement Channels</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 bg-[#111418] border border-[#2B3139] rounded-[6px] text-center space-y-1">
                    <Smartphone className="w-4 h-4 text-[#F0B90B] mx-auto" />
                    <div className="text-[12px] font-bold text-[#F5F5F5]">UPI 2.0</div>
                    <div className="text-[10px] text-[#0ECB81]">Instant</div>
                  </div>
                  <div className="p-3 bg-[#111418] border border-[#2B3139] rounded-[6px] text-center space-y-1">
                    <Building className="w-4 h-4 text-[#F0B90B] mx-auto" />
                    <div className="text-[12px] font-bold text-[#F5F5F5]">Net Banking</div>
                    <div className="text-[10px] text-[#0ECB81]">Real-time</div>
                  </div>
                  <div className="p-3 bg-[#111418] border border-[#2B3139] rounded-[6px] text-center space-y-1">
                    <CreditCard className="w-4 h-4 text-[#F0B90B] mx-auto" />
                    <div className="text-[12px] font-bold text-[#F5F5F5]">Direct Debit</div>
                    <div className="text-[10px] text-[#0ECB81]">Secure 3DS</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => setIsAddFundsOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 font-bold cursor-pointer"
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Test Deposit</span>
                </Button>

                <Button
                  size="md"
                  variant="outline"
                  onClick={() => setIsWithdrawOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Test Withdrawal</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Ledger Records Header */}
        <div className="pt-12 border-t border-[#2B3139]">
          <div className="max-w-3xl space-y-3 mb-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
              <span className="size-1.5 rounded-full bg-[#F0B90B]" />
              Immutable Journal
            </div>
            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.15]">
              Later, you’ll want to know where every rupee went.
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#848E9C] leading-relaxed">
              Every deposit, order deduction, fee assessment, and payout is written to a tamper-evident audit ledger with sequential transaction IDs.
            </p>
          </div>

          {/* Ledger Table */}
          <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#111418] border-b border-[#2B3139] text-[11px] font-semibold text-[#848E9C] uppercase tracking-wider">
                    <th className="py-3 px-4">Ref Code</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4 text-right">Debit / Credit</th>
                    <th className="py-3 px-4 text-right">Running Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2B3139]">
                  {previewTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#1E2329] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-[#F0B90B]">
                        {tx.reference}
                      </td>
                      <td className="py-3.5 px-4 text-[#848E9C] font-mono text-[11px]">
                        {tx.date} · {tx.time}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase font-mono ${
                            tx.type === 'deposit'
                              ? 'bg-[#102A22] text-[#0ECB81]'
                              : tx.type === 'buy'
                              ? 'bg-[#18243A] text-[#4C8FFF]'
                              : tx.type === 'sell'
                              ? 'bg-[#302A15] text-[#F0B90B]'
                              : 'bg-[#301820] text-[#F6465D]'
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#F5F5F5] font-medium">
                        {tx.description}
                      </td>
                      <td
                        className={`py-3.5 px-4 text-right font-mono font-bold tabular-nums ${
                          tx.amount >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
                        }`}
                      >
                        {tx.amount >= 0 ? `+${formatINR(tx.amount)}` : `-${formatINR(Math.abs(tx.amount))}`}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#848E9C]">
                        {formatINR(tx.runningBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#848E9C]">
            <span>Double-entry accounting active · Cryptographic balance seals</span>
            <button
              onClick={() => {
                setCurrentView('ledger');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#F0B90B] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Inspect full platform ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
