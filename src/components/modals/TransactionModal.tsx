import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../constants/designTokens';
import { CheckCircle2, Copy, FileText, Check } from 'lucide-react';

export const TransactionModal: React.FC = () => {
  const { selectedTransaction, closeTransactionDetail, showToast } = useTrading();
  const [copied, setCopied] = React.useState(false);

  if (!selectedTransaction) return null;

  const isCredit = selectedTransaction.amount > 0;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(selectedTransaction.reference);
    setCopied(true);
    showToast('Copied Reference', 'Transaction reference copied to clipboard.', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={!!selectedTransaction}
      onClose={closeTransactionDetail}
      title="Transaction Audit Entry"
      subtitle={`Immutable Ledger ID: ${selectedTransaction.id}`}
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Header Amount Card */}
        <div className="p-4 bg-[#F0FAFF] border border-[#DFF6FF] rounded-[14px] text-center">
          <Badge
            status={
              selectedTransaction.type === 'buy'
                ? 'neutral'
                : selectedTransaction.type === 'sell' || selectedTransaction.type === 'deposit'
                ? 'positive'
                : selectedTransaction.type === 'withdrawal'
                ? 'warning'
                : 'info'
            }
            label={selectedTransaction.type.toUpperCase()}
            className="mb-1 uppercase font-bold"
          />
          <h2
            className={`text-[28px] font-bold tabular-nums tracking-tight mt-1 ${
              isCredit ? 'text-[#16803C]' : 'text-[#171717]'
            }`}
          >
            {isCredit ? '+' : ''}
            {formatINR(selectedTransaction.amount, { decimals: 2 })}
          </h2>
          <p className="text-[13px] text-[#6B6B6B] mt-0.5">{selectedTransaction.description}</p>
        </div>

        {/* Ledger Details Grid */}
        <div className="bg-white border border-[#E7E5E4] rounded-[12px] divide-y divide-[#E7E5E4] text-[13px]">
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#6B6B6B]">Timestamp</span>
            <span className="font-semibold text-[#171717]">
              {selectedTransaction.date} · {selectedTransaction.time}
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#6B6B6B]">Transaction Status</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#16803C]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settled & Reconciled</span>
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#6B6B6B]">Platform / Processing Fee</span>
            <span className="font-semibold text-[#171717] tabular-nums">
              {formatINR(selectedTransaction.fee, { decimals: 2 })}
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#6B6B6B]">Running Balance Post-Transaction</span>
            <span className="font-bold text-[#005EA8] tabular-nums">
              {formatINR(selectedTransaction.runningBalance, { decimals: 2 })}
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#6B6B6B]">Source / Payment Rail</span>
            <span className="font-semibold text-[#171717]">
              {selectedTransaction.paymentMethod || 'Internal Account Ledger'}
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#6B6B6B]">Audit Reference</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] font-semibold text-[#171717]">
                {selectedTransaction.reference}
              </span>
              <button
                onClick={handleCopyRef}
                className="p-1 hover:bg-[#F5F5F4] rounded transition-colors text-[#005EA8]"
                title="Copy reference"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#16803C]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3-Stage Verification Timeline */}
        <div className="p-3.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px]">
          <h4 className="text-[12px] font-bold text-[#78716C] uppercase tracking-wider mb-2.5">
            Settlement Lifecycle
          </h4>
          <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#A6F4C5]">
            <div className="flex items-start gap-3 relative">
              <div className="w-4 h-4 rounded-full bg-[#16803C] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5" />
              </div>
              <div className="text-[12px]">
                <span className="font-bold text-[#171717] block">Transaction Initiated</span>
                <span className="text-[#6B6B6B]">Validated against user session and authorized credentials</span>
              </div>
            </div>
            <div className="flex items-start gap-3 relative">
              <div className="w-4 h-4 rounded-full bg-[#16803C] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5" />
              </div>
              <div className="text-[12px]">
                <span className="font-bold text-[#171717] block">Execution & Balance Adjusted</span>
                <span className="text-[#6B6B6B]">Debits/credits applied with strict zero-loss concurrency locks</span>
              </div>
            </div>
            <div className="flex items-start gap-3 relative">
              <div className="w-4 h-4 rounded-full bg-[#16803C] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5" />
              </div>
              <div className="text-[12px]">
                <span className="font-bold text-[#171717] block">Ledger Reconciled</span>
                <span className="text-[#6B6B6B]">Itemized ledger entry stored with running balance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" fullWidth onClick={handleCopyRef} className="flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            <span>Copy Receipt Data</span>
          </Button>
          <Button fullWidth onClick={closeTransactionDetail}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
