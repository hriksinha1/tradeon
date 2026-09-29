import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import {
  Compass,
  Wallet,
  ArrowLeftRight,
  Receipt,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentView, setIsAddFundsOpen, openBuySell, products } = useTrading();

  const journey = [
    {
      step: '01',
      phase: 'Discover',
      title: 'Find what you want to trade',
      description:
        'Browse through listed business products. Look at real-time valuations, 24-hour liquidity, and available supply without digging through confusing tabs.',
      highlight: 'Every listing shows transparent unit supply',
      action: 'Browse products',
      onClick: () => setCurrentView('products'),
    },
    {
      step: '02',
      phase: 'Understand',
      title: 'Review the details before you act',
      description:
        'Inspect historical price trajectories, 24h spreads, and unit descriptions. You always know what is being purchased before you make a commitment.',
      highlight: 'Clear data instead of complex tickers',
      action: 'Inspect sample listing',
      onClick: () => setCurrentView('app-product-detail'),
    },
    {
      step: '03',
      phase: 'Fund',
      title: 'Add cash instantly through simple rails',
      description:
        'Use UPI or direct Net Banking to fund your internal trading wallet. Your balance updates immediately with zero hidden deductions.',
      highlight: 'Instant UPI settlement with bank verification',
      action: 'Test add funds',
      onClick: () => setIsAddFundsOpen(true),
    },
    {
      step: '04',
      phase: 'Trade',
      title: 'Place your order with full confidence',
      description:
        'Choose market execution for instant fills or specify a limit price. Review exact units, fees, and the net deduction before confirming.',
      highlight: 'Instant fill backed by internal cash',
      action: 'Test order slip',
      onClick: () => openBuySell('buy', products[0]),
    },
    {
      step: '05',
      phase: 'Track',
      title: 'Keep every transaction in an audited ledger',
      description:
        'Every debit, credit, and order execution leaves a permanent double-entry trail. Your running balance is reconciled in real time.',
      highlight: 'Double-entry accounting with transparent running balance',
      action: 'View live ledger',
      onClick: () => setCurrentView('app-ledger'),
    },
  ];

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Platform Workflow
          </div>
          <h1 className="text-[38px] sm:text-[54px] font-extrabold text-[#171A17] tracking-tight leading-[1.08]">
            From first look to final record.
          </h1>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            Trading shouldn't be a maze. Here is how you move from finding an interesting product to seeing it recorded in your permanent ledger.
          </p>
        </div>

        {/* 5-Step Editorial Timeline */}
        <div className="space-y-6">
          {journey.map((item) => (
            <div
              key={item.step}
              className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-[#1FC777] transition-all"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-[#087A4A] tracking-wide">
                  <span>{item.step}</span>
                  <span aria-hidden="true">·</span>
                  <span className="uppercase">{item.phase}</span>
                </div>

                <h3 className="text-[22px] font-bold text-[#171A17] tracking-tight">
                  {item.title}
                </h3>

                <p className="text-[15px] text-[#5A5A53] leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-1 text-xs text-[#171A17] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560]" />
                  <span>{item.highlight}</span>
                </div>
              </div>

              <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={item.onClick}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#EFEEE9] hover:bg-[#E2E1DA] text-[#171A17] font-bold text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{item.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 p-8 sm:p-10 bg-white border border-[#CBCAC2] rounded-[24px] text-center space-y-4">
          <h3 className="text-[26px] font-bold text-[#171A17]">
            Ready to test the live prototype?
          </h3>
          <p className="text-[15px] text-[#5A5A53] max-w-lg mx-auto">
            Switch between full web view or test the native iOS and Android device simulators with live reactive state.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setCurrentView('app-dashboard')}
              className="w-full sm:w-auto font-bold shadow-xs cursor-pointer"
            >
              Open Trading Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('products')}
              className="w-full sm:w-auto cursor-pointer"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
