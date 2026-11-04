import React from "react";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "الشروط والأحكام" : "Terms & Conditions",
    description: isAr
      ? "الشروط والأحكام العامة لموقع وخدمات مؤسسة رؤيانا الحديثة للمقاولات بجدة."
      : "General Terms & Conditions of Royana Modern Contracting website and services.",
    alternates: {
      canonical: `https://royana.com.sa/${locale}/terms`,
    },
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "الشروط والأحكام" : "Terms", url: `https://royana.com.sa/${locale}/terms` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="bg-[#0d1728]/70 py-16 sm:py-20 border-b border-sky-400/15 relative z-10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-bold text-[#00d2ff] mb-4">
            <FileText className="w-4 h-4 text-[#00d2ff]" />
            <span>{isAr ? "اتفاقية الاستخدام والتعاقد" : "Terms of Service"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            {isAr
              ? "تحدد هذه الوثيقة الضوابط والشروط المنظمة لاستخدام موقع مؤسسة رؤيانا الحديثة للمقاولات وطلب خدماتها."
              : "These terms govern the use of Royana Modern Contracting website and service inquiries."}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#121e34]/75 p-6 sm:p-12 rounded-3xl border border-sky-400/15 backdrop-blur-md shadow-2xl text-slate-200 leading-relaxed text-sm sm:text-base space-y-8">
            {isAr ? (
              <>
                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">1.</span> عروض الأسعار والمقايسات (BOQ)
                  </h2>
                  <p className="text-slate-300">
                    أي تقديرات أسعار مبدئية مقدمة عبر الموقع أو الهاتف تعتبر استرشادية، ولا تصبح نهائية وملزمة قانونياً إلا بعد إجراء المعاينة الميدانية لموقع العمل بجدة، وتدقيق المخططات، وتوقيع العقد الرسمي المعتمد.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">2.</span> التراخيص والتصاريح البلدية
                  </h2>
                  <p className="text-slate-300">
                    يلتزم العميل بتوفير رخص البناء أو رخص الترميم الصادرة من أمانة محافظة جدة عبر منصة بلدي قبل مباشرة الأعمال في الموقع، مع تقديم الدعم الهندسي اللازم من قبلنا لإعداد المخططات المطلوبة.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">3.</span> الضمانات وخدمات ما بعد التسليم
                  </h2>
                  <p className="text-slate-300">
                    تخضع كافة أعمال الإنشاء والعزل والترميم المنجزة لضمانات رسمية موثقة في العقد، وتحدد بنود العقد بوضوح مدد التغطية وفق طبيعة الأعمال والمواد المعتمدة.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">4.</span> الملكية الفكرية
                  </h2>
                  <p className="text-slate-300">
                    جميع المواد والنصوص والتصاميم والعلامات التجارية المنشورة في هذا الموقع مملوكة حصرياً لمؤسسة رؤيانا الحديثة للمقاولات ومحمية بموجب الأنظمة المرعية في المملكة العربية السعودية.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">1.</span> Quotations & Bill of Quantities (BOQ)
                  </h2>
                  <p className="text-slate-300">
                    Preliminary online ballpark estimates are indicative. Binding contractual commitments are finalized strictly following diagnostic on-site surveys in Jeddah and mutual contract sign-off.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">2.</span> Municipal Building & Renovation Permits
                  </h2>
                  <p className="text-slate-300">
                    Clients are responsible for securing necessary municipal permits via the Balady platform before physical mobilization, with technical drawing support provided by our team.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">3.</span> Warranties & Handover Terms
                  </h2>
                  <p className="text-slate-300">
                    All structural, waterproofing, and renovation milestones are governed by formal warranties documented in the signed contract, establishing clear liabilities.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
