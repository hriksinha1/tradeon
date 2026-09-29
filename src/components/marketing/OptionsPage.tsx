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
    <div className="bg-[#F7F6F2] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-semibold text-[#005EA8] tracking-wider uppercase">
            Structured Contracts
          </div>
          <h1 className="text-[38px] sm:text-[54px] font-extrabold text-[#171A17] tracking-tight leading-[1.08]">
            When a simple order is not enough.
          </h1>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            Structured order experiences for users who need more than a simple buy or sell. Predefined strike levels, clear premium calculations, and bounded downside risk.
          </p>
        </div>

        {/* 3 Conceptual Pillars (Clean Unboxed Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs space-y-3">
            <div className="text-xs font-bold text-[#0A7A45] uppercase tracking-wider">
              Upside Participation
            </div>
            <h3 className="text-[20px] font-bold text-[#171A17]">Call Options</h3>
            <p className="text-[14px] text-[#5A5A53] leading-relaxed">
              Provides the right to participate in product appreciation above a target strike price, while limiting your maximum financial risk strictly to the premium paid.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs space-y-3">
            <div className="text-xs font-bold text-[#BF2A2A] uppercase tracking-wider">
              Downside Protection
            </div>
            <h3 className="text-[20px] font-bold text-[#171A17]">Put Options</h3>
            <p className="text-[14px] text-[#5A5A53] leading-relaxed">
              Protects product allocations against downward movement. Enables holders to hedge their inventory or unit allocations at a predetermined price floor.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs space-y-3">
            <div className="text-xs font-bold text-[#005EA8] uppercase tracking-wider">
              Automatic Settlement
            </div>
            <h3 className="text-[20px] font-bold text-[#171A17]">Cash Settlement</h3>
            <p className="text-[14px] text-[#5A5A53] leading-relaxed">
              Upon cycle expiry, in-the-money options are automatically cash-settled directly into your wallet balance with a verifiable ledger audit entry.
            </p>
          </div>
        </div>

        {/* Live Options Chain Table Card */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EFEEE9] gap-4">
            <div>
              <h2 className="text-[22px] font-bold text-[#171A17]">
                Active Demonstration Options Chain
              </h2>
              <p className="text-[14px] text-[#5A5A53] mt-0.5">
                Illustrative contracts available for order testing across ATLAS, NOVA, and ORBIT listings.
              </p>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] self-start sm:self-auto">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 rounded-[7px] text-[12px] font-semibold cursor-pointer ${
                  selectedType === 'all'
                    ? 'bg-[#0070BA] text-[#0C0F0C]'
                    : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('call')}
                className={`px-3 py-1.5 rounded-[7px] text-[12px] font-semibold cursor-pointer ${
                  selectedType === 'call'
                    ? 'bg-[#0070BA] text-[#0C0F0C]'
                    : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                Calls
              </button>
              <button
                onClick={() => setSelectedType('put')}
                className={`px-3 py-1.5 rounded-[7px] text-[12px] font-semibold cursor-pointer ${
                  selectedType === 'put'
                    ? 'bg-[#0070BA] text-[#0C0F0C]'
                    : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                Puts
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#EFEEE9] text-[11px] font-bold uppercase tracking-wider text-[#6B6B63]">
                  <th className="py-3 px-4">Contract symbol</th>
                  <th className="py-3 px-4">Underlying</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-right">Strike level</th>
                  <th className="py-3 px-4 text-right">Premium / unit</th>
                  <th className="py-3 px-4">Expiry cycle</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFEEE9]">
                {filteredOptions.map((opt) => {
                  const isCall = opt.type.toLowerCase() === 'call';
                  return (
                    <tr key={opt.id} className="hover:bg-[#F7F6F2] transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-[#171A17]">
                        {opt.id}
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#5A5A53]">
                        {opt.productRef}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-bold uppercase tracking-wider ${isCall ? 'text-[#0A7A45]' : 'text-[#BF2A2A]'}`}>
                          {opt.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-[#171A17] tabular-nums">
                        {formatINR(opt.strike)}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-[#005EA8] tabular-nums">
                        {formatINR(opt.premium, { decimals: 2 })}
                      </td>
                      <td className="py-4 px-4 text-[#5A5A53] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#A3A29A]" />
                        <span>{opt.expiry}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => {
                            setCurrentView('app-options');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3.5 py-1.5 bg-[#EFEEE9] hover:bg-[#E2E1DA] text-[#171A17] font-bold text-[12px] rounded-[8px] transition-colors cursor-pointer"
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

        <div className="mt-8 text-center text-xs text-[#6B6B63]">
          Options representations are illustrative and intended to demonstrate order workflow architecture without financial performance claims.
        </div>
      </div>
    </div>
  );
};
