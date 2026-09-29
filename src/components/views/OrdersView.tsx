import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { formatINR } from '../../constants/designTokens';
import { Badge } from '../common/Badge';
import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, cancelOrder, setCurrentView, setSelectedProductId } = useTrading();
  const [filter, setFilter] = useState<'all' | 'open' | 'completed' | 'cancelled'>('all');

  const filteredOrders = orders.filter((o) => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Order Management</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-0.5">
            Audit trail of market orders, limit triggers, execution confirmations, and cancellations.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#E7E5E4] rounded-[10px] shadow-2xs">
          {(['all', 'open', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-[7px] text-[12px] font-semibold capitalize transition-all ${
                filter === tab ? 'bg-[#1FC777] text-[#0C0F0C] font-bold shadow-2xs' : 'text-[#6B6B6B] hover:text-[#171717]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#FAFAF9] border-b border-[#E7E5E4] text-[#78716C] font-bold text-[12px]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Product Instrument</th>
                <th className="py-3 px-4">Side</th>
                <th className="py-3 px-4">Order Type</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Total Order Value</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4]">
              {filteredOrders.map((order) => {
                const isBuy = order.side === 'buy';
                return (
                  <tr key={order.id} className="hover:bg-[#E9FAF1]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-[13px] text-[#171717] block">
                        {order.id}
                      </span>
                      <span className="text-[11px] text-[#78716C]">{order.createdAt}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => {
                          setSelectedProductId(order.productId);
                          setCurrentView('product-detail');
                        }}
                        className="font-bold text-[14px] text-[#171717] hover:text-[#087A4A] block text-left"
                      >
                        {order.productName}
                      </button>
                      <span className="text-[11px] text-[#78716C] font-mono">{order.productId}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-bold uppercase text-[12px] ${
                          isBuy ? 'text-[#16803C]' : 'text-[#C62828]'
                        }`}
                      >
                        {isBuy ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                        <span>{order.side}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#57534E] uppercase text-[12px]">
                      {order.type}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#171717] tabular-nums">
                      {order.quantity} units
                    </td>

                    <td className="py-3.5 px-4 tabular-nums text-[#57534E]">
                      {formatINR(order.price)}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#171717] tabular-nums">
                      {formatINR(order.totalValue)}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        status={
                          order.status === 'completed'
                            ? 'positive'
                            : order.status === 'open'
                            ? 'warning'
                            : order.status === 'pending'
                            ? 'info'
                            : 'neutral'
                        }
                        label={order.status.toUpperCase()}
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {order.status === 'open' ? (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#C62828] bg-[#FEF2F2] border border-[#FECDCA] rounded-[6px] hover:bg-[#FEE4E2] transition-colors"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-[11px] text-[#A8A29E]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-12 text-center text-[#78716C]">
            <p className="text-[14px]">No {filter !== 'all' ? filter : ''} orders recorded.</p>
          </div>
        )}
      </div>
    </div>
  );
};
