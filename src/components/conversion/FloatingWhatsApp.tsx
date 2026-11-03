"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";
import { trackWhatsAppClick } from "@/lib/analytics";

interface FloatingWhatsAppProps {
  phone?: string;
  defaultMessage?: string;
}

export function FloatingWhatsApp({
  phone = "966508805861",
  defaultMessage = "السلام عليكم، أود الاستفسار عن خدمات مؤسسة رؤيانا للمقاولات في جدة.",
}: FloatingWhatsAppProps) {
  const pathname = usePathname() || "";

  const contextualMessage = useMemo(() => {
    if (pathname.includes("/services/construction")) {
      return "السلام عليكم، أود الاستفسار عن خدمة الإنشاءات والترميم في جدة.";
    }
    if (pathname.includes("/services/mep")) {
      return "السلام عليكم، أود الاستفسار عن أعمال صيانة شبكات الكهرباء والمياه بجدة.";
    }
    if (pathname.includes("/services/project-management")) {
      return "السلام عليكم، أود استشارة هندسية وإشراف على مشروعي بجدة.";
    }
    if (pathname.includes("/other-sectors/wooden-pallets")) {
      return "السلام عليكم، أود الاستفسار عن طلب وتوريد الطبالي الخشبية للمستودعات.";
    }
    if (pathname.includes("/other-sectors/metal-pallets")) {
      return "السلام عليكم، أود الاستفسار عن مواصفات وتوريد الطبالي المعدنية الصناعية.";
    }
    if (pathname.includes("/other-sectors/plastic-pallets")) {
      return "السلام عليكم، أود الاستفسار عن توريد الطبالي البلاستيكية الصحية.";
    }
    if (pathname.includes("/other-sectors/solar-energy")) {
      return "السلام عليكم، أود الاستفسار عن تركيب أنظمة الطاقة الشمسية.";
    }
    if (pathname.includes("/other-sectors/agriculture")) {
      return "السلام عليكم، أود الاستفسار عن معدات الري والإنتاج الزراعي.";
    }
    if (pathname.includes("/other-sectors/factory-lines")) {
      return "السلام عليكم، أود الاستفسار عن خطوط الإنتاج والسيور الناقلة للمصانع.";
    }
    if (pathname.includes("/projects/durrat-al-arus")) {
      return "السلام عليكم، اطلعت على مشروع ترميم درة العروس وأرغب بمعاينة مبنى مماثل.";
    }
    return defaultMessage;
  }, [pathname, defaultMessage]);

  const whatsappUrl = buildWhatsAppUrl(phone, contextualMessage);

  return (
    <aside aria-label="التواصل السريع">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(pathname)}
        aria-label="تواصل فوري عبر واتساب"
        className="fixed bottom-20 md:bottom-8 start-4 md:start-8 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-[#0B192C] font-bold rounded-full shadow-2xl hover:bg-[#20BA57] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 group"
      >
        <MessageCircle className="w-6 h-6 fill-[#0B192C] text-[#0B192C]" />
        <span className="hidden sm:inline text-sm font-extrabold text-[#0B192C]">
          تواصل عبر واتساب
        </span>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B192C] opacity-30"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0B192C]"></span>
        </span>
      </a>
    </aside>
  );
}
