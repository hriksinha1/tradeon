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
          <div className="w-12 h-12 bg-[#102A22] border border-[#0ECB81]/40 rounded-full flex items-center justify-center mx-auto text-[#0ECB81]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-[#F5F5F5]">Withdrawal Submitted</h3>
            <p className="text-[13px] text-[#848E9C] mt-1">
              ₹{netCredit.toLocaleString('en-IN')} is being transferred to your registered beneficiary bank account.
            </p>
          </div>
          <div className="p-3.5 bg-[#111418] border border-[#2B3139] rounded-[6px] text-left text-[12px] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#848E9C]">Beneficiary:</span>
              <span className="font-semibold text-[#F5F5F5]">{selectedAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#848E9C]">Processing Speed:</span>
              <span className="font-semibold text-[#0ECB81]">IMPS (Within 2 Hours)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#848E9C]">Bank Transfer Fee:</span>
              <span className="font-semibold text-[#848E9C] tabular-nums">₹10.00</span>
            </div>
          </div>
          <Button fullWidth variant="primary" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Destination Account */}
          <div>
            <label className="block text-[12px] font-medium text-[#848E9C] mb-1.5">
              Verified Destination Account
            </label>
            <div className="p-3 rounded-[6px] border border-[#363C45] bg-[#111418] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1E2329] rounded-[4px] text-[#F0B90B]">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#F5F5F5]">{selectedAccount}</div>
                  <div className="text-[11px] text-[#848E9C]">IFSC: HDFC0001248 · Primary Savings</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#0ECB81] bg-[#102A22] border border-[#0ECB81]/30 px-1.5 py-0.5 rounded-[4px]">
                Verified
              </span>
            </div>
          </div>

          {/* Amount input */}
          <div>
            <div className="flex justify-between text-[12px] mb-1.5">
              <label className="font-medium text-[#848E9C]">Withdrawal Amount (INR)</label>
              <button
                type="button"
                onClick={() => setAmount(wallet.availableBalance)}
                className="font-semibold text-[#F0B90B] hover:underline cursor-pointer"
              >
                Max ({formatINR(wallet.availableBalance)})
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[16px] font-bold text-[#848E9C]">₹</span>
              <input
                type="number"
                min="100"
                max={wallet.availableBalance}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-11 pl-8 pr-4 rounded-[6px] bg-[#111418] border border-[#363C45] text-[#F5F5F5] font-bold text-[18px] tabular-nums focus:border-[#F0B90B] focus:outline-none"
              />
            </div>
          </div>

          {/* Settlement breakdown */}
          <div className="p-3 bg-[#111418] rounded-[6px] border border-[#2B3139] space-y-1.5 text-[12px]">
            <div className="flex justify-between text-[#848E9C]">
              <span>Requested Amount</span>
              <span className="font-semibold text-[#F5F5F5] tabular-nums">{formatINR(amount)}</span>
            </div>
            <div className="flex justify-between text-[#848E9C]">
              <span>Transfer Network Fee</span>
              <span className="font-semibold text-[#848E9C] tabular-nums">₹{fee.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#2B3139] flex justify-between font-bold">
              <span className="text-[#F5F5F5]">Net Bank Credit</span>
              <span className="text-[14px] text-[#F0B90B] tabular-nums">{formatINR(netCredit)}</span>
            </div>
          </div>

          {!canWithdraw && (
            <div className="p-3 rounded-[6px] bg-[#301820] border border-[#F6465D]/30 flex items-start gap-2.5 text-[#F6465D] text-[12px]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Amount must be greater than zero and within available balance ({formatINR(wallet.availableBalance)}).</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-[12px] text-[#848E9C]">
            <Clock className="w-3.5 h-3.5 text-[#F0B90B]" />
            <span>Withdrawals are processed automatically 24x7 via direct IMPS banking rails.</span>
          </div>

          <Button
            variant="primary"
            fullWidth
            size="md"
            disabled={!canWithdraw}
            onClick={handleWithdraw}
            className="font-bold"
          >
            Confirm Withdrawal
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default WithdrawModal;
