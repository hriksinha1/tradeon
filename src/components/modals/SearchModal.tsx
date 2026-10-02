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
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#707A8A]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search coin, token, pair, order ID or transaction..."
            className="w-full h-11 pl-10 pr-4 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[6px] text-[15px] text-[#181A20] placeholder-[#707A8A] focus:border-[#F0B90B] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#F5F6F8] rounded-[6px] border border-[#EAECEF]">
          {(['all', 'products', 'orders', 'transactions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-[4px] text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === tab ? 'bg-white text-[#181A20] font-bold shadow-xs border border-[#DFE2E6]' : 'text-[#707A8A] hover:text-[#181A20]'
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
              <div className="text-[11px] font-bold text-[#707A8A] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                <Compass className="w-3.5 h-3.5 text-[#B78103]" />
                <span>Markets & Contracts ({filteredProducts.length})</span>
              </div>
              <div className="space-y-1">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="p-2.5 hover:bg-[#F5F6F8] rounded-[6px] cursor-pointer border border-transparent hover:border-[#DFE2E6] transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] text-[#181A20] group-hover:text-[#B78103]">
                          {p.name}
                        </span>
                        <span className="text-xs text-[#707A8A] font-mono">{p.id}</span>
                      </div>
                      <span className="text-[11px] text-[#707A8A]">{p.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[14px] font-bold text-[#181A20] tabular-nums font-mono block">
                        {formatINR(p.currentValue)}
                      </span>
                      <span
                        className={`text-xs font-semibold tabular-nums font-mono ${
                          p.changePercent >= 0 ? 'text-[#02A063]' : 'text-[#CF304A]'
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
              <div className="text-[11px] font-bold text-[#707A8A] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                <FileCheck className="w-3.5 h-3.5 text-[#B78103]" />
                <span>Recent Orders ({filteredOrders.length})</span>
              </div>
              <div className="space-y-1">
                {filteredOrders.map((o) => (
                  <div
                    key={o.id}
                    onClick={handleSelectOrder}
                    className="p-2.5 hover:bg-[#F5F6F8] rounded-[6px] cursor-pointer border border-transparent hover:border-[#DFE2E6] transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold font-mono uppercase px-1.5 py-0.5 rounded-[3px] ${
                            o.side === 'buy' ? 'bg-[#EBFBF3] text-[#02A063]' : 'bg-[#FDF0F2] text-[#CF304A]'
                          }`}
                        >
                          {o.side}
                        </span>
                        <span className="font-bold text-[13px] text-[#181A20]">{o.productName}</span>
                      </div>
                      <span className="text-[11px] text-[#707A8A] font-mono">{o.id}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-mono font-bold text-[#181A20] block">
                        {formatINR(o.totalValue)}
                      </span>
                      <span className="text-[11px] text-[#707A8A] font-mono">{o.quantity} units</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transactions Section */}
          {(filter === 'all' || filter === 'transactions') && filteredTransactions.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-[#707A8A] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                <Receipt className="w-3.5 h-3.5 text-[#B78103]" />
                <span>Ledger Entries ({filteredTransactions.length})</span>
              </div>
              <div className="space-y-1">
                {filteredTransactions.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleSelectTransaction(t)}
                    className="p-2.5 hover:bg-[#F5F6F8] rounded-[6px] cursor-pointer border border-transparent hover:border-[#DFE2E6] transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#181A20]">{t.reference}</span>
                        <span className="text-xs text-[#707A8A]">{t.description}</span>
                      </div>
                      <span className="text-[11px] text-[#707A8A] font-mono">{t.date}</span>
                    </div>
                    <span
                      className={`text-[13px] font-mono font-bold ${
                        t.amount >= 0 ? 'text-[#02A063]' : 'text-[#CF304A]'
                      }`}
                    >
                      {t.amount >= 0 ? `+${formatINR(t.amount)}` : `-${formatINR(Math.abs(t.amount))}`}
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
