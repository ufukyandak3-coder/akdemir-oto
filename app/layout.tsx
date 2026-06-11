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

export const metadata: Metadata = {
  title: "Akdemir Oto Yedek Parça — Engineering the Movement",
  description:
    "Adana Seyhan'da Peugeot, Citroën ve Opel için orijinal ve premium yedek parça. Mühendislik hassasiyetiyle tedarik.",
  metadataBase: new URL("https://akdemir-yedekparca.com"),
  openGraph: {
    title: "Akdemir Oto Yedek Parça",
    description: "Peugeot · Citroën · Opel — orijinal ve premium yedek parça.",
    type: "website",
  },
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
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
