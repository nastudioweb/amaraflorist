import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  organization: string;
  productOrdered: string;
  rating: number;
  content: string;
  eventDate: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    author: 'Astrid Widjaja',
    role: 'Head of Corporate Communications',
    organization: 'PT Mega Graha Mandiri',
    productOrdered: 'Al-Mubarak Royal Eid Chest (120 Paket)',
    rating: 5,
    content:
      'Pemesanan 120 paket hampers Idul Fitri untuk relasi direksi kami diantar tepat waktu tanpa satu pun toples kue yang retak. Admin WhatsApp sangat responsif mengirimkan daftar tanda terima satu per satu beserta foto serah terima. Rekan bisnis kami sangat terkesan dengan kotak beludru emeraldnya.',
    eventDate: 'Jakarta Selatan · Pesanan Korporat Lebaran',
  },
  {
    id: 'testi-2',
    author: 'David Sutanto',
    role: 'Founder & Managing Partner',
    organization: 'Alpha Capital Partners',
    productOrdered: 'Imperial Dynasty CNY Prosperity Chest',
    rating: 5,
    content:
      'Kualitas sarang burung walet dan kemasan peti Imlek Amara benar-benar berkelas VVIP. Detail sulaman emas phoenix dan buah jeruk mandarinnya sangat segar. Proses checkout langsung ke WhatsApp membuat tim sekretariat kami sangat terbantu dalam merekap kartu ucapan.',
    eventDate: 'Jakarta Pusat · Pesanan Hantaran Imlek',
  },
  {
    id: 'testi-3',
    author: 'drg. Nadia Saraswati',
    role: 'Owner & Head Dentist',
    organization: 'Dentique Aesthetic Clinic Senopati',
    productOrdered: 'Papan Bunga Grand Opening & Standing Flower',
    rating: 5,
    content:
      'Waktu pembukaan klinik kami di Senopati, papan bunga yang kami pesan tiba tepat 1 jam sebelum seremoni potong pita. Bunganya super segar, font styrofoam rapi dan simetris, serta kurir mengirim foto dokumentasi ke WhatsApp sebelum berangkat dan setelah terpasang di depan lobi.',
    eventDate: 'Jakarta Selatan · Grand Opening Acara',
  },
  {
    id: 'testi-4',
    author: 'Clarissa & Edward Tandiono',
    role: 'Mempelai Pengantin',
    organization: 'Resepsi Hotel Fairmont Jakarta',
    productOrdered: 'Aura Rose Bridal Bouquet & Papan Bunga Wedding',
    rating: 5,
    content:
      'Buket bunga mawar Ecuador blush pink untuk pemberkatan gereja dan resepsi malam hari tetap segar sepanjang hari. Wangi eucalyptus-nya segar sekali. Amara Florist adalah florist paling terpercaya untuk momen sakral sekali seumur hidup.',
    eventDate: 'Ballroom Fairmont Jakarta · Momen Pernikahan',
  },
  {
    id: 'testi-5',
    author: 'Ir. Bambang Trihatmojo',
    role: 'VP Operations & Procurement',
    organization: 'PT Samudera Logistik Nusantara',
    productOrdered: 'Winter Harvest Festive Hamper & Papan Bunga Kilat',
    rating: 5,
    content:
      'Layanan ekspres 2 jam papan bunga ucapan ke gedung pertemuan sangat sigap di saat genting. Admin WhatsApp responsif mengurus invoice kantor berfaktur resmi dan pengantaran berjalan tertib tanpa kendala. Sangat direkomendasikan untuk kebutuhan instansi.',
    eventDate: 'Jakarta Barat · Pesanan Korporat Resmi',
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance carousel every 6 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      className="py-14 bg-[#F5F2EB] border-t border-stone-200/90 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C29D62]">
              <span>Bukti Kepuasan Pelanggan</span>
              <span aria-hidden="true">·</span>
              <span>Ulasan Terverifikasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17382D] mt-1">
              Kepercayaan Klien Korporat & Momen Spesial
            </h2>
          </div>

          {/* Social Proof Metric Badge (Anti-slop compliant) */}
          <div className="flex items-center gap-4 text-xs text-stone-600 bg-white/70 py-2 px-3.5 rounded-lg border border-stone-200/80 backdrop-blur-xs shrink-0">
            <div className="flex items-center gap-1 text-amber-500 font-bold tabular-nums">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>4.9 / 5.0</span>
            </div>
            <span className="text-stone-300">|</span>
            <span>350+ Pesanan Hantaran & Papan Bunga Terkirim</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 shadow-sm"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Decorative Quote Watermark (subtle, non-distracting) */}
          <div className="absolute top-6 right-6 text-stone-100 pointer-events-none" aria-hidden="true">
            <Quote className="w-20 h-20 text-[#17382D]/5" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Testimonial Quote & Details */}
            <div className="lg:col-span-8 space-y-4">
              {/* Product Badge & Rating unboxed */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <div className="flex items-center gap-0.5 text-amber-500" aria-label={`Rating ${current.rating} bintang`}>
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-[#17382D]">{current.productOrdered}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-400">{current.eventDate}</span>
              </div>

              {/* Quote Content */}
              <blockquote className="text-base sm:text-lg text-stone-800 leading-relaxed font-serif italic text-balance">
                "{current.content}"
              </blockquote>

              {/* Author & Credibility */}
              <div className="pt-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#17382D] text-[#E8DCC4] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                  {current.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                    <span>{current.author}</span>
                    <span title="Pesanan Terverifikasi" className="inline-flex">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  </div>
                  <div className="text-xs text-stone-500">
                    {current.role} — <span className="text-stone-700 font-medium">{current.organization}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Carousel Navigation & Counter Controls */}
            <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-stone-100 pt-4 lg:pt-0 lg:pl-8 space-y-5">
              <div className="space-y-1 text-left lg:text-right">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                  Ulasan Pelanggan
                </span>
                <span className="text-sm font-mono font-bold text-stone-900 tabular-nums">
                  0{currentIndex + 1} <span className="text-stone-300">/</span> 0{TESTIMONIALS.length}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#17382D] bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[#17382D]/40"
                  aria-label="Ulasan Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-stone-300 hover:border-[#17382D] bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[#17382D]/40"
                  aria-label="Ulasan Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5 pt-1">
                {TESTIMONIALS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-6 bg-[#17382D]'
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Buka ulasan ke-${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
