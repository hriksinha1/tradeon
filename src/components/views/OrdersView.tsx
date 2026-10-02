import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2, XCircle, Search, Filter, Trash2 } from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, cancelOrder, setCurrentView, setSelectedProductId } = useTrading();
  const [mainTab, setMainTab] = useState<'open' | 'history' | 'trades'>('history');
  const [sideFilter, setSideFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [query, setQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    // Tab condition
    if (mainTab === 'open' && o.status !== 'open' && o.status !== 'pending') return false;
    if (mainTab === 'history' && o.status === 'open') return false;

    // Side condition
    if (sideFilter !== 'all' && o.side !== sideFilter) return false;

    // Query condition
    if (query) {
      const q = query.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q) ||
        o.productId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-5 space-y-4 select-none bg-white text-[#181A20]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#EAECEF]">
        <div>
          <h1 className="text-[22px] font-bold text-[#181A20] tracking-tight">Order Management</h1>
          <p className="text-[12px] text-[#707A8A]">
            Live execution status, filled trades, and active limit triggers.
          </p>
        </div>

        {/* Primary Tabs */}
        <div className="flex items-center gap-1 bg-[#F5F6F8] p-1 border border-[#DFE2E6] rounded-[6px]">
          <button
            onClick={() => setMainTab('history')}
            className={`px-3 py-1 rounded-[4px] text-[12px] font-semibold transition-all cursor-pointer ${
              mainTab === 'history' ? 'bg-white text-[#181A20] font-bold border border-[#DFE2E6] shadow-xs' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            Order History ({orders.filter((o) => o.status !== 'open').length})
          </button>
          <button
            onClick={() => setMainTab('open')}
            className={`px-3 py-1 rounded-[4px] text-[12px] font-semibold transition-all cursor-pointer ${
              mainTab === 'open' ? 'bg-white text-[#181A20] font-bold border border-[#DFE2E6] shadow-xs' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            Open Orders ({orders.filter((o) => o.status === 'open').length})
          </button>
          <button
            onClick={() => setMainTab('trades')}
            className={`px-3 py-1 rounded-[4px] text-[12px] font-semibold transition-all cursor-pointer ${
              mainTab === 'trades' ? 'bg-white text-[#181A20] font-bold border border-[#DFE2E6] shadow-xs' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            Trade Executions
          </button>
        </div>
      </div>

      {/* Filter Row: Search & Side filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-[#DFE2E6] rounded-[6px] shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#707A8A]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by Order ID or Asset..."
            className="w-full h-8 pl-8 pr-3 rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] text-[#181A20] text-[12px] placeholder-[#707A8A] focus:border-[#F0B90B] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 text-[12px]">
          <span className="text-[#707A8A] mr-1">Side:</span>
          {(['all', 'buy', 'sell'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSideFilter(s)}
              className={`px-2.5 py-0.5 rounded-[3px] font-semibold uppercase text-[11px] transition-colors cursor-pointer ${
                sideFilter === s
                  ? 'bg-[#F5F6F8] text-[#181A20] font-bold border border-[#DFE2E6]'
                  : 'text-[#707A8A] hover:text-[#181A20]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Professional Orders Table */}
      <div className="hidden md:block bg-white border border-[#DFE2E6] rounded-[6px] overflow-hidden shadow-xs">
        <table className="w-full text-left text-[13px] tabular-nums font-mono">
          <thead className="bg-[#F5F6F8] border-b border-[#DFE2E6] text-[#707A8A] text-[11px] font-semibold uppercase font-sans">
            <tr>
              <th className="py-2.5 px-3">Order ID & Time</th>
              <th className="py-2.5 px-3">Asset / Contract</th>
              <th className="py-2.5 px-3">Side</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Quantity</th>
              <th className="py-2.5 px-3">Price</th>
              <th className="py-2.5 px-3">Total Notional</th>
              <th className="py-2.5 px-3">Exchange Fee</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right font-sans">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECEF]">
            {filteredOrders.map((order) => {
              const isBuy = order.side === 'buy';
              const isCompleted = order.status === 'completed';
              const isOpen = order.status === 'open' || order.status === 'pending';

              return (
                <tr key={order.id} className="hover:bg-[#F5F6F8] transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-[12px] text-[#946800] block">
                      {order.id}
                    </span>
                    <span className="text-[11px] text-[#707A8A] font-sans">{order.createdAt}</span>
                  </td>

                  <td className="py-3 px-3">
                    <button
                      onClick={() => {
                        setSelectedProductId(order.productId);
                        setCurrentView('app-product-detail');
                      }}
                      className="font-bold text-[13px] text-[#181A20] hover:text-[#946800] block text-left cursor-pointer font-sans"
                    >
                      {order.productName}
                    </button>
                    <span className="text-[11px] text-[#707A8A] font-mono">{order.productId}</span>
                  </td>

                  <td className="py-3 px-3 font-sans">
                    <span
                      className={`inline-flex items-center gap-1 font-bold uppercase text-[12px] ${
                        isBuy ? 'text-[#02A063]' : 'text-[#CF304A]'
                      }`}
                    >
                      {isBuy ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                      <span>{order.side}</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 font-semibold text-[#707A8A] uppercase text-[11px] font-sans">
                    {order.type}
                  </td>

                  <td className="py-3 px-3 font-semibold text-[#181A20]">
                    {order.quantity} units
                  </td>

                  <td className="py-3 px-3 font-semibold text-[#181A20]">
                    {formatINR(order.price)}
                  </td>

                  <td className="py-3 px-3 font-bold text-[#181A20]">
                    {formatINR(order.totalValue)}
                  </td>

                  <td className="py-3 px-3 text-[#707A8A]">
                    {formatINR(order.fee, { decimals: 2 })}
                  </td>

                  <td className="py-3 px-3 font-sans">
                    <Badge
                      status={isCompleted ? 'positive' : isOpen ? 'warning' : 'neutral'}
                      label={order.status.toUpperCase()}
                      dot
                    />
                  </td>

                  <td className="py-3 px-3 text-right font-sans">
                    {isOpen ? (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#CF304A] hover:bg-[#FDF0F2] border border-[#CF304A]/30 rounded-[4px] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedProductId(order.productId);
                          setCurrentView('app-product-detail');
                        }}
                        className="text-[#707A8A] hover:text-[#181A20] text-[12px] font-semibold hover:underline cursor-pointer"
                      >
                        Trade Again
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Orders List (Compact Cards) */}
      <div className="md:hidden space-y-2.5">
        {filteredOrders.map((order) => {
          const isBuy = order.side === 'buy';
          const isOpen = order.status === 'open' || order.status === 'pending';

          return (
            <div
              key={order.id}
              className="p-3 bg-white border border-[#DFE2E6] rounded-[6px] space-y-2 tabular-nums shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold text-[12px] uppercase px-1.5 py-0.5 rounded ${
                      isBuy ? 'bg-[#EBFBF3] text-[#02A063] border border-[#02A063]/30' : 'bg-[#FDF0F2] text-[#CF304A] border border-[#CF304A]/30'
                    }`}
                  >
                    {order.side}
                  </span>
                  <span className="font-bold text-[14px] text-[#181A20]">{order.productName}</span>
                </div>
                <Badge
                  status={order.status === 'completed' ? 'positive' : isOpen ? 'warning' : 'neutral'}
                  label={order.status.toUpperCase()}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[12px] py-1 border-y border-[#EAECEF] text-[#707A8A]">
                <div>Quantity: <strong className="text-[#181A20] font-mono">{order.quantity} units</strong></div>
                <div>Price: <strong className="text-[#181A20] font-mono">{formatINR(order.price)}</strong></div>
                <div>Total: <strong className="text-[#946800] font-mono">{formatINR(order.totalValue)}</strong></div>
                <div>ID: <strong className="text-[#181A20] font-mono">{order.id}</strong></div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#707A8A]">
                <span>{order.createdAt}</span>
                {isOpen && (
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => cancelOrder(order.id)}
                    className="text-[#CF304A] border-[#CF304A]/40 cursor-pointer"
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="p-10 text-center bg-white border border-[#DFE2E6] rounded-[6px] text-[#707A8A] text-[13px] shadow-xs">
          No orders found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default OrdersView;
