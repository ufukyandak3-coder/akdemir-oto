"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import NavHeader from "@/components/ui/NavHeader";

export default function HeroSection() {
  const videoRef     = useRef<HTMLVideoElement>(null);
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnded = () => {
    loopTimerRef.current = setTimeout(() => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = 0;
      v.play().catch(() => {});
    }, 10_000);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // İlk kareyi göster, 3s sonra oynat
    const freeze = () => {
      v.pause();
      v.currentTime = 0;
    };
    v.addEventListener("play", freeze, { once: true });

    const videoTimer = setTimeout(() => {
      v.removeEventListener("play", freeze);
      v.play().catch(() => {});
    }, 3000);

    return () => {
      v.removeEventListener("play", freeze);
      clearTimeout(videoTimer);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[#0a0a0a] px-6 pt-16 md:px-20 md:pt-24">
      {/* Video arka plan */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ zIndex: 0 }}
        src="/video/hero-video.mp4"
        preload="auto"
        muted
        playsInline
        autoPlay
        onEnded={handleEnded}
      />

      {/* Sol gradient */}
      <div
        className="mob-hero-gradient absolute inset-0"
        style={{
          zIndex: 1,
          background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.0) 100%)",
        }}
      />

      {/* Alt geçiş */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          zIndex: 2,
          height: "22%",
          background: "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 100%)",
        }}
      />

      {/* Tipografi — CSS animasyonu, JS'e bağımlı değil */}
      <div className="mob-hero-text absolute left-0 top-1/2 -translate-y-[38%] w-[48vw] text-left pl-8 md:pl-24 z-10">

        {/* Konum */}
        <div className="hero-eyebrow" style={{ marginBottom: "8rem", marginTop: "-8rem" }}>
          <span
            className="font-mono uppercase"
            style={{
              fontSize: "clamp(11px, 1vw, 14px)",
              letterSpacing: "0.35em",
              color: "rgba(201,166,107,0.85)",
              fontWeight: 600,
            }}
          >
            Adana&nbsp;·&nbsp;Seyhan
          </span>
        </div>

        {/* Ana başlık */}
        <h1
          className="hero-headline"
          style={{ filter: "drop-shadow(0px 0px 25px rgba(197,168,128,0.15))" }}
        >
          {/* AKDEMİR — metallic gradient */}
          <span
            className="block font-clash font-black uppercase bg-gradient-to-b from-[#E6D5C3] via-[#C5A880] to-[#8C6F4B] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(4.5rem, 9.5vw, 9.5rem)",
              lineHeight: 0.86,
              letterSpacing: "-0.02em",
              WebkitTextStroke: "0.6px rgba(197,168,128,0.85)",
              paddingTop: "0.15em",
              marginTop: "-0.15em",
            }}
          >
            AKDEMİR
          </span>

          {/* OTO YEDEK PARÇA — metallic gradient */}
          <span
            className="block font-clash font-bold uppercase bg-gradient-to-b from-[#D4B896] via-[#A8845A] to-[#6B5030] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 2.4rem)",
              letterSpacing: "0.04em",
              marginTop: "0.3rem",
            }}
          >
            OTO YEDEK PARÇA
          </span>
        </h1>

        {/* Ayırıcı çizgi — brass gradient */}
        <div className="hero-line" style={{ margin: "1.6rem 0" }}>
          <span
            style={{
              display: "block",
              height: "1px",
              width: "100%",
              maxWidth: "24rem",
              background: "linear-gradient(to right, rgba(201,166,107,0.55), rgba(201,166,107,0.15), transparent)",
            }}
          />
        </div>

        {/* Paragraf */}
        <p
          className="hero-para mob-hero-nowrap font-clash"
          style={{
            fontSize: "clamp(15px, 1.35vw, 18px)",
            lineHeight: 2,
            color: "#C9A66B",
            maxWidth: "32rem",
            fontWeight: 400,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}
        >
          Kusursuz Mühendislik&nbsp;&nbsp;·&nbsp;&nbsp;Aranan Her Parça&nbsp;&nbsp;·&nbsp;&nbsp;Tam Zamanında
        </p>

        {/* Marka görseli */}
        <div className="hero-para" style={{ marginTop: "-0.8rem", position: "relative", height: "clamp(8rem, 14vw, 16rem)" }}>
          <Image
            src="/images/hero-eklenti.webp"
            alt="Peugeot Citroën Opel"
            fill
            sizes="(max-width: 768px) 50vw, 28vw"
            className="object-contain object-left"
            priority
          />
        </div>
      </div>

      {/* Üst navigasyon — fixed, sol üst */}
      <div
        className="mob-nav-wrap fixed top-6 left-16 md:left-24 z-50"
        style={{ pointerEvents: "auto" }}
      >
        <NavHeader />
      </div>

      {/* Kaydır göstergesi */}
      <div
        className="hero-para absolute bottom-10 left-6 flex items-center gap-2 md:left-20"
        style={{ zIndex: 10 }}
      >
        <span className="block h-px w-5" style={{ background: "rgba(255,59,48,0.45)" }} />
        <span
          className="font-clash uppercase tracking-[0.35em]"
          style={{ fontSize: "clamp(10px, 0.82vw, 11px)", color: "rgba(253,251,247,0.35)" }}
        >
          Kaydır
        </span>
      </div>
    </section>
  );
}
