"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const brands = [
  {
    id: "peugeot",
    name: "Peugeot",
    image: "/images/jant-peugeot-upscaled.webp",
    capsule: "/images/peugeot-kapsul-upscaled.webp",
    eyebrow: "Fransız Mühendisliği",
    headline: ["PEUGEOT İÇİN", "ORİJİNAL", "MEKANİK"],
    body: "Stellantis grubunun en köklü Fransız mühendisliği için tüm motor, yürüyen aksam ve şanzıman parçaları orijinal OEM standardında stokta.",
    stat: "OEM",
    statLabel: "Orijinal Standart",
  },
  {
    id: "citroen",
    name: "Citroën",
    image: "/images/jant-citroen-upscaled.webp",
    capsule: "/images/cıtroen-kapsul-upscaled.webp",
    eyebrow: "Fransız Tasarımı",
    headline: ["CITROËN İÇİN", "MAKSİMUM", "KONFOR"],
    body: "Orijinal sürüş konforunu korumak için; tüm süspansiyon, fren ve elektronik altyapı elemanları milimetrik uyum garantisiyle.",
    stat: "±0.1mm",
    statLabel: "Tolerans Hassasiyeti",
  },
  {
    id: "opel",
    name: "Opel",
    image: "/images/jant-opel-upscaled.webp",
    capsule: "/images/opel-kapsul-upscaled.webp",
    eyebrow: "Alman Güvencesi",
    headline: ["OPEL GRUBUNDA", "ALMAN", "DİSİPLİNİ"],
    body: "Stellantis güvencesiyle birleşen Alman teknolojisi. Opel araçlarının ömrünü uzatacak tüm ağır bakım setleri, filtre grupları ve orijinal parça bileşenleri eksiksiz tedarik ağıyla.",
    stat: "ISO 9001",
    statLabel: "Kalite Sertifikası",
  },
];

export default function BrandFocusSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const wheelRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const capsuleRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const offscreenLeft  = -(window.innerWidth * 1.6);
    const offscreenRight =  window.innerWidth * 1.6;
    const enterLeft      = -(window.innerWidth * 0.28);
    const enterRight     =  window.innerWidth * 0.28;

    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { opacity: 0, y: -22 });
      gsap.set(wheelRefs.current[0],   { x: enterLeft,      opacity: 0, force3D: true });
      gsap.set(capsuleRefs.current[0], { x: enterRight,     opacity: 0, force3D: true });
      gsap.set(textRefs.current[0],    { opacity: 0, y: 36 });

      gsap.set(wheelRefs.current[1],   { x: offscreenLeft,  force3D: true });
      gsap.set(wheelRefs.current[2],   { x: offscreenLeft,  force3D: true });
      gsap.set(capsuleRefs.current[1], { x: offscreenRight, force3D: true });
      gsap.set(capsuleRefs.current[2], { x: offscreenRight, force3D: true });
      gsap.set(textRefs.current[1],    { opacity: 0, y: 40 });
      gsap.set(textRefs.current[2],    { opacity: 0, y: 40 });

      // Entrance animasyonu
      gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" })
        .to(wheelRefs.current[0],   { x: 0, opacity: 1, duration: 1.15, ease: "power2.out" }, "<0.12")
        .to(capsuleRefs.current[0], { x: 0, opacity: 1, duration: 1.15, ease: "power2.out" }, "<0.08")
        .to(textRefs.current[0],    { opacity: 1, y: 0,  duration: 0.85, ease: "power2.out" }, "<0.22");

      // Scrub timeline (CSS sticky ile — GSAP pin:true YOK)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to({}, { duration: 0.4 });
      tl.to(wheelRefs.current[0],   { x: offscreenLeft,  ease: "power2.inOut", duration: 1 })
        .to(capsuleRefs.current[0], { x: offscreenRight, ease: "power2.inOut", duration: 1 }, "<")
        .to(textRefs.current[0],    { opacity: 0, y: -30, ease: "power2.in",   duration: 0.4 }, "<")
        .to(wheelRefs.current[1],   { x: 0, ease: "power2.out", duration: 1 }, "<0.2")
        .to(capsuleRefs.current[1], { x: 0, ease: "power2.out", duration: 1 }, "<")
        .to(textRefs.current[1],    { opacity: 1, y: 0,  ease: "power2.out",  duration: 0.5 }, "<0.35");

      tl.to({}, { duration: 0.4 });
      tl.to(wheelRefs.current[1],   { x: offscreenLeft,  ease: "power2.inOut", duration: 1 })
        .to(capsuleRefs.current[1], { x: offscreenRight, ease: "power2.inOut", duration: 1 }, "<")
        .to(textRefs.current[1],    { opacity: 0, y: -30, ease: "power2.in",   duration: 0.4 }, "<")
        .to(wheelRefs.current[2],   { x: 0, ease: "power2.out", duration: 1 }, "<0.2")
        .to(capsuleRefs.current[2], { x: 0, ease: "power2.out", duration: 1 }, "<")
        .to(textRefs.current[2],    { opacity: 1, y: 0,  ease: "power2.out",  duration: 0.5 }, "<0.35");

      tl.to({}, { duration: 0.4 });
    });

    return () => { ctx.revert(); };
  }, []);

  return (
    <div ref={outerRef} className="relative h-[420vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
        {/* Arka plan görseli */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/arka-plan.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.18,
          }}
        />

        {/* Section label */}
        <div ref={labelRef} className="mob-brand-label absolute top-14 left-6 md:left-12 z-20">
          <span
            className="font-clash font-black uppercase tracking-[0.20em]"
            style={{
              fontSize: "clamp(15px, 1.35vw, 20px)",
              background: "linear-gradient(90deg, #ff3b30 0%, #ff7a6e 28%, #FDFBF7 55%, rgba(253,251,247,0.45) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 18px rgba(255,59,48,0.25))",
            }}
          >
            PARÇA TEDARİĞİ SAĞLADIĞIMIZ MARKALAR
          </span>
        </div>

        {/* Jant görselleri — sol */}
        {brands.map((brand, i) => (
          <div
            key={`wheel-${brand.id}`}
            ref={(el) => { wheelRefs.current[i] = el; }}
            className="mob-brand-wheel absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
            style={{ left: "-22vw", width: "62vw", willChange: "transform" }}
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={960}
              height={960}
              className="w-full h-auto object-contain select-none"
              style={{ filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.9))" }}
              priority={i === 0}
              draggable={false}
            />
          </div>
        ))}

        {/* Kapsül görselleri — sağ */}
        {brands.map((brand, i) => (
          <div
            key={`capsule-${brand.id}`}
            ref={(el) => { capsuleRefs.current[i] = el; }}
            className="mob-brand-capsule absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
            style={{ right: "-5vw", width: "58vw", willChange: "transform" }}
          >
            <Image
              src={brand.capsule}
              alt={`${brand.name} kapsül`}
              width={960}
              height={960}
              className="w-full h-auto object-contain select-none"
              style={{ filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.9))" }}
              priority={i === 0}
              draggable={false}
            />
          </div>
        ))}

        {/* Metinler — orta */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="mob-brand-text relative" style={{ width: "clamp(220px, 18vw, 320px)", transform: "translate(-13vw, -7vh)" }}>
            {brands.map((brand, i) => (
              <div
                key={brand.id}
                ref={(el) => { textRefs.current[i] = el; }}
                className="absolute inset-x-0 space-y-5"
                style={{ willChange: "opacity, transform" }}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-clash text-[11px] uppercase tracking-[0.32em] text-accent">
                    {brand.eyebrow}
                  </span>
                  <span className="block h-px w-5 bg-accent/40" />
                  <span className="font-clash text-[11px] uppercase tracking-[0.24em] text-white/25">
                    {brand.name}
                  </span>
                </div>

                <h2
                  className="font-clash font-black uppercase leading-[0.85] tracking-tighter"
                  style={{ fontSize: "clamp(2.4rem, 4.8vw, 5rem)" }}
                >
                  {brand.headline.map((line, j) => (
                    <span
                      key={j}
                      className={`block ${j === 1 ? "text-neutral-500" : "text-white"}`}
                    >
                      {line}
                    </span>
                  ))}
                </h2>

                <div className="flex items-center gap-3">
                  <span className="block h-px w-8 bg-white/10" />
                  <span className="block h-px flex-1 bg-white/5" />
                </div>

                <p className="font-clash text-[13.5px] leading-[1.72] text-neutral-400">
                  {brand.body}
                </p>

                <div className="flex items-baseline gap-4 border-l-[1.5px] border-accent pl-4">
                  <span className="font-clash text-2xl font-black text-white tracking-tighter">
                    {brand.stat}
                  </span>
                  <span className="font-clash text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                    {brand.statLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vignette'ler */}
        <div className="absolute inset-y-0 left-0 w-[8vw] z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0a0a0a 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0 w-[8vw] z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0a0a0a 0%, transparent 100%)" }} />
        <div className="absolute top-0 inset-x-0 h-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)" }} />
        <div className="absolute bottom-0 inset-x-0 h-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)" }} />
      </div>
    </div>
  );
}
