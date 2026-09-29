import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { BRAND_SYSTEM } from '../../constants/designTokens';
import { BookOpen, Copy, Check, Palette, FileText, HelpCircle, ShieldAlert } from 'lucide-react';

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
      subtitle="Confidential Platform Specification & Production-Ready Token Foundation"
      maxWidth="4xl"
    >
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F5F4] rounded-[10px] overflow-x-auto">
          <button
            onClick={() => setActiveTab('strategy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all whitespace-nowrap ${
              activeTab === 'strategy' ? 'bg-white text-[#6A2E62] shadow-xs' : 'text-[#6B6B6B] hover:text-[#171717]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Product Strategy & Model</span>
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all whitespace-nowrap ${
              activeTab === 'requirements' ? 'bg-white text-[#6A2E62] shadow-xs' : 'text-[#6B6B6B] hover:text-[#171717]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. Requirements Matrix & Scope</span>
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all whitespace-nowrap ${
              activeTab === 'tokens' ? 'bg-white text-[#6A2E62] shadow-xs' : 'text-[#6B6B6B] hover:text-[#171717]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>3. Brand (#6A2E62) & League Spartan Tokens</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all whitespace-nowrap ${
              activeTab === 'questions' ? 'bg-white text-[#6A2E62] shadow-xs' : 'text-[#6B6B6B] hover:text-[#171717]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>4. Client Discovery & Unknowns</span>
          </button>
        </div>

        {/* Tab 1: Strategy & Conceptual Model */}
        {activeTab === 'strategy' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-[13px] text-[#44403C] leading-relaxed">
            <div className="p-4 bg-[#FAF4F9] border border-[#ECD6E9] rounded-[12px]">
              <h3 className="text-[16px] font-bold text-[#6A2E62] mb-1">
                Executive Product Summary & Confidentiality Boundary
              </h3>
              <p>
                The platform is a digital trading and marketplace exchange available on <strong>Web, iOS, and Android</strong>.
                Users interact with business-supplied products/assets to buy, sell, trade options contracts, manage positions,
                and maintain an audited double-entry ledger.
              </p>
              <div className="mt-3 p-2.5 bg-white border border-[#E7E5E4] rounded-[8px] text-[12px] text-[#171717]">
                <strong>Strict Confidentiality Rule:</strong> The underlying tradable asset is confidential. The platform
                does NOT trade stocks, cryptocurrencies, gold, silver, or forex. Neutral abstractions are enforced:
                <em> Product, Asset, Unit, Listing, Order, Position, Holding, Portfolio, Balance, Transaction, Ledger</em>.
              </div>
            </div>

            <div className="p-4 bg-white border border-[#E7E5E4] rounded-[12px]">
              <h4 className="text-[14px] font-bold text-[#171717] mb-2">Core Technology-Agnostic Product Model</h4>
              <div className="flex flex-wrap items-center gap-2 p-3 bg-[#FAFAF9] rounded-[8px] text-[12px] font-semibold text-[#171717]">
                <span className="px-2.5 py-1 bg-white border border-[#E7E5E4] rounded">USER</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#E7E5E4] rounded">ACCOUNT & WALLET</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#E7E5E4] rounded">PRODUCTS & MARKETS</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#E7E5E4] rounded">ORDERS (BUY/SELL)</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#E7E5E4] rounded">TRANSACTIONS & LEDGER</span>
                <span>→</span>
                <span className="px-2.5 py-1 bg-white border border-[#E7E5E4] rounded">POSITIONS / PORTFOLIO</span>
              </div>
              <p className="mt-3 text-[12px] text-[#6B6B6B]">
                This model separates the financial ledger and balance mechanisms from the specific asset definition, allowing
                plug-and-play configuration when the client discloses business domain specifics.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E7E5E4] rounded-[12px]">
              <h4 className="text-[14px] font-bold text-[#171717] mb-2">Pre-Advance Prototype Objectives</h4>
              <ul className="list-disc list-inside space-y-1.5 text-[#57534E]">
                <li>Demonstrates deep grasp of trading mechanics without giving away weeks of free production engineering.</li>
                <li>Proves high-level visual elegance, responsive mobile execution (Web, iOS, Android), and typographic discipline.</li>
                <li>Instills stakeholder trust so the client feels confident authorizing the advance payment and disclosing requirements.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Requirements Matrix & Scope */}
        {activeTab === 'requirements' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="p-3 bg-[#FFFBEB] border border-[#FEDF89] rounded-[10px] text-[12px] text-[#B7791F] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>
                Requirements Classification: Confirmed vs. Proposed vs. Unknown Blockers.
              </span>
            </div>

            <div className="border border-[#E7E5E4] rounded-[12px] overflow-hidden">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#FAFAF9] border-b border-[#E7E5E4] font-bold text-[#171717]">
                  <tr>
                    <th className="p-2.5">Feature Area</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Confidence</th>
                    <th className="p-2.5">Design Impact</th>
                    <th className="p-2.5">Action Needed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E4] text-[#57534E]">
                  <tr>
                    <td className="p-2.5 font-medium text-[#171717]">Multi-Platform (Web, iOS, Android)</td>
                    <td className="p-2.5"><span className="text-[#16803C] font-semibold">Confirmed</span></td>
                    <td className="p-2.5">100%</td>
                    <td className="p-2.5">High (Responsive layouts + touch targets)</td>
                    <td className="p-2.5">Implemented in preview frame</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#171717]">Buy & Sell Orders</td>
                    <td className="p-2.5"><span className="text-[#16803C] font-semibold">Confirmed</span></td>
                    <td className="p-2.5">100%</td>
                    <td className="p-2.5">High (Order panels, review, balance locks)</td>
                    <td className="p-2.5">Interactive simulation ready</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#171717]">Options Trading Contract Shell</td>
                    <td className="p-2.5"><span className="text-[#16803C] font-semibold">Confirmed</span></td>
                    <td className="p-2.5">90%</td>
                    <td className="p-2.5">High (Calls/Puts, Expiry, Payoff preview)</td>
                    <td className="p-2.5">Awaiting exact settlement rules</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#171717]">Financial Ledger & Balances</td>
                    <td className="p-2.5"><span className="text-[#16803C] font-semibold">Confirmed</span></td>
                    <td className="p-2.5">100%</td>
                    <td className="p-2.5">Medium (Immutable transaction log)</td>
                    <td className="p-2.5">Running balance modeled</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#171717]">Underlying Asset Classification</td>
                    <td className="p-2.5"><span className="text-[#C62828] font-semibold">Unknown (Blocker)</span></td>
                    <td className="p-2.5">0%</td>
                    <td className="p-2.5">Critical (Asset taxonomy & unit measures)</td>
                    <td className="p-2.5">Client discovery after advance</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#171717]">KYC / Regulatory Jurisdiction</td>
                    <td className="p-2.5"><span className="text-[#B7791F] font-semibold">Proposed</span></td>
                    <td className="p-2.5">60%</td>
                    <td className="p-2.5">Medium (Verification status & limits)</td>
                    <td className="p-2.5">Requires legal input</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Brand & League Spartan Tokens */}
        {activeTab === 'tokens' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[14px] font-bold text-[#171717]">Primary Brand Color (#6A2E62) & Tokens</h4>
                <p className="text-[12px] text-[#6B6B6B]">
                  Modern fintech visual language: League Spartan typography + clean neutral canvas (#FAFAF9).
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={copyTokensJSON} className="flex items-center gap-1.5">
                {copied ? <Check className="w-3.5 h-3.5 text-[#16803C]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy JSON</span>
              </Button>
            </div>

            {/* Color Swatches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-[10px] bg-[#6A2E62] text-white">
                <span className="text-[11px] block text-white/80">Primary Brand</span>
                <span className="text-[14px] font-bold">#6A2E62</span>
                <span className="text-[10px] block text-white/60">Plum 500</span>
              </div>
              <div className="p-3 rounded-[10px] bg-[#FAF4F9] border border-[#ECD6E9] text-[#6A2E62]">
                <span className="text-[11px] block text-[#6A2E62]/80">Brand Subtle</span>
                <span className="text-[14px] font-bold">#FAF4F9</span>
                <span className="text-[10px] block text-[#6A2E62]/60">Surface Tint</span>
              </div>
              <div className="p-3 rounded-[10px] bg-[#FAFAF9] border border-[#E7E5E4] text-[#171717]">
                <span className="text-[11px] block text-[#6B6B6B]">App Canvas</span>
                <span className="text-[14px] font-bold">#FAFAF9</span>
                <span className="text-[10px] block text-[#6B6B6B]">Warm Neutral 50</span>
              </div>
              <div className="p-3 rounded-[10px] bg-[#ECFDF3] border border-[#A6F4C5] text-[#16803C]">
                <span className="text-[11px] block text-[#16803C]/80">Positive Semantic</span>
                <span className="text-[14px] font-bold">#16803C</span>
                <span className="text-[10px] block text-[#16803C]/60">Gains & Settled</span>
              </div>
            </div>

            {/* Typography Scale Table */}
            <div className="border border-[#E7E5E4] rounded-[12px] overflow-hidden">
              <div className="p-2.5 bg-[#FAFAF9] font-bold text-[12px] text-[#171717] border-b border-[#E7E5E4]">
                League Spartan Typography Scale
              </div>
              <table className="w-full text-left text-[12px]">
                <thead className="border-b border-[#E7E5E4] text-[#78716C] bg-white">
                  <tr>
                    <th className="p-2">Token</th>
                    <th className="p-2">Size / Line Height</th>
                    <th className="p-2">Weight</th>
                    <th className="p-2">Tracking</th>
                    <th className="p-2">Target Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E4] text-[#57534E]">
                  {BRAND_SYSTEM.typographyScale.slice(0, 8).map((t) => (
                    <tr key={t.token}>
                      <td className="p-2 font-bold text-[#171717]">{t.token}</td>
                      <td className="p-2 font-mono text-[11px]">{t.size} / {t.lineHeight}</td>
                      <td className="p-2">{t.weight}</td>
                      <td className="p-2 font-mono text-[11px]">{t.letterSpacing}</td>
                      <td className="p-2 text-[#78716C]">{t.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Questions for Client */}
        {activeTab === 'questions' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-[13px] text-[#57534E]">
            <div className="p-4 bg-white border border-[#E7E5E4] rounded-[12px]">
              <h4 className="text-[14px] font-bold text-[#C62828] mb-1">Critical Architectural Questions (Discovery Meeting)</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-[12px]">
                <li><strong>Asset Specification:</strong> Is the asset physical inventory, a rights contract, ownership unit, or service allotment?</li>
                <li><strong>Trading Mechanics:</strong> Do users buy directly from business inventory, or is there peer-to-peer order book matching?</li>
                <li><strong>Option Structure:</strong> What do Call/Put contracts grant the holder, and how is physical vs. cash settlement finalized?</li>
                <li><strong>Payment & Settlement:</strong> What payment gateway is required (Razorpay, Cashfree, Stripe), and what are payout SLA timelines?</li>
              </ol>
            </div>

            <div className="p-4 bg-white border border-[#E7E5E4] rounded-[12px]">
              <h4 className="text-[14px] font-bold text-[#171717] mb-1">What We Do NOT Claim Yet</h4>
              <ul className="list-disc list-inside space-y-1 text-[12px] text-[#78716C]">
                <li>We do not claim final option math or clearing house rules are set.</li>
                <li>We do not claim financial licenses or regulatory filings are complete.</li>
                <li>All figures and market data displayed are realistic placeholders to validate UI density.</li>
              </ul>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button onClick={() => setIsDossierOpen(false)}>Close Dossier</Button>
        </div>
      </div>
    </Modal>
  );
};
