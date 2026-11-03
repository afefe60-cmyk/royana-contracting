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
    <section className="bg-gradient-to-r from-[#0B192C] via-[#162C46] to-[#0B192C] text-white py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#C68B59]/20 text-[#C68B59] text-xs font-bold uppercase tracking-wider mb-4 border border-[#C68B59]/40">
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
            <FileText className="w-5 h-5 text-[#0B192C]" />
            <span>{isAr ? "اطلب عرض سعر الآن" : "Request a Quote Now"}</span>
          </Button>

          <Button
            href={whatsappUrl}
            external
            variant="whatsapp"
            size="lg"
            className="w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5 fill-[#0B192C] text-[#0B192C]" />
            <span>{isAr ? "محادثة فورية عبر واتساب" : "Chat on WhatsApp"}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
