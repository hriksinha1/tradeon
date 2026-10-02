import React from 'react';

export interface BadgeProps {
  status: 'brand' | 'positive' | 'negative' | 'warning' | 'info' | 'neutral';
  label: string;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ status, label, className = '', dot = false }) => {
  const styles = {
    brand: 'text-[#F0B90B] bg-[#302A15] border border-[#F0B90B]/30',
    positive: 'text-[#0ECB81] bg-[#102A22] border border-[#0ECB81]/30',
    negative: 'text-[#F6465D] bg-[#301820] border border-[#F6465D]/30',
    warning: 'text-[#F0B90B] bg-[#302A15] border border-[#F0B90B]/30',
    info: 'text-[#4C8FFF] bg-[#18243A] border border-[#4C8FFF]/30',
    neutral: 'text-[#B7BDC6] bg-[#1E2329] border border-[#363C45]',
  };

  const dotColors = {
    brand: 'bg-[#F0B90B]',
    positive: 'bg-[#0ECB81]',
    negative: 'bg-[#F6465D]',
    warning: 'bg-[#F0B90B]',
    info: 'bg-[#4C8FFF]',
    neutral: 'bg-[#848E9C]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-[4px] whitespace-nowrap ${styles[status]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`} />}
      <span>{label}</span>
    </span>
  );
};
