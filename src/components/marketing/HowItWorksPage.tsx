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
        'Browse through listed marketplace products. Review real-time indicative valuations, 24-hour liquidity, and available supply limits without digging through confusing tabs.',
      highlight: 'Every listing shows transparent unit supply limits',
      action: 'Browse Products',
      onClick: () => setCurrentView('products'),
    },
    {
      step: '02',
      phase: 'Understand',
      title: 'Review the details before you act',
      description:
        'Inspect historical price trajectories, 24h spreads, and unit descriptions. You always know what is being purchased before you make a financial commitment.',
      highlight: 'Clear data context instead of ambiguous tickers',
      action: 'Inspect Sample Listing',
      onClick: () => setCurrentView('app-product-detail'),
    },
    {
      step: '03',
      phase: 'Fund',
      title: 'Add cash instantly through simple rails',
      description:
        'Use UPI, direct Net Banking, or Debit Cards to fund your internal trading wallet. Your balance updates immediately with zero hidden deductions.',
      highlight: 'Instant UPI settlement with bank verification',
      action: 'Test Add Funds',
      onClick: () => setIsAddFundsOpen(true),
    },
    {
      step: '04',
      phase: 'Trade',
      title: 'Place your order with full confidence',
      description:
        'Choose market execution for instant fills or specify a limit price. Review exact units, fees, and the net deduction on an order slip before confirming.',
      highlight: 'Instant fill backed by internal cash balance',
      action: 'Test Order Slip',
      onClick: () => openBuySell('buy', products[0]),
    },
    {
      step: '05',
      phase: 'Track',
      title: 'Keep every transaction in an audited ledger',
      description:
        'Every debit, credit, and order execution leaves a permanent double-entry trail. Your running balance is reconciled sequentially in real time.',
      highlight: 'Double-entry accounting with transparent running balance',
      action: 'View Live Ledger',
      onClick: () => setCurrentView('app-ledger'),
    },
  ];

  return (
    <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Platform Workflow
          </div>
          <h1 className="text-[34px] sm:text-[48px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.08]">
            From first look to final record.
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            Trading shouldn't be a maze. Here is how you move from finding an interesting product to seeing it recorded in your permanent ledger.
          </p>
        </div>

        {/* 5-Step Editorial Timeline */}
        <div className="space-y-4">
          {journey.map((item) => (
            <div
              key={item.step}
              className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-[#363C45] transition-all shadow-sm"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F0B90B] tracking-wide font-mono">
                  <span>{item.step}</span>
                  <span aria-hidden="true" className="text-[#363C45]">·</span>
                  <span className="uppercase">{item.phase}</span>
                </div>

                <h3 className="text-[20px] font-bold text-[#F5F5F5] tracking-tight">
                  {item.title}
                </h3>

                <p className="text-[14px] text-[#848E9C] leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-1 text-xs text-[#B7BDC6] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0ECB81]" />
                  <span>{item.highlight}</span>
                </div>
              </div>

              <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={item.onClick}
                  className="w-full sm:w-auto px-4 py-2 bg-[#1E2329] hover:bg-[#23282F] text-[#F5F5F5] hover:text-[#F0B90B] font-bold text-xs rounded-[6px] border border-[#2B3139] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{item.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 p-8 sm:p-10 bg-[#161A1E] border border-[#2B3139] rounded-[10px] text-center space-y-4">
          <h3 className="text-[24px] font-bold text-[#F5F5F5]">
            Ready to test the live prototype?
          </h3>
          <p className="text-[14px] text-[#848E9C] max-w-lg mx-auto">
            Switch between full web view or test the native iOS and Android device simulators with live reactive state.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setCurrentView('app-dashboard')}
              className="w-full sm:w-auto font-bold shadow-md cursor-pointer"
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
