import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { deviceFrame, setDeviceFrame } = useTrading();

  if (deviceFrame === 'responsive') {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  const isIOS = deviceFrame === 'ios';

  return (
    <div className="min-h-screen bg-[#1E1B1E] flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Device switcher floating bar */}
      <div className="mb-4 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs">
        <button
          onClick={() => setDeviceFrame('responsive')}
          className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Frame Mode</span>
        </button>
        <span className="text-white/30">|</span>
        <button
          onClick={() => setDeviceFrame('ios')}
          className={`font-medium ${isIOS ? 'text-white underline' : 'text-white/60 hover:text-white'}`}
        >
          iPhone 16 Pro
        </button>
        <button
          onClick={() => setDeviceFrame('android')}
          className={`font-medium ${!isIOS ? 'text-white underline' : 'text-white/60 hover:text-white'}`}
        >
          Pixel 9 Pro
        </button>
      </div>

      {/* Hardware Frame */}
      <div
        className={`relative w-full max-w-[390px] h-[844px] bg-black rounded-[52px] shadow-[0_0_0_12px_#2E2A2E,0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col border border-white/10`}
      >
        {/* Device Status Bar */}
        <div className="h-11 bg-white px-7 flex items-center justify-between text-[#171717] select-none text-[12px] font-semibold shrink-0 z-50">
          <span>9:41</span>
          {isIOS ? (
            // Dynamic Island
            <div className="w-24 h-6 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-end px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-white/10" />
            </div>
          ) : (
            // Android punch hole
            <div className="w-3.5 h-3.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-3.5" />
          )}
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Device Screen Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#FAFAF9] flex flex-col relative">
          {children}
        </div>

        {/* Home Indicator / Gesture Bar */}
        <div className="h-6 bg-white shrink-0 flex items-center justify-center">
          <div className="w-32 h-1 bg-[#171717]/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};
