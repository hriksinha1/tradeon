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
  showIcon = false,
  className = '',
  pill = false,
}) => {
  const isPositive = value > 0;
  const isZero = value === 0;

  const formatted = `${isPositive ? '+' : ''}${value.toFixed(decimals)}%`;

  if (pill) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-bold font-mono tabular-nums ${
          isZero
            ? 'bg-[#F5F6F8] text-[#707A8A] border border-[#EAECEF]'
            : isPositive
            ? 'bg-[#EBFBF3] text-[#02A063] border border-[#A2E8C6]'
            : 'bg-[#FDF0F2] text-[#CF304A] border border-[#F7B5BE]'
        } ${className}`}
      >
        {showIcon && !isZero && (
          isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />
        )}
        <span>{formatted}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-0.5 font-bold font-mono tabular-nums ${
        isZero ? 'text-[#707A8A]' : isPositive ? 'text-[#02A063]' : 'text-[#CF304A]'
      } ${className}`}
    >
      {showIcon && !isZero && (
        isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />
      )}
      <span>{formatted}</span>
    </span>
  );
};
