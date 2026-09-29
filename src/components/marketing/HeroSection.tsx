import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import {
  ArrowRight,
  TrendingUp,
  Star,
  CheckCircle2,
  Sparkles,
  Smartphone,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  Sliders,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentView, openBuySell, products, wallet } = useTrading();

  const previewProduct = products[0]; // Atlas Contract

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#E2E1DA] bg-gradient-to-b from-[#F7F6F2] via-[#FFFFFF] to-[#F7F6F2]">
      {/* Background radial accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E9FAF1] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        {/* Top pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E9FAF1] border border-[#A2E8C5] rounded-full text-[13px] font-bold text-[#087A4A] mb-6 shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#1FC777]" />
          <span>Next-Generation Digital Trading & Product Marketplace</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-[44px] sm:text-[64px] lg:text-[72px] font-extrabold tracking-tight text-[#171717] leading-[1.08] max-w-4xl mx-auto text-balance">
          Trade what matters to you.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-[18px] sm:text-[21px] text-[#5A5A53] max-w-2xl mx-auto leading-relaxed font-normal">
          A modern platform for discovering, trading and managing listed products — built around clarity, control and transparent transactions.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              setCurrentView('app-preview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 w-full sm:w-auto shadow-md"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto"
          >
            Explore the Platform
          </Button>
        </div>

        {/* Platform tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[12px] text-[#6B6B63]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#12A560]" />
            <span>Web Platform (1440px)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#12A560]" />
            <span>Native iOS & Android Experience</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#12A560]" />
            <span>Audited Double-Entry Ledger</span>
          </span>
        </div>

        {/* PRODUCT ECOSYSTEM COMPOSITION */}
        <div className="mt-14 sm:mt-18 relative max-w-5xl mx-auto">
          {/* Main Desktop Browser Frame */}
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden text-left">
            {/* Browser top chrome */}
            <div className="bg-[#EFEEE9] border-b border-[#E2E1DA] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E5484D]/70" />
                <span className="w-3 h-3 rounded-full bg-[#C77700]/70" />
                <span className="w-3 h-3 rounded-full bg-[#12A560]/70" />
                <div className="ml-3 px-3 py-1 bg-white rounded-md text-[11px] text-[#6B6B63] font-mono border border-[#E2E1DA] flex items-center gap-2">
                  <span className="text-[#087A4A]">https://</span>
                  <span>tradeon.exchange/dashboard</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#087A4A] bg-[#E9FAF1] px-2 py-0.5 rounded">
                  Connected
                </span>
              </div>
            </div>

            {/* Desktop Inside Content */}
            <div className="p-5 sm:p-7 space-y-6">
              {/* Header inside mockup */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#EFEEE9]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B63] block">
                    Portfolio Liquidity & Valuation
                  </span>
                  <div className="flex items-baseline gap-3 mt-0.5">
                    <span className="text-[32px] sm:text-[38px] font-bold text-[#171717] tabular-nums">
                      {formatINR(wallet.totalValue)}
                    </span>
                    <span className="text-[14px] font-bold text-[#0A7A45] flex items-center gap-0.5 bg-[#E3F6EC] px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+1.42% intraday</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openBuySell('buy', previewProduct)}
                    className="px-4 py-2 bg-[#1FC777] text-[#0C0F0C] font-bold text-[13px] rounded-[8px] hover:bg-[#18B36A] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <ArrowDownLeft className="w-3.5 h-3.5" />
                    <span>Quick Buy</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('app-preview')}
                    className="px-4 py-2 bg-[#EFEEE9] text-[#171717] font-semibold text-[13px] rounded-[8px] hover:bg-[#E2E1DA] transition-colors cursor-pointer"
                  >
                    View Ledger
                  </button>
                </div>
              </div>

              {/* Grid of Product Cards inside Browser */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {products.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openBuySell('buy', item)}
                    className="p-4 bg-[#F7F6F2] hover:bg-[#E9FAF1] border border-[#E2E1DA] hover:border-[#A2E8C5] rounded-[14px] cursor-pointer transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-bold text-[#6B6B63] uppercase block">
                          {item.category}
                        </span>
                        <h4 className="text-[16px] font-bold text-[#171717] group-hover:text-[#087A4A] transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-mono text-[#6B6B63]">{item.id}</span>
                      </div>
                      <span
                        className={`text-[12px] font-bold tabular-nums px-2 py-0.5 rounded ${
                          item.changePercent >= 0 ? 'bg-[#E3F6EC] text-[#0A7A45]' : 'bg-[#FCE9E7] text-[#BF2A2A]'
                        }`}
                      >
                        {item.changePercent >= 0 ? '+' : ''}
                        {item.changePercent}%
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2E1DA] flex items-center justify-between">
                      <span className="text-[16px] font-bold text-[#171717] tabular-nums">
                        {formatINR(item.currentValue)}
                      </span>
                      <span className="text-[12px] font-bold text-[#087A4A] group-hover:underline">
                        Order Unit →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Mobile Phone Preview (Left overlay) */}
          <div className="hidden lg:block absolute -left-12 -bottom-10 w-72 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[32px] shadow-[0_25px_50px_rgba(0,0,0,0.18)] p-4 text-left z-20 transition-transform hover:-translate-y-1">
            <div className="h-5 flex items-center justify-between px-2 text-[10px] text-[#6B6B63] font-semibold border-b border-[#EFEEE9] pb-1 mb-3">
              <span>9:41</span>
              <div className="w-16 h-3 bg-black rounded-full" />
              <span>5G</span>
            </div>

            <div className="p-3 bg-[#E9FAF1] border border-[#A2E8C5] rounded-[16px] mb-3">
              <span className="text-[10px] uppercase font-bold text-[#087A4A] block">Instant Settlement</span>
              <span className="text-[16px] font-bold text-[#171717] tabular-nums block mt-0.5">
                {formatINR(84250)}
              </span>
              <span className="text-[11px] text-[#5A5A53]">Trading Cash Available</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-[#F7F6F2] rounded-[10px] border border-[#E2E1DA] flex justify-between items-center text-[12px]">
                <div>
                  <span className="font-bold text-[#171717] block">Atlas Contract</span>
                  <span className="text-[10px] text-[#6B6B63]">60 units allocated</span>
                </div>
                <span className="font-bold text-[#0A7A45]">+5.53%</span>
              </div>
              <div className="p-2.5 bg-[#F7F6F2] rounded-[10px] border border-[#E2E1DA] flex justify-between items-center text-[12px]">
                <div>
                  <span className="font-bold text-[#171717] block">Orbit Contract</span>
                  <span className="text-[10px] text-[#6B6B63]">45 units allocated</span>
                </div>
                <span className="font-bold text-[#0A7A45]">+3.52%</span>
              </div>
            </div>

            <div className="mt-3 pt-2 text-center">
              <button
                onClick={() => setCurrentView('mobile-app')}
                className="text-[11px] font-bold text-[#087A4A] hover:underline"
              >
                Inspect iOS & Android Architecture →
              </button>
            </div>
          </div>

          {/* Floating Mobile Options Widget (Right overlay) */}
          <div className="hidden lg:block absolute -right-10 top-16 w-64 bg-[#171A17] text-white border border-[#2A2A26] rounded-[24px] shadow-[0_25px_50px_rgba(0,0,0,0.22)] p-4 text-left z-20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1FC777]">
                Options Chain
              </span>
              <span className="text-[10px] text-[#A3A29A]">Oct 2026</span>
            </div>
            <h5 className="text-[14px] font-bold text-white">ATLAS 2500 CALL</h5>
            <div className="mt-2 p-2 bg-[#2A2A26] rounded-[8px] flex justify-between items-center text-[12px]">
              <span className="text-[#A3A29A]">Premium:</span>
              <span className="font-bold text-[#1FC777] tabular-nums">₹79.80</span>
            </div>
            <div className="mt-2 text-[11px] text-[#A3A29A] flex justify-between">
              <span>Strike: ₹2,500</span>
              <span className="text-[#12A560] font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
