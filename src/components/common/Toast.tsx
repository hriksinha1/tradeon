import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useTrading();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-white border border-[#DFE2E6] rounded-[8px] shadow-xl text-[#181A20] transition-all transform translate-y-0"
            role="status"
          >
            <div className="shrink-0 pt-0.5">
              {isSuccess && <CheckCircle2 className="size-4 text-[#02A063]" />}
              {isError && <AlertCircle className="size-4 text-[#CF304A]" />}
              {isWarning && <AlertCircle className="size-4 text-[#B78103]" />}
              {!isSuccess && !isError && !isWarning && <Info className="size-4 text-[#0066CC]" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#181A20]">{toast.title}</div>
              {toast.message && (
                <div className="text-[11px] text-[#707A8A] mt-0.5 leading-relaxed">
                  {toast.message}
                </div>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#B7BDC6] hover:text-[#181A20] p-0.5 rounded transition-colors cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
