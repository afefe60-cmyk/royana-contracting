import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Boxes, ShieldCheck, Layers, Sprout, Factory, Sun, ArrowLeft, ArrowRight } from "lucide-react";
import { getSecondaryServices } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { FinalCTASection } from "@/components/home/FinalCTASection";

interface OtherSectorsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: OtherSectorsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr
    ? "توريد وتصنيع الطبالي الصناعية بجدة | خشبية، بلاستيكية، ومعدنية"
    : "Industrial Pallets Manufacturing & Supply in Jeddah";

  const description = isAr
    ? "توريد طبالي خشبية معالجة حرارياً ISPM 15، طبالي بلاستيكية مطابقة للغذاء والدواء SFDA، وطبالي حديد للأحمال الشاقة حتى 5 أطنان للمصانع والمستودعات بجدة."
    : "Turnkey supply of ISPM-15 heat-treated wooden pallets, SFDA plastic pallets, and heavy-duty steel pallets for Jeddah warehouses.";

  const shareImageUrl = "https://royana.com.sa/images/og-pallets.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `https://royana.com.sa/${locale}/other-sectors`,
    },
    openGraph: {
      title,
      description,
      url: `https://royana.com.sa/${locale}/other-sectors`,
      siteName: isAr ? "رؤيانا الحديثة للمقاولات والتوريدات" : "Royana Contracting & Supply",
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
  Boxes: <Boxes className="w-8 h-8 text-[#00d2ff]" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-[#00d2ff]" />,
  Layers: <Layers className="w-8 h-8 text-[#00d2ff]" />,
  Sprout: <Sprout className="w-8 h-8 text-[#00d2ff]" />,
  Factory: <Factory className="w-8 h-8 text-[#00d2ff]" />,
  Sun: <Sun className="w-8 h-8 text-[#00d2ff]" />,
};

export default async function OtherSectorsPage({ params }: OtherSectorsPageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const sectors = getSecondaryServices();

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "قطاعات أخرى" : "Other Sectors", url: `https://royana.com.sa/${locale}/other-sectors` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="bg-[#0d1728]/70 py-16 sm:py-20 border-b border-sky-400/15 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
              {isAr ? "توريدات وحلول لوجستية وصناعية" : "Industrial & Procurement Sectors"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-white">
              {isAr ? "القطاعات الإضافية والتوريدات" : "Specialized Supply & Industrial Sectors"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {isAr
                ? "إلى جانب أعمال المقاولات العامة والإنشاءات، نوفر حلول توريد وتجهيز هندسي للقطاعات الصناعية والمستودعات والزراعية بجدة والمملكة."
                : "Alongside general contracting, we provide tailored supply and equipment integration for factories, logistics warehouses, and agricultural operations."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sec) => (
              <div
                key={sec.slug}
                className="p-8 rounded-3xl bg-[#121e34]/75 border border-sky-400/15 hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 hover:-translate-y-1.5 backdrop-blur-md shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-sky-400/50 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.25)] transition-all">
                    {iconMap[sec.icon] || <Boxes className="w-8 h-8 text-[#00d2ff]" />}
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d2ff] transition-colors">
                    {isAr ? sec.title_ar : sec.title_en}
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {isAr ? sec.short_desc_ar : sec.short_desc_en}
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-400/10">
                  <Link
                    href={`/${locale}/other-sectors/${sec.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#00d2ff] group-hover:text-white transition-colors"
                  >
                    <span>{isAr ? "عرض المواصفات والصفحة المخصصة" : "View Detailed Page & Specs"}</span>
                    {isAr ? (
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Link>
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
