import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import {
  Mail,
  Send,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Props {
  page: 'about' | 'faq' | 'contact' | 'privacy' | 'terms';
}

export const AboutAndLegalPages: React.FC<Props> = ({ page }) => {
  const { setCurrentView, showToast } = useTrading();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactReason, setContactReason] = useState('Marketplace inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'Inquiry Sent',
      'Thank you for reaching out. A product specialist will contact you shortly.',
      'success'
    );
  };

  if (page === 'contact') {
    return (
      <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
              <span className="size-1.5 rounded-full bg-[#F0B90B]" />
              Get in Touch
            </div>
            <h1 className="text-[34px] sm:text-[46px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.1]">
              Talk to our product team.
            </h1>
            <p className="text-[15px] sm:text-[17px] text-[#848E9C]">
              Have questions regarding market listings, order matching mechanics, or commercial platform deployment? We'd love to connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 sm:p-7 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#102A22] border border-[#0ECB81]/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#0ECB81]" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#F5F5F5]">Message Received</h3>
                  <p className="text-xs text-[#848E9C] max-w-md mx-auto">
                    Your inquiry has been received by our product operations team. We typically respond within one business day.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#848E9C] mb-1">
                      Your full name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Mehta"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#111418] border border-[#2B3139] rounded-[6px] text-xs text-[#F5F5F5] focus:outline-[#F0B90B] focus:border-[#F0B90B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#848E9C] mb-1">
                        Work email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-[#111418] border border-[#2B3139] rounded-[6px] text-xs text-[#F5F5F5] focus:outline-[#F0B90B] focus:border-[#F0B90B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#848E9C] mb-1">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-[#111418] border border-[#2B3139] rounded-[6px] text-xs text-[#F5F5F5] focus:outline-[#F0B90B] focus:border-[#F0B90B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#848E9C] mb-1">
                      Reason for inquiry
                    </label>
                    <select
                      value={contactReason}
                      onChange={(e) => setContactReason(e.target.value)}
                      className="w-full px-3 py-2 bg-[#111418] border border-[#2B3139] rounded-[6px] text-xs text-[#F5F5F5] focus:outline-[#F0B90B] cursor-pointer"
                    >
                      <option value="Marketplace inquiry">Marketplace inquiry</option>
                      <option value="Product listing request">Product listing request</option>
                      <option value="Institutional integration">Institutional integration</option>
                      <option value="General support">General support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#848E9C] mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Share details about your requirements..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-[#111418] border border-[#2B3139] rounded-[6px] text-xs text-[#F5F5F5] focus:outline-[#F0B90B] focus:border-[#F0B90B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#F0B90B] hover:bg-[#F8D12F] text-[#181A20] font-bold text-xs rounded-[6px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            <div className="md:col-span-5 space-y-4">
              <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 space-y-4">
                <h3 className="text-[16px] font-bold text-[#F5F5F5]">Direct Contacts</h3>
                <div className="space-y-3 text-xs text-[#848E9C]">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#F0B90B]" />
                    <span>team@tradeon.exchange</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#F0B90B]" />
                    <span>+91 (080) 4129-8800</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#F0B90B]" />
                    <span>Bengaluru, Karnataka, India</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 text-xs text-[#848E9C] space-y-2">
                <h4 className="font-bold text-[14px] text-[#F5F5F5]">Platform Status</h4>
                <p className="leading-relaxed">
                  Active pre-advance prototype preview. All product models and trading metrics shown are for illustrative verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'about') {
    return (
      <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
              <span className="size-1.5 rounded-full bg-[#F0B90B]" />
              Design Philosophy
            </div>
            <h1 className="text-[34px] sm:text-[48px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.1]">
              Why Tradeon exists.
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
              We started with a simple belief: trading software shouldn't require users to decode cryptic jargon or manage five screens to understand one transaction.
            </p>
          </div>

          <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 sm:p-8 space-y-6 text-[14px] text-[#848E9C] leading-relaxed">
            <div className="space-y-2">
              <h2 className="text-[18px] font-bold text-[#F5F5F5]">
                A neutral foundation for real business products
              </h2>
              <p>
                Most marketplace architectures either force physical assets into ill-fitting crypto tokens or burden simple products with public stock exchange bureaucracy. Tradeon introduces a clean, neutral asset abstraction: products have transparent values, verified available units, and automated double-entry ledger settlements without unnecessary baggage.
              </p>
            </div>

            <div className="space-y-2 pt-6 border-t border-[#2B3139]">
              <h2 className="text-[18px] font-bold text-[#F5F5F5]">
                High information density with visual restraint
              </h2>
              <p>
                We built Tradeon around a professional dark trading environment inspired by leading global financial platforms. With high-contrast semantic indicators (#0ECB81 for gains, #F6465D for losses, #F0B90B for brand emphasis) and League Spartan typography with tabular numerals, data is immediately scan-ready and actionable.
              </p>
            </div>

            <div className="space-y-2 pt-6 border-t border-[#2B3139]">
              <h2 className="text-[18px] font-bold text-[#F5F5F5]">
                True multi-platform parity
              </h2>
              <p>
                Mobile is where modern trading happens. We built Tradeon to treat Apple iOS (with Dynamic Island live activity awareness) and Google Android as primary canvas environments alongside our 1440px desktop baseline.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Legal Pages (terms or privacy)
  const isTerms = page === 'terms';
  return (
    <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Legal Documentation
          </div>
          <h1 className="text-[34px] sm:text-[46px] font-extrabold text-[#F5F5F5] tracking-tight mt-2">
            {isTerms ? 'Terms of Service' : 'Privacy & Data Protection Policy'}
          </h1>
          <p className="mt-2 text-xs text-[#848E9C]">
            Version 1.0 · Prototype Release · Updated October 2026
          </p>
        </div>

        <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 sm:p-8 space-y-6 text-[14px] text-[#848E9C] leading-relaxed">
          <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[8px] text-xs text-[#B7BDC6]">
            <strong className="text-[#F0B90B]">Prototype Notice:</strong> This document represents standard operating language for the Tradeon software preview. Final terms and disclosures will be adapted to reflect confirmed operating models and statutory guidelines upon commercial launch.
          </div>

          <section className="space-y-2">
            <h3 className="text-[16px] font-bold text-[#F5F5F5]">1. Platform Scope & Purpose</h3>
            <p>
              Tradeon operates as a digital product trading and transaction settlement platform. The platform does not deal in stocks, cryptocurrencies, gold, silver, or public equities. All listed products are supplied and managed directly by the platform operator.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-[16px] font-bold text-[#F5F5F5]">2. Financial Ledger & Settlement</h3>
            <p>
              All internal wallet transactions, debits, credits, and option contract premiums are tracked via a double-entry ledger. Users agree that all balances reflected on the platform are subject to standard payment gateway verification and banking settlement windows.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-[16px] font-bold text-[#F5F5F5]">3. Data Security & Storage</h3>
            <p>
              Personal identifiable information, phone numbers, and payment credentials are encrypted using industry-standard protocols. Financial records are retained strictly in compliance with applicable accounting and statutory retention guidelines.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
