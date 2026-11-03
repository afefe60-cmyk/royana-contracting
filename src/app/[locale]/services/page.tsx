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

  return {
    title: isAr ? "خدمات المقاولات العامة والترميم" : "General Contracting & Restoration Services",
    description: isAr
      ? "تصفح خدمات مؤسسة رؤيانا للمقاولات بجدة: الإنشاءات والبناء، الترميم، شبكات الكهرباء والمياه، وإدارة المشاريع والاستشارات الهندسية."
      : "Explore Royana Contracting services in Jeddah: construction, building restoration, MEP utilities, and engineering project management.",
    alternates: {
      canonical: `https://royana.com.sa/${locale}/services`,
    },
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-10 h-10 text-[#C68B59]" />,
  Zap: <Zap className="w-10 h-10 text-[#C68B59]" />,
  ClipboardCheck: <ClipboardCheck className="w-10 h-10 text-[#C68B59]" />,
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

      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs sm:text-sm font-bold text-[#C68B59] uppercase tracking-wider">
              {isAr ? "مجالات العمل التخصصية" : "Engineering Disciplines"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-[#0B192C]">
              {isAr
                ? "خدمات المقاولات والإنشاءات والترميم بجدة"
                : "Contracting, Construction & Restoration in Jeddah"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {isAr
                ? "نقدم حلولاً هندسية متكاملة مدعومة بإشراف ميداني مستمر، وضمان رسمي موثق على كافة الأعمال المنفذة وفق الكود السعودي."
                : "Delivering turnkey engineering solutions backed by resident on-site supervision and formal warranties compliant with the Saudi Building Code."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((srv, idx) => (
              <div
                key={srv.slug}
                className="p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#C68B59] transition-all shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#0B192C] flex items-center justify-center mb-6">
                      {iconMap[srv.icon] || <Building2 className="w-10 h-10 text-[#C68B59]" />}
                    </div>
                    <span className="text-xs font-bold text-[#C68B59] uppercase tracking-wider">
                      {isAr ? `الخدمة ${idx + 1}` : `Service 0${idx + 1}`}
                    </span>
                    <h2 className="text-2xl font-bold text-[#0B192C] mt-1 mb-3">
                      {isAr ? srv.title_ar : srv.title_en}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {isAr ? srv.short_desc_ar : srv.short_desc_en}
                    </p>
                    <Link
                      href={`/${locale}/services/${srv.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C68B59] text-[#0B192C] font-bold text-sm hover:bg-[#B57B4B] transition-colors shadow-xs"
                    >
                      <span>{isAr ? "نطاق العمل ومراحل التنفيذ" : "Detailed Scope & Process"}</span>
                      {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>
                  </div>

                  <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-slate-200">
                    <h3 className="text-base font-bold text-[#0B192C] mb-4">
                      {isAr ? "ما يشمله نطاق الأعمال:" : "Included Scope of Work:"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(isAr ? srv.scope_ar : srv.scope_en).map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#C68B59] flex-shrink-0 mt-0.5" />
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
