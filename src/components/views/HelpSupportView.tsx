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
      snippet: 'Market orders execute immediately against the best available book depth. Limit orders remain open until the target valuation is matched.',
    },
    {
      cat: 'Payments & Deposits',
      title: 'What are the withdrawal processing turnaround times?',
      snippet: 'Standard IMPS withdrawals settle within 2 business hours. NEFT batch clearing operates during official banking windows.',
    },
    {
      cat: 'Ledger & Audit',
      title: 'How can I reconcile my tax statement?',
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-5 select-none bg-white text-[#181A20]">
      {/* Header & Search */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-[24px] font-bold text-[#181A20] tracking-tight">Help & Knowledge Base</h1>
        <p className="text-[13px] text-[#707A8A]">
          Browse guides on trading terminal execution, deposit rails, and double-entry accounting.
        </p>
        <div className="relative mt-3">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#707A8A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs, trading guides, settlement rules..."
            className="w-full h-10 pl-9 pr-4 rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] text-[#181A20] text-[13px] placeholder-[#707A8A] focus:border-[#F0B90B] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1 rounded-[4px] text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedCat === cat
                ? 'bg-[#F5F6F8] text-[#181A20] font-bold border border-[#DFE2E6]'
                : 'bg-white border border-[#DFE2E6] text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border border-[#DFE2E6] hover:border-[#CFD3D8] rounded-[6px] space-y-1.5 transition-colors shadow-xs"
          >
            <span className="text-[10px] font-bold uppercase text-[#946800] tracking-wider block">
              {item.cat}
            </span>
            <h3 className="text-[14px] font-bold text-[#181A20]">{item.title}</h3>
            <p className="text-[12px] text-[#707A8A] leading-relaxed">{item.snippet}</p>
          </div>
        ))}
      </div>

      {/* Contact Support Ticket Form */}
      <div className="bg-white border border-[#DFE2E6] rounded-[6px] p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#B78103]" />
          <h3 className="text-[15px] font-bold text-[#181A20]">Open a Direct Support Ticket</h3>
        </div>

        {submitted ? (
          <div className="p-4 bg-[#EBFBF3] border border-[#02A063]/30 rounded-[4px] text-center text-[#02A063] space-y-1">
            <CheckCircle2 className="w-5 h-5 mx-auto" />
            <h4 className="font-bold text-[14px]">Ticket #TKT-4921 Logged</h4>
            <p className="text-[12px] text-[#474D57]">A designated market officer will reply within 45 minutes.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitTicket} className="space-y-3 text-[12px]">
            <div>
              <label className="block font-medium text-[#707A8A] mb-1">Issue Subject</label>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g., Question about Atlas Contract settlement"
                className="w-full h-9 px-3 rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] text-[#181A20] focus:border-[#F0B90B] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-[#707A8A] mb-1">Details</label>
              <textarea
                required
                rows={3}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Describe your inquiry with references or order IDs..."
                className="w-full p-3 rounded-[4px] bg-[#F5F6F8] border border-[#DFE2E6] text-[#181A20] focus:border-[#F0B90B] focus:bg-white focus:outline-none"
              />
            </div>
            <Button type="submit" variant="primary" size="sm" className="font-bold cursor-pointer">
              Submit Inquiry
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HelpSupportView;
