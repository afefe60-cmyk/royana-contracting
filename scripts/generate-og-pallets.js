const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateAllOgImages() {
  const width = 1200;
  const height = 630;

  const publicImages = path.join(__dirname, '..', 'public', 'images');
  const palletsDir = path.join(publicImages, 'pallets');

  // 1. Convert pallet webps to jpg for WhatsApp compatibility
  const palletWebps = [
    'wooden-pallet-1', 'wooden-pallet-2',
    'plastic-pallet-1', 'plastic-pallet-2',
    'metal-pallet-1'
  ];

  for (const name of palletWebps) {
    const webpPath = path.join(palletsDir, `${name}.webp`);
    const jpgPath = path.join(palletsDir, `${name}.jpg`);
    if (fs.existsSync(webpPath)) {
      await sharp(webpPath)
        .resize({ width: 1200, height: 630, fit: 'cover' })
        .jpeg({ quality: 90, progressive: true })
        .toFile(jpgPath);
      console.log(`Converted: ${jpgPath}`);
    }
  }

  // 2. Generate Dedicated Pallets OG Image: og-pallets.jpg
  const logoPath = path.join(publicImages, 'logo-white.png');
  let logoBuffer = null;
  if (fs.existsSync(logoPath)) {
    logoBuffer = await sharp(logoPath)
      .resize({ width: 380, height: 120, fit: 'inside' })
      .toBuffer();
  }

  // Read a wooden pallet thumbnail for the card
  let palletPhotoBuffer = null;
  const samplePalletPath = path.join(palletsDir, 'wooden-pallet-1.webp');
  if (fs.existsSync(samplePalletPath)) {
    palletPhotoBuffer = await sharp(samplePalletPath)
      .resize({ width: 460, height: 380, fit: 'cover' })
      .jpeg({ quality: 90 })
      .toBuffer();
  }

  const svgPalletsOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050a14" />
        <stop offset="50%" stop-color="#070d18" />
        <stop offset="100%" stop-color="#0d1b32" />
      </linearGradient>
      <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00d2ff" />
        <stop offset="100%" stop-color="#3a7bd5" />
      </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#bg)" />

    <!-- Grid -->
    <g opacity="0.06" stroke="#00d2ff" stroke-width="1">
      ${Array.from({ length: 30 }).map((_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${height}" />`).join('')}
      ${Array.from({ length: 16 }).map((_, i) => `<line x1="0" y1="${i * 40}" x2="${width}" y2="${i * 40}" />`).join('')}
    </g>

    <!-- Top Accent -->
    <rect x="0" y="0" width="${width}" height="6" fill="url(#cyanLine)" />

    <!-- Badge -->
    <g transform="translate(680, 50)">
      <rect width="460" height="42" rx="21" fill="#121e34" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.4" />
      <text x="430" y="27" fill="#00d2ff" font-family="'Cairo', sans-serif" font-size="16" font-weight="bold" text-anchor="end">
        توريد تعاقدي للمستودعات والمصانع | كميات جملة
      </text>
    </g>

    <!-- Title and Subtitle -->
    <text x="1140" y="240" fill="#ffffff" font-family="'Cairo', sans-serif" font-size="44" font-weight="900" text-anchor="end">
      تصنيع وتوريد الطبالي الصناعية بجدة
    </text>
    <text x="1140" y="290" fill="#00d2ff" font-family="'Cairo', sans-serif" font-size="24" font-weight="bold" text-anchor="end">
      طبالي خشبية معالجة (ISPM 15) • بلاستيكية (SFDA) • معدنية حديد
    </text>

    <!-- Bullet Features (Right side) -->
    <g transform="translate(680, 335)" font-family="'Cairo', sans-serif" font-size="19" font-weight="600" fill="#cbd5e1">
      <text x="460" y="30" text-anchor="end">✓ خشب طبيعي معالج حرارياً ومختوم للتصدير والشحن الدولي</text>
      <text x="460" y="70" text-anchor="end">✓ طبالي بلاستيك نقية HDPE مطابقة لهيئة الغذاء والدواء</text>
      <text x="460" y="110" text-anchor="end">✓ طبالي حديد للأحمال الشاقة حتى 5000 كجم ومقاومة الحريق</text>
      <text x="460" y="150" text-anchor="end">✓ مقاسات قياسية (120×100، 120×80 يورو) ومقاسات تفصيل</text>
    </g>

    <!-- Bottom line & contact -->
    <rect x="60" y="540" width="1080" height="1" fill="#38bdf8" fill-opacity="0.2" />
    <g transform="translate(60, 575)" font-family="'Cairo', sans-serif">
      <text x="1080" y="25" fill="#94a3b8" font-size="18" font-weight="bold" text-anchor="end">
        مؤسسة رؤيانا الحديثة للمقاولات والتوريدات • جدة، المملكة العربية السعودية
      </text>
      <text x="0" y="25" fill="#00d2ff" font-size="19" font-weight="bold" text-anchor="start">
        royana.com.sa  |  050 880 5861
      </text>
    </g>
  </svg>
  `;

  const composites = [
    { input: Buffer.from(svgPalletsOverlay), top: 0, left: 0 }
  ];

  if (logoBuffer) {
    composites.push({ input: logoBuffer, top: 45, left: 60 });
  }

  if (palletPhotoBuffer) {
    // Put sample photo in left frame
    composites.push({ input: palletPhotoBuffer, top: 140, left: 60 });
  }

  const palletsOgPath = path.join(publicImages, 'og-pallets.jpg');
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 7, g: 13, b: 24 }
    }
  })
  .composite(composites)
  .jpeg({ quality: 92, progressive: true })
  .toFile(palletsOgPath);

  console.log('Successfully created:', palletsOgPath);
}

generateAllOgImages().catch(console.error);
