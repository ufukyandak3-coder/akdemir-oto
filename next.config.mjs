/** @type {import('next').NextConfig} */

// ─────────────────────────────────────────────────────────────
// SİTE DONDURULDU — Burada SADECE görünmez altyapı/güvenlik var.
// Hiçbir görsel, animasyon, video veya layout DEĞİŞMEZ.
// CSP (Content-Security-Policy) BİLEREK EKLENMEDİ: geçen sefer
// videoları ve Fontshare fontlarını blokladı. ASLA eklenmeyecek.
// ─────────────────────────────────────────────────────────────

// Kaynak ENGELLEMEYEN güvenlik başlıkları (clickjacking, sniffing,
// HTTPS zorlama). Hiçbiri video/font/script yüklenmesini etkilemez.
const securityHeaders = [
  // Tarayıcıyı her zaman HTTPS'e zorlar (2 yıl, alt alanlar dahil).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // MIME-type tahminini kapatır (XSS yüzeyini daraltır).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Siteyi başka bir sitenin iframe'ine gömülmekten korur (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Referrer bilgisini sınırlar.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Kullanılmayan tarayıcı API'lerini kapatır (sitede hiçbiri kullanılmıyor).
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // DNS prefetch kontrolü.
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

// Statik ağır varlıklar (video, font, görsel, frame'ler) için uzun cache.
// CDN/tarayıcı bir kez indirip saklar → tekrar tekrar inmez → bant
// genişliği düşer, yüksek trafikte çökme riski azalır. Görsel etki: SIFIR.
const longCache = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig = {
  reactStrictMode: true,

  // Gereksiz "X-Powered-By: Next.js" başlığını kaldırır (bilgi sızıntısı).
  poweredByHeader: false,

  // Üretim derlemesinde kaynak haritalarını gizler (kod sızıntısını azaltır).
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        // Tüm sayfalara güvenlik başlıkları.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/video/:path*",
        headers: longCache,
      },
      {
        source: "/images/:path*",
        headers: longCache,
      },
      {
        source: "/fonts/:path*",
        headers: longCache,
      },
    ];
  },
};

export default nextConfig;
