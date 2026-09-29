import React from 'react';
import { HeroSection } from '../marketing/HeroSection';
import { ProductShowcaseSection } from '../marketing/ProductShowcaseSection';
import { FeaturesGridSection } from '../marketing/FeaturesGridSection';
import { MobileAppsShowcaseSection } from '../marketing/MobileAppsShowcaseSection';
import { PaymentsAndLedgerSection } from '../marketing/PaymentsAndLedgerSection';
import { MarketingFaqSection } from '../marketing/MarketingFaqSection';
import { MarketingFooter } from '../marketing/MarketingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#F7F6F2] text-[#171A17] min-h-screen">
      {/* 1. Hero with Live Platform Preview & Mobile Overlay */}
      <HeroSection />

      {/* 2. Listed Products & Marketplace Grid */}
      <ProductShowcaseSection />

      {/* 3. Core Principles & Platform Architecture */}
      <FeaturesGridSection />

      {/* 4. Native iOS 18 & Android 15 Mobile Showcase */}
      <MobileAppsShowcaseSection />

      {/* 5. Payments Gateway & Double-Entry Ledger */}
      <PaymentsAndLedgerSection />

      {/* 6. Frequently Asked Questions */}
      <MarketingFaqSection />

      {/* 7. Comprehensive Marketing Footer */}
      <MarketingFooter />
    </div>
  );
};
