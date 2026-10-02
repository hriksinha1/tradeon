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
      subtitle="High-Density Dark Trading Environment & #F0B90B Brand Foundation"
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#111418] border border-[#2B3139] rounded-[6px] overflow-x-auto">
          <button
            onClick={() => setActiveTab('strategy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'strategy' ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]' : 'text-[#848E9C] hover:text-[#F5F5F5]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Platform Strategy</span>
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'tokens' ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]' : 'text-[#848E9C] hover:text-[#F5F5F5]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>2. Black & Yellow (#F0B90B) Palette</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'architecture' ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]' : 'text-[#848E9C] hover:text-[#F5F5F5]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>3. Matching & Ledger Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'questions' ? 'bg-[#1E2329] text-[#F0B90B] border border-[#363C45]' : 'text-[#848E9C] hover:text-[#F5F5F5]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>4. Verification Spec</span>
          </button>
        </div>

        {/* Tab 1: Strategy */}
        {activeTab === 'strategy' && (
          <div className="space-y-4 text-[13px] leading-relaxed">
            <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[6px]">
              <h3 className="font-bold text-[#F5F5F5] text-[15px] mb-2">High-Density Trading Core</h3>
              <p className="text-[#B7BDC6]">
                Tradeon couples the UX density and informational clarity of modern financial trading platforms with a specialized asset abstraction layer. Markets are backed by rigorous settlement cycles, transparent order books, and real-time execution receipts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#111418] border border-[#2B3139] rounded-[6px]">
                <h4 className="font-semibold text-[#F0B90B] text-[13px] mb-1">Central Order Book Model</h4>
                <p className="text-[#848E9C] text-[12px]">
                  Real-time price formation through bid/ask depth matching. No synthetic slippage or opaque spreads.
                </p>
              </div>
              <div className="p-3.5 bg-[#111418] border border-[#2B3139] rounded-[6px]">
                <h4 className="font-semibold text-[#0ECB81] text-[13px] mb-1">Double-Entry Accounting</h4>
                <p className="text-[#848E9C] text-[12px]">
                  Every trade, deposit, withdrawal, and fee adjustment writes an immutable running-balance ledger entry.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tokens */}
        {activeTab === 'tokens' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#F5F5F5] text-[15px]">Semantic Design Tokens</h3>
                <p className="text-[12px] text-[#848E9C]">Color primitives and typography scales</p>
              </div>
              <Button size="xs" variant="secondary" onClick={copyTokensJSON} className="flex items-center gap-1.5">
                {copied ? <Check className="w-3.5 h-3.5 text-[#0ECB81]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Tokens JSON</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-[6px] bg-[#0B0E11] border border-[#2B3139]">
                <div className="w-full h-8 rounded-[4px] bg-[#F0B90B] mb-2" />
                <div className="text-[12px] font-bold text-[#F5F5F5]">Primary Brand</div>
                <div className="text-[11px] font-mono text-[#F0B90B]">#F0B90B</div>
              </div>
              <div className="p-3 rounded-[6px] bg-[#0B0E11] border border-[#2B3139]">
                <div className="w-full h-8 rounded-[4px] bg-[#0B0E11] border border-[#2B3139] mb-2" />
                <div className="text-[12px] font-bold text-[#F5F5F5]">Background Canvas</div>
                <div className="text-[11px] font-mono text-[#848E9C]">#0B0E11</div>
              </div>
              <div className="p-3 rounded-[6px] bg-[#0B0E11] border border-[#2B3139]">
                <div className="w-full h-8 rounded-[4px] bg-[#0ECB81] mb-2" />
                <div className="text-[12px] font-bold text-[#F5F5F5]">Market Positive / Buy</div>
                <div className="text-[11px] font-mono text-[#0ECB81]">#0ECB81</div>
              </div>
              <div className="p-3 rounded-[6px] bg-[#0B0E11] border border-[#2B3139]">
                <div className="w-full h-8 rounded-[4px] bg-[#F6465D] mb-2" />
                <div className="text-[12px] font-bold text-[#F5F5F5]">Market Negative / Sell</div>
                <div className="text-[11px] font-mono text-[#F6465D]">#F6465D</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Architecture */}
        {activeTab === 'architecture' && (
          <div className="p-4 bg-[#111418] border border-[#2B3139] rounded-[6px] space-y-3 text-[13px]">
            <h3 className="font-bold text-[#F5F5F5] text-[15px]">High-Throughput Architectural Layers</h3>
            <ul className="space-y-2 text-[#B7BDC6]">
              <li className="flex items-start gap-2">
                <span className="text-[#F0B90B] font-bold">1.</span>
                <span><strong>Order Entry & Pre-Trade Risk:</strong> Validates user margin, purchasing power, and position limits prior to routing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F0B90B] font-bold">2.</span>
                <span><strong>Central Matching Engine:</strong> Continuous FIFO price-time priority order book algorithm with partial fills support.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F0B90B] font-bold">3.</span>
                <span><strong>Real-Time Ledger:</strong> Asynchronous settlement processor journaling entries into auditable records.</span>
              </li>
            </ul>
          </div>
        )}

        {/* Tab 4: Questions */}
        {activeTab === 'questions' && (
          <div className="space-y-3 text-[13px]">
            <div className="p-3 bg-[#111418] border border-[#2B3139] rounded-[6px]">
              <div className="font-bold text-[#F5F5F5] mb-1">Q: How are market fees accounted for?</div>
              <p className="text-[#848E9C]">Platform fee is 0.10% on gross notional, explicitly debited or netted at execution with instant receipt display.</p>
            </div>
            <div className="p-3 bg-[#111418] border border-[#2B3139] rounded-[6px]">
              <div className="font-bold text-[#F5F5F5] mb-1">Q: How is numeric alignment enforced?</div>
              <p className="text-[#848E9C]">All financial quantities, prices, percentages, and timestamps use tabular numerals (`tabular-nums`) to prevent layout jitter across fluctuating feeds.</p>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-[#2B3139] flex justify-end">
          <Button variant="primary" onClick={() => setIsDossierOpen(false)}>
            Close Dossier
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDossierModal;
