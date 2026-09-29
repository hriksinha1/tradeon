import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { BRAND_SYSTEM } from '../../constants/designTokens';
import { BookOpen, Copy, Check, Palette, FileText, HelpCircle, ShieldAlert, Sparkles, Layers } from 'lucide-react';

export const ProductDossierModal: React.FC = () => {
  const { isDossierOpen, setIsDossierOpen, showToast } = useTrading();
  const [activeTab, setActiveTab] = useState<'strategy' | 'tokens' | 'requirements' | 'questions'>('strategy');
  const [copied, setCopied] = useState(false);

  if (!isDossierOpen) return null;

  const copyTokensJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(BRAND_SYSTEM, null, 2));
    setCopied(true);
    showToast('Tokens Copied', 'Design tokens JSON copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isDossierOpen}
      onClose={() => setIsDossierOpen(false)}
      title="Master Product Strategy & Design System Dossier"
      subtitle="Tradeon Platform Specification & Meadow Green (#1FC777) Design Foundation"
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F6F2] border border-[#E2E1DA] rounded-[10px] overflow-x-auto">
          <button
            onClick={() => setActiveTab('strategy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'strategy' ? 'bg-white text-[#087A4A] shadow-xs' : 'text-[#6B6B63] hover:text-[#171717]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Product Strategy & Model</span>
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'requirements' ? 'bg-white text-[#087A4A] shadow-xs' : 'text-[#6B6B63] hover:text-[#171717]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. Scope & Pre-Advance Scope</span>
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'tokens' ? 'bg-white text-[#087A4A] shadow-xs' : 'text-[#6B6B63] hover:text-[#171717]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>3. Meadow Green (#1FC777) Color System</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'questions' ? 'bg-white text-[#087A4A] shadow-xs' : 'text-[#6B6B63] hover:text-[#171717]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>4. Discovery & Next Phase</span>
          </button>
        </div>

        {/* Tab 1: Strategy & Conceptual Model */}
        {activeTab === 'strategy' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-[13px] text-[#40403B] leading-relaxed">
            <div className="p-4 bg-[#E9FAF1] border border-[#A2E8C5] rounded-[14px]">
              <h3 className="text-[16px] font-bold text-[#087A4A] mb-1">
                Executive Product Summary & Confidentiality Boundary
              </h3>
              <p>
                The platform is a modern digital trading and marketplace exchange engineered for <strong>Web (1440px desktop baseline)</strong>, <strong>iOS</strong>, and <strong>Android</strong>. Users interact with products supplied directly by the client's business to execute buys, sells, trade option contracts, monitor positions, and manage funds via an audited double-entry ledger.
              </p>
              <div className="mt-3 p-3 bg-white border border-[#E2E1DA] rounded-[10px] text-[12px] text-[#171A17]">
                <strong>Confidentiality Rule:</strong> The underlying traded product is intentionally confidential. The platform does NOT trade stocks, cryptocurrency, gold, silver, or forex. Neutral terminology is enforced throughout: <em>Product, Asset, Unit, Listing, Order, Position, Holding, Portfolio, Balance, Transaction, Ledger</em>.
              </div>
            </div>

            <div className="p-4 bg-white border border-[#CBCAC2] rounded-[14px]">
              <h4 className="text-[14px] font-bold text-[#171A17] mb-2">Platform Mechanics</h4>
              <div className="flex flex-wrap items-center gap-2 p-3 bg-[#F7F6F2] rounded-[10px] text-[12px] font-semibold text-[#171A17]">
                <span className="px-2.5 py-1 bg-white border border-[#CBCAC2] rounded">USER</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#CBCAC2] rounded">ACCOUNT & WALLET</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#CBCAC2] rounded">PRODUCTS CATALOG</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#CBCAC2] rounded">BUY / SELL ORDERS</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#CBCAC2] rounded">OPTIONS CONTRACTS</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#CBCAC2] rounded">DOUBLE-ENTRY LEDGER</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Scope Matrix */}
        {activeTab === 'requirements' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-[13px] text-[#40403B] leading-relaxed">
            <div className="p-4 bg-white border border-[#CBCAC2] rounded-[14px]">
              <h3 className="text-[15px] font-bold text-[#171A17] mb-3">Pre-Advance Prototype Deliverables</h3>
              <ul className="space-y-2 text-[13px] text-[#5A5A53]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FC777] mt-2 shrink-0" />
                  <span><strong>Marketing Website:</strong> Hero showcase with live reactive quote, Listed products catalog, Platform principles, Native iOS/Android showcase, Payments & Ledger breakdown, and FAQs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FC777] mt-2 shrink-0" />
                  <span><strong>Device Simulation:</strong> Interactive viewport switcher allowing instant preview across Web (1440px desktop), Apple iPhone 16 Pro (Dynamic Island), and Google Pixel 9 Pro.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FC777] mt-2 shrink-0" />
                  <span><strong>Complete Interactive App:</strong> Dashboard, Markets, Product Details, Option Trading, Orders, Wallet, Ledger, Watchlist, Profile, and Settings with reactive local state.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Design Tokens (Source of Truth) */}
        {activeTab === 'tokens' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-[13px]">
            <div className="flex items-center justify-between p-3.5 bg-[#E9FAF1] border border-[#A2E8C5] rounded-[12px]">
              <div>
                <span className="font-bold text-[14px] text-[#087A4A] block">
                  Meadow Green (#1FC777) Design System
                </span>
                <span className="text-[12px] text-[#5A5A53]">
                  Accessible Brand 700 (#087A4A), Ink Text (#0C0F0C), Warm Neutrals (#F7F6F2)
                </span>
              </div>
              <button
                onClick={copyTokensJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1FC777] hover:bg-[#18B36A] text-[#0C0F0C] font-bold text-[12px] rounded-[8px] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Tokens JSON'}</span>
              </button>
            </div>

            {/* Color Swatches Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#1FC777] text-[#0C0F0C] rounded-[10px] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider block">Brand 500 (Primary)</span>
                <span className="font-mono font-bold text-[14px]">#1FC777</span>
                <span className="text-[10px] opacity-80 block mt-1">Meadow Green</span>
              </div>
              <div className="p-3 bg-[#1FC777] text-[#0C0F0C] font-bold rounded-[10px] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider block">Brand 700 (Accessible)</span>
                <span className="font-mono font-bold text-[14px]">#087A4A</span>
                <span className="text-[10px] opacity-80 block mt-1">Links, text, icons (4.5:1+)</span>
              </div>
              <div className="p-3 bg-[#0C0F0C] text-white rounded-[10px] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider block">Ink (Text on Brand)</span>
                <span className="font-mono font-bold text-[14px]">#0C0F0C</span>
                <span className="text-[10px] opacity-80 block mt-1">8.72:1 contrast ratio</span>
              </div>
              <div className="p-3 bg-[#F7F6F2] text-[#171A17] border border-[#CBCAC2] rounded-[10px] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider block text-[#6B6B63]">Neutral 50</span>
                <span className="font-mono font-bold text-[14px]">#F7F6F2</span>
                <span className="text-[10px] text-[#6B6B63] block mt-1">Warm off-white base</span>
              </div>
            </div>

            {/* 60-30-10 Distribution Rule */}
            <div className="p-4 bg-white border border-[#CBCAC2] rounded-[14px] space-y-2">
              <h4 className="font-bold text-[14px] text-[#171A17]">60-30-10 Color Application Rule</h4>
              <div className="grid grid-cols-3 gap-2 text-center text-[12px] pt-1">
                <div className="p-2 bg-[#F7F6F2] rounded-[8px] border border-[#E2E1DA]">
                  <span className="font-extrabold text-[16px] text-[#171A17] block">60%</span>
                  <span className="font-bold text-[#5A5A53]">Warm Neutrals</span>
                  <span className="text-[10px] text-[#6B6B63] block">Canvas & Cards</span>
                </div>
                <div className="p-2 bg-white rounded-[8px] border border-[#CBCAC2]">
                  <span className="font-extrabold text-[16px] text-[#171A17] block">30%</span>
                  <span className="font-bold text-[#5A5A53]">Secondary/Cards</span>
                  <span className="text-[10px] text-[#6B6B63] block">Surfaces & Text</span>
                </div>
                <div className="p-2 bg-[#E9FAF1] rounded-[8px] border border-[#A2E8C5]">
                  <span className="font-extrabold text-[16px] text-[#087A4A] block">10%</span>
                  <span className="font-bold text-[#087A4A]">Meadow Green</span>
                  <span className="text-[10px] text-[#087A4A] block">Primary CTAs & Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Questions for Client Discovery */}
        {activeTab === 'questions' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-[13px] text-[#40403B] leading-relaxed">
            <div className="p-4 bg-white border border-[#CBCAC2] rounded-[14px] space-y-3">
              <h3 className="text-[15px] font-bold text-[#171A17]">
                Key Discovery Areas for Post-Advance Kickoff
              </h3>
              <div className="space-y-2 text-[13px] text-[#5A5A53]">
                <div>
                  <strong className="text-[#171A17]">1. Asset & Custody Mechanics:</strong> Physical inventory quota vs digital unit right; fractional unit rules; custody certificate format.
                </div>
                <div>
                  <strong className="text-[#171A17]">2. Order Matching vs Direct Fulfillment:</strong> Order book matching between users vs client proprietary market-maker fulfillment.
                </div>
                <div>
                  <strong className="text-[#171A17]">3. Option Expiry Settlement:</strong> Physical delivery vs cash settlement into user internal wallet.
                </div>
                <div>
                  <strong className="text-[#171A17]">4. Payment Gateway Provider:</strong> Razorpay / Cashfree / Stripe / Decentro routing preference and KYC compliance tier.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-[#EFEEE9] flex justify-end">
        <Button variant="primary" onClick={() => setIsDossierOpen(false)}>
          Close Dossier
        </Button>
      </div>
    </Modal>
  );
};
