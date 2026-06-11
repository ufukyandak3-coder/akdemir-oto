"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface iTestimonial {
  name: string;
  designation: string;
  description: string;
  profileImage?: string;
}

interface iCarouselProps {
  items: React.ReactElement<{
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose: () => void;
  }>[];
  initialScroll?: number;
}

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      onOutsideClick();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const isInView = useInView(carouselRef, { once: true, margin: "-60px" });

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -360, behavior: "smooth" });
  };
  const handleScrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 360, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = 300;
      const gap = 20;
      carouselRef.current.scrollTo({ left: (cardWidth + gap) * index, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full mt-10">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-6"
        style={{ background: "transparent" }}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="flex flex-row items-center gap-5 px-1 pb-2">
          {items.map((item, index) => (
            <motion.div
              key={`card-${index}`}
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 32 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, transition: { duration: 0.60, delay: 0.06 * index, ease: "easeOut" } }
                  : { opacity: 0, y: 32 }
              }
            >
              {React.cloneElement(item, { onCardClose: () => handleCardClose(index) })}
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-16" />
        </div>
      </div>

      {/* Sol fade maskesi */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16"
        style={{ background: "linear-gradient(to left, transparent, #EEE4D4)" }}
      />
      {/* Sağ fade maskesi */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-28"
        style={{ background: "linear-gradient(to right, transparent, #EEE4D4)" }}
      />

      <div className="flex justify-center gap-3 mt-6">
        <button
          className="h-10 w-10 rounded-full flex items-center justify-center disabled:opacity-25 transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(180,155,115,0.35)", backdropFilter: "blur(8px)" }}
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="h-4 w-4" style={{ color: "#5C4A32" }} />
        </button>
        <button
          className="h-10 w-10 rounded-full flex items-center justify-center disabled:opacity-25 transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(180,155,115,0.35)", backdropFilter: "blur(8px)" }}
          onClick={handleScrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRight className="h-4 w-4" style={{ color: "#5C4A32" }} />
        </button>
      </div>
    </div>
  );
};

/* Renk varyantları — her 4 kartta bir döner */
const CARD_VARIANTS = [
  { bg: "linear-gradient(145deg, #181818 0%, #101010 100%)", accent: "rgba(255,59,48,0.18)", glow: "rgba(255,59,48,0.12)" },
  { bg: "linear-gradient(145deg, #141414 0%, #0d0d0d 100%)", accent: "rgba(255,255,255,0.06)", glow: "rgba(255,255,255,0.04)" },
  { bg: "linear-gradient(145deg, #1c1410 0%, #110d0b 100%)", accent: "rgba(255,59,48,0.14)", glow: "rgba(255,59,48,0.10)" },
  { bg: "linear-gradient(145deg, #131313 0%, #0e0e0e 100%)", accent: "rgba(255,255,255,0.07)", glow: "rgba(255,255,255,0.03)" },
];

/* Hafif rotasyon — kartlar tam düz durmasın */
const ROTATIONS = [-1.2, 0.8, -0.5, 1.0, -0.8, 0.4];

const TestimonialCard = ({
  testimonial,
  index,
  layout = false,
  onCardClose = () => {},
}: {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
  backgroundImage?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const variant = CARD_VARIANTS[index % CARD_VARIANTS.length];
  const rotation = ROTATIONS[index % ROTATIONS.length];

  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCollapse();
    };
    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
    }
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 h-screen overflow-hidden z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="backdrop-blur-lg h-full w-full fixed inset-0 bg-black/75"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              ref={containerRef}
              layoutId={layout ? `card-${index}` : undefined}
              className="max-w-xl mx-auto z-[60] p-8 md:p-10 rounded-2xl relative mt-24"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}
            >
              <button
                className="absolute top-4 right-4 h-7 w-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                onClick={handleCollapse}
              >
                <X className="h-3.5 w-3.5 text-[#FDFBF7]" />
              </button>
              {/* Büyük dekoratif tırnak */}
              <span className="absolute top-6 right-14 font-editorial text-7xl leading-none select-none"
                style={{ color: "rgba(255,59,48,0.12)" }}>&ldquo;</span>
              <p className="font-editorial italic text-2xl md:text-3xl text-[#FDFBF7] mt-2 leading-snug">
                {testimonial.name}
              </p>
              <div className="mt-6 font-clash leading-relaxed" style={{ fontSize: "14px", color: "rgba(253,251,247,0.62)" }}>
                &ldquo;{testimonial.description}&rdquo;
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${index}` : undefined}
        onClick={() => setIsExpanded(true)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="text-left focus:outline-none"
        initial={{ rotate: rotation }}
        whileHover={{
          rotate: 0,
          y: -6,
          scale: 1.03,
          transition: { duration: 0.30, ease: "easeOut" },
        }}
      >
        {/* Dış parlama halkası — hover'da görünür */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            boxShadow: `0 0 0 1px rgba(255,59,48,0.35), 0 12px 40px ${variant.glow}`,
            borderRadius: "16px",
          }}
        />

        <div
          className={cn("relative rounded-2xl overflow-hidden flex flex-col")}
          style={{
            width: "clamp(295px, 24vw, 345px)",
            height: "clamp(330px, 28vw, 395px)",
            background: variant.bg,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
            padding: "clamp(22px, 2.2vw, 28px)",
          }}
        >
          {/* Köşe vurgu */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: `radial-gradient(ellipse 100% 80% at 50% 110%, ${variant.accent} 0%, transparent 65%)` }} />
          {/* Üst kenar parlaması */}
          <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)" }} />

          {/* Büyük arka plan tırnak */}
          <span
            className="absolute font-editorial select-none pointer-events-none leading-none"
            style={{
              fontSize: "clamp(90px, 9vw, 130px)",
              color: "rgba(255,59,48,0.06)",
              top: "-8px",
              right: "12px",
              lineHeight: 1,
            }}
          >&ldquo;</span>

          {/* Yıldız puanı */}
          <div className="flex gap-0.5 mb-4 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="#ff3b30" opacity={0.85}>
                <path d="M6 0l1.5 3.6L11 4.1l-2.5 2.4.6 3.5L6 8.3 2.9 10l.6-3.5L1 4.1l3.5-.5z" />
              </svg>
            ))}
          </div>

          {/* Yorum metni */}
          <p
            className="font-clash leading-[1.70] flex-1"
            style={{ fontSize: "clamp(12px, 0.90vw, 13.5px)", color: "rgba(253,251,247,0.68)" }}
          >
            &ldquo;{testimonial.description.length > 130
              ? `${testimonial.description.slice(0, 130)}…`
              : testimonial.description}&rdquo;
          </p>

          {/* Alt: isim bloğu */}
          <div className="mt-5 flex-shrink-0">
            <div className="h-px mb-4"
              style={{ background: "linear-gradient(to right, rgba(255,59,48,0.35), rgba(255,59,48,0.08), transparent)" }} />
            <div className="flex items-center gap-3">
              {/* Baş harf avatarı */}
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-clash font-semibold text-[11px]"
                style={{ background: "rgba(255,59,48,0.14)", color: "#ff3b30", border: "1px solid rgba(255,59,48,0.25)" }}
              >
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-clash font-semibold text-[13px] leading-none" style={{ color: "#FDFBF7" }}>
                  {testimonial.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.button>
    </>
  );
};

export { Carousel, TestimonialCard };
