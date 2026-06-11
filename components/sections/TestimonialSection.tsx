"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn, TTestimonial } from "@/components/ui/testimonials-columns-1";

const TESTIMONIALS: TTestimonial[] = [
  {
    name: "Serkan Özoğul",
    designation: "",
    description:
      "Adana'da her daim yedek parça bulabileceğiniz tek adres. Ne zaman gitsem hiç boş dönmedim, esnaflıkları da çok iyi.",
  },
  {
    name: "Mahmut Can Karaköse",
    designation: "",
    description:
      "Sağolsun Osman bey ne zaman parça ihtiyacımız olsa ikiletmiyor, dükkana kadar ışık hızıyla getirtiyor. Güvenilir esnaf.",
  },
  {
    name: "Bilal Göçer",
    designation: "",
    description:
      "Pazar günü dahi Osman bey telefonlarımıza dönüş yaptı, acil eksik olan parçayı ayarladı. Teşekkür ediyoruz kendisine.",
  },
  {
    name: "Orhan Gazi Çetin",
    designation: "",
    description:
      "Mersin'den çıktım geldim sırf istediğim parçayı bulmak için. Kendilerine teşekkür ederim ilgilerinden dolayı, hiç pişman etmediler.",
  },
  {
    name: "Cumali Besler",
    designation: "",
    description:
      "Bizi yine yanıltmadı Osman bey, filonun eksik parçalarını tam zamanında getirtti. Akdemir ticarette tek geçilir.",
  },
  {
    name: "Taner Yalçınöz",
    designation: "",
    description:
      "Opel aracım için bir türlü sağ ön far bulamamıştım, çalmadığım kapı kalmadı. Sonunda bu dükkanda buldum hemen. Hızlı teslimat için teşekkürler.",
  },
  {
    name: "Recep Kaplan",
    designation: "",
    description:
      "Citroën ve Peugeot parçaları için yıllardır tek adresim burası. Orijinal ambalajlı gelince müşteriye de güvenle takıyorum, şimdiye kadar hiç şikâyet almadım.",
  },
  {
    name: "Kenan Doğruyol",
    designation: "",
    description:
      "Ceyhan'dan gelmeye değdi. Telefonda tarif ettim, gittiğimde parça hazırdı masanın üstünde. Hem fiyat hem tavır açısından memnun ayrıldım.",
  },
  {
    name: "Zeki Turan",
    designation: "",
    description:
      "Galeriye aldığım araçların parça ihtiyacını buradan karşılıyorum. Stok bolluğu işimi çok kolaylaştırıyor, nadiren olmayan parça çıkıyor karşıma.",
  },
  {
    name: "Hüseyin Akpınar",
    designation: "",
    description:
      "Osman bey telefonda çok yardımcı oldu, parçanın model uyumunu bizzat kontrol etti. Gidip aldım, birebir oturdu. Böyle titiz esnaf az bulunur.",
  },
  {
    name: "Yusuf Keleş",
    designation: "",
    description:
      "Kamyonetteki arıza için acil parça lazımdı, başka yerde üç gün dediler. Burada aynı gün çözüldü. Nakliyeciler için bu hız çok kritik, sağ olsunlar.",
  },
  {
    name: "Musa Şimşek",
    designation: "",
    description:
      "Kozan'dan özellikle geliyorum, çünkü burada aldıklarım tutmuyor gitmiyor. Bir kere yanlış parça vermedi, fiyatları da makul. Tavsiye ederim.",
  },
  {
    name: "Ertuğrul Demirci",
    designation: "",
    description:
      "Seyhan sanayi çarşısında herkes Akdemir'i bilir. Parça bulamayınca 'git Akdemir'e sor' derlerse doğrudur, mutlaka çıkarlar.",
  },
  {
    name: "Süleyman Çakır",
    designation: "",
    description:
      "Osman bey iki günde bir arıyorum neredeyse, hiç sıkılmadan yardımcı oluyor. Böyle müşteri odaklı çalışan başka görmedim.",
  },
  {
    name: "Haluk Bayraktar",
    designation: "",
    description:
      "Peugeot şanzıman yağı ve filtre setini aynı yerden aldım, hem orijinal hem de uygun fiyattı. İşin asıl güzel yanı ambalajlar hiç hasar görmemiş geliyor.",
  },
  {
    name: "Adem Kurtoğlu",
    designation: "",
    description:
      "Adıyaman'dan yola çıkmadan önce aradım, parça var mı diye. Vardı, ayırttılar. Gittiğimde önce çay koydular sonra faturayı kestiler. Esnafın böylesi olur.",
  },
  {
    name: "Murat Yıldırım",
    designation: "",
    description:
      "Kendilerini İzmir'den aradım parça için ve kısa sürede sağolsunlar parçayı gönderdiler. Teşekkür ediyorum.",
  },
  {
    name: "Cengiz Karaçay",
    designation: "",
    description:
      "Adana-Mersin piyasasının 1 numarası. Ne zaman parça bulamasam kendilerine gidiyorum.",
  },
  {
    name: "Rıfat Özcan",
    designation: "",
    description:
      "Tamirciyim, yıllardır buradan alıyorum. Malzeme kalitesinden tek şikayet etmedim. Fiyatlar da piyasaya göre makul, Osman bey sözünü tutar.",
  },
  {
    name: "Tayfun Demir",
    designation: "",
    description:
      "Babamın arabasına parça arıyordum, her yerde yoktu dediler. Akdemir'de vardı üstelik aynı gün hazır etti. Çok memnun kaldık.",
  },
  {
    name: "Nevzat Bozkurt",
    designation: "",
    description:
      "Gaziantep'ten sipariş verdim, birkaç günde geldi. Paket sağlamdı, parça hasarsız çıktı. Bir daha uğraşmam gerekirse yine buraya döneceğim.",
  },
  {
    name: "Suat Güneş",
    designation: "",
    description:
      "Yıllardır tanıyorum Osman beyi. Söylediği sözdür, parçayı söylediği zamanda getirir hiç yanıltmaz. Böyle esnaf kalmadı artık.",
  },
  {
    name: "Güven Çelikbaş",
    designation: "",
    description:
      "Uygun fiyatlı orijinal parça için yıllardır aynı adresi kullanıyorum. Adana'da tekler.",
  },
];

const firstColumn  = TESTIMONIALS.slice(0, 6);
const secondColumn = TESTIMONIALS.slice(6, 12);
const thirdColumn  = TESTIMONIALS.slice(12, 18);
const fourthColumn = TESTIMONIALS.slice(18, 24);

export default function TestimonialSection() {

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(72px, 10vh, 120px)",
        paddingBottom: "clamp(180px, 28vh, 320px)",
        background: "#EDE5D4",
      }}
    >
      {/* Üst sol köşe — sıcak amber parıltı */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 55% 45% at -5% 0%, rgba(210,175,120,0.18) 0%, transparent 65%)",
      }} />
      {/* Sağ alt köşe — soğuk gölge */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 50% 55% at 105% 100%, rgba(160,140,110,0.14) 0%, transparent 60%)",
      }} />
      {/* Merkez üst — parlak ışık noktası */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,252,245,0.7) 0%, transparent 60%)",
      }} />
      {/* İnce yatay çizgi dokusu */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(180,155,115,0.04) 47px, rgba(180,155,115,0.04) 48px)",
      }} />
      {/* Kenar vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        boxShadow: "inset 0 0 120px rgba(150,125,90,0.10)",
      }} />

      {/* Başlık */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          {/* Section tag */}
          {/* Metallic gradient başlık */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.70, delay: 0.12, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08))" }}
          >
            <h2
              className="mt-2 font-black tracking-tight text-5xl md:text-6xl leading-tight bg-gradient-to-b from-[#2D2820] via-[#4A4235] to-[#1A1814] bg-clip-text text-transparent"
            >
              Müşterilerimiz anlatıyor.
            </h2>
          </motion.div>

          {/* Açıklama paragrafı */}
          <motion.p
            className="text-[#3D3A35] text-base md:text-lg font-normal leading-relaxed max-w-xl mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.24, ease: "easeOut" }}
          >
            Adana ve çevresinden{" "}
            <span className="text-[#e11d48] font-semibold">yüzlerce araç sahibinin</span>{" "}
            güvendiği adres.
            Adana ve çevresindeki araç sahiplerinin deneyimleri.
          </motion.p>
        </div>
      </div>

      {/* 4 sütun sonsuz dikey kaydırma */}
      <div
        className="relative z-10 w-full mt-12 flex justify-center gap-5 px-6"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          maxHeight: "680px",
          overflow: "hidden",
        }}
      >
        <TestimonialsColumn testimonials={firstColumn} duration={22} />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={28} />
        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={25} />
        <TestimonialsColumn testimonials={fourthColumn} className="hidden xl:block" duration={30} />
      </div>
    </section>
  );
}
