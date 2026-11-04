import React from "react";
import { FileSearch, Calculator, FileCheck, HardHat, Award } from "lucide-react";

interface ProcessStepsSectionProps {
  locale: string;
}

export function ProcessStepsSection({ locale }: ProcessStepsSectionProps) {
  const isAr = locale === "ar";

  const steps = [
    {
      num: "01",
      icon: <FileSearch className="w-6 h-6 text-[#00d2ff]" />,
      title_ar: "استلام الطلب والمعاينة الميدانية",
      title_en: "Request Reception & Site Survey",
      desc_ar: "معاينة هندسية لموقع المشروع بجدة، وفحص الحالة الإنشائية ورفع المساحات بدقة متناهية.",
      desc_en: "On-site diagnostic inspection across Jeddah, assessing structural condition and surveying dimensions.",
    },
    {
      num: "02",
      icon: <Calculator className="w-6 h-6 text-[#00d2ff]" />,
      title_ar: "المقايسة وتقدير التكلفة (BOQ)",
      title_en: "Quantity Survey & Cost Estimate (BOQ)",
      desc_ar: "إعداد مقايسة كميات مفصلة بالمواصفات والبنود المعتمدة وجدول زمني واضح لتفادي أي تكاليف خفية.",
      desc_en: "Developing a detailed Bill of Quantities with certified specifications and clear schedules.",
    },
    {
      num: "03",
      icon: <FileCheck className="w-6 h-6 text-[#00d2ff]" />,
      title_ar: "توقيع العقد الرسمي والجدول الزمني",
      title_en: "Contract Execution & CPM Schedule",
      desc_ar: "صياغة عقد ملزم يحدد الدفعات المرتبطة بنسب الإنجاز الفعلي وتواريخ التسليم والمواصفات.",
      desc_en: "Formal agreement linking payments strictly to verified milestone deliveries and specifications.",
    },
    {
      num: "04",
      icon: <HardHat className="w-6 h-6 text-[#00d2ff]" />,
      title_ar: "التنفيذ والإشراف الهندسي المباشر",
      title_en: "Execution & On-Site Engineering Oversight",
      desc_ar: "مباشرة الأعمال وتطبيق معايير السلامة المهنية ومطابقة الكود السعودي بإشراف مهندسين مختصين.",
      desc_en: "Mobilization, occupational safety adherence, and Saudi Building Code compliance under engineers.",
    },
    {
      num: "05",
      icon: <Award className="w-6 h-6 text-[#00d2ff]" />,
      title_ar: "التسليم ومحاضر الاستلام والضمان",
      title_en: "Turnkey Handover & Warranty Issue",
      desc_ar: "فحص نهائي وتوقيع محضر الاستلام مع تسليم وثيقة الضمان المعتمد على الأعمال المنفذة.",
      desc_en: "Final inspection walkthrough, formal handover protocol sign-off, and certified warranty handover.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0d1728]/60 border-y border-sky-400/15 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
            {isAr ? "منهجية العمل والشفافية" : "Our Proven Methodology"}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white">
            {isAr
              ? "مراحل تنفيذ منضبطة من الفكرة حتى التسليم"
              : "Disciplined Milestones from Vision to Handover"}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {isAr
              ? "خطوات هندسية واضحة تضمن لعملائنا في جدة راحة البال والالتزام الكامل بالمواعيد والمواصفات."
              : "Structured engineering procedures ensuring peace of mind and strict specification adherence."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="relative p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 flex flex-col justify-between hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 hover:-translate-y-1 backdrop-blur-md shadow-lg transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-sky-400/50 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all">
                    {st.icon}
                  </div>
                  <span className="text-2xl font-black text-[#00d2ff]/40 group-hover:text-[#00d2ff] transition-colors">
                    {st.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#00d2ff] transition-colors">
                  {isAr ? st.title_ar : st.title_en}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {isAr ? st.desc_ar : st.desc_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
