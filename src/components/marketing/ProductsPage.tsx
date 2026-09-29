import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Product } from '../../types';
import {
  TrendingUp,
  TrendingDown,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Shield,
  Layers,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, openBuySell, setSelectedProductId, setCurrentView } = useTrading();
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
    <div className="bg-[#F7F6F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3 py-1 rounded-full border border-[#CFF3E0]">
            Marketplace Catalog
          </span>
          <h1 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight mt-3">
            Listed Products & Assets
          </h1>
          <p className="mt-2 text-[17px] text-[#5A5A53]">
            Browse all verified listings supplied by the client's business. Inspect real-time valuation, 24h trading volume, available unit quota, and historical price performance.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[18px] p-4 sm:p-5 mb-8 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#A3A29A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, ID or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[14px] text-[#171A17] placeholder-[#A3A29A] focus:outline-[#087A4A] focus:bg-white"
              />
            </div>

            {/* Sort & Category Selectors */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 p-1 bg-[#F7F6F2] border border-[#E2E1DA] rounded-[10px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-[7px] text-[12px] font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#1FC777] text-[#0C0F0C] shadow-2xs'
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
                className="px-3 py-2 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[13px] font-medium text-[#171A17] focus:outline-[#087A4A] cursor-pointer"
              >
                <option value="value-desc">Highest Value</option>
                <option value="value-asc">Lowest Value</option>
                <option value="change-desc">Top Gainers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const isPositive = product.changePercent >= 0;
            return (
              <div
                key={product.id}
                className="bg-[#FFFFFF] border border-[#CBCAC2] hover:border-[#1FC777] rounded-[20px] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-2.5 py-0.5 rounded-full border border-[#CFF3E0]">
                      {product.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[13px] font-bold px-2 py-0.5 rounded-full ${
                        isPositive
                          ? 'bg-[#E3F6EC] text-[#0A7A45]'
                          : 'bg-[#FCE9E7] text-[#BF2A2A]'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {product.changePercent}%
                    </span>
                  </div>

                  <h3 className="mt-4 text-[22px] font-bold text-[#171A17] group-hover:text-[#087A4A] transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-[12px] font-mono text-[#6B6B63] mt-0.5">
                    Identifier: {product.id} · {product.unitMeasure}
                  </div>

                  <p className="mt-3 text-[14px] text-[#5A5A53] leading-relaxed">
                    {product.description}
                  </p>

                  {/* Valuation box */}
                  <div className="mt-5 p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[11px] font-bold uppercase text-[#6B6B63]">
                        Unit Price
                      </span>
                      <span className="text-[12px] text-[#5A5A53]">
                        Available: {product.availableUnits.toLocaleString()} units
                      </span>
                    </div>
                    <div className="text-[28px] font-extrabold text-[#171A17] tabular-nums mt-1">
                      {formatINR(product.currentValue)}
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#E2E1DA] grid grid-cols-2 gap-2 text-[11px] text-[#6B6B63]">
                      <div>
                        <span>24h Range:</span>
                        <div className="font-semibold text-[#171A17]">
                          {formatINR(product.low24h)} - {formatINR(product.high24h)}
                        </div>
                      </div>
                      <div>
                        <span>24h Volume:</span>
                        <div className="font-semibold text-[#171A17]">
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
                    className="flex-1 py-2.5 text-center text-[13px] font-bold text-[#171A17] bg-[#EFEEE9] hover:bg-[#E2E1DA] rounded-[10px] transition-colors cursor-pointer"
                  >
                    View Chart & Depth
                  </button>
                  <button
                    onClick={() => openBuySell('buy', product)}
                    className="flex-1 py-2.5 text-center text-[13px] font-bold text-[#0C0F0C] bg-[#1FC777] hover:bg-[#18B36A] rounded-[10px] transition-colors cursor-pointer shadow-2xs"
                  >
                    Trade Unit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
