import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ArrowRight, SlidersHorizontal, Info, ShieldCheck, ChevronRight } from 'lucide-react';
import { formatINR } from '../../constants/designTokens';

export const HomepageOptionsSection: React.FC = () => {
  const { setCurrentView, openBuySell, products } = useTrading();
  const [selectedType, setSelectedType] = useState<'CALL' | 'PUT'>('CALL');
  const [viewMode, setViewMode] = useState<'intuitive' | 'contract'>('intuitive');

  const optionsData = [
    {
      symbol: 'ATLAS-C 2500',
      productName: 'Atlas Contract Units',
      type: 'CALL' as const,
      strike: 2500,
      currentVal: 2450,
      premium: 79.8,
      bid: 78.5,
      ask: 81.0,
      expiry: '28 Nov 2026',
      openInterest: 1420,
      volume: 380,
      sentiment: 'Bullish exposure',
      explanation:
        'Secures the right to acquire Atlas units at ₹2,500.00 before expiry. Risk is capped at the ₹79.80 premium paid.',
    },
    {
      symbol: 'NOVA-P 1800',
      productName: 'Nova Unit Allocation',
      type: 'PUT' as const,
      strike: 1800,
      currentVal: 1820,
      premium: 54.2,
      bid: 53.0,
      ask: 55.4,
      expiry: '28 Nov 2026',
      openInterest: 960,
      volume: 215,
      sentiment: 'Downside hedge',
      explanation:
        'Secures the right to exit Nova units at ₹1,800.00. Used by marketplace holders to protect value against price dips.',
    },
    {
      symbol: 'ORBIT-C 3100',
      productName: 'Orbit Commercial Units',
      type: 'CALL' as const,
      strike: 3100,
      currentVal: 3050,
      premium: 112.5,
      bid: 111.0,
      ask: 114.0,
      expiry: '15 Dec 2026',
      openInterest: 1850,
      volume: 420,
      sentiment: 'Growth leverage',
      explanation:
        'Allows participation in Orbit unit appreciation above ₹3,100.00 with defined capital outlay.',
    },
    {
      symbol: 'PULSE-P 420',
      productName: 'Pulse Micro Units',
      type: 'PUT' as const,
      strike: 420,
      currentVal: 435,
      premium: 18.0,
      bid: 17.5,
      ask: 18.6,
      expiry: '28 Nov 2026',
      openInterest: 3120,
      volume: 890,
      sentiment: 'Inventory collar',
      explanation:
        'Provides an exit guarantee at ₹420.00 for active unit traders balancing fluctuating inventory value.',
    },
  ];

  const filteredOptions = optionsData.filter((o) => o.type === selectedType);

  return (
    <section className="py-20 sm:py-28 bg-[#0B0E11] border-b border-[#2B3139]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Structured Contracts
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.12]">
            More control when the decision gets more complex.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            Standard buy and sell orders work well for simple trades. But when you want to take a view with capped downside risk or hedge existing positions, structured contracts give you defined outcomes.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#2B3139]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedType('CALL')}
              className={`px-4 py-2 rounded-[6px] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedType === 'CALL'
                  ? 'bg-[#102A22] text-[#0ECB81] border border-[#0ECB81]/40'
                  : 'bg-[#161A1E] text-[#848E9C] hover:text-[#F5F5F5] border border-[#2B3139]'
              }`}
            >
              <span>Call Options</span>
              <span className="text-[10px] font-mono opacity-80">(Bullish)</span>
            </button>

            <button
              onClick={() => setSelectedType('PUT')}
              className={`px-4 py-2 rounded-[6px] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedType === 'PUT'
                  ? 'bg-[#301820] text-[#F6465D] border border-[#F6465D]/40'
                  : 'bg-[#161A1E] text-[#848E9C] hover:text-[#F5F5F5] border border-[#2B3139]'
              }`}
            >
              <span>Put Options</span>
              <span className="text-[10px] font-mono opacity-80">(Downside Hedge)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#848E9C]">Display mode:</span>
            <div className="inline-flex rounded-[6px] border border-[#2B3139] bg-[#161A1E] p-0.5">
              <button
                onClick={() => setViewMode('intuitive')}
                className={`px-3 py-1 text-xs font-medium rounded-[4px] transition-colors cursor-pointer ${
                  viewMode === 'intuitive'
                    ? 'bg-[#1E2329] text-[#F0B90B] font-semibold'
                    : 'text-[#848E9C] hover:text-[#F5F5F5]'
                }`}
              >
                Intuitive Cards
              </button>
              <button
                onClick={() => setViewMode('contract')}
                className={`px-3 py-1 text-xs font-medium rounded-[4px] transition-colors cursor-pointer ${
                  viewMode === 'contract'
                    ? 'bg-[#1E2329] text-[#F0B90B] font-semibold'
                    : 'text-[#848E9C] hover:text-[#F5F5F5]'
                }`}
              >
                Contract Matrix
              </button>
            </div>
          </div>
        </div>

        {/* Progressive Options Display */}
        {viewMode === 'intuitive' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOptions.map((opt) => (
              <div
                key={opt.symbol}
                className="bg-[#161A1E] border border-[#2B3139] hover:border-[#363C45] rounded-[10px] p-6 transition-all space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-[#F0B90B] font-semibold block mb-1">
                      {opt.symbol}
                    </span>
                    <h3 className="text-[18px] font-bold text-[#F5F5F5]">{opt.productName}</h3>
                    <div className="text-xs text-[#848E9C] mt-0.5">
                      Expiry date: <span className="font-semibold text-[#B7BDC6]">{opt.expiry}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-[#848E9C]">Contract Premium</div>
                    <div className="text-[20px] font-extrabold text-[#F5F5F5] tabular-nums mt-0.5">
                      {formatINR(opt.premium)}
                    </div>
                    <div className="text-[11px] text-[#848E9C] font-mono">
                      Bid {formatINR(opt.bid)} · Ask {formatINR(opt.ask)}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#111418] rounded-[6px] border border-[#2B3139] text-[13px] text-[#B7BDC6] leading-relaxed">
                  <div className="text-xs font-semibold text-[#F5F5F5] mb-1">
                    Contract Specification:
                  </div>
                  {opt.explanation}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="bg-[#111418] p-2.5 rounded-[6px] border border-[#2B3139]/60">
                    <div className="text-[11px] text-[#848E9C]">Strike Level</div>
                    <div className="text-[13px] font-bold text-[#F5F5F5] tabular-nums font-mono mt-0.5">
                      {formatINR(opt.strike)}
                    </div>
                  </div>
                  <div className="bg-[#111418] p-2.5 rounded-[6px] border border-[#2B3139]/60">
                    <div className="text-[11px] text-[#848E9C]">Open Interest</div>
                    <div className="text-[13px] font-bold text-[#F5F5F5] tabular-nums font-mono mt-0.5">
                      {opt.openInterest.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-[#111418] p-2.5 rounded-[6px] border border-[#2B3139]/60">
                    <div className="text-[11px] text-[#848E9C]">Max Risk</div>
                    <div className="text-[13px] font-bold text-[#F0B90B] tabular-nums font-mono mt-0.5">
                      {formatINR(opt.premium)}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-[#848E9C] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0ECB81]" />
                    Defined capital cap
                  </span>

                  <button
                    onClick={() => {
                      setCurrentView('options');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 bg-[#1E2329] text-[#F5F5F5] hover:bg-[#23282F] hover:text-[#F0B90B] font-semibold text-xs rounded-[6px] border border-[#2B3139] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Inspect Specification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#111418] border-b border-[#2B3139] text-[11px] font-semibold text-[#848E9C] uppercase tracking-wider">
                    <th className="py-3 px-4">Contract Symbol</th>
                    <th className="py-3 px-4">Underlying</th>
                    <th className="py-3 px-4 text-right">Strike</th>
                    <th className="py-3 px-4 text-right">Bid</th>
                    <th className="py-3 px-4 text-right">Ask</th>
                    <th className="py-3 px-4 text-right">Last Premium</th>
                    <th className="py-3 px-4 text-right">Expiry</th>
                    <th className="py-3 px-4 text-right">OI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2B3139]">
                  {filteredOptions.map((opt) => (
                    <tr
                      key={opt.symbol}
                      className="hover:bg-[#1E2329] transition-colors cursor-pointer"
                      onClick={() => {
                        setCurrentView('options');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-[#F0B90B]">
                        {opt.symbol}
                      </td>
                      <td className="py-3 px-4 font-medium text-[#F5F5F5]">
                        {opt.productName}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums font-mono text-[#F5F5F5]">
                        {formatINR(opt.strike)}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums font-mono text-[#0ECB81]">
                        {formatINR(opt.bid)}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums font-mono text-[#F6465D]">
                        {formatINR(opt.ask)}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums font-mono font-bold text-[#F5F5F5]">
                        {formatINR(opt.premium)}
                      </td>
                      <td className="py-3 px-4 text-right text-[#848E9C]">
                        {opt.expiry}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums font-mono text-[#848E9C]">
                        {opt.openInterest.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
