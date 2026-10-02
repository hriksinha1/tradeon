import React, { useState, useMemo } from 'react';
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
  Shield,
  Wallet,
} from 'lucide-react';

export const OptionsTradingView: React.FC = () => {
  const { options, products, wallet, showToast } = useTrading();

  const [selectedProductRef, setSelectedProductRef] = useState<string>('ATLAS-01');
  const [selectedType, setSelectedType] = useState<'all' | 'call' | 'put'>('all');
  const [selectedOption, setSelectedOption] = useState<OptionContract | null>(options[0]);
  const [contractsCount, setContractsCount] = useState<number>(5);
  const [expiry, setExpiry] = useState<string>('28-OCT-2026');
  const [isOrdered, setIsOrdered] = useState(false);

  const product = products.find((p) => p.id === selectedProductRef) || products[0];

  const filteredOptions = options.filter((opt) => {
    const matchesProd = opt.productRef === selectedProductRef;
    const matchesType = selectedType === 'all' || opt.type === selectedType;
    return matchesProd && matchesType;
  });

  const activeOption = selectedOption || filteredOptions[0] || options[0];
  const lotSize = 10;
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
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-5 space-y-4 select-none bg-white text-[#181A20]">
      {/* Header & Underlying Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#EAECEF]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-[#946800] uppercase tracking-wider bg-[#FEF6D8] border border-[#FCDD80] px-2 py-0.5 rounded-[3px]">
              Derivatives Desk
            </span>
          </div>
          <h1 className="text-[22px] font-bold text-[#181A20] tracking-tight">Options Chain & Trading</h1>
          <p className="text-[12px] text-[#707A8A]">
            Standardized European-style contracts with transparent margin and settlement against underlying index.
          </p>
        </div>

        {/* Underlying Selector & Expiry Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#707A8A]">Underlying:</span>
            <select
              value={selectedProductRef}
              onChange={(e) => {
                setSelectedProductRef(e.target.value);
                const firstOpt = options.find((o) => o.productRef === e.target.value);
                if (firstOpt) setSelectedOption(firstOpt);
              }}
              className="h-8 px-2.5 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[4px] text-[12px] font-semibold text-[#181A20] focus:border-[#F0B90B] focus:bg-white focus:outline-none cursor-pointer"
            >
              {products.slice(0, 5).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — {formatINR(p.currentValue)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-[#F5F6F8] p-0.5 rounded-[4px] border border-[#DFE2E6] text-[11px]">
            {['28-OCT-2026', '25-NOV-2026', '30-DEC-2026'].map((exp) => (
              <button
                key={exp}
                onClick={() => setExpiry(exp)}
                className={`px-2 py-0.5 rounded-[3px] font-semibold transition-colors cursor-pointer ${
                  expiry === exp ? 'bg-white text-[#181A20] font-bold shadow-xs' : 'text-[#707A8A] hover:text-[#181A20]'
                }`}
              >
                {exp.slice(0, 6)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Options Chain Table (Left 8 cols) + Contract Order Entry (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Options Chain Matrix (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-[#DFE2E6] rounded-[6px] p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAECEF]">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-[#181A20]">Options Matrix</span>
              <span className="text-[11px] text-[#707A8A]">Spot Ref: <strong className="text-[#02A063] tabular-nums font-mono">{formatINR(product.currentValue)}</strong></span>
            </div>

            {/* Call / Put Filter */}
            <div className="flex items-center gap-1 bg-[#F5F6F8] p-0.5 rounded border border-[#DFE2E6] text-[11px]">
              {(['all', 'call', 'put'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2.5 py-0.5 rounded-[3px] uppercase font-semibold transition-colors cursor-pointer ${
                    selectedType === t ? 'bg-white text-[#181A20] font-bold shadow-xs' : 'text-[#707A8A]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Options Chain Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px] tabular-nums font-mono">
              <thead className="bg-[#F5F6F8] border-b border-[#DFE2E6] text-[#707A8A] text-[11px] font-semibold uppercase font-sans">
                <tr>
                  <th className="py-2 px-2.5">Symbol</th>
                  <th className="py-2 px-2.5">Type</th>
                  <th className="py-2 px-2.5">Strike</th>
                  <th className="py-2 px-2.5">Bid</th>
                  <th className="py-2 px-2.5">Ask</th>
                  <th className="py-2 px-2.5">Premium</th>
                  <th className="py-2 px-2.5">Open Int</th>
                  <th className="py-2 px-2.5 text-right font-sans">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECEF]">
                {filteredOptions.map((opt) => {
                  const isSelected = activeOption.id === opt.id;
                  const isCall = opt.type === 'call';
                  return (
                    <tr
                      key={opt.id}
                      onClick={() => {
                        setSelectedOption(opt);
                        setIsOrdered(false);
                      }}
                      className={`hover:bg-[#F5F6F8] cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#FEF6D8]/40 border-l-2 border-[#F0B90B]' : ''
                      }`}
                    >
                      <td className="py-2 px-2.5 font-mono font-bold text-[#181A20]">{opt.symbol}</td>
                      <td className="py-2 px-2.5">
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                            isCall
                              ? 'bg-[#EBFBF3] text-[#02A063] border border-[#02A063]/30'
                              : 'bg-[#FDF0F2] text-[#CF304A] border border-[#CF304A]/30'
                          }`}
                        >
                          {opt.type}
                        </span>
                      </td>
                      <td className="py-2 px-2.5 font-bold text-[#181A20]">{formatINR(opt.strike)}</td>
                      <td className="py-2 px-2.5 text-[#02A063]">{formatINR(opt.bid)}</td>
                      <td className="py-2 px-2.5 text-[#CF304A]">{formatINR(opt.ask)}</td>
                      <td className="py-2 px-2.5 font-bold text-[#946800]">{formatINR(opt.premium)}</td>
                      <td className="py-2 px-2.5 text-[#707A8A] font-sans">{opt.openInterest} contracts</td>
                      <td className="py-2 px-2.5 text-right font-sans">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOption(opt);
                            setIsOrdered(false);
                          }}
                          className={`px-2 py-0.5 text-[11px] font-bold rounded-[3px] border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#F0B90B] text-[#181A20] border-[#E5A800]'
                              : 'bg-white text-[#707A8A] border-[#DFE2E6] hover:text-[#181A20]'
                          }`}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Order Entry & Risk Profile (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-[#DFE2E6] rounded-[6px] p-4 space-y-4 shadow-xs">
          <div className="pb-3 border-b border-[#EAECEF]">
            <span className="text-[11px] font-bold uppercase text-[#707A8A] block">Contract Summary</span>
            <div className="flex items-center justify-between mt-1">
              <span className="font-bold text-[16px] text-[#181A20] font-mono">{activeOption.symbol}</span>
              <span className={`px-2 py-0.5 text-[11px] font-bold uppercase rounded ${
                activeOption.type === 'call' ? 'bg-[#EBFBF3] text-[#02A063] border border-[#02A063]/30' : 'bg-[#FDF0F2] text-[#CF304A] border border-[#CF304A]/30'
              }`}>
                {activeOption.type.toUpperCase()}
              </span>
            </div>
            <div className="text-[12px] text-[#707A8A] mt-0.5 font-mono">
              Strike: {formatINR(activeOption.strike)} · Expiry: {activeOption.expiry}
            </div>
          </div>

          {/* Number of Contracts Input */}
          <div>
            <label className="text-[11px] text-[#707A8A] block mb-1">Contract Quantity (10 Units / Lot)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={contractsCount}
                onChange={(e) => setContractsCount(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full h-9 px-3 rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] text-[#181A20] font-bold text-[14px] tabular-nums font-mono focus:border-[#F0B90B] focus:bg-white focus:outline-none"
              />
              <span className="text-[12px] text-[#707A8A] whitespace-nowrap">{totalUnits} units</span>
            </div>
          </div>

          {/* Risk & Payoff Breakdown */}
          <div className="p-3 bg-[#F5F6F8] rounded-[4px] border border-[#DFE2E6] space-y-2 text-[12px] tabular-nums font-mono">
            <div className="flex justify-between text-[#707A8A]">
              <span className="font-sans">Premium per Unit:</span>
              <span className="font-semibold text-[#181A20]">{formatINR(activeOption.premium)}</span>
            </div>
            <div className="flex justify-between text-[#707A8A]">
              <span className="font-sans">Max Loss (Capped):</span>
              <span className="font-semibold text-[#CF304A]">{formatINR(premiumCost)}</span>
            </div>
            <div className="flex justify-between text-[#707A8A]">
              <span className="font-sans">Breakeven Price:</span>
              <span className="font-semibold text-[#181A20]">{formatINR(breakeven)}</span>
            </div>
            <div className="pt-2 border-t border-[#DFE2E6] flex justify-between font-bold">
              <span className="text-[#181A20] font-sans">Total Required Capital:</span>
              <span className="text-[14px] text-[#946800]">{formatINR(premiumCost)}</span>
            </div>
          </div>

          {/* Wallet check */}
          <div className="flex items-center justify-between text-[11px] text-[#707A8A]">
            <span className="flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-[#B78103]" />
              Available Cash:
            </span>
            <span className="font-semibold text-[#181A20] tabular-nums font-mono">{formatINR(wallet.availableBalance)}</span>
          </div>

          {/* Action button */}
          <Button
            variant="primary"
            fullWidth
            size="md"
            disabled={premiumCost > wallet.availableBalance || isOrdered}
            onClick={handleExecuteOptionOrder}
            className="font-bold cursor-pointer"
          >
            {isOrdered ? (
              <span className="flex items-center gap-1.5 text-[#181A20]">
                <CheckCircle2 className="w-4 h-4 text-[#02A063]" /> Position Opened
              </span>
            ) : (
              `Buy ${contractsCount} Contracts (${formatINR(premiumCost)})`
            )}
          </Button>

          {isOrdered && (
            <div className="p-2.5 bg-[#EBFBF3] border border-[#02A063]/40 rounded-[4px] text-[11px] text-[#02A063] text-center font-medium">
              Order confirmed. Position added to your derivatives portfolio.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionsTradingView;
