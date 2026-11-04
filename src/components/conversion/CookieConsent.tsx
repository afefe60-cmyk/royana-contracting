"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

interface CookieConsentProps {
  locale?: string;
  gaId?: string;
}

export function CookieConsent({
  locale = "ar",
  gaId = process.env.NEXT_PUBLIC_GA_ID,
}: CookieConsentProps) {
  const isAr = locale === "ar";
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("royana_cookie_consent");
      if (!consent) {
        setShowBanner(true);
      } else if (consent === "accepted" && gaId) {
        initGA(gaId);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, [gaId]);

  const initGA = (id: string) => {
    if (typeof window === "undefined" || document.getElementById("ga4-script")) return;

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id, { anonymize_ip: true });
  };

  const handleAccept = () => {
    try {
      localStorage.setItem("royana_cookie_consent", "accepted");
    } catch {}
    setShowBanner(false);
    if (gaId) {
      initGA(gaId);
    }
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("royana_cookie_consent", "declined");
    } catch {}
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label={isAr ? "إشعار الخصوصية وملفات تعريف الارتباط" : "Privacy and Cookie Notice"}
      className="fixed bottom-16 md:bottom-6 inset-x-4 max-w-2xl mx-auto z-50 bg-[#070d18]/95 backdrop-blur-xl border border-sky-400/25 text-slate-100 p-4 sm:p-5 rounded-2xl shadow-2xl transition-all"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-[#00d2ff] flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {isAr ? (
              <>
                نحترم خصوصيتك وفق <strong>نظام حماية البيانات الشخصية السعودي (PDPL)</strong>. نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وقياس الأداء. يمكنك مراجعة{" "}
                <Link
                  href={`/${locale}/privacy`}
                  className="text-[#00d2ff] underline underline-offset-4 hover:text-white font-bold"
                >
                  سياسة الخصوصية
                </Link>
                .
              </>
            ) : (
              <>
                We value your privacy compliant with the <strong>Saudi Personal Data Protection Law (PDPL)</strong>. We use cookies for analytics and site optimization. Read our{" "}
                <Link
                  href={`/${locale}/privacy`}
                  className="text-[#00d2ff] underline underline-offset-4 hover:text-white font-bold"
                >
                  Privacy Policy
                </Link>
                .
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-3.5 py-2 text-xs text-slate-400 hover:text-white rounded-full hover:bg-sky-500/10 transition cursor-pointer"
          >
            {isAr ? "رفض" : "Decline"}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-xs sm:text-sm font-bold bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white rounded-full hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] transition shadow cursor-pointer"
          >
            {isAr ? "موافق" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
