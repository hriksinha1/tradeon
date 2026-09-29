import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import { Search, HelpCircle, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const HelpSupportView: React.FC = () => {
  const { showToast } = useTrading();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = ['All', 'Trading & Orders', 'Payments & Deposits', 'Ledger & Audit', 'Security'];

  const articles = [
    {
      cat: 'Trading & Orders',
      title: 'How are buy and sell prices matched?',
      snippet: 'Market orders execute immediately against the best available listing price. Limit orders remain open until the target valuation is matched.',
    },
    {
      cat: 'Payments & Deposits',
      title: 'What are the withdrawal processing turnaround times?',
      snippet: 'Standard IMPS withdrawals settle within 2 business hours. NEFT batch clearing operates during official banking windows.',
    },
    {
      cat: 'Ledger & Audit',
      title: 'How can I reconcile my monthly tax statement?',
      snippet: 'You can export complete double-entry CSV logs anytime from the Ledger tab, complete with transaction IDs and timestamped balances.',
    },
    {
      cat: 'Security',
      title: 'How does two-factor authentication protect my orders?',
      snippet: 'Enabling 2FA adds an encrypted TOTP challenge to logins, large order executions, and withdrawal bank modifications.',
    },
  ];

  const filtered = articles.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.snippet.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || a.cat === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    setSubmitted(true);
    showToast('Support Ticket Created', 'Ticket #TKT-4921 opened. Our desk responds within 1 hour.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Header & Search */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-[28px] font-bold text-[#171717] tracking-tight">Help & Documentation Desk</h1>
        <p className="text-[14px] text-[#6B6B6B]">
          Browse guides on trading mechanics, payment processing, ledger verification, and platform security.
        </p>
        <div className="relative mt-4">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#78716C]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles and FAQs (e.g. withdrawal, order type)..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E7E5E4] rounded-[12px] text-[14px] text-[#171717] focus:outline-[#087A4A] shadow-2xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCat(c)}
            className={`px-3 py-1 rounded-[8px] text-[12px] font-semibold transition-all whitespace-nowrap ${
              selectedCat === c
                ? 'bg-[#1FC777] text-[#0C0F0C] font-bold'
                : 'bg-white border border-[#E7E5E4] text-[#6B6B6B] hover:text-[#171717]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filtered.map((item, idx) => (
          <div key={idx} className="p-4 bg-white border border-[#E7E5E4] rounded-[14px] shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-[#087A4A] uppercase tracking-wider block">
              {item.cat}
            </span>
            <h4 className="text-[15px] font-bold text-[#171717]">{item.title}</h4>
            <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{item.snippet}</p>
          </div>
        ))}
      </div>

      {/* Contact Support Form */}
      <div className="p-6 bg-white border border-[#E7E5E4] rounded-[18px] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#087A4A]" />
          <h3 className="text-[17px] font-bold text-[#171717]">Contact Support Desk</h3>
        </div>

        {submitted ? (
          <div className="p-4 bg-[#ECFDF3] border border-[#A6F4C5] rounded-[12px] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#16803C] mx-auto" />
            <h4 className="text-[16px] font-bold text-[#171717]">Ticket #TKT-4921 Logged</h4>
            <p className="text-[13px] text-[#57534E]">
              Your inquiry has been routed to our trade operations team. You will receive an update at your registered email address.
            </p>
            <Button size="sm" variant="outline" onClick={() => setSubmitted(false)}>
              Send Another Inquiry
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmitTicket} className="space-y-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#78716C] mb-1">Subject</label>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Brief summary of inquiry"
                className="w-full px-3 py-2 border border-[#E7E5E4] rounded-[8px] text-[13px] focus:outline-[#087A4A]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#78716C] mb-1">Inquiry Details</label>
              <textarea
                required
                rows={3}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Provide relevant order ID or transaction reference if applicable..."
                className="w-full px-3 py-2 border border-[#E7E5E4] rounded-[8px] text-[13px] focus:outline-[#087A4A]"
              />
            </div>
            <Button type="submit" size="md" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>Submit Ticket</span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
