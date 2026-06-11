"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";

const FRAME_COUNT = 121;
const FRAME_PATH = (i: number) =>
  `/video/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

const STAT_LINES = [
  {
    value: "150+",
    label: "REFERANS GRUBU",
    desc: "Peugeot, Citroën ve Opel modellerinin tüm üretim yıllarıyla\nbirebir uyumlu parça kataloğu",
  },
  {
    value: "50K +",
    label: "HAZIR STOK",
    desc: "Adana depomuzda anında teslime hazır, Stellantis onaylı\ndevasa orijinal bileşen havuzu",
  },
  {
    value: "24 Saat",
    label: "SEVKİYAT SÜRESİ",
    desc: "Bölgesel lojistik ağımız sayesinde sanayi esnafına\nve servislere kesintisiz, dinamik tedarik",
  },
];

const IMAGE_CARDS = [
  { src: "/images/gorsel-4.jpg",  alt: "Far Detayı",        w: 800, h: 600 },
  { src: "/images/gorsel-3.jpg",  alt: "Konsol Detayı",     w: 800, h: 600 },
  { src: "/images/gorsel-2.jpeg", alt: "Direksiyon Detayı", w: 800, h: 600 },
];

export default function StatsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!wrapper || !section || !canvas) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const frameObj = { index: 0 };
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;
    let ready = false;

    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      if (ready && imgs[Math.round(frameObj.index)]) drawFrame(Math.round(frameObj.index));
    };

    const drawFrame = (i: number) => {
      const img = imgs[i];
      if (!img || !img.complete || !ctx2d) return;
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale, sh = ih * scale;
      ctx2d.clearRect(0, 0, cw, ch);
      ctx2d.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) { resize(); drawFrame(0); }
        if (loadedCount === FRAME_COUNT) ready = true;
      };
      imgs.push(img);
    }

    resize();
    window.addEventListener("resize", resize);

    gsap.registerPlugin(ScrollTrigger);

    const leftCol = leftColRef.current;
    const animEls = leftCol
      ? (Array.from(leftCol.querySelectorAll("[data-anim]")) as HTMLElement[])
      : [];
    gsap.set(animEls, { opacity: 0, y: 20 });

    let animated = false;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom-=100vh bottom",
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.min(FRAME_COUNT - 1, Math.floor(self.progress * FRAME_COUNT));
        if (idx !== Math.round(frameObj.index)) {
          frameObj.index = idx;
          drawFrame(idx);
        }
        if (!animated && self.progress >= 0.35) {
          animated = true;
          gsap.to(animEls, { opacity: 1, y: 0, stagger: 0.1, duration: 1.0, ease: "power2.out" });
        }
      },
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "550vh" }}>
      <section
        ref={sectionRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{
          zIndex: 15, height: "7vh",
          background: "linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.35) 60%, rgba(10,10,10,0) 100%)",
        }} />
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
          zIndex: 15, height: "7vh",
          background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.35) 60%, rgba(10,10,10,0) 100%)",
        }} />
        <div className="absolute inset-y-0 left-0 pointer-events-none" style={{
          zIndex: 5, width: "52%",
          background: "linear-gradient(to right, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0.52) 60%, rgba(10,10,10,0) 100%)",
        }} />

        <div
          ref={leftColRef}
          className="absolute inset-y-0 left-0 flex flex-col justify-between"
          style={{
            zIndex: 10,
            width: "45vw",
            paddingLeft: "clamp(16px, 3vw, 3.5rem)",
            paddingRight: "clamp(16px, 2vw, 2.5rem)",
            paddingTop: "clamp(60px, 9vh, 110px)",
            paddingBottom: "clamp(48px, 8vh, 90px)",
          }}
        >
          <div>
            <div data-anim>
              <Eyebrow className="text-accent">Stok & Performans</Eyebrow>
            </div>

            <h2
              data-anim
              className="mt-3 font-clash font-black uppercase tracking-tight leading-none bg-gradient-to-b from-[#F2F2F2] via-[#D1D5DB] to-[#9CA3AF] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 2rem)", letterSpacing: "0.06em" }}
            >
              STOK VE LOJİSTİK GÜCÜ
            </h2>

            <div data-anim className="mt-4 mb-6" style={{ height: "1px", maxWidth: "34rem", background: "linear-gradient(to right, rgba(255,59,48,0.40), rgba(255,59,48,0.12), transparent)" }} />

            <div className="flex flex-col gap-10" data-anim>
              {STAT_LINES.map((s, i) => (
                <div key={s.label} className="flex items-baseline gap-6">
                  <span
                    className={
                      i === 1
                        ? "font-clash font-black tracking-tight leading-none shrink-0 bg-gradient-to-b from-[#FF4D6D] to-[#A4161A] bg-clip-text text-transparent"
                        : "font-clash font-black tracking-tight leading-none shrink-0 bg-gradient-to-b from-[#F2F2F2] via-[#D1D5DB] to-[#9CA3AF] bg-clip-text text-transparent"
                    }
                    style={{ fontSize: "clamp(2rem, 3.2vw, 3.8rem)", minWidth: "clamp(7rem, 10vw, 11rem)" }}
                  >
                    {s.value}
                  </span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span
                      className="font-mono uppercase tracking-widest"
                      style={{ fontSize: "11px", color: "rgba(212,212,216,0.85)", fontWeight: 600 }}
                    >
                      {s.label}
                    </span>
                    <p
                      className="font-clash leading-[1.65]"
                      style={{ fontSize: "clamp(12.5px, 1.05vw, 15px)", color: "rgba(230,230,235,0.94)", fontWeight: 450, whiteSpace: "pre-line" }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alt görsel kartlar */}
          <div className="flex gap-3" data-anim style={{ marginBottom: "clamp(16px, 2.5vh, 32px)", paddingLeft: "clamp(56px, 6vw, 7rem)" }}>
            {IMAGE_CARDS.map((card) => (
              <div
                key={card.src}
                className="relative overflow-hidden rounded-2xl flex-1 group"
                style={{
                  height: "clamp(170px, 26vh, 250px)",
                  backdropFilter: "blur(12px) saturate(150%)",
                  WebkitBackdropFilter: "blur(12px) saturate(150%)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.12)",
                  transition: "transform 0.32s ease, box-shadow 0.32s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.12)";
                }}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 15vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{ background: "linear-gradient(to top, rgba(10,10,10,0.50) 0%, rgba(10,10,10,0) 55%)" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute pointer-events-none" style={{ zIndex: 20, top: "2rem", right: "clamp(1.5rem, 3vw, 3rem)" }}>
          <span className="font-clash text-[9px] uppercase tracking-[0.32em] text-white/20">
            04 — Stok & Performans
          </span>
        </div>
      </section>
    </div>
  );
}
