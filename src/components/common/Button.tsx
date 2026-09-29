import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost' | 'positive' | 'negative';
  size?: 'sm' | 'md' | 'lg';
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
    'inline-flex items-center justify-center font-bold rounded-[10px] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0070BA] disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.98] duration-150 cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-[13px] px-3.5 py-1.5 min-h-[38px]',
    md: 'text-[15px] px-5 py-2.5 min-h-[44px]',
    lg: 'text-[16px] px-6 py-3 min-h-[50px]',
  };

  const variantStyles = {
    primary:
      'bg-[#0070BA] text-white hover:bg-[#005EA8] active:bg-[#003087] shadow-[0_1px_2px_rgba(0,0,0,0.06)]',
    secondary:
      'bg-[#F0FAFF] text-[#005EA8] hover:bg-[#DFF6FF] active:bg-[#BFEAFF]',
    dark:
      'bg-[#171A17] text-[#FFFFFF] hover:bg-[#2A2A26] active:bg-[#40403B] shadow-sm',
    outline:
      'border border-[#C8D1DD] bg-white text-[#101828] hover:bg-[#F6F8FB] hover:border-[#98A5B5]',
    ghost:
      'text-[#657386] hover:text-[#101828] hover:bg-[#EEF2F7]',
    positive:
      'bg-[#16803C] text-white hover:bg-[#0A7A45]',
    negative:
      'bg-[#E5484D] text-white hover:bg-[#BF2A2A]',
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
