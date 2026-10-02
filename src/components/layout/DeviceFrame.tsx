import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { deviceFrame, setDeviceFrame } = useTrading();

  if (deviceFrame === 'responsive') {
    return <div className="min-h-screen flex flex-col bg-[#0B0E11] text-[#F5F5F5]">{children}</div>;
  }

  const isIOS = deviceFrame === 'ios';

  return (
    <div className="min-h-screen bg-[#07090C] flex flex-col items-center justify-center p-3 sm:p-6">
      {/* Device switcher floating bar */}
      <div className="mb-4 flex items-center gap-3 bg-[#161A1E] px-4 py-2 rounded-full border border-[#2B3139] text-[#B7BDC6] text-xs shadow-xl">
        <button
          onClick={() => setDeviceFrame('responsive')}
          className="flex items-center gap-1.5 hover:text-[#F0B90B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Frame Mode</span>
        </button>
        <span className="text-[#363C45]">|</span>
        <button
          onClick={() => setDeviceFrame('ios')}
          className={`font-semibold cursor-pointer ${isIOS ? 'text-[#F0B90B]' : 'text-[#848E9C] hover:text-[#F5F5F5]'}`}
        >
          iPhone 16 Pro
        </button>
        <button
          onClick={() => setDeviceFrame('android')}
          className={`font-semibold cursor-pointer ${!isIOS ? 'text-[#F0B90B]' : 'text-[#848E9C] hover:text-[#F5F5F5]'}`}
        >
          Pixel 9 Pro
        </button>
      </div>

      {/* Hardware Frame */}
      <div
        className={`relative w-full max-w-[390px] h-[844px] bg-[#0B0E11] rounded-[48px] shadow-[0_0_0_10px_#1E2329,0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col border border-[#2B3139]`}
      >
        {/* Device Status Bar */}
        <div className="h-11 bg-[#111418] px-7 flex items-center justify-between text-[#B7BDC6] select-none text-[12px] font-semibold shrink-0 z-50 border-b border-[#1E2329]/50">
          <span>09:41</span>
          {isIOS ? (
            // Dynamic Island
            <div className="w-24 h-6 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-end px-2 border border-[#2B3139]/40">
              <div className="w-2.5 h-2.5 rounded-full bg-[#161A1E]" />
            </div>
          ) : (
            // Android punch hole
            <div className="w-3.5 h-3.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-3.5 border border-[#2B3139]/40" />
          )}
          <div className="flex items-center gap-1.5 text-[#B7BDC6]">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Device Screen Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#0B0E11] text-[#F5F5F5] flex flex-col relative">
          {children}
        </div>

        {/* Home Indicator / Gesture Bar */}
        <div className="h-5 bg-[#111418] shrink-0 flex items-center justify-center">
          <div className="w-32 h-1 bg-[#474F59] rounded-full" />
        </div>
      </div>
    </div>
  );
};
