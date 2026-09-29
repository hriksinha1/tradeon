import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import {
  ArrowRight,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  SlidersHorizontal,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, openBuySell, products, wallet } = useTrading();

  const previewProduct = products[0]; // Atlas Contract

  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-24 sm:pb-32 bg-[#F7F6F2] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Text Content */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {/* Quiet text kicker - zero pill */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#087A4A] tracking-wide uppercase">
            <span>Marketplace Platform</span>
            <span aria-hidden="true">·</span>
            <span>Web, iOS & Android</span>
            <span aria-hidden="true">·</span>
            <span>Audited Ledger</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-[42px] sm:text-[62px] lg:text-[70px] font-extrabold tracking-tight text-[#171A17] leading-[1.08] text-balance">
            Trading shouldn't feel harder than it is.
          </h1>

          {/* Supporting Human Copy */}
          <p className="text-[18px] sm:text-[21px] text-[#5A5A53] max-w-2xl mx-auto leading-relaxed font-normal">
            Discover listed products, place orders, move money and keep every transaction in view — with zero noise and complete clarity.
          </p>

          {/* CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                setCurrentView('app-dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 w-full sm:w-auto shadow-xs cursor-pointer font-bold"
            >
              <span>Explore the platform</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setCurrentView('how-it-works');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto cursor-pointer"
            >
              See how it works
            </Button>
          </div>

          {/* Quiet Trust Footnote */}
          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-[#6B6B63]">
            <span>Illustrative product listings</span>
            <span aria-hidden="true">·</span>
            <span>Direct business supply</span>
            <span aria-hidden="true">·</span>
            <span>Double-entry balance tracking</span>
          </div>
        </div>

        {/* Editorial Product Composition (Not a giant dashboard) */}
        <div className="mt-16 sm:mt-20 relative max-w-5xl mx-auto">
          {/* Subtle Ambient Background Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E9FAF1] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

          {/* Desktop Product Preview Frame (Clean browser viewport) */}
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden text-left">
            {/* Minimal Browser Chrome */}
            <div className="bg-[#EFEEE9] border-b border-[#E2E1DA] px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CBCAC2]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#CBCAC2]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#CBCAC2]" />
                <span className="ml-3 font-mono text-[11px] text-[#6B6B63]">tradeon.exchange/products</span>
              </div>
              <div className="text-[11px] text-[#087A4A] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12A560]" />
                <span>Live Marketplace</span>
              </div>
            </div>

            {/* Desktop Inside Layout: Curated product preview */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Product Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFEEE9]">
                <div>
                  <div className="text-xs text-[#6B6B63] font-medium">Selected listing</div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <h3 className="text-[26px] sm:text-[30px] font-bold text-[#171A17] tracking-tight">
                      {previewProduct.name}
                    </h3>
                    <span className="font-mono text-xs text-[#6B6B63]">{previewProduct.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[24px] sm:text-[28px] font-extrabold text-[#171A17] tabular-nums">
                      {formatINR(previewProduct.currentValue)}
                    </div>
                    <div className="text-xs font-semibold text-[#0A7A45] flex items-center justify-end gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+{previewProduct.changePercent}% today</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openBuySell('buy', previewProduct)}
                    className="ml-2 px-4 py-2.5 bg-[#1FC777] text-[#0C0F0C] font-bold text-[13px] rounded-[10px] hover:bg-[#18B36A] transition-colors cursor-pointer shadow-xs"
                  >
                    Order unit
                  </button>
                </div>
              </div>

              {/* Product Context Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
                  <div className="text-xs text-[#6B6B63]">Available supply</div>
                  <div className="text-[18px] font-bold text-[#171A17] mt-1 tabular-nums">
                    {previewProduct.availableUnits.toLocaleString()} units
                  </div>
                  <div className="text-[11px] text-[#5A5A53] mt-0.5">Verified business quota</div>
                </div>

                <div className="p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
                  <div className="text-xs text-[#6B6B63]">24h Volume</div>
                  <div className="text-[18px] font-bold text-[#171A17] mt-1 tabular-nums">
                    {formatINR(previewProduct.volume24h)}
                  </div>
                  <div className="text-[11px] text-[#5A5A53] mt-0.5">Continuous trading activity</div>
                </div>

                <div className="p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
                  <div className="text-xs text-[#6B6B63]">Settlement rail</div>
                  <div className="text-[18px] font-bold text-[#171A17] mt-1">
                    Instant Double-Entry
                  </div>
                  <div className="text-[11px] text-[#087A4A] mt-0.5 font-medium">Reconciled to wallet</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Mobile Glimpse (Left overlay) */}
          <div className="hidden lg:block absolute -left-10 -bottom-8 w-72 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[28px] shadow-[0_20px_45px_rgba(0,0,0,0.12)] p-4 text-left z-20 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFEEE9] text-xs font-semibold text-[#171A17]">
              <span>Wallet balance</span>
              <span className="text-[11px] text-[#087A4A]">Reconciled</span>
            </div>

            <div className="mt-3">
              <span className="text-xs text-[#6B6B63]">Available to trade</span>
              <div className="text-[22px] font-extrabold text-[#171A17] tabular-nums mt-0.5">
                {formatINR(wallet.availableBalance)}
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-[#EFEEE9] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#5A5A53]">Latest transaction</span>
                <span className="font-semibold text-[#0A7A45]">+₹5,000 UPI</span>
              </div>
              <div className="text-[10px] text-[#6B6B63] font-mono">TXN-88219 · Instant settle</div>
            </div>
          </div>

          {/* Floating Options Callout (Right overlay) */}
          <div className="hidden lg:block absolute -right-8 top-12 w-64 bg-[#171A17] text-white border border-[#2A2A26] rounded-[22px] shadow-[0_20px_45px_rgba(0,0,0,0.16)] p-4 text-left z-20">
            <div className="flex items-center justify-between text-[11px] text-[#1FC777] font-semibold">
              <span>Structured Options</span>
              <span className="text-[#A3A29A]">Oct cycle</span>
            </div>
            <div className="mt-2 text-[15px] font-bold text-white">ATLAS-C 2500</div>
            <div className="mt-2 p-2 bg-[#2A2A26] rounded-[8px] flex items-center justify-between text-xs">
              <span className="text-[#A3A29A]">Premium</span>
              <span className="font-bold text-[#1FC777] tabular-nums">₹79.80</span>
            </div>
            <div className="mt-2 text-[10px] text-[#A3A29A]">
              Predefined strike level · Bounded risk
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
