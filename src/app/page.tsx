import { HeroSection } from "@/components/public/HeroSection";
import { PopularSpecialties } from "@/components/public/SpecialtyGrid";
import { PartnerLogos } from "@/components/public/PartnerLogos";
import { ValueProposition } from "@/components/public/ValueProposition";
import { FeaturedProviders } from "@/components/public/FeaturedProviders";
import { HowItWorksStrip } from "@/components/public/HowItWorksStrip";
import { CreateProfileCTA } from "@/components/public/CreateProfileCTA";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { specialtiesApi } from "@/lib/api";

export const revalidate = 604800; // 7 days ISR — on-demand revalidation handles freshness

export default async function HomePage() {
  const { data: featuredSpecialties } = await specialtiesApi.getFeatured();

  return (
    <>
      <HeroSection />
      <PopularSpecialties specialties={featuredSpecialties} />
      <ValueProposition />
      <FeaturedProviders />
      <HowItWorksStrip />
      <CreateProfileCTA />
      <PartnerLogos />
      <TestimonialsSection />
    </>
  );
}
