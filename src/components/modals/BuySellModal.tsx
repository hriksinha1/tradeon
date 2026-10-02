import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import { CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownLeft, Wallet, Shield } from 'lucide-react';
import { Product } from '../../types';

export const BuySellModal: React.FC = () => {
  const {
    isBuySellOpen,
    closeBuySell,
    buySellConfig,
    products,
    positions,
    wallet,
    executeOrder,
    setCurrentView,
  } = useTrading();

  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [quantity, setQuantity] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(0);
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [completedOrderId, setCompletedOrderId] = useState<string>('');

  useEffect(() => {
    if (buySellConfig.product) {
      setSelectedProduct(buySellConfig.product);
      setLimitPrice(buySellConfig.product.currentValue);
    } else if (products.length > 0) {
      setSelectedProduct(products[0]);
      setLimitPrice(products[0].currentValue);
    }
    setSide(buySellConfig.side);
    setStep('form');
    setQuantity(10);
  }, [buySellConfig, products, isBuySellOpen]);

  if (!selectedProduct) return null;

  const currentPrice = orderType === 'market' ? selectedProduct.currentValue : limitPrice || selectedProduct.currentValue;
  const grossTotal = quantity * currentPrice;
  const estimatedFee = Number((grossTotal * 0.001).toFixed(2));
  const netTotal = side === 'buy' ? grossTotal + estimatedFee : grossTotal - estimatedFee;

  // Existing holding for this product
  const holding = positions.find((p) => p.productId === selectedProduct.id);
  const holdingQty = holding ? holding.quantity : 0;

  const canAfford = side === 'buy' ? netTotal <= wallet.availableBalance : holdingQty >= quantity;

  const handleReview = () => {
    if (quantity <= 0) return;
    setStep('review');
  };

  const handleConfirmOrder = () => {
    const finalOrderType = orderType === 'stop' ? 'limit' : orderType;
    const result = executeOrder(side, selectedProduct, quantity, currentPrice, finalOrderType);
    if (result.success) {
      setCompletedOrderId(result.orderId || 'ORD-NEW');
      setStep('success');
    }
  };

  const setPercentQuantity = (pct: number) => {
    if (side === 'buy') {
      const budget = wallet.availableBalance * pct;
      const maxUnits = Math.floor(budget / (currentPrice * 1.001));
      setQuantity(Math.max(1, maxUnits));
    } else {
      setQuantity(Math.max(1, Math.floor(holdingQty * pct)));
    }
  };

  return (
    <Modal
      isOpen={isBuySellOpen}
      onClose={closeBuySell}
      title={step === 'success' ? undefined : `${side === 'buy' ? 'Buy Order' : 'Sell Order'} · ${selectedProduct.name}`}
      subtitle={step === 'success' ? undefined : `${selectedProduct.id} · Market Price: ${formatINR(selectedProduct.currentValue)}`}
      maxWidth="md"
    >
      {step === 'form' && (
        <div className="space-y-4">
          {/* Side Selector (Buy / Sell) */}
          <div className="grid grid-cols-2 p-1 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6]">
            <button
              onClick={() => { setSide('buy'); setStep('form'); }}
              className={`py-2 text-[13px] font-bold rounded-[4px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                side === 'buy'
                  ? 'bg-[#02A063] text-white shadow-xs'
                  : 'text-[#707A8A] hover:text-[#181A20]'
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>BUY</span>
            </button>
            <button
              onClick={() => { setSide('sell'); setStep('form'); }}
              className={`py-2 text-[13px] font-bold rounded-[4px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                side === 'sell'
                  ? 'bg-[#CF304A] text-white shadow-xs'
                  : 'text-[#707A8A] hover:text-[#181A20]'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>SELL</span>
            </button>
          </div>

          {/* Product selector dropdown */}
          <div>
            <label className="block text-xs font-semibold text-[#707A8A] mb-1">
              Selected Product
            </label>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const p = products.find((prod) => prod.id === e.target.value);
                if (p) {
                  setSelectedProduct(p);
                  setLimitPrice(p.currentValue);
                }
              }}
              className="w-full px-3 py-2 bg-white border border-[#DFE2E6] rounded-[6px] text-xs font-medium text-[#181A20] focus:outline-[#F0B90B] cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — {formatINR(p.currentValue)}
                </option>
              ))}
            </select>
          </div>

          {/* Order execution type tabs */}
          <div>
            <label className="block text-xs font-semibold text-[#707A8A] mb-1">
              Order Type
            </label>
            <div className="grid grid-cols-3 p-0.5 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6]">
              {(['market', 'limit', 'stop'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={`py-1.5 text-xs font-semibold capitalize rounded-[4px] transition-colors cursor-pointer ${
                    orderType === t
                      ? 'bg-white text-[#181A20] shadow-xs'
                      : 'text-[#707A8A] hover:text-[#181A20]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Limit Price Input if limit or stop */}
          {orderType !== 'market' && (
            <div>
              <div className="flex justify-between text-xs text-[#707A8A] mb-1">
                <span className="font-semibold">Target Price</span>
                <span>Market: {formatINR(selectedProduct.currentValue)}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#707A8A] font-mono">
                  ₹
                </span>
                <input
                  type="number"
                  value={limitPrice || ''}
                  onChange={(e) => setLimitPrice(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-[#DFE2E6] rounded-[6px] text-xs font-mono font-bold text-[#181A20] focus:outline-[#F0B90B]"
                  placeholder="Enter target price"
                />
              </div>
            </div>
          )}

          {/* Quantity Input */}
          <div>
            <div className="flex justify-between text-xs text-[#707A8A] mb-1">
              <span className="font-semibold">Units Amount</span>
              <span>Available Supply: {selectedProduct.availableUnits.toLocaleString()}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="1"
                max={side === 'sell' ? holdingQty : selectedProduct.availableUnits}
                value={quantity || ''}
                onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-white border border-[#DFE2E6] rounded-[6px] text-xs font-mono font-bold text-[#181A20] focus:outline-[#F0B90B]"
                placeholder="Units quantity"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#707A8A] font-semibold">
                UNITS
              </span>
            </div>

            {/* Quick Percentage Chips */}
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {[0.25, 0.5, 0.75, 1.0].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setPercentQuantity(pct)}
                  className="py-1 bg-white border border-[#DFE2E6] hover:bg-[#F5F6F8] rounded-[4px] text-[11px] font-mono font-semibold text-[#474D57] transition-colors cursor-pointer"
                >
                  {pct * 100}%
                </button>
              ))}
            </div>
          </div>

          {/* Balance Context Card */}
          <div className="p-3 bg-[#F5F6F8] border border-[#EAECEF] rounded-[6px] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#474D57]">
              <Wallet className="w-3.5 h-3.5 text-[#B78103]" />
              <span>{side === 'buy' ? 'Available Balance' : 'Current Holding'}:</span>
            </div>
            <div className="font-bold text-[#181A20] font-mono tabular-nums">
              {side === 'buy' ? formatINR(wallet.availableBalance) : `${holdingQty} Units`}
            </div>
          </div>

          {/* Breakdown Preview */}
          <div className="p-3 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#707A8A]">
              <span>Unit Price</span>
              <span className="font-mono text-[#181A20]">{formatINR(currentPrice)}</span>
            </div>
            <div className="flex justify-between text-[#707A8A]">
              <span>Gross Order Value</span>
              <span className="font-mono text-[#181A20]">{formatINR(grossTotal)}</span>
            </div>
            <div className="flex justify-between text-[#707A8A]">
              <span>Estimated Brokerage (0.1%)</span>
              <span className="font-mono text-[#181A20]">{formatINR(estimatedFee, { decimals: 2 })}</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-[#DFE2E6] font-bold">
              <span className="text-[#181A20]">{side === 'buy' ? 'Total Deducted' : 'Total Credited'}</span>
              <span className="text-[#181A20] font-mono text-[13px]">{formatINR(netTotal)}</span>
            </div>
          </div>

          {!canAfford && (
            <div className="p-2.5 bg-[#FDF0F2] border border-[#F7B5BE] rounded-[6px] flex items-center gap-2 text-xs text-[#CF304A]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                {side === 'buy'
                  ? 'Insufficient wallet cash. Deposit funds to proceed.'
                  : 'Insufficient units held in your portfolio to sell this quantity.'}
              </span>
            </div>
          )}

          {/* Review Order Button */}
          <Button
            size="md"
            variant={side === 'buy' ? 'buy' : 'sell'}
            fullWidth
            onClick={handleReview}
            disabled={!canAfford || quantity <= 0}
            className="cursor-pointer"
          >
            Review {side.toUpperCase()} Order
          </Button>
        </div>
      )}

      {/* Step 2: Review & Confirmation Slip */}
      {step === 'review' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#F5F6F8] rounded-[8px] border border-[#DFE2E6] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#DFE2E6]">
              <span className="text-xs text-[#707A8A]">Execution Action</span>
              <span
                className={`text-xs font-bold font-mono uppercase px-2 py-0.5 rounded-[4px] ${
                  side === 'buy' ? 'bg-[#EBFBF3] text-[#02A063]' : 'bg-[#FDF0F2] text-[#CF304A]'
                }`}
              >
                {side} {orderType}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#707A8A]">Instrument</span>
                <span className="font-bold text-[#181A20]">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707A8A]">Units</span>
                <span className="font-mono font-bold text-[#181A20]">{quantity} Units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707A8A]">Price per Unit</span>
                <span className="font-mono text-[#181A20]">{formatINR(currentPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707A8A]">Exchange Fee</span>
                <span className="font-mono text-[#181A20]">{formatINR(estimatedFee, { decimals: 2 })}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#DFE2E6] text-sm font-bold">
                <span className="text-[#181A20]">{side === 'buy' ? 'Net Cash Outflow' : 'Net Cash Inflow'}</span>
                <span className="font-mono text-[#181A20] text-base">{formatINR(netTotal)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#707A8A] px-1">
            <Shield className="w-4 h-4 text-[#02A063]" />
            <span>Instant execution logged to double-entry ledger upon confirmation</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              size="md"
              variant="outline"
              onClick={() => setStep('form')}
              className="flex-1 cursor-pointer"
            >
              Modify
            </Button>
            <Button
              size="md"
              variant={side === 'buy' ? 'buy' : 'sell'}
              onClick={handleConfirmOrder}
              className="flex-1 font-bold cursor-pointer"
            >
              Confirm & Execute
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Success Screen */}
      {step === 'success' && (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#EBFBF3] border border-[#A2E8C6] text-[#02A063] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-[20px] font-bold text-[#181A20]">
              Order Executed Successfully
            </h3>
            <p className="text-xs text-[#707A8A] mt-1">
              Your {side.toUpperCase()} order for {quantity} units of {selectedProduct.name} has been processed.
            </p>
          </div>

          <div className="p-3 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6] text-xs space-y-1.5 max-w-sm mx-auto text-left font-mono">
            <div className="flex justify-between text-[#707A8A]">
              <span>Order Reference:</span>
              <span className="text-[#181A20] font-bold">{completedOrderId}</span>
            </div>
            <div className="flex justify-between text-[#707A8A]">
              <span>Status:</span>
              <span className="text-[#02A063] font-bold">FILLED (COMPLETED)</span>
            </div>
            <div className="flex justify-between text-[#707A8A]">
              <span>Available Cash:</span>
              <span className="text-[#181A20]">{formatINR(wallet.availableBalance)}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                closeBuySell();
                setCurrentView('app-orders');
              }}
              className="cursor-pointer"
            >
              View in Orders
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={closeBuySell}
              className="font-bold cursor-pointer"
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
