import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Sliders,
} from 'lucide-react';

export const OptionsPage: React.FC = () => {
  const { options, setCurrentView } = useTrading();
  const [selectedType, setSelectedType] = useState<'all' | 'call' | 'put'>('all');

  const filteredOptions =
    selectedType === 'all'
      ? options
      : options.filter((o) => o.type.toLowerCase() === selectedType);

  return (
    <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Structured Contracts
          </div>
          <h1 className="text-[34px] sm:text-[48px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.08]">
            When a simple order is not enough.
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            Structured order experiences for users who need more than a simple buy or sell. Predefined strike levels, clear premium calculations, and bounded downside risk.
          </p>
        </div>

        {/* 3 Conceptual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 space-y-3">
            <div className="text-xs font-bold text-[#0ECB81] uppercase tracking-wider font-mono">
              Upside Participation
            </div>
            <h3 className="text-[18px] font-bold text-[#F5F5F5]">Call Options</h3>
            <p className="text-[14px] text-[#848E9C] leading-relaxed">
              Provides the right to participate in product appreciation above a target strike price, while limiting your maximum financial risk strictly to the premium paid.
            </p>
          </div>

          <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 space-y-3">
            <div className="text-xs font-bold text-[#F6465D] uppercase tracking-wider font-mono">
              Downside Protection
            </div>
            <h3 className="text-[18px] font-bold text-[#F5F5F5]">Put Options</h3>
            <p className="text-[14px] text-[#848E9C] leading-relaxed">
              Protects product allocations against downward movement. Enables holders to hedge their inventory or unit allocations at a predetermined price floor.
            </p>
          </div>

          <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 space-y-3">
            <div className="text-xs font-bold text-[#F0B90B] uppercase tracking-wider font-mono">
              Automatic Settlement
            </div>
            <h3 className="text-[18px] font-bold text-[#F5F5F5]">Cash Settlement</h3>
            <p className="text-[14px] text-[#848E9C] leading-relaxed">
              Upon cycle expiry, in-the-money options are automatically cash-settled directly into your wallet balance with a verifiable ledger audit entry.
            </p>
          </div>
        </div>

        {/* Live Options Chain Table Card */}
        <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-5 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#2B3139] gap-4">
            <div>
              <h2 className="text-[20px] font-bold text-[#F5F5F5]">
                Active Demonstration Options Chain
              </h2>
              <p className="text-xs text-[#848E9C] mt-0.5">
                Illustrative contracts available for order testing across ATLAS, NOVA, and ORBIT listings.
              </p>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#111418] border border-[#2B3139] rounded-[6px] self-start sm:self-auto">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1 rounded-[4px] text-xs font-semibold cursor-pointer transition-colors ${
                  selectedType === 'all'
                    ? 'bg-[#F0B90B] text-[#181A20]'
                    : 'text-[#848E9C] hover:text-[#F5F5F5]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('call')}
                className={`px-3 py-1 rounded-[4px] text-xs font-semibold cursor-pointer transition-colors ${
                  selectedType === 'call'
                    ? 'bg-[#102A22] text-[#0ECB81] border border-[#0ECB81]/40'
                    : 'text-[#848E9C] hover:text-[#F5F5F5]'
                }`}
              >
                Calls
              </button>
              <button
                onClick={() => setSelectedType('put')}
                className={`px-3 py-1 rounded-[4px] text-xs font-semibold cursor-pointer transition-colors ${
                  selectedType === 'put'
                    ? 'bg-[#301820] text-[#F6465D] border border-[#F6465D]/40'
                    : 'text-[#848E9C] hover:text-[#F5F5F5]'
                }`}
              >
                Puts
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#2B3139] text-[11px] font-semibold uppercase tracking-wider text-[#848E9C]">
                  <th className="py-3 px-4">Contract Symbol</th>
                  <th className="py-3 px-4">Underlying</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-right">Strike Level</th>
                  <th className="py-3 px-4 text-right">Premium / Unit</th>
                  <th className="py-3 px-4">Expiry Cycle</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B3139]">
                {filteredOptions.map((opt) => {
                  const isCall = opt.type.toLowerCase() === 'call';
                  return (
                    <tr key={opt.id} className="hover:bg-[#1E2329] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#F0B90B]">
                        {opt.id}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#F5F5F5]">
                        {opt.productRef}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-[4px] ${
                            isCall
                              ? 'bg-[#102A22] text-[#0ECB81]'
                              : 'bg-[#301820] text-[#F6465D]'
                          }`}
                        >
                          {opt.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#F5F5F5] tabular-nums font-mono">
                        {formatINR(opt.strike)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#F0B90B] tabular-nums font-mono">
                        {formatINR(opt.premium, { decimals: 2 })}
                      </td>
                      <td className="py-3.5 px-4 text-[#848E9C] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#848E9C]" />
                        <span>{opt.expiry}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => {
                            setCurrentView('app-options');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 bg-[#1E2329] hover:bg-[#23282F] text-[#F5F5F5] hover:text-[#F0B90B] font-bold text-xs rounded-[6px] border border-[#2B3139] transition-colors cursor-pointer"
                        >
                          Trade in Terminal →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-[#848E9C]">
          Options representations are illustrative and intended to demonstrate order workflow architecture without financial performance claims.
        </div>
      </div>
    </div>
  );
};
