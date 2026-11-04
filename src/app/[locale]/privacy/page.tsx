import React from "react";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "سياسة الخصوصية ونظام حماية البيانات الشخصية (PDPL)"
      : "Privacy Policy (Saudi PDPL Compliance)",
    description: isAr
      ? "سياسة الخصوصية لمؤسسة رؤيانا الحديثة للمقاولات وفقاً لنظام حماية البيانات الشخصية السعودي (PDPL)."
      : "Privacy Policy of Royana Modern Contracting compliant with the Saudi Personal Data Protection Law (PDPL).",
    alternates: {
      canonical: `https://royana.com.sa/${locale}/privacy`,
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "سياسة الخصوصية" : "Privacy Policy", url: `https://royana.com.sa/${locale}/privacy` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="bg-[#0d1728]/70 py-16 sm:py-20 border-b border-sky-400/15 relative z-10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-bold text-[#00d2ff] mb-4">
            <ShieldCheck className="w-4 h-4 text-[#00d2ff]" />
            <span>
              {isAr
                ? "متوافقة مع نظام حماية البيانات الشخصية السعودي (PDPL)"
                : "Saudi Personal Data Protection Law (PDPL) Compliant"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            {isAr ? "سياسة الخصوصية وحماية البيانات" : "Privacy & Personal Data Protection Policy"}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            {isAr
              ? "آخر تحديث: نوفمبر 2024. توضح هذه الوثيقة التزام مؤسسة رؤيانا الحديثة للمقاولات بحماية خصوصيتك وبياناتك."
              : "Last updated: November 2024. This policy details how Royana Contracting safeguards your personal information."}
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
                    <span className="text-[#00d2ff]">1.</span> المقدمة والأساس النظامي
                  </h2>
                  <p className="text-slate-300">
                    تلتزم مؤسسة رؤيانا الحديثة للمقاولات (المسجلة في مدينة جدة بالمملكة العربية السعودية) بحماية خصوصية زوار موقعنا وعملائنا الكرام. تم إعداد هذه السياسة التزاماً بأحكام <strong>نظام حماية البيانات الشخصية السعودي (PDPL)</strong> الصادر بالمرسوم الملكي رقم (م/19) ولائحته التنفيذية.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">2.</span> البيانات الشخصية التي نجمعها
                  </h2>
                  <p className="text-slate-300">نجمع فقط البيانات الضرورية لتقديم خدمات المقاولات والرد على طلبات الأسعار:</p>
                  <ul className="list-disc pr-6 space-y-1.5 mt-2 text-slate-300">
                    <li>الاسم الكامل للتواصل وتوثيق الطلبات.</li>
                    <li>رقم الجوال والبريد الإلكتروني لإرسال عروض الأسعار وتحديد مواعيد المعاينات.</li>
                    <li>موقع المشروع (المدينة والحي) لتحديد النطاق الجغرافي.</li>
                    <li>المخططات والوثائق الهندسية المرفقة طوعاً لتقييم التكلفة.</li>
                    <li>بيانات التصفح التقنية وملفات تعريف الارتباط (Cookies) بشرط موافقتك الصريحة.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">3.</span> الغرض من معالجة البيانات
                  </h2>
                  <p className="text-slate-300">تُعالج البيانات الشخصية حصراً للأغراض التالية:</p>
                  <ul className="list-disc pr-6 space-y-1.5 mt-2 text-slate-300">
                    <li>دراسة الطلبات الهندسية وإعداد المقايسات وجداول الكميات (BOQ).</li>
                    <li>التنسيق للمعاينة الميدانية في مواقع العمل بجدة ومنطقة مكة المكرمة.</li>
                    <li>إبرام العقود ومتابعة تنفيذ المشاريع والضمانات المعتمدة.</li>
                    <li>تحسين كفاءة الموقع الإلكتروني وتجربة المستخدم وفق الإحصاءات العامة.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">4.</span> سرية البيانات ومشاركتها
                  </h2>
                  <p className="text-slate-300">
                    نؤكد في مؤسسة رؤيانا التزامنا الكامل بعدم بيع أو تأجير أو مشاركة أي بيانات شخصية مع أي جهات خارجية أو أطراف تسويقية. تقتصر المعالجة على كوادرنا الهندسية والإدارية المخولة فقط لتنفيذ الخدمة المطلوبة.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">5.</span> حقوق صاحب البيانات الشخصية
                  </h2>
                  <p className="text-slate-300">وفق نظام (PDPL) السعودي، يحق لك ممارسة الحقوق التالية في أي وقت:</p>
                  <ul className="list-disc pr-6 space-y-1.5 mt-2 text-slate-300">
                    <li><strong>حق العلم:</strong> معرفة الأساس النظامي والغرض من جمع ومعالجة بياناتك.</li>
                    <li><strong>حق الوصول:</strong> الاطلاع على بياناتك الشخصية المخزنة لدينا والحصول على نسخة منها.</li>
                    <li><strong>حق التصحيح:</strong> طلب تصحيح أو تحديث أي بيانات غير دقيقة.</li>
                    <li><strong>حق الإتلاف:</strong> طلب حذف أو إتلاف بياناتك بعد انتهاء الغرض من جمعها وانتهاء فترات الالتزام العقاري والنظامي.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">6.</span> ملفات تعريف الارتباط (Cookies) وأدوات التحليل
                  </h2>
                  <p className="text-slate-300">
                    لا يتم تفعيل أي ملفات تحليلية أو إحصائية (مثل Google Analytics) إلا بعد موافقتك الصريحة عبر شريط ملفات تعريف الارتباط الظاهر عند زيارتك الأولى. يمكنك في أي وقت سحب موافقتك أو تعديل تفضيلاتك عبر مسح ملفات الارتباط في متصفحك.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">7.</span> التواصل ومسؤول حماية البيانات
                  </h2>
                  <p className="text-slate-300">
                    لممارسة أي من حقوقك النظامية أو للاستفسار عن هذه السياسة، يمكنك التواصل مع إدارة المؤسسة عبر البريد الإلكتروني:{" "}
                    <a href="mailto:info@royana.com.sa" className="text-[#00d2ff] font-bold hover:underline">
                      info@royana.com.sa
                    </a>{" "}
                    أو الاتصال المباشر على الهاتف: 00966508805861.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">1.</span> Legal Basis & Overview
                  </h2>
                  <p className="text-slate-300">
                    Royana Modern Contracting Establishment (registered in Jeddah, Kingdom of Saudi Arabia) is firmly committed to protecting personal data in compliance with the <strong>Saudi Personal Data Protection Law (PDPL)</strong> issued under Royal Decree No. (M/19).
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">2.</span> Data We Collect
                  </h2>
                  <p className="text-slate-300">We exclusively collect details required to evaluate engineering inquiries and quotes:</p>
                  <ul className="list-disc pl-6 space-y-1.5 mt-2 text-slate-300">
                    <li>Full Name for technical communication.</li>
                    <li>Mobile number and email address for quote delivery and site survey scheduling.</li>
                    <li>Project site location (City, District) for logistical scoping.</li>
                    <li>Voluntarily submitted drawings and BOQs for technical estimation.</li>
                    <li>Analytics cookies only upon explicit consent.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">3.</span> Purpose of Processing
                  </h2>
                  <p className="text-slate-300">Collected information serves strictly defined engineering objectives:</p>
                  <ul className="list-disc pl-6 space-y-1.5 mt-2 text-slate-300">
                    <li>Formulating detailed Bill of Quantities (BOQ) and price quotations.</li>
                    <li>Arranging diagnostic site inspections across Jeddah and Makkah Province.</li>
                    <li>Executing formal contractual agreements and managing project warranty records.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">4.</span> Confidentiality & Non-Disclosure
                  </h2>
                  <p className="text-slate-300">
                    Royana enforces strict non-disclosure principles. We do not sell, lease, or commercialize any client data. Access is confined strictly to authorized engineering and project administrative staff.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">5.</span> Data Subject Rights (PDPL)
                  </h2>
                  <p className="text-slate-300">Under the Saudi PDPL, you hold explicit statutory rights:</p>
                  <ul className="list-disc pl-6 space-y-1.5 mt-2 text-slate-300">
                    <li><strong>Right to be informed:</strong> Understanding the legal foundation and intent of data collection.</li>
                    <li><strong>Right of access:</strong> Reviewing and obtaining copies of retained personal data.</li>
                    <li><strong>Right of rectification:</strong> Correcting obsolete or inaccurate records.</li>
                    <li><strong>Right of destruction:</strong> Requesting data erasure once statutory warranty retention periods expire.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-[#00d2ff]">6.</span> Contact Point
                  </h2>
                  <p className="text-slate-300">
                    To exercise your PDPL rights, reach us at:{" "}
                    <a href="mailto:info@royana.com.sa" className="text-[#00d2ff] font-bold hover:underline">
                      info@royana.com.sa
                    </a>{" "}
                    or call +966508805861.
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
