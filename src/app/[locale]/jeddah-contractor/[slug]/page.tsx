import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, HelpCircle } from "lucide-react";
import { getLocalSeoPages, getLocalSeoPageBySlug } from "@/lib/content";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import {
  FAQSchema,
  BreadcrumbSchema,
  LocalBusinessSchema,
} from "@/components/seo/SchemaScripts";

interface LocalSeoDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const pages = getLocalSeoPages();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of ["ar", "en"]) {
    for (const p of pages) {
      params.push({ locale, slug: p.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: LocalSeoDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const page = getLocalSeoPageBySlug(slug);

  if (!page) {
    return { title: isAr ? "الصفحة غير موجودة" : "Page Not Found" };
  }

  return {
    title: isAr ? page.meta_title_ar : page.meta_title_en,
    description: isAr ? page.meta_desc_ar : page.meta_desc_en,
    alternates: {
      canonical: `https://royana.com.sa/${locale}/jeddah-contractor/${slug}`,
    },
    openGraph: {
      title: isAr ? page.meta_title_ar : page.meta_title_en,
      description: isAr ? page.meta_desc_ar : page.meta_desc_en,
      url: `https://royana.com.sa/${locale}/jeddah-contractor/${slug}`,
    },
  };
}

export default async function LocalSeoDetailPage({
  params,
}: LocalSeoDetailPageProps) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const page = getLocalSeoPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const h1 = isAr ? page.h1_ar : page.h1_en;
  const intro = isAr ? page.intro_ar : page.intro_en;
  const keyPoints = isAr ? page.key_points_ar : page.key_points_en;
  const faqs = isAr ? page.faqs_ar : page.faqs_en;

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "مقاولات جدة" : "Jeddah Contracting", url: `https://royana.com.sa/${locale}/services` },
    { name: h1, url: `https://royana.com.sa/${locale}/jeddah-contractor/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <LocalBusinessSchema locale={locale} />

      {/* Header Banner */}
      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0B192C] text-xs font-bold text-[#C68B59] mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? "خدمات مخصصة لمحافظة جدة" : "Tailored for Jeddah Province"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B192C] leading-tight">
              {h1}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {intro}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Key Advantages & FAQs (7 cols) */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-[#0B192C] mb-6">
                  {isAr ? "مميزات التنفيذ مع مؤسسة رؤيانا بجدة:" : "Execution Highlights with Royana in Jeddah:"}
                </h2>
                <div className="space-y-4 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                  {keyPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-800">
                      <CheckCircle2 className="w-5 h-5 text-[#C68B59] flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local FAQs */}
              {faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0B192C] mb-6">
                    {isAr ? "الأسئلة الشائعة في مشاريع جدة:" : "Jeddah Contracting FAQs:"}
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-xl bg-slate-50 border border-slate-200"
                      >
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-[#C68B59] flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-base font-bold text-[#0B192C] mb-2">
                              {faq.q}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Quote Form (5 cols) */}
            <div className="lg:col-span-5 sticky top-28">
              <QuoteRequestForm
                locale={locale}
                defaultService={h1}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
