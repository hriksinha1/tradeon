import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { deviceFrame, setDeviceFrame } = useTrading();

  if (deviceFrame === 'responsive') {
    return <div className="min-h-screen flex flex-col bg-white text-[#181A20]">{children}</div>;
  }

  const isIOS = deviceFrame === 'ios';

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-3 sm:p-6 select-none">
      {/* Device switcher floating bar */}
      <div className="mb-4 flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#DFE2E6] text-[#474D57] text-xs shadow-md">
        <button
          onClick={() => setDeviceFrame('responsive')}
          className="flex items-center gap-1.5 hover:text-[#181A20] font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Frame Mode</span>
        </button>
        <span className="text-[#DFE2E6]">|</span>
        <button
          onClick={() => setDeviceFrame('ios')}
          className={`font-semibold cursor-pointer ${isIOS ? 'text-[#181A20] font-bold' : 'text-[#707A8A] hover:text-[#181A20]'}`}
        >
          iPhone 16 Pro
        </button>
        <button
          onClick={() => setDeviceFrame('android')}
          className={`font-semibold cursor-pointer ${!isIOS ? 'text-[#181A20] font-bold' : 'text-[#707A8A] hover:text-[#181A20]'}`}
        >
          Pixel 9 Pro
        </button>
      </div>

      {/* Hardware Frame */}
      <div
        className={`relative w-full max-w-[390px] h-[844px] bg-white rounded-[48px] shadow-[0_0_0_10px_#DFE2E6,0_25px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col border border-[#CFD3D8]`}
      >
        {/* Device Status Bar */}
        <div className="h-11 bg-white px-7 flex items-center justify-between text-[#181A20] select-none text-[12px] font-semibold shrink-0 z-50 border-b border-[#EAECEF]">
          <span>09:41</span>
          {isIOS ? (
            // Dynamic Island
            <div className="w-24 h-6 bg-[#181A20] rounded-full absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-end px-2">
              <div className="w-2 h-2 rounded-full bg-[#363C45]" />
            </div>
          ) : (
            // Android punch hole
            <div className="w-3.5 h-3.5 bg-[#181A20] rounded-full absolute left-1/2 -translate-x-1/2 top-3.5" />
          )}
          <div className="flex items-center gap-1.5 text-[#181A20]">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Viewport Content */}
        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
          {children}
        </div>

        {/* Home Bar Indicator */}
        <div className="h-5 bg-white flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-[#181A20]/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
