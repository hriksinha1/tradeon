import React from 'react';

interface BadgeProps {
  status: 'brand' | 'positive' | 'negative' | 'warning' | 'info' | 'neutral';
  label: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, label, className = '' }) => {
  const styles = {
    brand: 'text-[#005EA8] bg-[#F0FAFF] border border-[#A2E8C5]',
    positive: 'text-[#0A7A45] bg-[#E3F6EC] border border-[#A2E8C5]',
    negative: 'text-[#BF2A2A] bg-[#FCE9E7] border border-[#E5484D]/30',
    warning: 'text-[#8A5A00] bg-[#FFF3D6] border border-[#C77700]/30',
    info: 'text-[#1B5FBF] bg-[#E6EFFC] border border-[#2F80ED]/30',
    neutral: 'text-[#5A5A53] bg-[#EFEEE9] border border-[#CBCAC2]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[12px] font-semibold rounded-full whitespace-nowrap ${styles[status]} ${className}`}
    >
      {label}
    </span>
  );
};
