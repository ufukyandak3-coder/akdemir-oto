"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SECTIONS = [
  { label: "01" },
  { label: "02" },
  { label: "03" },
  { label: "04" },
  { label: "05" },
  { label: "06" },
];

export default function ScrollProgressIndicator() {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      const clamped = Math.min(Math.max(pct, 0), 1);
      setProgress(clamped);
      setActiveSection(
        Math.min(
          SECTIONS.length - 1,
          Math.floor(clamped * SECTIONS.length)
        )
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProgress = useCallback((pct: number) => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pct * docHeight, behavior: "smooth" });
  }, []);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const pct = Math.min(Math.max(clickY / rect.height, 0), 1);
      scrollToProgress(pct);
    },
    [scrollToProgress]
  );

  const markerTopPct = progress * 100;

  return (
    <div
      className="fixed right-7 top-1/2 -translate-y-1/2 z-50 flex items-center"
      style={{ height: "42vh" }}
    >
      {/* Sol tick listesi */}
      <div
        className="relative h-full flex flex-col justify-between mr-2.5"
        style={{ width: "28px" }}
      >
        {SECTIONS.map((s, i) => {
          const isActive = i === activeSection;
          return (
            <button
              key={i}
              onClick={() => scrollToProgress(i / (SECTIONS.length - 1))}
              className="flex items-center justify-end gap-1.5 group"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <span
                className="font-mono transition-all duration-400"
                style={{
                  fontSize: "7px",
                  letterSpacing: "0.14em",
                  color: isActive
                    ? "rgba(197,168,128,0.95)"
                    : "rgba(255,255,255,0.18)",
                  transition: "color 0.35s ease",
                }}
              >
                {s.label}
              </span>
              <span
                className="block"
                style={{
                  height: "1px",
                  width: isActive ? "9px" : "5px",
                  background: isActive
                    ? "rgba(197,168,128,0.85)"
                    : "rgba(255,255,255,0.16)",
                  transition: "all 0.35s ease",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-full cursor-pointer"
        style={{ width: "2px" }}
        onClick={handleTrackClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Baz hat */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Aktif dolgu — üstten marker'a */}
        <div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: `${markerTopPct}%`,
            background:
              "linear-gradient(to bottom, rgba(197,168,128,0.12), rgba(197,168,128,0.65))",
            transition: "height 0.08s linear",
          }}
        />

        {/* Track'teki parıltı noktası */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none rounded-full"
          style={{
            top: `${markerTopPct}%`,
            transform: "translate(-50%, -50%)",
            width: "2px",
            height: "2px",
            boxShadow: isHovered
              ? "0 0 22px 10px rgba(197,168,128,0.55)"
              : "0 0 14px 6px rgba(197,168,128,0.28)",
            transition: "box-shadow 0.3s ease",
          }}
        />

        {/* Knob */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${markerTopPct}%`,
            width: "26px",
            height: "26px",
            transition: "top 0.08s linear",
            pointerEvents: "none",
          }}
        >
          {/* Dış halka */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 38% 36%, rgba(50,43,36,0.98) 0%, rgba(10,8,6,0.99) 100%)",
              border: `1px solid ${
                isHovered
                  ? "rgba(197,168,128,0.82)"
                  : "rgba(197,168,128,0.42)"
              }`,
              boxShadow: isHovered
                ? "0 0 20px rgba(197,168,128,0.65), 0 0 6px rgba(197,168,128,0.45), inset 0 1px 0 rgba(255,255,255,0.07)"
                : "0 0 10px rgba(197,168,128,0.28), inset 0 1px 0 rgba(255,255,255,0.05)",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            }}
          />
          {/* İç halka */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "5px",
              border: "1px solid rgba(197,168,128,0.22)",
              background: "rgba(0,0,0,0.55)",
            }}
          />
          {/* Merkez nokta */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "10px",
              background: isHovered
                ? "rgba(197,168,128,0.95)"
                : "rgba(197,168,128,0.55)",
              transition: "background 0.25s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
