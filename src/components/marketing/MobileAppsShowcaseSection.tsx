import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import {
  Smartphone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Bell,
  Fingerprint,
} from 'lucide-react';

export const MobileAppsShowcaseSection: React.FC = () => {
  const { setDeviceFrame, setCurrentView } = useTrading();

  return (
    <section className="py-20 bg-[#F7F6F2] border-b border-[#CBCAC2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Details & Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E9FAF1] border border-[#A2E8C5] rounded-full text-[12px] font-bold text-[#087A4A]">
              <Smartphone className="w-3.5 h-3.5 text-[#1FC777]" />
              <span>Multi-Platform Ecosystem</span>
            </div>

            <h2 className="text-[34px] sm:text-[46px] font-extrabold text-[#171A17] tracking-tight leading-tight">
              Institutional power in the palm of your hand.
            </h2>

            <p className="text-[17px] text-[#5A5A53] leading-relaxed">
              Experience the Tradeon platform natively across iOS and Android. Designed with precise platform design patterns, fluid 60fps animations, biometric authentication, and instant trade execution.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E9FAF1] text-[#087A4A] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#171A17]">
                    Native iOS 18 Design System
                  </h4>
                  <p className="text-[13px] text-[#5A5A53]">
                    Dynamic Island live trading updates, SF Symbols integration, and iOS home-indicator ergonomics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E9FAF1] text-[#087A4A] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#171A17]">
                    Android 15 Material Precision
                  </h4>
                  <p className="text-[13px] text-[#5A5A53]">
                    Pixel 9 Pro optimized layout, punch-hole awareness, smooth predictive back navigation, and modern bottom sheets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E9FAF1] text-[#087A4A] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#171A17]">
                    Sub-second Push Notifications
                  </h4>
                  <p className="text-[13px] text-[#5A5A53]">
                    Instant alerts for order fills, payment gateway settlements, and price movements.
                  </p>
                </div>
              </div>
            </div>

            {/* Simulator Trigger Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  setDeviceFrame('ios');
                  setCurrentView('app-dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Launch iOS Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setDeviceFrame('android');
                  setCurrentView('app-dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Android Simulator</span>
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Device Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative">
              {/* Decorative background glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#1FC777]/20 to-[#6EDBA5]/20 rounded-full blur-2xl -z-10" />

              {/* iPhone 16 Pro Mockup Display */}
              <div className="w-[310px] sm:w-[340px] h-[640px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-[#2A2A26] relative">
                {/* Dynamic island */}
                <div className="w-24 h-5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-4 flex items-center justify-end px-2 z-30">
                  <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
                </div>

                {/* Screen glass */}
                <div className="w-full h-full bg-[#FFFFFF] rounded-[38px] overflow-hidden flex flex-col text-left">
                  {/* Status bar */}
                  <div className="h-10 bg-white px-6 flex items-center justify-between text-[11px] font-bold text-[#171717] pt-2">
                    <span>9:41</span>
                    <span className="text-[10px] font-mono text-[#087A4A]">5G · 100%</span>
                  </div>

                  {/* App Screen Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between bg-[#F7F6F2]">
                    <div>
                      {/* Brand Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#E2E1DA]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded bg-[#1FC777] flex items-center justify-center text-[#0C0F0C] font-bold text-[12px]">
                            T
                          </div>
                          <span className="font-bold text-[15px] text-[#171A17]">Tradeon</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#087A4A] bg-[#E9FAF1] px-2 py-0.5 rounded-full">
                          Live Active
                        </span>
                      </div>

                      {/* Balance Card */}
                      <div className="mt-3 p-3.5 bg-[#FFFFFF] border border-[#CBCAC2] rounded-[16px] shadow-2xs">
                        <span className="text-[10px] font-bold uppercase text-[#6B6B63] tracking-wider block">
                          Total Portfolio
                        </span>
                        <div className="text-[22px] font-extrabold text-[#171A17] tabular-nums mt-0.5">
                          ₹4,82,640
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#0A7A45]">
                          <span>+₹6,840 today (+1.42%)</span>
                        </div>
                      </div>

                      {/* Quick Products list */}
                      <div className="mt-3 space-y-2">
                        <span className="text-[11px] font-bold text-[#6B6B63] uppercase block px-1">
                          Active Holdings
                        </span>
                        <div className="p-2.5 bg-white border border-[#E2E1DA] rounded-[12px] flex items-center justify-between text-[12px]">
                          <div>
                            <span className="font-bold text-[#171A17] block">Atlas Contract</span>
                            <span className="text-[10px] text-[#6B6B63]">60 units · ₹2,480</span>
                          </div>
                          <span className="font-bold text-[#0A7A45]">+2.84%</span>
                        </div>
                        <div className="p-2.5 bg-white border border-[#E2E1DA] rounded-[12px] flex items-center justify-between text-[12px]">
                          <div>
                            <span className="font-bold text-[#171A17] block">Orbit Contract</span>
                            <span className="text-[10px] text-[#6B6B63]">45 units · ₹3,890</span>
                          </div>
                          <span className="font-bold text-[#0A7A45]">+3.52%</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action inside preview */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setDeviceFrame('ios');
                          setCurrentView('app-dashboard');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full py-2.5 bg-[#1FC777] text-[#0C0F0C] font-bold text-[13px] rounded-[12px] text-center shadow-xs hover:bg-[#18B36A] transition-colors"
                      >
                        Enter Interactive iOS App →
                      </button>
                    </div>
                  </div>

                  {/* Home indicator bar */}
                  <div className="h-4 bg-white flex items-center justify-center shrink-0">
                    <div className="w-24 h-1 bg-[#171717]/40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
