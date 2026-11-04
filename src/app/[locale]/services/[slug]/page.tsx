import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { getServices, getServiceBySlug } from "@/lib/content";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import {
  ServiceSchema,
  FAQSchema,
  BreadcrumbSchema,
} from "@/components/seo/SchemaScripts";

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const services = getServices();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of ["ar", "en"]) {
    for (const srv of services) {
      params.push({ locale, slug: srv.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: isAr ? "الخدمة غير موجودة" : "Service Not Found" };
  }

  const title = isAr ? service.title_ar : service.title_en;
  const description = isAr ? service.short_desc_ar : service.short_desc_en;

  const shareImageUrl = slug === "factory-equipment-installation"
    ? "https://royana.com.sa/images/projects/factory-installation/cover.jpg"
    : "https://royana.com.sa/images/og-share.jpg";

  return {
    title: `${title} في جدة | رؤيانا للمقاولات`,
    description,
    alternates: {
      canonical: `https://royana.com.sa/${locale}/services/${slug}`,
    },
    openGraph: {
      title: `${title} | مؤسسة رؤيانا للمقاولات`,
      description,
      url: `https://royana.com.sa/${locale}/services/${slug}`,
      siteName: isAr ? "رؤيانا الحديثة للمقاولات" : "Royana Contracting",
      locale: isAr ? "ar_SA" : "en_US",
      type: "article",
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | مؤسسة رؤيانا للمقاولات`,
      description,
      images: [shareImageUrl],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const title = isAr ? service.title_ar : service.title_en;
  const description = isAr ? service.short_desc_ar : service.short_desc_en;
  const scope = isAr ? service.scope_ar : service.scope_en;
  const steps = isAr ? service.steps_ar : service.steps_en;
  const faqs = isAr ? service.faqs_ar : service.faqs_en;

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "خدماتنا" : "Services", url: `https://royana.com.sa/${locale}/services` },
    { name: title, url: `https://royana.com.sa/${locale}/services/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        title={title}
        description={description}
        url={`https://royana.com.sa/${locale}/services/${slug}`}
      />
      <FAQSchema faqs={faqs} />

      {/* Header Banner */}
      <section className="bg-[#0d1728]/70 py-16 sm:py-20 border-b border-sky-400/15 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
              {isAr ? "خدمات المقاولات التخصصية" : "Specialized Contracting Services"}
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

      {/* Main Content & Quote Form Grid */}
      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Scope & Steps & FAQs (7 cols) */}
            <div className="lg:col-span-7 space-y-12">
              {/* Scope of Work */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {isAr ? "ما يشمله نطاق الأعمال:" : "Included Scope of Work:"}
                </h2>
                <div className="space-y-3.5 bg-[#121e34]/75 p-6 sm:p-8 rounded-3xl border border-sky-400/15 backdrop-blur-md shadow-xl">
                  {scope.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Steps */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {isAr ? "مراحل وخطوات التنفيذ:" : "Execution Process & Stages:"}
                </h2>
                <div className="space-y-4">
                  {steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-sky-400/15 bg-[#121e34]/75 backdrop-blur-md flex items-start gap-4 shadow-md"
                    >
                      <span className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-400/30 text-[#00d2ff] font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          {st.title}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed font-normal">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {isAr ? "الأسئلة الشائعة حول الخدمة:" : "Frequently Asked Questions:"}
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 backdrop-blur-md shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-base font-bold text-white mb-2">
                              {faq.q}
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed font-normal">
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

            {/* Right Column: Quick Quote Form (5 cols) */}
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
