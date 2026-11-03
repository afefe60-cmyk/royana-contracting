import { NextRequest, NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validations";

// In-memory rate limiting map (IP -> timestamps[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up old entries periodically
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            "تم تجاوز الحد المسموح من الطلبات خلال فترة وجيزة. يرجى الانتظار أو التواصل معنا مباشرة عبر الواتساب أو الهاتف.",
        },
        { status: 429 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    let fullName = "";
    let phone = "";
    let serviceType = "";
    let city = "";
    let projectDescription = "";
    let website_url = "";
    let turnstileToken = "";
    let attachedFileName = "";
    let attachedFileSize = 0;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      fullName = (formData.get("fullName") as string) || "";
      phone = (formData.get("phone") as string) || "";
      serviceType = (formData.get("serviceType") as string) || "";
      city = (formData.get("city") as string) || "";
      projectDescription = (formData.get("projectDescription") as string) || "";
      website_url = (formData.get("website_url") as string) || "";
      turnstileToken = (formData.get("turnstileToken") as string) || "";

      const file = formData.get("attachment") as File | null;
      if (file && file.size > 0) {
        // Max 5MB
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          return NextResponse.json(
            { error: "حجم الملف المرفق يتجاوز الحد الأقصى المسموح به (5 ميجابايت)." },
            { status: 400 }
          );
        }

        const allowedTypes = [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/webp",
        ];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            {
              error:
                "نوع الملف المرفق غير مدعوم. الصيغ المقبولة: PDF أو صور JPG و PNG فقط.",
            },
            { status: 400 }
          );
        }

        attachedFileName = file.name;
        attachedFileSize = file.size;
      }
    } else {
      const body = await request.json();
      fullName = body.fullName || "";
      phone = body.phone || "";
      serviceType = body.serviceType || "";
      city = body.city || "";
      projectDescription = body.projectDescription || "";
      website_url = body.website_url || "";
      turnstileToken = body.turnstileToken || "";
    }

    // 1. Honeypot check
    if (website_url) {
      // Spam bot triggered honeypot
      return NextResponse.json({
        success: true,
        message: "تم استلام طلبكم بنجاح.",
      });
    }

    // 2. Validate input schema
    const validation = quoteFormSchema.safeParse({
      fullName,
      phone,
      serviceType,
      city,
      projectDescription,
      website_url,
      turnstileToken,
    });

    if (!validation.success) {
      const errorMsg =
        validation.error.errors[0]?.message || "بيانات النموذج غير مكتملة أو غير صحيحة.";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    // 3. Verify Cloudflare Turnstile token if configured
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken) {
      try {
        const verifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret: turnstileSecret,
              response: turnstileToken,
              remoteip: ip,
            }),
          }
        );
        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          return NextResponse.json(
            { error: "فشل التحقق الأمني من الكابتشا. يرجى إعادة المحاولة." },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("Turnstile verification error:", err);
      }
    }

    // 4. Send Email via Resend if API Key is available
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.QUOTE_RECIPIENT_EMAIL || "info@royana.com.sa";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "رؤيانا للمقاولات <quotes@royana.com.sa>",
            to: [recipientEmail],
            reply_to: "info@royana.com.sa",
            subject: `طلب عرض سعر جديد: ${fullName} - ${serviceType}`,
            html: `
              <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #1E293B; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; border-radius: 8px; padding: 24px;">
                <h2 style="color: #0B192C; border-bottom: 2px solid #C68B59; padding-bottom: 8px;">طلب عرض سعر جديد من الموقع الإلكتروني</h2>
                <p><strong>اسم العميل:</strong> ${fullName}</p>
                <p><strong>رقم الجوال:</strong> <a href="tel:${phone}">${phone}</a> | <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}">محادثة واتساب</a></p>
                <p><strong>الخدمة المطلوبة:</strong> ${serviceType}</p>
                <p><strong>المدينة:</strong> ${city}</p>
                <p><strong>تفاصيل المشروع:</strong></p>
                <blockquote style="background: #F8FAFC; padding: 12px; border-right: 4px solid #C68B59; margin: 8px 0;">${projectDescription}</blockquote>
                ${
                  attachedFileName
                    ? `<p><strong>الملف المرفق:</strong> ${attachedFileName} (${(attachedFileSize / 1024).toFixed(1)} KB)</p>`
                    : ""
                }
                <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
                <p style="font-size: 12px; color: #64748B;">تم الإرسال عبر نموذج طلب الأسعار - موقع مؤسسة رؤيانا الحديثة للمقاولات</p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Resend delivery failed:", emailErr);
      }
    } else {
      // Offline/Dev mode log
      console.log("=== NEW QUOTE REQUEST (Resend API key not configured) ===");
      console.log({ fullName, phone, serviceType, city, projectDescription, attachedFileName });
    }

    return NextResponse.json({
      success: true,
      message:
        "تم استلام طلبكم بنجاح! سيقوم مهندسنا المختص بمراجعة التفاصيل والتواصل معكم لترتيب المعاينة وعرض السعر.",
    });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع أثناء معالجة الطلب. يرجى المحاولة لاحقاً." },
      { status: 500 }
    );
  }
}
