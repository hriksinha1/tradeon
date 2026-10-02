import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useTrading();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const icon = {
          success: <CheckCircle2 className="w-4 h-4 text-[#0ECB81] shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-[#F6465D] shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-[#F0B90B] shrink-0" />,
          info: <Info className="w-4 h-4 text-[#4C8FFF] shrink-0" />,
        }[toast.type];

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-[#1E2329] border border-[#2B3139] rounded-[8px] shadow-2xl text-[#F5F5F5] animate-in slide-in-from-bottom-2 duration-150"
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-[#F5F5F5]">{toast.title}</h4>
              {toast.description && (
                <p className="text-[12px] text-[#848E9C] mt-0.5 leading-snug">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 text-[#848E9C] hover:text-[#F5F5F5] rounded-[4px] transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
