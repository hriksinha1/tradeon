import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { Button } from '../common/Button';
import {
  ShieldCheck,
  Mail,
  Send,
  Phone,
  MapPin,
  CheckCircle2,
  HelpCircle,
  FileText,
  Lock,
} from 'lucide-react';

interface Props {
  page: 'about' | 'faq' | 'contact' | 'privacy' | 'terms';
}

export const AboutAndLegalPages: React.FC<Props> = ({ page }) => {
  const { setCurrentView, showToast } = useTrading();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'Message Received',
      'Thank you for contacting Tradeon product operations. We will reply within 4 business hours.',
      'success'
    );
  };

  if (page === 'contact') {
    return (
      <div className="bg-[#F7F6F2] min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
              Get in Touch
            </span>
            <h1 className="text-[36px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight mt-3">
              Contact Product Operations
            </h1>
            <p className="mt-2 text-[16px] text-[#5A5A53]">
              Have questions regarding market listings, enterprise liquidity, or custom matching rules? Reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#E3F6EC] text-[#0A7A45] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#171A17]">Message Dispatched</h3>
                  <p className="text-[14px] text-[#5A5A53] max-w-md mx-auto">
                    Your inquiry has been logged in our institutional support ticketing queue. A product consultant will contact you shortly.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#171A17] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Mehta"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[14px] text-[#171A17] focus:outline-[#087A4A] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#171A17] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[14px] text-[#171A17] focus:outline-[#087A4A] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#171A17] mb-1">
                      Message / Requirement
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your inquiry or platform question..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F7F6F2] border border-[#CBCAC2] rounded-[10px] text-[14px] text-[#171A17] focus:outline-[#087A4A] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1FC777] hover:bg-[#18B36A] text-[#0C0F0C] font-bold text-[14px] rounded-[10px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}
            </div>

            <div className="md:col-span-5 space-y-4">
              <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[20px] p-6 shadow-2xs space-y-4">
                <h3 className="text-[17px] font-bold text-[#171A17]">Direct Contacts</h3>
                <div className="space-y-3 text-[13px] text-[#5A5A53]">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#087A4A]" />
                    <span>operations@tradeon.exchange</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#087A4A]" />
                    <span>+91 (080) 4129-8800</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#087A4A]" />
                    <span>Fintech District, Bengaluru, Karnataka</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#E9FAF1] border border-[#A2E8C5] rounded-[20px] p-6 text-[13px] text-[#087A4A] space-y-2">
                <h4 className="font-bold text-[14px] text-[#0C0F0C]">Production SLAs</h4>
                <p>
                  Urgent gateway reconciliations and settlement disputes are prioritized with guaranteed sub-15 minute callback times.
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
      <div className="bg-[#F7F6F2] min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
              About Tradeon
            </span>
            <h1 className="text-[36px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight mt-3">
              Institutional Product Exchange Architecture
            </h1>
            <p className="mt-3 text-[17px] text-[#5A5A53] leading-relaxed">
              Tradeon was engineered from first principles to provide business product and asset owners with a turnkey, high-performance exchange platform.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-8 shadow-xs space-y-6 text-[15px] text-[#5A5A53] leading-relaxed">
            <h2 className="text-[22px] font-bold text-[#171A17]">Our Philosophy</h2>
            <p>
              Traditional marketplaces either force products into ill-fitting crypto tokens or require prohibitively complex securities clearing. Tradeon introduces a clean, neutral asset abstraction layer: products have transparent values, verified available units, and automated double-entry ledger settlements without unnecessary baggage.
            </p>

            <h2 className="text-[22px] font-bold text-[#171A17] pt-4 border-t border-[#EFEEE9]">
              Multi-Platform Native Engineering
            </h2>
            <p>
              We believe financial software should look and perform impeccably regardless of device. Tradeon provides seamless consistency whether viewed on a 1440px multi-monitor desktop terminal, an iPhone 16 Pro running iOS 18 with Dynamic Island notifications, or a Google Pixel 9 Pro with Android 15 Material 3 fluidity.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Legal (terms or privacy)
  const isTerms = page === 'terms';
  return (
    <div className="bg-[#F7F6F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
            Legal Document
          </span>
          <h1 className="text-[36px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight mt-3">
            {isTerms ? 'Terms of Service' : 'Privacy & Data Protection Policy'}
          </h1>
          <p className="mt-2 text-[15px] text-[#6B6B63]">
            Last updated: September 2026 · Confidential Prototype Edition
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[22px] p-8 shadow-xs space-y-6 text-[14px] text-[#5A5A53] leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-[17px] font-bold text-[#171A17]">1. Platform Scope & Purpose</h3>
            <p>
              Tradeon operates as a digital product trading and transaction settlement platform. The platform does not deal in stocks, cryptocurrencies, or conventional public equities. All listed products are supplied and managed directly by the platform operator.
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
