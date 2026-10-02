import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import { PercentageChange } from '../common/PercentageChange';
import { PriceDisplay } from '../common/PriceDisplay';
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
  Wallet,
  ArrowLeftRight,
  ShieldCheck,
  Activity,
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
    setIsWithdrawOpen,
    openTransactionDetail,
  } = useTrading();

  const [chartPeriod, setChartPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');

  // Chart points simulation
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

  // SVG coordinates
  const svgWidth = 620;
  const svgHeight = 150;
  const pathD = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * (svgWidth - 20) + 10;
      const y = svgHeight - 15 - ((val - minVal) / range) * (svgHeight - 30);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaD = `${pathD} L ${svgWidth - 10} ${svgHeight} L 10 ${svgHeight} Z`;

  const watchlistProducts = products.filter((p) => watchlist.includes(p.id));
  const totalPnL = positions.reduce((acc, p) => acc + p.pnl, 0);
  const totalPnLPercent = wallet.investedValue > 0 ? (totalPnL / wallet.investedValue) * 100 : 0;

  return (
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-5 space-y-5 bg-white text-[#181A20]">
      {/* Top Ticker Bar */}
      <div className="bg-[#F5F6F8] border border-[#DFE2E6] rounded-[6px] p-2.5 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max text-xs">
          <div className="flex items-center gap-2 pr-4 border-r border-[#DFE2E6] text-[#707A8A]">
            <Activity className="w-3.5 h-3.5 text-[#B78103]" />
            <span className="font-semibold text-[#181A20]">Market Pulse</span>
          </div>
          {products.slice(0, 5).map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedProductId(p.id);
                setCurrentView('app-product-detail');
              }}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="font-semibold text-[#181A20]">{p.id}</span>
              <span className="tabular-nums font-mono text-[#474D57]">{formatINR(p.currentValue)}</span>
              <PercentageChange value={p.changePercent} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Left (Portfolio Summary + Chart) | Right (Quick Watchlist & Terminal Jump) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Portfolio Master Card (2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-[#DFE2E6] rounded-[8px] p-5 space-y-4 shadow-xs">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAECEF]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] uppercase font-semibold tracking-wider text-[#707A8A]">
                  Estimated Portfolio Balance
                </span>
                <span className="text-[11px] font-mono text-[#946800] bg-[#FEF6D8] border border-[#FCDD80] px-1.5 py-0.2 rounded font-bold">
                  INR
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-1.5">
                <span className="text-[28px] sm:text-[34px] font-bold text-[#181A20] tracking-tight tabular-nums font-mono">
                  {formatINR(wallet.totalValue)}
                </span>
                <span className="text-[13px] font-semibold text-[#02A063] flex items-center gap-1 tabular-nums font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+₹6,840 (+1.42% Today)</span>
                </span>
              </div>
            </div>

            {/* Quick Action CTAs */}
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
                className="h-8 cursor-pointer"
              >
                Withdraw
              </Button>
              <Button
                size="xs"
                variant="buy"
                onClick={() => openBuySell('buy')}
                className="flex items-center gap-1 h-8 cursor-pointer"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Trade</span>
              </Button>
            </div>
          </div>

          {/* Submetrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-xs border-b border-[#EAECEF]">
            <div>
              <span className="text-[#707A8A] block">Available Cash</span>
              <span className="font-semibold text-[#181A20] text-[15px] tabular-nums font-mono block mt-0.5">
                {formatINR(wallet.availableBalance)}
              </span>
            </div>
            <div>
              <span className="text-[#707A8A] block">Active Positions Value</span>
              <span className="font-semibold text-[#181A20] text-[15px] tabular-nums font-mono block mt-0.5">
                {formatINR(wallet.investedValue)}
              </span>
            </div>
            <div>
              <span className="text-[#707A8A] block">Total Unrealized P&L</span>
              <span className={`font-semibold text-[15px] tabular-nums font-mono block mt-0.5 ${totalPnL >= 0 ? 'text-[#02A063]' : 'text-[#CF304A]'}`}>
                {totalPnL >= 0 ? '+' : ''}{formatINR(totalPnL)} ({totalPnLPercent.toFixed(2)}%)
              </span>
            </div>
            <div>
              <span className="text-[#707A8A] block">Margin / Risk Ratio</span>
              <span className="font-semibold text-[#02A063] text-[15px] tabular-nums block mt-0.5">
                Low (99.8% Safe)
              </span>
            </div>
          </div>

          {/* Performance Chart with Period Controls */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#707A8A] uppercase tracking-wider font-mono">
                Equity Curve & Valuation
              </span>
              <div className="flex items-center gap-1 bg-[#F5F6F8] p-0.5 rounded-[4px] border border-[#DFE2E6]">
                {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-2 py-0.5 rounded-[3px] text-[11px] font-semibold transition-all cursor-pointer ${
                      chartPeriod === period
                        ? 'bg-white text-[#181A20] font-bold shadow-xs border border-[#DFE2E6]'
                        : 'text-[#707A8A] hover:text-[#181A20]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Area Chart */}
            <div className="w-full h-36 relative overflow-hidden bg-[#FAFAFA] rounded-[6px] border border-[#DFE2E6] p-2">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full preserve-3d">
                <defs>
                  <linearGradient id="dashboardChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F0B90B" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#F0B90B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d={areaD} fill="url(#dashboardChartGrad)" />
                <path
                  d={pathD}
                  fill="none"
                  stroke="#E5A800"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Watchlist & Quick Trade Actions (1 Column) */}
        <div className="bg-white border border-[#DFE2E6] rounded-[8px] p-5 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EAECEF]">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#F0B90B] fill-[#F0B90B]" />
                <h3 className="text-sm font-bold text-[#181A20]">Watchlist</h3>
              </div>
              <button
                onClick={() => setCurrentView('app-markets')}
                className="text-xs font-semibold text-[#B78103] hover:underline cursor-pointer"
              >
                All Markets
              </button>
            </div>

            {/* Watchlist Rows */}
            <div className="divide-y divide-[#EAECEF] mt-1">
              {watchlistProducts.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="py-2.5 flex items-center justify-between hover:bg-[#F5F6F8] px-2 rounded-[4px] transition-colors"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedProductId(item.id);
                      setCurrentView('app-product-detail');
                    }}
                  >
                    <span className="font-semibold text-[13px] text-[#181A20] hover:text-[#B78103] block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-[#707A8A] font-mono">{item.id}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[13px] font-semibold text-[#181A20] tabular-nums font-mono block">
                      {formatINR(item.currentValue)}
                    </span>
                    <PercentageChange value={item.changePercent} />
                  </div>

                  <div className="pl-2">
                    <button
                      onClick={() => openBuySell('buy', item)}
                      className="px-2.5 py-1 text-[11px] font-bold text-[#181A20] bg-[#F0B90B] hover:bg-[#F8D12F] rounded-[4px] transition-colors cursor-pointer shadow-xs"
                    >
                      Trade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Terminal Options Jump */}
          <div className="p-3 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[6px] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#B78103] uppercase block font-mono">Options Hub</span>
              <span className="text-xs text-[#474D57] font-medium">Trade Call & Put derivatives</span>
            </div>
            <Button
              size="xs"
              variant="secondary"
              onClick={() => setCurrentView('app-options')}
              className="flex items-center gap-1 cursor-pointer"
            >
              <span>Explore</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Second Row: Active Holdings Table (2 Col) + Recent Ledger Stream (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Holdings Table */}
        <div className="lg:col-span-2 bg-white border border-[#DFE2E6] rounded-[8px] p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAECEF]">
            <div>
              <h3 className="text-sm font-bold text-[#181A20]">Active Positions</h3>
              <p className="text-xs text-[#707A8A]">Real-time marked-to-market holdings</p>
            </div>
            <button
              onClick={() => setCurrentView('app-portfolio')}
              className="text-xs font-semibold text-[#B78103] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Full Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#DFE2E6] text-[#707A8A] bg-[#F5F6F8] text-[11px] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Asset</th>
                  <th className="py-2.5 px-3">Holdings</th>
                  <th className="py-2.5 px-3">Avg Cost</th>
                  <th className="py-2.5 px-3">Market Price</th>
                  <th className="py-2.5 px-3">Unrealized P&L</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECEF]">
                {positions.map((pos) => {
                  const product = products.find((p) => p.id === pos.productId);
                  return (
                    <tr key={pos.id} className="hover:bg-[#F8F9FA] transition-colors">
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-[#181A20] block">{pos.productName}</span>
                        <span className="text-[11px] text-[#707A8A] font-mono">{pos.productId}</span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[#181A20] tabular-nums font-mono">
                        {pos.quantity} units
                      </td>
                      <td className="py-2.5 px-3 tabular-nums text-[#707A8A] font-mono">
                        {formatINR(pos.averageValue)}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[#181A20] tabular-nums font-mono">
                        {formatINR(pos.currentValue)}
                      </td>
                      <td className="py-2.5 px-3 font-mono">
                        <span
                          className={`font-semibold tabular-nums block ${
                            pos.pnl >= 0 ? 'text-[#02A063]' : 'text-[#CF304A]'
                          }`}
                        >
                          {pos.pnl >= 0 ? '+' : ''}
                          {formatINR(pos.pnl)}
                        </span>
                        <span
                          className={`text-[11px] tabular-nums ${
                            pos.pnlPercent >= 0 ? 'text-[#02A063]' : 'text-[#CF304A]'
                          }`}
                        >
                          {pos.pnlPercent >= 0 ? '+' : ''}
                          {pos.pnlPercent}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openBuySell('buy', product)}
                            className="px-2 py-0.5 text-[11px] font-semibold text-[#02A063] bg-[#EBFBF3] border border-[#A2E8C6] rounded-[4px] hover:bg-[#D7F5E7] transition-colors cursor-pointer"
                          >
                            Buy
                          </button>
                          <button
                            onClick={() => openBuySell('sell', product)}
                            className="px-2 py-0.5 text-[11px] font-semibold text-[#CF304A] bg-[#FDF0F2] border border-[#F7B5BE] rounded-[4px] hover:bg-[#FCE2E5] transition-colors cursor-pointer"
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

        {/* Ledger Activity Stream */}
        <div className="bg-white border border-[#DFE2E6] rounded-[8px] p-5 flex flex-col justify-between space-y-3 shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EAECEF]">
              <h3 className="text-sm font-bold text-[#181A20]">Recent Activity</h3>
              <button
                onClick={() => setCurrentView('app-ledger')}
                className="text-xs font-semibold text-[#B78103] hover:underline cursor-pointer"
              >
                All Ledger
              </button>
            </div>

            <div className="divide-y divide-[#EAECEF] mt-1">
              {transactions.slice(0, 4).map((txn) => {
                const isCredit = txn.amount > 0;
                return (
                  <div
                    key={txn.id}
                    onClick={() => openTransactionDetail(txn)}
                    className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-[#F5F6F8] px-2 rounded-[4px] transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-xs text-[#181A20] block line-clamp-1">
                        {txn.description}
                      </span>
                      <span className="text-[11px] text-[#707A8A] font-mono">
                        {txn.id} · {txn.time}
                      </span>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <span
                        className={`text-xs font-semibold tabular-nums font-mono block ${
                          isCredit ? 'text-[#02A063]' : 'text-[#181A20]'
                        }`}
                      >
                        {isCredit ? '+' : ''}
                        {formatINR(txn.amount)}
                      </span>
                      <span className="text-[10px] text-[#02A063] uppercase font-semibold font-mono">Settled</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#EAECEF] flex items-center justify-between text-[11px] text-[#707A8A]">
            <span>Ledger status:</span>
            <span className="font-semibold text-[#02A063] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02A063]" />
              Double-Entry Reconciled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
