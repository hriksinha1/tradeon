import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  ShieldCheck,
  Zap,
  Info,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';

export const OptionsPage: React.FC = () => {
  const { options, setCurrentView } = useTrading();
  const [selectedType, setSelectedType] = useState<'all' | 'call' | 'put'>('all');

  const filteredOptions =
    selectedType === 'all'
      ? options
      : options.filter((o) => o.type.toLowerCase() === selectedType);

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
            Derivative Architecture
          </span>
          <h1 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight mt-3">
            Options-Style Product Trading
          </h1>
          <p className="mt-3 text-[17px] text-[#5A5A53]">
            Participate in defined product price movements or hedge inventory positions with structured Call and Put contracts. Predetermined strike levels, fixed expiry cycles, and bounded risk exposure.
          </p>
        </div>

        {/* 3 Pillar Cards for Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-[12px] bg-[#E3F6EC] text-[#0A7A45] flex items-center justify-center font-bold text-lg mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-[#171A17]">Call Options</h3>
            <p className="text-[14px] text-[#5A5A53] mt-2 leading-relaxed">
              Provides the right to participate in value appreciation above the strike price. Ideal when anticipating growth in listing valuation while risking only the premium paid.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-[12px] bg-[#FCE9E7] text-[#BF2A2A] flex items-center justify-center font-bold text-lg mb-4">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-[#171A17]">Put Options</h3>
            <p className="text-[14px] text-[#5A5A53] mt-2 leading-relaxed">
              Protects against adverse downward price movement. Enables holders to hedge their inventory or unit allocations at a predetermined price floor.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-[12px] bg-[#E9FAF1] text-[#087A4A] flex items-center justify-center font-bold text-lg mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-[18px] font-bold text-[#171A17]">Cash Settlement</h3>
            <p className="text-[14px] text-[#5A5A53] mt-2 leading-relaxed">
              Upon expiration, in-the-money options are automatically cash-settled directly into your wallet balance with verifiable double-entry transaction confirmation.
            </p>
          </div>
        </div>

        {/* Live Options Chain Table Card */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EFEEE9] gap-4">
            <div>
              <h2 className="text-[22px] font-bold text-[#171A17]">
                Active Options Chain
              </h2>
              <p className="text-[14px] text-[#5A5A53] mt-1">
                Live structured contracts available for order placement across ATLAS, NOVA, and ORBIT products.
              </p>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] self-start sm:self-auto">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1 rounded-[7px] text-[12px] font-semibold cursor-pointer ${
                  selectedType === 'all'
                    ? 'bg-[#1FC777] text-[#0C0F0C]'
                    : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('call')}
                className={`px-3 py-1 rounded-[7px] text-[12px] font-semibold cursor-pointer ${
                  selectedType === 'call'
                    ? 'bg-[#1FC777] text-[#0C0F0C]'
                    : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                Calls
              </button>
              <button
                onClick={() => setSelectedType('put')}
                className={`px-3 py-1 rounded-[7px] text-[12px] font-semibold cursor-pointer ${
                  selectedType === 'put'
                    ? 'bg-[#1FC777] text-[#0C0F0C]'
                    : 'text-[#5A5A53] hover:text-[#171A17]'
                }`}
              >
                Puts
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#EFEEE9] text-[11px] font-bold uppercase tracking-wider text-[#6B6B63]">
                  <th className="py-3 px-4">Contract Symbol</th>
                  <th className="py-3 px-4">Underlying</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-right">Strike Price</th>
                  <th className="py-3 px-4 text-right">Premium / Unit</th>
                  <th className="py-3 px-4">Expiry Date</th>
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
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            isCall
                              ? 'bg-[#E3F6EC] text-[#0A7A45]'
                              : 'bg-[#FCE9E7] text-[#BF2A2A]'
                          }`}
                        >
                          {opt.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-[#171A17] tabular-nums">
                        {formatINR(opt.strike)}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-[#087A4A] tabular-nums">
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
                          className="px-3.5 py-1.5 bg-[#1FC777] hover:bg-[#18B36A] text-[#0C0F0C] font-bold text-[12px] rounded-[8px] transition-colors cursor-pointer shadow-2xs"
                        >
                          Trade in App →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
