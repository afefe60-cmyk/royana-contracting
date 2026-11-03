import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { FinalCTASection } from "@/components/home/FinalCTASection";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "معرض المشاريع ودراسات الحالة" : "Projects Showcase & Case Studies",
    description: isAr
      ? "تصفح مشاريع مؤسسة رؤيانا للمقاولات في جدة: أعمال الترميم، الإنشاءات، والتشطيبات الموثقة."
      : "Explore Royana Contracting portfolio in Jeddah: restoration, construction, and certified engineering projects.",
    alternates: {
      canonical: `https://royana.com.sa/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  // Filter out any draft projects
  const projects = getProjects();

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "معرض المشاريع" : "Projects", url: `https://royana.com.sa/${locale}/projects` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs sm:text-sm font-bold text-[#C68B59] uppercase tracking-wider">
              {isAr ? "سجل الإنجاز الهندسي" : "Engineering Portfolio"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-[#0B192C]">
              {isAr ? "معرض الأعمال ومشاريع المقاولات" : "Contracting & Restoration Projects"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {isAr
                ? "مشاريع حقيقية منفذة وفق أعلى المعايير الفنية والإنشائية، مع توثيق التحديات والحلول الهندسية."
                : "Real projects executed per rigorous technical benchmarks, documenting engineering challenges and outcomes."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 p-8">
              <p className="text-base text-slate-600">
                {isAr
                  ? "يتم حالياً تجهيز وتوثيق صور ومعلومات المشاريع الجديدة."
                  : "New project case studies are currently being curated and documented."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-[#C68B59] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={project.thumbnail}
                        alt={isAr ? project.title_ar : project.title_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-[#0B192C]/80 backdrop-blur-xs text-xs font-bold text-[#C68B59]">
                        {isAr ? project.city_ar : project.city_en}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C68B59]" />
                        <span>{isAr ? project.location_ar : project.location_en}</span>
                      </div>

                      <h2 className="text-lg font-bold text-[#0B192C] mb-3 line-clamp-2">
                        {isAr ? project.title_ar : project.title_en}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {isAr ? project.solution_ar : project.solution_en}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100">
                    <Link
                      href={`/${locale}/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0B192C] group-hover:text-[#C68B59] transition-colors mt-4"
                    >
                      <span>{isAr ? "عرض دراسة الحالة كاملة" : "Read Full Case Study"}</span>
                      {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
