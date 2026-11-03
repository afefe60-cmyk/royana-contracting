import { config, fields, collection, singleton } from "@keystatic/core";

const isGithubConfigured =
  Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID) &&
  Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET) &&
  Boolean(process.env.KEYSTATIC_SECRET);

export default config({
  storage: isGithubConfigured
    ? {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER || "royana-org",
          name: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME || "royana-v2",
        },
      }
    : { kind: "local" },
  ui: {
    brand: {
      name: "رؤيانا الحديثة للمقاولات - لوحة التحرير",
    },
  },
  singletons: {
    siteSettings: singleton({
      label: "إعدادات الموقع والأرقام والتواصل",
      path: "content/site-settings",
      format: { data: "json" },
      schema: {
        stats: fields.array(
          fields.object({
            id: fields.text({ label: "المعرف ID" }),
            value: fields.number({ label: "القيمة العددية (اتركها فارغة لإخفاء الرقم)" }),
            suffix: fields.text({ label: "اللاحقة (+ أو %)" }),
            label_ar: fields.text({ label: "العنوان بالعربية" }),
            label_en: fields.text({ label: "العنوان بالإنجليزية" }),
            visible: fields.checkbox({ label: "إظهار الإحصائية في الموقع", defaultValue: false }),
          }),
          { label: "شريط الإحصائيات والإثباتات", itemLabel: (props) => props.fields.label_ar.value || "إحصائية" }
        ),
        credentials: fields.object({
          commercial_registration: fields.text({ label: "رقم السجل التجاري" }),
          vat_number: fields.text({ label: "الرقم الضريبي" }),
          classification: fields.object({
            grade: fields.text({ label: "درجة التصنيف" }),
            field: fields.text({ label: "مجال التصنيف" }),
          }),
        }),
        contact: fields.object({
          phone: fields.text({ label: "الهاتف الدولي (+966508805861)" }),
          phone_display: fields.text({ label: "الهاتف للعرض (050 880 5861)" }),
          phone_alt: fields.text({ label: "الهاتف الإضافي" }),
          phone_alt_display: fields.text({ label: "الهاتف الإضافي للعرض" }),
          whatsapp: fields.text({ label: "رقم الواتساب (966508805861)" }),
          email: fields.text({ label: "البريد الإلكتروني" }),
        }),
      },
    }),
  },
  collections: {
    projects: collection({
      label: "معرض المشاريع",
      slugField: "id",
      path: "content/projects/*",
      format: { data: "json" },
      schema: {
        id: fields.slug({ name: { label: "المعرف (Slug)" } }),
        title_ar: fields.text({ label: "عنوان المشروع بالعربية" }),
        title_en: fields.text({ label: "عنوان المشروع بالإنجليزية" }),
        category: fields.select({
          label: "التصنيف",
          options: [
            { label: "ترميم وتجديد", value: "restoration" },
            { label: "إنشاءات وبناء", value: "construction" },
            { label: "كهرباء ومياه", value: "mep" },
            { label: "استشارات وإشراف", value: "consulting" },
          ],
          defaultValue: "restoration",
        }),
        city_ar: fields.text({ label: "المدينة بالعربية", defaultValue: "جدة" }),
        city_en: fields.text({ label: "المدينة بالإنجليزية", defaultValue: "Jeddah" }),
        location_ar: fields.text({ label: "الموقع/الحي بالعربية" }),
        location_en: fields.text({ label: "الموقع/الحي بالإنجليزية" }),
        year: fields.text({ label: "سنة التنفيذ", defaultValue: "2024" }),
        featured: fields.checkbox({ label: "عرض في الرئيسية", defaultValue: false }),
        draft: fields.checkbox({ label: "مسودة (لا تظهر للزوار ولا في السايت ماب)", defaultValue: true }),
        thumbnail: fields.text({ label: "مسار الصورة المصغرة" }),
        before_image: fields.text({ label: "مسار صورة قبل الترميم (اختياري)" }),
        after_image: fields.text({ label: "مسار صورة بعد الترميم (اختياري)" }),
        challenge_ar: fields.text({ label: "التحدي الإنشائي (عربي)", multiline: true }),
        challenge_en: fields.text({ label: "التحدي الإنشائي (إنجليزي)", multiline: true }),
        solution_ar: fields.text({ label: "الحل الهندسي (عربي)", multiline: true }),
        solution_en: fields.text({ label: "الحل الهندسي (إنجليزي)", multiline: true }),
        outcome_ar: fields.text({ label: "النتيجة النهائية (عربي)", multiline: true }),
        outcome_en: fields.text({ label: "النتيجة النهائية (إنجليزي)", multiline: true }),
      },
    }),
  },
});
