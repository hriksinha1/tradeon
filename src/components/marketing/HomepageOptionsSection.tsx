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
      symbol: 'VECTOR-P 1200',
      productName: 'Vector Prime Contract',
      type: 'PUT' as const,
      strike: 1200,
      currentVal: 1230,
      premium: 38.0,
      bid: 36.8,
      ask: 39.2,
      expiry: '15 Dec 2026',
      openInterest: 740,
      volume: 160,
      sentiment: 'Floor protection',
      explanation:
        'Establishes a firm exit floor of ₹1,200.00 for Vector units with minimal capital commitment.',
    },
  ];

  const filteredOptions = optionsData.filter((opt) => opt.type === selectedType);

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#CBCAC2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-semibold text-[#005EA8] tracking-wider uppercase">
              Advanced Capability
            </div>
            <h2 className="text-[34px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight leading-[1.12]">
              More control when the decision gets more complex.
            </h2>
            <p className="text-[17px] text-[#5A5A53] leading-relaxed">
              When a straightforward purchase or sale doesn’t fit your strategy, options-style contracts give you defined risk, asymmetric upside, or downside protection on listed marketplace products.
            </p>
          </div>

          {/* Progressive Disclosure Toggle */}
          <div className="flex items-center gap-2 p-1 bg-[#EFEEE9] rounded-[12px] self-start lg:self-auto border border-[#E2E1DA]">
            <button
              onClick={() => setViewMode('intuitive')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[8px] transition-all cursor-pointer ${
                viewMode === 'intuitive'
                  ? 'bg-[#FFFFFF] text-[#171A17] shadow-xs'
                  : 'text-[#6B6B63] hover:text-[#171A17]'
              }`}
            >
              Plain English View
            </button>
            <button
              onClick={() => setViewMode('contract')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[8px] transition-all cursor-pointer ${
                viewMode === 'contract'
                  ? 'bg-[#FFFFFF] text-[#171A17] shadow-xs'
                  : 'text-[#6B6B63] hover:text-[#171A17]'
              }`}
            >
              Contract Matrix
            </button>
          </div>
        </div>

        {/* Call vs Put Segmented Tabs */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setSelectedType('CALL')}
            className={`px-4 py-2 text-sm font-bold rounded-[10px] transition-all cursor-pointer flex items-center gap-2 ${
              selectedType === 'CALL'
                ? 'bg-[#171A17] text-white shadow-xs'
                : 'bg-[#F7F6F2] text-[#5A5A53] border border-[#E2E1DA] hover:text-[#171A17]'
            }`}
          >
            <span>Call Contracts (Right to Acquire)</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-white/20 text-[#0070BA]">
              Upside
            </span>
          </button>

          <button
            onClick={() => setSelectedType('PUT')}
            className={`px-4 py-2 text-sm font-bold rounded-[10px] transition-all cursor-pointer flex items-center gap-2 ${
              selectedType === 'PUT'
                ? 'bg-[#171A17] text-white shadow-xs'
                : 'bg-[#F7F6F2] text-[#5A5A53] border border-[#E2E1DA] hover:text-[#171A17]'
            }`}
          >
            <span>Put Contracts (Right to Exit)</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-white/20 text-[#E5484D]">
              Protection
            </span>
          </button>
        </div>

        {/* Progressive Options Display */}
        {viewMode === 'intuitive' ? (
          /* Intuitive View: Clear, human-readable contract cards with defined risk */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOptions.map((opt) => (
              <div
                key={opt.symbol}
                className="bg-[#F7F6F2] border border-[#CBCAC2] hover:border-[#0070BA] rounded-[20px] p-6 transition-all space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-[#005EA8] font-bold block mb-1">
                      {opt.symbol}
                    </span>
                    <h3 className="text-[20px] font-bold text-[#171A17]">{opt.productName}</h3>
                    <div className="text-xs text-[#6B6B63] mt-0.5">
                      Expiry date: <span className="font-semibold text-[#171A17]">{opt.expiry}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-[#6B6B63]">Contract Premium</div>
                    <div className="text-[22px] font-extrabold text-[#171A17] tabular-nums mt-0.5">
                      {formatINR(opt.premium)}
                    </div>
                    <div className="text-[11px] text-[#5A5A53]">
                      Bid {formatINR(opt.bid)} · Ask {formatINR(opt.ask)}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#FFFFFF] rounded-[12px] border border-[#E2E1DA] text-[13px] text-[#5A5A53] leading-relaxed">
                  <div className="text-xs font-semibold text-[#171A17] mb-1">
                    What this contract does:
                  </div>
                  {opt.explanation}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="bg-[#EFEEE9] p-2 rounded-[8px]">
                    <div className="text-[11px] text-[#6B6B63]">Strike Level</div>
                    <div className="text-[13px] font-bold text-[#171A17] tabular-nums">
                      {formatINR(opt.strike)}
                    </div>
                  </div>
                  <div className="bg-[#EFEEE9] p-2 rounded-[8px]">
                    <div className="text-[11px] text-[#6B6B63]">Open Interest</div>
                    <div className="text-[13px] font-bold text-[#171A17] tabular-nums">
                      {opt.openInterest.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-[#EFEEE9] p-2 rounded-[8px]">
                    <div className="text-[11px] text-[#6B6B63]">Max Capital at Risk</div>
                    <div className="text-[13px] font-bold text-[#005EA8] tabular-nums">
                      {formatINR(opt.premium)}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-[#6B6B63] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
                    Defined loss profile
                  </span>

                  <button
                    onClick={() => {
                      setCurrentView('options');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 bg-[#171A17] text-white hover:bg-[#0C0F0C] font-semibold text-xs rounded-[8px] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Inspect specification</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0070BA]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Contract Matrix View: Clean table for structured traders */
          <div className="bg-[#F7F6F2] border border-[#CBCAC2] rounded-[20px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#EFEEE9] border-b border-[#CBCAC2] text-xs font-semibold text-[#5A5A53]">
                    <th className="py-3 px-4">Contract Symbol</th>
                    <th className="py-3 px-4">Underlying Product</th>
                    <th className="py-3 px-4 text-right">Strike</th>
                    <th className="py-3 px-4 text-right">Bid</th>
                    <th className="py-3 px-4 text-right">Ask</th>
                    <th className="py-3 px-4 text-right">Last Premium</th>
                    <th className="py-3 px-4 text-right">Expiry</th>
                    <th className="py-3 px-4 text-right">OI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E1DA]">
                  {filteredOptions.map((opt) => (
                    <tr key={opt.symbol} className="hover:bg-white/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#171A17] text-xs">
                        {opt.symbol}
                      </td>
                      <td className="py-3 px-4 text-[#5A5A53]">{opt.productName}</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#171A17] tabular-nums">
                        {formatINR(opt.strike)}
                      </td>
                      <td className="py-3 px-4 text-right text-[#5A5A53] tabular-nums">
                        {formatINR(opt.bid)}
                      </td>
                      <td className="py-3 px-4 text-right text-[#5A5A53] tabular-nums">
                        {formatINR(opt.ask)}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#005EA8] tabular-nums">
                        {formatINR(opt.premium)}
                      </td>
                      <td className="py-3 px-4 text-right text-[#5A5A53] text-xs">{opt.expiry}</td>
                      <td className="py-3 px-4 text-right text-[#6B6B63] tabular-nums">
                        {opt.openInterest.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Note & Link to Full Options Page */}
        <div className="mt-10 p-5 rounded-[16px] bg-[#F7F6F2] border border-[#E2E1DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-[#5A5A53]">
            <Info className="w-4 h-4 text-[#6B6B63] shrink-0" />
            <span>
              All contract strikes, premiums, and exercise levels are illustrative models for marketplace simulation. No financial investment advice is provided.
            </span>
          </div>

          <button
            onClick={() => {
              setCurrentView('options');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#005EA8] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <span>Explore full options catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
