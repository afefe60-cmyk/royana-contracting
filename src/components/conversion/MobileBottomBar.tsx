"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { buildWhatsAppUrl, buildPhoneUrl } from "@/lib/utils";
import { trackCallClick, trackWhatsAppClick } from "@/lib/analytics";

interface MobileBottomBarProps {
  phone?: string;
  whatsapp?: string;
  locale?: string;
}

export function MobileBottomBar({
  phone = "+966508805861",
  whatsapp = "966508805861",
  locale = "ar",
}: MobileBottomBarProps) {
  const isAr = locale === "ar";
  const whatsappUrl = buildWhatsAppUrl(
    whatsapp,
    isAr
      ? "السلام عليكم، أود طلب عرض سعر من مؤسسة رؤيانا الحديثة للمقاولات."
      : "Hello, I would like to request a quotation from Royana Contracting."
  );
  const phoneUrl = buildPhoneUrl(phone);

  return (
    <nav
      aria-label={isAr ? "شريط التحويل السريع للجوال" : "Mobile Quick Action Bar"}
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#070d18]/95 backdrop-blur-xl border-t border-sky-400/20 px-3 py-2 shadow-[0_-10px_25px_rgba(0,0,0,0.5)] safe-area-bottom"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-center">
        {/* Phone Call */}
        <a
          href={phoneUrl}
          onClick={() => trackCallClick(phone)}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#0d1728] border border-sky-400/20 text-slate-200 hover:text-[#00d2ff] hover:border-[#00d2ff] transition-all"
        >
          <Phone className="w-4 h-4 text-[#00d2ff] mb-1" />
          <span className="text-xs font-semibold">
            {isAr ? "اتصال" : "Call"}
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("mobile_bar")}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366] text-[#070d18] font-extrabold hover:bg-[#20BA57] transition-all shadow-[0_2px_10px_rgba(37,211,102,0.3)]"
        >
          <MessageCircle className="w-4 h-4 fill-[#070d18] text-[#070d18] mb-1" />
          <span className="text-xs font-extrabold">
            {isAr ? "واتساب" : "WhatsApp"}
          </span>
        </a>

        {/* Request Quote */}
        <Link
          href={`/${locale}/contact`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white font-extrabold transition-all shadow-[0_2px_12px_rgba(0,210,255,0.35)]"
        >
          <FileText className="w-4 h-4 text-white mb-1" />
          <span className="text-xs font-extrabold">
            {isAr ? "عرض سعر" : "Quote"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
