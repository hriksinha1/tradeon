/**
 * Tradeon Design Foundation
 * Blue-led fintech system for marketing and trading surfaces
 * Source of truth: crisp neutrals, deep navy, and restrained semantic color
 */

export const BRAND_SYSTEM = {
  name: 'Tradeon Blue Fintech System',
  primaryBrandColor: {
    name: 'Tradeon Blue',
    hex: '#0070BA',
    rgb: '0, 112, 186',
    hsl: '204°, 100%, 36%',
    accessibleVariant: '#005EA8',
    textOnBrandFill: '#FFFFFF',
  },
  palette: {
    brand: {
      50: '#F0FAFF', 100: '#DFF6FF', 200: '#BFEAFF', 300: '#8EDCFF',
      400: '#60CDFF', 500: '#0070BA', 600: '#005EA8', 700: '#003087',
      800: '#00266B', 900: '#001B4D', 950: '#001126',
    },
    neutral: {
      0: '#FFFFFF', 25: '#FCFDFF', 50: '#F6F8FB', 100: '#EEF2F7',
      200: '#E1E7EF', 300: '#C8D1DD', 400: '#98A5B5', 500: '#657386',
      600: '#4B5A6D', 700: '#344256', 800: '#1E2B3B', 900: '#101828', 950: '#07111F',
    },
    semantic: {
      success: { base: '#16803C', strong: '#11632F', subtle: '#E8F7EE' },
      error: { base: '#C62828', strong: '#A61F1F', subtle: '#FDECEC' },
      warning: { base: '#A15C00', strong: '#804900', subtle: '#FFF4DB' },
      info: { base: '#0069C0', strong: '#00549A', subtle: '#E8F4FF' },
    },
  },
  typographyScale: [
    { token: 'Display', size: '56px - 72px', weight: 700, lineHeight: '1.08', letterSpacing: '-0.025em', usage: 'Marketing hero headline' },
    { token: 'H1', size: '48px - 64px', weight: 700, lineHeight: '1.12', letterSpacing: '-0.02em', usage: 'Major page titles' },
    { token: 'H2', size: '36px - 48px', weight: 700, lineHeight: '1.18', letterSpacing: '-0.015em', usage: 'Section headings' },
    { token: 'H3', size: '24px - 30px', weight: 600, lineHeight: '1.25', letterSpacing: '-0.01em', usage: 'Card titles & feature headers' },
    { token: 'Body Large', size: '18px - 20px', weight: 400, lineHeight: '1.5', letterSpacing: '0', usage: 'Lead paragraphs & intros' },
    { token: 'Body', size: '16px - 18px', weight: 400, lineHeight: '1.55', letterSpacing: '0', usage: 'Standard marketing copy' },
    { token: 'Small', size: '14px', weight: 400, lineHeight: '1.5', letterSpacing: '0.005em', usage: 'Secondary details & captions' },
    { token: 'Caption', size: '12px - 13px', weight: 500, lineHeight: '1.4', letterSpacing: '0.01em', usage: 'Timestamps & footnotes' },
    { token: 'Button', size: '15px - 16px', weight: 600, lineHeight: '1.2', letterSpacing: '0.005em', usage: 'Primary and secondary CTAs' },
  ],
  radius: {
    button: '10px',
    input: '10px',
    card: '16px',
    largeCard: '20px',
  },
};

/**
 * Indian Number & Currency Formatter
 * E.g., ₹4,82,640 or +₹6,840
 */
export function formatINR(val: number, options?: { showSign?: boolean; decimals?: number }): string {
  const isNegative = val < 0;
  const absVal = Math.abs(val);
  const decimals = options?.decimals !== undefined ? options.decimals : 0;
  
  const parts = absVal.toFixed(decimals).split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1]}` : '';

  // Indian numbering: last 3 digits, then groups of 2
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

export function formatUnits(units: number): string {
  return new Intl.NumberFormat('en-IN').format(units) + ' units';
}
