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
    <div className="bg-[#F7F6F2] text-[#171A17] min-h-screen">
      {/* 01. Hero: Human Opening, Editorial Product Glimpses */}
      <HeroSection />

      {/* 02. Problem Recognition: "Most platforms show you the number. We want you to understand the number." with human photography */}
      <ProblemRecognitionSection />

      {/* 03. What Tradeon Is: "One place to discover products, act on them, and keep track of what happens next." */}
      <WhatTradeonIsSection />

      {/* 04. Product Discovery: "Start with curiosity." */}
      <ProductShowcaseSection />

      {/* 05. The Mental Journey: "What happens when you click Buy?" (6-step walkthrough) */}
      <BuyJourneySection />

      {/* 06. Options for Advanced Users: "More control when the decision gets more complex." */}
      <HomepageOptionsSection />

      {/* 07 & 08. Wallet, Payments & Ledger: "Moving money should never feel like a mystery" & "Later, you'll want to know where every rupee went." */}
      <PaymentsAndLedgerSection />

      {/* 09. Native Mobile Story: "The whole product in your hand." with lifestyle imagery & 4-step progression */}
      <MobileAppsShowcaseSection />

      {/* 10. Product Principles Manifesto: 5 principles (Clarity over clutter, Context before action, Visible consequences, Useful records, One product everywhere) */}
      <FeaturesGridSection />

      {/* 11. Security & Confidence: "Confidence comes from visibility, not vague promises." */}
      <HomepageSecuritySection />

      {/* 12. Straightforward FAQ Answers */}
      <MarketingFaqSection />

      {/* 13. Grounded Final CTA: "See where a clearer trading experience can take you." */}
      <FinalCtaSection />

      {/* 14. Comprehensive Footer with Disclaimers */}
      <MarketingFooter />
    </div>
  );
};
