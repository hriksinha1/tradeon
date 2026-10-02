import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
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
    <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Marketplace Catalog
          </div>
          <h1 className="text-[34px] sm:text-[48px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.08]">
            Start with curiosity.
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            There’s more to a product than a number. Explore listings with tangible context, verified unit availability, 24-hour activity, and direct settlement terms.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#161A1E] border border-[#2B3139] rounded-[8px] p-4 mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#848E9C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#111418] border border-[#2B3139] rounded-[6px] text-xs text-[#F5F5F5] placeholder-[#848E9C] focus:outline-[#F0B90B] focus:border-[#F0B90B]"
              />
            </div>

            {/* Sort & Category Selectors */}
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <div className="flex items-center gap-1 p-1 bg-[#111418] border border-[#2B3139] rounded-[6px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#F0B90B] text-[#181A20]'
                        : 'text-[#848E9C] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-[#111418] border border-[#2B3139] rounded-[6px] text-xs font-medium text-[#F5F5F5] focus:outline-[#F0B90B] cursor-pointer"
              >
                <option value="value-desc">Sort by highest value</option>
                <option value="value-asc">Sort by lowest value</option>
                <option value="change-desc">Sort by 24h gainers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => {
            const isPositive = product.changePercent >= 0;
            const inWatchlist = watchlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-[#161A1E] border border-[#2B3139] hover:border-[#363C45] rounded-[10px] p-5 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Clean unboxed metadata header */}
                  <div className="flex items-center justify-between text-xs text-[#848E9C] pb-3 border-b border-[#2B3139]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#F0B90B]">{product.category}</span>
                      <span aria-hidden="true" className="text-[#363C45]">·</span>
                      <span className="font-mono text-[#848E9C]">{product.id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(product.id);
                        }}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          inWatchlist ? 'text-[#F0B90B]' : 'text-[#5E6673] hover:text-[#B7BDC6]'
                        }`}
                        title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                      >
                        <Star className="w-3.5 h-3.5" fill={inWatchlist ? 'currentColor' : 'none'} />
                      </button>

                      <span
                        className={`font-semibold tabular-nums font-mono text-xs ${
                          isPositive ? 'text-[#0ECB81]' : 'text-[#F6465D]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {product.changePercent}%
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-3.5 text-[18px] font-bold text-[#F5F5F5] group-hover:text-[#F0B90B] transition-colors">
                    {product.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#848E9C] leading-relaxed line-clamp-2">
                    {product.description || 'Verified product listing with structured supply quota.'}
                  </p>

                  {/* Valuation box */}
                  <div className="mt-4 p-3.5 bg-[#111418] rounded-[6px] border border-[#2B3139]">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[11px] text-[#848E9C] font-medium">Indicative unit value</span>
                      <span className="text-[11px] text-[#848E9C] font-mono">
                        {product.availableUnits.toLocaleString()} units
                      </span>
                    </div>
                    <div className="text-[22px] font-extrabold text-[#F5F5F5] tabular-nums font-mono mt-0.5">
                      {formatINR(product.currentValue)}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#2B3139] grid grid-cols-2 gap-2 text-[11px] text-[#848E9C]">
                      <div>
                        <span>24h Range</span>
                        <div className="font-semibold text-[#B7BDC6] mt-0.5 font-mono">
                          {formatINR(product.low24h)} – {formatINR(product.high24h)}
                        </div>
                      </div>
                      <div>
                        <span>24h Volume</span>
                        <div className="font-semibold text-[#B7BDC6] mt-0.5 font-mono">
                          {formatINR(product.volume24h)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-5 pt-3.5 border-t border-[#2B3139] flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setCurrentView('app-product-detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-2 text-center text-xs font-semibold text-[#B7BDC6] bg-[#1E2329] hover:bg-[#23282F] hover:text-[#F5F5F5] rounded-[6px] border border-[#2B3139] transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => openBuySell('buy', product)}
                    className="flex-1 py-2 text-center text-xs font-bold text-[#181A20] bg-[#F0B90B] hover:bg-[#F8D12F] rounded-[6px] transition-colors cursor-pointer shadow-sm"
                  >
                    Trade Unit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-10 p-4 bg-[#161A1E] border border-[#2B3139] rounded-[8px] flex items-center justify-between text-xs text-[#848E9C]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#F0B90B] shrink-0" />
            <span>
              All products listed are demonstration models designed to test marketplace workflows and do not represent real securities.
            </span>
          </div>

          <button
            onClick={() => {
              setCurrentView('app-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-[#F0B90B] hover:underline cursor-pointer whitespace-nowrap ml-4"
          >
            Launch terminal preview →
          </button>
        </div>
      </div>
    </div>
  );
};
