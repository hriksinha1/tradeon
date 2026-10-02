import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import { ArrowRight, Check, ChevronRight, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, openBuySell, products, wallet } = useTrading();
  const product = products[0];
  const explore = () => {
    setCurrentView('app-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="overflow-hidden border-b border-[#EAECEF] bg-white text-[#181A20]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 mb-4 px-2.5 py-1 rounded-[4px] bg-[#FEF6D8] border border-[#FCDD80] text-[#946800] text-[12px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
            <span>High-Density Trading Engine</span>
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-[#181A20] sm:text-6xl">
            Trade with more context.
          </h1>

          <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-[#474D57] sm:text-lg">
            See the market. Understand the position. Place the trade. Discover listed products, review real-time book depth, and maintain an immutable ledger record of every transaction.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" variant="primary" onClick={explore} className="flex items-center justify-center gap-2 font-bold cursor-pointer">
              <span>Launch Trading Terminal</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setCurrentView('how-it-works')} className="cursor-pointer">
              How It Works
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#707A8A]">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#02A063]" />
              Real-time matching engine
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#02A063]" />
              Double-entry ledger
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#02A063]" />
              Instant order confirmation
            </span>
          </div>
        </div>

        {/* Right Terminal Live Preview Card */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative rounded-[8px] border border-[#DFE2E6] bg-white p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAECEF] pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#946800] bg-[#FEF6D8] border border-[#FCDD80] px-1.5 py-0.5 rounded font-bold">
                  {product.id} · {product.category}
                </span>
                <h2 className="mt-1 text-[20px] font-bold text-[#181A20]">{product.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-[20px] font-bold tabular-nums text-[#181A20] font-mono">{formatINR(product.currentValue)}</p>
                <p className="mt-0.5 flex items-center justify-end gap-1 text-[12px] font-semibold text-[#02A063] font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{product.changePercent}% 24h
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-[12px] tabular-nums font-mono">
              <div className="rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] p-3">
                <span className="text-[11px] text-[#707A8A] block font-sans">24h High</span>
                <span className="mt-1 font-semibold text-[#181A20] block">{formatINR(product.high24h)}</span>
              </div>
              <div className="rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] p-3">
                <span className="text-[11px] text-[#707A8A] block font-sans">24h Low</span>
                <span className="mt-1 font-semibold text-[#181A20] block">{formatINR(product.low24h)}</span>
              </div>
              <div className="rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] p-3">
                <span className="text-[11px] text-[#707A8A] block font-sans">Available Units</span>
                <span className="mt-1 font-semibold text-[#181A20] block">{product.availableUnits.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => openBuySell('buy', product)}
              className="w-full flex items-center justify-between rounded-[4px] bg-[#F0B90B] hover:bg-[#F8D12F] px-4 py-2.5 text-left text-[13px] font-bold text-[#181A20] transition-colors cursor-pointer shadow-xs"
            >
              <span>Instant Order Entry & Simulation</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <p className="text-center text-[11px] text-[#707A8A]">
              Real-time mark pricing updated every 1000ms. No simulated slippage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
