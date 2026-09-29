import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useTrading();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const icon = {
          success: <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-[#C62828] shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-[#B7791F] shrink-0" />,
          info: <Info className="w-4 h-4 text-[#6A2E62] shrink-0" />,
        }[toast.type];

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-white border border-[#E7E5E4] rounded-[12px] shadow-lg text-[#171717] animate-in slide-in-from-bottom-2 duration-200"
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-semibold text-[#171717]">{toast.title}</h4>
              {toast.description && (
                <p className="text-[12px] text-[#6B6B6B] mt-0.5 leading-snug">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 text-[#8A8A8A] hover:text-[#171717] rounded-md transition-colors"
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
