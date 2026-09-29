import React, { useState, useMemo } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Search, Star, ArrowUpDown, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';
import { Product } from '../../types';

export const MarketsView: React.FC = () => {
  const {
    products,
    watchlist,
    toggleWatchlist,
    setCurrentView,
    setSelectedProductId,
    openBuySell,
  } = useTrading();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'popular' | 'trending' | 'new'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'value-desc' | 'value-asc' | 'change-desc' | 'volume'>('value-desc');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesTab =
          selectedTab === 'all' ||
          (selectedTab === 'popular' && p.volume24h > 1500000) ||
          (selectedTab === 'trending' && Math.abs(p.changePercent) > 1.0) ||
          (selectedTab === 'new' && (p.id === 'PRISM-11' || p.id === 'ZENITH-05'));
        return matchesQuery && matchesCategory && matchesTab;
      })
      .sort((a, b) => {
        if (sortBy === 'value-desc') return b.currentValue - a.currentValue;
        if (sortBy === 'value-asc') return a.currentValue - b.currentValue;
        if (sortBy === 'change-desc') return b.changePercent - a.changePercent;
        if (sortBy === 'volume') return b.volume24h - a.volume24h;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, selectedTab, sortBy]);

  const categories = ['all', 'Category A', 'Category B', 'Category C'];

  const handleSelectProduct = (p: Product) => {
    setSelectedProductId(p.id);
    setCurrentView('product-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Marketplace & Products</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-0.5">
            Discover verified business-supplied products, check valuations, and execute trades.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#78716C] bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-[8px] font-semibold">
            {products.length} Active Listings
          </span>
        </div>
      </div>

      {/* Control Bar: Search, Category Chips, Sort */}
      <div className="bg-white border border-[#E7E5E4] rounded-[16px] p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#78716C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, code (e.g. ATLAS-01)..."
              className="w-full pl-9 pr-4 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[10px] text-[13px] text-[#171717] focus:outline-[#087A4A] focus:bg-white transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[12px] text-[#78716C]">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[8px] text-[13px] font-semibold text-[#171717] focus:outline-[#087A4A]"
            >
              <option value="value-desc">Highest Valuation</option>
              <option value="value-asc">Lowest Valuation</option>
              <option value="change-desc">Top Gainers (%)</option>
              <option value="volume">Highest 24h Volume</option>
            </select>
          </div>
        </div>

        {/* Tab filters and Category segmented bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E7E5E4]">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-0.5 bg-[#F5F5F4] rounded-[8px]">
            {(['all', 'popular', 'trending', 'new'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold capitalize transition-all ${
                  selectedTab === tab ? 'bg-white text-[#087A4A] shadow-2xs' : 'text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-[8px] text-[12px] font-medium border transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'border-[#087A4A] bg-[#E9FAF1] text-[#087A4A] font-semibold'
                    : 'border-[#E7E5E4] bg-white text-[#6B6B6B] hover:text-[#171717]'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Data Grid / Table */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#FAFAF9] border-b border-[#E7E5E4] text-[#78716C] font-bold text-[12px]">
              <tr>
                <th className="py-3 px-4 w-10"></th>
                <th className="py-3 px-4">Product Name & Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Valuation</th>
                <th className="py-3 px-4">24h Movement</th>
                <th className="py-3 px-4">24h Range (Low - High)</th>
                <th className="py-3 px-4">Available Supply</th>
                <th className="py-3 px-4 text-right">Quick Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4]">
              {filteredProducts.map((prod) => {
                const isWatchlisted = watchlist.includes(prod.id);
                return (
                  <tr
                    key={prod.id}
                    className="hover:bg-[#E9FAF1]/60 transition-colors group cursor-pointer"
                    onClick={() => handleSelectProduct(prod)}
                  >
                    {/* Star / Watchlist toggle */}
                    <td
                      className="py-3.5 px-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(prod.id);
                      }}
                    >
                      <button
                        className="p-1 text-[#D6D3D1] hover:text-[#B7791F] transition-colors"
                        title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            isWatchlisted ? 'text-[#B7791F] fill-[#B7791F]' : ''
                          }`}
                        />
                      </button>
                    </td>

                    {/* Product Name */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[15px] text-[#171717] group-hover:text-[#087A4A] block leading-tight">
                        {prod.name}
                      </span>
                      <span className="text-[11px] text-[#78716C] font-mono mt-0.5 block">
                        {prod.id}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-[#57534E]">
                      <span className="text-[12px] font-medium">{prod.category}</span>
                    </td>

                    {/* Valuation */}
                    <td className="py-3.5 px-4">
                      <span className="text-[15px] font-bold text-[#171717] tabular-nums block">
                        {formatINR(prod.currentValue)}
                      </span>
                    </td>

                    {/* 24h Movement */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-bold tabular-nums block ${
                          prod.changePercent >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
                        }`}
                      >
                        {prod.changePercent >= 0 ? '+' : ''}
                        {prod.changePercent}%
                      </span>
                      <span className="text-[11px] text-[#78716C] tabular-nums">
                        {prod.change >= 0 ? '+' : ''}
                        {formatINR(prod.change)}
                      </span>
                    </td>

                    {/* 24h Range */}
                    <td className="py-3.5 px-4 text-[12px] tabular-nums text-[#57534E]">
                      <span>{formatINR(prod.low24h)}</span>
                      <span className="text-[#A8A29E] mx-1">—</span>
                      <span>{formatINR(prod.high24h)}</span>
                    </td>

                    {/* Available supply */}
                    <td className="py-3.5 px-4 text-[12px] font-medium text-[#57534E] tabular-nums">
                      {prod.availableUnits.toLocaleString('en-IN')} units
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openBuySell('buy', prod)}
                          className="px-3 py-1 text-[12px] font-semibold text-[#16803C] bg-[#ECFDF3] border border-[#A6F4C5] rounded-[7px] hover:bg-[#D1FADF] transition-colors"
                        >
                          Buy
                        </button>
                        <button
                          onClick={() => openBuySell('sell', prod)}
                          className="px-3 py-1 text-[12px] font-semibold text-[#C62828] bg-[#FEF2F2] border border-[#FECDCA] rounded-[7px] hover:bg-[#FEE4E2] transition-colors"
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-[#78716C] space-y-2">
            <p className="text-[15px] font-semibold">No products found matching your filter</p>
            <p className="text-[13px]">Try clearing your search query or switching categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTab('all');
              }}
              className="text-[13px] font-semibold text-[#087A4A] underline mt-1"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
