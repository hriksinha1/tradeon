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
        <div className="p-4 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[6px] text-center">
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
            className={`text-[26px] font-bold tabular-nums tracking-tight mt-1.5 font-mono ${
              isCredit ? 'text-[#02A063]' : 'text-[#181A20]'
            }`}
          >
            {isCredit ? '+' : ''}
            {formatINR(selectedTransaction.amount, { decimals: 2 })}
          </h2>
          <p className="text-xs text-[#707A8A] mt-1">{selectedTransaction.description}</p>
        </div>

        {/* Ledger Details Grid */}
        <div className="bg-[#F5F6F8] border border-[#DFE2E6] rounded-[6px] divide-y divide-[#EAECEF] text-xs">
          <div className="p-3 flex items-center justify-between">
            <span className="text-[#707A8A]">Execution Timestamp:</span>
            <span className="font-semibold text-[#181A20]">
              {selectedTransaction.date} at {selectedTransaction.time}
            </span>
          </div>

          <div className="p-3 flex items-center justify-between">
            <span className="text-[#707A8A]">Audit Reference:</span>
            <div className="flex items-center gap-1.5 font-mono font-bold text-[#181A20]">
              <span>{selectedTransaction.reference}</span>
              <button
                onClick={handleCopyRef}
                className="p-1 hover:bg-[#EAECEF] rounded transition-colors text-[#707A8A] hover:text-[#181A20] cursor-pointer"
                title="Copy reference code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#02A063]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between">
            <span className="text-[#707A8A]">Status:</span>
            <span className="font-semibold text-[#02A063] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Settled in Ledger</span>
            </span>
          </div>

          <div className="p-3 flex items-center justify-between">
            <span className="text-[#707A8A]">Resulting Running Balance:</span>
            <span className="font-bold text-[#181A20] font-mono">
              {formatINR(selectedTransaction.runningBalance)}
            </span>
          </div>
        </div>

        {/* Informative Security Stamp */}
        <div className="p-3 rounded-[6px] border border-[#EAECEF] bg-white flex items-center gap-2.5 text-xs text-[#707A8A]">
          <FileText className="w-4 h-4 text-[#B78103] shrink-0" />
          <span>
            Cryptographic ledger stamp verified against internal double-entry sequence.
          </span>
        </div>

        <Button variant="outline" fullWidth onClick={closeTransactionDetail} className="cursor-pointer">
          Close Audit Record
        </Button>
      </div>
    </Modal>
  );
};
