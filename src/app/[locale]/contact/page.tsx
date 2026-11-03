import React from "react";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { buildWhatsAppUrl, buildPhoneUrl } from "@/lib/utils";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "اتصل بنا واطلب عرض سعر" : "Contact Us & Request a Quote",
    description: isAr
      ? "تواصل مع مؤسسة رؤيانا الحديثة للمقاولات بجدة: هاتف 0508805861، بريد info@royana.com.sa، أو اطلب معاينة وعرض سعر فوري لمشروعك."
      : "Contact Royana Contracting in Jeddah: Phone 0508805861, email info@royana.com.sa, or schedule an on-site engineering survey.",
    alternates: {
      canonical: `https://royana.com.sa/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const settings = getSiteSettings();

  const phoneUrl = buildPhoneUrl(settings.contact.phone);
  const phoneAltUrl = buildPhoneUrl(settings.contact.phone_alt);
  const whatsappUrl = buildWhatsAppUrl(
    settings.contact.whatsapp,
    isAr
      ? "السلام عليكم، أود التواصل مع مؤسسة رؤيانا الحديثة للمقاولات بجدة بخصوص مشروع جديد."
      : "Hello, I would like to reach Royana Contracting regarding a new project in Jeddah."
  );

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "اتصل بنا" : "Contact", url: `https://royana.com.sa/${locale}/contact` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs sm:text-sm font-bold text-[#C68B59] uppercase tracking-wider">
              {isAr ? "قنوات التواصل المباشر" : "Direct Communication"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-[#0B192C]">
              {isAr ? "اتصل بنا واطلب عرض سعر هندسي" : "Contact Us & Request an Engineering Quote"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {isAr
                ? "فريقنا الهندسي مستعد لمساعدتك في دراسة مشروعك وتقديم المشورة الفنية والمعاينة الميدانية بجدة."
                : "Our engineering staff is ready to survey your site and formulate an itemized BOQ."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                <h2 className="text-xl font-bold text-[#0B192C] pb-4 border-b border-slate-200">
                  {isAr ? "معلومات الاتصال المباشر" : "Direct Contact Details"}
                </h2>

                {/* Phones */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0B192C] flex items-center justify-center flex-shrink-0 text-[#C68B59]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-1">
                      {isAr ? "أرقام الهاتف المعتمدة" : "Official Phone Numbers"}
                    </p>
                    <div className="flex flex-col gap-1">
                      <a
                        href={phoneUrl}
                        className="text-base font-bold text-[#0B192C] hover:text-[#C68B59] transition-colors"
                        dir="ltr"
                      >
                        {settings.contact.phone_display}
                      </a>
                      <a
                        href={phoneAltUrl}
                        className="text-sm font-semibold text-slate-700 hover:text-[#C68B59] transition-colors"
                        dir="ltr"
                      >
                        {settings.contact.phone_alt_display}
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center flex-shrink-0 text-[#0B192C]">
                    <MessageCircle className="w-5 h-5 fill-[#0B192C]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-1">
                      {isAr ? "محادثة واتساب فورية" : "Instant WhatsApp"}
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#0B192C] hover:text-[#25D366] transition-colors"
                    >
                      {isAr ? "بدء محادثة فورية مع المهندس" : "Start Live Chat with Engineer"}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0B192C] flex items-center justify-center flex-shrink-0 text-[#C68B59]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-1">
                      {isAr ? "البريد الإلكتروني الرسمي" : "Official Email"}
                    </p>
                    <a
                      href={`mailto:${settings.contact.email}`}
                      className="text-sm font-bold text-[#0B192C] hover:text-[#C68B59] transition-colors"
                    >
                      {settings.contact.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0B192C] flex items-center justify-center flex-shrink-0 text-[#C68B59]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-1">
                      {isAr ? "العنوان والمقر الرئيسي" : "Headquarters Address"}
                    </p>
                    <p className="text-sm font-bold text-[#0B192C] leading-relaxed">
                      {isAr
                        ? `${settings.address.city_ar}، ${settings.address.street_ar}`
                        : `${settings.address.city_en}, ${settings.address.street_en}`}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0B192C] flex items-center justify-center flex-shrink-0 text-[#C68B59]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-1">
                      {isAr ? "أوقات وساعات العمل" : "Working Hours"}
                    </p>
                    <p className="text-sm font-bold text-[#0B192C]">
                      {isAr ? settings.working_hours.days_ar : settings.working_hours.days_en}
                    </p>
                    <p className="text-xs text-slate-600">
                      {isAr ? settings.working_hours.time_ar : settings.working_hours.time_en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs h-64 relative bg-slate-100">
                <iframe
                  title={isAr ? "موقع مؤسسة رؤيانا بجدة على خريطة جوجل" : "Royana Location in Jeddah"}
                  src="https://maps.google.com/maps?q=Al-Baghdadiyah,+Jeddah,+Saudi+Arabia&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="خريطة الموقع بجدة"
                />
              </div>
            </div>

            {/* Quote Form (7 cols) */}
            <div className="lg:col-span-7">
              <QuoteRequestForm locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
