import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import { CheckCircle2, ShieldCheck, Smartphone, Building, CreditCard, Loader2 } from 'lucide-react';

export const AddFundsModal: React.FC = () => {
  const { isAddFundsOpen, setIsAddFundsOpen, addFunds, wallet } = useTrading();

  const [amount, setAmount] = useState<number>(25000);
  const [method, setMethod] = useState<'upi' | 'netbanking' | 'card'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const presets = [5000, 10000, 25000, 50000];

  const handleDeposit = () => {
    if (amount <= 0) return;
    setIsProcessing(true);

    const methodName =
      method === 'upi' ? `UPI (${upiId})` : method === 'netbanking' ? 'Net Banking (HDFC Bank)' : 'Debit Card (··4091)';

    setTimeout(() => {
      addFunds(amount, methodName);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsAddFundsOpen(false);
    setIsSuccess(false);
    setIsProcessing(false);
  };

  return (
    <Modal
      isOpen={isAddFundsOpen}
      onClose={handleClose}
      title={isSuccess ? undefined : 'Add Funds to Wallet'}
      subtitle={isSuccess ? undefined : `Current Balance: ${formatINR(wallet.availableBalance)} · Instant Credit`}
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-4 text-center space-y-4">
          <div className="w-14 h-14 bg-[#ECFDF3] rounded-full flex items-center justify-center mx-auto text-[#16803C]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-[#171717]">Funds Added Successfully</h3>
            <p className="text-[13px] text-[#6B6B6B] mt-1">
              ₹{amount.toLocaleString('en-IN')} has been deposited and is immediately available for trading.
            </p>
          </div>
          <div className="p-3 bg-[#E9FAF1] border border-[#CFF3E0] rounded-[12px] text-[13px] font-semibold text-[#087A4A]">
            New Available Balance: {formatINR(wallet.availableBalance)}
          </div>
          <Button fullWidth onClick={handleClose}>
            Continue Trading
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-[12px] font-semibold text-[#78716C] mb-1">
              Deposit Amount (INR)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-[18px] font-bold text-[#78716C]">₹</span>
              <input
                type="number"
                min="100"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E7E5E4] rounded-[10px] text-[20px] font-bold text-[#171717] tabular-nums focus:outline-[#087A4A]"
                placeholder="Enter amount"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex gap-2 mt-2">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  className={`flex-1 py-1 text-[12px] font-semibold rounded-[8px] border transition-colors ${
                    amount === p
                      ? 'border-[#087A4A] bg-[#E9FAF1] text-[#087A4A]'
                      : 'border-[#E7E5E4] hover:bg-[#F5F5F4] text-[#57534E]'
                  }`}
                >
                  +{formatINR(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-[12px] font-semibold text-[#78716C] mb-1.5">
              Select Payment Method
            </label>
            <div className="space-y-2">
              {/* UPI */}
              <div
                onClick={() => setMethod('upi')}
                className={`p-3 rounded-[10px] border cursor-pointer transition-all flex items-center justify-between ${
                  method === 'upi'
                    ? 'border-[#087A4A] bg-[#E9FAF1]'
                    : 'border-[#E7E5E4] hover:border-[#D6D3D1]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E7E5E4] flex items-center justify-center text-[#087A4A]">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[#171717] block">UPI / QR (Instant)</span>
                    <span className="text-[11px] text-[#6B6B6B]">GPay, PhonePe, Paytm, BHIM</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={method === 'upi'}
                  onChange={() => setMethod('upi')}
                  className="accent-[#087A4A]"
                />
              </div>

              {method === 'upi' && (
                <div className="px-3 pb-2 pt-1 bg-[#E9FAF1] rounded-b-[10px] -mt-1 border-x border-b border-[#087A4A]/30">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI VPA (e.g. mobile@upi)"
                    className="w-full px-3 py-1.5 bg-white border border-[#CFF3E0] rounded-[8px] text-[13px] focus:outline-[#087A4A]"
                  />
                </div>
              )}

              {/* Net Banking */}
              <div
                onClick={() => setMethod('netbanking')}
                className={`p-3 rounded-[10px] border cursor-pointer transition-all flex items-center justify-between ${
                  method === 'netbanking'
                    ? 'border-[#087A4A] bg-[#E9FAF1]'
                    : 'border-[#E7E5E4] hover:border-[#D6D3D1]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E7E5E4] flex items-center justify-center text-[#1D4ED8]">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[#171717] block">Net Banking</span>
                    <span className="text-[11px] text-[#6B6B6B]">All major Indian banks supported</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={method === 'netbanking'}
                  onChange={() => setMethod('netbanking')}
                  className="accent-[#087A4A]"
                />
              </div>

              {/* Card */}
              <div
                onClick={() => setMethod('card')}
                className={`p-3 rounded-[10px] border cursor-pointer transition-all flex items-center justify-between ${
                  method === 'card'
                    ? 'border-[#087A4A] bg-[#E9FAF1]'
                    : 'border-[#E7E5E4] hover:border-[#D6D3D1]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E7E5E4] flex items-center justify-center text-[#57534E]">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[#171717] block">Debit / Corporate Card</span>
                    <span className="text-[11px] text-[#6B6B6B]">Visa, Mastercard, RuPay</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={method === 'card'}
                  onChange={() => setMethod('card')}
                  className="accent-[#087A4A]"
                />
              </div>
            </div>
          </div>

          {/* Trust notice */}
          <div className="flex items-center gap-2 text-[11px] text-[#78716C] bg-[#F5F5F4] p-2 rounded-[8px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16803C] shrink-0" />
            <span>Secure 256-bit encrypted gateway. Zero payment fees applied.</span>
          </div>

          {/* CTA */}
          <Button
            fullWidth
            size="lg"
            onClick={handleDeposit}
            disabled={amount <= 0 || isProcessing}
            className="flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authorizing Payment...</span>
              </>
            ) : (
              <span>Proceed to Add {formatINR(amount)}</span>
            )}
          </Button>
        </div>
      )}
    </Modal>
  );
};
