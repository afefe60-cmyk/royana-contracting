import React from "react";
import Link from "next/link";
import { Building2, Zap, ClipboardCheck, ArrowLeft, ArrowRight, CheckCircle2, Calculator, Factory } from "lucide-react";
import type { Service } from "@/types";

interface CoreServicesSectionProps {
  services: Service[];
  locale: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-7 h-7 text-[#00d2ff]" />,
  Zap: <Zap className="w-7 h-7 text-[#00d2ff]" />,
  ClipboardCheck: <ClipboardCheck className="w-7 h-7 text-[#00d2ff]" />,
  Calculator: <Calculator className="w-7 h-7 text-[#00d2ff]" />,
  Factory: <Factory className="w-7 h-7 text-[#00d2ff]" />,
};

export function CoreServicesSection({ services, locale }: CoreServicesSectionProps) {
  const isAr = locale === "ar";

  return (
    <section className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
            {isAr ? "مجالات تخصصنا الأساسية" : "Our Core Disciplines"}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white">
            {isAr
              ? "حلول مقاولات هندسية متكاملة بجدة"
              : "Integrated Engineering Contracting in Jeddah"}
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            {isAr
              ? "نلبي متطلبات البناء والترميم وتأسيس الشبكات وفق معايير الجودة المعتمدة وبإشراف هندسي مباشر."
              : "Fulfilling structural, renovation, and utility requirements under direct engineering governance."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.slug}
              className="flex flex-col justify-between p-8 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 group-hover:border-sky-400/50 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.25)] transition-all">
                  {iconMap[srv.icon] || <Building2 className="w-7 h-7 text-[#00d2ff]" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d2ff] transition-colors">
                  {isAr ? srv.title_ar : srv.title_en}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {isAr ? srv.short_desc_ar : srv.short_desc_en}
                </p>

                <div className="space-y-2.5 mb-8">
                  {(isAr ? srv.scope_ar : srv.scope_en).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/${locale}/services/${srv.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00d2ff] hover:text-white transition-colors pt-4 border-t border-sky-400/10"
              >
                <span>{isAr ? "تفاصيل الخدمة ونطاق العمل" : "View Service Scope"}</span>
                {isAr ? (
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
