"use client";

import Eyebrow from "@/components/ui/Eyebrow";

export default function B2BSection() {
  return (
    <section className="flex min-h-[100dvh] items-center bg-[#0a0a0a] px-6 py-24 md:px-16 md:py-40">
      <div className="max-w-xl">
        <Eyebrow className="text-accent">B2B & Güvence</Eyebrow>
        <h2 className="mt-6 font-editorial text-4xl leading-tight text-cream md:text-6xl">
          Esnafın ve sürücünün
          <br />
          ortak güveni.
        </h2>
        <p className="mt-8 font-clash text-base leading-relaxed text-white/55">
          Sanayi esnafına toptan hız, perakende müşteriye birebir danışmanlık.
          Doğru parça, zamanında teslimat ve arkasında duran bir mühendislik
          güvencesiyle; her siparişte aynı standart.
        </p>
        <ul className="mt-10 space-y-4">
          {[
            "Orijinal & OEM eşdeğer garantisi",
            "Sanayi esnafına özel tedarik koşulları",
            "Parça uyumluluğunda birebir doğrulama",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 font-clash text-sm text-white/70"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
