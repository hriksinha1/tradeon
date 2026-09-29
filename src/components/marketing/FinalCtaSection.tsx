import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { ArrowRight, MessageSquare } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { setCurrentView } = useTrading();

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
          Product Preview Ready
        </div>

        <h2 className="text-[38px] sm:text-[54px] font-extrabold text-[#171A17] tracking-tight leading-[1.1] max-w-3xl mx-auto text-balance">
          See what a clearer way to trade could feel like.
        </h2>

        <p className="text-[18px] sm:text-[20px] text-[#5A5A53] max-w-2xl mx-auto leading-relaxed">
          The interface is taking shape. Explore our working prototype across web, iPhone 16 Pro, and Pixel 9 Pro device frames.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              setCurrentView('app-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 w-full sm:w-auto shadow-xs font-bold cursor-pointer"
          >
            <span>Explore the platform</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              setCurrentView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto cursor-pointer"
          >
            Talk to us
          </Button>
        </div>

        <div className="pt-4 text-xs text-[#6B6B63]">
          No real financial claims · Illustrative demonstration data · Turnkey architecture
        </div>
      </div>
    </section>
  );
};
