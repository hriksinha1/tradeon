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
    <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0B90B] tracking-wider uppercase font-mono">
            <span className="size-1.5 rounded-full bg-[#F0B90B]" />
            Mobile Native Experience
          </div>
          <h1 className="text-[34px] sm:text-[48px] font-extrabold text-[#F5F5F5] tracking-tight leading-[1.08]">
            The product should feel complete, wherever you are.
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#848E9C] leading-relaxed">
            Crafted natively for Apple iOS and Google Android devices. With full portfolio parity, fluid order slips, and double-entry ledger verification right in your hand.
          </p>
        </div>

        {/* Hero Photo Banner */}
        <div className="relative rounded-[12px] overflow-hidden border border-[#2B3139] mb-12 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80"
            alt="Trading context on mobile"
            className="w-full h-[300px] sm:h-[400px] object-cover filter brightness-[0.8]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E11] via-[#0B0E11]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
            <span className="text-xs font-bold text-[#F0B90B] uppercase tracking-wider block mb-1 font-mono">
              Ergonomic Handheld Depth
            </span>
            <h2 className="text-[22px] sm:text-[28px] font-extrabold leading-snug">
              Every detail engineered for quick comprehension and decisive execution.
            </h2>
            <p className="text-xs sm:text-sm text-[#848E9C] mt-1.5 hidden sm:block">
              Whether placing a unit order on the go or checking running balances between meetings, the mobile experience retains desktop-class depth.
            </p>
          </div>
        </div>

        {/* Dual Platform Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* iOS Showcase */}
          <div className="bg-[#161A1E] border border-[#2B3139] hover:border-[#363C45] rounded-[10px] p-6 sm:p-7 shadow-sm transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#848E9C]">
                <span className="font-bold text-[#F5F5F5]">Apple iOS Edition</span>
                <span className="font-mono text-[#F0B90B]">iPhone 16 Pro Architecture</span>
              </div>

              <h2 className="text-[22px] font-bold text-[#F5F5F5] tracking-tight">
                Designed around Apple ergonomics
              </h2>

              <p className="text-[14px] text-[#848E9C] leading-relaxed">
                Dynamic Island order fill notifications, Face ID authentication, native SF typography, and fluid bottom-sheet order slips.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-[#B7BDC6]">
                  <CheckCircle2 className="w-4 h-4 text-[#0ECB81] shrink-0 mt-0.5" />
                  <span>Dynamic Island status updates for order fills and ledger deposits</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#B7BDC6]">
                  <CheckCircle2 className="w-4 h-4 text-[#0ECB81] shrink-0 mt-0.5" />
                  <span>Face ID authentication with hardware-backed secure storage</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#B7BDC6]">
                  <CheckCircle2 className="w-4 h-4 text-[#0ECB81] shrink-0 mt-0.5" />
                  <span>Native bottom-nav bar with thumb-zone trade drawer trigger</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2B3139]">
              <button
                onClick={() => launchSimulator('ios')}
                className="w-full py-3 bg-[#F0B90B] hover:bg-[#F8D12F] text-[#181A20] font-bold text-xs rounded-[6px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>Launch iPhone 16 Pro Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Android Showcase */}
          <div className="bg-[#161A1E] border border-[#2B3139] hover:border-[#363C45] rounded-[10px] p-6 sm:p-7 shadow-sm transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#848E9C]">
                <span className="font-bold text-[#F5F5F5]">Google Android Edition</span>
                <span className="font-mono text-[#F0B90B]">Pixel 9 Pro Architecture</span>
              </div>

              <h2 className="text-[22px] font-bold text-[#F5F5F5] tracking-tight">
                Material 3 Precision
              </h2>

              <p className="text-[14px] text-[#848E9C] leading-relaxed">
                Adaptive layout aware of punch-hole cameras, predictive back gestures, biometric fingerprint prompt, and instant UPI intent routing.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-[#B7BDC6]">
                  <CheckCircle2 className="w-4 h-4 text-[#0ECB81] shrink-0 mt-0.5" />
                  <span>Pixel 9 Pro camera notch accommodation with edge-to-edge content</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#B7BDC6]">
                  <CheckCircle2 className="w-4 h-4 text-[#0ECB81] shrink-0 mt-0.5" />
                  <span>Biometric prompt with hardware key security</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#B7BDC6]">
                  <CheckCircle2 className="w-4 h-4 text-[#0ECB81] shrink-0 mt-0.5" />
                  <span>Direct UPI app handoff with PhonePe, Google Pay, and Paytm</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2B3139]">
              <button
                onClick={() => launchSimulator('android')}
                className="w-full py-3 bg-[#1E2329] hover:bg-[#23282F] text-[#F5F5F5] hover:text-[#F0B90B] font-bold text-xs rounded-[6px] border border-[#2B3139] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Launch Pixel 9 Pro Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="bg-[#161A1E] border border-[#2B3139] rounded-[10px] p-6 sm:p-8 shadow-sm">
          <div className="max-w-2xl mb-6 space-y-1">
            <h3 className="text-[20px] font-bold text-[#F5F5F5]">
              Shared Engineering Standards
            </h3>
            <p className="text-xs text-[#848E9C]">
              Every native app build follows strict performance and data security budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#111418] rounded-[6px] border border-[#2B3139] space-y-1.5">
              <Zap className="w-4 h-4 text-[#F0B90B]" />
              <h4 className="font-bold text-[14px] text-[#F5F5F5]">Fluid Responsiveness</h4>
              <p className="text-xs text-[#848E9C] leading-relaxed">
                Responsive layouts and smooth interactive micro-transitions.
              </p>
            </div>

            <div className="p-4 bg-[#111418] rounded-[6px] border border-[#2B3139] space-y-1.5">
              <Shield className="w-4 h-4 text-[#F0B90B]" />
              <h4 className="font-bold text-[14px] text-[#F5F5F5]">Secure Storage</h4>
              <p className="text-xs text-[#848E9C] leading-relaxed">
                Local token protection with device-isolated authentication storage.
              </p>
            </div>

            <div className="p-4 bg-[#111418] rounded-[6px] border border-[#2B3139] space-y-1.5">
              <Bell className="w-4 h-4 text-[#F0B90B]" />
              <h4 className="font-bold text-[14px] text-[#F5F5F5]">Instant Alerts</h4>
              <p className="text-xs text-[#848E9C] leading-relaxed">
                Immediate delivery for order executions and wallet deposits.
              </p>
            </div>

            <div className="p-4 bg-[#111418] rounded-[6px] border border-[#2B3139] space-y-1.5">
              <Fingerprint className="w-4 h-4 text-[#F0B90B]" />
              <h4 className="font-bold text-[14px] text-[#F5F5F5]">Biometric Lock</h4>
              <p className="text-xs text-[#848E9C] leading-relaxed">
                Fingerprint and Face ID confirmation on high-value orders and withdrawals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
