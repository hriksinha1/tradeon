import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import {
  Smartphone,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Search,
  Check,
  ShieldCheck,
} from 'lucide-react';

export const MobileAppsShowcaseSection: React.FC = () => {
  const { setDeviceFrame, setCurrentView, products, wallet } = useTrading();
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const stages = [
    {
      kicker: 'Phase 01',
      title: 'Find it.',
      headline: 'Quick discovery without endless scrolling.',
      description:
        'Search products, filter by 24h volume, or inspect trending units with real-time indicative pricing and unit quotas right from your home feed.',
      screenContent: (
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#2B3139]">
            <span className="text-xs font-bold text-[#F5F5F5]">Marketplace</span>
            <span className="text-[10px] font-mono text-[#F0B90B] bg-[#302A15] px-2 py-0.5 rounded-[4px] border border-[#F0B90B]/30">Live</span>
          </div>

          <div className="p-2 bg-[#111418] rounded-[6px] border border-[#2B3139] flex items-center gap-2 text-xs text-[#848E9C]">
            <Search className="w-3.5 h-3.5 text-[#848E9C]" />
            <span>Search listed products...</span>
          </div>

          <div className="space-y-2 pt-1">
            {products.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-2.5 bg-[#161A1E] rounded-[6px] border border-[#2B3139] flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-[13px] text-[#F5F5F5]">{p.name}</div>
                  <div className="text-[10px] text-[#848E9C]">
                    {p.availableUnits.toLocaleString()} units
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[13px] text-[#F5F5F5] tabular-nums font-mono">
                    {formatINR(p.currentValue)}
                  </div>
                  <div className="text-[10px] font-semibold text-[#0ECB81] font-mono">+{p.changePercent}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      kicker: 'Phase 02',
      title: 'Understand it.',
      headline: 'Full context before committing a rupee.',
      description:
        'Every unit card opens a structured dossier: verified specifications, spread indicators, risk notes, and double-entry settlement terms.',
      screenContent: (
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#2B3139]">
            <span className="text-xs font-bold text-[#F5F5F5]">Unit Dossier</span>
            <span className="text-[10px] font-mono text-[#0ECB81]">Verified</span>
          </div>

          <div className="p-3 bg-[#161A1E] rounded-[6px] border border-[#2B3139] space-y-2">
            <div className="text-sm font-bold text-[#F5F5F5]">Atlas Contract Units</div>
            <div className="text-[11px] text-[#848E9C] leading-relaxed">
              Standardized units for enterprise allocation. Settles to available cash upon order confirmation.
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-[#111418] p-1.5 rounded-[4px]">
                <div className="text-[#848E9C]">Max Supply</div>
                <div className="font-bold text-[#F5F5F5] font-mono">10,000</div>
              </div>
              <div className="bg-[#111418] p-1.5 rounded-[4px]">
                <div className="text-[#848E9C]">Unit Price</div>
                <div className="font-bold text-[#F0B90B] font-mono">₹2,450.00</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      kicker: 'Phase 03',
      title: 'Decide with clarity.',
      headline: 'A two-step slip with zero hidden math.',
      description:
        'Review unit quantity, total cost, and platform fees with complete visual clarity before confirming your order.',
      screenContent: (
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#2B3139]">
            <span className="text-xs font-bold text-[#F5F5F5]">Order Confirmation</span>
            <span className="text-[10px] font-mono text-[#4C8FFF]">Step 2 of 2</span>
          </div>

          <div className="p-3 bg-[#161A1E] rounded-[6px] border border-[#2B3139] space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#848E9C]">Order Type</span>
              <span className="font-bold text-[#0ECB81]">BUY (Market)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#848E9C]">Units</span>
              <span className="font-bold text-[#F5F5F5] font-mono">5 Units</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#848E9C]">Gross Amount</span>
              <span className="font-bold text-[#F5F5F5] font-mono">₹12,250.00</span>
            </div>
            <div className="flex justify-between text-xs pt-1 border-t border-[#2B3139]">
              <span className="font-bold text-[#F5F5F5]">Total Deduction</span>
              <span className="font-extrabold text-[#F0B90B] font-mono">₹12,250.00</span>
            </div>
          </div>

          <div className="w-full py-2 bg-[#0ECB81] text-[#181A20] font-bold text-center rounded-[6px] text-xs">
            Confirm & Execute Order
          </div>
        </div>
      ),
    },
    {
      kicker: 'Phase 04',
      title: 'Keep track.',
      headline: 'Your portfolio and ledger in one pocket.',
      description:
        'Real-time P&L changes, open order statuses, and sequential ledger audit entries available instantly on your phone.',
      screenContent: (
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[#2B3139]">
            <span className="text-xs font-bold text-[#F5F5F5]">Portfolio Summary</span>
            <span className="text-[10px] font-mono text-[#0ECB81]">+3.4% 24h</span>
          </div>

          <div className="p-3 bg-[#161A1E] rounded-[6px] border border-[#2B3139] space-y-2">
            <div className="text-[11px] text-[#848E9C]">Total Portfolio Value</div>
            <div className="text-xl font-extrabold text-[#F5F5F5] font-mono tabular-nums">
              {formatINR(wallet.totalValue)}
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#2B3139]">
              <span className="text-[#848E9C]">Available Cash</span>
              <span className="font-bold text-[#F0B90B] font-mono">{formatINR(wallet.availableBalance)}</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStage = stages[activeStageIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0E11] text-[#F5F5F5] border-b border-[#2B3139]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14 sm:mb-18 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Multi-Platform Experience
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.12]">
            The whole trading terminal in your hand.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            Tradeon is engineered natively for high-density mobile viewports. No trimmed-down tables or missing controls.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: 4 Progression Stages */}
          <div className="lg:col-span-6 space-y-3">
            {stages.map((stage, idx) => (
              <div
                key={stage.title}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-5 rounded-[8px] border transition-all cursor-pointer ${
                  activeStageIndex === idx
                    ? 'bg-[#161A1E] border-[#F0B90B]/50 shadow-md'
                    : 'bg-[#111418] border-[#2B3139] hover:border-[#363C45]'
                }`}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] ${
                      activeStageIndex === idx
                        ? 'bg-[#F0B90B] text-[#181A20]'
                        : 'bg-[#1E2329] text-[#848E9C]'
                    }`}
                  >
                    {stage.kicker}
                  </span>
                  <span className="text-base font-bold text-[#F5F5F5]">{stage.title}</span>
                </div>
                <div className="text-sm font-semibold text-[#B7BDC6] mb-1">
                  {stage.headline}
                </div>
                <p className="text-xs text-[#848E9C] leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: High-Fidelity Mobile Frame Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* Phone Mockup */}
            <div className="w-[300px] h-[580px] bg-[#111418] border-[6px] border-[#23282F] rounded-[40px] p-3 shadow-2xl shadow-black relative flex flex-col justify-between overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#161A1E] mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#0ECB81]" />
              </div>

              {/* Status bar */}
              <div className="pt-2 px-3 flex items-center justify-between text-[10px] text-[#848E9C] font-mono">
                <span>09:41</span>
                <span className="flex items-center gap-1">5G 100%</span>
              </div>

              {/* Active Stage Screen Content */}
              <div className="flex-1 my-3 overflow-y-auto px-2">
                {currentStage.screenContent}
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-28 h-1 bg-[#474F59] rounded-full mx-auto mb-1" />
            </div>

            {/* Device Switcher Trigger */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs text-[#848E9C]">Simulate on device:</span>
              <button
                onClick={() => setDeviceFrame('ios')}
                className="px-2.5 py-1 text-xs font-mono font-medium rounded-[4px] bg-[#161A1E] text-[#B7BDC6] border border-[#2B3139] hover:text-[#F0B90B] hover:border-[#F0B90B]/50 transition-colors cursor-pointer"
              >
                iPhone 16 Pro
              </button>
              <button
                onClick={() => setDeviceFrame('android')}
                className="px-2.5 py-1 text-xs font-mono font-medium rounded-[4px] bg-[#161A1E] text-[#B7BDC6] border border-[#2B3139] hover:text-[#F0B90B] hover:border-[#F0B90B]/50 transition-colors cursor-pointer"
              >
                Pixel 9 Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
