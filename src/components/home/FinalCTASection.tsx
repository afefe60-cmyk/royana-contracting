import React from "react";
import { MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils";

interface FinalCTASectionProps {
  locale: string;
  whatsappPhone?: string;
}

export function FinalCTASection({
  locale,
  whatsappPhone = "966508805861",
}: FinalCTASectionProps) {
  const isAr = locale === "ar";
  const whatsappUrl = buildWhatsAppUrl(
    whatsappPhone,
    isAr
      ? "السلام عليكم، أود حجز موعد معاينة ميدانية لمشروعي بجدة مع مؤسسة رؤيانا للمقاولات."
      : "Hello, I would like to schedule a site inspection in Jeddah with Royana Contracting."
  );

  return (
    <section className="py-16 sm:py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0d1728] via-[#121e34] to-[#070d18] border border-sky-400/25 rounded-3xl p-8 sm:p-14 text-center shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Ambient radial glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-4">
              {isAr ? "جاهزون لبدء مشروعك" : "Ready to Start Your Project"}
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              {isAr
                ? "هل لديك مشروع بناء أو ترميم في جدة أو منطقة مكة؟"
                : "Planning a Construction or Renovation Project in Jeddah?"}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              {isAr
                ? "فريقنا الهندسي جاهز لمعاينة الموقع، مراجعة المخططات، وتقديم عرض سعر هندسي تفصيلي مدعوم بجدول كميات ومواصفات واضحة."
                : "Our engineering team is ready to inspect your site, evaluate drawings, and provide an itemized engineering quote."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <FileText className="w-5 h-5 text-white" />
                <span>{isAr ? "اطلب عرض سعر الآن" : "Request a Quote Now"}</span>
              </Button>

              <Button
                href={whatsappUrl}
                external
                variant="whatsapp"
                size="lg"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 fill-[#070d18] text-[#070d18]" />
                <span>{isAr ? "محادثة فورية عبر واتساب" : "Chat on WhatsApp"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
