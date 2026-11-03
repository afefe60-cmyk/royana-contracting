"use client";

import React, { useState, useRef } from "react";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackQuoteSubmission } from "@/lib/analytics";

interface QuoteRequestFormProps {
  locale?: string;
  defaultService?: string;
}

export function QuoteRequestForm({
  locale = "ar",
  defaultService = "",
}: QuoteRequestFormProps) {
  const isAr = locale === "ar";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState(defaultService || "الإنشاءات والبناء والترميم");
  const [city, setCity] = useState("جدة");
  const [projectDescription, setProjectDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState(""); // Honeypot
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage(
          isAr
            ? "حجم الملف يتجاوز 5 ميجابايت. يرجى اختيار ملف أصغر."
            : "File size exceeds 5MB limit. Please choose a smaller file."
        );
        setSelectedFile(null);
        return;
      }
      setErrorMessage("");
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("serviceType", serviceType);
      formData.append("city", city);
      formData.append("projectDescription", projectDescription);
      formData.append("website_url", websiteUrl); // Honeypot
      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || (isAr ? "فشل إرسال الطلب" : "Submission failed"));
      }

      // Success
      setSuccessMessage(
        data.message ||
          (isAr
            ? "تم استلام طلبكم بنجاح! سيتواصل معكم فريقنا الهندسي قريباً."
            : "Your request was received successfully! Our engineers will contact you shortly.")
      );

      // Trigger analytics conversion event
      trackQuoteSubmission(serviceType);

      // Reset form
      setFullName("");
      setPhone("");
      setProjectDescription("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          (isAr
            ? "حدث خطأ أثناء معالجة الطلب. يرجى المحاولة لاحقاً أو الاتصال بنا مباشرة."
            : "An error occurred. Please try again later or call us directly.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
      <div className="mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0B192C]">
          {isAr ? "طلب عرض سعر ومعاينة هندسية" : "Request a Quote & Site Inspection"}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {isAr
            ? "املأ البيانات أدناه وسيقوم مهندس مختص بدراسة طلبك والتواصل معك لترتيب المعاينة."
            : "Provide project details below and an engineer will contact you to schedule inspection."}
        </p>
      </div>

      {successMessage && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm font-semibold">{successMessage}</div>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm font-semibold">{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot field (hidden from real users) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url">Website URL</label>
          <input
            id="website_url"
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {isAr ? "الاسم الكامل *" : "Full Name *"}
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isAr ? "مثال: عبدالله محمد" : "e.g. John Doe"}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C68B59] focus:border-transparent text-sm"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {isAr ? "رقم الجوال السعودي *" : "Saudi Mobile Number *"}
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0508805861"
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C68B59] focus:border-transparent text-sm text-right"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Service Type */}
          <div>
            <label
              htmlFor="serviceType"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {isAr ? "الخدمة المطلوبة *" : "Required Service *"}
            </label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C68B59] focus:border-transparent text-sm bg-white"
            >
              <option value="الإنشاءات والبناء والترميم">
                {isAr ? "الإنشاءات والبناء والترميم" : "Construction & Renovation"}
              </option>
              <option value="شبكات الكهرباء والمياه والصرف">
                {isAr ? "شبكات الكهرباء والمياه والصرف" : "Electrical & Plumbing (MEP)"}
              </option>
              <option value="إدارة المشاريع والاستشارات الهندسية">
                {isAr ? "إدارة المشاريع والاستشارات الهندسية" : "Project Management"}
              </option>
              <option value="فحص وتقييم المباني والفلل">
                {isAr ? "فحص وتقييم المباني والفلل" : "Building Inspection"}
              </option>
              <option value="توريد الطبالي (خشبية، معدنية، بلاستيكية)">
                {isAr ? "توريد الطبالي الصناعية" : "Pallets Procurement"}
              </option>
              <option value="خطوط إنتاج أو طاقة شمسية أو زراعة">
                {isAr ? "قطاعات أخرى (مصانع، طاقة، زراعة)" : "Other Industrial Sectors"}
              </option>
            </select>
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {isAr ? "المدينة / الحي *" : "City / District *"}
            </label>
            <input
              id="city"
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={isAr ? "مثال: جدة - حي الروضة" : "e.g. Jeddah - Al-Rawdah"}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C68B59] focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label
            htmlFor="projectDescription"
            className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
          >
            {isAr ? "وصف مختصر للمشروع واحتياجاتك *" : "Project Description & Scope *"}
          </label>
          <textarea
            id="projectDescription"
            rows={4}
            required
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder={
              isAr
                ? "اذكر نوع المبنى (فيلا، عمارة، مصنع)، المساحة التقريبية، ونطاق الأعمال المطلوب تنفيذها..."
                : "Mention building type, approximate area, and specific requirements..."
            }
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C68B59] focus:border-transparent text-sm leading-relaxed"
          />
        </div>

        {/* File Attachment (Optional - max 5MB) */}
        <div>
          <label
            htmlFor="fileAttachment"
            className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
          >
            {isAr
              ? "مخطط أو صور للموقع (اختياري - أقصى حجم 5 ميجابايت)"
              : "Drawings or Site Photos (Optional - max 5MB)"}
          </label>
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              id="fileAttachment"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#0B192C]/5 file:text-[#0B192C] hover:file:bg-[#0B192C]/10 cursor-pointer"
            />
          </div>
          {selectedFile && (
            <p className="mt-1 text-xs text-slate-600 flex items-center gap-1">
              <Upload className="w-3.5 h-3.5 text-[#C68B59]" />
              <span>
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </p>
          )}
        </div>

        {/* Submit Button (Primary Bronze with Navy text) */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-[#0B192C]" />
                <span>{isAr ? "جاري إرسال الطلب..." : "Submitting..."}</span>
              </span>
            ) : (
              <span>{isAr ? "إرسال طلب عرض السعر الآن" : "Submit Quote Request Now"}</span>
            )}
          </Button>
        </div>

        <p className="text-[11px] text-slate-500 text-center">
          {isAr
            ? "بياناتكم مشمولة بالسرية التامة وفق نظام حماية البيانات الشخصية السعودي (PDPL)."
            : "Your personal details are safeguarded per Saudi Personal Data Protection Law (PDPL)."}
        </p>
      </form>
    </div>
  );
}
