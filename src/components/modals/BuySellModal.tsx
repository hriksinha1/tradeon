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
          <div className="grid grid-cols-2 p-1 bg-[#111418] rounded-[6px] border border-[#2B3139]">
            <button
              onClick={() => { setSide('buy'); setStep('form'); }}
              className={`py-2 text-[13px] font-bold rounded-[4px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                side === 'buy'
                  ? 'bg-[#0ECB81] text-white shadow-xs'
                  : 'text-[#848E9C] hover:text-[#F5F5F5]'
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>BUY</span>
            </button>
            <button
              onClick={() => { setSide('sell'); setStep('form'); }}
              className={`py-2 text-[13px] font-bold rounded-[4px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                side === 'sell'
                  ? 'bg-[#F6465D] text-white shadow-xs'
                  : 'text-[#848E9C] hover:text-[#F5F5F5]'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>SELL</span>
            </button>
          </div>

          {/* Order Type Tabs */}
          <div className="flex items-center gap-1 bg-[#111418] p-1 rounded-[6px] border border-[#2B3139]">
            {(['market', 'limit', 'stop'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`flex-1 py-1 text-[12px] font-semibold capitalize rounded-[4px] transition-colors cursor-pointer ${
                  orderType === type
                    ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]'
                    : 'text-[#848E9C] hover:text-[#F5F5F5]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Limit / Stop Price input */}
          {orderType !== 'market' && (
            <div>
              <label className="text-[12px] font-medium text-[#848E9C] block mb-1.5">
                {orderType === 'limit' ? 'Limit Price (INR)' : 'Trigger Stop Price (INR)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(Number(e.target.value))}
                  className="w-full h-10 px-3 pr-12 rounded-[6px] bg-[#111418] border border-[#363C45] text-[#F5F5F5] font-semibold text-[14px] tabular-nums focus:border-[#F0B90B] focus:outline-none"
                  placeholder="0.00"
                />
                <span className="absolute right-3 top-2.5 text-[12px] font-bold text-[#848E9C]">
                  INR
                </span>
              </div>
            </div>
          )}

          {/* Quantity Input */}
          <div>
            <div className="flex items-center justify-between text-[12px] mb-1.5">
              <label className="font-medium text-[#848E9C]">Order Quantity</label>
              <div className="flex items-center gap-1 text-[#848E9C]">
                <Wallet className="w-3 h-3 text-[#F0B90B]" />
                {side === 'buy' ? (
                  <span>Avail: <strong className="text-[#F5F5F5] tabular-nums">{formatINR(wallet.availableBalance)}</strong></span>
                ) : (
                  <span>Holding: <strong className="text-[#F5F5F5] tabular-nums">{holdingQty} units</strong></span>
                )}
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full h-10 px-3 pr-16 rounded-[6px] bg-[#111418] border border-[#363C45] text-[#F5F5F5] font-semibold text-[14px] tabular-nums focus:border-[#F0B90B] focus:outline-none"
              />
              <span className="absolute right-3 top-2.5 text-[12px] font-semibold text-[#848E9C]">
                units
              </span>
            </div>
          </div>

          {/* Quick Percentage Presets */}
          <div className="grid grid-cols-4 gap-2">
            {[0.25, 0.5, 0.75, 1.0].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setPercentQuantity(pct)}
                className="py-1 text-[11px] font-semibold rounded-[4px] bg-[#111418] border border-[#2B3139] text-[#848E9C] hover:text-[#F0B90B] hover:border-[#F0B90B]/50 transition-colors cursor-pointer"
              >
                {pct * 100}%
              </button>
            ))}
          </div>

          {/* Cost Summary Box */}
          <div className="p-3.5 bg-[#111418] rounded-[6px] border border-[#2B3139] space-y-2 text-[12px]">
            <div className="flex items-center justify-between text-[#848E9C]">
              <span>Execution Price</span>
              <span className="font-semibold text-[#F5F5F5] tabular-nums">{formatINR(currentPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-[#848E9C]">
              <span>Gross Notional</span>
              <span className="font-semibold text-[#F5F5F5] tabular-nums">{formatINR(grossTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-[#848E9C]">
              <span>Trading Fee (0.10%)</span>
              <span className="font-semibold text-[#848E9C] tabular-nums">{formatINR(estimatedFee, { decimals: 2 })}</span>
            </div>
            <div className="pt-2 border-t border-[#2B3139] flex items-center justify-between">
              <span className="font-bold text-[#F5F5F5]">{side === 'buy' ? 'Total Required' : 'Net Proceeds'}</span>
              <span className="text-[15px] font-bold text-[#F0B90B] tabular-nums">{formatINR(netTotal)}</span>
            </div>
          </div>

          {/* Validation Alert */}
          {!canAfford && (
            <div className="p-3 rounded-[6px] bg-[#301820] border border-[#F6465D]/30 flex items-start gap-2.5 text-[#F6465D] text-[12px]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                {side === 'buy'
                  ? `Insufficient available balance (${formatINR(wallet.availableBalance)} available). Please deposit funds or adjust quantity.`
                  : `Insufficient holdings. You only hold ${holdingQty} units of ${selectedProduct.name}.`}
              </span>
            </div>
          )}

          {/* Submit Action */}
          <Button
            variant={side === 'buy' ? 'buy' : 'sell'}
            fullWidth
            size="md"
            disabled={!canAfford || quantity <= 0}
            onClick={handleReview}
            className="mt-2 text-[14px]"
          >
            Review {side === 'buy' ? 'Buy' : 'Sell'} Order
          </Button>
        </div>
      )}

      {/* Step 2: Order Review & Confirmation */}
      {step === 'review' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#111418] rounded-[6px] border border-[#2B3139] space-y-3 text-[13px]">
            <div className="flex items-center justify-between pb-2 border-b border-[#2B3139]">
              <span className="text-[#848E9C]">Action & Asset</span>
              <span className={`font-bold uppercase ${side === 'buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                {side} {selectedProduct.name} ({selectedProduct.id})
              </span>
            </div>
            <div className="flex items-center justify-between text-[#848E9C]">
              <span>Order Type</span>
              <span className="font-semibold text-[#F5F5F5] capitalize">{orderType} Order</span>
            </div>
            <div className="flex items-center justify-between text-[#848E9C]">
              <span>Quantity</span>
              <span className="font-semibold text-[#F5F5F5] tabular-nums">{quantity} units</span>
            </div>
            <div className="flex items-center justify-between text-[#848E9C]">
              <span>Price per Unit</span>
              <span className="font-semibold text-[#F5F5F5] tabular-nums">{formatINR(currentPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-[#848E9C]">
              <span>Est. Exchange Fee</span>
              <span className="font-semibold text-[#848E9C] tabular-nums">{formatINR(estimatedFee, { decimals: 2 })}</span>
            </div>
            <div className="pt-2 border-t border-[#2B3139] flex items-center justify-between text-[14px]">
              <span className="font-bold text-[#F5F5F5]">Final Settlement Amount</span>
              <span className="font-bold text-[#F0B90B] tabular-nums">{formatINR(netTotal)}</span>
            </div>
          </div>

          <div className="p-3 bg-[#161A1E] rounded-[6px] border border-[#2B3139] flex items-center gap-2 text-[12px] text-[#848E9C]">
            <Shield className="w-4 h-4 text-[#F0B90B] shrink-0" />
            <span>Orders are routed through Tradeon's low-latency matching engine with instantaneous fill verification.</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => setStep('form')}
            >
              Modify
            </Button>
            <Button
              variant={side === 'buy' ? 'buy' : 'sell'}
              onClick={handleConfirmOrder}
            >
              Confirm & Execute
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Success Confirmation Receipt */}
      {step === 'success' && (
        <div className="text-center py-4 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#102A22] border border-[#0ECB81]/40 flex items-center justify-center mx-auto text-[#0ECB81]">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-[18px] font-bold text-[#F5F5F5]">Order Executed Successfully</h3>
            <p className="text-[13px] text-[#848E9C] mt-1">
              Your {side.toUpperCase()} order was filled on the Tradeon central order book.
            </p>
          </div>

          <div className="p-4 bg-[#111418] rounded-[6px] border border-[#2B3139] text-left space-y-2 text-[12px]">
            <div className="flex items-center justify-between">
              <span className="text-[#848E9C]">Order ID</span>
              <span className="font-mono text-[#F0B90B]">{completedOrderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#848E9C]">Status</span>
              <span className="text-[#0ECB81] font-semibold">FILLED / COMPLETED</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#848E9C]">Executed Amount</span>
              <span className="font-semibold text-[#F5F5F5] tabular-nums">{quantity} units @ {formatINR(currentPrice)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#848E9C]">Net Settlement</span>
              <span className="font-bold text-[#F0B90B] tabular-nums">{formatINR(netTotal)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                closeBuySell();
                setCurrentView('app-orders');
              }}
            >
              View in Orders
            </Button>
            <Button
              variant="primary"
              onClick={closeBuySell}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BuySellModal;
