import { Hero } from "@/components/sections/hero";
import {
  ArticlesSection,
  CoursesSection,
  FinalCta,
  IntroSection,
  ServicesSection,
  ShopSection,
  SocialSection,
  TrustStrip,
  WhySection,
} from "@/components/sections/home";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <IntroSection />
      <ServicesSection />
      <CoursesSection />
      <ShopSection />
      <WhySection />
      <TestimonialsSection />
      <ArticlesSection />
      <SocialSection />
      <FinalCta />
    </>
  );
}
