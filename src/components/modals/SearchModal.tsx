import React, { useState, useMemo } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { formatINR } from '../../constants/designTokens';
import { Search, Compass, FileCheck, ArrowUpRight, ArrowDownLeft, Receipt } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    orders,
    transactions,
    setCurrentView,
    setSelectedProductId,
    openTransactionDetail,
  } = useTrading();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'products' | 'orders' | 'transactions'>('all');

  const filteredProducts = useMemo(() => {
    if (!query) return products.slice(0, 3);
    const q = query.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [query, products]);

  const filteredOrders = useMemo(() => {
    if (!query) return orders.slice(0, 2);
    const q = query.toLowerCase();
    return orders.filter(
      (o) => o.id.toLowerCase().includes(q) || o.productName.toLowerCase().includes(q) || o.side.includes(q)
    );
  }, [query, orders]);

  const filteredTransactions = useMemo(() => {
    if (!query) return transactions.slice(0, 2);
    const q = query.toLowerCase();
    return transactions.filter(
      (t) => t.id.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.reference.toLowerCase().includes(q)
    );
  }, [query, transactions]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    setIsSearchOpen(false);
  };

  const handleSelectOrder = () => {
    setCurrentView('orders');
    setIsSearchOpen(false);
  };

  const handleSelectTransaction = (txn: typeof transactions[0]) => {
    setIsSearchOpen(false);
    openTransactionDetail(txn);
  };

  return (
    <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} maxWidth="lg">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-[#78716C]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, orders, ledger, IDs..."
            className="w-full pl-11 pr-4 py-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] text-[16px] text-[#171717] focus:outline-[#6A2E62] focus:bg-white transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F5F4] rounded-[10px]">
          {(['all', 'products', 'orders', 'transactions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-[7px] text-[12px] font-semibold capitalize transition-all ${
                filter === tab ? 'bg-white text-[#6A2E62] shadow-xs' : 'text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-1">
          {/* Products Section */}
          {(filter === 'all' || filter === 'products') && (
            <div>
              <div className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider mb-2 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#6A2E62]" />
                <span>Tradable Products ({filteredProducts.length})</span>
              </div>
              <div className="space-y-1">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="p-2.5 hover:bg-[#FAF4F9] rounded-[10px] cursor-pointer border border-transparent hover:border-[#ECD6E9] transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] text-[#171717] group-hover:text-[#6A2E62]">
                          {p.name}
                        </span>
                        <span className="text-[12px] text-[#8A8A8A] font-mono">{p.id}</span>
                      </div>
                      <span className="text-[11px] text-[#78716C]">{p.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[14px] font-bold text-[#171717] tabular-nums block">
                        {formatINR(p.currentValue)}
                      </span>
                      <span
                        className={`text-[12px] font-semibold tabular-nums ${
                          p.changePercent >= 0 ? 'text-[#16803C]' : 'text-[#C62828]'
                        }`}
                      >
                        {p.changePercent >= 0 ? '+' : ''}
                        {p.changePercent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Section */}
          {(filter === 'all' || filter === 'orders') && filteredOrders.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider mb-2 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-[#6A2E62]" />
                <span>Orders ({filteredOrders.length})</span>
              </div>
              <div className="space-y-1">
                {filteredOrders.map((o) => (
                  <div
                    key={o.id}
                    onClick={handleSelectOrder}
                    className="p-2.5 hover:bg-[#F5F5F4] rounded-[10px] cursor-pointer border border-[#E7E5E4] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                          o.side === 'buy' ? 'bg-[#16803C]' : 'bg-[#C62828]'
                        }`}
                      >
                        {o.side === 'buy' ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="font-bold text-[13px] text-[#171717] block">
                          {o.side.toUpperCase()} {o.quantity} {o.productName}
                        </span>
                        <span className="text-[11px] text-[#8A8A8A] font-mono">{o.id} · {o.createdAt}</span>
                      </div>
                    </div>
                    <span className="text-[13px] font-bold text-[#171717] tabular-nums">
                      {formatINR(o.totalValue)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transactions Section */}
          {(filter === 'all' || filter === 'transactions') && filteredTransactions.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider mb-2 flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5 text-[#6A2E62]" />
                <span>Ledger Entries ({filteredTransactions.length})</span>
              </div>
              <div className="space-y-1">
                {filteredTransactions.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleSelectTransaction(t)}
                    className="p-2.5 hover:bg-[#F5F5F4] rounded-[10px] cursor-pointer border border-[#E7E5E4] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-[13px] text-[#171717] block">{t.description}</span>
                      <span className="text-[11px] text-[#8A8A8A] font-mono">{t.id} · {t.date}</span>
                    </div>
                    <span
                      className={`text-[13px] font-bold tabular-nums ${
                        t.amount >= 0 ? 'text-[#16803C]' : 'text-[#171717]'
                      }`}
                    >
                      {t.amount >= 0 ? '+' : ''}
                      {formatINR(t.amount, { decimals: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
