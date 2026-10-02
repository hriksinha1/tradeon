import React, { useState, useMemo } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Search, Download, CheckCircle2, ArrowDownLeft, ArrowUpRight, Receipt, FileText } from 'lucide-react';

export const LedgerView: React.FC = () => {
  const { transactions, openTransactionDetail, showToast } = useTrading();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = ['all', 'buy', 'sell', 'deposit', 'withdrawal'];

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
      ['ID,Date,Time,Description,Type,Amount,Fee,RunningBalance,Reference']
        .concat(
          filtered.map(
            (t) =>
              `"${t.id}","${t.date}","${t.time}","${t.description}","${t.type}",${t.amount},${t.fee},${t.runningBalance},"${t.reference}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tradeon_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Ledger Exported', 'CSV download generated successfully.', 'success');
  };

  return (
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-5 space-y-4 select-none bg-white text-[#181A20]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#EAECEF]">
        <div>
          <h1 className="text-[22px] font-bold text-[#181A20] tracking-tight">Audit & Accounting Ledger</h1>
          <p className="text-[12px] text-[#707A8A]">
            Verifiable double-entry ledger with immutable running-balance reconciliation.
          </p>
        </div>

        <Button
          size="xs"
          variant="secondary"
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 h-8 font-semibold cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </Button>
      </div>

      {/* Control Bar: Search & Type filters */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#707A8A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, keyword, or reference..."
            className="w-full h-8 pl-8 pr-3 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[4px] text-[12px] text-[#181A20] placeholder-[#707A8A] focus:border-[#F0B90B] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Type Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-[4px] text-[11px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedType === type
                  ? 'bg-[#F5F6F8] text-[#181A20] font-bold border border-[#DFE2E6]'
                  : 'text-[#707A8A] hover:text-[#181A20]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Ledger Table */}
      <div className="hidden md:block bg-white border border-[#DFE2E6] rounded-[6px] overflow-hidden shadow-xs">
        <table className="w-full text-left text-[13px] tabular-nums font-mono">
          <thead className="bg-[#F5F6F8] border-b border-[#DFE2E6] text-[#707A8A] text-[11px] font-semibold uppercase font-sans">
            <tr>
              <th className="py-2.5 px-3">Transaction ID & Time</th>
              <th className="py-2.5 px-3">Description</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Amount (INR)</th>
              <th className="py-2.5 px-3">Fee</th>
              <th className="py-2.5 px-3">Balance After</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right font-sans">Audit Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECEF]">
            {filtered.map((t) => {
              const isCredit = t.amount > 0;
              return (
                <tr
                  key={t.id}
                  onClick={() => openTransactionDetail(t)}
                  className="hover:bg-[#F5F6F8] transition-colors cursor-pointer group font-sans"
                >
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-[12px] text-[#946800] group-hover:text-[#181A20] block">
                      {t.id}
                    </span>
                    <span className="text-[11px] text-[#707A8A] font-mono">{t.date} · {t.time}</span>
                  </td>

                  <td className="py-3 px-3 font-semibold text-[#181A20] max-w-xs truncate">
                    {t.description}
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 font-bold uppercase text-[11px] px-1.5 py-0.5 rounded ${
                        isCredit
                          ? 'bg-[#EBFBF3] text-[#02A063] border border-[#02A063]/30'
                          : 'bg-[#F5F6F8] text-[#707A8A] border border-[#DFE2E6]'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  <td className={`py-3 px-3 font-bold text-[13px] font-mono ${isCredit ? 'text-[#02A063]' : 'text-[#181A20]'}`}>
                    {isCredit ? '+' : ''}{formatINR(t.amount, { decimals: 2 })}
                  </td>

                  <td className="py-3 px-3 text-[#707A8A] font-mono">
                    {formatINR(t.fee, { decimals: 2 })}
                  </td>

                  <td className="py-3 px-3 font-bold text-[#181A20] font-mono">
                    {formatINR(t.runningBalance, { decimals: 2 })}
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#02A063]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Reconciled</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="font-mono text-[11px] text-[#707A8A] group-hover:text-[#946800]">
                      {t.reference}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Ledger List */}
      <div className="md:hidden space-y-2 tabular-nums">
        {filtered.map((t) => {
          const isCredit = t.amount > 0;
          return (
            <div
              key={t.id}
              onClick={() => openTransactionDetail(t)}
              className="p-3 bg-white border border-[#DFE2E6] rounded-[6px] space-y-2 cursor-pointer hover:border-[#CFD3D8] shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-[13px] text-[#181A20] block">{t.description}</span>
                  <span className="text-[11px] text-[#707A8A] font-mono">{t.id} · {t.date}</span>
                </div>
                <span className={`font-bold text-[14px] font-mono ${isCredit ? 'text-[#02A063]' : 'text-[#181A20]'}`}>
                  {isCredit ? '+' : ''}{formatINR(t.amount)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EAECEF] flex items-center justify-between text-[11px] text-[#707A8A]">
                <span>Bal: <strong className="text-[#181A20] font-mono">{formatINR(t.runningBalance)}</strong></span>
                <span className="font-mono">{t.reference}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-10 text-center bg-white border border-[#DFE2E6] rounded-[6px] text-[#707A8A] text-[13px] shadow-xs">
          No ledger transactions found.
        </div>
      )}
    </div>
  );
};

export default LedgerView;
