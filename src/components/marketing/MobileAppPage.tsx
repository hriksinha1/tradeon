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
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-semibold text-[#087A4A] tracking-wider uppercase">
            Mobile Native Architecture
          </div>
          <h1 className="text-[38px] sm:text-[50px] font-extrabold text-[#171A17] tracking-tight leading-[1.1]">
            The whole product in your hand.
          </h1>
          <p className="text-[18px] text-[#5A5A53] leading-relaxed">
            Engineered natively for Apple iOS 18 with Dynamic Island awareness and Google Android 15 with Material 3 fluidity. Never a web view masquerading as an app.
          </p>
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
                Dynamic Island live order confirmations, Face ID biometric authentication, native SF Symbols typography, and fluid bottom-sheet order slips.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Dynamic Island status updates for order fills and ledger deposits</span>
                </div>
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Face ID authentication with hardware-backed secure enclave</span>
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
                Adaptive layout aware of punch-hole cameras, predictive back gestures, fingerprint prompt integration, and instant UPI intent routing.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Pixel 9 Pro camera notch accommodation with edge-to-edge content</span>
                </div>
                <div className="flex items-start gap-2.5 text-[14px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Biometric prompt with hardware Keystore token isolation</span>
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
              <Zap className="w-5 h-5 text-[#1FC777]" />
              <h4 className="font-bold text-[15px] text-[#171A17]">60fps Performance</h4>
              <p className="text-xs text-[#5A5A53] leading-relaxed">
                Hardware-accelerated charts and fluid interactive micro-transitions.
              </p>
            </div>

            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-2">
              <Shield className="w-5 h-5 text-[#1FC777]" />
              <h4 className="font-bold text-[15px] text-[#171A17]">Encrypted Vault</h4>
              <p className="text-xs text-[#5A5A53] leading-relaxed">
                Local token encryption with device-isolated authentication storage.
              </p>
            </div>

            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-2">
              <Bell className="w-5 h-5 text-[#1FC777]" />
              <h4 className="font-bold text-[15px] text-[#171A17]">Sub-second Alerts</h4>
              <p className="text-xs text-[#5A5A53] leading-relaxed">
                Immediate APNs and FCM delivery for order fills and wallet settlements.
              </p>
            </div>

            <div className="p-5 bg-[#F7F6F2] rounded-[16px] border border-[#E2E1DA] space-y-2">
              <Fingerprint className="w-5 h-5 text-[#1FC777]" />
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
