const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // Read logo if available
  const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo-white.png');
  let logoBuffer = null;
  if (fs.existsSync(logoPath)) {
    logoBuffer = await sharp(logoPath)
      .resize({ width: 440, height: 140, fit: 'inside' })
      .toBuffer();
  }

  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Gradient -->
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050a14" />
        <stop offset="50%" stop-color="#070d18" />
        <stop offset="100%" stop-color="#0d192f" />
      </linearGradient>

      <!-- Cyan Glow -->
      <radialGradient id="glow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#00d2ff" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#070d18" stop-opacity="0" />
      </radialGradient>

      <!-- Gradient for accent lines -->
      <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00d2ff" />
        <stop offset="50%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#3a7bd5" />
      </linearGradient>
    </defs>

    <!-- Background Base -->
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect width="${width}" height="${height}" fill="url(#glow)" />

    <!-- Technical Grid Pattern -->
    <g opacity="0.06" stroke="#00d2ff" stroke-width="1">
      ${Array.from({ length: 30 }).map((_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${height}" />`).join('')}
      ${Array.from({ length: 16 }).map((_, i) => `<line x1="0" y1="${i * 40}" x2="${width}" y2="${i * 40}" />`).join('')}
    </g>

    <!-- Top Accent Cyan Border Line -->
    <rect x="0" y="0" width="${width}" height="6" fill="url(#cyanLine)" />

    <!-- Verified Authority Badge (Top Right in Arabic) -->
    <g transform="translate(720, 50)">
      <rect width="420" height="42" rx="21" fill="#121e34" fill-opacity="0.85" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.4" />
      <circle cx="395" cy="21" r="5" fill="#00d2ff" />
      <text x="375" y="27" fill="#00d2ff" font-family="'Cairo', 'Segoe UI', Tahoma, sans-serif" font-size="16" font-weight="bold" text-anchor="end">
        مؤسسة معتمدة بالكود السعودي | ترخيص ساري
      </text>
    </g>

    <!-- Main Title -->
    <text x="600" y="275" fill="#ffffff" font-family="'Cairo', 'Segoe UI', Tahoma, sans-serif" font-size="44" font-weight="900" text-anchor="middle" letter-spacing="0">
      مؤسسة رؤيانا الحديثة للمقاولات
    </text>

    <!-- Subtitle / English Brand -->
    <text x="600" y="325" fill="#00d2ff" font-family="'Plus Jakarta Sans', 'Segoe UI', Tahoma, sans-serif" font-size="20" font-weight="700" text-anchor="middle" letter-spacing="2">
      ROYANA MODERN CONTRACTING ESTABLISHMENT
    </text>

    <!-- 3 Core Service Pills -->
    <g transform="translate(150, 375)">
      <!-- Pill 1: Contracting -->
      <g transform="translate(620, 0)">
        <rect width="280" height="60" rx="16" fill="#121e34" fill-opacity="0.9" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.35" />
        <text x="140" y="37" fill="#ffffff" font-family="'Cairo', 'Segoe UI', Tahoma, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">
          🏗️ مقاولات وترميم إنشائي
        </text>
      </g>

      <!-- Pill 2: Factory Rigging -->
      <g transform="translate(310, 0)">
        <rect width="280" height="60" rx="16" fill="#121e34" fill-opacity="0.9" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.35" />
        <text x="140" y="37" fill="#ffffff" font-family="'Cairo', 'Segoe UI', Tahoma, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">
          🏭 تجهيز وتركيب المصانع
        </text>
      </g>

      <!-- Pill 3: Pallets -->
      <g transform="translate(0, 0)">
        <rect width="280" height="60" rx="16" fill="#121e34" fill-opacity="0.9" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.35" />
        <text x="140" y="37" fill="#ffffff" font-family="'Cairo', 'Segoe UI', Tahoma, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">
          📦 توريد وتصنيع الطبالي
        </text>
      </g>
    </g>

    <!-- Bottom Footer Bar -->
    <rect x="60" y="480" width="1080" height="1" fill="#38bdf8" fill-opacity="0.2" />

    <g transform="translate(60, 520)">
      <!-- Location & City -->
      <text x="1080" y="40" fill="#94a3b8" font-family="'Cairo', 'Segoe UI', Tahoma, sans-serif" font-size="18" font-weight="600" text-anchor="end">
        📍 جدة، المملكة العربية السعودية • خدمة ميدانية لكافة الأحياء والمدن الصناعية
      </text>

      <!-- Website domain & phone -->
      <text x="0" y="40" fill="#00d2ff" font-family="'Plus Jakarta Sans', 'Segoe UI', Tahoma, sans-serif" font-size="19" font-weight="bold" text-anchor="start">
        royana.com.sa  |  +966 50 880 5861
      </text>
    </g>
  </svg>
  `;

  const composites = [
    { input: Buffer.from(svgOverlay), top: 0, left: 0 }
  ];

  if (logoBuffer) {
    composites.push({
      input: logoBuffer,
      top: 55,
      left: 70
    });
  }

  const outputPath = path.join(__dirname, '..', 'public', 'images', 'og-share.jpg');
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
  .toFile(outputPath);

  console.log('Successfully created OG image at:', outputPath);
}

createOgImage().catch(err => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
