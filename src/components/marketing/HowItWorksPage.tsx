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
  Shield,
  Zap,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentView, setIsAddFundsOpen, openBuySell, products } = useTrading();

  const steps = [
    {
      num: '01',
      title: 'Discover & Evaluate Listings',
      subtitle: 'Market Intelligence & Product Analysis',
      description:
        'Explore verified product listings with complete visibility into current unit valuation, 24-hour liquidity volume, historical spread, and business-backed allocation quotas.',
      details: [
        'Real-time valuation updates and percentage trends',
        'Historical price charting across 1D, 1W, 1M, 3M, 1Y, and ALL cycles',
        'Comprehensive supply transparency and limit tracking',
      ],
      icon: <Compass className="w-6 h-6 text-[#1FC777]" />,
      actionLabel: 'Browse Available Products',
      onAction: () => setCurrentView('products'),
    },
    {
      num: '02',
      title: 'Instant Deposit & Internal Wallet Allocation',
      subtitle: 'Frictionless Payment Rails',
      description:
        'Fund your account instantly using UPI, Net Banking across 50+ major banks, or debit/credit cards. Zero hidden processing deductions with instant ledger balance crediting.',
      details: [
        'Instant UPI payments via Google Pay, PhonePe, Paytm, or BHIM',
        'Immediate wallet crediting with immutable transaction receipt',
        'Direct bank account linking for rapid IMPS/NEFT withdrawals',
      ],
      icon: <Wallet className="w-6 h-6 text-[#1FC777]" />,
      actionLabel: 'Test Add Funds Flow',
      onAction: () => setIsAddFundsOpen(true),
    },
    {
      num: '03',
      title: 'Direct Market, Limit & Options Execution',
      subtitle: 'Flexible Order Mechanics',
      description:
        'Place instant Market Orders for immediate settlement or set precise Limit Orders at your desired price point. Or leverage structured Option contracts for strategic exposure.',
      details: [
        'Market execution with instant fill and real-time ledger debit',
        'Limit orders with partial fill support and automated cancel/edit options',
        'Call and Put option contracts with predefined strike levels and expirations',
      ],
      icon: <ArrowLeftRight className="w-6 h-6 text-[#1FC777]" />,
      actionLabel: 'Test Trade Execution',
      onAction: () => openBuySell('buy', products[0]),
    },
    {
      num: '04',
      title: 'Double-Entry Settlement & Custodial Audit',
      subtitle: 'Institutional Financial Rigor',
      description:
        'Every transaction is reconciled through an immutable double-entry ledger. Maintain total audit readiness with verifiable running balances and cryptographic transaction references.',
      details: [
        'Every debit is paired with a corresponding asset allocation credit',
        'Running balance validation with zero discrepancy tolerance',
        'Full exportable audit statements and transaction receipts',
      ],
      icon: <Receipt className="w-6 h-6 text-[#1FC777]" />,
      actionLabel: 'Inspect Double-Entry Ledger',
      onAction: () => setCurrentView('app-ledger'),
    },
  ];

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
            User Journey & Lifecycle
          </span>
          <h1 className="text-[36px] sm:text-[50px] font-extrabold text-[#171A17] tracking-tight mt-3">
            How Tradeon Operates
          </h1>
          <p className="mt-3 text-[17px] text-[#5A5A53]">
            A transparent four-stage process designed to guarantee liquidity, trade execution speed, and institutional financial auditability.
          </p>
        </div>

        {/* Steps sequence */}
        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 transition-all hover:border-[#1FC777]"
            >
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[14px] bg-[#E9FAF1] border border-[#A2E8C5] flex items-center justify-center font-black text-[18px] text-[#087A4A]">
                    {step.num}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#087A4A] block">
                      {step.subtitle}
                    </span>
                    <h2 className="text-[22px] sm:text-[24px] font-bold text-[#171A17]">
                      {step.title}
                    </h2>
                  </div>
                </div>

                <p className="text-[15px] text-[#5A5A53] leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-2 pt-1">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-[13px] text-[#171A17]">
                      <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#EFEEE9]">
                <button
                  onClick={step.onAction}
                  className="w-full sm:w-auto px-6 py-3 bg-[#1FC777] hover:bg-[#18B36A] text-[#0C0F0C] font-bold text-[14px] rounded-[12px] flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-8 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] text-center max-w-3xl mx-auto shadow-sm">
          <h3 className="text-[24px] font-bold text-[#171A17]">
            Ready to experience the platform live?
          </h3>
          <p className="text-[15px] text-[#5A5A53] mt-2">
            Switch between full web view or test the native iOS and Android device simulators with live reactive state.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setCurrentView('app-dashboard')}
              className="w-full sm:w-auto cursor-pointer"
            >
              Open Trading Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('options')}
              className="w-full sm:w-auto cursor-pointer"
            >
              Explore Options Contracts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
