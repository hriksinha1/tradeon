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
      <div className="bg-[#F7F6F2] min-h-screen py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
              Get in Touch
            </div>
            <h1 className="text-[38px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight leading-[1.1]">
              Talk to our product team.
            </h1>
            <p className="text-[17px] text-[#5A5A53]">
              Have questions regarding market listings, order matching mechanics, or commercial platform deployment? We'd love to connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#E9FAF1] text-[#087A4A] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#12A560]" />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#171A17]">Message Received</h3>
                  <p className="text-[14px] text-[#5A5A53] max-w-md mx-auto">
                    Your inquiry has been received by our product operations team. We typically respond within one business day.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#171A17] mb-1">
                      Your full name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Mehta"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[14px] text-[#171A17] focus:outline-[#087A4A] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#171A17] mb-1">
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[14px] text-[#171A17] focus:outline-[#087A4A] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#171A17] mb-1">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 (optional)"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[14px] text-[#171A17] focus:outline-[#087A4A] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#171A17] mb-1">
                      Reason for contacting
                    </label>
                    <select
                      value={contactReason}
                      onChange={(e) => setContactReason(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[14px] text-[#171A17] focus:outline-[#087A4A] focus:bg-white"
                    >
                      <option value="Marketplace inquiry">Marketplace inquiry</option>
                      <option value="Product listing partnership">Product listing partnership</option>
                      <option value="Technical architecture">Technical architecture</option>
                      <option value="Other question">Other question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#171A17] mb-1">
                      How can we help?
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share a brief overview of your inquiry or requirements..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[14px] text-[#171A17] focus:outline-[#087A4A] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1FC777] hover:bg-[#18B36A] text-[#0C0F0C] font-bold text-[14px] rounded-[10px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send inquiry</span>
                  </button>
                </form>
              )}
            </div>

            <div className="md:col-span-5 space-y-4">
              <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs space-y-4">
                <h3 className="text-[17px] font-bold text-[#171A17]">Direct Contacts</h3>
                <div className="space-y-3 text-xs text-[#5A5A53]">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#087A4A]" />
                    <span>team@tradeon.exchange</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#087A4A]" />
                    <span>+91 (080) 4129-8800</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#087A4A]" />
                    <span>Bengaluru, Karnataka, India</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#CBCAC2] rounded-[20px] p-6 text-xs text-[#5A5A53] space-y-2">
                <h4 className="font-bold text-[14px] text-[#171A17]">Platform Status</h4>
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
      <div className="bg-[#F7F6F2] min-h-screen py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
              Design Philosophy
            </div>
            <h1 className="text-[38px] sm:text-[50px] font-extrabold text-[#171A17] tracking-tight leading-[1.1]">
              Why Tradeon exists.
            </h1>
            <p className="text-[18px] text-[#5A5A53] leading-relaxed">
              We started with a simple belief: trading software shouldn't require users to decode cryptic jargon or manage five screens to understand one transaction.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] p-8 sm:p-10 shadow-xs space-y-8 text-[15px] text-[#5A5A53] leading-relaxed">
            <div className="space-y-3">
              <h2 className="text-[22px] font-bold text-[#171A17]">
                A neutral foundation for real business products
              </h2>
              <p>
                Most marketplace architectures either force physical assets into ill-fitting crypto tokens or burden simple products with public stock exchange bureaucracy. Tradeon introduces a clean, neutral asset abstraction: products have transparent values, verified available units, and automated double-entry ledger settlements without unnecessary baggage.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#EFEEE9]">
              <h2 className="text-[22px] font-bold text-[#171A17]">
                Calm complexity over sensory overload
              </h2>
              <p>
                Green and red numbers flashing every half-second may look dramatic in movies, but it creates cognitive fatigue in real life. We designed Tradeon using a calming Meadow Green palette and warm neutrals, ensuring that data is legible, decisions feel deliberate, and records remain clear months later.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#EFEEE9]">
              <h2 className="text-[22px] font-bold text-[#171A17]">
                True multi-platform parity
              </h2>
              <p>
                Mobile is where modern trading happens. We built Tradeon to treat Apple iOS 18 (with Dynamic Island live activity awareness) and Google Android 15 as primary canvas environments alongside our 1440px desktop baseline.
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
    <div className="bg-[#F7F6F2] min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div>
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Legal Documentation
          </div>
          <h1 className="text-[38px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight mt-2">
            {isTerms ? 'Terms of Service' : 'Privacy & Data Protection Policy'}
          </h1>
          <p className="mt-2 text-xs text-[#6B6B63]">
            Version 1.0 · Prototype Release · Updated September 2026
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] p-8 sm:p-10 shadow-xs space-y-6 text-[14px] text-[#5A5A53] leading-relaxed">
          <div className="p-4 bg-[#F7F6F2] border border-[#E2E1DA] rounded-[12px] text-xs text-[#171A17]">
            <strong>Prototype Notice:</strong> This document represents standard operating language for the Tradeon software preview. Final terms and disclosures will be adapted to reflect the client’s confirmed operating model and applicable statutory guidelines upon commercial launch.
          </div>

          <section className="space-y-2">
            <h3 className="text-[17px] font-bold text-[#171A17]">1. Platform Scope & Purpose</h3>
            <p>
              Tradeon operates as a digital product trading and transaction settlement platform. The platform does not deal in stocks, cryptocurrencies, gold, silver, or public equities. All listed products are supplied and managed directly by the platform operator.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-[17px] font-bold text-[#171A17]">2. Financial Ledger & Settlement</h3>
            <p>
              All internal wallet transactions, debits, credits, and option contract premiums are tracked via a double-entry ledger. Users agree that all balances reflected on the platform are subject to standard payment gateway verification and banking settlement windows.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-[17px] font-bold text-[#171A17]">3. Data Security & Storage</h3>
            <p>
              Personal identifiable information, phone numbers, and payment credentials are encrypted using industry-standard protocols. Financial records are retained strictly in compliance with applicable accounting and statutory retention guidelines.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
