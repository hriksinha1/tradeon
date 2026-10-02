import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR, formatPercent } from '../../constants/designTokens';
import { Button } from '../common/Button';
import { PercentageChange } from '../common/PercentageChange';
import { PieChart, TrendingUp, ArrowDownLeft, ArrowUpRight, Plus, ExternalLink, Wallet, ShieldCheck } from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { positions, wallet, products, openBuySell, setIsAddFundsOpen, setCurrentView, setSelectedProductId } = useTrading();

  const totalInvested = positions.reduce((acc, p) => acc + p.totalInvested, 0);
  const totalCurrent = positions.reduce((acc, p) => acc + p.totalCurrent, 0);
  const totalPnl = totalCurrent - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  // Allocation calculation
  const cashPercent = Math.round((wallet.availableBalance / (wallet.totalValue || 1)) * 100);
  const holdingsPercent = 100 - cashPercent;

  return (
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-5 space-y-5 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#2B3139]">
        <div>
          <h1 className="text-[22px] font-bold text-[#F5F5F5] tracking-tight">Portfolio & Position Balances</h1>
          <p className="text-[12px] text-[#848E9C] mt-0.5">
            Active position performance, unrealized yields, and multi-asset exposure breakdown.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="xs" variant="primary" onClick={() => setIsAddFundsOpen(true)} className="flex items-center gap-1 font-bold h-8">
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Deposit Funds</span>
          </Button>
          <Button size="xs" variant="secondary" onClick={() => setCurrentView('app-markets')} className="h-8">
            Marketplace
          </Button>
        </div>
      </div>

      {/* Main Metric Cards Grid (Binance financial statistics bar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[6px]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#848E9C] block">
            Total Portfolio Value
          </span>
          <span className="text-[24px] font-bold text-[#F5F5F5] tabular-nums block mt-1">
            {formatINR(wallet.totalValue)}
          </span>
          <span className="text-[12px] text-[#0ECB81] font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+1.42% Today (+₹6,840)</span>
          </span>
        </div>

        <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[6px]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#848E9C] block">
            Active Holdings Value
          </span>
          <span className="text-[24px] font-bold text-[#F5F5F5] tabular-nums block mt-1">
            {formatINR(wallet.investedValue)}
          </span>
          <span className="text-[12px] text-[#848E9C] block mt-1">{positions.length} active contracts held</span>
        </div>

        <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[6px]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#848E9C] block">
            Total Unrealized Return
          </span>
          <span
            className={`text-[24px] font-bold tabular-nums block mt-1 ${
              totalPnl >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
            }`}
          >
            {totalPnl >= 0 ? '+' : ''}
            {formatINR(totalPnl)}
          </span>
          <span
            className={`text-[12px] font-semibold mt-1 block ${
              totalPnlPercent >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
            }`}
          >
            {totalPnlPercent >= 0 ? '+' : ''}
            {totalPnlPercent.toFixed(2)}% overall ROI
          </span>
        </div>

        <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[6px]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#848E9C] block">
            Available Trading Cash
          </span>
          <span className="text-[24px] font-bold text-[#F0B90B] tabular-nums block mt-1">
            {formatINR(wallet.availableBalance)}
          </span>
          <span className="text-[12px] text-[#848E9C] block mt-1">{cashPercent}% cash reserve</span>
        </div>
      </div>

      {/* Allocation Breakdown Bar */}
      <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[6px] space-y-2.5">
        <div className="flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#F0B90B]" />
            <span className="font-bold text-[#F5F5F5]">Asset Allocation Distribution</span>
          </div>
          <div className="flex items-center gap-4 text-[#848E9C]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F0B90B]" />
              Holdings: <strong className="text-[#F5F5F5]">{holdingsPercent}%</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#363C45]" />
              Cash Balance: <strong className="text-[#F5F5F5]">{cashPercent}%</strong>
            </span>
          </div>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="w-full h-2 rounded-full bg-[#161A1E] overflow-hidden flex">
          <div style={{ width: `${holdingsPercent}%` }} className="bg-[#F0B90B] h-full" />
          <div style={{ width: `${cashPercent}%` }} className="bg-[#363C45] h-full" />
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-[#111418] border border-[#2B3139] rounded-[6px] p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E2329]">
          <div>
            <h3 className="text-[15px] font-bold text-[#F5F5F5]">Position Holdings ({positions.length})</h3>
            <p className="text-[11px] text-[#848E9C]">Marked-to-market live valuations with instant liquidation routing</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          {positions.length > 0 ? (
            <table className="w-full text-left text-[13px] tabular-nums">
              <thead className="bg-[#161A1E] border-b border-[#2B3139] text-[#848E9C] text-[11px] font-semibold uppercase">
                <tr>
                  <th className="py-2.5 px-3">Asset</th>
                  <th className="py-2.5 px-3">Position Size</th>
                  <th className="py-2.5 px-3">Entry Avg Price</th>
                  <th className="py-2.5 px-3">Market Price</th>
                  <th className="py-2.5 px-3">Total Value</th>
                  <th className="py-2.5 px-3">Unrealized P&L</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2329]">
                {positions.map((pos) => {
                  const product = products.find((p) => p.id === pos.productId);
                  return (
                    <tr key={pos.id} className="hover:bg-[#161A1E] transition-colors">
                      <td className="py-3 px-3">
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedProductId(pos.productId);
                            setCurrentView('app-product-detail');
                          }}
                        >
                          <span className="font-bold text-[#F5F5F5] hover:text-[#F0B90B] block">
                            {pos.productName}
                          </span>
                          <span className="text-[11px] text-[#848E9C] font-mono">{pos.productId}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#F5F5F5]">
                        {pos.quantity} units
                      </td>
                      <td className="py-3 px-3 text-[#848E9C]">
                        {formatINR(pos.averageValue)}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#F5F5F5]">
                        {formatINR(pos.currentValue)}
                      </td>
                      <td className="py-3 px-3 font-bold text-[#F5F5F5]">
                        {formatINR(pos.totalCurrent)}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`font-bold block ${
                            pos.pnl >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
                          }`}
                        >
                          {pos.pnl >= 0 ? '+' : ''}
                          {formatINR(pos.pnl)}
                        </span>
                        <span
                          className={`text-[11px] ${
                            pos.pnlPercent >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
                          }`}
                        >
                          {pos.pnlPercent >= 0 ? '+' : ''}
                          {pos.pnlPercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openBuySell('buy', product)}
                            className="px-2.5 py-1 text-[11px] font-bold text-[#0ECB81] bg-[#102A22] border border-[#0ECB81]/30 rounded-[4px] hover:bg-[#0ECB81]/20 transition-colors cursor-pointer"
                          >
                            Buy More
                          </button>
                          <button
                            onClick={() => openBuySell('sell', product)}
                            className="px-2.5 py-1 text-[11px] font-bold text-[#F6465D] bg-[#301820] border border-[#F6465D]/30 rounded-[4px] hover:bg-[#F6465D]/20 transition-colors cursor-pointer"
                          >
                            Close / Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-[#848E9C]">
              <p className="text-[14px]">You do not have any active positions.</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentView('app-markets')}
                className="mt-3 font-bold"
              >
                Explore Listed Markets
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioView;
