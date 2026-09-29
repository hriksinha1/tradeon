import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  CheckCircle2,
  ArrowRight,
  Receipt,
  Wallet,
  Check,
  RotateCcw,
} from 'lucide-react';

export const BuyJourneySection: React.FC = () => {
  const { openBuySell, products, wallet } = useTrading();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [demoUnits, setDemoUnits] = useState<number>(5);

  const sampleProduct = products[0] || {
    id: 'ATLAS-01',
    name: 'Atlas Contract Units',
    currentValue: 2450,
    availableUnits: 4200,
    category: 'Category A',
  };

  const unitPrice = sampleProduct.currentValue;
  const subtotal = unitPrice * demoUnits;
  const platformFee = Math.round(subtotal * 0.001);
  const totalCost = subtotal + platformFee;

  const journeySteps = [
    {
      num: 1,
      title: 'Understand the product',
      headline: 'Inspect current value and available supply.',
      detail:
        'Before committing a single rupee, you see the indicative value, recent movement, available quota, and commercial context on one clear screen.',
    },
    {
      num: 2,
      title: 'Choose quantity',
      headline: 'Adjust unit count with instant recalculation.',
      detail:
        'Select your exact unit quantity with a clean stepper. The interface recalculates the subtotal and fee in real time with zero hidden charges.',
    },
    {
      num: 3,
      title: 'Review the amount',
      headline: 'Total deduction displayed clearly before action.',
      detail:
        'Review the unit price, unit count, and the explicit 0.1% platform fee. You see the exact cash debit that will be deducted from your wallet.',
    },
    {
      num: 4,
      title: 'Confirm',
      headline: 'Authorize with explicit intent.',
      detail:
        'A single clear prompt asks for confirmation. No accidental clicks or auto-executing surprises.',
    },
    {
      num: 5,
      title: 'See the result',
      headline: 'Instant order execution receipt.',
      detail:
        'Your order executes immediately. You receive a structured order slip showing the order reference ID, filled units, and timestamp.',
    },
    {
      num: 6,
      title: 'See it in your records',
      headline: 'Itemized entry logged to your ledger.',
      detail:
        'The transaction instantly debits from your wallet balance and logs a clean double-entry ledger record with your updated running balance.',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-14 sm:mb-18">
          <div className="text-xs font-semibold text-[#005EA8] tracking-wider uppercase">
            The Complete Story
          </div>
          <h2 className="text-[34px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
            What happens when you click Buy?
          </h2>
          <p className="text-[17px] sm:text-[19px] text-[#5A5A53] leading-relaxed">
            A transparent journey from initial curiosity to verified ledger record. No hidden markups, delayed confirmations, or mystery debits.
          </p>
        </div>

        {/* 6-Step Stepper Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {journeySteps.map((step) => {
            const isCurrent = activeStep === step.num;
            const isCompleted = activeStep > step.num;

            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`p-3 rounded-[12px] text-left transition-all border cursor-pointer ${
                  isCurrent
                    ? 'bg-[#171A17] text-white border-[#171A17] shadow-xs'
                    : isCompleted
                    ? 'bg-[#F0FAFF] text-[#005EA8] border-[#0070BA]'
                    : 'bg-[#F7F6F2] text-[#5A5A53] border-[#E2E1DA] hover:bg-[#EFEEE9]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                  <span>0{step.num}</span>
                  {isCompleted && <Check className="w-3.5 h-3.5 text-[#005EA8]" />}
                </div>
                <div className="text-xs font-bold truncate">{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* 2-Column Split: Step Details & Interactive Live Reconstructed Product UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Narrative Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#005EA8] uppercase tracking-wider block">
                Step 0{activeStep} of 06 · {journeySteps[activeStep - 1].title}
              </span>
              <h3 className="text-[26px] sm:text-[32px] font-extrabold text-[#171A17] leading-tight">
                {journeySteps[activeStep - 1].headline}
              </h3>
              <p className="text-[16px] text-[#5A5A53] leading-relaxed">
                {journeySteps[activeStep - 1].detail}
              </p>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 text-xs font-bold rounded-[8px] border border-[#CBCAC2] text-[#171A17] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EFEEE9] transition-colors cursor-pointer"
              >
                Previous Step
              </button>

              <button
                onClick={() => {
                  if (activeStep === 6) {
                    setActiveStep(1);
                  } else {
                    setActiveStep((prev) => prev + 1);
                  }
                }}
                className="px-5 py-2 text-xs font-bold rounded-[8px] bg-[#0070BA] text-[#0C0F0C] hover:bg-[#005EA8] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>{activeStep === 6 ? 'Restart Walkthrough' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Reconstructed Real Product UI at this Step */}
          <div className="lg:col-span-7 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[24px] p-6 sm:p-8 shadow-xs">
            {/* Step 1 UI: Understand the product */}
            {activeStep === 1 && (
              <div className="bg-[#FFFFFF] border border-[#E2E1DA] rounded-[18px] p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#EFEEE9]">
                  <div>
                    <span className="font-mono text-xs text-[#005EA8] font-bold">
                      {sampleProduct.id}
                    </span>
                    <h4 className="text-[22px] font-bold text-[#171A17] mt-0.5">
                      {sampleProduct.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#6B6B63]">Indicative unit value</span>
                    <div className="text-[24px] font-extrabold text-[#171A17] tabular-nums mt-0.5">
                      {formatINR(sampleProduct.currentValue)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F7F6F2] rounded-[10px]">
                    <span className="text-[#6B6B63] block">Available quota</span>
                    <span className="text-sm font-bold text-[#171A17] block mt-0.5">
                      {sampleProduct.availableUnits.toLocaleString()} units
                    </span>
                  </div>
                  <div className="p-3 bg-[#F7F6F2] rounded-[10px]">
                    <span className="text-[#6B6B63] block">Category classification</span>
                    <span className="text-sm font-bold text-[#171A17] block mt-0.5">
                      {sampleProduct.category}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 UI: Choose quantity */}
            {activeStep === 2 && (
              <div className="bg-[#FFFFFF] border border-[#E2E1DA] rounded-[18px] p-6 space-y-5">
                <div className="flex justify-between items-center text-xs text-[#6B6B63]">
                  <span>Ordering units for {sampleProduct.name}</span>
                  <span className="text-[#005EA8] font-medium">Real-time calculator</span>
                </div>

                <div className="p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA] flex items-center justify-between">
                  <span className="text-sm font-bold text-[#171A17]">Number of units</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setDemoUnits((u) => Math.max(1, u - 1))}
                      className="w-8 h-8 rounded-[8px] bg-white border border-[#CBCAC2] font-bold text-[#171A17] hover:bg-[#EFEEE9] flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-[20px] font-extrabold text-[#171A17] tabular-nums w-10 text-center">
                      {demoUnits}
                    </span>
                    <button
                      onClick={() => setDemoUnits((u) => u + 1)}
                      className="w-8 h-8 rounded-[8px] bg-white border border-[#CBCAC2] font-bold text-[#171A17] hover:bg-[#EFEEE9] flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-xs text-[#5A5A53] flex justify-between">
                  <span>Subtotal ({demoUnits} × {formatINR(unitPrice)})</span>
                  <span className="font-bold text-[#171A17] tabular-nums">{formatINR(subtotal)}</span>
                </div>
              </div>
            )}

            {/* Step 3 UI: Review the amount */}
            {activeStep === 3 && (
              <div className="bg-[#FFFFFF] border border-[#E2E1DA] rounded-[18px] p-6 space-y-4">
                <div className="text-xs font-bold text-[#171A17] uppercase tracking-wider pb-2 border-b border-[#EFEEE9]">
                  Order Slip Breakdown
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#5A5A53]">
                    <span>Item: {sampleProduct.name}</span>
                    <span className="font-semibold text-[#171A17]">{demoUnits} units</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A53]">
                    <span>Price per unit</span>
                    <span className="font-semibold text-[#171A17]">{formatINR(unitPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A53]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#171A17]">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A53]">
                    <span>Platform processing fee (0.1%)</span>
                    <span className="font-semibold text-[#171A17]">{formatINR(platformFee)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EFEEE9] flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-[#6B6B63]">Net wallet debit</span>
                    <div className="text-[22px] font-extrabold text-[#005EA8] tabular-nums">
                      {formatINR(totalCost)}
                    </div>
                  </div>
                  <span className="text-[11px] text-[#6B6B63]">Zero hidden surcharges</span>
                </div>
              </div>
            )}

            {/* Step 4 UI: Confirm */}
            {activeStep === 4 && (
              <div className="bg-[#FFFFFF] border border-[#E2E1DA] rounded-[18px] p-6 space-y-5 text-center">
                <div className="w-12 h-12 rounded-full bg-[#F0FAFF] text-[#005EA8] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-[20px] font-bold text-[#171A17]">Confirm Purchase Order</h4>
                  <p className="text-xs text-[#5A5A53] mt-1">
                    You are authorizing a debit of {formatINR(totalCost)} from your available cash for {demoUnits} units of {sampleProduct.name}.
                  </p>
                </div>

                <div className="p-3 bg-[#F7F6F2] rounded-[12px] text-xs text-[#5A5A53] flex items-center justify-between">
                  <span>Available wallet cash</span>
                  <span className="font-bold text-[#171A17]">{formatINR(wallet.availableBalance)}</span>
                </div>

                <button
                  onClick={() => setActiveStep(5)}
                  className="w-full py-3 bg-[#0070BA] text-[#0C0F0C] font-bold text-sm rounded-[10px] hover:bg-[#005EA8] transition-colors cursor-pointer shadow-xs"
                >
                  Click to Authorize & Execute
                </button>
              </div>
            )}

            {/* Step 5 UI: See the result */}
            {activeStep === 5 && (
              <div className="bg-[#FFFFFF] border border-[#E2E1DA] rounded-[18px] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFEEE9]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16803C]" />
                    <span className="font-bold text-xs text-[#171A17]">Order Executed</span>
                  </div>
                  <span className="font-mono text-xs text-[#6B6B63]">ORD-9912084</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#5A5A53]">Product</span>
                    <span className="font-bold text-[#171A17]">{sampleProduct.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A5A53]">Units Acquired</span>
                    <span className="font-bold text-[#171A17]">{demoUnits} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A5A53]">Execution Value</span>
                    <span className="font-bold text-[#171A17]">{formatINR(totalCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A5A53]">Status</span>
                    <span className="font-bold text-[#0A7A45]">Filled & Settled</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F0FAFF] rounded-[12px] text-xs text-[#005EA8] flex items-center justify-between">
                  <span>Unit balance credited to portfolio</span>
                  <Check className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Step 6 UI: See it reflected in your records */}
            {activeStep === 6 && (
              <div className="bg-[#FFFFFF] border border-[#E2E1DA] rounded-[18px] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFEEE9]">
                  <span className="font-bold text-xs text-[#171A17]">Double-Entry Ledger Record</span>
                  <span className="font-mono text-xs text-[#005EA8]">TXN-88219</span>
                </div>

                <div className="p-3 bg-[#F7F6F2] rounded-[12px] space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-[#171A17]">
                    <span>Bought {demoUnits} units {sampleProduct.name}</span>
                    <span className="text-[#BF2A2A] font-mono">-{formatINR(totalCost)}</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A53] pt-1 border-t border-[#E2E1DA]">
                    <span>Updated Running Cash Balance</span>
                    <span className="font-bold text-[#171A17]">
                      {formatINR(wallet.availableBalance - totalCost)}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#5A5A53] flex items-center justify-between pt-1">
                  <span>Timestamp: Just now</span>
                  <span className="text-[#005EA8] font-semibold">Reconciled to ledger</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
