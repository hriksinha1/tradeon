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
    'inline-flex items-center justify-center font-bold rounded-[10px] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087A4A] disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.98] duration-150 cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-[13px] px-3.5 py-1.5 min-h-[38px]',
    md: 'text-[15px] px-5 py-2.5 min-h-[44px]',
    lg: 'text-[16px] px-6 py-3 min-h-[50px]',
  };

  const variantStyles = {
    // Primary: Meadow Green #1FC777 with Ink text #0C0F0C (8.72:1 contrast per PDF specification)
    primary:
      'bg-[#1FC777] text-[#0C0F0C] hover:bg-[#18B36A] active:bg-[#12A560] shadow-[0_1px_2px_rgba(0,0,0,0.06)]',
    secondary:
      'bg-[#E9FAF1] text-[#087A4A] hover:bg-[#CFF3E0] active:bg-[#A2E8C5]',
    dark:
      'bg-[#171A17] text-[#FFFFFF] hover:bg-[#2A2A26] active:bg-[#40403B] shadow-sm',
    outline:
      'border border-[#CBCAC2] bg-white text-[#171717] hover:bg-[#EFEEE9] hover:border-[#8F8E85]',
    ghost:
      'text-[#5A5A53] hover:text-[#171717] hover:bg-[#EFEEE9]',
    positive:
      'bg-[#12A560] text-white hover:bg-[#0A7A45]',
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
