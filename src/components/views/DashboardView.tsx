import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Star,
  Plus,
  ArrowRight,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    wallet,
    products,
    positions,
    orders,
    transactions,
    watchlist,
    toggleWatchlist,
    setCurrentView,
    setSelectedProductId,
    openBuySell,
    setIsAddFundsOpen,
    openTransactionDetail,
  } = useTrading();

  const [chartPeriod, setChartPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');

  // Chart data simulation based on period
  const chartPoints: { [key: string]: number[] } = {
    '1D': [475800, 477200, 476900, 479100, 481000, 480200, 482640],
    '1W': [468000, 471200, 469800, 474500, 478900, 480100, 482640],
    '1M': [442000, 448500, 456000, 452100, 467000, 475000, 482640],
    '3M': [410000, 425000, 438000, 449000, 462000, 474000, 482640],
    '1Y': [350000, 375000, 392000, 420000, 448000, 465000, 482640],
    'ALL': [290000, 330000, 380000, 415000, 450000, 482640],
  };

  const points = chartPoints[chartPeriod];
  const minVal = Math.min(...points);
  const maxVal = Math.max(...points);
  const range = maxVal - minVal || 1;

  // SVG coordinates for responsive sparkline / area chart
  const svgWidth = 580;
  const svgHeight = 160;
  const pathD = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * (svgWidth - 20) + 10;
      const y = svgHeight - 20 - ((val - minVal) / range) * (svgHeight - 40);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaD = `${pathD} L ${svgWidth - 10} ${svgHeight - 10} L 10 ${svgHeight - 10} Z`;

  const watchlistProducts = products.filter((p) => watchlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Top Greeting & Main Metrics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Total Portfolio Card (2 Columns on large) */}
        <div className="lg:col-span-2 bg-white border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
            <div>
              <span className="text-[12px] uppercase font-bold tracking-wider text-[#78716C] block">
                Total Portfolio Value
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-[32px] sm:text-[36px] font-bold text-[#171717] tracking-tight tabular-nums">
                  {formatINR(wallet.totalValue)}
                </span>
                <span className="text-[14px] font-bold text-[#16803C] flex items-center gap-0.5 tabular-nums">
                  <TrendingUp className="w-4 h-4" />
                  <span>+₹6,840 (+1.42%)</span>
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => setIsAddFundsOpen(true)}
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Funds</span>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openBuySell('buy')}
                className="flex items-center gap-1.5"
              >
                <ArrowDownLeft className="w-4 h-4" />
                <span>Trade</span>
              </Button>
            </div>
          </div>

          {/* Metric Sub-bar: Available Balance & Invested Value */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-b border-[#E7E5E4] text-[13px]">
            <div>
              <span className="text-[#78716C] block text-[11px] font-semibold uppercase">
                Available Cash Balance
              </span>
              <span className="font-bold text-[#171717] text-[16px] tabular-nums block mt-0.5">
                {formatINR(wallet.availableBalance)}
              </span>
            </div>
            <div>
              <span className="text-[#78716C] block text-[11px] font-semibold uppercase">
                Active Product Holdings
              </span>
              <span className="font-bold text-[#171717] text-[16px] tabular-nums block mt-0.5">
                {formatINR(wallet.investedValue)}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#78716C] block text-[11px] font-semibold uppercase">
                Unrealized Gain / Loss
              </span>
              <span className="font-bold text-[#16803C] text-[16px] tabular-nums block mt-0.5">
                +₹14,425 (+3.76%)
              </span>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-bold text-[#78716C] uppercase tracking-wider">
                Performance Trajectory
              </span>
              <div className="flex items-center gap-1 bg-[#F5F5F4] p-0.5 rounded-[8px]">
                {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold transition-all ${
                      chartPeriod === period
                        ? 'bg-white text-[#6A2E62] shadow-2xs'
                        : 'text-[#6B6B6B] hover:text-[#171717]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Minimalist Area Chart */}
            <div className="w-full h-44 relative overflow-hidden bg-[#FAF4F9]/40 rounded-[12px] p-2 border border-[#F3E5F1]">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full preserve-3d">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6A2E62" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6A2E62" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d={areaD} fill="url(#chartGradient)" />
                <path
                  d={pathD}
                  fill="none"
                  stroke="#6A2E62"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Watchlist & Starred Assets (1 Column) */}
        <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#B7791F] fill-[#B7791F]" />
                <h3 className="text-[16px] font-bold text-[#171717]">Watchlist Highlights</h3>
              </div>
              <button
                onClick={() => setCurrentView('markets')}
                className="text-[12px] font-semibold text-[#6A2E62] hover:underline"
              >
                View all ({products.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {watchlistProducts.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#FAFAF9] hover:bg-[#FAF4F9] border border-[#E7E5E4] hover:border-[#ECD6E9] rounded-[12px] transition-all flex items-center justify-between"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedProductId(item.id);
                      setCurrentView('product-detail');
                    }}
                  >
                    <span className="font-bold text-[14px] text-[#171717] hover:text-[#6A2E62] block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-[#78716C]">{item.id}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#171717] tabular-nums block">
                      {formatINR(item.currentValue)}
                    </span>
                    <span
                      className={`text-[12px] font-semibold tabular-nums ${
                        item.changePercent >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
                      }`}
                    >
                      {item.changePercent >= 0 ? '+' : ''}
                      {item.changePercent}%
                    </span>
                  </div>

                  <div className="pl-2">
                    <button
                      onClick={() => openBuySell('buy', item)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-[#6A2E62] bg-white border border-[#ECD6E9] rounded-[6px] hover:bg-[#FAF4F9] transition-colors"
                    >
                      Trade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Options Banner */}
          <div className="mt-5 p-3.5 bg-[#FAF4F9] border border-[#ECD6E9] rounded-[12px] flex items-center justify-between">
            <div>
              <span className="text-[12px] font-bold text-[#6A2E62] uppercase block">Options Chain</span>
              <span className="text-[13px] text-[#171717] font-semibold">Active Call & Put Contracts</span>
            </div>
            <button
              onClick={() => setCurrentView('options')}
              className="p-1.5 bg-white text-[#6A2E62] rounded-lg border border-[#ECD6E9] hover:bg-[#F7EFF6] transition-colors"
              title="Open Options Chain"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Active Positions & Open Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Positions Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[17px] font-bold text-[#171717]">Your Active Positions</h3>
              <p className="text-[12px] text-[#6B6B6B]">Holdings tracked against live settlement valuation</p>
            </div>
            <button
              onClick={() => setCurrentView('portfolio')}
              className="text-[12px] font-semibold text-[#6A2E62] hover:underline flex items-center gap-1"
            >
              <span>Portfolio Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="border-b border-[#E7E5E4] text-[#78716C] bg-[#FAFAF9] font-bold text-[12px]">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Product</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3">Avg Cost</th>
                  <th className="py-2.5 px-3">Current</th>
                  <th className="py-2.5 px-3">P&L</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E4]">
                {positions.map((pos) => {
                  const product = products.find((p) => p.id === pos.productId);
                  return (
                    <tr key={pos.id} className="hover:bg-[#FAF4F9]/60 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#171717] block">{pos.productName}</span>
                        <span className="text-[11px] text-[#78716C] font-mono">{pos.productId}</span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#171717] tabular-nums">
                        {pos.quantity} units
                      </td>
                      <td className="py-3 px-3 tabular-nums text-[#6B6B6B]">
                        {formatINR(pos.averageValue)}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#171717] tabular-nums">
                        {formatINR(pos.currentValue)}
                      </td>
                      <td className="py-3 px-3">
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
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openBuySell('buy', product)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-[#16803C] bg-[#ECFDF3] border border-[#A6F4C5] rounded-[6px] hover:bg-[#D1FADF] transition-colors"
                          >
                            Buy
                          </button>
                          <button
                            onClick={() => openBuySell('sell', product)}
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

        {/* Recent Ledger Activity (1 Column) */}
        <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-bold text-[#171717]">Recent Ledger Entries</h3>
              <button
                onClick={() => setCurrentView('ledger')}
                className="text-[12px] font-semibold text-[#6A2E62] hover:underline"
              >
                All activity
              </button>
            </div>

            <div className="space-y-3">
              {transactions.slice(0, 4).map((txn) => {
                const isCredit = txn.amount > 0;
                return (
                  <div
                    key={txn.id}
                    onClick={() => openTransactionDetail(txn)}
                    className="p-3 bg-[#FAFAF9] hover:bg-[#F5F5F4] border border-[#E7E5E4] rounded-[12px] cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-[13px] text-[#171717] block line-clamp-1">
                        {txn.description}
                      </span>
                      <span className="text-[11px] text-[#8A8A8A] font-mono">
                        {txn.id} · {txn.date}
                      </span>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <span
                        className={`text-[13px] font-bold tabular-nums block ${
                          isCredit ? 'text-[#16803C]' : 'text-[#171717]'
                        }`}
                      >
                        {isCredit ? '+' : ''}
                        {formatINR(txn.amount, { decimals: 0 })}
                      </span>
                      <span className="text-[10px] text-[#78716C] uppercase font-semibold">Settled</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E7E5E4] flex items-center justify-between text-[12px] text-[#78716C]">
            <span>Double-entry ledger status:</span>
            <span className="font-semibold text-[#16803C] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16803C]" />
              Reconciled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
