import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Zap, ClipboardCheck, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getServices } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { FinalCTASection } from "@/components/home/FinalCTASection";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr
    ? "خدمات المقاولات العامة والترميم بجدة | كود البناء السعودي"
    : "General Contracting & Restoration Services in Jeddah";

  const description = isAr
    ? "تصفح خدمات مؤسسة رؤيانا للمقاولات بجدة: الإنشاءات والبناء، الترميم الشامل، شبكات الكهرباء والمياه، وإدارة المشاريع والإشراف الهندسي الميداني."
    : "Explore Royana Contracting services in Jeddah: construction, building restoration, MEP utilities, and engineering project management.";

  const shareImageUrl = "https://royana.com.sa/images/og-share.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `https://royana.com.sa/${locale}/services`,
    },
    openGraph: {
      title,
      description,
      url: `https://royana.com.sa/${locale}/services`,
      siteName: isAr ? "رؤيانا الحديثة للمقاولات" : "Royana Contracting",
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
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
      title,
      description,
      images: [shareImageUrl],
    },
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-10 h-10 text-[#00d2ff]" />,
  Zap: <Zap className="w-10 h-10 text-[#00d2ff]" />,
  ClipboardCheck: <ClipboardCheck className="w-10 h-10 text-[#00d2ff]" />,
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const services = getServices();

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "خدماتنا" : "Services", url: `https://royana.com.sa/${locale}/services` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="bg-[#0d1728]/70 py-16 sm:py-20 border-b border-sky-400/15 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
              {isAr ? "مجالات العمل التخصصية" : "Engineering Disciplines"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-white">
              {isAr
                ? "خدمات المقاولات والإنشاءات والترميم بجدة"
                : "Contracting, Construction & Restoration in Jeddah"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {isAr
                ? "نقدم حلولاً هندسية متكاملة مدعومة بإشراف ميداني مستمر، وضمان رسمي موثق على كافة الأعمال المنفذة وفق الكود السعودي."
                : "Delivering turnkey engineering solutions backed by resident on-site supervision and formal warranties compliant with the Saudi Building Code."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((srv, idx) => (
              <div
                key={srv.slug}
                className="p-8 sm:p-10 rounded-3xl bg-[#121e34]/75 border border-sky-400/15 hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 backdrop-blur-md transition-all shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-6">
                      {iconMap[srv.icon] || <Building2 className="w-10 h-10 text-[#00d2ff]" />}
                    </div>
                    <span className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider">
                      {isAr ? `الخدمة ${idx + 1}` : `Service 0${idx + 1}`}
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-1 mb-3">
                      {isAr ? srv.title_ar : srv.title_en}
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                      {isAr ? srv.short_desc_ar : srv.short_desc_en}
                    </p>
                    <Link
                      href={`/${locale}/services/${srv.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white font-extrabold text-sm shadow-[0_4px_15px_rgba(0,210,255,0.35)] hover:shadow-[0_6px_22px_rgba(0,210,255,0.5)] hover:-translate-y-0.5 transition-all"
                    >
                      <span>{isAr ? "نطاق العمل ومراحل التنفيذ" : "Detailed Scope & Process"}</span>
                      {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>
                  </div>

                  <div className="lg:col-span-8 bg-[#0d1728]/80 p-6 sm:p-8 rounded-2xl border border-sky-400/15 backdrop-blur-sm">
                    <h3 className="text-base font-bold text-white mb-4">
                      {isAr ? "ما يشمله نطاق الأعمال:" : "Included Scope of Work:"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(isAr ? srv.scope_ar : srv.scope_en).map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
