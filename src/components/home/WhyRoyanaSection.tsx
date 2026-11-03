import React from "react";
import { CheckCircle, ShieldCheck, Ruler, Clock } from "lucide-react";
import type { WhyUsItem } from "@/types";

interface WhyRoyanaSectionProps {
  whyUs: WhyUsItem[];
  locale: string;
}

const iconMap: Record<string, React.ReactNode> = {
  saudi_code: <ShieldCheck className="w-6 h-6 text-[#C68B59]" />,
  site_supervision: <Ruler className="w-6 h-6 text-[#C68B59]" />,
  work_warranty: <CheckCircle className="w-6 h-6 text-[#C68B59]" />,
  schedule_commitment: <Clock className="w-6 h-6 text-[#C68B59]" />,
};

export function WhyRoyanaSection({ whyUs, locale }: WhyRoyanaSectionProps) {
  const isAr = locale === "ar";
  // Strict condition: only show items that are explicitly visible
  const activeItems = whyUs.filter((item) => item.visible && item.title_ar);

  // If no items are configured, completely hide the section
  if (activeItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#C68B59] uppercase tracking-wider">
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
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-[#C68B59] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-5 border border-slate-700">
                {iconMap[item.id] || <ShieldCheck className="w-6 h-6 text-[#C68B59]" />}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                {isAr ? item.title_ar : item.title_en}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAr ? item.desc_ar : item.desc_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
