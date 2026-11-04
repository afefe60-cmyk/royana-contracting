import React from "react";
import Link from "next/link";
import { Boxes, ShieldCheck, Layers, Sprout, Factory, Sun, ArrowLeft, ArrowRight } from "lucide-react";
import type { SecondaryService } from "@/types";

interface SecondarySectorsPreviewProps {
  sectors: SecondaryService[];
  locale: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Boxes: <Boxes className="w-6 h-6 text-[#00d2ff]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#00d2ff]" />,
  Layers: <Layers className="w-6 h-6 text-[#00d2ff]" />,
  Sprout: <Sprout className="w-6 h-6 text-[#00d2ff]" />,
  Factory: <Factory className="w-6 h-6 text-[#00d2ff]" />,
  Sun: <Sun className="w-6 h-6 text-[#00d2ff]" />,
};

export function SecondarySectorsPreview({
  sectors,
  locale,
}: SecondarySectorsPreviewProps) {
  const isAr = locale === "ar";

  return (
    <section className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
              {isAr ? "أنشطة وقطاعات إضافية" : "Additional Industrial & Trade Sectors"}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              {isAr
                ? "توريدات صناعية، لوجستية، وزراعية متخصصة"
                : "Specialized Industrial, Logistic & Agricultural Supplies"}
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isAr
                ? "حلول توريد وتجهيزات مخصصة للمصانع، المستودعات، والمنشآت التجارية والزراعية بجدة والمملكة."
                : "Custom procurement and supply solutions for factories, warehousing, and commercial ventures."}
            </p>
          </div>

          <Link
            href={`/${locale}/other-sectors`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00d2ff] hover:text-white transition-colors self-start md:self-end group"
          >
            <span>{isAr ? "استعراض كافة القطاعات" : "Browse All Sectors"}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sec) => (
            <Link
              key={sec.slug}
              href={`/${locale}/other-sectors/${sec.slug}`}
              className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 hover:-translate-y-1.5 backdrop-blur-md shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-sky-400/50 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all">
                  {iconMap[sec.icon] || <Boxes className="w-6 h-6 text-[#00d2ff]" />}
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00d2ff] transition-colors">
                  {isAr ? sec.title_ar : sec.title_en}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-normal">
                  {isAr ? sec.short_desc_ar : sec.short_desc_en}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00d2ff] pt-2 border-t border-sky-400/10">
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
