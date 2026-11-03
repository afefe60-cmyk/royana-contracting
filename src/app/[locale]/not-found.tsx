import React from "react";
import Link from "next/link";
import { AlertTriangle, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-6 text-[#C68B59]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold text-[#C68B59] uppercase tracking-wider">
          خطأ 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] mt-2 mb-3">
          الصفحة المطلوبة غير موجودة
        </h1>

        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          عذراً، قد يكون تم نقل الصفحة أو تعديل عنوانها. يمكنك العودة للصفحة الرئيسية أو التواصل معنا مباشرة.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/ar" variant="primary" size="md" className="w-full sm:w-auto">
            <Home className="w-4 h-4 text-[#0B192C]" />
            <span>الرئيسية</span>
          </Button>
          <Button href="/ar/contact" variant="outline" size="md" className="w-full sm:w-auto">
            <Phone className="w-4 h-4 text-[#C68B59]" />
            <span>اتصل بنا</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
