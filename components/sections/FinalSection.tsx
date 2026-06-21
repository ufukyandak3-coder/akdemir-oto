"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LocationMap } from "@/components/ui/expand-map";
import { SHOP_LOCATION } from "@/lib/constants";

const HOURS = [
  { day: "Pazartesi – Cuma", time: "08:00 – 18:00" },
  { day: "Cumartesi",        time: "08:30 – 18:00" },
  { day: "Pazar",            time: "Kapalı" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function up(delay: number, visible: boolean) {
  return {
    initial:    { opacity: 0, y: 48 },
    animate:    visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 },
    transition: { duration: 1.1, delay, ease },
  } as const;
}

function fade(delay: number, visible: boolean) {
  return {
    initial:    { opacity: 0 },
    animate:    visible ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.9, delay, ease: "easeOut" as const },
  } as const;
}

function grow(delay: number, visible: boolean) {
  return {
    initial:    { scaleX: 0, originX: 0 },
    animate:    visible ? { scaleX: 1 } : { scaleX: 0 },
    transition: { duration: 1.0, delay, ease },
  } as const;
}

export default function FinalSection() {
  const ref = useRef<HTMLElement>(null);
  const v   = useInView(ref, { once: true, margin: "0px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{
        paddingTop: "clamp(56px, 8vh, 100px)",
        paddingBottom: "clamp(56px, 8vh, 100px)",
        background: "#EDE5D4",
      }}
    >
      {/* Sağ üst amber parıltı */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 55% 50% at 105% 0%, rgba(210,175,120,0.18) 0%, transparent 65%)",
      }} />
      {/* Sol alt soğuk gölge */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 50% 55% at -5% 100%, rgba(160,140,110,0.14) 0%, transparent 60%)",
      }} />
      {/* Merkez ışık noktası */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(255,252,245,0.6) 0%, transparent 65%)",
      }} />
      {/* İnce yatay çizgi dokusu */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(180,155,115,0.04) 47px, rgba(180,155,115,0.04) 48px)",
      }} />
      {/* Kenar vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        boxShadow: "inset 0 0 140px rgba(150,125,90,0.10)",
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-28 items-start lg:items-center">

          {/* ── Sol: İletişim Bilgileri ── */}
          <div className="flex-1 min-w-0">

            <motion.div {...up(0.00, v)}>
              <span className="inline-block font-clash text-[10px] font-bold uppercase tracking-eyebrow text-accent">İletişim & Konum</span>
            </motion.div>

            <motion.h2
              className="mt-4 font-editorial leading-[1.05]"
              style={{ fontSize: "clamp(2.6rem, 4.8vw, 5.2rem)", color: "#1C1510", letterSpacing: "-0.02em" }}
              {...up(0.22, v)}
            >
              Bizi ziyaret<br />
              <span style={{ color: "rgba(28,21,16,0.35)", fontStyle: "italic" }}>edin.</span>
            </motion.h2>

            <motion.p
              className="mt-3 font-clash leading-[1.7]"
              style={{ fontSize: "clamp(12px, 1vw, 14px)", color: "rgba(28,21,16,0.72)", fontWeight: 500, maxWidth: "26rem" }}
              {...up(0.44, v)}
            >
              Stellantis yetkili yedek parça tedarikçisi olarak Adana&apos;da
              hizmetinizdeyiz. Orijinal parça, uzman kadro.
            </motion.p>

            {/* Kırmızı ayırıcı */}
            <motion.div
              className="mt-5 mb-5 h-px"
              style={{ background: "linear-gradient(to right, rgba(255,59,48,0.45), rgba(255,59,48,0.12), transparent)", maxWidth: "26rem" }}
              {...grow(0.62, v)}
            />

            {/* Adres */}
            <motion.div className="mb-4" {...up(0.80, v)}>
              <p className="font-clash text-[10px] uppercase tracking-[0.28em] mb-1.5"
                style={{ color: "rgba(28,21,16,0.52)", fontWeight: 600 }}>Adres</p>
              <p className="font-clash leading-[1.6]"
                style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "rgba(28,21,16,0.78)", fontWeight: 500, maxWidth: "24rem" }}>
                {SHOP_LOCATION.address}
              </p>
            </motion.div>

            {/* Telefon */}
            <motion.div className="mb-4" {...up(1.02, v)}>
              <p className="font-clash text-[11px] uppercase tracking-[0.28em] mb-1.5"
                style={{ color: "rgba(28,21,16,0.52)", fontWeight: 600 }}>Telefon</p>
              <motion.a
                href={`tel:${SHOP_LOCATION.phone.replace(/\s/g, "")}`}
                className="font-clash inline-block"
                style={{ fontSize: "clamp(1.2rem, 1.75vw, 1.6rem)", color: "#ff3b30", letterSpacing: "-0.02em", fontWeight: 600 }}
                whileHover={{ scale: 1.08, color: "#ff6b63" }}
                whileTap={{ scale: 0.94, x: [0, -5, 5, -3, 3, 0] }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
              >
                {SHOP_LOCATION.phone}
              </motion.a>
            </motion.div>

            {/* Çalışma Saatleri */}
            <motion.div className="mb-7" {...up(1.22, v)}>
              <p className="font-clash text-[11px] uppercase tracking-[0.28em] mb-2.5"
                style={{ color: "rgba(28,21,16,0.52)", fontWeight: 600 }}>Çalışma Saatleri</p>
              <div className="space-y-1.5" style={{ maxWidth: "22rem" }}>
                {HOURS.map((h, i) => (
                  <motion.div key={h.day} className="flex items-center justify-between" {...fade(1.38 + i * 0.18, v)}>
                    <span className="font-clash" style={{ fontSize: "14.5px", color: "rgba(28,21,16,0.68)", fontWeight: 500 }}>
                      {h.day}
                    </span>
                    <span
                      className="font-clash font-semibold tabular-nums"
                      style={{
                        fontSize: "14.5px",
                        color: h.time === "Kapalı" ? "rgba(220,38,38,0.85)" : "rgba(28,21,16,0.88)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {h.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Buton */}
            <motion.div {...up(1.68, v)}>
              <motion.a
                href={SHOP_LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full font-clash font-medium text-white"
                style={{ background: "#ff3b30", padding: "12px 28px", fontSize: "10px", letterSpacing: "0.20em", textTransform: "uppercase", display: "inline-flex" }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ x: [0, -4, 4, -4, 4, 0] }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Yol Tarifi Al
                <motion.span
                  style={{ fontSize: "14px", display: "inline-block" }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >→</motion.span>
              </motion.a>
            </motion.div>

            {/* Copyright */}
            <motion.p
              className="mt-8 font-clash text-[10px] uppercase tracking-[0.24em]"
              style={{ color: "rgba(28,21,16,0.28)" }}
              {...fade(1.95, v)}
            >
              © {new Date().getFullYear()} Akdemir Oto Yedek Parça &nbsp;·&nbsp; Designed &amp; developed by{" "}
              <a
                href="https://www.valthusagency.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(28,21,16,0.45)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Valthus Agency
              </a>
            </motion.p>
          </div>

          {/* ── Sağ: Harita Kartı ── */}
          <motion.div
            className="flex-shrink-0 flex flex-col items-center gap-8"
            {...up(0.55, v)}
          >
            <LocationMap
              location="Akdemir Yedek Parça, Adana/Seyhan"
              coordinates={`${SHOP_LOCATION.lat}° K, ${SHOP_LOCATION.lng}° D`}
              mapsUrl={SHOP_LOCATION.mapsUrl}
            />
            <motion.a
              href={SHOP_LOCATION.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-clash text-[10px] uppercase tracking-[0.24em] transition-opacity duration-200 hover:opacity-60"
              style={{ color: "rgba(28,21,16,0.35)" }}
              {...fade(0.80, v)}
            >
              Google Maps&apos;te Aç ↗
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
