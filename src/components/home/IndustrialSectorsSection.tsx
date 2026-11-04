"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  Factory,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  FileCheck2,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils";

interface IndustrialSectorsSectionProps {
  locale: string;
  whatsappPhone?: string;
}

export function IndustrialSectorsSection({
  locale,
  whatsappPhone = "966508805861",
}: IndustrialSectorsSectionProps) {
  const isAr = locale === "ar";
  const [selectedPalletType, setSelectedPalletType] = useState<"wooden" | "plastic" | "metal">("wooden");
  const [selectedSize, setSelectedSize] = useState("120x100");

  const palletData = {
    wooden: {
      title_ar: "طبالي خشبية معالجة حرارياً",
      title_en: "Heat-Treated Wooden Pallets",
      badge_ar: "معتمدة للتصدير والشحن الدولي (ISPM 15)",
      badge_en: "Export Certified (ISPM 15)",
      desc_ar:
        "مصنعة من أخشاب طبيعية معالجة بالحرارة ومختومة لضمان خلوها من الآفات ومطابقة اشتراطات الموانئ والمستودعات وسلاسل الإمداد بالمملكة.",
      desc_en:
        "Phytosanitary heat-treated timber compliant with international ISPM 15 standards for safe global freight and heavy warehouse logistics.",
      image: "/images/pallets/wooden-pallet-1.webp",
      capacity: "500 - 2,500 kg",
      sizes: [
        { id: "120x100", label_ar: "120 × 100 سم (القياسي المعتمد محلياً)", label_en: "120x100 cm (Standard)" },
        { id: "120x80", label_ar: "120 × 80 سم (يورو باليت - Euro)", label_en: "120x80 cm (Euro Pallet)" },
        { id: "custom", label_ar: "مقاسات خاصة ومفصلة حسب الطلب", label_en: "Custom Tailored Dimensions" },
      ],
      features_ar: [
        "ختم المعالجة الحرارية الرسمي معتمد للتصدير الجمركي",
        "تثبيت بمسامير حلزونية مقواة مقاومة لاهتزازات الرافعات",
        "عقود توريد كميات كبرى بأسعار الجملة التنافسية",
      ],
      features_en: [
        "Official phytosanitary stamp for hassle-free customs clearance",
        "Reinforced ring-shank nails resistant to forklift vibration",
        "High-volume wholesale supply contracts with scheduled dispatch",
      ],
    },
    plastic: {
      title_ar: "طبالي بلاستيكية صحية فائقة الجودة",
      title_en: "Hygienic Plastic Pallets (Virgin HDPE)",
      badge_ar: "مطابقة لاشتراطات هيئة الغذاء والدواء (SFDA)",
      badge_en: "SFDA Compliant for Food & Pharma",
      desc_ar:
        "مصنعة من خامات Virgin HDPE نقية 100% غير مسامية ومضادة للبكتيريا، مثالية لغرف التبريد ومصانع الأغذية والأدوية والمختبرات.",
      desc_en:
        "100% virgin HDPE plastic pallets designed for sterile food, dairy, cold chain, and pharmaceutical warehousing.",
      image: "/images/pallets/plastic-pallet-1.webp",
      capacity: "1,000 - 4,000 kg",
      sizes: [
        { id: "120x100", label_ar: "120 × 100 سم (شبكي أو مصمت مسطح)", label_en: "120x100 cm (Vented/Flat)" },
        { id: "120x80", label_ar: "120 × 80 سم (معايير التبريد والمستودعات)", label_en: "120x80 cm (Cold Storage)" },
        { id: "heavy", label_ar: "طبالي تخزين أرفف مرتفعة مدعمة بحديد", label_en: "Heavy-Duty Racking with Steel Bars" },
      ],
      features_ar: [
        "مقاومة تامة للأحماض والكيماويات والغسيل بالضغط العالي",
        "حواف ومطاط مانع لانزلاق الكراتين والبراميل",
        "عمر افتراضي يتجاوز 8 سنوات في الاستخدام المتكرر",
      ],
      features_en: [
        "Full resilience against harsh chemicals and power washing",
        "Anti-slip rubber grommets securing stacked loads",
        "Over 8 years operational lifespan in closed-loop systems",
      ],
    },
    metal: {
      title_ar: "طبالي معدنية حديدية فائقة التحمل",
      title_en: "Heavy-Duty Steel Industrial Pallets",
      badge_ar: "للأحمال الشاقة ومقاومة الحريق والأوزان الضخمة",
      badge_en: "Heavy Payload & Fire-Proof Standard",
      desc_ar:
        "هياكل فولاذية ملحومة بالكامل ومجلفنة أو مدهونة إيبوكسي لتحمل أوزان ضخمة ومقاومة الصدمات الميكانيكية الشديدة ومخاطر الاشتعال.",
      desc_en:
        "Fully-welded galvanized steel pallets engineered for extreme static payloads, metallurgy yards, and zero fire-hazard zones.",
      image: "/images/pallets/metal-pallet-1.webp",
      capacity: "2,000 - 5,000 kg",
      sizes: [
        { id: "120x100", label_ar: "120 × 100 سم (صلب مجلفن عالي القوة)", label_en: "120x100 cm (Galvanized Steel)" },
        { id: "120x120", label_ar: "120 × 120 سم (لمصانع البراميل والمواد الكيميائية)", label_en: "120x120 cm (Drum Storage)" },
        { id: "reinforced", label_ar: "تصنيع هندسي مخصص حسب وزن الماكينات", label_en: "Custom Engineered Structure" },
      ],
      features_ar: [
        "طاقة تحمل تصل إلى 5 أطنان ثباتاً وتخزيناً على الأرفف",
        "مقاومة 100% للاشتعال مطابقة لمعايير الدفاع المدني",
        "عدم وجود مسامير مفكوكة أو تشظي مقارنة بالخشب",
      ],
      features_en: [
        "Static load capacity reaching 5,000 kg on industrial racking",
        "100% non-combustible compliant with civil defense codes",
        "Zero splintering or fastener degradation over heavy cycles",
      ],
    },
  };

  const activePallet = palletData[selectedPalletType];

  const palletWhatsappUrl = buildWhatsAppUrl(
    whatsappPhone,
    isAr
      ? `السلام عليكم، أود الاستفسار وطلب تسعير كميات ${activePallet.title_ar} بمقاس (${selectedSize}) لمصنعنا / مستودعنا في جدة.`
      : `Hello, I would like to request a bulk quote for ${activePallet.title_en} (Size: ${selectedSize}) for our facility in Jeddah.`
  );

  const factoryWhatsappUrl = buildWhatsAppUrl(
    whatsappPhone,
    isAr
      ? "السلام عليكم، نرغب في طلب معاينة ودراسة فنية لتركيب وتجهيز خطوط إنتاج / ماكينات صناعية في المدينة الصناعية بجدة."
      : "Hello, we would like to request a technical site inspection for factory machinery installation in Jeddah Industrial City."
  );

  return (
    <section className="py-20 sm:py-28 relative z-10 bg-gradient-to-b from-[#070d18] via-[#091322] to-[#070d18] border-y border-sky-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] mb-4 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
            <Factory className="w-4 h-4 text-[#00d2ff]" />
            <span>{isAr ? "القطاع الصناعي واللوجستي" : "Industrial & Logistics Hub"}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {isAr ? (
              <>
                حلول متكاملة للمصانع وسلاسل الإمداد:{" "}
                <span className="bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent">
                  توريد الطبالي وتجهيز المصانع
                </span>
              </>
            ) : (
              <>
                Turnkey Industrial Solutions:{" "}
                <span className="bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent">
                  Pallet Supply & Factory Rigging
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isAr
              ? "نلبي متطلبات المدن الصناعية بجدة (مدن الأولى والثانية)، ومستودعات الخمرة وعسفان، والموانئ بأعلى معايير الاعتماد والجودة."
              : "Serving Jeddah Industrial Cities (MODON), logistics zones in Al-Khumrah, and maritime freight hubs with certified excellence."}
          </p>
        </div>

        {/* 2 Main Pillar Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Pillar 1: Pallets Supply (7 cols) */}
          <div className="lg:col-span-7 bg-[#121e34]/70 rounded-3xl border border-sky-400/20 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -end-24 w-72 h-72 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Pillar Title & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00d2ff] to-[#3a7bd5] flex items-center justify-center text-[#070d18] shadow-[0_0_20px_rgba(0,210,255,0.35)]">
                    <Boxes className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {isAr ? "توريد وتصنيع الطبالي الصناعية" : "Industrial Pallets Manufacturing & Supply"}
                    </h3>
                    <p className="text-xs text-sky-400 font-medium">
                      {isAr ? "كميات جملة • توريد تعاقدي دوري • مقاسات قياسية وتفصيل" : "Wholesale • SLA Contracts • Standard & Custom"}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? "جاهز للتسليم الفوري" : "In Stock Ready"}</span>
                </span>
              </div>

              {/* Type Switcher Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#070d18]/80 rounded-2xl border border-sky-400/15 mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedPalletType("wooden")}
                  className={`py-2 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all text-center ${
                    selectedPalletType === "wooden"
                      ? "bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#070d18] shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isAr ? "طبالي خشبية" : "Wooden"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPalletType("plastic")}
                  className={`py-2 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all text-center ${
                    selectedPalletType === "plastic"
                      ? "bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#070d18] shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isAr ? "طبالي بلاستيكية" : "Plastic"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPalletType("metal")}
                  className={`py-2 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all text-center ${
                    selectedPalletType === "metal"
                      ? "bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-[#070d18] shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isAr ? "طبالي معدنية" : "Steel Metal"}
                </button>
              </div>

              {/* Active Pallet Content Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6 items-center">
                <div className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-sky-400/20 bg-[#070d18]">
                  <Image
                    src={activePallet.image}
                    alt={isAr ? activePallet.title_ar : activePallet.title_en}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 start-2 px-2.5 py-1 rounded-full bg-[#070d18]/85 backdrop-blur-md border border-sky-400/30 text-[11px] font-bold text-[#00d2ff]">
                    {isAr ? `الحمولة: ${activePallet.capacity}` : `Load: ${activePallet.capacity}`}
                  </div>
                </div>

                <div className="md:col-span-7 space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-[11px] font-bold text-[#00d2ff]">
                    <Award className="w-3.5 h-3.5" />
                    <span>{isAr ? activePallet.badge_ar : activePallet.badge_en}</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {isAr ? activePallet.title_ar : activePallet.title_en}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr ? activePallet.desc_ar : activePallet.desc_en}
                  </p>

                  <ul className="space-y-1 pt-1">
                    {(isAr ? activePallet.features_ar : activePallet.features_en).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00d2ff] flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Size Selector */}
              <div className="bg-[#070d18]/60 rounded-2xl p-4 border border-sky-400/15 mb-6">
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? "اختر المقاس المطلوب لطلب التسعير الفوري:" : "Select Required Pallet Dimension:"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activePallet.sizes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSize(s.id)}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all text-start flex flex-col justify-between ${
                        selectedSize === s.id
                          ? "bg-sky-500/20 border-[#00d2ff] text-white shadow-[0_0_15px_rgba(0,210,255,0.25)]"
                          : "bg-[#121e34]/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600"
                      }`}
                    >
                      <span className="font-bold">{isAr ? s.label_ar : s.label_en}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                href={palletWhatsappUrl}
                external
                variant="whatsapp"
                size="md"
                className="w-full sm:w-auto shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle className="w-4 h-4 fill-[#070d18] text-[#070d18]" />
                <span>{isAr ? "طلب تسعير كميات الجملة فوراً" : "Request Bulk Quotation"}</span>
              </Button>

              <Button
                href={`/${locale}/other-sectors`}
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
              >
                <span>{isAr ? "كافة مواصفات الطبالي" : "View Pallet Catalog"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Pillar 2: Factory Setup & Equipment Installation (5 cols) */}
          <div className="lg:col-span-5 bg-[#121e34]/70 rounded-3xl border border-sky-400/20 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute -bottom-24 -start-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Pillar Title & Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00d2ff] to-[#3a7bd5] flex items-center justify-center text-[#070d18] shadow-[0_0_20px_rgba(0,210,255,0.35)]">
                  <Factory className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isAr ? "تركيب وتجهيز المصانع" : "Factory Machinery & Rigging"}
                  </h3>
                  <p className="text-xs text-sky-400 font-medium">
                    {isAr ? "المدينة الصناعية بجدة (مدن الأولى والثانية)" : "Jeddah Industrial Cities (MODON)"}
                  </p>
                </div>
              </div>

              {/* Photo Showcase */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-sky-400/20 bg-[#070d18] mb-6 shadow-md">
                <Image
                  src="/images/projects/factory-installation/cover.webp"
                  alt={isAr ? "تركيب خطوط الإنتاج والماكينات الصناعية" : "Factory Equipment Installation"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d18]/90 via-transparent to-black/20 pointer-events-none" />

                <div className="absolute top-3 start-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070d18]/85 backdrop-blur-md border border-emerald-400/30 text-xs font-semibold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? "مشروع حقيقي منفذ بجدة" : "Delivered in Jeddah"}</span>
                </div>

                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-semibold text-white drop-shadow">
                    {isAr ? "رفع وتثبيت ماكينات ثقيلة ومحاذاة ليزرية" : "Heavy Machinery Hoisting & Laser Alignment"}
                  </span>
                </div>
              </div>

              {/* Bullet Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#070d18]/60 border border-sky-400/15">
                  <FileCheck2 className="w-4 h-4 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-white block">
                      {isAr ? "قواعد خرسانية ممتصة للاهتزاز:" : "Anti-Vibration Concrete Footings:"}
                    </span>
                    <span className="text-slate-300">
                      {isAr
                        ? "صب وتثبيت القواعد الحاملة لمنع اهتزاز خطوط الإنتاج السريعة."
                        : "Vibration-damped structural pads engineered for high-speed machinery."}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#070d18]/60 border border-sky-400/15">
                  <Sparkles className="w-4 h-4 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-white block">
                      {isAr ? "محاذاة ليزرية دقيقة وتمديدات كهروميكانيكية:" : "Laser Alignment & MEP Connections:"}
                    </span>
                    <span className="text-slate-300">
                      {isAr
                        ? "محاذاة السيور الناقلة بدقة ميليمترية مع شبكات الهواء (Pneumatics) ولوحات القوى."
                        : "Millimeter laser drivetrain calibration plus industrial power & pneumatic circuits."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                href={factoryWhatsappUrl}
                external
                variant="whatsapp"
                size="md"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 fill-[#070d18] text-[#070d18]" />
                <span>{isAr ? "طلب معاينة ودراسة موقع المصنع" : "Book Factory Survey"}</span>
              </Button>

              <Button
                href={`/${locale}/projects/factory-equipment-installation`}
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
              >
                <span>{isAr ? "تفاصيل المشروع المنفذ" : "View Case Study"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}