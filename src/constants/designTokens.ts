/**
 * Design Tokens & Brand System
 * Primary Brand Color: #6A2E62 (Plum)
 * Typography: League Spartan (Single cohesive type family) + Monospace/Tabular numerals
 */

export const BRAND_SYSTEM = {
  name: 'Aura Design System',
  brandColorHex: '#6A2E62',
  accessibleVariants: {
    darkTextOnWhite: '#6A2E62',
    whiteOnBrand: '#FFFFFF',
    subtleBg: '#F7EFF6',
    border: '#ECD6E9',
  },
  palette: {
    brand: {
      50: '#FAF4F9',
      100: '#F3E5F1',
      200: '#E7CDE3',
      300: '#D5A8CF',
      400: '#BD7BB4',
      500: '#6A2E62', // Primary
      600: '#5C2755',
      700: '#4D2047',
      800: '#3F1A3A',
      900: '#341630',
      950: '#200B1D',
    },
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAF9', // App canvas background
      100: '#F5F5F4', // Secondary surfaces
      200: '#E7E5E4', // Borders
      300: '#D6D3D1',
      400: '#A8A29E',
      500: '#78716C',
      600: '#57534E',
      700: '#44403C',
      800: '#292524',
      900: '#1C1917',
      950: '#0C0A09',
    },
    semantic: {
      positive: '#16803C',
      positiveBg: '#ECFDF3',
      positiveBorder: '#A6F4C5',
      negative: '#C62828',
      negativeBg: '#FEF2F2',
      negativeBorder: '#FECDCA',
      warning: '#B7791F',
      warningBg: '#FFFBEB',
      warningBorder: '#FEDF89',
      info: '#1D4ED8',
      infoBg: '#EFF6FF',
      infoBorder: '#BFDBFE',
    },
  },
  typographyScale: [
    { token: 'H1', size: '26px', weight: 700, lineHeight: '32px', letterSpacing: '-0.02em', usage: 'Major page titles' },
    { token: 'H2', size: '22px', weight: 700, lineHeight: '28px', letterSpacing: '-0.015em', usage: 'Section titles & hero metrics' },
    { token: 'H3', size: '19px', weight: 600, lineHeight: '24px', letterSpacing: '-0.01em', usage: 'Card titles & modal headers' },
    { token: 'H4', size: '16px', weight: 600, lineHeight: '21px', letterSpacing: '-0.005em', usage: 'Group headings & sub-headers' },
    { token: 'Body Large', size: '17px', weight: 400, lineHeight: '25px', letterSpacing: '0', usage: 'Lead paragraphs & hero copy' },
    { token: 'Body', size: '15px', weight: 400, lineHeight: '22px', letterSpacing: '0', usage: 'Standard interface copy' },
    { token: 'Body Small', size: '13px', weight: 400, lineHeight: '19px', letterSpacing: '0.005em', usage: 'Secondary details & captions' },
    { token: 'Body Small Medium', size: '13px', weight: 500, lineHeight: '19px', letterSpacing: '0.005em', usage: 'Data labels & interactive items' },
    { token: 'Label', size: '14px', weight: 600, lineHeight: '18px', letterSpacing: '0.01em', usage: 'Form labels & table headers' },
    { token: 'Label Small', size: '12px', weight: 600, lineHeight: '16px', letterSpacing: '0.01em', usage: 'Compact tags & badges' },
    { token: 'Caption', size: '12px', weight: 400, lineHeight: '16px', letterSpacing: '0.01em', usage: 'Timestamps & footnotes' },
    { token: 'Metadata', size: '12px', weight: 500, lineHeight: '16px', letterSpacing: '0.02em', usage: 'Unit counts & reference codes' },
    { token: 'Button', size: '15px', weight: 600, lineHeight: '20px', letterSpacing: '0.005em', usage: 'CTA & action buttons' },
    { token: 'Navigation', size: '11px', weight: 600, lineHeight: '14px', letterSpacing: '0.02em', usage: 'Mobile bottom nav & compact labels' },
  ],
  radius: {
    button: '10px',
    input: '10px',
    card: '16px',
    panel: '20px',
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
