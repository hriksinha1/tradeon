import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PercentageChangeProps {
  value: number;
  decimals?: number;
  showIcon?: boolean;
  className?: string;
  pill?: boolean;
}

export const PercentageChange: React.FC<PercentageChangeProps> = ({
  value,
  decimals = 2,
  showIcon = true,
  className = '',
  pill = false,
}) => {
  const isPositive = value > 0;
  const isZero = value === 0;
  const sign = isPositive ? '+' : '';
  const formatted = `${sign}${value.toFixed(decimals)}%`;

  if (pill) {
    const bgClass = isPositive
      ? 'bg-[#102A22] text-[#0ECB81] border border-[#0ECB81]/30'
      : isZero
      ? 'bg-[#1E2329] text-[#B7BDC6] border border-[#363C45]'
      : 'bg-[#301820] text-[#F6465D] border border-[#F6465D]/30';

    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] text-[12px] font-semibold tabular-nums ${bgClass} ${className}`}
      >
        {showIcon && !isZero && (
          isPositive ? <TrendingUp className="w-3 h-3 shrink-0" /> : <TrendingDown className="w-3 h-3 shrink-0" />
        )}
        <span>{formatted}</span>
      </span>
    );
  }

  const textColor = isPositive ? 'text-[#0ECB81]' : isZero ? 'text-[#B7BDC6]' : 'text-[#F6465D]';

  return (
    <span className={`inline-flex items-center gap-1 font-semibold tabular-nums text-[13px] ${textColor} ${className}`}>
      {showIcon && !isZero && (
        isPositive ? <TrendingUp className="w-3.5 h-3.5 shrink-0" /> : <TrendingDown className="w-3.5 h-3.5 shrink-0" />
      )}
      <span>{formatted}</span>
    </span>
  );
};
