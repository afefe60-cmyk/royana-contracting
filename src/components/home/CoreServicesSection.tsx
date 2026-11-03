import React from "react";
import Link from "next/link";
import { Building2, Zap, ClipboardCheck, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Service } from "@/types";

interface CoreServicesSectionProps {
  services: Service[];
  locale: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-8 h-8 text-[#C68B59]" />,
  Zap: <Zap className="w-8 h-8 text-[#C68B59]" />,
  ClipboardCheck: <ClipboardCheck className="w-8 h-8 text-[#C68B59]" />,
};

export function CoreServicesSection({ services, locale }: CoreServicesSectionProps) {
  const isAr = locale === "ar";

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold text-[#C68B59] uppercase tracking-wider">
            {isAr ? "مجالات تخصصنا الأساسية" : "Our Core Disciplines"}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0B192C]">
            {isAr
              ? "حلول مقاولات هندسية متكاملة بجدة"
              : "Integrated Engineering Contracting in Jeddah"}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {isAr
              ? "نلبي متطلبات البناء والترميم وتأسيس الشبكات وفق معايير الجودة المعتمدة وبإشراف هندسي مباشر."
              : "Fulfilling structural, renovation, and utility requirements under direct engineering governance."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.slug}
              className="flex flex-col justify-between p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#C68B59] hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="w-16 h-16 rounded-xl bg-[#0B192C] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                  {iconMap[srv.icon] || <Building2 className="w-8 h-8 text-[#C68B59]" />}
                </div>

                <h3 className="text-xl font-bold text-[#0B192C] mb-3">
                  {isAr ? srv.title_ar : srv.title_en}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {isAr ? srv.short_desc_ar : srv.short_desc_en}
                </p>

                <div className="space-y-2.5 mb-8">
                  {(isAr ? srv.scope_ar : srv.scope_en).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#C68B59] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <Link
                  href={`/${locale}/services/${srv.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0B192C] group-hover:text-[#C68B59] transition-colors"
                >
                  <span>{isAr ? "تفاصيل الخدمة ونطاق العمل" : "View Service Scope"}</span>
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
  );
}
