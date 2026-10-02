import React from 'react';
import { formatINR } from '../../constants/designTokens';

interface PriceDisplayProps {
  value: number;
  decimals?: number;
  showSign?: boolean;
  className?: string;
  colorCode?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  value,
  decimals,
  showSign = false,
  className = '',
  colorCode = false,
}) => {
  const isPositive = value > 0;
  const isZero = value === 0;

  let colorClass = 'text-[#181A20]';
  if (colorCode) {
    if (isPositive) colorClass = 'text-[#02A063]';
    else if (!isZero) colorClass = 'text-[#CF304A]';
  }

  return (
    <span className={`font-mono font-bold tabular-nums ${colorClass} ${className}`}>
      {formatINR(value, { showSign, decimals })}
    </span>
  );
};
