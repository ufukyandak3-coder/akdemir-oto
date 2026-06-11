# SİTE DONDURULDU

Bu proje **yayına alınmaya hazır** statik bir landing page'dir.
Aşağıdaki kural tüm gelecek çalışmalar için **KESİN EMİR**dir.

## ❌ ASLA DEĞİŞTİRİLMEYECEK

- Animasyonlar (GSAP, Framer Motion, CSS keyframes)
- Arka plan videoları (hero-video.mp4, motor-video.mp4)
- Canvas frame animasyonu (StatsSection)
- Scroll ve geçiş efektleri (sticky, marginTop: "-100vh", sliding card)
- Yazılar, başlıklar, sloganlar
- Renkler (#0a0a0a, #FDFBF7, #ff3b30)
- Section sırası ve layout
- Fontlar (Clash Display, PP Editorial New)
- Komponent dosyaları altındaki HERHANGİ bir görsel mantık

## ✅ İZİN VERİLEN DEĞİŞİKLİKLER

- HTTP başlıkları (next.config.mjs içindeki headers())
- Vercel/deploy konfigürasyonu (vercel.json)
- Görünmez güvenlik katmanları (Error Boundary — render çıktısını değiştirmez)
- Bağımlılık güncellemeleri (npm audit fix — yalnızca güvenli patch'ler)

## Sebep

Önceki bir oturumda güvenlik planı uygulanırken CSP başlıkları
videoları ve Fontshare fontlarını bloke etti; komponentler silindi.
Bu kural o hatanın tekrar yaşanmaması içindir.
