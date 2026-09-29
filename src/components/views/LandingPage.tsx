import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Layers,
  Wallet,
  Receipt,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, products, openBuySell } = useTrading();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What types of products and assets can be traded on the platform?',
      a: 'The platform hosts business-listed and verified product contracts, unit rights, and structured allocations. The system is designed with a neutral asset abstraction that adapts to specific business requirements upon commercial launch.',
    },
    {
      q: 'How does trading execution and pricing work?',
      a: 'Orders can be placed via instant Market execution or targeted Limit orders. Settlement is recorded against your internal wallet ledger with real-time balance reconciliation.',
    },
    {
      q: 'Are option-style contracts supported?',
      a: 'Yes. The platform includes structured Call and Put option contracts with predefined expiry cycles, strike levels, and clear payoff transparency.',
    },
    {
      q: 'How are deposits and withdrawals handled?',
      a: 'Funds can be added instantly through modern payment rails including UPI, Net Banking, and corporate cards. Withdrawals are processed directly to verified bank accounts via IMPS/NEFT.',
    },
    {
      q: 'Is my transaction ledger auditable?',
      a: 'Every credit, debit, purchase, and sale is recorded in an immutable ledger with unique audit reference keys and verifiable running balances.',
    },
  ];

  return (
    <div className="bg-[#FAFAF9] text-[#171717]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#E7E5E4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF4F9] border border-[#ECD6E9] rounded-full text-[12px] font-semibold text-[#6A2E62] mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Trading & Marketplace Infrastructure</span>
          </div>

          <h1 className="text-[36px] sm:text-[54px] font-bold tracking-tight text-[#171717] leading-[1.1] max-w-3xl mx-auto text-balance">
            Trade with clarity.
          </h1>

          <p className="mt-4 text-[17px] sm:text-[19px] text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            Discover products, manage positions, and move money through one simple, transparent platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('markets')}
              className="w-full sm:w-auto"
            >
              Browse Available Markets
            </Button>
          </div>

          {/* Product Dashboard Hero Mockup Preview */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto bg-white border border-[#E7E5E4] rounded-[20px] shadow-xl p-4 sm:p-6 text-left relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <div>
                <span className="text-[12px] text-[#78716C] uppercase font-bold tracking-wider">
                  Live Portfolio Preview
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-[28px] font-bold text-[#171717] tabular-nums">
                    {formatINR(482640)}
                  </span>
                  <span className="text-[13px] font-bold text-[#16803C] tabular-nums">
                    +₹6,840 (+1.42% today)
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setCurrentView('dashboard')}>
                  Open Dashboard
                </Button>
              </div>
            </div>

            {/* Micro grid of markets inside preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {products.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => openBuySell('buy', prod)}
                  className="p-3 bg-[#FAFAF9] hover:bg-[#FAF4F9] border border-[#E7E5E4] hover:border-[#ECD6E9] rounded-[12px] cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[14px] font-bold text-[#171717] group-hover:text-[#6A2E62] block">
                        {prod.name}
                      </span>
                      <span className="text-[11px] text-[#78716C]">{prod.id}</span>
                    </div>
                    <span
                      className={`text-[12px] font-semibold tabular-nums ${
                        prod.changePercent >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
                      }`}
                    >
                      {prod.changePercent >= 0 ? '+' : ''}
                      {prod.changePercent}%
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between items-center text-[13px]">
                    <span className="font-bold text-[#171717] tabular-nums">{formatINR(prod.currentValue)}</span>
                    <span className="text-[11px] font-semibold text-[#6A2E62] group-hover:underline">Trade</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Pillars */}
      <section className="py-16 sm:py-20 border-b border-[#E7E5E4] max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#6A2E62]">
            Platform Architecture
          </span>
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#171717] mt-1">
            Built for modern digital exchange.
          </h2>
          <p className="text-[15px] text-[#6B6B6B] mt-2">
            Engineered with institutional accounting precision, intuitive mobile workflows, and flexible product configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#E7E5E4] rounded-[16px]">
            <div className="w-10 h-10 rounded-[10px] bg-[#FAF4F9] text-[#6A2E62] flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-[#171717]">Frictionless Trading</h3>
            <p className="text-[14px] text-[#6B6B6B] mt-2 leading-relaxed">
              Execute buy and sell orders with immediate market execution or tailored limit orders. Real-time balance locking guarantees zero negative slippage.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E5E4] rounded-[16px]">
            <div className="w-10 h-10 rounded-[10px] bg-[#FAF4F9] text-[#6A2E62] flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-[#171717]">Options Contract Framework</h3>
            <p className="text-[14px] text-[#6B6B6B] mt-2 leading-relaxed">
              Explore derivative instruments with call/put chains, defined expiry windows, and transparent payoff visualizations before confirming orders.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E5E4] rounded-[16px]">
            <div className="w-10 h-10 rounded-[10px] bg-[#FAF4F9] text-[#6A2E62] flex items-center justify-center mb-4">
              <Receipt className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-[#171717]">Audited Double-Entry Ledger</h3>
            <p className="text-[14px] text-[#6B6B6B] mt-2 leading-relaxed">
              Every deposit, order settlement, fee, and withdrawal creates a permanent transaction record with verifiable running balance reconciliation.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E7E5E4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#6A2E62]">
              Simple User Journey
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#171717] mt-1">
              Start trading in four easy steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[14px]">
              <span className="w-8 h-8 rounded-full bg-[#6A2E62] text-white flex items-center justify-center font-bold text-[14px] mb-3">
                1
              </span>
              <h4 className="text-[16px] font-bold text-[#171717]">Create & Fund Wallet</h4>
              <p className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed">
                Add funds instantly through UPI, cards, or Net Banking with zero platform deposit fees.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[14px]">
              <span className="w-8 h-8 rounded-full bg-[#6A2E62] text-white flex items-center justify-center font-bold text-[14px] mb-3">
                2
              </span>
              <h4 className="text-[16px] font-bold text-[#171717]">Discover Products</h4>
              <p className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed">
                Filter verified business listings, analyze price metrics, and track historical movement.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[14px]">
              <span className="w-8 h-8 rounded-full bg-[#6A2E62] text-white flex items-center justify-center font-bold text-[14px] mb-3">
                3
              </span>
              <h4 className="text-[16px] font-bold text-[#171717]">Execute Orders</h4>
              <p className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed">
                Place buy or sell orders with clear fee calculations, order verification, and instant fills.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[14px]">
              <span className="w-8 h-8 rounded-full bg-[#6A2E62] text-white flex items-center justify-center font-bold text-[14px] mb-3">
                4
              </span>
              <h4 className="text-[16px] font-bold text-[#171717]">Track & Withdraw</h4>
              <p className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed">
                Monitor portfolio yields in real time and withdraw earnings directly to your bank account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-8 border-b border-[#E7E5E4]">
        <div className="text-center mb-10">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#6A2E62]">
            Frequently Asked Questions
          </span>
          <h2 className="text-[26px] font-bold text-[#171717] mt-1">Answers to common questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="bg-white border border-[#E7E5E4] rounded-[12px] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-[15px] text-[#171717]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#78716C] transition-transform ${
                      isOpen ? 'rotate-180 text-[#6A2E62]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-[13px] text-[#6B6B6B] leading-relaxed border-t border-[#F5F5F4] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 sm:py-20 text-center bg-[#FAF4F9] px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[28px] sm:text-[34px] font-bold text-[#171717] tracking-tight">
            Ready to inspect the live platform?
          </h2>
          <p className="text-[15px] text-[#6B6B6B] mt-2">
            Experience the dashboard, test order executions, review ledger integrity, and inspect the design tokens.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" onClick={() => setCurrentView('dashboard')}>
              Launch Interactive Dashboard
            </Button>
            <Button size="lg" variant="outline" onClick={() => setCurrentView('options')}>
              View Options Chain
            </Button>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="py-8 bg-white border-t border-[#E7E5E4] text-[12px] text-[#78716C]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#6A2E62] flex items-center justify-center text-white font-bold text-[10px]">
              A
            </div>
            <span className="font-bold text-[#171717]">Aura Exchange</span>
            <span>· Confidential Product Prototype</span>
          </div>
          <div className="flex items-center gap-4 text-[#6B6B6B]">
            <button onClick={() => setCurrentView('dashboard')} className="hover:text-[#171717]">Dashboard</button>
            <button onClick={() => setCurrentView('markets')} className="hover:text-[#171717]">Markets</button>
            <button onClick={() => setCurrentView('ledger')} className="hover:text-[#171717]">Audit Ledger</button>
            <button onClick={() => setCurrentView('support')} className="hover:text-[#171717]">Help & Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
