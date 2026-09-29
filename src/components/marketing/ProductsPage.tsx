import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Product } from '../../types';
import {
  TrendingUp,
  TrendingDown,
  Search,
  ArrowRight,
  Star,
  Info,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, openBuySell, setSelectedProductId, setCurrentView, watchlist, toggleWatchlist } = useTrading();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'value-desc' | 'value-asc' | 'change-desc'>('value-desc');

  const categories = ['All', 'Category A', 'Category B', 'Category C'];

  const filtered = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'value-desc') return b.currentValue - a.currentValue;
      if (sortBy === 'value-asc') return a.currentValue - b.currentValue;
      if (sortBy === 'change-desc') return b.changePercent - a.changePercent;
      return 0;
    });

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header with Narrative: "Start with curiosity." */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#005EA8] tracking-wider uppercase">
            Marketplace Catalog
          </div>
          <h1 className="text-[38px] sm:text-[54px] font-extrabold text-[#171A17] tracking-tight leading-[1.08]">
            Start with curiosity.
          </h1>
          <p className="text-[17px] sm:text-[19px] text-[#5A5A53] leading-relaxed">
            There’s more to a product than a number. Explore listings with tangible context, verified unit availability, 24-hour activity, and direct settlement terms.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[18px] p-4 sm:p-5 mb-10 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#A3A29A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[13px] text-[#171A17] placeholder-[#A3A29A] focus:outline-[#005EA8] focus:bg-white"
              />
            </div>

            {/* Sort & Category Selectors */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1 p-1 bg-[#F7F6F2] border border-[#E2E1DA] rounded-[10px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-[7px] text-[12px] font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0070BA] text-[#0C0F0C] shadow-2xs'
                        : 'text-[#5A5A53] hover:text-[#171A17]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[13px] font-medium text-[#171A17] focus:outline-[#005EA8] cursor-pointer"
              >
                <option value="value-desc">Sort by highest value</option>
                <option value="value-asc">Sort by lowest value</option>
                <option value="change-desc">Sort by 24h gainers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const isPositive = product.changePercent >= 0;
            const inWatchlist = watchlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-[#FFFFFF] border border-[#CBCAC2] hover:border-[#0070BA] rounded-[20px] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Clean unboxed metadata header */}
                  <div className="flex items-center justify-between text-xs text-[#5A5A53] pb-3 border-b border-[#EFEEE9]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#005EA8]">{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{product.id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(product.id);
                        }}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          inWatchlist ? 'text-[#C77700]' : 'text-[#CBCAC2] hover:text-[#5A5A53]'
                        }`}
                        title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                      >
                        <Star className="w-3.5 h-3.5" fill={inWatchlist ? 'currentColor' : 'none'} />
                      </button>

                      <span
                        className={`font-semibold tabular-nums ${
                          isPositive ? 'text-[#0A7A45]' : 'text-[#BF2A2A]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {product.changePercent}%
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-[22px] font-bold text-[#171A17] group-hover:text-[#005EA8] transition-colors">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-[14px] text-[#5A5A53] leading-relaxed line-clamp-2">
                    {product.description || 'Verified product listing with structured supply quota.'}
                  </p>

                  {/* Valuation box */}
                  <div className="mt-6 p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-[#6B6B63] font-medium">Indicative unit value</span>
                      <span className="text-xs text-[#5A5A53]">
                        {product.availableUnits.toLocaleString()} units available
                      </span>
                    </div>
                    <div className="text-[26px] font-extrabold text-[#171A17] tabular-nums mt-1">
                      {formatINR(product.currentValue)}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#E2E1DA] grid grid-cols-2 gap-2 text-xs text-[#6B6B63]">
                      <div>
                        <span>24h Range</span>
                        <div className="font-semibold text-[#171A17] mt-0.5">
                          {formatINR(product.low24h)} – {formatINR(product.high24h)}
                        </div>
                      </div>
                      <div>
                        <span>24h Volume</span>
                        <div className="font-semibold text-[#171A17] mt-0.5">
                          {formatINR(product.volume24h)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 pt-4 border-t border-[#EFEEE9] flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setCurrentView('app-product-detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-2.5 text-center text-[13px] font-semibold text-[#171A17] bg-[#EFEEE9] hover:bg-[#E2E1DA] rounded-[10px] transition-colors cursor-pointer"
                  >
                    View details
                  </button>
                  <button
                    onClick={() => openBuySell('buy', product)}
                    className="flex-1 py-2.5 text-center text-[13px] font-bold text-[#0C0F0C] bg-[#0070BA] hover:bg-[#005EA8] rounded-[10px] transition-colors cursor-pointer shadow-2xs"
                  >
                    Trade unit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet Footnote */}
        <div className="mt-12 p-4 bg-[#FFFFFF] border border-[#E2E1DA] rounded-[14px] flex items-center justify-between text-xs text-[#5A5A53]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#6B6B63] shrink-0" />
            <span>
              All products listed are demonstration models designed to test marketplace workflows and do not represent real securities.
            </span>
          </div>

          <button
            onClick={() => {
              setCurrentView('app-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-[#005EA8] hover:underline cursor-pointer whitespace-nowrap ml-4"
          >
            Launch terminal preview →
          </button>
        </div>
      </div>
    </div>
  );
};
