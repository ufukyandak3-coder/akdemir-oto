"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HOTSPOT_POS = [
  { rx: 0.40, ry: 0.27 },
  { rx: 0.46, ry: 0.50 },
  { rx: 0.37, ry: 0.67 },
];

const NODE_STYLE: React.CSSProperties[] = [
  { top: "11%",  left: "52%" },
  { top: "48%",  right: "4%" },
  { top: "70%",  left: "56%" },
];

export default function MacroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const lineRefs   = useRef<(SVGPolylineElement | null)[]>([null, null, null]);
  const dotRefs    = useRef<(SVGCircleElement | null)[]>([null, null, null]);
  const ringRefs   = useRef<(SVGCircleElement | null)[]>([null, null, null]);
  const tipRefs    = useRef<(SVGRectElement | null)[]>([null, null, null]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number | null = null;
    let gsapCtx: { revert: () => void } | null = null;

    const MOBILE_HOTSPOT_POS = [
      { rx: 0.10, ry: 0.35 }, // 01 OEM: sol orta → üst-orta node'un solu
      { rx: 0.46, ry: 0.50 }, // 02 Lojistik: aynı (çalışıyor)
      { rx: 0.435, ry: 0.60 }, // 03 Uyumluluk: hotspot eyebrow ile node1 arası boşlukta → inip "UYUM"un sağına bağlanır
    ];

    const buildLines = () => {
      const sw = section.offsetWidth;
      const sh = section.offsetHeight;
      const isMobile = sw <= 767;
      const hotspots = (isMobile ? MOBILE_HOTSPOT_POS : HOTSPOT_POS).map(h => ({
        x: h.rx * sw, y: h.ry * sh,
      }));

      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        el.setAttribute("cx", String(Math.round(hotspots[i].x)));
        el.setAttribute("cy", String(Math.round(hotspots[i].y)));
      });
      ringRefs.current.forEach((el, i) => {
        if (!el) return;
        el.setAttribute("cx", String(Math.round(hotspots[i].x)));
        el.setAttribute("cy", String(Math.round(hotspots[i].y)));
      });

      nodeRefs.current.forEach((el, i) => {
        const line = lineRefs.current[i];
        const tip  = tipRefs.current[i];
        if (!el || !line) return;

        const nx   = el.offsetLeft;
        const nw   = el.offsetWidth;
        let   ny   = Math.round(el.offsetTop + el.offsetHeight * 0.28);
        const sx_  = Math.round(hotspots[i].x);
        const sy_  = Math.round(hotspots[i].y);
        // Mobilde: hotspot node merkezinin sağındaysa sağ kenara, solundaysa sol kenara bağlan
        const toRight = isMobile && sx_ > nx + nw / 2;
        let endX = toRight ? nx + nw + 10 : nx - 10;
        let tipX = toRight ? nx + nw + 6 : nx - 12;

        // 03 Uyumluluk (sol-alt) — çizgi DOĞRUDAN "TAM UYUM" yazısının yanına bağlanır.
        // Yazının gerçek glyph genişliğini ölçüp ucu "UYUM"un hemen sağına getiriyoruz;
        // dirsek yazının dikey ortasında → başka yazıya değil bu yazıya bağlı görünür.
        if (isMobile && i === 2) {
          const head = el.querySelector(".mob-macro-h") as HTMLElement | null;
          if (head) {
            const secRect = section.getBoundingClientRect();
            // Gerçek harf genişliği: span'ları tek tek ölç (blok <p> tüm genişliği verir)
            let glyphRight = nx;
            head.querySelectorAll("span").forEach((sp) => {
              const range = document.createRange();
              range.selectNodeContents(sp);
              glyphRight = Math.max(glyphRight, range.getBoundingClientRect().right - secRect.left);
            });
            const hr = head.getBoundingClientRect();
            ny   = Math.round(hr.top - secRect.top + hr.height / 2); // yazının dikey ortası
            endX = Math.round(glyphRight) + 10;                       // uç "UYUM"un hemen sağı
            tipX = Math.round(glyphRight) + 6;
          }
        }

        line.setAttribute("points", `${sx_},${sy_} ${sx_},${ny} ${endX},${ny}`);
        if (tip) {
          tip.setAttribute("x", String(tipX));
          tip.setAttribute("y", String(ny - 2));
        }
      });
    };

    buildLines();

    rafId = requestAnimationFrame(() => {
      document.fonts.ready.then(() => { buildLines(); });

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const lines = lineRefs.current.filter((l): l is SVGPolylineElement => !!l);
        const dots  = dotRefs.current.filter((d): d is SVGCircleElement => !!d);
        const rings = ringRefs.current.filter((r): r is SVGCircleElement => !!r);
        const tips  = tipRefs.current.filter((t): t is SVGRectElement => !!t);
        const nodes = nodeRefs.current.filter((n): n is HTMLDivElement => !!n);

        lines.forEach(line => {
          const len = line.getTotalLength();
          if (len > 0) gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(dots,  { scale: 0, transformOrigin: "center center" });
        gsap.set(rings, { scale: 0, opacity: 0, transformOrigin: "center center" });
        gsap.set(tips,  { opacity: 0 });
        gsap.set(nodes, { opacity: 0, x: 16 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        tl.to(dots,  { scale: 1, duration: 0.25, stagger: 0.12, ease: "back.out(2.5)" }, 0);
        tl.to(rings, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.05);
        lines.forEach((line, i) => {
          tl.to(line, { strokeDashoffset: 0, duration: 0.65, ease: "power2.inOut" }, 0.15 + i * 0.18);
        });
        tl.to(tips, { opacity: 1, duration: 0.2, stagger: 0.18 }, 0.62);
        nodes.forEach((node, i) => {
          tl.to(node, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }, 0.50 + i * 0.16);
        });
      }, section);

      gsapCtx = ctx;
    });

    window.addEventListener("resize", buildLines);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      gsapCtx?.revert();
      window.removeEventListener("resize", buildLines);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden">
      <video
        className="mob-macro-video absolute inset-0 h-full w-full object-cover object-center"
        style={{ zIndex: 0 }}
        src="/video/motor-video.mp4"
        autoPlay muted loop playsInline
      />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 32% 50%, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.50) 100%)" }} />
      <div className="absolute top-0 inset-x-0 pointer-events-none" style={{ zIndex: 2, height: "28%", background: "linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0) 100%)" }} />
      <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{ zIndex: 2, height: "28%", background: "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0) 100%)" }} />
      <div className="mob-macro-right-grad absolute inset-y-0 right-0 pointer-events-none" style={{ zIndex: 3, width: "52%", background: "linear-gradient(to left, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0) 100%)" }} />
      <div className="mob-macro-left-grad absolute inset-y-0 left-0 pointer-events-none" style={{ zIndex: 4, width: "75%", background: "linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.52) 60%, rgba(10,10,10,0) 100%)" }} />

      <div className="absolute pointer-events-none" style={{ zIndex: 20, top: "2rem", left: "clamp(1.5rem, 3vw, 3rem)" }}>
        <span className="font-clash text-[9px] uppercase tracking-[0.32em] text-white/20">03 — Mühendislik</span>
      </div>

      <svg className="mob-macro-svg absolute inset-0 pointer-events-none" width="100%" height="100%" style={{ zIndex: 6, overflow: "visible" }} aria-hidden>
        {[0, 1, 2].map(i => (
          <circle key={`ring-${i}`} ref={el => { ringRefs.current[i] = el; }}
            cx={-200} cy={-200} r={13}
            fill="none" stroke="#e11d48" strokeWidth="0.75" opacity="0.5"
          />
        ))}
        {[0, 1, 2].map(i => (
          <circle key={`dot-${i}`} ref={el => { dotRefs.current[i] = el; }}
            cx={-200} cy={-200} r={3} fill="#e11d48"
          />
        ))}
        {[0, 1, 2].map(i => (
          <polyline key={`line-${i}`} ref={el => { lineRefs.current[i] = el; }}
            points="-200,-200" fill="none" stroke="#e11d48"
            strokeWidth="1" strokeLinecap="square" opacity="0.7"
          />
        ))}
        {[0, 1, 2].map(i => (
          <rect key={`tip-${i}`} ref={el => { tipRefs.current[i] = el; }}
            x={-200} y={-200} width={4} height={4} fill="#e11d48" opacity="0.7"
          />
        ))}
      </svg>

      <div ref={el => { nodeRefs.current[0] = el; }} className="mob-macro-node mob-macro-node-0 absolute"
        style={{ ...NODE_STYLE[0], zIndex: 10, width: "min(290px, 27vw)", borderLeft: "1px solid rgba(225,29,72,0.3)", paddingLeft: "clamp(12px, 1.2vw, 18px)", filter: "drop-shadow(0px 0px 20px rgba(255,255,255,0.05))" }}>
        <span className="font-clash block mb-2" style={{ fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          01 — OEM Kalite
        </span>
        <p className="mob-macro-h font-clash font-black uppercase tracking-tighter leading-none" style={{ fontSize: "clamp(2rem, 3.4vw, 4rem)" }}>
          <span className="block bg-gradient-to-b from-[#F2F2F2] via-[#D1D5DB] to-[#9CA3AF] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">ORİJİNAL PARÇA</span>
        </p>
        <p className="font-clash mt-2 text-neutral-600" style={{ fontSize: "clamp(11px, 1vw, 13px)", letterSpacing: "0.03em" }}>
          Stellantis onaylı, orijinal parça
        </p>
      </div>

      <div ref={el => { nodeRefs.current[1] = el; }} className="mob-macro-node mob-macro-node-1 absolute"
        style={{ ...NODE_STYLE[1], zIndex: 10, width: "min(310px, 29vw)", borderLeft: "1.5px solid rgba(225,29,72,0.5)", paddingLeft: "clamp(12px, 1.2vw, 18px)", filter: "drop-shadow(0px 0px 20px rgba(255,255,255,0.05))" }}>
        <span className="font-clash block mb-2" style={{ fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(225,29,72,0.85)" }}>
          02 — Lojistik
        </span>
        <p className="mob-macro-h font-clash font-black uppercase tracking-tighter leading-[0.88]" style={{ fontSize: "clamp(1.9rem, 3.1vw, 3.7rem)" }}>
          <span className="block bg-gradient-to-b from-[#F2F2F2] via-[#D1D5DB] to-[#9CA3AF] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">HIZLI</span>
          <span className="block bg-gradient-to-b from-[#FF4D6D] to-[#A4161A] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">TESLİMAT</span>
        </p>
        <p className="font-clash mt-2 text-neutral-600" style={{ fontSize: "clamp(11px, 1vw, 13px)", letterSpacing: "0.03em" }}>
          Aynı gün kargo, hızlı teslimat
        </p>
      </div>

      <div ref={el => { nodeRefs.current[2] = el; }} className="mob-macro-node mob-macro-node-2 absolute"
        style={{ ...NODE_STYLE[2], zIndex: 10, width: "min(270px, 25vw)", borderLeft: "1px solid rgba(225,29,72,0.3)", paddingLeft: "clamp(12px, 1.2vw, 18px)", filter: "drop-shadow(0px 0px 20px rgba(255,255,255,0.05))" }}>
        <span className="font-clash block mb-2" style={{ fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          03 — Uyumluluk
        </span>
        <p className="mob-macro-h font-clash font-black uppercase tracking-tighter leading-[0.88]" style={{ fontSize: "clamp(1.9rem, 3.1vw, 3.7rem)" }}>
          <span className="block bg-gradient-to-b from-[#D1D5DB] to-[#6B7280] bg-clip-text text-transparent">TAM</span>
          <span className="block bg-gradient-to-b from-[#F2F2F2] via-[#D1D5DB] to-[#9CA3AF] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">UYUM</span>
        </p>
        <p className="font-clash mt-2 text-neutral-600" style={{ fontSize: "clamp(11px, 1vw, 13px)", letterSpacing: "0.03em" }}>
          Model bazlı parça eşleştirme
        </p>
      </div>
    </section>
  );
}
