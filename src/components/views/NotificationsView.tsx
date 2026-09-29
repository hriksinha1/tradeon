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
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#171717] tracking-tight">Notification Center</h1>
          <p className="text-[14px] text-[#6B6B6B] mt-0.5">
            Real-time execution alerts, ledger settlement receipts, and account security notifications.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={markAllNotificationsRead} className="flex items-center gap-1.5">
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </Button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E7E5E4] rounded-[10px] overflow-x-auto shadow-2xs">
        {(['all', 'orders', 'payments', 'portfolio', 'security'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-[8px] text-[12px] font-semibold capitalize transition-all whitespace-nowrap ${
              filter === tab ? 'bg-[#1FC777] text-[#0C0F0C] font-bold shadow-2xs' : 'text-[#6B6B6B] hover:text-[#171717]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-[#E7E5E4] rounded-[18px] shadow-xs divide-y divide-[#E7E5E4] overflow-hidden">
        {filtered.map((item) => {
          const icon = {
            orders: <FileCheck className="w-5 h-5 text-[#16803C]" />,
            payments: <CreditCard className="w-5 h-5 text-[#087A4A]" />,
            portfolio: <PieChart className="w-5 h-5 text-[#1D4ED8]" />,
            security: <ShieldCheck className="w-5 h-5 text-[#B7791F]" />,
            system: <Info className="w-5 h-5 text-[#78716C]" />,
          }[item.category];

          return (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-4 sm:p-5 flex items-start gap-4 cursor-pointer transition-colors ${
                !item.read ? 'bg-[#E9FAF1]/60' : 'hover:bg-[#FAFAF9]'
              }`}
            >
              <div className="p-2 bg-white border border-[#E7E5E4] rounded-[10px] shrink-0 mt-0.5">
                {icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[15px] font-bold text-[#171717]">{item.title}</h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#1FC777]" />
                    )}
                  </div>
                  <span className="text-[12px] text-[#78716C] shrink-0">{item.timestamp}</span>
                </div>
                <p className="text-[13px] text-[#6B6B6B] mt-1 leading-relaxed">{item.message}</p>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-[#78716C]">
            <p className="text-[14px]">No notifications found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
