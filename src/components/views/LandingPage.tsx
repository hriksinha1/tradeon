import React from 'react';
import { HeroSection } from '../marketing/HeroSection';
import { ProblemRecognitionSection } from '../marketing/ProblemRecognitionSection';
import { ProductShowcaseSection } from '../marketing/ProductShowcaseSection';
import { BuyJourneySection } from '../marketing/BuyJourneySection';
import { PaymentsAndLedgerSection } from '../marketing/PaymentsAndLedgerSection';
import { MobileAppsShowcaseSection } from '../marketing/MobileAppsShowcaseSection';
import { FeaturesGridSection } from '../marketing/FeaturesGridSection';
import { MarketingFaqSection } from '../marketing/MarketingFaqSection';
import { FinalCtaSection } from '../marketing/FinalCtaSection';
import { MarketingFooter } from '../marketing/MarketingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#F7F6F2] text-[#171A17] min-h-screen">
      {/* 1. Hero: Human Opening, Editorial Product Glimpses */}
      <HeroSection />

      {/* 2. Problem Recognition: "Most platforms give you the number. We want you to understand the number." */}
      <ProblemRecognitionSection />

      {/* 3. Product Discovery: "Start with curiosity." */}
      <ProductShowcaseSection />

      {/* 4. The Mental Journey: "What happens when you click Buy?" */}
      <BuyJourneySection />

      {/* 5. Payments & Ledger: "When you need to know where every rupee went." (High-Contrast Dark Section) */}
      <PaymentsAndLedgerSection />

      {/* 6. Native Mobile Story: "The whole product in your hand." */}
      <MobileAppsShowcaseSection />

      {/* 7. Product Principles Manifesto: What we believe trading interfaces should feel like */}
      <FeaturesGridSection />

      {/* 8. Straightforward FAQ Answers */}
      <MarketingFaqSection />

      {/* 9. Grounded Final CTA */}
      <FinalCtaSection />

      {/* 10. Comprehensive Footer with Disclaimers */}
      <MarketingFooter />
    </div>
  );
};
