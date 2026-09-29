import React, { useState, useMemo } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Search, Download, CheckCircle2, ArrowDownLeft, ArrowUpRight, Receipt } from 'lucide-react';

export const LedgerView: React.FC = () => {
  const { transactions, openTransactionDetail, showToast } = useTrading();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = ['all', 'buy', 'sell', 'deposit', 'withdrawal', 'adjustment'];

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || t.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchQuery, selectedType]);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Date,Time,Description,Type,Amount,RunningBalance,Reference']
        .concat(
          filtered.map(
            (t) =>
              `"${t.id}","${t.date}","${t.time}","${t.description}","${t.type}",${t.amount},${t.runningBalance},"${t.reference}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tradeon_ledger_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Ledger Exported', 'CSV download initiated.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-bold text-[#087A4A] uppercase tracking-wider bg-[#E9FAF1] px-2.5 py-0.5 rounded-[6px] border border-[#CFF3E0]">
              Transaction Audit Log
            </span>
          </div>
          <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Financial Ledger</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-0.5">
            Immutable, verifiable double-entry transaction record with continuous running balance tracking.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleExportCSV}
          className="flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Statement</span>
        </Button>
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-[#E7E5E4] rounded-[16px] p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#78716C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, keyword, reference code..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[10px] text-[13px] text-[#171717] focus:outline-[#087A4A] focus:bg-white"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-[8px] text-[12px] font-semibold capitalize transition-all whitespace-nowrap ${
                selectedType === type
                  ? 'bg-[#1FC777] text-[#0C0F0C] font-bold shadow-2xs'
                  : 'bg-[#F5F5F4] text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#FAFAF9] border-b border-[#E7E5E4] text-[#78716C] font-bold text-[12px]">
              <tr>
                <th className="py-3 px-4">Transaction ID & Timestamp</th>
                <th className="py-3 px-4">Activity Description</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Platform Fee</th>
                <th className="py-3 px-4">Running Balance</th>
                <th className="py-3 px-4">Audit Reference</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4]">
              {filtered.map((txn) => {
                const isCredit = txn.amount > 0;
                return (
                  <tr
                    key={txn.id}
                    onClick={() => openTransactionDetail(txn)}
                    className="hover:bg-[#E9FAF1]/60 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-[13px] text-[#171717] group-hover:text-[#087A4A] block">
                        {txn.id}
                      </span>
                      <span className="text-[11px] text-[#78716C]">
                        {txn.date} · {txn.time}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#171717] max-w-xs">
                      <span className="block truncate">{txn.description}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        status={
                          txn.type === 'buy'
                            ? 'neutral'
                            : txn.type === 'sell' || txn.type === 'deposit'
                            ? 'positive'
                            : txn.type === 'withdrawal'
                            ? 'warning'
                            : 'info'
                        }
                        label={txn.type.toUpperCase()}
                      />
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`font-bold tabular-nums block ${
                          isCredit ? 'text-[#16803C]' : 'text-[#171717]'
                        }`}
                      >
                        {isCredit ? '+' : ''}
                        {formatINR(txn.amount, { decimals: 2 })}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 tabular-nums text-[#78716C]">
                      {txn.fee > 0 ? formatINR(txn.fee, { decimals: 2 }) : '₹0.00'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#087A4A] tabular-nums">
                      {formatINR(txn.runningBalance, { decimals: 2 })}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[12px] text-[#78716C]">
                      {txn.reference}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button className="text-[12px] font-semibold text-[#087A4A] group-hover:underline">
                        Receipt
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-[#78716C]">
            <p className="text-[14px]">No transactions match your current search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
