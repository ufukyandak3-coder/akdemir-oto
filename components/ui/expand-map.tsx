"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

interface LocationMapProps {
  location?: string
  coordinates?: string
  className?: string
  mapsUrl?: string
}

export function LocationMap({
  location = "San Francisco, CA",
  coordinates = "37.7749° N, 122.4194° W",
  className,
  mapsUrl,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-60, 60], [6, -6])
  const rotateY = useTransform(mouseX, [-60, 60], [-6, 6])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleClick = () => {
    if (mapsUrl) window.open(mapsUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className ?? ""}`}
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="mob-map-card relative overflow-hidden rounded-2xl"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          width: 580,
          height: 400,
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* ── Konum görseli ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/images/konum-gorsel.jpeg"
          alt="Akdemir Yedek Parça konumu"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Hafif alt gradient — sadece metin okunabilirliği için */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(10,10,10,0.60) 0%, rgba(10,10,10,0.08) 35%, rgba(10,10,10,0) 100%)" }}
        />

        {/* Cam kenar parlaması */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 45%)" }} />

        {/* Hover overlay — Maps'e yönlendirme hissi */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: "rgba(255,59,48,0.06)" }}
        />

        {/* ── İçerik (UI) ── */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          {/* Üst satır */}
          <div className="flex items-start justify-between">
            <motion.svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#ff3b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              animate={{
                filter: isHovered
                  ? "drop-shadow(0 0 8px rgba(255,59,48,0.8))"
                  : "drop-shadow(0 0 3px rgba(255,59,48,0.35))",
              }}
              transition={{ duration: 0.3 }}
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </motion.svg>

          </div>

          {/* Alt satır */}
          <div className="space-y-1.5">
            <motion.h3
              className="font-clash font-semibold tracking-tight"
              style={{ color: "#FDFBF7", fontSize: "14px" }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <motion.p
              className="font-clash text-[10px] uppercase tracking-[0.16em]"
              style={{ color: "rgba(253,251,247,0.38)" }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {coordinates}
            </motion.p>

            {/* Alt çizgi */}
            <motion.div
              className="h-px"
              style={{ background: "linear-gradient(to right, rgba(255,59,48,0.55), rgba(255,59,48,0.15), transparent)" }}
              initial={{ scaleX: 0.25, originX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0.25 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Hover ipucu */}
      <motion.p
        className="absolute -bottom-7 left-1/2 font-clash text-[10px] whitespace-nowrap"
        style={{ x: "-50%", color: "rgba(253,251,247,0.28)" }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      >
        Google Maps&apos;te Aç ↗
      </motion.p>
    </motion.div>
  )
}
