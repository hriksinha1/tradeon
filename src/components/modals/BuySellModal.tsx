import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import { CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
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
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
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
    const result = executeOrder(side, selectedProduct, quantity, currentPrice, orderType);
    if (result.success) {
      setCompletedOrderId(result.orderId || 'ORD-NEW');
      setStep('success');
    }
  };

  const setMaxQuantity = () => {
    if (side === 'buy') {
      const maxUnits = Math.floor(wallet.availableBalance / (currentPrice * 1.001));
      setQuantity(Math.max(1, maxUnits));
    } else {
      setQuantity(holdingQty);
    }
  };

  return (
    <Modal
      isOpen={isBuySellOpen}
      onClose={closeBuySell}
      title={step === 'success' ? undefined : `${side === 'buy' ? 'Buy' : 'Sell'} ${selectedProduct.name}`}
      subtitle={step === 'success' ? undefined : `Identifier: ${selectedProduct.id} · ${selectedProduct.category}`}
      maxWidth="md"
    >
      {step === 'form' && (
        <div className="space-y-4">
          {/* Side Selector (Buy / Sell) */}
          <div className="grid grid-cols-2 p-1 bg-[#F5F5F4] rounded-[10px]">
            <button
              onClick={() => setSide('buy')}
              className={`py-2 text-[14px] font-semibold rounded-[8px] transition-all flex items-center justify-center gap-1.5 ${
                side === 'buy'
                  ? 'bg-[#16803C] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Buy</span>
            </button>
            <button
              onClick={() => setSide('sell')}
              className={`py-2 text-[14px] font-semibold rounded-[8px] transition-all flex items-center justify-center gap-1.5 ${
                side === 'sell'
                  ? 'bg-[#C62828] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Sell</span>
            </button>
          </div>

          {/* Product Selector Dropdown if multiple */}
          <div>
            <label className="block text-[12px] font-semibold text-[#78716C] mb-1">
              Select Tradable Asset
            </label>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const prod = products.find((p) => p.id === e.target.value);
                if (prod) {
                  setSelectedProduct(prod);
                  setLimitPrice(prod.currentValue);
                }
              }}
              className="w-full px-3 py-2 bg-white border border-[#E7E5E4] rounded-[10px] text-[14px] text-[#171717] focus:outline-[#6A2E62]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — {formatINR(p.currentValue)}
                </option>
              ))}
            </select>
          </div>

          {/* Balance & Holding Context */}
          <div className="flex items-center justify-between text-[12px] bg-[#FAF4F9] border border-[#ECD6E9] p-2.5 rounded-[10px]">
            <div>
              <span className="text-[#78716C]">Available Balance: </span>
              <span className="font-semibold text-[#171717] tabular-nums">
                {formatINR(wallet.availableBalance)}
              </span>
            </div>
            <div>
              <span className="text-[#78716C]">Current Position: </span>
              <span className="font-semibold text-[#171717] tabular-nums">
                {holdingQty} {selectedProduct.unitMeasure}
              </span>
            </div>
          </div>

          {/* Order Type: Market vs Limit */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[12px] font-semibold text-[#78716C]">Order Execution</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType('market')}
                  className={`text-[12px] font-medium px-2 py-0.5 rounded transition-colors ${
                    orderType === 'market'
                      ? 'bg-[#6A2E62] text-white'
                      : 'text-[#6B6B6B] hover:text-[#171717]'
                  }`}
                >
                  Market
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('limit')}
                  className={`text-[12px] font-medium px-2 py-0.5 rounded transition-colors ${
                    orderType === 'limit'
                      ? 'bg-[#6A2E62] text-white'
                      : 'text-[#6B6B6B] hover:text-[#171717]'
                  }`}
                >
                  Limit
                </button>
              </div>
            </div>

            {orderType === 'limit' ? (
              <div className="relative mt-1">
                <span className="absolute left-3 top-2.5 text-[#78716C] text-sm">₹</span>
                <input
                  type="number"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-[#E7E5E4] rounded-[10px] text-[14px] font-semibold tabular-nums focus:outline-[#6A2E62]"
                  placeholder="Set limit price"
                />
              </div>
            ) : (
              <div className="px-3 py-2 bg-[#F5F5F4] border border-[#E7E5E4] rounded-[10px] text-[13px] text-[#57534E] flex items-center justify-between">
                <span>Immediate execution at best market value</span>
                <span className="font-semibold text-[#171717] tabular-nums">
                  {formatINR(selectedProduct.currentValue)}
                </span>
              </div>
            )}
          </div>

          {/* Quantity Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[12px] font-semibold text-[#78716C]">
                Quantity ({selectedProduct.unitMeasure})
              </label>
              <button
                type="button"
                onClick={setMaxQuantity}
                className="text-[11px] font-semibold text-[#6A2E62] hover:underline"
              >
                Max ({side === 'buy' ? 'afford' : 'holding'})
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 5))}
                className="w-10 h-10 rounded-[10px] border border-[#E7E5E4] flex items-center justify-center font-bold text-lg hover:bg-[#F5F5F4] transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                className="flex-1 text-center py-2 border border-[#E7E5E4] rounded-[10px] text-[16px] font-bold tabular-nums focus:outline-[#6A2E62]"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 5)}
                className="w-10 h-10 rounded-[10px] border border-[#E7E5E4] flex items-center justify-center font-bold text-lg hover:bg-[#F5F5F4] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Cost Summary Box */}
          <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] p-3 text-[13px] space-y-1.5">
            <div className="flex items-center justify-between text-[#6B6B6B]">
              <span>Gross Order Value</span>
              <span className="font-medium text-[#171717] tabular-nums">{formatINR(grossTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-[#6B6B6B]">
              <span>Platform Fee (0.1%)</span>
              <span className="font-medium text-[#171717] tabular-nums">{formatINR(estimatedFee, { decimals: 2 })}</span>
            </div>
            <div className="pt-2 border-t border-[#E7E5E4] flex items-center justify-between text-[14px] font-bold">
              <span className="text-[#171717]">{side === 'buy' ? 'Total Payable' : 'Estimated Proceeds'}</span>
              <span className="text-[#6A2E62] tabular-nums">{formatINR(netTotal)}</span>
            </div>
          </div>

          {/* Validation Error if any */}
          {!canAfford && (
            <div className="flex items-center gap-2 p-2.5 bg-[#FEF2F2] border border-[#FECDCA] rounded-[10px] text-[#C62828] text-[12px]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                {side === 'buy'
                  ? 'Order amount exceeds available balance. Please add funds.'
                  : `You only own ${holdingQty} units. Reduce sell quantity.`}
              </span>
            </div>
          )}

          {/* Submit CTA */}
          <Button
            fullWidth
            size="lg"
            variant={side === 'buy' ? 'positive' : 'negative'}
            onClick={handleReview}
            disabled={!canAfford || quantity <= 0}
          >
            Review {side === 'buy' ? 'Purchase' : 'Sale'}
          </Button>
        </div>
      )}

      {/* Review Confirmation Step */}
      {step === 'review' && (
        <div className="space-y-4">
          <div className="p-3 bg-[#FAF4F9] border border-[#ECD6E9] rounded-[12px] text-center">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6A2E62]">
              Order Verification
            </span>
            <h3 className="text-[18px] font-bold text-[#171717] mt-0.5">
              Confirm {side === 'buy' ? 'Buying' : 'Selling'} {quantity} {selectedProduct.unitMeasure}
            </h3>
            <p className="text-[13px] text-[#6B6B6B]">{selectedProduct.name} ({selectedProduct.id})</p>
          </div>

          <div className="divide-y divide-[#E7E5E4] text-[13px]">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#6B6B6B]">Order Side</span>
              <span className={`font-bold uppercase ${side === 'buy' ? 'text-[#16803C]' : 'text-[#C62828]'}`}>
                {side}
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#6B6B6B]">Order Type</span>
              <span className="font-semibold text-[#171717] uppercase">{orderType}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#6B6B6B]">Execution Price</span>
              <span className="font-semibold text-[#171717] tabular-nums">{formatINR(currentPrice)}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#6B6B6B]">Platform Fee</span>
              <span className="font-semibold text-[#171717] tabular-nums">{formatINR(estimatedFee, { decimals: 2 })}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[15px] font-bold">
              <span className="text-[#171717]">Net Settlement</span>
              <span className="text-[#6A2E62] tabular-nums">{formatINR(netTotal)}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-[12px] text-[#78716C]">
              <span>Estimated Balance Post-Order</span>
              <span className="font-semibold text-[#171717] tabular-nums">
                {formatINR(side === 'buy' ? wallet.availableBalance - netTotal : wallet.availableBalance + netTotal)}
              </span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" fullWidth onClick={() => setStep('form')}>
              Back
            </Button>
            <Button
              variant={side === 'buy' ? 'positive' : 'negative'}
              fullWidth
              onClick={handleConfirmOrder}
            >
              Confirm & Execute
            </Button>
          </div>
        </div>
      )}

      {/* Success State */}
      {step === 'success' && (
        <div className="py-4 text-center space-y-4">
          <div className="w-14 h-14 bg-[#ECFDF3] rounded-full flex items-center justify-center mx-auto text-[#16803C]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-[#171717]">Order Executed Successfully</h3>
            <p className="text-[13px] text-[#6B6B6B] mt-1">
              Your {side} order for {quantity} units of {selectedProduct.name} was filled and logged in the immutable ledger.
            </p>
          </div>

          <div className="p-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] text-left text-[12px] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#78716C]">Order Reference:</span>
              <span className="font-mono font-semibold text-[#171717]">{completedOrderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#78716C]">Settlement Amount:</span>
              <span className="font-semibold text-[#171717] tabular-nums">{formatINR(netTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#78716C]">Updated Available Balance:</span>
              <span className="font-semibold text-[#16803C] tabular-nums">{formatINR(wallet.availableBalance)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                closeBuySell();
                setCurrentView('orders');
              }}
            >
              View in Orders
            </Button>
            <Button fullWidth onClick={closeBuySell}>
              Done
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
