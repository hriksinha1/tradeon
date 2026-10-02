/**
 * Tradeon Design System — Foundational Semantic Tokens
 * White Theme / Light Financial Trading Environment with Yellow Brand Accent (#F0B90B)
 * Mature Financial Product Design Language inspired by institutional trading platforms in light mode
 */

export const DESIGN_TOKENS = {
  name: 'Tradeon High-Density Trading System (White Theme)',
  brand: {
    primary: '#F0B90B',
    primaryHover: '#F8D12F',
    primaryActive: '#D9A900',
    textOnPrimary: '#181A20',
  },
  background: {
    app: '#FFFFFF',
    surface1: '#FFFFFF',
    surface2: '#F5F6F8',
    surface3: '#ECEFF2',
    elevated: '#FFFFFF',
  },
  text: {
    primary: '#181A20',
    secondary: '#474D57',
    tertiary: '#707A8A',
    disabled: '#B7BDC6',
    inverse: '#FFFFFF',
  },
  border: {
    subtle: '#EAECEF',
    default: '#DFE2E6',
    strong: '#CFD3D8',
    focus: '#F0B90B',
  },
  semantic: {
    positive: {
      base: '#02A063',
      strong: '#028753',
      subtle: '#EBFBF3',
    },
    negative: {
      base: '#CF304A',
      strong: '#B5263D',
      subtle: '#FDF0F2',
    },
    warning: {
      base: '#B78103',
      subtle: '#FEF9E7',
    },
    info: {
      base: '#0066CC',
      subtle: '#F0F6FF',
    },
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },
};

/** Backward compatibility alias */
export const BRAND_SYSTEM = DESIGN_TOKENS;

/**
 * Currency & Number Formatter (Indian Lakhs/Crores numbering or international notation)
 * e.g., ₹4,82,640 or +₹6,840.50
 */
export function formatINR(val: number, options?: { showSign?: boolean; decimals?: number }): string {
  if (isNaN(val)) return '₹0';
  const isNegative = val < 0;
  const absVal = Math.abs(val);
  const decimals = options?.decimals !== undefined ? options.decimals : (absVal < 10 && absVal % 1 !== 0 ? 2 : 0);
  
  const parts = absVal.toFixed(decimals).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1]}` : '';

  // Indian numbering pattern: last 3 digits, then groups of 2
  let lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  const fullNumber = `₹${formattedInteger}${decimalPart}`;

  if (options?.showSign && val > 0) {
    return `+${fullNumber}`;
  }
  if (isNegative) {
    return `-${fullNumber}`;
  }
  return fullNumber;
}

/**
 * Format numerical quantities
 */
export function formatUnits(units: number): string {
  return new Intl.NumberFormat('en-IN').format(units) + ' units';
}

/**
 * Format percentages with explicit + / - sign and colored indicator
 */
export function formatPercent(percent: number, options?: { showSign?: boolean; decimals?: number }): string {
  const decimals = options?.decimals ?? 2;
  const sign = percent > 0 && options?.showSign !== false ? '+' : '';
  return `${sign}${percent.toFixed(decimals)}%`;
}

/**
 * Format large volume (e.g. 1.25M, 840K, 2.4B)
 */
export function formatVolume(val: number): string {
  if (val >= 1000000000) return `${(val / 1000000000).toFixed(2)}B`;
  if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
  return val.toLocaleString('en-IN');
}
