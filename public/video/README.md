# Hero Video Slotu

Higgsfield ile üretilen sinematik videoyu buraya bırakın:

```
public/video/hero.mp4          # video (muted, loop için kısa, ~8-15sn)
public/video/hero-poster.jpg   # ilk kare / poster görseli
```

`HeroVideo.tsx` bu yolları kullanır. Hero bölümünden aşağı kaydırıldığında
video IntersectionObserver ile `pause()` edilir ve DOM'dan tamamen kaldırılır
(GPU/decoder yükü sıfırlanır). Dosyalar gelene kadar Hero'da yalnızca koyu zemin
görünür — kod çalışmaya devam eder.

Öneri: 1080p, H.264, < 8MB, sessiz (audio track yok).
