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
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-5 space-y-4 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#2B3139]">
        <div>
          <h1 className="text-[22px] font-bold text-[#F5F5F5] tracking-tight">Audit & Accounting Ledger</h1>
          <p className="text-[12px] text-[#848E9C]">
            Verifiable double-entry ledger with immutable running-balance reconciliation.
          </p>
        </div>

        <Button
          size="xs"
          variant="secondary"
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 h-8 font-semibold"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </Button>
      </div>

      {/* Control Bar: Search & Type filters */}
      <div className="bg-[#111418] border border-[#2B3139] rounded-[6px] p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#848E9C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, keyword, or reference..."
            className="w-full h-8 pl-8 pr-3 bg-[#161A1E] border border-[#2B3139] rounded-[4px] text-[12px] text-[#F5F5F5] focus:border-[#F0B90B] focus:outline-none"
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
                  ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]'
                  : 'text-[#848E9C] hover:text-[#F5F5F5]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Ledger Table */}
      <div className="hidden md:block bg-[#111418] border border-[#2B3139] rounded-[6px] overflow-hidden">
        <table className="w-full text-left text-[13px] tabular-nums">
          <thead className="bg-[#161A1E] border-b border-[#2B3139] text-[#848E9C] text-[11px] font-semibold uppercase">
            <tr>
              <th className="py-2.5 px-3">Transaction ID & Time</th>
              <th className="py-2.5 px-3">Description</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Amount (INR)</th>
              <th className="py-2.5 px-3">Fee</th>
              <th className="py-2.5 px-3">Balance After</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Audit Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2329]">
            {filtered.map((t) => {
              const isCredit = t.amount > 0;
              return (
                <tr
                  key={t.id}
                  onClick={() => openTransactionDetail(t)}
                  className="hover:bg-[#161A1E] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-[12px] text-[#F5F5F5] group-hover:text-[#F0B90B] block">
                      {t.id}
                    </span>
                    <span className="text-[11px] text-[#848E9C]">{t.date} · {t.time}</span>
                  </td>

                  <td className="py-3 px-3 font-semibold text-[#F5F5F5] max-w-xs truncate">
                    {t.description}
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 font-bold uppercase text-[11px] px-1.5 py-0.5 rounded ${
                        isCredit
                          ? 'bg-[#102A22] text-[#0ECB81] border border-[#0ECB81]/30'
                          : 'bg-[#1E2329] text-[#848E9C] border border-[#363C45]'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  <td className={`py-3 px-3 font-bold text-[13px] ${isCredit ? 'text-[#0ECB81]' : 'text-[#F5F5F5]'}`}>
                    {isCredit ? '+' : ''}{formatINR(t.amount, { decimals: 2 })}
                  </td>

                  <td className="py-3 px-3 text-[#848E9C]">
                    {formatINR(t.fee, { decimals: 2 })}
                  </td>

                  <td className="py-3 px-3 font-bold text-[#F0B90B]">
                    {formatINR(t.runningBalance, { decimals: 2 })}
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0ECB81]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Reconciled</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="font-mono text-[11px] text-[#848E9C] group-hover:text-[#F0B90B]">
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
              className="p-3 bg-[#111418] border border-[#2B3139] rounded-[6px] space-y-2 cursor-pointer hover:border-[#363C45]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-[13px] text-[#F5F5F5] block">{t.description}</span>
                  <span className="text-[11px] text-[#848E9C] font-mono">{t.id} · {t.date}</span>
                </div>
                <span className={`font-bold text-[14px] ${isCredit ? 'text-[#0ECB81]' : 'text-[#F5F5F5]'}`}>
                  {isCredit ? '+' : ''}{formatINR(t.amount)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#1E2329] flex items-center justify-between text-[11px] text-[#848E9C]">
                <span>Bal: <strong className="text-[#F0B90B]">{formatINR(t.runningBalance)}</strong></span>
                <span className="font-mono">{t.reference}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-10 text-center bg-[#111418] border border-[#2B3139] rounded-[6px] text-[#848E9C] text-[13px]">
          No ledger transactions found.
        </div>
      )}
    </div>
  );
};

export default LedgerView;
