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
  const formatted = formatINR(value, { showSign, decimals });
  let colorClass = 'text-[#F5F5F5]';

  if (colorCode) {
    if (value > 0) colorClass = 'text-[#0ECB81]';
    else if (value < 0) colorClass = 'text-[#F6465D]';
  }

  return (
    <span className={`tabular-nums font-semibold ${colorClass} ${className}`}>
      {formatted}
    </span>
  );
};
