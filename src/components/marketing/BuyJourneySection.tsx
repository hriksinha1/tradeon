import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  CheckCircle2,
  ArrowRight,
  Receipt,
  Wallet,
  ArrowDownLeft,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const BuyJourneySection: React.FC = () => {
  const { openBuySell, products, wallet } = useTrading();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [demoUnits, setDemoUnits] = useState<number>(5);

  const sampleProduct = products[0]; // Atlas Contract
  const unitPrice = sampleProduct.currentValue; // ₹2,480
  const subtotal = unitPrice * demoUnits;
  const platformFee = Math.round(subtotal * 0.001);
  const totalCost = subtotal + platformFee;

  const journeySteps = [
    {
      num: 1,
      title: 'Inspect context',
      tagline: 'See what you are buying before you commit',
      summary: 'Review live value, available business supply, and 24h trading spread without bouncing across multiple screens.',
    },
    {
      num: 2,
      title: 'Choose quantity',
      tagline: 'Real-time calculation with zero hidden math',
      summary: 'Pick exact units or test percentage allocations. Subtotal, fee, and net deduction calculate immediately.',
    },
    {
      num: 3,
      title: 'Confirm order',
      tagline: 'Instant fill backed by internal balance',
      summary: 'Execute at market price or place a target limit. The order is timestamped and filled from available quota.',
    },
    {
      num: 4,
      title: 'Ledger trail',
      tagline: 'Permanent record with running balance',
      summary: 'Your wallet cash debits, your product holding credits, and an immutable audit hash is created in seconds.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Interactive Walkthrough
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            What happens when you click Buy?
          </h2>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            A frictionless order shouldn’t mean blind trust. Here is the exact journey from the moment you decide to act until the record settles in your ledger.
          </p>
        </div>

        {/* Interactive Walkthrough Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 4 Interactive Step Selectors */}
          <div className="lg:col-span-5 space-y-4">
            {journeySteps.map((step) => {
              const isActive = activeStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  className={`w-full text-left p-5 rounded-[18px] border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F7F6F2] border-[#1FC777] shadow-xs'
                      : 'bg-white border-[#E2E1DA] hover:border-[#CBCAC2]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isActive
                            ? 'bg-[#1FC777] text-[#0C0F0C]'
                            : 'bg-[#EFEEE9] text-[#6B6B63]'
                        }`}
                      >
                        0{step.num}
                      </span>
                      <h3 className="text-[17px] font-bold text-[#171A17]">{step.title}</h3>
                    </div>

                    {isActive && (
                      <span className="text-[11px] font-semibold text-[#087A4A]">Active stage</span>
                    )}
                  </div>

                  <p className="mt-2.5 text-[13px] text-[#5A5A53] leading-relaxed pl-10">
                    {step.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Visual State Window */}
          <div className="lg:col-span-7 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[24px] p-6 sm:p-8 shadow-sm">
            {/* Step 1 State: Product Inspection */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E1DA]">
                  <div>
                    <span className="text-xs font-semibold text-[#087A4A]">{sampleProduct.category}</span>
                    <h4 className="text-[24px] font-bold text-[#171A17]">{sampleProduct.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-[24px] font-extrabold text-[#171A17] tabular-nums">
                      {formatINR(unitPrice)}
                    </div>
                    <span className="text-xs font-semibold text-[#0A7A45]">+{sampleProduct.changePercent}% today</span>
                  </div>
                </div>

                <p className="text-[14px] text-[#5A5A53] leading-relaxed">
                  {sampleProduct.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-white rounded-[12px] border border-[#E2E1DA]">
                    <div className="text-xs text-[#6B6B63]">Available Quota</div>
                    <div className="text-[16px] font-bold text-[#171A17] mt-0.5">
                      {sampleProduct.availableUnits.toLocaleString()} units
                    </div>
                  </div>
                  <div className="p-3.5 bg-white rounded-[12px] border border-[#E2E1DA]">
                    <div className="text-xs text-[#6B6B63]">24h Volume</div>
                    <div className="text-[16px] font-bold text-[#171A17] mt-0.5">
                      {formatINR(sampleProduct.volume24h)}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-2.5 bg-[#1FC777] text-[#0C0F0C] font-bold text-[13px] rounded-[10px] hover:bg-[#18B36A] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Proceed to quantity</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 State: Quantity & Math */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E1DA]">
                  <div>
                    <span className="text-xs text-[#6B6B63]">Select allocation</span>
                    <h4 className="text-[20px] font-bold text-[#171A17]">Units & Cost Calculation</h4>
                  </div>
                  <div className="text-xs font-mono text-[#087A4A]">{sampleProduct.id}</div>
                </div>

                {/* Stepper Input */}
                <div className="p-4 bg-white rounded-[14px] border border-[#E2E1DA] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171A17]">Number of units</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setDemoUnits(Math.max(1, demoUnits - 1))}
                        className="w-8 h-8 rounded-[8px] bg-[#EFEEE9] hover:bg-[#E2E1DA] text-[#171A17] font-bold text-[16px] flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-extrabold text-[18px] text-[#171A17] w-10 text-center tabular-nums">
                        {demoUnits}
                      </span>
                      <button
                        onClick={() => setDemoUnits(demoUnits + 1)}
                        className="w-8 h-8 rounded-[8px] bg-[#EFEEE9] hover:bg-[#E2E1DA] text-[#171A17] font-bold text-[16px] flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Calculations */}
                  <div className="pt-3 border-t border-[#EFEEE9] space-y-2 text-xs">
                    <div className="flex justify-between text-[#5A5A53]">
                      <span>Subtotal ({demoUnits} × {formatINR(unitPrice)})</span>
                      <span className="font-semibold text-[#171A17] tabular-nums">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#5A5A53]">
                      <span>Estimated platform settlement fee (0.1%)</span>
                      <span className="font-semibold text-[#171A17] tabular-nums">{formatINR(platformFee)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#EFEEE9] flex justify-between text-[14px] font-bold text-[#171A17]">
                      <span>Total required cash</span>
                      <span className="text-[#087A4A] tabular-nums">{formatINR(totalCost)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs text-[#6B6B63] hover:underline"
                  >
                    ← Back to inspection
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-2.5 bg-[#1FC777] text-[#0C0F0C] font-bold text-[13px] rounded-[10px] hover:bg-[#18B36A] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Review & confirm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 State: Order Confirmation */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-3 p-4 bg-[#E9FAF1] border border-[#A2E8C5] rounded-[16px]">
                  <CheckCircle2 className="w-6 h-6 text-[#12A560] shrink-0" />
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0C0F0C]">Order Filled Successfully</h4>
                    <p className="text-xs text-[#087A4A] mt-0.5">
                      Matched instantly from business reserve quota.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-[14px] border border-[#E2E1DA] space-y-2.5 text-xs">
                  <div className="flex justify-between text-[#5A5A53]">
                    <span>Product</span>
                    <span className="font-bold text-[#171A17]">{sampleProduct.name} ({sampleProduct.id})</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A53]">
                    <span>Filled quantity</span>
                    <span className="font-bold text-[#171A17]">{demoUnits} units</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A53]">
                    <span>Execution price</span>
                    <span className="font-bold text-[#171A17]">{formatINR(unitPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A53]">
                    <span>Total deducted</span>
                    <span className="font-bold text-[#0A7A45]">{formatINR(totalCost)}</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A53]">
                    <span>Order reference</span>
                    <span className="font-mono text-[#171A17]">ORD-9912084</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="text-xs text-[#6B6B63] hover:underline"
                  >
                    ← Edit units
                  </button>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-5 py-2.5 bg-[#1FC777] text-[#0C0F0C] font-bold text-[13px] rounded-[10px] hover:bg-[#18B36A] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>View ledger record</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 State: Ledger Audit Record */}
            {activeStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E1DA]">
                  <div>
                    <span className="text-xs font-semibold text-[#087A4A]">Double-Entry Ledger</span>
                    <h4 className="text-[18px] font-bold text-[#171A17]">Audit Entry #TXN-4921</h4>
                  </div>
                  <span className="text-xs font-mono text-[#0A7A45]">Verified</span>
                </div>

                <div className="bg-white rounded-[14px] border border-[#E2E1DA] overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#EFEEE9] text-[10px] font-bold uppercase text-[#6B6B63] border-b border-[#E2E1DA]">
                        <th className="py-2.5 px-3">Account</th>
                        <th className="py-2.5 px-3 text-right">Debit</th>
                        <th className="py-2.5 px-3 text-right">Credit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEEE9]">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-[#171A17]">Product Holding (Atlas)</td>
                        <td className="py-2.5 px-3 text-right text-[#0A7A45] font-bold">+{demoUnits} units</td>
                        <td className="py-2.5 px-3 text-right text-[#6B6B63]">-</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-[#171A17]">Wallet Cash Reserve</td>
                        <td className="py-2.5 px-3 text-right text-[#6B6B63]">-</td>
                        <td className="py-2.5 px-3 text-right text-[#BF2A2A] font-bold">-{formatINR(totalCost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-[#E9FAF1] border border-[#A2E8C5] rounded-[10px] text-xs text-[#087A4A] flex items-center justify-between">
                  <span>Running Balance reconciled: {formatINR(wallet.availableBalance)}</span>
                  <span className="font-bold">Zero variance</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs text-[#087A4A] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Replay journey from start</span>
                  </button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => openBuySell('buy', sampleProduct)}
                  >
                    Try in live terminal
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
