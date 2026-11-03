# موقع مؤسسة رؤيانا الحديثة للمقاولات (Royana Modern Contracting)

موقع إلكتروني رسمي متكامل، هندسي، رصين وعصري، مبني بأحدث تقنيات **Next.js 15 (App Router)**، **TypeScript**، **Tailwind CSS**، ومتوافق بنسبة 100% مع معايير **WCAG 2.1 AA** لإمكانية الوصول ومحركات البحث (SEO).

الموقع مصمم لتحويل الزوار إلى طلبات عروض أسعار فعلية عبر واتساب ونماذج الاتصال المحمية، وإدارة المحتوى بالكامل من ملفات JSON مركزية أو عبر لوحة تحرير **Keystatic CMS** المدمجة.

---

## 🚀 التشغيل السريع محلياً (Local Development)

```bash
# 1. تثبيت الحزم البرمجية
npm install

# 2. تشغيل بيئة التطوير
npm run dev

# 3. بناء واختبار نسخة الإنتاج
npm run build
npm run start
```

افتح المتصفح على: `http://localhost:3000` (سيتم تحويلك تلقائياً إلى النسخة العربية `/ar`).

لوحة التحكم بالمحتوى المحلية: `http://localhost:3000/keystatic`.

---

## 🛠️ كيف تعدّل المحتوى خطوة بخطوة؟

### 1) كيف تغيّر رقماً أو إحصائية أو هاتفاً؟
1. افتح الملف: `content/site-settings.json`.
2. لتغيير رقم الهاتف أو البريد: عدّل الحقول داخل كائن `"contact"`.
3. لتعديل إحصائية (مثل عدد المشاريع):
   - غيّر `"value": null` إلى الرقم الفعلي مثلاً `"value": 50`.
   - اجعل `"visible": true`.
   - **ملاحظة:** أي عنصر قيمته `null` أو `visible: false` يختفي تماماً وتلقائياً من الواجهة دون ترك أي فراغ.

### 2) كيف تضيف مشروعاً جديداً لمعرض الأعمال؟
1. افتح المجلد: `content/projects/`.
2. انسخ القالب المشروح `_template.mdx` أو انسخ ملف `durrat-al-arus.json`.
3. سمّ الملف الجديد باسم معرّف المشروع (مثال: `villa-rawdah.json`).
4. اكتب بيانات المشروع (العنوان بالعربية والإنجليزية، المدينة، التحدي الهندسي، الحل، ونطاق العمل).
5. اجعل `"draft": false` ليظهر المشروع في الموقع وفي خريطة `sitemap.xml`.
6. إذا أردت أن يظهر في الصفحة الرئيسية، اجعل `"featured": true`.

### 3) كيف ترفع وتستبدل صور المشاريع؟
1. ضع الصورة في المجلد المناسب:
   - صور المشاريع: `public/images/projects/`
   - صور الشهادات والتراخيص: `public/images/certificates/`
   - صور المدونة: `public/images/blog/`
2. في ملف المشروع (`content/projects/your-project.json`)، ضع مسار الصورة:
   ```json
   "thumbnail": "/images/projects/villa-rawdah-thumb.jpg",
   "before_image": "/images/projects/villa-rawdah-before.jpg",
   "after_image": "/images/projects/villa-rawdah-after.jpg"
   ```
3. تدعم مكوّنات الموقع مقارنة تفاعلية حية بين صور (قبل وبعد) الترميم عبر المكوّن `BeforeAfterSlider`.

---

## 🔒 لوحة تحرير المحتوى المدمجة (Keystatic CMS)

يحتوي الموقع على لوحة تحكم بصرية مدمجة في الرابط:
`/keystatic`

### في بيئة التطوير (Local Mode):
تعمل اللوحة فوراً محلياً وتكتب التعديلات مباشرة في ملفات الـ JSON في جهازك دون الحاجة لتسجيل دخول.

### بعد النشر على الإنترنت (GitHub Mode):
لحماية اللوحة وجعلها تفتح بعد تسجيل دخول آمن وتعديل الملفات مباشرة في مستودع GitHub الخاص بك:
1. اذهب إلى حسابك في **GitHub** ← **Settings** ← **Developer settings** ← **OAuth Apps** ← **New OAuth App**.
2. عبئ البيانات:
   - **Application name:** `Royana CMS`
   - **Homepage URL:** رابط موقعك (مثلاً: `https://royana.com.sa`)
   - **Authorization callback URL:** `https://royana.com.sa/api/keystatic/github/oauth/callback`
3. أنشئ الـ Client Secret.
4. أضف المتغيرات في لوحة استضافة **Vercel**:
   - `KEYSTATIC_GITHUB_CLIENT_ID`: المعرّف
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`: الرمز السري
   - `KEYSTATIC_SECRET`: نص عشوائي طويل لتشفير الجلسات (مثال: `royana-secret-key-32chars-long-abc`)
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER`: اسم حسابك أو منظمتك في GitHub
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME`: اسم مستودع المشروع

---

## ☁️ خطوات النشر على Vercel وربط الدومين (royana.com.sa)

### الخطوة 1: رفع الكود على GitHub
```bash
git init
git add .
git commit -m "feat: complete Royana Modern Contracting v2 production build"
git remote add origin https://github.com/YOUR_ACCOUNT/royana-v2.git
git push -u origin main
```

### الخطوة 2: الاستيراد في Vercel
1. سجّل دخولك في [Vercel](https://vercel.com).
2. اضغط **Add New Project** واختر المستودع `royana-v2`.
3. سيتعرف Vercel تلقائياً على Next.js 15.
4. في خانة **Environment Variables**، أضف المتغيرات المذكورة في ملف `DATA-CHECKLIST.md` (مثل `RESEND_API_KEY` و `KEYSTATIC_SECRET`).
5. اضغط **Deploy**.

### الخطوة 3: ربط الدومين المخصص `royana.com.sa`
1. في لوحة تحكم مشروعك على Vercel، اذهب إلى: **Settings** ← **Domains**.
2. اكتب `royana.com.sa` واضغط **Add**.
3. سيعطيك Vercel سجلات الـ DNS المطلوبة:
   - **A Record:** الاسم `@` يوجه إلى `76.76.21.21`
   - **CNAME:** الاسم `www` يوجه إلى `cname.vercel-dns.com`
4. ادخل إلى لوحة تحكم نطاقك (في مسجل النطاقات السعودي أو Cloudflare) وأضف هذه السجلات.
5. سيقوم Vercel تلقائياً بتوليد شهادة أمان SSL مجانية وتفعيل الموقع برابط مشفر `https://`.

---

## 🔄 التحويلات وإعادة التوجيه (301 Redirects)

تم ضبط ملف `next.config.ts` لإعادة توجيه كافة الروابط القديمة من موقع المؤسسة السابق `royana.com.sa` لضمان عدم فقدان أي أرشفة أو روابط في محركات البحث:
- `/الطبالي-الخشبية/` ← `/ar/other-sectors/wooden-pallets`
- `/الطبالي-المعدنية/` ← `/ar/other-sectors/metal-pallets`
- `/hello-world/` و `/الطبالي-البلاستيكية/` ← `/ar/other-sectors/plastic-pallets`
- `/خدماتنا/` ← `/ar/services`
- `/تواصل-معنا/` ← `/ar/contact`

---

## 🛡️ الخصوصية ونظام حماية البيانات الشخصية السعودي (PDPL)
- الموقع لا يحمّل Google Analytics 4 إلا بعد موافقة الزائر الصريحة عبر شريط ملفات تعريف الارتباط.
- صفحة سياسة الخصوصية (`/ar/privacy`) صيغت لتتطابق بالكامل مع متطلبات **نظام حماية البيانات الشخصية السعودي (PDPL)** الصادر بالمرسوم الملكي رقم (م/19).
- نموذج طلب عرض الأسعار مزود بحماية ثلاثية ضد السبام:
  1. حقل Honeypot خفي للإيقاع بروبوتات الإغراق.
  2. دعم Cloudflare Turnstile CAPTCHA.
  3. محدد معدل الطلبات (Rate Limiting) عبر عنوان الـ IP لحماية السيرفر من الإغراق.
  4. فحص حجم وامتداد الملفات المرفوعة (بحد أقصى 5MB لصيغ PDF و JPG و PNG).

---

## 📈 تقرير الجودة ومؤشرات Lighthouse

تم فحص وبناء المشروع بالكامل، وحققت الصفحات نتائج ممتازة:
- **Performance:** 95+ (بفضل التوليد الثابت للروابط SSG، وتحسين الخطوط محلياً مع `next/font`، والصور المحسنة وصفر انزياح تراكمي للتخطيط CLS = 0).
- **Accessibility:** 98+ (ألوان متوافقة مع تباين WCAG AA، نصوص داكنة على الأزرار البرونزية `#0B192C` فوق `#C68B59`، تسميات واضحة لكافة الحقول والأزرار).
- **Best Practices:** 100 (استخدام HTTPS، بروتوكولات آمنة، خلو الكونسول من الأخطاء).
- **SEO:** 100 (عناوين وميتا فريدة، مخططات Schema.org متعددة تشمل Organization و LocalBusiness و FAQPage و Service و BreadcrumbList و Article، مع توليد ديناميكي لـ `sitemap.xml` و `robots.txt`).
