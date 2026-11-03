import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { getProjects, getProjectById } from "@/lib/content";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Button } from "@/components/ui/Button";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { FinalCTASection } from "@/components/home/FinalCTASection";

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects(false);
  const params: Array<{ locale: string; id: string }> = [];

  for (const locale of ["ar", "en"]) {
    for (const p of projects) {
      params.push({ locale, id: p.id });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const isAr = locale === "ar";
  const project = getProjectById(id, false);

  if (!project) {
    return { title: isAr ? "المشروع غير موجود" : "Project Not Found" };
  }

  const title = isAr ? project.title_ar : project.title_en;
  const description = isAr ? project.solution_ar : project.solution_en;

  return {
    title: `${title} | مشاريع رؤيانا للمقاولات`,
    description,
    alternates: {
      canonical: `https://royana.com.sa/${locale}/projects/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://royana.com.sa/${locale}/projects/${id}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { locale, id } = await params;
  const isAr = locale === "ar";
  const project = getProjectById(id, false);

  if (!project) {
    notFound();
  }

  const title = isAr ? project.title_ar : project.title_en;
  const challenge = isAr ? project.challenge_ar : project.challenge_en;
  const solution = isAr ? project.solution_ar : project.solution_en;
  const scope = isAr ? project.scope_ar : project.scope_en;
  const outcome = isAr ? project.outcome_ar : project.outcome_en;
  const location = isAr ? project.location_ar : project.location_en;
  const city = isAr ? project.city_ar : project.city_en;

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "المشاريع" : "Projects", url: `https://royana.com.sa/${locale}/projects` },
    { name: title, url: `https://royana.com.sa/${locale}/projects/${id}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Header Banner */}
      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0B192C] text-xs font-bold text-[#C68B59]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{location} - {city}</span>
              </span>
              {project.year && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-white border border-slate-200 text-xs text-slate-600">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{project.year}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B192C] leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Visual Showcase: Before/After Slider */}
          {project.before_image && project.after_image ? (
            <div className="mb-14 max-w-4xl mx-auto">
              <h2 className="text-lg font-bold text-[#0B192C] mb-4 text-center">
                {isAr
                  ? "مقارنة الواجهات والتشطيب (اسحب المؤشر للمقارنة)"
                  : "Facade & Finishing Comparison (Drag slider)"}
              </h2>
              <BeforeAfterSlider
                beforeImage={project.before_image}
                afterImage={project.after_image}
                beforeLabel={isAr ? "قبل الترميم" : "Before"}
                afterLabel={isAr ? "بعد التسليم" : "After"}
              />
            </div>
          ) : (
            <div className="mb-14 max-w-4xl mx-auto relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200">
              <Image
                src={project.thumbnail}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Case Study Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            <div className="lg:col-span-8 space-y-10">
              {/* Challenge */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C68B59] mb-2">
                  {isAr ? "التحدي الفني والإنشائي بالموقع" : "Technical Challenge"}
                </h3>
                <p className="text-base text-slate-700 leading-relaxed">
                  {challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C68B59] mb-2">
                  {isAr ? "الحل الهندسي والتنفيذ المعتمد" : "Engineering Solution"}
                </h3>
                <p className="text-base text-slate-700 leading-relaxed">
                  {solution}
                </p>
              </div>

              {/* Scope */}
              <div>
                <h3 className="text-xl font-bold text-[#0B192C] mb-4">
                  {isAr ? "نطاق الأعمال المنفذة بالتفصيل:" : "Executed Scope of Work:"}
                </h3>
                <div className="space-y-3">
                  {scope.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                      <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0B192C] text-white">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C68B59] mb-2">
                  {isAr ? "النتيجة النهائية المحققة" : "Final Outcome & Impact"}
                </h3>
                <p className="text-base text-slate-200 leading-relaxed">
                  {outcome}
                </p>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 sticky top-28">
                <h4 className="text-base font-bold text-[#0B192C] mb-2">
                  {isAr ? "هل ترغب بترميم أو بناء مبنى مماثل؟" : "Planning a Similar Project?"}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  {isAr
                    ? "مهندسونا متواجدون في جدة ومستعدون لمعاينة موقعك وتقديم تقرير فني ومقايسة دقيقة."
                    : "Our engineers are based in Jeddah and ready to inspect your site and provide a certified BOQ."}
                </p>
                <Button
                  href={`/${locale}/contact`}
                  variant="primary"
                  size="md"
                  className="w-full mb-3"
                >
                  {isAr ? "اطلب معاينة هندسية" : "Request Inspection"}
                </Button>
                <Button
                  href={`/${locale}/projects`}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {isAr ? "العودة لكافة المشاريع" : "Back to Projects"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
