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
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0B192C] border-t border-[#1E3E62] px-2 py-2 shadow-2xl safe-area-bottom"
    >
      <div className="grid grid-cols-3 gap-1.5 max-w-md mx-auto text-center">
        {/* Phone Call */}
        <a
          href={phoneUrl}
          onClick={() => trackCallClick(phone)}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#162C46] text-[#F8FAFC] hover:bg-[#1E3E62] transition-colors focus:ring-2 focus:ring-[#C68B59]"
        >
          <Phone className="w-5 h-5 text-[#C68B59] mb-1" />
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
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#25D366] text-[#0B192C] font-bold hover:bg-[#20BA57] transition-colors focus:ring-2 focus:ring-white"
        >
          <MessageCircle className="w-5 h-5 fill-[#0B192C] text-[#0B192C] mb-1" />
          <span className="text-xs font-extrabold text-[#0B192C]">
            {isAr ? "واتساب" : "WhatsApp"}
          </span>
        </a>

        {/* Request Quote */}
        <Link
          href={`/${locale}/contact`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-[#C68B59] text-[#0B192C] font-bold hover:bg-[#B57B4B] transition-colors focus:ring-2 focus:ring-white"
        >
          <FileText className="w-5 h-5 text-[#0B192C] mb-1" />
          <span className="text-xs font-extrabold text-[#0B192C]">
            {isAr ? "عرض سعر" : "Quote"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
