import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { ArrowRight } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { setCurrentView } = useTrading();

  return (
    <section className="py-20 sm:py-32 bg-[#0B0E11] border-b border-[#2B3139] relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F0B90B]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A1E] border border-[#2B3139] text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
          <span className="size-1.5 rounded-full bg-[#0ECB81] animate-pulse" />
          Interactive Trading Platform
        </div>

        <h2 className="text-[34px] sm:text-[50px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.1] max-w-3xl mx-auto text-balance">
          See where a clearer trading experience can take you.
        </h2>

        <p className="text-[16px] sm:text-[18px] text-[#848E9C] max-w-2xl mx-auto leading-relaxed">
          Explore the working platform prototype across desktop web, iPhone 16 Pro, and Pixel 9 Pro device frames.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              setCurrentView('app-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 w-full sm:w-auto font-bold shadow-lg shadow-[#F0B90B]/10 cursor-pointer"
          >
            <span>Launch Trading Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              setCurrentView('markets');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto cursor-pointer"
          >
            Explore Market Catalog
          </Button>
        </div>

        <div className="pt-3 text-xs text-[#848E9C]">
          Neutral product architecture · Professional orderbook · Double-entry audit ledger
        </div>
      </div>
    </section>
  );
};
