import React from 'react';
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
  RefreshCw,
  FileText,
  CreditCard,
  Building,
  Smartphone,
} from 'lucide-react';

export const PaymentsAndLedgerSection: React.FC = () => {
  const { wallet, transactions, setIsAddFundsOpen, setIsWithdrawOpen, setCurrentView } = useTrading();

  const previewTransactions = transactions.slice(0, 4);

  return (
    <section className="py-20 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
            Financial Infrastructure
          </span>
          <h2 className="text-[34px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight mt-3">
            Payments, wallet, and immutable ledger.
          </h2>
          <p className="mt-3 text-[17px] text-[#5A5A53]">
            Every rupee deposited, allocated, or withdrawn is recorded in real time with double-entry cryptographic verification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Wallet & Payment Gateway Rails */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F7F6F2] border border-[#CBCAC2] rounded-[22px] p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#6B6B63] uppercase tracking-wider">
                  Internal Trading Wallet
                </span>
                <span className="text-[11px] font-bold text-[#087A4A] bg-[#E9FAF1] px-2.5 py-0.5 rounded-full border border-[#CFF3E0]">
                  Reconciled
                </span>
              </div>

              {/* Total Balance */}
              <div className="mt-4">
                <div className="text-[36px] font-extrabold text-[#171A17] tabular-nums">
                  {formatINR(wallet.totalValue)}
                </div>
                <span className="text-[13px] text-[#5A5A53]">Total Asset & Cash Valuation</span>
              </div>

              {/* Balance Breakdown Pills */}
              <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-[#E2E1DA]">
                <div className="p-3 bg-white rounded-[12px] border border-[#E2E1DA]">
                  <span className="text-[11px] font-semibold text-[#6B6B63] block">Available Cash</span>
                  <span className="text-[18px] font-bold text-[#171A17] tabular-nums block mt-0.5">
                    {formatINR(wallet.availableBalance)}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-[12px] border border-[#E2E1DA]">
                  <span className="text-[11px] font-semibold text-[#6B6B63] block">Allocated in Units</span>
                  <span className="text-[18px] font-bold text-[#087A4A] tabular-nums block mt-0.5">
                    {formatINR(wallet.totalValue - wallet.availableBalance)}
                  </span>
                </div>
              </div>

              {/* Interactive Quick Actions */}
              <div className="mt-6 flex items-center gap-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setIsAddFundsOpen(true)}
                  className="flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Add Funds (UPI)</span>
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setIsWithdrawOpen(true)}
                  className="flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Withdraw</span>
                </Button>
              </div>
            </div>

            {/* Payment Rails badges */}
            <div className="bg-[#FFFFFF] border border-[#E2E1DA] rounded-[18px] p-5 space-y-3 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B63] block">
                Supported Instant Payment Rails
              </span>
              <div className="grid grid-cols-3 gap-2.5 text-center text-[12px]">
                <div className="p-2.5 bg-[#F7F6F2] rounded-[10px] border border-[#E2E1DA]">
                  <Smartphone className="w-4 h-4 text-[#087A4A] mx-auto mb-1" />
                  <span className="font-bold text-[#171A17] block">UPI / QR</span>
                  <span className="text-[10px] text-[#6B6B63]">0% Fee · Instant</span>
                </div>
                <div className="p-2.5 bg-[#F7F6F2] rounded-[10px] border border-[#E2E1DA]">
                  <Building className="w-4 h-4 text-[#087A4A] mx-auto mb-1" />
                  <span className="font-bold text-[#171A17] block">Net Banking</span>
                  <span className="text-[10px] text-[#6B6B63]">50+ Banks</span>
                </div>
                <div className="p-2.5 bg-[#F7F6F2] rounded-[10px] border border-[#E2E1DA]">
                  <CreditCard className="w-4 h-4 text-[#087A4A] mx-auto mb-1" />
                  <span className="font-bold text-[#171A17] block">Cards / IMPS</span>
                  <span className="text-[10px] text-[#6B6B63]">Direct Settlement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Immutable Double-Entry Ledger Preview */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#EFEEE9] gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#1FC777]" />
                  <h3 className="text-[20px] font-bold text-[#171A17]">
                    Live Transaction Ledger
                  </h3>
                </div>
                <p className="text-[13px] text-[#5A5A53] mt-0.5">
                  Complete audit log of executed trades, deposits, and fee settlements.
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentView('app-ledger');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[12px] font-bold text-[#087A4A] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>Full Ledger View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table of transactions */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[#EFEEE9] text-[11px] font-bold uppercase tracking-wider text-[#6B6B63]">
                    <th className="py-2.5 px-3">Transaction / ID</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3 text-right">Amount</th>
                    <th className="py-2.5 px-3 text-right">Balance After</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFEEE9]">
                  {previewTransactions.map((tx) => {
                    const isCredit = tx.type === 'deposit' || tx.type === 'sell';
                    return (
                      <tr key={tx.id} className="hover:bg-[#F7F6F2] transition-colors">
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-[#171A17] block">{tx.description}</span>
                          <span className="text-[11px] font-mono text-[#6B6B63]">{tx.id}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="capitalize font-semibold text-[#5A5A53] px-2 py-0.5 bg-[#EFEEE9] rounded-[6px] text-[11px]">
                            {tx.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold tabular-nums">
                          <span className={isCredit ? 'text-[#0A7A45]' : 'text-[#171A17]'}>
                            {isCredit ? '+' : '-'}
                            {formatINR(Math.abs(tx.amount))}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right font-medium text-[#5A5A53] tabular-nums">
                          {formatINR(tx.runningBalance)}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A7A45] bg-[#E3F6EC] px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Double-Entry Compliance Note */}
            <div className="mt-5 p-3.5 bg-[#E9FAF1] border border-[#A2E8C5] rounded-[12px] flex items-center justify-between text-[12px] text-[#087A4A]">
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#12A560]" />
                <span className="font-semibold">
                  Zero discrepancy guarantee: Assets + Reserves = Total Equity
                </span>
              </span>
              <span className="font-bold">Audit Pass</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
