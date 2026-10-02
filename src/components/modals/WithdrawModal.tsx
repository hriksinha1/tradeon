import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { formatINR } from '../../constants/designTokens';
import { CheckCircle2, Building2, Clock, AlertCircle, Shield } from 'lucide-react';

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
      subtitle={isSuccess ? undefined : `Available Balance: ${formatINR(wallet.availableBalance)} · Bank Transfer`}
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="py-4 text-center space-y-4">
          <div className="w-12 h-12 bg-[#EBFBF3] border border-[#A2E8C6] rounded-full flex items-center justify-center mx-auto text-[#02A063]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-[#181A20]">Withdrawal Submitted</h3>
            <p className="text-[13px] text-[#707A8A] mt-1">
              ₹{netCredit.toLocaleString('en-IN')} is being transferred to your registered beneficiary bank account.
            </p>
          </div>
          <div className="p-3.5 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[6px] text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#707A8A]">Beneficiary:</span>
              <span className="font-semibold text-[#181A20]">{selectedAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#707A8A]">Processing Speed:</span>
              <span className="font-semibold text-[#02A063]">IMPS (Within 2 Hours)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#707A8A]">Net Bank Transfer:</span>
              <span className="font-bold text-[#181A20] font-mono">{formatINR(netCredit)}</span>
            </div>
          </div>
          <Button variant="primary" fullWidth onClick={handleClose} className="cursor-pointer font-bold">
            Done
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Destination Bank Account */}
          <div>
            <label className="block text-xs font-semibold text-[#707A8A] mb-1">
              Beneficiary Bank Account
            </label>
            <div className="p-3 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#B78103]" />
                <div>
                  <div className="text-xs font-bold text-[#181A20]">{selectedAccount}</div>
                  <div className="text-[10px] text-[#707A8A]">IFSC: HDFC0001234 · Primary Account</div>
                </div>
              </div>
              <span className="text-[10px] text-[#02A063] font-mono bg-[#EBFBF3] px-2 py-0.5 rounded-[4px] border border-[#A2E8C6]">
                Verified
              </span>
            </div>
          </div>

          {/* Amount input */}
          <div>
            <div className="flex justify-between text-xs text-[#707A8A] mb-1">
              <span className="font-semibold">Withdrawal Amount</span>
              <span>Available: {formatINR(wallet.availableBalance)}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#707A8A]">
                ₹
              </span>
              <input
                type="number"
                min="100"
                max={wallet.availableBalance}
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-16 py-2 bg-white border border-[#DFE2E6] rounded-[6px] text-sm font-bold text-[#181A20] focus:outline-[#F0B90B] font-mono"
              />
              <button
                type="button"
                onClick={() => setAmount(wallet.availableBalance)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[#B78103] hover:underline px-2 py-0.5 cursor-pointer"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-3 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6] text-xs space-y-1.5">
            <div className="flex justify-between text-[#707A8A]">
              <span>Requested Amount</span>
              <span className="font-mono text-[#181A20]">{formatINR(amount)}</span>
            </div>
            <div className="flex justify-between text-[#707A8A]">
              <span>IMPS Handling Fee</span>
              <span className="font-mono text-[#181A20]">{formatINR(fee)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#DFE2E6] font-bold text-[#181A20]">
              <span>Net Credit to Bank</span>
              <span className="font-mono text-[#02A063]">{formatINR(netCredit)}</span>
            </div>
          </div>

          {!canWithdraw && (
            <div className="p-2.5 bg-[#FDF0F2] border border-[#F7B5BE] rounded-[6px] flex items-center gap-2 text-xs text-[#CF304A]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Requested withdrawal exceeds your available wallet balance.</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-[#707A8A]">
            <Clock className="w-3.5 h-3.5 text-[#02A063]" />
            <span>Bank settlements clear around the clock via RBI IMPS rails.</span>
          </div>

          <Button
            size="md"
            variant="primary"
            fullWidth
            onClick={handleWithdraw}
            disabled={!canWithdraw}
            className="font-bold cursor-pointer"
          >
            Authorize Payout of {formatINR(netCredit)}
          </Button>
        </div>
      )}
    </Modal>
  );
};
