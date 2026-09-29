import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'positive' | 'negative';
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
    'inline-flex items-center justify-center font-semibold rounded-[10px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A2E62] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.98] duration-150';

  const sizeStyles = {
    sm: 'text-[13px] px-3 py-1.5 min-h-[36px]',
    md: 'text-[14px] px-4 py-2 min-h-[42px]',
    lg: 'text-[15px] px-5 py-2.5 min-h-[48px]',
  };

  const variantStyles = {
    primary: 'bg-[#6A2E62] text-white hover:bg-[#56234F] shadow-sm',
    secondary: 'bg-[#F7EFF6] text-[#6A2E62] hover:bg-[#ECD6E9]',
    outline: 'border border-[#E7E5E4] bg-white text-[#171717] hover:bg-[#F5F5F4]',
    ghost: 'text-[#6B6B6B] hover:text-[#171717] hover:bg-[#F5F5F4]',
    positive: 'bg-[#16803C] text-white hover:bg-[#126630] shadow-sm',
    negative: 'bg-[#C62828] text-white hover:bg-[#A91F1F] shadow-sm',
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
