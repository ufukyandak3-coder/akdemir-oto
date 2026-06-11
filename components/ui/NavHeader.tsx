"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "GİRİŞ",     href: "#giris"     },
  { label: "MARKALAR",  href: "#markalar"  },
  { label: "GÜCÜMÜZ",   href: "#biz-kimiz" },
  { label: "YORUMLAR",  href: "#yorumlar"  },
  { label: "İLETİŞİM",  href: "#iletisim"  },
];

type Position = { left: number; width: number; opacity: number };

function NavHeader() {
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 });
  const [isLight, setIsLight] = useState(false);

  // Açık arka planlı section'lara girilince isLight = true
  useEffect(() => {
    const lightSections = ["#yorumlar", "#iletisim"]
      .map((id) => document.querySelector(id))
      .filter(Boolean) as Element[];

    if (lightSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setIsLight(anyVisible);
      },
      { threshold: 0.45 }
    );

    lightSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav>
      <ul
        className="relative flex items-center gap-1"
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      >
        {NAV_ITEMS.map((item) => (
          <Tab
            key={item.label}
            setPosition={setPosition}
            onClick={() => handleClick(item.href)}
            isLight={isLight}
          >
            {item.label}
          </Tab>
        ))}
        <Cursor position={position} isLight={isLight} />
      </ul>
    </nav>
  );
}

const Tab = ({
  children,
  setPosition,
  onClick,
  isLight,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  onClick: () => void;
  isLight: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const defaultColor = isLight ? "rgba(28,21,16,0.52)" : "rgba(253,251,247,0.42)";
  const hoverColor   = isLight ? "rgba(28,21,16,0.92)" : "rgba(197,168,128,0.95)";

  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 cursor-pointer select-none group"
      style={{ padding: "8px 12px" }}
    >
      <span
        className="font-clash font-medium uppercase"
        style={{
          fontSize: "clamp(9px, 0.72vw, 11px)",
          letterSpacing: "0.26em",
          color: defaultColor,
          transition: "color 0.4s ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = hoverColor; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = defaultColor; }}
      >
        {children}
      </span>
    </li>
  );
};

const Cursor = ({ position, isLight }: { position: Position; isLight: boolean }) => {
  const lineColor = isLight
    ? "rgba(28,21,16,0.55)"
    : "rgba(197,168,128,0.75)";

  return (
    <motion.li
      animate={position}
      className="absolute z-0 bottom-[6px] h-[1px] rounded-full pointer-events-none"
      style={{
        background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${lineColor} 30%, ${lineColor} 70%, rgba(0,0,0,0) 100%)`,
        boxShadow: isLight ? "none" : "0 0 6px rgba(197,168,128,0.35)",
        transition: "background 0.4s ease, box-shadow 0.4s ease",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 42 }}
    />
  );
};

export default NavHeader;
