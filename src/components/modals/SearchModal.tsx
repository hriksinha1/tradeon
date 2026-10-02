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
    if (!query) return products.slice(0, 4);
    const q = query.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [query, products]);

  const filteredOrders = useMemo(() => {
    if (!query) return orders.slice(0, 3);
    const q = query.toLowerCase();
    return orders.filter(
      (o) => o.id.toLowerCase().includes(q) || o.productName.toLowerCase().includes(q) || o.side.includes(q)
    );
  }, [query, orders]);

  const filteredTransactions = useMemo(() => {
    if (!query) return transactions.slice(0, 3);
    const q = query.toLowerCase();
    return transactions.filter(
      (t) => t.id.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.reference.toLowerCase().includes(q)
    );
  }, [query, transactions]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('app-product-detail');
    setIsSearchOpen(false);
  };

  const handleSelectOrder = () => {
    setCurrentView('app-orders');
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
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#848E9C]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search coin, token, pair, order ID or transaction..."
            className="w-full h-11 pl-10 pr-4 bg-[#111418] border border-[#363C45] rounded-[6px] text-[15px] text-[#F5F5F5] placeholder-[#848E9C] focus:border-[#F0B90B] focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#111418] rounded-[6px] border border-[#2B3139]">
          {(['all', 'products', 'orders', 'transactions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-[4px] text-[12px] font-semibold capitalize transition-all cursor-pointer ${
                filter === tab ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]' : 'text-[#848E9C] hover:text-[#F5F5F5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results list */}
        <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-1">
          {/* Products Section */}
          {(filter === 'all' || filter === 'products') && (
            <div>
              <div className="text-[11px] font-bold text-[#848E9C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#F0B90B]" />
                <span>Markets & Contracts ({filteredProducts.length})</span>
              </div>
              <div className="space-y-1">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="p-2.5 hover:bg-[#1E2329] rounded-[6px] cursor-pointer border border-transparent hover:border-[#363C45] transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] text-[#F5F5F5] group-hover:text-[#F0B90B]">
                          {p.name}
                        </span>
                        <span className="text-[12px] text-[#848E9C] font-mono">{p.id}</span>
                      </div>
                      <span className="text-[11px] text-[#848E9C]">{p.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[14px] font-bold text-[#F5F5F5] tabular-nums block">
                        {formatINR(p.currentValue)}
                      </span>
                      <span
                        className={`text-[12px] font-semibold tabular-nums ${
                          p.changePercent >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'
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
              <div className="text-[11px] font-bold text-[#848E9C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-[#F0B90B]" />
                <span>Recent Orders ({filteredOrders.length})</span>
              </div>
              <div className="space-y-1">
                {filteredOrders.map((o) => (
                  <div
                    key={o.id}
                    onClick={handleSelectOrder}
                    className="p-2.5 hover:bg-[#1E2329] rounded-[6px] cursor-pointer border border-transparent hover:border-[#363C45] transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center ${
                          o.side === 'buy' ? 'bg-[#102A22] text-[#0ECB81]' : 'bg-[#301820] text-[#F6465D]'
                        }`}
                      >
                        {o.side === 'buy' ? (
                          <ArrowDownLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-[13px] text-[#F5F5F5]">
                          {o.side.toUpperCase()} {o.productName}
                        </div>
                        <span className="text-[11px] text-[#848E9C] font-mono">{o.id}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-bold text-[#F5F5F5] tabular-nums block">
                        {formatINR(o.totalValue)}
                      </span>
                      <span className="text-[11px] text-[#848E9C]">{o.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transactions Section */}
          {(filter === 'all' || filter === 'transactions') && filteredTransactions.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-[#848E9C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-[#F0B90B]" />
                <span>Ledger Entries ({filteredTransactions.length})</span>
              </div>
              <div className="space-y-1">
                {filteredTransactions.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleSelectTransaction(t)}
                    className="p-2.5 hover:bg-[#1E2329] rounded-[6px] cursor-pointer border border-transparent hover:border-[#363C45] transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-[13px] text-[#F5F5F5]">{t.description}</div>
                      <span className="text-[11px] text-[#848E9C] font-mono">{t.reference}</span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[13px] font-bold tabular-nums block ${
                          t.amount >= 0 ? 'text-[#0ECB81]' : 'text-[#F5F5F5]'
                        }`}
                      >
                        {t.amount >= 0 ? '+' : ''}
                        {formatINR(t.amount)}
                      </span>
                      <span className="text-[11px] text-[#848E9C]">{t.date}</span>
                    </div>
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

export default SearchModal;
