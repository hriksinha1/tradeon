import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Product } from '../../types';
import { PercentageChange } from '../common/PercentageChange';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Search,
  ChevronRight,
} from 'lucide-react';

export const ProductShowcaseSection: React.FC = () => {
  const { products, openBuySell, setCurrentView, setSelectedProductId } = useTrading();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Category A', 'Category B', 'Category C'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 sm:py-24 bg-[#0B0E11] text-[#F5F5F5] border-b border-[#2B3139] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="text-[12px] font-bold text-[#F0B90B] tracking-wider uppercase">
              Market Catalog
            </div>
            <h2 className="text-[30px] sm:text-[42px] font-bold text-[#F5F5F5] tracking-tight leading-[1.12]">
              Explore verified product contracts.
            </h2>
            <p className="text-[16px] text-[#848E9C] leading-relaxed">
              Explore listings with transparent unit valuations, available supply quotas, and real-time book depth.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#848E9C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 h-8 pl-8 pr-3 bg-[#111418] border border-[#363C45] rounded-[4px] text-[12px] text-[#F5F5F5] placeholder-[#848E9C] focus:border-[#F0B90B] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 p-0.5 bg-[#111418] border border-[#2B3139] rounded-[4px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-[3px] text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]'
                      : 'text-[#848E9C] hover:text-[#F5F5F5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="p-5 bg-[#111418] border border-[#2B3139] hover:border-[#363C45] rounded-[6px] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2329]">
                  <span className="text-[10px] font-mono font-bold text-[#F0B90B] uppercase bg-[#302A15] px-1.5 py-0.5 rounded">
                    {p.id}
                  </span>
                  <span className="text-[11px] text-[#848E9C]">{p.category}</span>
                </div>

                <h3
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setCurrentView('app-product-detail');
                  }}
                  className="text-[17px] font-bold text-[#F5F5F5] hover:text-[#F0B90B] mt-2.5 cursor-pointer"
                >
                  {p.name}
                </h3>
                <p className="text-[12px] text-[#848E9C] line-clamp-2 mt-1 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#1E2329]">
                <div className="flex items-baseline justify-between tabular-nums">
                  <span className="text-[20px] font-bold text-[#F5F5F5]">
                    {formatINR(p.currentValue)}
                  </span>
                  <PercentageChange value={p.changePercent} pill />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setCurrentView('app-product-detail');
                    }}
                    className="py-1.5 px-3 bg-[#161A1E] hover:bg-[#1E2329] border border-[#363C45] text-[#F5F5F5] text-[12px] font-semibold rounded-[4px] transition-colors cursor-pointer text-center"
                  >
                    View Chart
                  </button>
                  <button
                    onClick={() => openBuySell('buy', p)}
                    className="py-1.5 px-3 bg-[#F0B90B] hover:bg-[#F8D12F] text-[#181A20] text-[12px] font-bold rounded-[4px] transition-colors cursor-pointer text-center shadow-xs"
                  >
                    Trade
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
