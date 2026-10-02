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
      title="Transaction Audit Record"
      subtitle={`Immutable Ledger ID: ${selectedTransaction.id}`}
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Header Amount Card */}
        <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[6px] text-center">
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
            className={`text-[26px] font-bold tabular-nums tracking-tight mt-1.5 ${
              isCredit ? 'text-[#0ECB81]' : 'text-[#F5F5F5]'
            }`}
          >
            {isCredit ? '+' : ''}
            {formatINR(selectedTransaction.amount, { decimals: 2 })}
          </h2>
          <p className="text-[12px] text-[#848E9C] mt-1">{selectedTransaction.description}</p>
        </div>

        {/* Ledger Details Grid */}
        <div className="bg-[#111418] border border-[#2B3139] rounded-[6px] divide-y divide-[#1E2329] text-[13px]">
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#848E9C]">Execution Timestamp</span>
            <span className="font-semibold text-[#F5F5F5]">
              {selectedTransaction.date} · {selectedTransaction.time}
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#848E9C]">Status</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#0ECB81]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Settled & Reconciled</span>
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#848E9C]">Processing / Exchange Fee</span>
            <span className="font-semibold text-[#848E9C] tabular-nums">
              {formatINR(selectedTransaction.fee, { decimals: 2 })}
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#848E9C]">Balance After Transaction</span>
            <span className="font-bold text-[#F0B90B] tabular-nums">
              {formatINR(selectedTransaction.runningBalance, { decimals: 2 })}
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#848E9C]">Payment Method / Settlement Rail</span>
            <span className="font-semibold text-[#F5F5F5]">
              {selectedTransaction.paymentMethod || 'Internal Exchange Ledger'}
            </span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#848E9C]">Audit Reference</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] font-semibold text-[#F0B90B]">
                {selectedTransaction.reference}
              </span>
              <button
                onClick={handleCopyRef}
                className="p-1 hover:bg-[#1E2329] rounded transition-colors text-[#848E9C] hover:text-[#F0B90B] cursor-pointer"
                title="Copy reference"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#0ECB81]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3-Stage Verification Timeline */}
        <div className="p-3 bg-[#111418] border border-[#2B3139] rounded-[6px]">
          <h4 className="text-[11px] font-bold text-[#848E9C] uppercase tracking-wider mb-2.5">
            Settlement Audit Lifecycle
          </h4>
          <div className="space-y-2.5 text-[12px]">
            <div className="flex items-center gap-2 text-[#0ECB81]">
              <Check className="w-3.5 h-3.5" />
              <span className="font-semibold text-[#F5F5F5]">1. Order Signature Verified & Authorization Granted</span>
            </div>
            <div className="flex items-center gap-2 text-[#0ECB81]">
              <Check className="w-3.5 h-3.5" />
              <span className="font-semibold text-[#F5F5F5]">2. High-Throughput Matching Engine Filled Contract</span>
            </div>
            <div className="flex items-center gap-2 text-[#0ECB81]">
              <Check className="w-3.5 h-3.5" />
              <span className="font-semibold text-[#F5F5F5]">3. Double-Entry Running Balance Reconciled</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button variant="secondary" fullWidth onClick={handleCopyRef} className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Copy Audit Data</span>
          </Button>
          <Button variant="primary" fullWidth onClick={closeTransactionDetail}>
            Dismiss
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
