import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  ArrowLeft,
  Star,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Clock,
  Layers,
  Info,
  ArrowDownLeft,
  ArrowUpRight,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    positions,
    orders,
    watchlist,
    toggleWatchlist,
    setCurrentView,
    openBuySell,
    setSelectedProductId,
  } = useTrading();

  const [period, setPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const isWatchlisted = watchlist.includes(product.id);

  // Position in this product
  const holding = positions.find((p) => p.productId === product.id);

  // Orders for this product
  const productOrders = orders.filter((o) => o.productId === product.id);

  // Chart data
  const history = product.history[period] || product.history['1M'];
  const minVal = Math.min(...history);
  const maxVal = Math.max(...history);
  const range = maxVal - minVal || 1;

  const svgWidth = 640;
  const svgHeight = 220;

  const pathD = history
    .map((val, idx) => {
      const x = (idx / (history.length - 1)) * (svgWidth - 24) + 12;
      const y = svgHeight - 24 - ((val - minVal) / range) * (svgHeight - 48);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaD = `${pathD} L ${svgWidth - 12} ${svgHeight - 12} L 12 ${svgHeight - 12} Z`;

  // Related products
  const related = products.filter((p) => p.category === product.category && p.id !== product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('markets')}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6B6B6B] hover:text-[#171717] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <button
          onClick={() => toggleWatchlist(product.id)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-[8px] border text-[12px] font-semibold transition-colors ${
            isWatchlisted
              ? 'border-[#FEDF89] bg-[#FFFBEB] text-[#B7791F]'
              : 'border-[#E7E5E4] bg-white text-[#6B6B6B] hover:text-[#171717]'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-[#B7791F]' : ''}`} />
          <span>{isWatchlisted ? 'Watchlisted' : 'Add to Watchlist'}</span>
        </button>
      </div>

      {/* Main Product Header Card */}
      <div className="bg-white border border-[#E7E5E4] rounded-[20px] p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E7E5E4]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-bold text-[#005EA8] uppercase tracking-wider bg-[#F0FAFF] px-2.5 py-0.5 rounded-[6px] border border-[#DFF6FF]">
                {product.category}
              </span>
              <span className="text-[12px] text-[#78716C] font-mono">{product.id}</span>
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-bold text-[#171717] tracking-tight">
              {product.name}
            </h1>
            <p className="text-[14px] text-[#6B6B6B] max-w-xl mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Order CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:text-right">
            <div>
              <span className="text-[11px] text-[#78716C] uppercase font-bold tracking-wider block">
                Current Valuation
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-[32px] sm:text-[38px] font-bold text-[#171717] tabular-nums">
                  {formatINR(product.currentValue)}
                </span>
                <span
                  className={`text-[15px] font-bold tabular-nums flex items-center ${
                    product.changePercent >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
                  }`}
                >
                  {product.changePercent >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-0.5" />
                  )}
                  {product.changePercent >= 0 ? '+' : ''}
                  {product.changePercent}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="md"
                variant="positive"
                onClick={() => openBuySell('buy', product)}
                className="flex items-center gap-1.5"
              >
                <ArrowDownLeft className="w-4 h-4" />
                <span>Buy</span>
              </Button>
              <Button
                size="md"
                variant="negative"
                onClick={() => openBuySell('sell', product)}
                className="flex items-center gap-1.5"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Sell</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive Chart Section */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-bold text-[#78716C] uppercase tracking-wider">
              Historical Valuation Trend
            </span>
            <div className="flex items-center gap-1 bg-[#F5F5F4] p-1 rounded-[8px]">
              {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold transition-all ${
                    period === p
                      ? 'bg-white text-[#005EA8] shadow-2xs'
                      : 'text-[#6B6B6B] hover:text-[#171717]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart */}
          <div className="w-full h-56 sm:h-64 bg-[#F0FAFF]/50 rounded-[14px] p-3 border border-[#DFF6FF] relative overflow-hidden">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full preserve-3d">
              <defs>
                <linearGradient id="prodDetailGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#005EA8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#005EA8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d={areaD} fill="url(#prodDetailGrad)" />
              <path
                d={pathD}
                fill="none"
                stroke="#005EA8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E7E5E4] text-[13px]">
          <div className="p-3 bg-[#FAFAF9] rounded-[10px]">
            <span className="text-[#78716C] block text-[11px] font-semibold uppercase">24h High</span>
            <span className="font-bold text-[#171717] text-[15px] tabular-nums block mt-0.5">
              {formatINR(product.high24h)}
            </span>
          </div>
          <div className="p-3 bg-[#FAFAF9] rounded-[10px]">
            <span className="text-[#78716C] block text-[11px] font-semibold uppercase">24h Low</span>
            <span className="font-bold text-[#171717] text-[15px] tabular-nums block mt-0.5">
              {formatINR(product.low24h)}
            </span>
          </div>
          <div className="p-3 bg-[#FAFAF9] rounded-[10px]">
            <span className="text-[#78716C] block text-[11px] font-semibold uppercase">Available Units</span>
            <span className="font-bold text-[#171717] text-[15px] tabular-nums block mt-0.5">
              {product.availableUnits.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="p-3 bg-[#FAFAF9] rounded-[10px]">
            <span className="text-[#78716C] block text-[11px] font-semibold uppercase">24h Volume</span>
            <span className="font-bold text-[#171717] text-[15px] tabular-nums block mt-0.5">
              {formatINR(product.volume24h)}
            </span>
          </div>
        </div>
      </div>

      {/* Two Columns: User Position in this Product + Related Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Your Position in this Product */}
        <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 shadow-xs">
          <h3 className="text-[17px] font-bold text-[#171717] mb-3">Your Position in this Listing</h3>
          {holding ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#F0FAFF] border border-[#DFF6FF] rounded-[12px] text-[13px]">
                <div>
                  <span className="text-[#78716C] block text-[11px] font-semibold uppercase">Holding</span>
                  <span className="font-bold text-[#171717] text-[16px] tabular-nums">
                    {holding.quantity} units
                  </span>
                </div>
                <div>
                  <span className="text-[#78716C] block text-[11px] font-semibold uppercase">Average Cost</span>
                  <span className="font-bold text-[#171717] text-[16px] tabular-nums">
                    {formatINR(holding.averageValue)}
                  </span>
                </div>
                <div>
                  <span className="text-[#78716C] block text-[11px] font-semibold uppercase">Unrealized P&L</span>
                  <span
                    className={`font-bold text-[16px] tabular-nums ${
                      holding.pnl >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
                    }`}
                  >
                    {holding.pnl >= 0 ? '+' : ''}
                    {formatINR(holding.pnl)} ({holding.pnlPercent}%)
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button fullWidth onClick={() => openBuySell('buy', product)}>
                  Acquire More Units
                </Button>
                <Button fullWidth variant="outline" onClick={() => openBuySell('sell', product)}>
                  Liquidate Holding
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-[#78716C] space-y-3">
              <p className="text-[14px]">You do not currently hold any units of this listing.</p>
              <Button size="sm" onClick={() => openBuySell('buy', product)}>
                Initiate Position
              </Button>
            </div>
          )}
        </div>

        {/* Related Category Listings */}
        <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 shadow-xs">
          <h3 className="text-[17px] font-bold text-[#171717] mb-3">Related Category Listings</h3>
          <div className="space-y-2.5">
            {related.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedProductId(item.id);
                }}
                className="p-3 bg-[#FAFAF9] hover:bg-[#F0FAFF] border border-[#E7E5E4] hover:border-[#DFF6FF] rounded-[12px] cursor-pointer transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-[14px] text-[#171717] block">{item.name}</span>
                  <span className="text-[11px] text-[#78716C] font-mono">{item.id}</span>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
