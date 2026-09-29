import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import { PieChart, TrendingUp, ArrowDownLeft, ArrowUpRight, Plus, ExternalLink } from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { positions, wallet, products, openBuySell, setIsAddFundsOpen, setCurrentView, setSelectedProductId } = useTrading();

  const totalInvested = positions.reduce((acc, p) => acc + p.totalInvested, 0);
  const totalCurrent = positions.reduce((acc, p) => acc + p.totalCurrent, 0);
  const totalPnl = totalCurrent - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  // Allocation calculation
  const cashPercent = Math.round((wallet.availableBalance / wallet.totalValue) * 100);
  const holdingsPercent = 100 - cashPercent;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Portfolio & Holdings</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-0.5">
            Comprehensive overview of your active product allocations, current yields, and valuation performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setIsAddFundsOpen(true)} className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Add Funds</span>
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setCurrentView('markets')}>
            Explore More Products
          </Button>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-[#E7E5E4] rounded-[16px] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block">
            Net Portfolio Value
          </span>
          <span className="text-[26px] font-bold text-[#171717] tabular-nums block mt-1">
            {formatINR(wallet.totalValue)}
          </span>
          <span className="text-[12px] text-[#16803C] font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+1.42% intraday movement</span>
          </span>
        </div>

        <div className="p-5 bg-white border border-[#E7E5E4] rounded-[16px] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block">
            Invested in Holdings
          </span>
          <span className="text-[26px] font-bold text-[#171717] tabular-nums block mt-1">
            {formatINR(totalInvested)}
          </span>
          <span className="text-[12px] text-[#78716C] block mt-1">Across {positions.length} active listings</span>
        </div>

        <div className="p-5 bg-white border border-[#E7E5E4] rounded-[16px] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block">
            Total Unrealized Return
          </span>
          <span
            className={`text-[26px] font-bold tabular-nums block mt-1 ${
              totalPnl >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
            }`}
          >
            {totalPnl >= 0 ? '+' : ''}
            {formatINR(totalPnl)}
          </span>
          <span
            className={`text-[12px] font-semibold mt-1 block ${
              totalPnlPercent >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
            }`}
          >
            {totalPnlPercent >= 0 ? '+' : ''}
            {totalPnlPercent.toFixed(2)}% overall ROI
          </span>
        </div>

        <div className="p-5 bg-white border border-[#E7E5E4] rounded-[16px] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block">
            Unallocated Cash Reserve
          </span>
          <span className="text-[26px] font-bold text-[#005EA8] tabular-nums block mt-1">
            {formatINR(wallet.availableBalance)}
          </span>
          <span className="text-[12px] text-[#78716C] block mt-1">{cashPercent}% of total portfolio</span>
        </div>
      </div>

      {/* Allocation Visual Bar */}
      <div className="p-5 bg-white border border-[#E7E5E4] rounded-[16px] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#171717]">Asset Allocation Breakdown</span>
          <span className="text-[12px] text-[#78716C]">
            {holdingsPercent}% Holdings · {cashPercent}% Liquid Cash
          </span>
        </div>
        <div className="w-full h-3 bg-[#E7E5E4] rounded-full overflow-hidden flex">
          <div style={{ width: `${holdingsPercent}%` }} className="bg-[#0070BA] h-full" title="Active Holdings" />
          <div style={{ width: `${cashPercent}%` }} className="bg-[#A6F4C5] h-full" title="Cash Balance" />
        </div>
        <div className="flex items-center gap-6 text-[12px] text-[#57534E]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0070BA]" />
            <span>Active Product Contracts ({formatINR(totalCurrent)})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16803C]" />
            <span>Liquid Trading Balance ({formatINR(wallet.availableBalance)})</span>
          </div>
        </div>
      </div>

      {/* Positions Table */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E7E5E4] flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-bold text-[#171717]">Your Active Holdings</h3>
            <p className="text-[12px] text-[#6B6B6B]">Units purchased through platform listings</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#FAFAF9] border-b border-[#E7E5E4] text-[#78716C] font-bold text-[12px]">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Holding Units</th>
                <th className="py-3 px-4">Average Acquisition Cost</th>
                <th className="py-3 px-4">Current Valuation</th>
                <th className="py-3 px-4">Invested Value</th>
                <th className="py-3 px-4">Current Market Value</th>
                <th className="py-3 px-4">Total P&L</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4]">
              {positions.map((pos) => {
                const prod = products.find((p) => p.id === pos.productId);
                return (
                  <tr key={pos.id} className="hover:bg-[#F0FAFF]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => {
                          setSelectedProductId(pos.productId);
                          setCurrentView('product-detail');
                        }}
                        className="font-bold text-[14px] text-[#171717] hover:text-[#005EA8] text-left block"
                      >
                        {pos.productName}
                      </button>
                      <span className="text-[11px] text-[#78716C] font-mono">{pos.productId}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#171717] tabular-nums">
                      {pos.quantity} units
                    </td>
                    <td className="py-3.5 px-4 tabular-nums text-[#57534E]">
                      {formatINR(pos.averageValue)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#171717] tabular-nums">
                      {formatINR(pos.currentValue)}
                    </td>
                    <td className="py-3.5 px-4 tabular-nums text-[#57534E]">
                      {formatINR(pos.totalInvested)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#171717] tabular-nums">
                      {formatINR(pos.totalCurrent)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-bold tabular-nums block ${
                          pos.pnl >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
                        }`}
                      >
                        {pos.pnl >= 0 ? '+' : ''}
                        {formatINR(pos.pnl)}
                      </span>
                      <span
                        className={`text-[11px] tabular-nums ${
                          pos.pnlPercent >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
                        }`}
                      >
                        {pos.pnlPercent >= 0 ? '+' : ''}
                        {pos.pnlPercent}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openBuySell('buy', prod)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#16803C] bg-[#ECFDF3] border border-[#A6F4C5] rounded-[6px] hover:bg-[#D1FADF] transition-colors"
                        >
                          Buy More
                        </button>
                        <button
                          onClick={() => openBuySell('sell', prod)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#C62828] bg-[#FEF2F2] border border-[#FECDCA] rounded-[6px] hover:bg-[#FEE4E2] transition-colors"
                        >
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
