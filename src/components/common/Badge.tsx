import React from 'react';

interface BadgeProps {
  status: 'positive' | 'negative' | 'warning' | 'info' | 'neutral';
  label: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, label, className = '' }) => {
  const styles = {
    positive: 'text-[#16803C] bg-[#ECFDF3] border border-[#A6F4C5]',
    negative: 'text-[#C62828] bg-[#FEF2F2] border border-[#FECDCA]',
    warning: 'text-[#B7791F] bg-[#FFFBEB] border border-[#FEDF89]',
    info: 'text-[#1D4ED8] bg-[#EFF6FF] border border-[#BFDBFE]',
    neutral: 'text-[#57534E] bg-[#F5F5F4] border border-[#E7E5E4]',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[12px] font-medium rounded-full whitespace-nowrap ${styles[status]} ${className}`}
    >
      {label}
    </span>
  );
};
