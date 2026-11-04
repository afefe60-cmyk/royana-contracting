import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types";

interface FeaturedProjectsSectionProps {
  projects: Project[];
  locale: string;
}

export function FeaturedProjectsSection({
  projects,
  locale,
}: FeaturedProjectsSectionProps) {
  const isAr = locale === "ar";
  const activeProjects = projects.filter((p) => !p.draft && p.featured);

  if (activeProjects.length === 0) {
    return null;
  }

  const primaryProject = activeProjects[0];

  return (
    <section className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
              {isAr ? "معرض الأعمال المنجزة" : "Featured Engineering Showcase"}
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white">
              {isAr
                ? "دراسة حالة واقعية: جودة التنفيذ والترميم"
                : "Real Project Case Study: Restoration Excellence"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              {isAr
                ? "نماذج موثقة لأعمالنا الإنشائية والترميمية في جدة دون أي بيانات مفبركة."
                : "Documented structural rehabilitation works delivered in Jeddah."}
            </p>
          </div>

          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00d2ff] hover:text-white transition-colors self-start md:self-end group"
          >
            <span>{isAr ? "تصفح كافة المشاريع" : "View All Projects"}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        {/* Featured Case Study with Realistic Static Image */}
        <div className="bg-[#121e34]/75 rounded-3xl border border-sky-400/15 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Realistic Project Showcase Image (Column 7) */}
            <div className="lg:col-span-7">
              <div className="group relative aspect-[16/11] rounded-2xl overflow-hidden border border-sky-400/25 bg-[#070d18] shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
                <Image
                  src={primaryProject.thumbnail}
                  alt={isAr ? primaryProject.title_ar : primaryProject.title_en}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle lighting vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d18]/85 via-transparent to-black/25 pointer-events-none" />

                {/* Status Badge (Top-start) */}
                <div className="absolute top-4 start-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#070d18]/85 backdrop-blur-md border border-emerald-400/30 text-xs font-semibold text-emerald-300 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? "تم التسليم بنجاح وفق الكود السعودي" : "Delivered per Saudi Code"}</span>
                </div>

                {/* Location & Year Tag (Bottom-start) */}
                <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-xs text-slate-200">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070d18]/80 backdrop-blur-md border border-sky-400/20 text-[#00d2ff]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-medium">
                      {isAr ? primaryProject.location_ar : primaryProject.location_en}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#070d18]/80 backdrop-blur-md border border-slate-700 text-slate-300 font-mono">
                    {primaryProject.year || "2024"}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Details (Column 5) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold text-[#00d2ff]">
                <MapPin className="w-3.5 h-3.5 text-[#00d2ff]" />
                <span>
                  {isAr ? primaryProject.location_ar : primaryProject.location_en}
                  {" - "}
                  {isAr ? primaryProject.city_ar : primaryProject.city_en}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isAr ? primaryProject.title_ar : primaryProject.title_en}
              </h3>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00d2ff] mb-1">
                  {isAr ? "التحدي الهندسي بالموقع" : "Site Engineering Challenge"}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {isAr ? primaryProject.challenge_ar : primaryProject.challenge_en}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00d2ff] mb-1">
                  {isAr ? "الحل الفني المنفذ" : "Applied Technical Solution"}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {isAr ? primaryProject.solution_ar : primaryProject.solution_en}
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                {(isAr ? primaryProject.scope_ar : primaryProject.scope_en).slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Button
                  href={`/${locale}/projects/${primaryProject.id}`}
                  variant="primary"
                  size="sm"
                >
                  {isAr ? "عرض تفاصيل دراسة الحالة" : "Explore Case Study"}
                </Button>
                <Button
                  href={`/${locale}/contact`}
                  variant="outline"
                  size="sm"
                >
                  {isAr ? "طلب معاينة لمبناك" : "Request Inspection"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
