import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  Wallet as WalletIcon,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  Smartphone,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeftRight,
} from 'lucide-react';

export const WalletView: React.FC = () => {
  const { wallet, positions, transactions, setIsAddFundsOpen, setIsWithdrawOpen, openTransactionDetail, setCurrentView, openBuySell } = useTrading();

  const walletTxns = transactions.filter((t) => t.type === 'deposit' || t.type === 'withdrawal');

  return (
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-5 space-y-5 select-none bg-white text-[#181A20]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#EAECEF]">
        <div>
          <h1 className="text-[22px] font-bold text-[#181A20] tracking-tight">Wallet Overview & Funding</h1>
          <p className="text-[12px] text-[#707A8A]">
            Instant deposit rails, bank settlement withdrawals, and segregated trading capital.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="primary"
            onClick={() => setIsAddFundsOpen(true)}
            className="flex items-center gap-1 font-bold h-8 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Deposit</span>
          </Button>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => setIsWithdrawOpen(true)}
            className="flex items-center gap-1 h-8 cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Withdraw</span>
          </Button>
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-5 space-y-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#EAECEF]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#707A8A]">
                Total Estimated Balance
              </span>
              <span className="text-[10px] font-mono font-bold text-[#946800] bg-[#FEF6D8] border border-[#FCDD80] px-1.5 py-0.2 rounded">
                INR
              </span>
            </div>
            <div className="flex items-baseline gap-3 mt-1.5">
              <span className="text-[32px] sm:text-[38px] font-bold text-[#181A20] tracking-tight tabular-nums font-mono">
                {formatINR(wallet.totalValue)}
              </span>
              <span className="text-[12px] text-[#02A063] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Escrow Backed</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setIsAddFundsOpen(true)}
              className="flex items-center gap-1.5 font-bold cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Deposit INR</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsWithdrawOpen(true)}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw to Bank</span>
            </Button>
          </div>
        </div>

        {/* Balance Breakdown Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[12px] tabular-nums">
          <div className="p-3 bg-[#F5F6F8] rounded-[4px] border border-[#DFE2E6]">
            <span className="text-[#707A8A] text-[11px] font-semibold uppercase block">Available Trading Balance</span>
            <span className="text-[18px] font-bold text-[#181A20] block mt-1 font-mono">
              {formatINR(wallet.availableBalance)}
            </span>
            <span className="text-[11px] text-[#707A8A] block mt-0.5">Ready for immediate order placement</span>
          </div>

          <div className="p-3 bg-[#F5F6F8] rounded-[4px] border border-[#DFE2E6]">
            <span className="text-[#707A8A] text-[11px] font-semibold uppercase block">Active Holdings Collateral</span>
            <span className="text-[18px] font-bold text-[#181A20] block mt-1 font-mono">
              {formatINR(wallet.investedValue)}
            </span>
            <span className="text-[11px] text-[#707A8A] block mt-0.5">{positions.length} position contracts</span>
          </div>

          <div className="p-3 bg-[#F5F6F8] rounded-[4px] border border-[#DFE2E6]">
            <span className="text-[#707A8A] text-[11px] font-semibold uppercase block">In-Order / Locked Balance</span>
            <span className="text-[18px] font-bold text-[#181A20] block mt-1 font-mono">
              ₹0.00
            </span>
            <span className="text-[11px] text-[#02A063] block mt-0.5">Zero capital locked in pending triggers</span>
          </div>
        </div>
      </div>

      {/* Assets / Holdings in Wallet Table */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#EAECEF]">
          <h3 className="text-[15px] font-bold text-[#181A20]">Fund Balances & Asset Ledger</h3>
          <span className="text-[11px] text-[#707A8A]">Real-time fiat and derivative allocations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] tabular-nums font-mono">
            <thead className="bg-[#F5F6F8] border-b border-[#DFE2E6] text-[#707A8A] text-[11px] font-semibold uppercase font-sans">
              <tr>
                <th className="py-2.5 px-3">Asset</th>
                <th className="py-2.5 px-3">Total Balance</th>
                <th className="py-2.5 px-3">Available Balance</th>
                <th className="py-2.5 px-3">In Orders</th>
                <th className="py-2.5 px-3">Valuation (INR)</th>
                <th className="py-2.5 px-3 text-right font-sans">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECEF]">
              {/* Cash Row */}
              <tr className="hover:bg-[#F5F6F8] transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#FEF6D8] border border-[#FCDD80] flex items-center justify-center text-[#946800] font-bold text-[12px]">
                      ₹
                    </div>
                    <div>
                      <span className="font-bold text-[#181A20] block font-sans">Indian Rupee</span>
                      <span className="text-[11px] text-[#707A8A]">INR (Fiat)</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-semibold text-[#181A20]">{formatINR(wallet.availableBalance)}</td>
                <td className="py-3 px-3 text-[#02A063] font-semibold">{formatINR(wallet.availableBalance)}</td>
                <td className="py-3 px-3 text-[#707A8A]">₹0.00</td>
                <td className="py-3 px-3 font-bold text-[#181A20]">{formatINR(wallet.availableBalance)}</td>
                <td className="py-3 px-3 text-right font-sans">
                  <button
                    onClick={() => setIsAddFundsOpen(true)}
                    className="px-2.5 py-1 text-[11px] font-bold bg-[#F0B90B] text-[#181A20] rounded-[3px] hover:bg-[#F8D12F] cursor-pointer"
                  >
                    Deposit
                  </button>
                </td>
              </tr>

              {/* Positions as assets */}
              {positions.map((pos) => (
                <tr key={pos.id} className="hover:bg-[#F5F6F8] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-[#F5F6F8] border border-[#DFE2E6] flex items-center justify-center text-[#181A20] font-bold text-[11px]">
                        {pos.productId.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-[#181A20] block font-sans">{pos.productName}</span>
                        <span className="text-[11px] text-[#707A8A] font-mono">{pos.productId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#181A20]">{pos.quantity} units</td>
                  <td className="py-3 px-3 text-[#181A20]">{pos.quantity} units</td>
                  <td className="py-3 px-3 text-[#707A8A]">0 units</td>
                  <td className="py-3 px-3 font-bold text-[#181A20]">{formatINR(pos.totalCurrent)}</td>
                  <td className="py-3 px-3 text-right font-sans">
                    <button
                      onClick={() => openBuySell('sell')}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white text-[#181A20] border border-[#DFE2E6] hover:bg-[#F5F6F8] rounded-[3px] cursor-pointer"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Funding Activity */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#EAECEF]">
          <h3 className="text-[15px] font-bold text-[#181A20]">Funding & Withdrawal Records</h3>
          <button
            onClick={() => setCurrentView('app-ledger')}
            className="text-[12px] font-semibold text-[#946800] hover:underline cursor-pointer"
          >
            All Ledger Records
          </button>
        </div>

        <div className="overflow-x-auto">
          {walletTxns.length > 0 ? (
            <table className="w-full text-left text-[12px] tabular-nums font-mono">
              <thead className="bg-[#F5F6F8] text-[#707A8A] border-b border-[#DFE2E6] text-[11px] font-semibold uppercase font-sans">
                <tr>
                  <th className="py-2 px-3">Date / Time</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Gateway / Account</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Fee</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-right font-sans">Audit Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECEF]">
                {walletTxns.slice(0, 5).map((txn) => {
                  const isCredit = txn.amount > 0;
                  return (
                    <tr
                      key={txn.id}
                      onClick={() => openTransactionDetail(txn)}
                      className="hover:bg-[#F5F6F8] cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-3 text-[#707A8A]">{txn.date} · {txn.time}</td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className={`font-bold uppercase text-[11px] ${isCredit ? 'text-[#02A063]' : 'text-[#CF304A]'}`}>
                          {txn.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-[#181A20] font-sans">{txn.paymentMethod || 'Bank IMPS'}</td>
                      <td className={`py-2.5 px-3 font-semibold ${isCredit ? 'text-[#02A063]' : 'text-[#181A20]'}`}>
                        {isCredit ? '+' : ''}{formatINR(txn.amount)}
                      </td>
                      <td className="py-2.5 px-3 text-[#707A8A]">{formatINR(txn.fee, { decimals: 2 })}</td>
                      <td className="py-2.5 px-3 font-sans">
                        <span className="text-[#02A063] font-semibold text-[11px]">Reconciled</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[11px] text-[#946800]">{txn.reference}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="py-8 text-center text-[#707A8A] text-[13px]">
              No deposits or withdrawals yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletView;
