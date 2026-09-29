import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Product } from '../../types';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Search,
  CheckCircle2,
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
    <section className="py-24 sm:py-32 bg-[#F7F6F2] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
              Product Discovery
            </div>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
              Start with curiosity.
            </h2>
            <p className="text-[17px] text-[#5A5A53] leading-relaxed">
              Explore listings with transparent unit valuations, verified supply limits, and real-time liquidity. Every entry is backed by business supply and direct settlement guarantees.
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
                className="w-full sm:w-64 pl-9 pr-3.5 py-2 bg-white border border-[#CBCAC2] rounded-[10px] text-[13px] text-[#171A17] placeholder-[#A3A29A] focus:outline-[#087A4A]"
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

        {/* Product Cards Grid with Editorial Variation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 6).map((product, idx) => {
            const isPositive = product.changePercent >= 0;
            return (
              <div
                key={product.id}
                className="bg-[#FFFFFF] border border-[#CBCAC2] hover:border-[#1FC777] rounded-[20px] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Clean unboxed metadata header - zero pill */}
                  <div className="flex items-center justify-between text-xs text-[#5A5A53] pb-3 border-b border-[#EFEEE9]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#087A4A]">{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{product.id}</span>
                    </div>

                    <span className={`font-semibold tabular-nums ${isPositive ? 'text-[#0A7A45]' : 'text-[#BF2A2A]'}`}>
                      {isPositive ? '+' : ''}{product.changePercent}% today
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <h3 className="text-[22px] font-bold text-[#171A17] group-hover:text-[#087A4A] transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-[14px] text-[#5A5A53] leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Valuation & Available Supply Surface */}
                  <div className="mt-6 p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
                    <div className="text-xs text-[#6B6B63] font-medium">Indicative unit value</div>
                    <div className="text-[26px] font-extrabold text-[#171A17] tabular-nums mt-0.5">
                      {formatINR(product.currentValue)}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#E2E1DA] flex items-center justify-between text-xs text-[#6B6B63]">
                      <span>Available: {product.availableUnits.toLocaleString()} units</span>
                      <span>24h High: {formatINR(product.high24h)}</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Actions */}
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
                    className="flex-1 py-2.5 text-center text-[13px] font-bold text-[#0C0F0C] bg-[#1FC777] hover:bg-[#18B36A] rounded-[10px] transition-colors cursor-pointer shadow-2xs"
                  >
                    Trade unit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet disclaimer and see all link */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[16px] text-xs text-[#5A5A53]">
          <div>
            <span className="font-semibold text-[#171A17]">Illustrative catalog:</span> Product names and valuations are demonstration models designed to test marketplace workflows.
          </div>
          <button
            onClick={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-[#087A4A] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Browse all 7 demonstration products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
