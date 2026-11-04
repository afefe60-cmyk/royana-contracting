import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, ShieldCheck, Building } from "lucide-react";
import { getSecondaryServices, getSecondaryServiceBySlug } from "@/lib/content";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { InteractiveGallery } from "@/components/ui/InteractiveGallery";

interface SectorDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const sectors = getSecondaryServices();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of ["ar", "en"]) {
    for (const sec of sectors) {
      params.push({ locale, slug: sec.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: SectorDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const sector = getSecondaryServiceBySlug(slug);

  if (!sector) {
    return { title: isAr ? "القطاع غير موجود" : "Sector Not Found" };
  }

  const title = isAr ? sector.title_ar : sector.title_en;
  const description = isAr ? sector.short_desc_ar : sector.short_desc_en;

  return {
    title: `${title} | مؤسسة رؤيانا`,
    description,
    alternates: {
      canonical: `https://royana.com.sa/${locale}/other-sectors/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://royana.com.sa/${locale}/other-sectors/${slug}`,
    },
  };
}

export default async function SectorDetailPage({
  params,
}: SectorDetailPageProps) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const sector = getSecondaryServiceBySlug(slug);

  if (!sector) {
    notFound();
  }

  const title = isAr ? sector.title_ar : sector.title_en;
  const description = isAr ? sector.short_desc_ar : sector.short_desc_en;
  const specs = isAr ? sector.specs_ar : sector.specs_en;
  const applications = isAr ? sector.applications_ar : sector.applications_en;

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "قطاعات أخرى" : "Other Sectors", url: `https://royana.com.sa/${locale}/other-sectors` },
    { name: title, url: `https://royana.com.sa/${locale}/other-sectors/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Header Banner */}
      <section className="bg-[#0d1728]/70 py-16 sm:py-20 border-b border-sky-400/15 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
              {isAr ? "توريدات وحلول قطاعية" : "Specialized Sector Supply"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-white">
              {title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Specs & Applications (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* Technical Specs */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#00d2ff]" />
                  <span>{isAr ? "المواصفات الفنية ومعايير الجودة:" : "Technical Specifications & Standards:"}</span>
                </h2>
                <div className="space-y-3.5 bg-[#121e34]/75 p-6 sm:p-8 rounded-3xl border border-sky-400/15 backdrop-blur-md shadow-xl">
                  {specs.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Applications */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Building className="w-6 h-6 text-[#00d2ff]" />
                  <span>{isAr ? "مجالات الاستخدام والتطبيقات:" : "Industry Applications & Use Cases:"}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {applications.map((app, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-sky-400/15 bg-[#121e34]/75 backdrop-blur-md shadow-md text-sm font-semibold text-slate-200 flex items-center gap-3"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.7)] flex-shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Products / Site Gallery */}
              {sector.images && sector.images.length > 0 && (
                <div className="pt-6 border-t border-sky-400/15">
                  <InteractiveGallery
                    images={sector.images}
                    title={isAr ? "معرض النماذج والصور الميدانية المعتمدة:" : "Authentic Product & Site Gallery:"}
                    badgeLabel={isAr ? "صور حقيقية موثقة" : "Verified Real Photos"}
                    isAr={isAr}
                  />
                </div>
              )}
            </div>

            {/* Quote Form Sidebar (5 cols) */}
            <div className="lg:col-span-5 sticky top-28">
              <QuoteRequestForm
                locale={locale}
                defaultService={title}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
