import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
  src: [
    { path: "./fonts/clash-display-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/clash-display-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/clash-display-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const SITE_URL = "https://akdemirotoyedekparca.com";

export const metadata: Metadata = {
  title: "Akdemir Oto Yedek Parça | Adana Seyhan — Peugeot, Citroën, Opel",
  description:
    "Adana Seyhan'da Peugeot, Citroën ve Opel için orijinal ve premium yedek parça. Stellantis onaylı, hızlı teslimat, mühendislik hassasiyetiyle tedarik. ☎ 0530 246 53 70",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "Akdemir Oto Yedek Parça",
    "Akdemir Yedek Parça",
    "Adana yedek parça",
    "Seyhan yedek parça",
    "Peugeot yedek parça Adana",
    "Citroën yedek parça Adana",
    "Opel yedek parça Adana",
    "orijinal oto yedek parça",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "35HlC3Gqfkl0TAANws3x8Ryt8DbMp8-gG3kie3dlun8",
  },
  openGraph: {
    title: "Akdemir Oto Yedek Parça — Adana Seyhan",
    description: "Peugeot · Citroën · Opel — orijinal ve premium yedek parça.",
    url: SITE_URL,
    siteName: "Akdemir Oto Yedek Parça",
    locale: "tr_TR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  name: "Akdemir Oto Yedek Parça",
  alternateName: "Akdemir Yedek Parça",
  url: SITE_URL,
  "@id": SITE_URL,
  image: `${SITE_URL}/images/konum-gorsel.jpeg`,
  telephone: "+905302465370",
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fevzipaşa Mh., Turhan Cemal Beriker Blv. No:462",
    addressLocality: "Seyhan",
    addressRegion: "Adana",
    postalCode: "01190",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 36.9967665,
    longitude: 35.2567528,
  },
  hasMap:
    "https://www.google.com/maps/place/Akdemir+Yedek+Par%C3%A7a/@36.9967665,35.2567528,17z",
  areaServed: { "@type": "City", name: "Adana" },
  brand: ["Peugeot", "Citroën", "Opel"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={clashDisplay.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=editorial-new@400,400i,700,700i&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
