"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  Phone,
  X,
  Building,
  HardHat,
  Sparkles,
} from "lucide-react";
import { buildWhatsAppUrl, buildPhoneUrl } from "@/lib/utils";
import { trackWhatsAppClick, trackCallClick } from "@/lib/analytics";

interface SmartAssistantWidgetProps {
  locale?: string;
}

export function SmartAssistantWidget({ locale = "ar" }: SmartAssistantWidgetProps) {
  const isAr = locale === "ar";
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  const headManager = {
    title: isAr ? "الإدارة العامة والتعاقدات" : "General Management & Contracts",
    role: isAr ? "المدير العام (Head Manager)" : "Head Manager",
    phone: "+966568024374",
    phoneDisplay: "056 802 4374",
    whatsappNumber: "966568024374",
    desc: isAr
      ? "عقود المقاولات، الشراكات والمقاولون الرئيسيون، والاعتمادات الرسمية."
      : "Major contracting agreements, sub-contracting, and formal corporate bids.",
    icon: <Building className="w-5 h-5 text-[#00d2ff]" />,
  };

  const projectsManager = {
    title: isAr ? "إدارة المشاريع والمعاينة الميدانية" : "Projects & Site Operations",
    role: isAr ? "مدير المشروعات (Projects Manager)" : "Projects Manager",
    phone: "+966508805861",
    phoneDisplay: "050 880 5861",
    whatsappNumber: "966508805861",
    desc: isAr
      ? "معاينات الفلل والمباني بجدة، رفع المساحات، ومتابعة التنفيذ والجداول."
      : "On-site Jeddah surveys, BOQ preparation, and milestone project execution.",
    icon: <HardHat className="w-5 h-5 text-[#00d2ff]" />,
  };

  const quickTopics = isAr
    ? [
        "طلب معاينة ميدانية لمشروع في جدة",
        "استفسار عن ترميم وتشطيب فيلا / مبنى",
        "طلب دراسة مخططات ومقايسة كميات (BOQ)",
        "فحص وتقييم عقار قبل الشراء",
        "طلب توريد طبالي صناعية أو تجهيزات",
      ]
    : [
        "Request on-site inspection in Jeddah",
        "Villa restoration & finishing inquiry",
        "BOQ and cost estimate evaluation",
        "Pre-purchase property inspection",
        "Industrial pallets / equipment supply",
      ];

  const getWhatsAppLink = (number: string, customTopic?: string) => {
    let msg = isAr
      ? "السلام عليكم، أود التواصل مع مؤسسة رؤيانا الحديثة للمقاولات."
      : "Hello, I would like to reach Royana Modern Contracting.";

    const topic = customTopic || selectedTopic;
    if (topic) {
      msg += isAr ? ` بخصوص: ${topic}.` : ` Regarding: ${topic}.`;
    }
    return buildWhatsAppUrl(number, msg);
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 start-4 md:start-8 z-40">
      {/* Expanded Modal Box */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? "مركز المساعدة الذكي والواتساب" : "Smart Assistance & WhatsApp Hub"}
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] overflow-y-auto bg-[#0d1728]/95 border border-sky-400/25 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-5 sm:p-6 text-slate-100 backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-sky-400/15">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-[#00d2ff] text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#00d2ff]" />
                <span>{isAr ? "مساعدة فورية مباشرة" : "Direct Fast Support"}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {isAr ? "مركز التواصل الهندسي المباشر" : "Direct Engineering Contact Hub"}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{isAr ? "المهندسون متاحون للمعاينة والمحادثة" : "Engineers available for live consultation"}</span>
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-sky-500/10 transition"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>

          {/* Quick Topic Selector */}
          <div className="mt-4 mb-4">
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {isAr ? "اختر موضوع استفسارك (اختياري لتجهيز الرسالة):" : "Choose inquiry topic (optional):"}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {quickTopics.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    setSelectedTopic(selectedTopic === topic ? "" : topic)
                  }
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all text-start cursor-pointer ${
                    selectedTopic === topic
                      ? "bg-sky-500/20 text-[#00d2ff] border-sky-400 font-bold shadow-[0_0_10px_rgba(0,210,255,0.3)]"
                      : "bg-[#070d18] text-slate-300 border-sky-400/20 hover:border-sky-400/50 hover:bg-sky-500/10"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* 2 Contact Cards */}
          <div className="space-y-3">
            {/* 1. Projects Manager Card */}
            <div className="p-4 rounded-2xl bg-[#121e34]/90 border border-sky-400/20 hover:border-sky-400/50 transition-all shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
                  {projectsManager.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    {projectsManager.title}
                  </h4>
                  <p className="text-xs text-[#00d2ff] font-bold">
                    {projectsManager.role}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {projectsManager.desc}
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getWhatsAppLink(projectsManager.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("projects_manager_widget")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#25D366] text-[#070d18] font-extrabold text-xs hover:bg-[#20BA57] transition shadow-[0_2px_10px_rgba(37,211,102,0.3)]"
                >
                  <MessageCircle className="w-4 h-4 fill-[#070d18]" />
                  <span>{isAr ? "واتساب المشاريع" : "WhatsApp"}</span>
                </a>

                <a
                  href={buildPhoneUrl(projectsManager.phone)}
                  onClick={() => trackCallClick(projectsManager.phone)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#070d18] border border-sky-400/20 text-white font-bold text-xs hover:border-[#00d2ff] hover:text-[#00d2ff] transition"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00d2ff]" />
                  <span>{projectsManager.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* 2. Head Manager Card */}
            <div className="p-4 rounded-2xl bg-[#121e34]/90 border border-sky-400/20 hover:border-sky-400/50 transition-all shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
                  {headManager.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    {headManager.title}
                  </h4>
                  <p className="text-xs text-[#00d2ff] font-bold">
                    {headManager.role}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {headManager.desc}
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getWhatsAppLink(headManager.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("head_manager_widget")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#25D366] text-[#070d18] font-extrabold text-xs hover:bg-[#20BA57] transition shadow-[0_2px_10px_rgba(37,211,102,0.3)]"
                >
                  <MessageCircle className="w-4 h-4 fill-[#070d18]" />
                  <span>{isAr ? "واتساب الإدارة" : "WhatsApp"}</span>
                </a>

                <a
                  href={buildPhoneUrl(headManager.phone)}
                  onClick={() => trackCallClick(headManager.phone)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#070d18] border border-sky-400/20 text-white font-bold text-xs hover:border-[#00d2ff] hover:text-[#00d2ff] transition"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00d2ff]" />
                  <span>{headManager.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isAr ? "فتح مركز المساعدة والواتساب" : "Open WhatsApp & Support Hub"}
        className="flex items-center gap-2.5 p-2.5 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white font-extrabold rounded-full shadow-[0_0_25px_rgba(0,210,255,0.45)] hover:shadow-[0_0_35px_rgba(0,210,255,0.7)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-400/30 group cursor-pointer"
      >
        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-4 h-4 fill-white text-white" />
        </div>

        <span className="hidden sm:inline text-xs sm:text-sm font-bold text-white tracking-wide">
          {isAr ? "تواصل مع الإدارة والمشاريع" : "Chat with Managers"}
        </span>

        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      </button>
    </div>
  );
}
