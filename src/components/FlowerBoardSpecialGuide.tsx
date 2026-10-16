import React from 'react';
import { Camera, Truck, Clock, Palette, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProductCategory } from '../types';
import imgPapanBunga from '../assets/images/papan_bunga_ucapan_1791952534125.jpg';

interface FlowerBoardGuideProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const FlowerBoardSpecialGuide: React.FC<FlowerBoardGuideProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-12 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200 aspect-[4/3]">
              <img
                src={imgPapanBunga}
                alt="Papan Bunga Ucapan Amara Florist berdiri kokoh di lokasi acara"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#17382D] text-white text-xs font-semibold px-2.5 py-1 rounded">
                Standar Mutu VVIP
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C29D62]">
              Layanan Spesialis Papan Bunga
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17382D] mt-1 mb-3">
              Ucapan Prestisius untuk Kolega, Kerabat & Mitra Bisnis
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              Amara Florist melayani pembuatan papan bunga ucapan pernikahan, pembukaan toko/kantor (Grand Opening), wisuda, pelantikan, hingga belasungkawa duka cita. Kami menjaga reputasi nama pengirim dengan bunga segar berkualitas tinggi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-center shrink-0 text-[#17382D]">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Foto WhatsApp 2 Tahap</h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Foto hasil jadi sebelum armada berangkat dan foto saat papan bunga terpasang rapi di venue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-center shrink-0 text-[#17382D]">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Armada Mobil Toko Khusus</h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Papan diantar berdiri menggunakan mobil tertutup khusus agar kelopak bunga tidak rontok di jalan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-center shrink-0 text-[#17382D]">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Font Blok Rapi & Tegas</h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Nama PT dan nama pengirim terbaca jelas dari kejauhan, proporsional, dan simetris.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-center shrink-0 text-[#17382D]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Pengerjaan Kilat 2-3 Jam</h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Siap antar kebutuhan mendadak ke rumah duka, gedung pernikahan, maupun peresmian kantor.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectCategory('papan-bunga')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#17382D] hover:bg-[#102720] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <span>Pesan Papan Bunga Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
