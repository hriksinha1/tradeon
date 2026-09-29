import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Product } from '../../types';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Search,
  Info,
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
    <section className="py-20 sm:py-32 bg-[#F7F6F2] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
              Product Discovery
            </div>
            <h2 className="text-[34px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
              Start with curiosity.
            </h2>
            <p className="text-[17px] text-[#5A5A53] leading-relaxed">
              Explore listings with transparent unit valuations, available supply limits, and visible 24-hour activity. Every listing provides clear context before you decide.
            </p>
          </div>

          {/* Interactive Filter & Search Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#A3A29A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products or IDs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-60 pl-9 pr-3.5 py-2 bg-white border border-[#CBCAC2] rounded-[10px] text-[13px] text-[#171A17] placeholder-[#A3A29A] focus:outline-[#087A4A]"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[10px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-[7px] text-[12px] font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1FC777] text-[#0C0F0C]'
                      : 'text-[#5A5A53] hover:text-[#171A17]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Marketplace UI: Products List with Natural Hierarchy */}
        {/* Hierarchy: Name -> Context -> Value -> Movement -> Available Units -> Action */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] overflow-hidden shadow-2xs divide-y divide-[#E2E1DA]">
          {filteredProducts.map((p) => {
            const isPositive = p.changePercent >= 0;
            return (
              <div
                key={p.id}
                className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#F7F6F2]/50 transition-colors"
              >
                {/* 1. What is it? (Name + Context) */}
                <div className="lg:w-1/3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#087A4A]">{p.id}</span>
                    <span className="text-xs text-[#6B6B63]">·</span>
                    <span className="text-xs text-[#6B6B63] font-medium">{p.category}</span>
                  </div>
                  <h3 className="text-[20px] font-bold text-[#171A17]">{p.name}</h3>
                  <p className="text-xs text-[#5A5A53] line-clamp-1">
                    {p.description || 'Verified listed product available in marketplace quota.'}
                  </p>
                </div>

                {/* 2 & 3. What is its current value & What changed? */}
                <div className="flex items-baseline lg:items-center gap-8">
                  <div>
                    <div className="text-[11px] text-[#6B6B63]">Current value</div>
                    <div className="text-[22px] font-extrabold text-[#171A17] tabular-nums mt-0.5">
                      {formatINR(p.currentValue)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-[#6B6B63]">24h Movement</div>
                    <div
                      className={`text-sm font-bold flex items-center gap-1 mt-1 tabular-nums ${
                        isPositive ? 'text-[#0A7A45]' : 'text-[#BF2A2A]'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {isPositive ? '+' : ''}
                        {p.changePercent}%
                      </span>
                    </div>
                  </div>

                  {/* 4. How many units are available? */}
                  <div className="hidden sm:block">
                    <div className="text-[11px] text-[#6B6B63]">Available supply</div>
                    <div className="text-sm font-bold text-[#171A17] tabular-nums mt-1">
                      {p.availableUnits.toLocaleString()} units
                    </div>
                  </div>
                </div>

                {/* 5. What can I do next? (Action) */}
                <div className="flex items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#EFEEE9]">
                  <button
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setCurrentView('app-product-detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-2 text-xs font-bold text-[#171A17] hover:bg-[#EFEEE9] rounded-[10px] transition-colors cursor-pointer"
                  >
                    View details
                  </button>

                  <button
                    onClick={() => openBuySell('buy', p)}
                    className="px-4 py-2 bg-[#1FC777] text-[#0C0F0C] font-bold text-xs rounded-[10px] hover:bg-[#18B36A] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <span>Order units</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Illustrative Demo Notice */}
        <div className="mt-8 p-4 bg-[#FFFFFF] border border-[#E2E1DA] rounded-[14px] flex items-center justify-between text-xs text-[#5A5A53]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#6B6B63] shrink-0" />
            <span>
              All product listings, unit allocations, and valuation changes displayed above are illustrative models for platform demonstration.
            </span>
          </div>

          <button
            onClick={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-[#087A4A] hover:underline cursor-pointer whitespace-nowrap ml-4"
          >
            Explore full catalog →
          </button>
        </div>
      </div>
    </section>
  );
};
