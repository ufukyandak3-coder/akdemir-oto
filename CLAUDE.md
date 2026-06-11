# Akdemir Yedek Parça — Claude Kuralları

## Dev Server Başlatma

```bash
./restart.sh
# veya
source ~/.nvm/nvm.sh && npm run dev
```

`npm run dev` şunu yapar: `pkill` → `rm -rf .next node_modules/.cache` → `next dev --turbo`

## 🚫 SİTE DONDURULDU — KESİN KURAL

Hiçbir animasyon, video, efekt, yazı, renk, font, layout, scroll davranışı,
Framer Motion, GSAP veya herhangi bir görsel/işlevsel unsur **değiştirilemez,
silinemez, taşınamaz**. Sadece görünmez altyapı (HTTP header, vercel.json,
Error Boundary) eklenebilir. Bkz: [SITE_FREEZE.md](SITE_FREEZE.md)

## Kesin Kurallar

### YASAK
- JSX'te `style={{ opacity: 0 }}` — GSAP çalışmazsa element kalıcı gizli kalır
- GSAP ile intro animasyonu — CSS `@keyframes` kullan (`globals.css`'teki class'lar var)
- `config.cache = false` webpack — Turbopack kullanıldığı için gereksiz

### ZORUNLU
- Her section ve SectionStack: `"use client"` — kaldırma
- Node komutlarında önce: `source ~/.nvm/nvm.sh`
- Kod değişikliğinden sonra: `npm run build` ile doğrula

## Proje Yapısı

```
components/sections/
  HeroSection.tsx      — hero-video.mp4, sol metin, CSS animasyonu
  BrandFocusSection.tsx — solid #0a0a0a, Peugeot/Citroën/Opel
  MacroSection.tsx     — motor-video.mp4, sağ metin, üst+alt gradient
  StatsSection.tsx     — Rakamlarla Akdemir
  B2BSection.tsx       — B2B & Güvence
  FinalSection.tsx     — İletişim / konum

public/video/
  hero-video.mp4   ✅
  motor-video.mp4  ✅
  hero-poster.jpg  ❌ EKSİK
```

## Renkler

- Arka plan: `#0a0a0a` (`bg-[#0a0a0a]` veya `vanta`)
- Yazı: `#FDFBF7` (`cream`)
- Vurgu: `#ff3b30` (`accent`)

## Hero CSS Animasyon Class'ları (globals.css'te tanımlı)

```
.hero-eyebrow   → 0.1s delay
.hero-headline  → 0.3s delay
.hero-line      → 0.75s delay (scaleX)
.hero-para      → 0.95s delay
```

## Bilinen Hatalar ve Çözümleri

| Hata | Çözüm |
|---|---|
| `Cannot find module './138.js'` | `./restart.sh` — Turbopack'te normalde olmaz |
| "Bu siteye ulaşılamıyor" | Dev server çalışmıyor → `./restart.sh` |
| Metin görünmüyor | JSX'te `opacity:0` var mı kontrol et, CSS class kullan |
| Hydration mismatch | İlgili component'e `"use client"` ekle |
