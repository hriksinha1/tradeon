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
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-[6px] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F0B90B] disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.98] cursor-pointer select-none';

  const sizeStyles = {
    xs: 'text-[12px] px-2.5 py-1 min-h-[28px]',
    sm: 'text-[13px] px-3.5 py-1.5 min-h-[32px]',
    md: 'text-[14px] px-4 py-2 min-h-[38px]',
    lg: 'text-[15px] px-5 py-2.5 min-h-[44px]',
  };

  const variantStyles = {
    primary:
      'bg-[#F0B90B] text-[#181A20] font-bold hover:bg-[#F8D12F] active:bg-[#D9A900] shadow-xs',
    secondary:
      'bg-[#1E2329] text-[#F5F5F5] border border-[#363C45] hover:bg-[#2B3139] hover:border-[#474F59] active:bg-[#161A1E]',
    dark:
      'bg-[#161A1E] text-[#F5F5F5] border border-[#2B3139] hover:bg-[#1E2329]',
    outline:
      'border border-[#363C45] bg-transparent text-[#F5F5F5] hover:bg-[#1E2329] hover:border-[#474F59]',
    ghost:
      'text-[#B7BDC6] hover:text-[#F5F5F5] hover:bg-[#1E2329]',
    positive:
      'bg-[#0ECB81] text-[#FFFFFF] font-bold hover:bg-[#02C076] active:bg-[#029B5F]',
    negative:
      'bg-[#F6465D] text-[#FFFFFF] font-bold hover:bg-[#F23645] active:bg-[#D02636]',
    buy:
      'bg-[#0ECB81] text-[#FFFFFF] font-bold hover:bg-[#02C076] active:bg-[#029B5F]',
    sell:
      'bg-[#F6465D] text-[#FFFFFF] font-bold hover:bg-[#F23645] active:bg-[#D02636]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
