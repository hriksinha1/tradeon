import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { OptionContract } from '../../types';
import {
  Layers,
  Info,
  Calendar,
  SlidersHorizontal,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const OptionsTradingView: React.FC = () => {
  const { options, products, wallet, addFunds, showToast } = useTrading();

  const [selectedProductRef, setSelectedProductRef] = useState<string>('ATLAS-01');
  const [selectedType, setSelectedType] = useState<'all' | 'call' | 'put'>('all');
  const [selectedOption, setSelectedOption] = useState<OptionContract | null>(options[0]);
  const [contractsCount, setContractsCount] = useState<number>(5);
  const [isOrdered, setIsOrdered] = useState(false);

  const product = products.find((p) => p.id === selectedProductRef) || products[0];

  const filteredOptions = options.filter((opt) => {
    const matchesProd = opt.productRef === selectedProductRef;
    const matchesType = selectedType === 'all' || opt.type === selectedType;
    return matchesProd && matchesType;
  });

  const activeOption = selectedOption || filteredOptions[0] || options[0];
  const lotSize = 10; // 10 units per option contract
  const totalUnits = contractsCount * lotSize;
  const premiumCost = totalUnits * activeOption.premium;
  const breakeven =
    activeOption.type === 'call'
      ? activeOption.strike + activeOption.premium
      : activeOption.strike - activeOption.premium;

  const handleExecuteOptionOrder = () => {
    if (premiumCost > wallet.availableBalance) {
      showToast('Insufficient Balance', 'Please deposit funds to trade this option contract.', 'error');
      return;
    }
    setIsOrdered(true);
    showToast(
      'Option Contract Filled',
      `Purchased ${contractsCount} contracts of ${activeOption.symbol} for ${formatINR(premiumCost)}.`,
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-bold text-[#005EA8] uppercase tracking-wider bg-[#F0FAFF] px-2.5 py-0.5 rounded-[6px] border border-[#DFF6FF]">
              Derivative Contract Shell
            </span>
          </div>
          <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Options Trading Chain</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-0.5">
            Trade structured Call and Put contracts with transparent premium settlement and defined expiries.
          </p>
        </div>

        {/* Product Selector */}
        <div className="flex items-center gap-3">
          <label className="text-[12px] font-semibold text-[#78716C]">Underlying:</label>
          <select
            value={selectedProductRef}
            onChange={(e) => {
              setSelectedProductRef(e.target.value);
              const firstOpt = options.find((o) => o.productRef === e.target.value);
              if (firstOpt) setSelectedOption(firstOpt);
            }}
            className="px-3 py-2 bg-white border border-[#E7E5E4] rounded-[10px] text-[13px] font-bold text-[#171717] focus:outline-[#005EA8]"
          >
            {products.slice(0, 4).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id}) — {formatINR(p.currentValue)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Underlying Asset Banner */}
      <div className="p-4 bg-white border border-[#E7E5E4] rounded-[16px] shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[11px] text-[#78716C] uppercase font-bold tracking-wider block">
              Reference Valuation
            </span>
            <span className="text-[22px] font-bold text-[#171717] tabular-nums">
              {formatINR(product.currentValue)}
            </span>
          </div>
          <div className="h-8 w-[1px] bg-[#E7E5E4]" />
          <div>
            <span className="text-[11px] text-[#78716C] uppercase font-bold tracking-wider block">
              Current Expiry Cycle
            </span>
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#171717] mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-[#005EA8]" />
              <span>29 Oct 2026 (Monthly)</span>
            </div>
          </div>
        </div>

        {/* Call / Put Filter Selector */}
        <div className="flex items-center gap-1 p-1 bg-[#F5F5F4] rounded-[8px]">
          {(['all', 'call', 'put'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold uppercase transition-all ${
                selectedType === t ? 'bg-white text-[#005EA8] shadow-2xs' : 'text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              {t === 'all' ? 'All Contracts' : `${t}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Options Grid + Order Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Options Chain Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-[#E7E5E4] rounded-[18px] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E7E5E4] flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#171717]">Available Strike Contracts</h3>
            <span className="text-[12px] text-[#78716C]">Lot size: 10 units / contract</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#FAFAF9] border-b border-[#E7E5E4] text-[#78716C] font-bold text-[12px]">
                <tr>
                  <th className="py-2.5 px-3">Contract Instrument</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Strike</th>
                  <th className="py-2.5 px-3">Bid / Ask</th>
                  <th className="py-2.5 px-3">Premium</th>
                  <th className="py-2.5 px-3">Volume</th>
                  <th className="py-2.5 px-3 text-right">Select</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E4]">
                {filteredOptions.map((opt) => {
                  const isSelected = activeOption.id === opt.id;
                  return (
                    <tr
                      key={opt.id}
                      onClick={() => {
                        setSelectedOption(opt);
                        setIsOrdered(false);
                      }}
                      className={`hover:bg-[#F0FAFF]/60 cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#F0FAFF]' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#171717] block">{opt.symbol}</span>
                        <span className="text-[11px] text-[#78716C] font-mono">{opt.expiry}</span>
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          status={opt.type === 'call' ? 'positive' : 'negative'}
                          label={opt.type.toUpperCase()}
                        />
                      </td>
                      <td className="py-3 px-3 font-bold text-[#171717] tabular-nums">
                        {formatINR(opt.strike)}
                      </td>
                      <td className="py-3 px-3 text-[12px] tabular-nums text-[#57534E]">
                        <span>{formatINR(opt.bid, { decimals: 1 })}</span>
                        <span className="text-[#A8A29E] mx-1">/</span>
                        <span>{formatINR(opt.ask, { decimals: 1 })}</span>
                      </td>
                      <td className="py-3 px-3 font-bold text-[#005EA8] tabular-nums">
                        {formatINR(opt.premium, { decimals: 1 })}
                      </td>
                      <td className="py-3 px-3 text-[12px] text-[#57534E] tabular-nums">
                        {opt.volume} lots
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold transition-colors ${
                            isSelected
                              ? 'bg-[#0070BA] text-[#0C0F0C] font-bold'
                              : 'bg-white border border-[#E7E5E4] text-[#6B6B6B] hover:text-[#171717]'
                          }`}
                        >
                          {isSelected ? 'Active' : 'Pick'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Option Payoff & Order Calculator Panel (1 Column) */}
        <div className="bg-white border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#78716C] block">
                Order Configuration
              </span>
              <h3 className="text-[18px] font-bold text-[#171717] mt-0.5">{activeOption.symbol}</h3>
              <p className="text-[12px] text-[#6B6B6B]">Expiry: {activeOption.expiry} · Strike {formatINR(activeOption.strike)}</p>
            </div>

            {/* Contracts quantity */}
            <div>
              <label className="block text-[12px] font-semibold text-[#78716C] mb-1">
                Number of Contracts (Lots)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setContractsCount((c) => Math.max(1, c - 1))}
                  className="w-9 h-9 rounded-[8px] border border-[#E7E5E4] flex items-center justify-center font-bold hover:bg-[#F5F5F4]"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={contractsCount}
                  onChange={(e) => setContractsCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 text-center py-1.5 border border-[#E7E5E4] rounded-[8px] font-bold text-[15px] tabular-nums"
                />
                <button
                  type="button"
                  onClick={() => setContractsCount((c) => c + 1)}
                  className="w-9 h-9 rounded-[8px] border border-[#E7E5E4] flex items-center justify-center font-bold hover:bg-[#F5F5F4]"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-[#78716C] mt-1 block">
                Total exposure: {totalUnits} underlying units
              </span>
            </div>

            {/* Payoff Breakdown Card */}
            <div className="p-3.5 bg-[#F0FAFF] border border-[#DFF6FF] rounded-[12px] text-[13px] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Unit Premium</span>
                <span className="font-semibold text-[#171717] tabular-nums">
                  {formatINR(activeOption.premium, { decimals: 1 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Breakeven Valuation</span>
                <span className="font-bold text-[#171717] tabular-nums">{formatINR(breakeven)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Max Downside Risk</span>
                <span className="font-semibold text-[#C62828] tabular-nums">{formatINR(premiumCost)}</span>
              </div>
              <div className="pt-2 border-t border-[#DFF6FF] flex justify-between font-bold text-[14px]">
                <span className="text-[#171717]">Total Premium Payable</span>
                <span className="text-[#005EA8] tabular-nums">{formatINR(premiumCost)}</span>
              </div>
            </div>

            {isOrdered && (
              <div className="p-3 bg-[#ECFDF3] border border-[#A6F4C5] rounded-[10px] text-[#16803C] text-[12px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Option position entered into active contract portfolio.</span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-[#E7E5E4]">
            <Button
              fullWidth
              size="lg"
              onClick={handleExecuteOptionOrder}
              disabled={isOrdered}
            >
              {isOrdered ? 'Position Active' : `Buy Option (${formatINR(premiumCost)})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
