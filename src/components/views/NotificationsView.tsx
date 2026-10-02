import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Bell, CheckCheck, FileCheck, CreditCard, ShieldCheck, PieChart, Info } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useTrading();
  const [filter, setFilter] = useState<'all' | 'orders' | 'payments' | 'portfolio' | 'security'>('all');

  const filtered = notifications.filter((n) => filter === 'all' || n.category === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#2B3139]">
        <div>
          <h1 className="text-[22px] font-bold text-[#F5F5F5] tracking-tight">Notification Center</h1>
          <p className="text-[12px] text-[#848E9C]">
            Execution alerts, ledger receipts, and security authorization logs.
          </p>
        </div>

        <Button size="xs" variant="secondary" onClick={markAllNotificationsRead} className="flex items-center gap-1.5 h-8 font-semibold">
          <CheckCheck className="w-3.5 h-3.5 text-[#0ECB81]" />
          <span>Mark All Read</span>
        </Button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#111418] border border-[#2B3139] rounded-[6px] overflow-x-auto">
        {(['all', 'orders', 'payments', 'portfolio', 'security'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1 rounded-[4px] text-[11px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              filter === tab ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]' : 'text-[#848E9C] hover:text-[#F5F5F5]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-[#111418] border border-[#2B3139] rounded-[6px] divide-y divide-[#1E2329] overflow-hidden">
        {filtered.map((item) => {
          const icon = {
            orders: <FileCheck className="w-4 h-4 text-[#0ECB81]" />,
            payments: <CreditCard className="w-4 h-4 text-[#F0B90B]" />,
            portfolio: <PieChart className="w-4 h-4 text-[#4C8FFF]" />,
            security: <ShieldCheck className="w-4 h-4 text-[#F0B90B]" />,
            system: <Info className="w-4 h-4 text-[#848E9C]" />,
          }[item.category];

          return (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-3.5 sm:p-4 flex items-start gap-3.5 cursor-pointer transition-colors ${
                !item.read ? 'bg-[#161A1E]' : 'hover:bg-[#161A1E]'
              }`}
            >
              <div className="p-2 bg-[#1E2329] border border-[#2B3139] rounded-[4px] shrink-0 mt-0.5">
                {icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-bold text-[#F5F5F5]">{item.title}</h4>
                    {!item.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F0B90B]" />
                    )}
                  </div>
                  <span className="text-[11px] text-[#848E9C] shrink-0">{item.timestamp}</span>
                </div>
                <p className="text-[12px] text-[#B7BDC6] mt-1 leading-relaxed">{item.message}</p>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-[#848E9C]">
            <p className="text-[13px]">No notifications found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsView;
