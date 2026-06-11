// Akdemir Oto Yedek Parça — global sabitler

// --- Kurumsal konum ---
export const SHOP_LOCATION = {
  name: "Akdemir Yedek Parça",
  address: "Fevzipaşa Mh., Turhan Cemal Beriker Blv. No:462, 01190 Seyhan/Adana",
  city: "Seyhan / Adana",
  mapsUrl:
    "https://www.google.com/maps/place/Akdemir+Yedek+Par%C3%A7a/@36.9967665,35.2567528,17z/data=!4m6!3m5!1s0x152887d29b5de843:0xe14377bbe6429515!8m2!3d36.9967665!4d35.2567528!16s%2Fg%2F11hbgqdzqz",
  lat: 36.9967665,
  lng: 35.2567528,
  phone: "0530 246 53 70",
} as const;

// --- Marka grupları ---
export const BRANDS = ["Peugeot", "Citroën", "Opel"] as const;

// --- Renk paleti (CSS var ile senkron) ---
export const COLORS = {
  vanta: "#0a0a0a",
  cream: "#FDFBF7",
  accent: "#ff3b30",
} as const;

// --- Hero video slotları ---
export const HERO_VIDEO_PATH = "/video/hero-video.mp4";
export const HERO_POSTER_PATH = "/video/hero-poster.jpg";

// --- İstatistikler ---
export const STATS = [
  { label: "Marka Çeşidi", value: 150, suffix: "+" },
  { label: "Stok Kapasitesi", value: 50, suffix: "K+" },
  { label: "Hızlı Teslimat", value: 24, suffix: " Saat" },
] as const;
