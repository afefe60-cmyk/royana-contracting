import React from "react";
import {
  getSiteSettings,
  getServices,
  getProjects,
  getTestimonials,
  getSecondaryServices,
} from "@/lib/content";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { CoreServicesSection } from "@/components/home/CoreServicesSection";
import { IndustrialSectorsSection } from "@/components/home/IndustrialSectorsSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { ProcessStepsSection } from "@/components/home/ProcessStepsSection";
import { WhyRoyanaSection } from "@/components/home/WhyRoyanaSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SecondarySectorsPreview } from "@/components/home/SecondarySectorsPreview";
import { FinalCTASection } from "@/components/home/FinalCTASection";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const siteSettings = getSiteSettings();
  const services = getServices();
  const projects = getProjects();
  const testimonials = getTestimonials();
  const secondarySectors = getSecondaryServices();

  return (
    <>
      <HeroSection
        locale={locale}
        badges={siteSettings.badges}
        whatsappPhone={siteSettings.contact.whatsapp}
      />

      <StatsBar
        stats={siteSettings.stats}
        locale={locale}
      />

      <CoreServicesSection
        services={services}
        locale={locale}
      />

      <IndustrialSectorsSection
        locale={locale}
        whatsappPhone={siteSettings.contact.whatsapp}
      />

      <FeaturedProjectsSection
        projects={projects}
        locale={locale}
      />

      <ProcessStepsSection
        locale={locale}
      />

      <WhyRoyanaSection
        whyUs={siteSettings.why_us}
        locale={locale}
      />

      <TestimonialsSection
        testimonials={testimonials}
        locale={locale}
      />

      <SecondarySectorsPreview
        sectors={secondarySectors}
        locale={locale}
      />

      <FinalCTASection
        locale={locale}
        whatsappPhone={siteSettings.contact.whatsapp}
      />
    </>
  );
}
