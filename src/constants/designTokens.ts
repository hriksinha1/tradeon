/**
 * CONFIDENTIAL · DESIGN FOUNDATION
 * Color Design System & Typography
 * Source of Truth: Meadow Green (#1FC777) & Warm Neutrals (#F7F6F2)
 */

export const BRAND_SYSTEM = {
  name: 'Meadow Green Design Foundation',
  primaryBrandColor: {
    name: 'Meadow Green',
    hex: '#1FC777',
    rgb: '31, 199, 119',
    hsl: '151°, 73%, 45%',
    accessibleVariant: '#087A4A', // Brand 700
    textOnBrandFill: '#0C0F0C', // Ink text (8.72:1 contrast)
  },
  palette: {
    brand: {
      50: '#E9FAF1', // Subtle highlight, selected background
      100: '#CFF3E0', // Tinted fills
      200: '#A2E8C5', // Decorative fills, light data series
      300: '#6EDBA5', // Data series, illustrations
      400: '#3ACF8B', // Accent on dark surfaces
      500: '#1FC777', // MAIN PRODUCTION BRAND COLOR
      600: '#12A560', // Pressed state, data lines (graphics only)
      700: '#087A4A', // Accessible brand: links, text, icons, focus
      800: '#0A603C', // Link hover, pressed text
      900: '#0B4E33', // Deep brand surfaces
      950: '#04231A', // Darkest brand tone
    },
    neutral: {
      0: '#FFFFFF', // Surfaces
      50: '#F7F6F2', // App background (warm off-white base)
      100: '#EFEEE9', // Secondary surface, dividers, inputs
      200: '#E2E1DA', // Subtle border, light outlines
      300: '#CBCAC2', // Default border, standard outlines
      400: '#A3A29A', // Disabled text
      500: '#6B6B63', // Tertiary text, placeholder
      600: '#5A5A53', // Secondary text
      700: '#40403B', // Strong secondary elements
      800: '#2A2A26', // Dark surfaces
      900: '#171A17', // Primary text, inverse surface
      950: '#0C0F0C', // Ink: text on brand fills
    },
    semantic: {
      success: {
        base: '#12A560',
        strong: '#0A7A45',
        subtle: '#E3F6EC',
      },
      error: {
        base: '#E5484D',
        strong: '#BF2A2A',
        subtle: '#FCE9E7',
      },
      warning: {
        base: '#C77700',
        strong: '#8A5A00',
        subtle: '#FFF3D6',
      },
      info: {
        base: '#2F80ED',
        strong: '#1B5FBF',
        subtle: '#E6EFFC',
      },
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
