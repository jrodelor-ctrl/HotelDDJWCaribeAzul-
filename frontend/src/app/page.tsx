import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <AboutSection />
      <ServicesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <MetricsSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
