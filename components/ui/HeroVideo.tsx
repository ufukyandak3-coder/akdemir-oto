"use client";

// Hero arka plan videosu — GPU kontratı.
// IntersectionObserver: Hero görünmüyorsa pause + DOM'dan unmount (decoder/GPU düşer).
// loop YOK: video bitince 10 saniye son kareyi tutar, sonra başa sarıp yeniden oynar.

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO_PATH } from "@/lib/constants";

export default function HeroVideo({
  sentinelRef,
}: {
  sentinelRef: React.RefObject<HTMLElement>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(true);

  // 10 saniyelik nefes duraksaması — video bitince tetiklenir
  const handleEnded = () => {
    timerRef.current = setTimeout(() => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = 0;
      v.play().catch(() => {});
    }, 10_000);
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setMounted(visible);
        const v = videoRef.current;

        if (!visible) {
          // görünüm dışına çıkınca timer'ı iptal et ve duraklat
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          v?.pause();
        } else {
          v?.play().catch(() => {});
        }
      },
      { threshold: 0.1 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sentinelRef]);

  if (!mounted) return null;

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      preload="metadata"
      muted
      playsInline
      autoPlay
      onEnded={handleEnded}
    >
      <source src={HERO_VIDEO_PATH} type="video/mp4" />
    </video>
  );
}
