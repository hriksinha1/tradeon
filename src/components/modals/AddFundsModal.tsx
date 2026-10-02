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
  const [upiId, setUpiId] = useState('trader@hdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const presets = [5000, 10000, 25000, 50000];

  const handleDeposit = () => {
    if (amount <= 0) return;
    setIsProcessing(true);

    const methodName =
      method === 'upi' ? `UPI Instant (${upiId})` : method === 'netbanking' ? 'Net Banking (HDFC Bank)' : 'Debit Card (··4091)';

    setTimeout(() => {
      addFunds(amount, methodName);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 900);
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
      title={isSuccess ? undefined : 'Deposit Funds'}
      subtitle={isSuccess ? undefined : `Available Balance: ${formatINR(wallet.availableBalance)} · Instant Settlement`}
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-4 text-center space-y-4">
          <div className="w-12 h-12 bg-[#102A22] border border-[#0ECB81]/40 rounded-full flex items-center justify-center mx-auto text-[#0ECB81]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-[#F5F5F5]">Deposit Completed</h3>
            <p className="text-[13px] text-[#848E9C] mt-1">
              ₹{amount.toLocaleString('en-IN')} credited to your trading wallet.
            </p>
          </div>
          <div className="p-3 bg-[#111418] border border-[#2B3139] rounded-[6px] text-[13px] font-semibold text-[#0ECB81]">
            Updated Balance: {formatINR(wallet.availableBalance)}
          </div>
          <Button fullWidth variant="primary" onClick={handleClose}>
            Return to Trading
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-[12px] font-medium text-[#848E9C] mb-1.5">
              Deposit Amount (INR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-[16px] font-bold text-[#848E9C]">₹</span>
              <input
                type="number"
                min="100"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-11 pl-8 pr-4 rounded-[6px] bg-[#111418] border border-[#363C45] text-[#F5F5F5] font-bold text-[18px] tabular-nums focus:border-[#F0B90B] focus:outline-none"
                placeholder="Enter amount"
              />
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-2 mt-2">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  className={`py-1 text-[11px] font-semibold rounded-[4px] border transition-colors cursor-pointer ${
                    amount === p
                      ? 'border-[#F0B90B] bg-[#302A15] text-[#F0B90B]'
                      : 'border-[#2B3139] bg-[#111418] text-[#848E9C] hover:text-[#F5F5F5] hover:border-[#474F59]'
                  }`}
                >
                  +{formatINR(p)}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-[12px] font-medium text-[#848E9C] mb-1.5">
              Select Deposit Gateway
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`w-full p-3 rounded-[6px] border text-left flex items-center justify-between transition-colors cursor-pointer ${
                  method === 'upi'
                    ? 'border-[#F0B90B] bg-[#1E2329]'
                    : 'border-[#2B3139] bg-[#111418] hover:border-[#363C45]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-[4px] ${method === 'upi' ? 'bg-[#302A15] text-[#F0B90B]' : 'bg-[#161A1E] text-[#848E9C]'}`}>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#F5F5F5]">UPI Instant Transfer</div>
                    <div className="text-[11px] text-[#848E9C]">Google Pay, PhonePe, BHIM · Zero Fee</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#0ECB81] font-semibold">Immediate</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('netbanking')}
                className={`w-full p-3 rounded-[6px] border text-left flex items-center justify-between transition-colors cursor-pointer ${
                  method === 'netbanking'
                    ? 'border-[#F0B90B] bg-[#1E2329]'
                    : 'border-[#2B3139] bg-[#111418] hover:border-[#363C45]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-[4px] ${method === 'netbanking' ? 'bg-[#302A15] text-[#F0B90B]' : 'bg-[#161A1E] text-[#848E9C]'}`}>
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#F5F5F5]">Net Banking (IMPS / NEFT)</div>
                    <div className="text-[11px] text-[#848E9C]">HDFC, ICICI, SBI, Axis & 50+ Banks</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#0ECB81] font-semibold">&lt; 2 mins</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`w-full p-3 rounded-[6px] border text-left flex items-center justify-between transition-colors cursor-pointer ${
                  method === 'card'
                    ? 'border-[#F0B90B] bg-[#1E2329]'
                    : 'border-[#2B3139] bg-[#111418] hover:border-[#363C45]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-[4px] ${method === 'card' ? 'bg-[#302A15] text-[#F0B90B]' : 'bg-[#161A1E] text-[#848E9C]'}`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#F5F5F5]">Corporate / Debit Card</div>
                    <div className="text-[11px] text-[#848E9C]">Visa, Mastercard, RuPay verified</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#0ECB81] font-semibold">Immediate</span>
              </button>
            </div>
          </div>

          {method === 'upi' && (
            <div>
              <label className="block text-[12px] font-medium text-[#848E9C] mb-1">
                Virtual Payment Address (VPA / UPI ID)
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full h-10 px-3 rounded-[6px] bg-[#111418] border border-[#363C45] text-[#F5F5F5] text-[13px] focus:border-[#F0B90B] focus:outline-none"
                placeholder="username@bank"
              />
            </div>
          )}

          {/* Security guarantee */}
          <div className="p-3 bg-[#111418] rounded-[6px] border border-[#2B3139] flex items-center gap-2.5 text-[12px] text-[#848E9C]">
            <ShieldCheck className="w-4 h-4 text-[#0ECB81] shrink-0" />
            <span>256-bit encrypted escrow banking gateway with automated double-entry ledger ledgering.</span>
          </div>

          <Button
            variant="primary"
            fullWidth
            size="md"
            disabled={amount <= 0 || isProcessing}
            onClick={handleDeposit}
            className="font-bold"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Deposit...</span>
              </span>
            ) : (
              `Deposit ${formatINR(amount)}`
            )}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default AddFundsModal;
