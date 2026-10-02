import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { DESIGN_TOKENS } from '../../constants/designTokens';
import { BookOpen, Copy, Check, Palette, FileText, HelpCircle, Shield, Sliders } from 'lucide-react';

export const ProductDossierModal: React.FC = () => {
  const { isDossierOpen, setIsDossierOpen, showToast } = useTrading();
  const [activeTab, setActiveTab] = useState<'strategy' | 'tokens' | 'architecture' | 'questions'>('strategy');
  const [copied, setCopied] = useState(false);

  if (!isDossierOpen) return null;

  const copyTokensJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(DESIGN_TOKENS, null, 2));
    setCopied(true);
    showToast('Tokens Copied', 'Design tokens JSON copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isDossierOpen}
      onClose={() => setIsDossierOpen(false)}
      title="Tradeon Design System & Platform Architecture"
      subtitle="High-Density White Theme & #F0B90B Brand Foundation"
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F6F8] border border-[#DFE2E6] rounded-[6px] overflow-x-auto">
          <button
            onClick={() => setActiveTab('strategy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'strategy' ? 'bg-white text-[#181A20] font-bold shadow-xs border border-[#DFE2E6]' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Platform Strategy</span>
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'tokens' ? 'bg-white text-[#181A20] font-bold shadow-xs border border-[#DFE2E6]' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>2. White Theme & Gold Accent</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'architecture' ? 'bg-white text-[#181A20] font-bold shadow-xs border border-[#DFE2E6]' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>3. Matching & Ledger</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'questions' ? 'bg-white text-[#181A20] font-bold shadow-xs border border-[#DFE2E6]' : 'text-[#707A8A] hover:text-[#181A20]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>4. Governance</span>
          </button>
        </div>

        {/* Tab 1: Strategy */}
        {activeTab === 'strategy' && (
          <div className="space-y-3.5 text-xs text-[#474D57] leading-relaxed">
            <div className="p-3.5 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6]">
              <h4 className="font-bold text-sm text-[#181A20] mb-1">
                Confidential Product Abstraction Layer
              </h4>
              <p>
                Tradeon implements a generalized digital trading marketplace for product units and bounded-risk options. Asset quantities, order matching slips, and ledger accounts reflect professional financial exchange ergonomics.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6]">
                <span className="font-bold text-[#181A20] block mb-1">
                  1. Transparent Unit Pricing
                </span>
                <p>
                  Eliminates confusing tickers. Every listing presents verified available supply, 24-hour liquidity spread, and immediate ledger reconciliation.
                </p>
              </div>
              <div className="p-3 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6]">
                <span className="font-bold text-[#181A20] block mb-1">
                  2. Double-Entry Accounting
                </span>
                <p>
                  No obscured balances. Every transaction writes paired debit and credit records with cryptographic sequential hashes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tokens */}
        {activeTab === 'tokens' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#707A8A]">
              <span>Active Design Tokens (White Theme & Yellow Primary Accent #F0B90B)</span>
              <button
                onClick={copyTokensJSON}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#B78103] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy JSON</span>
              </button>
            </div>

            <div className="p-3 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6] font-mono text-[11px] text-[#181A20] max-h-56 overflow-y-auto">
              <pre>{JSON.stringify(DESIGN_TOKENS, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Tab 3: Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-3 text-xs text-[#474D57]">
            <div className="p-3.5 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6] space-y-2">
              <h4 className="font-bold text-sm text-[#181A20]">
                Matching Engine & Order Slip State Flow
              </h4>
              <p>
                1. Order is initiated on client (Market / Limit) → 2. Local validation checks available wallet cash or unit holdings → 3. Order is routed to the simulated matching book → 4. Upon fill, double-entry ledger is credited/debited and wallet available balance is recalculated in real time.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Questions */}
        {activeTab === 'questions' && (
          <div className="space-y-2 text-xs text-[#474D57]">
            <div className="p-3 bg-[#F5F6F8] rounded-[6px] border border-[#DFE2E6]">
              <span className="font-bold text-[#181A20] block mb-1">
                How is data persisted?
              </span>
              <p>
                State is reactive across the entire application using unified TradingContext with localStorage caching and seamless in-memory service adapters.
              </p>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-[#EAECEF] flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setIsDossierOpen(false)} className="cursor-pointer">
            Close Dossier
          </Button>
        </div>
      </div>
    </Modal>
  );
};
