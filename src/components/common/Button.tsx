import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost' | 'positive' | 'negative' | 'buy' | 'sell';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-bold tracking-tight rounded-[6px] transition-all cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeClasses = {
    xs: 'text-[11px] py-1 px-2.5 gap-1',
    sm: 'text-xs py-1.5 px-3 gap-1.5',
    md: 'text-xs py-2 px-4 gap-2',
    lg: 'text-sm py-2.5 px-5 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[#F0B90B] hover:bg-[#F8D12F] text-[#181A20] font-bold shadow-xs border border-[#E5A800]',
    secondary:
      'bg-[#F5F6F8] hover:bg-[#EAECEF] text-[#181A20] border border-[#DFE2E6]',
    dark:
      'bg-[#181A20] hover:bg-[#2B3139] text-white border border-[#181A20]',
    outline:
      'bg-white hover:bg-[#F5F6F8] text-[#181A20] border border-[#DFE2E6]',
    ghost:
      'bg-transparent hover:bg-[#F5F6F8] text-[#474D57] hover:text-[#181A20]',
    positive:
      'bg-[#02A063] hover:bg-[#028753] text-white font-bold shadow-xs',
    negative:
      'bg-[#CF304A] hover:bg-[#B5263D] text-white font-bold shadow-xs',
    buy:
      'bg-[#02A063] hover:bg-[#028753] text-white font-bold shadow-xs',
    sell:
      'bg-[#CF304A] hover:bg-[#B5263D] text-white font-bold shadow-xs',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
