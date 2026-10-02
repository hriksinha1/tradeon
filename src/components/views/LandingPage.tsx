import React from 'react';
import { HeroSection } from '../marketing/HeroSection';
import { ProblemRecognitionSection } from '../marketing/ProblemRecognitionSection';
import { WhatTradeonIsSection } from '../marketing/WhatTradeonIsSection';
import { ProductShowcaseSection } from '../marketing/ProductShowcaseSection';
import { BuyJourneySection } from '../marketing/BuyJourneySection';
import { HomepageOptionsSection } from '../marketing/HomepageOptionsSection';
import { PaymentsAndLedgerSection } from '../marketing/PaymentsAndLedgerSection';
import { MobileAppsShowcaseSection } from '../marketing/MobileAppsShowcaseSection';
import { FeaturesGridSection } from '../marketing/FeaturesGridSection';
import { HomepageSecuritySection } from '../marketing/HomepageSecuritySection';
import { MarketingFaqSection } from '../marketing/MarketingFaqSection';
import { FinalCtaSection } from '../marketing/FinalCtaSection';
import { MarketingFooter } from '../marketing/MarketingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#0B0E11] text-[#F5F5F5] min-h-screen selection:bg-[#F0B90B] selection:text-[#181A20]">
      {/* 01. Hero: Human Opening, Editorial Product Glimpses */}
      <HeroSection />

      {/* 02. Problem Recognition: Understanding the number */}
      <ProblemRecognitionSection />

      {/* 03. What Tradeon Is: One place to discover, act, track */}
      <WhatTradeonIsSection />

      {/* 04. Product Discovery */}
      <ProductShowcaseSection />

      {/* 05. The Mental Journey: What happens when you click Buy? */}
      <BuyJourneySection />

      {/* 06. Options for Advanced Users: Structured trading with defined risk */}
      <HomepageOptionsSection />

      {/* 07 & 08. Wallet, Payments & Ledger */}
      <PaymentsAndLedgerSection />

      {/* 09. Native Mobile Story */}
      <MobileAppsShowcaseSection />

      {/* 10. Product Principles Manifesto */}
      <FeaturesGridSection />

      {/* 11. Security & Confidence */}
      <HomepageSecuritySection />

      {/* 12. Straightforward FAQ Answers */}
      <MarketingFaqSection />

      {/* 13. Grounded Final CTA */}
      <FinalCtaSection />

      {/* 14. Comprehensive Footer with Disclaimers */}
      <MarketingFooter />
    </div>
  );
};
