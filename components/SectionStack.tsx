"use client";

import HeroSection from "./sections/HeroSection";
import BrandFocusSection from "./sections/BrandFocusSection";
import MacroSection from "./sections/MacroSection";
import StatsSection from "./sections/StatsSection";
import TestimonialSection from "./sections/TestimonialSection";
import FinalSection from "./sections/FinalSection";
import ScrollProgressIndicator from "./ui/ScrollProgressIndicator";

export default function SectionStack() {
  return (
    <main>
      <ScrollProgressIndicator />
      <div id="giris"><HeroSection /></div>
      <div className="h-[55vh] bg-[#0a0a0a]" />
      <div id="markalar"><BrandFocusSection /></div>
      <div className="h-[65vh] bg-[#0a0a0a]" />
      <MacroSection />
      <div className="h-[50vh] bg-[#0a0a0a]" />
      <div id="biz-kimiz" className="relative z-10">
        <StatsSection />
      </div>
      <div className="relative z-20 rounded-t-[32px] overflow-hidden shadow-[0_-24px_60px_rgba(0,0,0,0.55)]" style={{ marginTop: "-100vh" }}>
        <div id="yorumlar"><TestimonialSection /></div>
        <div id="iletisim"><FinalSection /></div>
      </div>
    </main>
  );
}
