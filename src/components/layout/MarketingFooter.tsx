import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ViewMode } from '../../types';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  const { setCurrentView } = useTrading();

  const navigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerNav = [
    {
      title: 'Platform',
      links: [
        { label: 'Markets Overview', view: 'markets' as ViewMode },
        { label: 'Listed Products', view: 'products' as ViewMode },
        { label: 'Options Trading', view: 'options' as ViewMode },
        { label: 'Trading Terminal', view: 'app-dashboard' as ViewMode },
      ],
    },
    {
      title: 'Experience',
      links: [
        { label: 'How It Works', view: 'how-it-works' as ViewMode },
        { label: 'Mobile Application', view: 'mobile-app' as ViewMode },
        { label: 'Payments & Settlement', view: 'payments' as ViewMode },
        { label: 'Security Architecture', view: 'security' as ViewMode },
      ],
    },
    {
      title: 'Company & Trust',
      links: [
        { label: 'About Tradeon', view: 'about' as ViewMode },
        { label: 'Knowledge Base & FAQ', view: 'faq' as ViewMode },
        { label: 'Support & Help Desk', view: 'contact' as ViewMode },
        { label: 'System Architecture', view: 'about' as ViewMode },
      ],
    },
    {
      title: 'Governance',
      links: [
        { label: 'Terms of Service', view: 'terms' as ViewMode },
        { label: 'Privacy & Data Policy', view: 'privacy' as ViewMode },
        { label: 'Market Integrity Rules', view: 'security' as ViewMode },
        { label: 'Risk Disclosure Notice', view: 'terms' as ViewMode },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#EAECEF] bg-[#F8F9FA] text-[#474D57] select-none">
      {/* Top Pre-Footer Bar */}
      <div className="border-b border-[#EAECEF]">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded-[4px] bg-[#F0B90B] text-[#181A20] font-black text-sm shadow-xs">
              T
            </div>
            <div>
              <span className="font-bold text-sm text-[#181A20] tracking-tight">
                Tradeon
              </span>
              <span className="text-xs text-[#707A8A] ml-2">
                White Theme · High-Density Trading System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => navigate('app-dashboard')}
              className="font-bold text-[#181A20] hover:text-[#B78103] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Launch Live Terminal</span>
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {footerNav.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181A20]">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.view)}
                      className="text-[#474D57] hover:text-[#181A20] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Regulatory & Institutional Notice Box */}
        <div className="mt-12 rounded-[8px] border border-[#EAECEF] bg-white p-5 text-xs text-[#707A8A] space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-[#181A20] font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-[#02A063]" />
            <span>Platform Transparency & Operational Notice</span>
          </div>
          <p className="leading-relaxed">
            Tradeon is a structured digital trading platform and product marketplace operating on double-entry ledger settlement architecture. All listed units and valuation references represent demonstrative marketplace models. Digital asset transactions carry financial risk; users must independently assess contract specifications before committing capital.
          </p>
        </div>

        {/* Bottom Copyright & Status Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAECEF] pt-6 text-[11px] text-[#707A8A]">
          <div>
            © {new Date().getFullYear()} Tradeon Technologies Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#02A063]" />
              <span className="font-mono text-[#181A20]">All Systems Operational</span>
            </span>
            <span>·</span>
            <span>Latency: 8ms</span>
            <span>·</span>
            <span>TLS 1.3 Strict</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
