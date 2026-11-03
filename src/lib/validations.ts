import { z } from "zod";

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "الاسم يجب ألا يقل عن 3 أحرف" })
    .max(80, { message: "الاسم طويل جداً" }),
  phone: z
    .string()
    .regex(/^(05|5|\+9665|009665)[0-9]{8}$/, {
      message: "يرجى إدخال رقم جوال سعودي صحيح (مثال: 0508805861)",
    }),
  serviceType: z.string().min(1, { message: "يرجى اختيار نوع الخدمة" }),
  city: z.string().min(2, { message: "يرجى تحديد المدينة" }),
  projectDescription: z
    .string()
    .min(10, { message: "يرجى كتابة تفاصيل المشروع بما لا يقل عن 10 أحرف" })
    .max(2000, { message: "الوصف طويل جداً" }),
  // Honeypot field (must be empty!)
  website_url: z.string().max(0, { message: "Spam detected" }).optional(),
  // Turnstile token
  turnstileToken: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
