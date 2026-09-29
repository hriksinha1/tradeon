import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Button } from '../common/Button';
import {
  Smartphone,
  CheckCircle2,
  Zap,
  Shield,
  Bell,
  Fingerprint,
  ArrowRight,
} from 'lucide-react';

export const MobileAppPage: React.FC = () => {
  const { setDeviceFrame, setCurrentView } = useTrading();

  const launchSimulator = (platform: 'ios' | 'android') => {
    setDeviceFrame(platform);
    setCurrentView('app-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F7F6F2] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header: "The product should feel complete, wherever you are." */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Mobile Native Experience
          </div>
          <h1 className="text-[38px] sm:text-[54px] font-extrabold text-[#171A17] tracking-tight leading-[1.08]">
            The product should feel complete, wherever you are.
          </h1>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            Crafted natively for Apple iOS and Google Android devices. With full portfolio parity, fluid order slips, and double-entry ledger verification right in your hand.
          </p>
        </div>

        {/* Large Editorial Hero Photo + Feature Banner */}
        <div className="relative rounded-[24px] overflow-hidden border border-[#CBCAC2] mb-14 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80"
            alt="Young professional reviewing trading context on mobile in a calm workspace"
            className="w-full h-[320px] sm:h-[440px] object-cover filter brightness-[0.97]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F0C]/80 via-[#0C0F0C]/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
            <span className="text-xs font-bold text-[#1FC777] uppercase tracking-wider block mb-1">
              Ergonomic Handheld Depth
            </span>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold leading-snug">
              Every detail engineered for quick comprehension and decisive execution.
            </h2>
            <p className="text-sm text-[#CBCAC2] mt-1.5 hidden sm:block">
              Whether placing a unit order on the go or checking running balances between meetings, the mobile experience retains desktop-class depth.
            </p>
          </div>
        </div>

        {/* Dual Platform Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* iOS Showcase */}
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] hover:border-[#1FC777] rounded-[24px] p-8 shadow-xs transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#5A5A53]">
                <span className="font-bold text-[#171A17]">Apple iOS Edition</span>
                <span className="font-mono">iPhone 16 Pro Architecture</span>
              </div>

              <h2 className="text-[26px] font-bold text-[#171A17] tracking-tight">
                Designed around Apple ergonomics
              </h2>

              <p className="text-[15px] text-[#5A5A53] leading-relaxed">
                Dynamic Island order fill notifications, Face ID authentication, native SF typography, and fluid bottom-sheet order slips.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Dynamic Island status updates for order fills and ledger deposits</span>
                </div>
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Face ID authentication with hardware-backed secure storage</span>
                </div>
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Native bottom-nav bar with thumb-zone trade drawer trigger</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFEEE9]">
              <button
                onClick={() => launchSimulator('ios')}
                className="w-full py-3.5 bg-[#1FC777] hover:bg-[#18B36A] text-[#0C0F0C] font-bold text-[14px] rounded-[12px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Launch iPhone 16 Pro Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Android Showcase */}
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] hover:border-[#1FC777] rounded-[24px] p-8 shadow-xs transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#5A5A53]">
                <span className="font-bold text-[#171A17]">Google Android Edition</span>
                <span className="font-mono">Pixel 9 Pro Architecture</span>
              </div>

              <h2 className="text-[26px] font-bold text-[#171A17] tracking-tight">
                Material Design 3 precision
              </h2>

              <p className="text-[15px] text-[#5A5A53] leading-relaxed">
                Adaptive layout aware of punch-hole cameras, predictive back gestures, biometric fingerprint prompt, and instant UPI intent routing.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Pixel 9 Pro camera notch accommodation with edge-to-edge content</span>
                </div>
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Biometric prompt with hardware key security</span>
                </div>
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Direct UPI app handoff with PhonePe, Google Pay, and Paytm</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFEEE9]">
              <button
                onClick={() => launchSimulator('android')}
                className="w-full py-3.5 bg-[#EFEEE9] hover:bg-[#E2E1DA] text-[#171A17] font-bold text-[14px] rounded-[12px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Launch Pixel 9 Pro Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] p-8 shadow-xs">
          <div className="max-w-2xl mb-8 space-y-1">
            <h3 className="text-[22px] font-bold text-[#171A17]">
              Shared Engineering Standards
            </h3>
            <p className="text-xs text-[#5A5A53]">
              Every native app build follows strict performance and data security budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-2">
              <Zap className="w-5 h-5 text-[#087A4A]" />
              <h4 className="font-bold text-[15px] text-[#171A17]">Fluid Responsiveness</h4>
              <p className="text-xs text-[#5A5A53] leading-relaxed">
                Responsive layouts and smooth interactive micro-transitions.
              </p>
            </div>

            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-2">
              <Shield className="w-5 h-5 text-[#087A4A]" />
              <h4 className="font-bold text-[15px] text-[#171A17]">Secure Storage</h4>
              <p className="text-xs text-[#5A5A53] leading-relaxed">
                Local token protection with device-isolated authentication storage.
              </p>
            </div>

            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-2">
              <Bell className="w-5 h-5 text-[#087A4A]" />
              <h4 className="font-bold text-[15px] text-[#171A17]">Instant Alerts</h4>
              <p className="text-xs text-[#5A5A53] leading-relaxed">
                Immediate delivery for order executions and wallet deposits.
              </p>
            </div>

            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-2">
              <Fingerprint className="w-5 h-5 text-[#087A4A]" />
              <h4 className="font-bold text-[15px] text-[#171A17]">Biometric Lock</h4>
              <p className="text-xs text-[#5A5A53] leading-relaxed">
                Fingerprint and Face ID confirmation on high-value orders and withdrawals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
