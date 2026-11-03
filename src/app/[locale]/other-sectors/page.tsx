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

  return {
    title: isAr
      ? "قطاعات التوريد والتجهيزات الصناعية والزراعية"
      : "Industrial, Warehousing & Agri-Supply Sectors",
    description: isAr
      ? "تصفح أنشطة التوريد المتخصصة لدى مؤسسة رؤيانا: طبالي خشبية ومعدنية وبلاستيكية، خطوط إنتاج المصانع، أنظمة الطاقة الشمسية، والمعدات الزراعية."
      : "Procurement and specialized supply services: wooden/steel/plastic pallets, production lines, solar power, and agricultural supplies.",
    alternates: {
      canonical: `https://royana.com.sa/${locale}/other-sectors`,
    },
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Boxes: <Boxes className="w-8 h-8 text-[#C68B59]" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-[#C68B59]" />,
  Layers: <Layers className="w-8 h-8 text-[#C68B59]" />,
  Sprout: <Sprout className="w-8 h-8 text-[#C68B59]" />,
  Factory: <Factory className="w-8 h-8 text-[#C68B59]" />,
  Sun: <Sun className="w-8 h-8 text-[#C68B59]" />,
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

      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs sm:text-sm font-bold text-[#C68B59] uppercase tracking-wider">
              {isAr ? "توريدات وحلول لوجستية وصناعية" : "Industrial & Procurement Sectors"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-[#0B192C]">
              {isAr ? "القطاعات الإضافية والتوريدات" : "Specialized Supply & Industrial Sectors"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {isAr
                ? "إلى جانب أعمال المقاولات العامة والإنشاءات، نوفر حلول توريد وتجهيز هندسي للقطاعات الصناعية والمستودعات والزراعية بجدة والمملكة."
                : "Alongside general contracting, we provide tailored supply and equipment integration for factories, logistics warehouses, and agricultural operations."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sec) => (
              <div
                key={sec.slug}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#C68B59] hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-2xs">
                    {iconMap[sec.icon] || <Boxes className="w-8 h-8 text-[#C68B59]" />}
                  </div>

                  <h2 className="text-xl font-bold text-[#0B192C] mb-3 group-hover:text-[#C68B59] transition-colors">
                    {isAr ? sec.title_ar : sec.title_en}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {isAr ? sec.short_desc_ar : sec.short_desc_en}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Link
                    href={`/${locale}/other-sectors/${sec.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0B192C] group-hover:text-[#C68B59] transition-colors"
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
