import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  Wallet as WalletIcon,
  Plus,
  ArrowUpRight,
  Building2,
  Smartphone,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const WalletView: React.FC = () => {
  const { wallet, transactions, setIsAddFundsOpen, setIsWithdrawOpen, openTransactionDetail, setCurrentView } = useTrading();

  const walletTxns = transactions.filter((t) => t.type === 'deposit' || t.type === 'withdrawal');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Trading Wallet & Cash</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-0.5">
            Manage liquid trading reserves, deposit fiat rails, and configure bank settlement accounts.
          </p>
        </div>
      </div>

      {/* Main Balance Banner Card */}
      <div className="bg-white border border-[#E7E5E4] rounded-[20px] p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E7E5E4]">
          <div>
            <span className="text-[12px] uppercase font-bold tracking-wider text-[#78716C] block">
              Available Cash for Orders
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-[34px] sm:text-[42px] font-bold text-[#171717] tracking-tight tabular-nums">
                {formatINR(wallet.availableBalance)}
              </span>
              <span className="text-[13px] text-[#16803C] font-semibold bg-[#ECFDF3] border border-[#A6F4C5] px-2.5 py-0.5 rounded-full">
                Instant Liquidity
              </span>
            </div>
            <p className="text-[13px] text-[#6B6B6B] mt-1">
              Backed by segregated institutional treasury escrow accounts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              onClick={() => setIsAddFundsOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Funds (Deposit)</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsWithdrawOpen(true)}
              className="flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw to Bank</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-[13px]">
          <div className="p-3.5 bg-[#FAF4F9] rounded-[12px] border border-[#ECD6E9]">
            <span className="text-[#78716C] text-[11px] font-bold uppercase block">Total Net Balance</span>
            <span className="text-[18px] font-bold text-[#6A2E62] tabular-nums block mt-0.5">
              {formatINR(wallet.totalValue)}
            </span>
            <span className="text-[11px] text-[#78716C] block mt-0.5">Cash + Holdings</span>
          </div>

          <div className="p-3.5 bg-[#FAFAF9] rounded-[12px] border border-[#E7E5E4]">
            <span className="text-[#78716C] text-[11px] font-bold uppercase block">Holdings Value</span>
            <span className="text-[18px] font-bold text-[#171717] tabular-nums block mt-0.5">
              {formatINR(wallet.investedValue)}
            </span>
            <span className="text-[11px] text-[#78716C] block mt-0.5">Mark-to-market</span>
          </div>

          <div className="p-3.5 bg-[#FAFAF9] rounded-[12px] border border-[#E7E5E4]">
            <span className="text-[#78716C] text-[11px] font-bold uppercase block">Uncleared Pending</span>
            <span className="text-[18px] font-bold text-[#171717] tabular-nums block mt-0.5">
              ₹0.00
            </span>
            <span className="text-[11px] text-[#16803C] block mt-0.5">All settlements cleared</span>
          </div>
        </div>
      </div>

      {/* Two Columns: Linked Accounts + Recent Cash Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Linked Rails */}
        <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-[17px] font-bold text-[#171717]">Linked Payment Rails</h3>
          <div className="space-y-3">
            <div className="p-3.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E7E5E4] flex items-center justify-center text-[#6A2E62]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[14px] text-[#171717] block">HDFC Bank Limited</span>
                  <span className="text-[12px] text-[#6B6B6B]">••••4091 · Primary Settlement</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#16803C] bg-[#ECFDF3] px-2 py-0.5 rounded">
                Verified
              </span>
            </div>

            <div className="p-3.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E7E5E4] flex items-center justify-center text-[#1D4ED8]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[14px] text-[#171717] block">Unified Payments Interface</span>
                  <span className="text-[12px] text-[#6B6B6B]">user@okaxis · Instant Autopay</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#16803C] bg-[#ECFDF3] px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[12px] text-[#78716C]">
            <ShieldCheck className="w-4 h-4 text-[#16803C]" />
            <span>Bank-grade 256-bit SSL encryption on all financial movements.</span>
          </div>
        </div>

        {/* Recent Deposit / Withdrawal Events */}
        <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-bold text-[#171717]">Recent Cash Activity</h3>
              <button
                onClick={() => setCurrentView('ledger')}
                className="text-[12px] font-semibold text-[#6A2E62] hover:underline"
              >
                View full ledger
              </button>
            </div>

            <div className="space-y-2.5">
              {walletTxns.slice(0, 3).map((t) => {
                const isCredit = t.amount > 0;
                return (
                  <div
                    key={t.id}
                    onClick={() => openTransactionDetail(t)}
                    className="p-3 bg-[#FAFAF9] hover:bg-[#F5F5F4] border border-[#E7E5E4] rounded-[12px] cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-[13px] text-[#171717] block">{t.description}</span>
                      <span className="text-[11px] text-[#8A8A8A] font-mono">{t.id} · {t.date}</span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[14px] font-bold tabular-nums block ${
                          isCredit ? 'text-[#16803C]' : 'text-[#171717]'
                        }`}
                      >
                        {isCredit ? '+' : ''}
                        {formatINR(t.amount)}
                      </span>
                      <span className="text-[11px] text-[#16803C] font-semibold">Completed</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
