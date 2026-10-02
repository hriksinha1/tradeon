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
    currentValue: 2480,
    availableUnits: 1240,
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
        'Before committing a single rupee, you see the indicative value, recent movement, available quota, and book depth on one screen.',
    },
    {
      num: 2,
      title: 'Choose quantity',
      headline: 'Adjust unit count with instant recalculation.',
      detail:
        'Select your exact unit quantity with clean percentage buttons. The interface recalculates the subtotal and fee in real time.',
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
        'A single clear prompt asks for confirmation. No accidental executions or surprise slippage.',
    },
    {
      num: 5,
      title: 'Execution receipt',
      headline: 'Instant order ID and fill verification.',
      detail:
        'An immediate confirmation receipt confirms your unit allocation and unique transaction identifier.',
    },
    {
      num: 6,
      title: 'Audit record',
      headline: 'Stored permanently in your double-entry ledger.',
      detail:
        'The entry appears in your ledger with timestamp, reference hash, and updated running balance for accounting verification.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white text-[#181A20] border-b border-[#EAECEF] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="text-[12px] font-bold text-[#946800] tracking-wider uppercase">
            Order Lifecycle
          </div>
          <h2 className="text-[30px] sm:text-[42px] font-bold text-[#181A20] tracking-tight leading-[1.12]">
            What happens when you click Buy?
          </h2>
          <p className="text-[16px] text-[#707A8A] leading-relaxed">
            Every trade is an intentional financial event. Here is how Tradeon guides you through order entry, execution review, and immutable accounting.
          </p>
        </div>

        {/* 6 Steps Grid + Interactive Preview Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List (7 cols) */}
          <div className="lg:col-span-7 space-y-2">
            {journeySteps.map((s) => (
              <div
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`p-4 rounded-[6px] border transition-all cursor-pointer ${
                  activeStep === s.num
                    ? 'bg-[#FEF6D8]/50 border-[#F0B90B] shadow-xs'
                    : 'bg-white border-[#DFE2E6] hover:border-[#CFD3D8]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-[3px] flex items-center justify-center text-[12px] font-mono font-bold shrink-0 mt-0.5 ${
                      activeStep === s.num
                        ? 'bg-[#F0B90B] text-[#181A20]'
                        : 'bg-[#F5F6F8] text-[#707A8A]'
                    }`}
                  >
                    0{s.num}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#181A20]">{s.title}</h3>
                    <p className="text-[13px] text-[#707A8A] mt-1 leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Simulation Drawer (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#DFE2E6] rounded-[6px] p-6 space-y-4 shadow-xl sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAECEF]">
              <span className="text-[12px] font-bold text-[#946800] uppercase font-sans">
                Stage {activeStep} Simulation
              </span>
              <span className="text-[11px] font-mono text-[#707A8A]">Step {activeStep} of 6</span>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="p-3 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[4px] space-y-2">
                <div className="flex justify-between text-[#707A8A]">
                  <span>Instrument:</span>
                  <span className="font-bold text-[#181A20]">{sampleProduct.name}</span>
                </div>
                <div className="flex justify-between text-[#707A8A]">
                  <span>Unit Price:</span>
                  <span className="font-semibold text-[#181A20] tabular-nums font-mono">{formatINR(unitPrice)}</span>
                </div>
                <div className="flex justify-between items-center text-[#707A8A]">
                  <span>Units:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDemoUnits(Math.max(1, demoUnits - 1))}
                      className="w-6 h-6 rounded bg-white border border-[#DFE2E6] text-[#181A20] hover:text-[#946800] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-[#181A20] tabular-nums font-mono">{demoUnits}</span>
                    <button
                      onClick={() => setDemoUnits(demoUnits + 1)}
                      className="w-6 h-6 rounded bg-white border border-[#DFE2E6] text-[#181A20] hover:text-[#946800] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-[#707A8A]">
                  <span>Platform Fee (0.10%):</span>
                  <span className="font-semibold text-[#707A8A] tabular-nums font-mono">{formatINR(platformFee)}</span>
                </div>
                <div className="pt-2 border-t border-[#DFE2E6] flex justify-between font-bold text-[14px]">
                  <span className="text-[#181A20]">Total Net Cost:</span>
                  <span className="text-[#946800] tabular-nums font-mono">{formatINR(totalCost)}</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              size="md"
              onClick={() => openBuySell('buy', sampleProduct)}
              className="font-bold cursor-pointer"
            >
              Test Live Order Slip
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyJourneySection;
