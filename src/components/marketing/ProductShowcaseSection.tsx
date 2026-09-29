import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Product } from '../../types';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Shield,
  Layers,
  ArrowUpRight,
  Sparkles,
  SlidersHorizontal,
  Info,
} from 'lucide-react';

export const ProductShowcaseSection: React.FC = () => {
  const { products, openBuySell, setCurrentView, setSelectedProductId } = useTrading();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Category A', 'Category B', 'Category C'];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-20 bg-[#F7F6F2] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E9FAF1] border border-[#A2E8C5] rounded-full text-[12px] font-bold text-[#087A4A] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#1FC777]" />
              <span>Available Marketplace Listings</span>
            </div>
            <h2 className="text-[34px] sm:text-[44px] font-bold text-[#171A17] tracking-tight leading-tight">
              Products listed with transparency.
            </h2>
            <p className="mt-2 text-[16px] sm:text-[18px] text-[#5A5A53] max-w-2xl">
              Inspect current unit values, 24-hour liquidity volumes, and historical trajectories.
              Every listing is backed by business supply and direct settlement guarantees.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[12px] self-start md:self-auto shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1FC777] text-[#0C0F0C] shadow-xs'
                    : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
            const isPositive = product.changePercent >= 0;
            return (
              <div
                key={product.id}
                className="bg-[#FFFFFF] border border-[#E2E1DA] hover:border-[#1FC777] rounded-[18px] p-5 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Top line: Category pill & 24h change */}
                  <div className="flex items-center justify-between gap-2">
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
                      {isPositive ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {isPositive ? '+' : ''}
                        {product.changePercent}%
                      </span>
                    </span>
                  </div>

                  {/* Title & Product Code */}
                  <div className="mt-4">
                    <h3 className="text-[20px] font-bold text-[#171A17] group-hover:text-[#087A4A] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-[12px] font-mono text-[#6B6B63]">
                      <span>Code: {product.id}</span>
                      <span>·</span>
                      <span className="capitalize">{product.unitMeasure}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-[13px] text-[#5A5A53] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Valuation & Range Bar */}
                  <div className="mt-5 p-3.5 bg-[#F7F6F2] rounded-[12px] border border-[#EFEEE9]">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] font-bold text-[#6B6B63] uppercase">
                        Unit Value
                      </span>
                      <span className="text-[11px] text-[#5A5A53]">
                        Available: {product.availableUnits.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[26px] font-extrabold text-[#171A17] tabular-nums mt-0.5">
                      {formatINR(product.currentValue)}
                    </div>

                    {/* High/Low 24h metrics */}
                    <div className="mt-3 pt-2.5 border-t border-[#E2E1DA] flex items-center justify-between text-[11px] text-[#6B6B63]">
                      <span>24h Low: {formatINR(product.low24h)}</span>
                      <span>24h High: {formatINR(product.high24h)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions bottom bar */}
                <div className="mt-5 pt-4 border-t border-[#EFEEE9] flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setCurrentView('app-product-detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-2 text-center text-[13px] font-semibold text-[#171A17] bg-[#EFEEE9] hover:bg-[#E2E1DA] rounded-[10px] transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => openBuySell('buy', product)}
                    className="flex-1 py-2 text-center text-[13px] font-bold text-[#0C0F0C] bg-[#1FC777] hover:bg-[#18B36A] rounded-[10px] transition-colors cursor-pointer shadow-2xs"
                  >
                    Trade Unit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[18px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E9FAF1] border border-[#A2E8C5] flex items-center justify-center text-[#087A4A] shrink-0">
              <Info className="w-5 h-5 text-[#1FC777]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#171A17]">
                Confidential Product Abstraction Ready
              </h4>
              <p className="text-[13px] text-[#5A5A53]">
                Values, categories, and identifiers adapt to any proprietary commodity, inventory right, or business asset upon deployment.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-[#EFEEE9] hover:bg-[#E2E1DA] text-[#171A17] rounded-[10px] text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
          >
            <span>Explore All 7 Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
