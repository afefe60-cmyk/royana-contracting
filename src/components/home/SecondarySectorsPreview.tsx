import React from "react";
import Link from "next/link";
import { Boxes, ShieldCheck, Layers, Sprout, Factory, Sun, ArrowLeft, ArrowRight } from "lucide-react";
import type { SecondaryService } from "@/types";

interface SecondarySectorsPreviewProps {
  sectors: SecondaryService[];
  locale: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Boxes: <Boxes className="w-6 h-6 text-[#C68B59]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#C68B59]" />,
  Layers: <Layers className="w-6 h-6 text-[#C68B59]" />,
  Sprout: <Sprout className="w-6 h-6 text-[#C68B59]" />,
  Factory: <Factory className="w-6 h-6 text-[#C68B59]" />,
  Sun: <Sun className="w-6 h-6 text-[#C68B59]" />,
};

export function SecondarySectorsPreview({
  sectors,
  locale,
}: SecondarySectorsPreviewProps) {
  const isAr = locale === "ar";

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#C68B59] uppercase tracking-wider">
              {isAr ? "أنشطة وقطاعات إضافية" : "Additional Industrial & Trade Sectors"}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0B192C]">
              {isAr
                ? "توريدات صناعية، لوجستية، وزراعية متخصصة"
                : "Specialized Industrial, Logistic & Agricultural Supplies"}
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              {isAr
                ? "حلول توريد وتجهيزات مخصصة للمصانع، المستودعات، والمنشآت التجارية والزراعية بجدة والمملكة."
                : "Custom procurement and supply solutions for factories, warehousing, and commercial ventures."}
            </p>
          </div>

          <Link
            href={`/${locale}/other-sectors`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B192C] hover:text-[#C68B59] transition-colors self-start md:self-end"
          >
            <span>{isAr ? "استعراض كافة القطاعات" : "Browse All Sectors"}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sec) => (
            <Link
              key={sec.slug}
              href={`/${locale}/other-sectors/${sec.slug}`}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#C68B59] hover:bg-white hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {iconMap[sec.icon] || <Boxes className="w-6 h-6 text-[#C68B59]" />}
                </div>

                <h3 className="text-base font-bold text-[#0B192C] mb-2 group-hover:text-[#C68B59] transition-colors">
                  {isAr ? sec.title_ar : sec.title_en}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {isAr ? sec.short_desc_ar : sec.short_desc_en}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C68B59] pt-2">
                <span>{isAr ? "المواصفات والتطبيقات" : "Specs & Applications"}</span>
                {isAr ? (
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
