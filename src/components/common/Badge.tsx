import React from 'react';

export interface BadgeProps {
  status: 'brand' | 'positive' | 'negative' | 'warning' | 'info' | 'neutral';
  label: string;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ status, label, className = '', dot = false }) => {
  const statusStyles = {
    brand: 'bg-[#FEF6D8] text-[#946800] border-[#FCDD80]',
    positive: 'bg-[#EBFBF3] text-[#02A063] border-[#A2E8C6]',
    negative: 'bg-[#FDF0F2] text-[#CF304A] border-[#F7B5BE]',
    warning: 'bg-[#FEF9E7] text-[#B78103] border-[#FBE8A6]',
    info: 'bg-[#F0F6FF] text-[#0066CC] border-[#BDD8FF]',
    neutral: 'bg-[#F5F6F8] text-[#474D57] border-[#EAECEF]',
  };

  const dotColors = {
    brand: 'bg-[#F0B90B]',
    positive: 'bg-[#02A063]',
    negative: 'bg-[#CF304A]',
    warning: 'bg-[#B78103]',
    info: 'bg-[#0066CC]',
    neutral: 'bg-[#707A8A]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] border text-[11px] font-semibold font-mono ${statusStyles[status]} ${className}`}
    >
      {dot && <span className={`size-1.5 rounded-full ${dotColors[status]}`} />}
      <span>{label}</span>
    </span>
  );
};
