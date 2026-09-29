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
  Layers,
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
    <div className="bg-[#F7F6F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#087A4A] bg-[#E9FAF1] px-3.5 py-1 rounded-full border border-[#CFF3E0]">
            Native Mobile Architecture
          </span>
          <h1 className="text-[36px] sm:text-[48px] font-extrabold text-[#171A17] tracking-tight mt-3">
            iOS & Android Native Ecosystem
          </h1>
          <p className="mt-3 text-[17px] text-[#5A5A53]">
            Tradeon is engineered with true multi-platform consistency. Native performance, tailored design guidelines for Apple iOS 18 and Google Android 15 Material 3, and synchronized state management.
          </p>
        </div>

        {/* Comparison Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {/* iOS Card */}
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] hover:border-[#1FC777] rounded-[24px] p-8 shadow-xs transition-all flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F6F2] border border-[#E2E1DA] rounded-full text-[12px] font-bold text-[#171A17]">
                  <Smartphone className="w-3.5 h-3.5 text-[#087A4A]" />
                  <span>Apple iOS Architecture</span>
                </div>
                <span className="text-[11px] font-mono text-[#6B6B63]">Swift / SwiftUI Native</span>
              </div>

              <h2 className="text-[26px] font-bold text-[#171A17]">
                iPhone 16 Pro Edition
              </h2>

              <p className="text-[15px] text-[#5A5A53] leading-relaxed">
                Employs Apple Human Interface Guidelines with Dynamic Island live trading status, Face ID biometrics, SF Pro typography, and fluid bottom-sheet gestures.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-[13px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Dynamic Island integration for pending orders and trade confirmations</span>
                </div>
                <div className="flex items-start gap-2.5 text-[13px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Biometric Face ID authentication with secure enclave storage</span>
                </div>
                <div className="flex items-start gap-2.5 text-[13px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Apple Pay & UPI rapid payment sheets for zero-friction top-ups</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFEEE9]">
              <button
                onClick={() => launchSimulator('ios')}
                className="w-full py-3.5 bg-[#1FC777] hover:bg-[#18B36A] text-[#0C0F0C] font-bold text-[14px] rounded-[12px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Launch iPhone 16 Pro Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Android Card */}
          <div className="bg-[#FFFFFF] border border-[#CBCAC2] hover:border-[#1FC777] rounded-[24px] p-8 shadow-xs transition-all flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F6F2] border border-[#E2E1DA] rounded-full text-[12px] font-bold text-[#171A17]">
                  <Smartphone className="w-3.5 h-3.5 text-[#087A4A]" />
                  <span>Google Android Architecture</span>
                </div>
                <span className="text-[11px] font-mono text-[#6B6B63]">Kotlin / Jetpack Compose</span>
              </div>

              <h2 className="text-[26px] font-bold text-[#171A17]">
                Pixel 9 Pro Edition
              </h2>

              <p className="text-[15px] text-[#5A5A53] leading-relaxed">
                Follows Material Design 3 guidelines with adaptive layout, punch-hole camera accommodation, predictive back navigation, and edge-to-edge system gestures.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-[13px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Pixel 9 Pro punch-hole aware status bar layout</span>
                </div>
                <div className="flex items-start gap-2.5 text-[13px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Fingerprint biometric prompt with hardware-backed Keystore</span>
                </div>
                <div className="flex items-start gap-2.5 text-[13px] text-[#171A17]">
                  <CheckCircle2 className="w-4 h-4 text-[#12A560] shrink-0 mt-0.5" />
                  <span>Direct UPI Intent integration with PhonePe, GPay, and Paytm apps</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFEEE9]">
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

        {/* Feature Highlights Grid */}
        <div className="bg-[#FFFFFF] border border-[#CBCAC2] rounded-[24px] p-8 shadow-xs">
          <h3 className="text-[20px] font-bold text-[#171A17] mb-6">
            Shared Engineering Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
              <Zap className="w-6 h-6 text-[#1FC777] mb-2" />
              <h4 className="font-bold text-[15px] text-[#171A17]">60fps Visuals</h4>
              <p className="text-[13px] text-[#5A5A53] mt-1">
                Hardware-accelerated charts and fluid interactive micro-transitions.
              </p>
            </div>

            <div className="p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
              <Shield className="w-6 h-6 text-[#1FC777] mb-2" />
              <h4 className="font-bold text-[15px] text-[#171A17]">Encrypted Vault</h4>
              <p className="text-[13px] text-[#5A5A53] mt-1">
                Local token encryption with device-isolated authentication tokens.
              </p>
            </div>

            <div className="p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
              <Bell className="w-6 h-6 text-[#1FC777] mb-2" />
              <h4 className="font-bold text-[15px] text-[#171A17]">Push Delivery</h4>
              <p className="text-[13px] text-[#5A5A53] mt-1">
                Immediate APNs and FCM delivery for trade execution and price triggers.
              </p>
            </div>

            <div className="p-4 bg-[#F7F6F2] rounded-[14px] border border-[#E2E1DA]">
              <Fingerprint className="w-6 h-6 text-[#1FC777] mb-2" />
              <h4 className="font-bold text-[15px] text-[#171A17]">Biometric Lock</h4>
              <p className="text-[13px] text-[#5A5A53] mt-1">
                Re-authenticate for high-value buy/sell orders and withdrawal requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
