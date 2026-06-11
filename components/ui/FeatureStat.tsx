"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  suffix?: string;
  label: string;
  delayMs?: number;
}

export default function FeatureStat({ value, suffix = "", label, delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const run = () => {
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / 1600, 1);
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setDisplay(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        };
        if (delayMs) setTimeout(run, delayMs);
        else run();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, delayMs]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        backdropFilter: "blur(28px) saturate(180%) brightness(1.04)",
        WebkitBackdropFilter: "blur(28px) saturate(180%) brightness(1.04)",
        background: "rgba(255,255,255,0.16)",
        border: "1px solid rgba(255,255,255,0.32)",
        borderTop: "1px solid rgba(255,255,255,0.55)",
        borderRadius: "20px",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.6), 0 20px 56px rgba(0,0,0,0.13), 0 4px 10px rgba(0,0,0,0.07)",
        padding: "26px 30px 24px",
        overflow: "hidden",
      }}
    >
      {/* Cam kenarı yansıması */}
      <div
        style={{
          position: "absolute",
          top: 0, left: "15%", right: "15%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.85), transparent)",
        }}
      />

      <div
        className="font-editorial"
        style={{
          fontSize: "clamp(2.6rem, 3.8vw, 3.6rem)",
          lineHeight: 1,
          color: "#0c0c0c",
          letterSpacing: "-0.025em",
          fontWeight: 700,
        }}
      >
        {display}
        <span style={{ color: "#ff3b30", fontSize: "0.68em", fontWeight: 600 }}>{suffix}</span>
      </div>

      <div
        className="font-clash uppercase"
        style={{
          marginTop: "8px",
          fontSize: "9.5px",
          letterSpacing: "0.30em",
          color: "rgba(10,10,10,0.45)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
