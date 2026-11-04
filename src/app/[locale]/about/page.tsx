import React from "react";
import type { Metadata } from "next";
import { ShieldCheck, Target, Eye, Compass, Award, CheckCircle2 } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { FinalCTASection } from "@/components/home/FinalCTASection";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr
    ? "من نحن | مؤسسة رؤيانا الحديثة للمقاولات بجدة"
    : "About Us | Royana Modern Contracting";

  const description = isAr
    ? "تعرف على مؤسسة رؤيانا الحديثة للمقاولات بجدة، رؤيتنا، رسالتنا، قيمنا الهندسية، ومعايير الجودة المعتمدة وفق كود البناء السعودي."
    : "Learn about Royana Modern Contracting in Jeddah: our story, vision, mission, engineering values, and quality benchmarks.";

  const shareImageUrl = "https://royana.com.sa/images/og-share.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `https://royana.com.sa/${locale}/about`,
    },
    openGraph: {
      title,
      description,
      url: `https://royana.com.sa/${locale}/about`,
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

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const settings = getSiteSettings();

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "من نحن" : "About Us", url: `https://royana.com.sa/${locale}/about` },
  ];

  const values = [
    {
      title_ar: "الدقة الهندسية والامتثال",
      title_en: "Engineering Precision & Compliance",
      desc_ar: "الالتزام الصارم بالمخططات المعتمدة واشتراطات كود البناء السعودي لضمان سلامة المنشأة.",
      desc_en: "Rigorous adherence to certified architectural schematics and the Saudi Building Code.",
    },
    {
      title_ar: "الشفافية وجداول الكميات",
      title_en: "Transparency & Detailed BOQs",
      desc_ar: "وضوح تام في البنود والمواصفات والدفعات المرتبطة بنسب الإنجاز الفعلي دون أي تكاليف مستترة.",
      desc_en: "Complete clarity in itemized BOQs, material specs, and payments linked to inspected progress.",
    },
    {
      title_ar: "الالتزام بالجدول الزمني",
      title_en: "Timeline & Delivery Commitment",
      desc_ar: "تخطيط زمني دقيق وتوفير الفرق والعتاد اللازم لتسليم المشاريع في مواعيدها المتفق عليها.",
      desc_en: "Structured critical-path scheduling ensuring punctual delivery and project milestones.",
    },
    {
      title_ar: "السلامة المهنية وجودة المواد",
      title_en: "Safety & Material Integrity",
      desc_ar: "تطبيق أعلى معايير السلامة بمواقع العمل واختيار مواد مطابقة للهيئة السعودية للمواصفات (SASO).",
      desc_en: "Strict site health and safety standards using materials certified by Saudi Standards (SASO).",
    },
  ];

  const hasCredentials =
    settings.credentials.commercial_registration ||
    settings.credentials.vat_number ||
    settings.credentials.classification.grade ||
    (settings.credentials.documents && settings.credentials.documents.length > 0);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Banner */}
      <section className="bg-[#0d1728]/70 py-16 sm:py-20 border-b border-sky-400/15 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
              {isAr ? "نبذة عن المؤسسة" : "About the Establishment"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-white">
              {isAr
                ? "مؤسسة رؤيانا الحديثة للمقاولات"
                : "Royana Modern Contracting Establishment"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {isAr
                ? "مؤسسة مقاولات عامة سعودية مقرها جدة، تعمل برؤية هندسية واضحة تضع الجودة والسلامة والالتزام في مقدمة أولوياتها لبناء علاقات طويلة الأمد مع عملائنا وشركائنا."
                : "A Saudi general contracting establishment headquartered in Jeddah, operating with transparent engineering discipline prioritizing safety and lasting client trust."}
            </p>
          </div>
        </div>
      </section>

      {/* Story & Vision & Mission */}
      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
                {isAr ? "قصتنا ومنهجيتنا في العمل" : "Our Story & Operating Philosophy"}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                <p>
                  {isAr
                    ? "تأسست مؤسسة رؤيانا الحديثة للمقاولات في مدينة جدة لتكون الشريك الهندسي الموثوق لملاك العقارات والشركات والمصانع الباحثين عن الجودة العالية دون مساومة."
                    : "Royana Modern Contracting was established in Jeddah to serve as the dependable technical partner for property owners, corporations, and industrial facilities."}
                </p>
                <p>
                  {isAr
                    ? "من خلال فريق هندسي وفني متخصص، نجمع بين المعرفة العميقة ببيئة البناء الساحلية في جدة ومنطقة مكة، وتطبيق أحدث المعايير الإنشائية، مما يضمن كفاءة المنشآت وحمايتها المستدامة من العوامل البيئية."
                    : "Our specialized engineering cadres unite comprehensive familiarity with coastal construction factors in Jeddah with contemporary engineering standards."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Vision */}
              <div className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 backdrop-blur-md transition-all shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-[#00d2ff]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isAr ? "رؤيتنا" : "Our Vision"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {isAr
                    ? "أن نكون الخيار الأول في جدة ومنطقة مكة المكرمة لأعمال المقاولات والترميم التي تتطلب دقة هندسية عالية وموثوقية تنفيذية تامة."
                    : "To stand as the preferred contracting and restoration partner across Jeddah and Makkah Province, recognized for engineering rigor."}
                </p>
              </div>

              {/* Mission */}
              <div className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 backdrop-blur-md transition-all shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#00d2ff]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isAr ? "رسالتنا" : "Our Mission"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {isAr
                    ? "تقديم خدمات بناء وترميم متكاملة تحمي استثمارات عملائنا، وتلتزم بأعلى معايير الكود السعودي وضمان الأعمال المنفذة."
                    : "Delivering turnkey construction and restoration that safeguards investments, honoring the Saudi Building Code with certified warranties."}
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="pt-12 border-t border-sky-400/15">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
                {isAr ? "مبادئنا المهنية" : "Our Engineering Values"}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                {isAr ? "القيم التي توجه كل قرار هندسي نتخذه" : "Values Guiding Every Milestone We Execute"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 backdrop-blur-md shadow-xl transition-all"
                >
                  <h3 className="text-base font-bold text-white mb-2">
                    {isAr ? val.title_ar : val.title_en}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {isAr ? val.desc_ar : val.desc_en}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials & Documents */}
          {hasCredentials && (
            <div className="mt-16 pt-12 border-t border-sky-400/15">
              <h2 className="text-2xl font-bold text-white mb-6">
                {isAr ? "التراخيص والاعتمادات الرسمية" : "Official Licenses & Accreditations"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {settings.credentials.commercial_registration && (
                  <div className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 backdrop-blur-md">
                    <p className="text-xs text-slate-400 mb-1">{isAr ? "السجل التجاري" : "Commercial Registration"}</p>
                    <p className="text-lg font-bold text-[#00d2ff]">{settings.credentials.commercial_registration}</p>
                  </div>
                )}
                {settings.credentials.vat_number && (
                  <div className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 backdrop-blur-md">
                    <p className="text-xs text-slate-400 mb-1">{isAr ? "الرقم الضريبي" : "VAT Number"}</p>
                    <p className="text-lg font-bold text-[#00d2ff]">{settings.credentials.vat_number}</p>
                  </div>
                )}
                {settings.credentials.classification.grade && (
                  <div className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 backdrop-blur-md">
                    <p className="text-xs text-slate-400 mb-1">{isAr ? "تصنيف المقاولين" : "Contractor Classification"}</p>
                    <p className="text-lg font-bold text-[#00d2ff]">
                      {settings.credentials.classification.grade} - {settings.credentials.classification.field}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
