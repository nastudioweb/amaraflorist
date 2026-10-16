import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Camera } from 'lucide-react';
import { STORE_PHONE } from '../data/products';
import heroBannerImg from '../assets/images/hero_florist_hamper_banner_1791952531675.jpg';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Refined Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Subtle editorial kicker (unboxed, no pills) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B6B38] tracking-widest uppercase mb-3">
              <span>Atelier Florist & Luxury Hampers</span>
              <span aria-hidden="true">·</span>
              <span>Jakarta Sejak 2018</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#17382D] leading-[1.18] tracking-tight mb-4 text-balance">
              Hantaran Kemewahan & Bunga Segar untuk Momen Paling Berkesan
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-6 max-w-xl">
              Koleksi parcel eksklusif Hari Raya Lebaran, Imlek, Natal, serta papan bunga ucapan prestisius. Dibuat dengan bahan artisan terbaik dan bunga segar kualitas ekspor, dikirim rapi ke seluruh Jabodetabek.
            </p>

            {/* Direct Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#17382D] hover:bg-[#102720] active:scale-[0.98] text-white font-medium text-sm rounded-lg transition-all shadow-sm"
              >
                <span>Lihat Katalog Produk</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('Halo Amara Florist, saya ingin tanya katalog hampers & papan bunga untuk hari ini.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F2EDE4] hover:bg-[#E8DCC4] active:scale-[0.98] text-[#17382D] font-medium text-sm rounded-lg transition-all border border-stone-300/80"
              >
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>

            {/* Reassurance Grid (Zero decorative pulsing dots, clear benefits) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-xs sm:text-sm">
                  <Clock className="w-4 h-4 text-[#C29D62] shrink-0" />
                  <span>Kirim Hari H</span>
                </div>
                <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Layanan ekspres H+0</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-xs sm:text-sm">
                  <Camera className="w-4 h-4 text-[#C29D62] shrink-0" />
                  <span>Foto Sebelum Kirim</span>
                </div>
                <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">QC via WhatsApp</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#C29D62] shrink-0" />
                  <span>Garansi Utuh</span>
                </div>
                <span className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Armada mobil khusus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/60 bg-stone-100 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]">
              <img
                src={heroBannerImg}
                alt="Studio Amara Florist & Hampers Jakarta dengan rangkaian bunga segar dan parcel mewah"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle scrim overlay with boutique label */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-end justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#E8DCC4] font-medium">Boutique Florist Studio</p>
                  <p className="text-sm sm:text-base font-serif font-medium">Koleksi Signature Hari Raya & Perayaan Akbar</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-stone-200">100% Bunga & Bahan Segar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
