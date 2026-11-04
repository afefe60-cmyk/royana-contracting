import React from "react";
import { CheckCircle, ShieldCheck, Ruler, Clock } from "lucide-react";
import type { WhyUsItem } from "@/types";

interface WhyRoyanaSectionProps {
  whyUs: WhyUsItem[];
  locale: string;
}

const iconMap: Record<string, React.ReactNode> = {
  saudi_code: <ShieldCheck className="w-6 h-6 text-[#00d2ff]" />,
  site_supervision: <Ruler className="w-6 h-6 text-[#00d2ff]" />,
  work_warranty: <CheckCircle className="w-6 h-6 text-[#00d2ff]" />,
  schedule_commitment: <Clock className="w-6 h-6 text-[#00d2ff]" />,
};

export function WhyRoyanaSection({ whyUs, locale }: WhyRoyanaSectionProps) {
  const isAr = locale === "ar";
  const activeItems = whyUs.filter((item) => item.visible && item.title_ar);

  if (activeItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 text-white relative overflow-hidden bg-[#0d1728]/60 border-y border-sky-400/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
            {isAr ? "معايير الجودة والالتزام" : "Quality Benchmarks"}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white">
            {isAr
              ? "لماذا يختار العملاء مؤسسة رؤيانا؟"
              : "Why Clients Partner with Royana?"}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {isAr
              ? "التزامات هندسية قابلة للإثبات والقياس مدعومة بالضمان والمطابقة الرسمية."
              : "Verifiable engineering commitments backed by certified warranties."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 backdrop-blur-md transition-all duration-300 shadow-lg hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-sky-400/50 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.25)] transition-all">
                {iconMap[item.id] || <ShieldCheck className="w-6 h-6 text-[#00d2ff]" />}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#00d2ff] transition-colors">
                {isAr ? item.title_ar : item.title_en}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {isAr ? item.desc_ar : item.desc_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
