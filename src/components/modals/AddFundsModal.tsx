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
          <div className="w-12 h-12 bg-[#EBFBF3] border border-[#A2E8C6] rounded-full flex items-center justify-center mx-auto text-[#02A063]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-[#181A20]">Deposit Completed</h3>
            <p className="text-[13px] text-[#707A8A] mt-1">
              ₹{amount.toLocaleString('en-IN')} credited to your trading wallet.
            </p>
          </div>
          <div className="p-3 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[6px] text-[13px] font-bold text-[#02A063] font-mono">
            Updated Balance: {formatINR(wallet.availableBalance)}
          </div>
          <Button variant="primary" fullWidth onClick={handleClose} className="cursor-pointer font-bold">
            Done
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Method Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#707A8A] mb-1.5">
              Select Payment Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`p-3 rounded-[6px] border text-center transition-all cursor-pointer ${
                  method === 'upi'
                    ? 'border-[#F0B90B] bg-[#FEF6D8]/30 text-[#181A20]'
                    : 'border-[#DFE2E6] bg-white text-[#707A8A] hover:bg-[#F5F6F8]'
                }`}
              >
                <Smartphone className="w-4 h-4 mx-auto mb-1 text-[#B78103]" />
                <div className="text-xs font-bold text-[#181A20]">UPI 2.0</div>
                <div className="text-[10px] text-[#02A063]">Instant</div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('netbanking')}
                className={`p-3 rounded-[6px] border text-center transition-all cursor-pointer ${
                  method === 'netbanking'
                    ? 'border-[#F0B90B] bg-[#FEF6D8]/30 text-[#181A20]'
                    : 'border-[#DFE2E6] bg-white text-[#707A8A] hover:bg-[#F5F6F8]'
                }`}
              >
                <Building className="w-4 h-4 mx-auto mb-1 text-[#B78103]" />
                <div className="text-xs font-bold text-[#181A20]">Net Banking</div>
                <div className="text-[10px] text-[#707A8A]">HDFC, ICICI</div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`p-3 rounded-[6px] border text-center transition-all cursor-pointer ${
                  method === 'card'
                    ? 'border-[#F0B90B] bg-[#FEF6D8]/30 text-[#181A20]'
                    : 'border-[#DFE2E6] bg-white text-[#707A8A] hover:bg-[#F5F6F8]'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#B78103]" />
                <div className="text-xs font-bold text-[#181A20]">Debit Card</div>
                <div className="text-[10px] text-[#707A8A]">Visa, MC</div>
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-[#707A8A] mb-1">
              Deposit Amount (₹ INR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#707A8A]">
                ₹
              </span>
              <input
                type="number"
                min="100"
                step="500"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 bg-white border border-[#DFE2E6] rounded-[6px] text-sm font-bold text-[#181A20] focus:outline-[#F0B90B] font-mono"
              />
            </div>

            {/* Quick Amount Presets */}
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  className="py-1 bg-white border border-[#DFE2E6] hover:bg-[#F5F6F8] rounded-[4px] text-xs font-medium text-[#474D57] transition-colors cursor-pointer font-mono"
                >
                  +{formatINR(p)}
                </button>
              ))}
            </div>
          </div>

          {method === 'upi' && (
            <div>
              <label className="block text-xs font-semibold text-[#707A8A] mb-1">
                Virtual Payment Address (VPA)
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@bank"
                className="w-full px-3 py-2 bg-white border border-[#DFE2E6] rounded-[6px] text-xs text-[#181A20] focus:outline-[#F0B90B]"
              />
            </div>
          )}

          {/* Summary Box */}
          <div className="p-3 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6] text-xs space-y-1.5">
            <div className="flex justify-between text-[#707A8A]">
              <span>Deposit Amount</span>
              <span className="font-mono text-[#181A20] font-bold">{formatINR(amount)}</span>
            </div>
            <div className="flex justify-between text-[#707A8A]">
              <span>Processing Fee</span>
              <span className="text-[#02A063] font-bold">₹0.00 (FREE)</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#DFE2E6] font-bold text-[#181A20]">
              <span>Credited Balance</span>
              <span className="font-mono">{formatINR(amount)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#707A8A]">
            <ShieldCheck className="w-4 h-4 text-[#02A063]" />
            <span>Bank-grade 256-bit encrypted gateway clearing</span>
          </div>

          <Button
            size="md"
            variant="primary"
            fullWidth
            onClick={handleDeposit}
            disabled={isProcessing || amount <= 0}
            className="font-bold cursor-pointer"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authorizing with bank...</span>
              </span>
            ) : (
              <span>Proceed to Deposit {formatINR(amount)}</span>
            )}
          </Button>
        </div>
      )}
    </Modal>
  );
};
