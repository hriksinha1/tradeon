import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { ArrowRight } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { setCurrentView } = useTrading();

  return (
    <section className="py-20 sm:py-32 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <div className="text-xs font-semibold text-[#005EA8] tracking-wider uppercase">
          Interactive Preview
        </div>

        <h2 className="text-[34px] sm:text-[52px] font-extrabold text-[#171A17] tracking-tight leading-[1.1] max-w-3xl mx-auto text-balance">
          See where a clearer trading experience can take you.
        </h2>

        <p className="text-[17px] sm:text-[19px] text-[#5A5A53] max-w-2xl mx-auto leading-relaxed">
          Explore the working platform prototype across desktop web, iPhone 16 Pro, and Pixel 9 Pro device frames.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
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

        <div className="pt-2 text-xs text-[#6B6B63]">
          Illustrative product marketplace prototype · Neutral product architecture
        </div>
      </div>
    </section>
  );
};
