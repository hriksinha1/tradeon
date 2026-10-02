import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Search, Star, TrendingDown, TrendingUp, Sparkles, Flame, SlidersHorizontal } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';
import { formatINR, formatVolume, formatPercent } from '../../constants/designTokens';
import { PercentageChange } from '../common/PercentageChange';
import { Button } from '../common/Button';
import { Product } from '../../types';

const tabs = ['all', 'popular', 'top-gainers', 'top-losers', 'most-active', 'watchlist'] as const;
type MarketTab = (typeof tabs)[number];

export const MarketsView: React.FC = () => {
  const { products, watchlist, toggleWatchlist, setCurrentView, setSelectedProductId, openBuySell } = useTrading();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<MarketTab>('all');
  const [category, setCategory] = useState('all');
  const [sortField, setSortField] = useState<'currentValue' | 'changePercent' | 'volume24h' | 'high24h'>('volume24h');
  const [sortAsc, setSortAsc] = useState(false);

  // Top highlight metrics
  const topGainer = useMemo(() => [...products].sort((a, b) => b.changePercent - a.changePercent)[0], [products]);
  const mostActive = useMemo(() => [...products].sort((a, b) => b.volume24h - a.volume24h)[0], [products]);
  const highestPrice = useMemo(() => [...products].sort((a, b) => b.currentValue - a.currentValue)[0], [products]);

  const visibleProducts = useMemo(() => {
    return products
      .filter((product) => {
        const text = `${product.name} ${product.id} ${product.category}`.toLowerCase();
        const matchesQuery = text.includes(query.toLowerCase());
        const matchesCategory = category === 'all' || product.category === category;

        let matchesTab = true;
        if (tab === 'popular') matchesTab = product.volume24h >= 1500000;
        else if (tab === 'top-gainers') matchesTab = product.changePercent > 0;
        else if (tab === 'top-losers') matchesTab = product.changePercent < 0;
        else if (tab === 'most-active') matchesTab = product.volume24h >= 1800000;
        else if (tab === 'watchlist') matchesTab = watchlist.includes(product.id);

        return matchesQuery && matchesCategory && matchesTab;
      })
      .sort((a, b) => {
        const factor = sortAsc ? 1 : -1;
        return (a[sortField] - b[sortField]) * factor;
      });
  }, [products, query, tab, category, sortField, sortAsc, watchlist]);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const openProduct = (product: Product) => {
    setSelectedProductId(product.id);
    setCurrentView('app-product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-5 space-y-5 select-none">
      {/* Page Header & Top Summary Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#F5F5F5] tracking-tight">
            Markets Overview
          </h1>
          <p className="text-[13px] text-[#848E9C]">
            Live order books, 24h volumes, and execution prices across verified product contracts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-mono text-[#848E9C] border border-[#2B3139] bg-[#111418] px-2.5 py-1 rounded-[4px]">
            {products.length} Contracts Listed
          </span>
        </div>
      </div>

      {/* Top 3 Market Spotlight Cards (Binance-style highlight row) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {topGainer && (
          <div
            onClick={() => openProduct(topGainer)}
            className="p-3 bg-[#111418] border border-[#2B3139] hover:border-[#363C45] rounded-[6px] cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between text-[11px] text-[#848E9C]">
              <span className="flex items-center gap-1 font-semibold text-[#0ECB81]">
                <TrendingUp className="w-3.5 h-3.5" /> Top Gainer
              </span>
              <span>24h Vol: {formatVolume(topGainer.volume24h)}</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-bold text-[15px] text-[#F5F5F5]">{topGainer.name}</span>
              <PercentageChange value={topGainer.changePercent} />
            </div>
            <div className="text-[13px] font-semibold text-[#848E9C] mt-0.5 tabular-nums">
              {formatINR(topGainer.currentValue)}
            </div>
          </div>
        )}

        {mostActive && (
          <div
            onClick={() => openProduct(mostActive)}
            className="p-3 bg-[#111418] border border-[#2B3139] hover:border-[#363C45] rounded-[6px] cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between text-[11px] text-[#848E9C]">
              <span className="flex items-center gap-1 font-semibold text-[#F0B90B]">
                <Flame className="w-3.5 h-3.5" /> Most Active (24h)
              </span>
              <span>Units: {topGainer.availableUnits}</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-bold text-[15px] text-[#F5F5F5]">{mostActive.name}</span>
              <PercentageChange value={mostActive.changePercent} />
            </div>
            <div className="text-[13px] font-semibold text-[#848E9C] mt-0.5 tabular-nums">
              {formatINR(mostActive.currentValue)}
            </div>
          </div>
        )}

        {highestPrice && (
          <div
            onClick={() => openProduct(highestPrice)}
            className="p-3 bg-[#111418] border border-[#2B3139] hover:border-[#363C45] rounded-[6px] cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between text-[11px] text-[#848E9C]">
              <span className="flex items-center gap-1 font-semibold text-[#4C8FFF]">
                <Sparkles className="w-3.5 h-3.5" /> Prime Contract
              </span>
              <span>24h High: {formatINR(highestPrice.high24h)}</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="font-bold text-[15px] text-[#F5F5F5]">{highestPrice.name}</span>
              <PercentageChange value={highestPrice.changePercent} />
            </div>
            <div className="text-[13px] font-semibold text-[#848E9C] mt-0.5 tabular-nums">
              {formatINR(highestPrice.currentValue)}
            </div>
          </div>
        )}
      </div>

      {/* Filter and Tab Bar */}
      <div className="bg-[#111418] border border-[#2B3139] rounded-[6px] p-3 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Market Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`px-3 py-1.5 rounded-[4px] text-[12px] font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  tab === item
                    ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]'
                    : 'text-[#848E9C] hover:text-[#F5F5F5]'
                }`}
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Search Bar + Category Selector */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#848E9C]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search markets..."
                className="w-full h-8 pl-8 pr-3 rounded-[4px] bg-[#161A1E] border border-[#2B3139] text-[#F5F5F5] text-[12px] focus:border-[#F0B90B] focus:outline-none"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-8 px-2.5 rounded-[4px] bg-[#161A1E] border border-[#2B3139] text-[#848E9C] hover:text-[#F5F5F5] text-[12px] focus:border-[#F0B90B] focus:outline-none cursor-pointer"
            >
              <option value="all">All Sectors</option>
              <option value="Category A">Category A</option>
              <option value="Category B">Category B</option>
              <option value="Category C">Category C</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Markets Data Table (Binance High-Density Format) */}
      <div className="hidden md:block bg-[#111418] border border-[#2B3139] rounded-[6px] overflow-hidden">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#161A1E] border-b border-[#2B3139] text-[#848E9C] text-[11px] uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-2.5 pl-4 pr-2 w-10">Fav</th>
              <th className="py-2.5 px-3">
                <button
                  onClick={() => handleSort('currentValue')}
                  className="flex items-center gap-1 hover:text-[#F5F5F5] cursor-pointer"
                >
                  <span>Asset / Contract</span>
                </button>
              </th>
              <th className="py-2.5 px-3">
                <button
                  onClick={() => handleSort('currentValue')}
                  className="flex items-center gap-1 hover:text-[#F5F5F5] cursor-pointer"
                >
                  <span>Last Price</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-2.5 px-3">
                <button
                  onClick={() => handleSort('changePercent')}
                  className="flex items-center gap-1 hover:text-[#F5F5F5] cursor-pointer"
                >
                  <span>24h Change</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-2.5 px-3">
                <button
                  onClick={() => handleSort('high24h')}
                  className="flex items-center gap-1 hover:text-[#F5F5F5] cursor-pointer"
                >
                  <span>24h High / Low</span>
                </button>
              </th>
              <th className="py-2.5 px-3">
                <button
                  onClick={() => handleSort('volume24h')}
                  className="flex items-center gap-1 hover:text-[#F5F5F5] cursor-pointer"
                >
                  <span>24h Volume</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-2.5 px-3 text-center">Trend (7D)</th>
              <th className="py-2.5 pr-4 text-right">Trade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2329]">
            {visibleProducts.map((p) => {
              const isWatched = watchlist.includes(p.id);
              const history = p.history['1W'] || [p.currentValue, p.currentValue];
              const min = Math.min(...history);
              const max = Math.max(...history);
              const range = max - min || 1;

              // Sparkline points
              const sparkD = history
                .map((val, i) => {
                  const x = (i / (history.length - 1)) * 60 + 2;
                  const y = 22 - ((val - min) / range) * 18;
                  return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                })
                .join(' ');

              const isUp = p.changePercent >= 0;

              return (
                <tr
                  key={p.id}
                  onClick={() => openProduct(p)}
                  className="hover:bg-[#161A1E] transition-colors cursor-pointer group"
                >
                  {/* Favorite Star */}
                  <td className="py-3 pl-4 pr-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(p.id);
                      }}
                      className="text-[#848E9C] hover:text-[#F0B90B] transition-colors"
                      aria-label="Toggle Watchlist"
                    >
                      <Star
                        className="w-4 h-4"
                        fill={isWatched ? '#F0B90B' : 'none'}
                        color={isWatched ? '#F0B90B' : 'currentColor'}
                      />
                    </button>
                  </td>

                  {/* Asset Symbol & Name */}
                  <td className="py-3 px-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-[#F5F5F5] group-hover:text-[#F0B90B] text-[14px]">
                        {p.id}
                      </span>
                      <span className="text-[12px] text-[#848E9C] truncate max-w-[140px]">{p.name}</span>
                    </div>
                    <span className="text-[11px] text-[#5E6673]">{p.category}</span>
                  </td>

                  {/* Last Price */}
                  <td className="py-3 px-3 font-semibold text-[#F5F5F5] tabular-nums text-[14px]">
                    {formatINR(p.currentValue)}
                  </td>

                  {/* 24h Change */}
                  <td className="py-3 px-3">
                    <PercentageChange value={p.changePercent} pill />
                  </td>

                  {/* 24h High / Low */}
                  <td className="py-3 px-3 tabular-nums text-[12px]">
                    <div className="text-[#848E9C]">H: <span className="text-[#F5F5F5] font-medium">{formatINR(p.high24h)}</span></div>
                    <div className="text-[#848E9C]">L: <span className="text-[#F5F5F5] font-medium">{formatINR(p.low24h)}</span></div>
                  </td>

                  {/* Volume */}
                  <td className="py-3 px-3 tabular-nums text-[12px]">
                    <div className="font-medium text-[#F5F5F5]">{formatINR(p.volume24h)}</div>
                    <div className="text-[#848E9C]">{p.availableUnits} units</div>
                  </td>

                  {/* 7D Sparkline */}
                  <td className="py-3 px-3 text-center">
                    <div className="inline-block w-[64px] h-[24px]">
                      <svg viewBox="0 0 64 24" className="w-full h-full overflow-visible">
                        <path
                          d={sparkD}
                          fill="none"
                          stroke={isUp ? '#0ECB81' : '#F6465D'}
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </td>

                  {/* Trade Action Button */}
                  <td className="py-3 pr-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openBuySell('buy', p);
                      }}
                      className="px-3 py-1 bg-[#1E2329] hover:bg-[#F0B90B] text-[#F5F5F5] hover:text-[#181A20] font-bold text-[12px] rounded-[4px] border border-[#363C45] hover:border-[#F0B90B] transition-all cursor-pointer shadow-xs"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Markets List (Compact Cards) */}
      <div className="md:hidden space-y-2">
        {visibleProducts.map((p) => {
          const isWatched = watchlist.includes(p.id);
          return (
            <div
              key={p.id}
              onClick={() => openProduct(p)}
              className="p-3 bg-[#111418] border border-[#2B3139] rounded-[6px] space-y-2 cursor-pointer hover:border-[#363C45] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(p.id);
                    }}
                    className="text-[#848E9C]"
                  >
                    <Star
                      className="w-4 h-4"
                      fill={isWatched ? '#F0B90B' : 'none'}
                      color={isWatched ? '#F0B90B' : 'currentColor'}
                    />
                  </button>
                  <div>
                    <span className="font-bold text-[14px] text-[#F5F5F5]">{p.id}</span>
                    <span className="text-[11px] text-[#848E9C] block">{p.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[14px] text-[#F5F5F5] tabular-nums">
                    {formatINR(p.currentValue)}
                  </div>
                  <PercentageChange value={p.changePercent} />
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E2329] flex items-center justify-between text-[11px] text-[#848E9C]">
                <span>24h Vol: {formatVolume(p.volume24h)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openBuySell('buy', p);
                  }}
                  className="px-2.5 py-1 bg-[#F0B90B] text-[#181A20] font-bold rounded-[3px]"
                >
                  Trade
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {visibleProducts.length === 0 && (
        <div className="p-8 text-center bg-[#111418] border border-[#2B3139] rounded-[6px] text-[#848E9C] text-[13px]">
          No markets found matching your filters.
        </div>
      )}
    </div>
  );
};

export default MarketsView;
