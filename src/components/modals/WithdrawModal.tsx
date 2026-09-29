import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import { CheckCircle2, Building2, Clock, AlertCircle } from 'lucide-react';

export const WithdrawModal: React.FC = () => {
  const { isWithdrawOpen, setIsWithdrawOpen, wallet, withdrawFunds } = useTrading();

  const [amount, setAmount] = useState<number>(20000);
  const [selectedAccount, setSelectedAccount] = useState('HDFC Bank (···4091)');
  const [isSuccess, setIsSuccess] = useState(false);

  const fee = 10;
  const netCredit = Math.max(0, amount - fee);
  const canWithdraw = amount > 0 && amount <= wallet.availableBalance;

  const handleWithdraw = () => {
    if (!canWithdraw) return;
    const ok = withdrawFunds(amount, selectedAccount);
    if (ok) {
      setIsSuccess(true);
    }
  };

  const handleClose = () => {
    setIsWithdrawOpen(false);
    setIsSuccess(false);
  };

  return (
    <Modal
      isOpen={isWithdrawOpen}
      onClose={handleClose}
      title={isSuccess ? undefined : 'Withdraw Funds'}
      subtitle={isSuccess ? undefined : `Available for Withdrawal: ${formatINR(wallet.availableBalance)}`}
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-4 text-center space-y-4">
          <div className="w-14 h-14 bg-[#ECFDF3] rounded-full flex items-center justify-center mx-auto text-[#16803C]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-[#171717]">Withdrawal Initiated</h3>
            <p className="text-[13px] text-[#6B6B6B] mt-1">
              ₹{netCredit.toLocaleString('en-IN')} is being transferred to your registered bank account.
            </p>
          </div>
          <div className="p-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] text-left text-[12px] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#78716C]">Beneficiary:</span>
              <span className="font-semibold text-[#171717]">{selectedAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#78716C]">Expected Arrival:</span>
              <span className="font-semibold text-[#16803C]">Within 2 Hours (IMPS)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#78716C]">Remaining Balance:</span>
              <span className="font-semibold text-[#171717] tabular-nums">{formatINR(wallet.availableBalance)}</span>
            </div>
          </div>
          <Button fullWidth onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Amount */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[12px] font-semibold text-[#78716C]">Withdrawal Amount</label>
              <button
                type="button"
                onClick={() => setAmount(wallet.availableBalance)}
                className="text-[11px] font-semibold text-[#6A2E62] hover:underline"
              >
                Withdraw Full ({formatINR(wallet.availableBalance)})
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-[18px] font-bold text-[#78716C]">₹</span>
              <input
                type="number"
                min="100"
                max={wallet.availableBalance}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E7E5E4] rounded-[10px] text-[20px] font-bold text-[#171717] tabular-nums focus:outline-[#6A2E62]"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Destination Account */}
          <div>
            <label className="block text-[12px] font-semibold text-[#78716C] mb-1">
              Destination Bank Account
            </label>
            <div className="p-3 bg-[#F5F5F4] border border-[#E7E5E4] rounded-[10px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#6A2E62]" />
                <div>
                  <span className="text-[13px] font-bold text-[#171717] block">HDFC Bank Limited</span>
                  <span className="text-[11px] text-[#6B6B6B]">A/C No: ••••••••4091 · IFSC: HDFC000124</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#16803C] bg-[#ECFDF3] px-2 py-0.5 rounded">
                Verified
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] p-3 text-[13px] space-y-1.5">
            <div className="flex items-center justify-between text-[#6B6B6B]">
              <span>Requested Amount</span>
              <span className="font-semibold text-[#171717] tabular-nums">{formatINR(amount)}</span>
            </div>
            <div className="flex items-center justify-between text-[#6B6B6B]">
              <span>Processing Fee</span>
              <span className="font-semibold text-[#171717] tabular-nums">{formatINR(fee)}</span>
            </div>
            <div className="pt-2 border-t border-[#E7E5E4] flex items-center justify-between text-[14px] font-bold">
              <span className="text-[#171717]">Net Amount to Account</span>
              <span className="text-[#6A2E62] tabular-nums">{formatINR(netCredit)}</span>
            </div>
          </div>

          {/* Arrival Notice */}
          <div className="flex items-center gap-2 text-[11px] text-[#78716C] bg-[#FFFBEB] border border-[#FEDF89] p-2.5 rounded-[8px]">
            <Clock className="w-3.5 h-3.5 text-[#B7791F] shrink-0" />
            <span>Funds settle directly via IMPS 24x7 within 2 business hours.</span>
          </div>

          {!canWithdraw && (
            <div className="flex items-center gap-2 p-2 bg-[#FEF2F2] border border-[#FECDCA] rounded-[8px] text-[#C62828] text-[12px]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Amount must be greater than zero and cannot exceed available balance.</span>
            </div>
          )}

          {/* CTA */}
          <Button fullWidth size="lg" onClick={handleWithdraw} disabled={!canWithdraw}>
            Confirm Withdrawal of {formatINR(netCredit)}
          </Button>
        </div>
      )}
    </Modal>
  );
};
