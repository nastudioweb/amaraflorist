import React from 'react';
import { ProductCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';
import imgLebaranHighlight from '../assets/images/parcel_lebaran_cookies_set_1792031008058.jpg';
import imgImlekHighlight from '../assets/images/parcel_imlek_red_giftbox_1792031008349.jpg';
import imgNatalHighlight from '../assets/images/parcel_natal_festive_box_1792031008439.jpg';
import imgPapanHighlight from '../assets/images/papan_bunga_ucapan_1791952534125.jpg';

interface CategoryHighlightsProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryHighlights: React.FC<CategoryHighlightsProps> = ({ onSelectCategory }) => {
  const highlights = [
    {
      id: 'parcel-lebaran' as ProductCategory,
      title: 'Parcel Lebaran',
      subtitle: 'Idul Fitri Hampers',
      desc: 'Pilihan lengkap mulai Rp 135rb. Nastar wisman, kastengel edam, besek bambu artisan & hardbox emerald.',
      image: imgLebaranHighlight,
      themeClass: 'bg-[#17382D] text-[#E8DCC4]',
      badge: 'Spesial Hari Raya',
    },
    {
      id: 'parcel-imlek' as ProductCategory,
      title: 'Parcel Imlek',
      subtitle: 'CNY Prosperity Chest',
      desc: 'Mulai Rp 590rb. Sarang burung walet royal, kue keranjang nian gao, cokelat ingot emas & teh imperial.',
      image: imgImlekHighlight,
      themeClass: 'bg-[#5A1212] text-[#FFDFC4]',
      badge: 'Tahun Baru Imlek',
    },
    {
      id: 'parcel-natal' as ProductCategory,
      title: 'Parcel Natal & Tahun Baru',
      subtitle: 'Festive Holiday Gift',
      desc: 'Mulai Rp 430rb. Sparkling cider, rich hot cocoa, holiday butter cookies & lilin wangi pinus.',
      image: imgNatalHighlight,
      themeClass: 'bg-[#1C3325] text-[#DCECDD]',
      badge: 'Season’s Greetings',
    },
    {
      id: 'papan-bunga' as ProductCategory,
      title: 'Papan Bunga Ucapan',
      subtitle: 'Grand Opening & Wedding',
      desc: 'Bunga segar penuh 2x1.25m, font rapi timbul, pengiriman kilat langsung ke venue.',
      image: imgPapanHighlight,
      themeClass: 'bg-[#1E293B] text-[#E2E8F0]',
      badge: 'Kirim Cepat ke Venue',
    },
  ];

  return (
    <section className="py-12 bg-[#FAF8F5] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C29D62]">Kategori Unggulan</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17382D] mt-1">
              Koleksi Khusus Hari Raya & Papan Bunga
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-md">
            Pilih kategori perayaan untuk melihat katalog eksklusif dengan kustomisasi pesan & kartu ucapan gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory(item.id)}
              className="group text-left rounded-xl overflow-hidden border border-stone-200/90 bg-white hover:border-[#17382D]/40 hover:shadow-md transition-all duration-300 flex flex-col focus-visible:ring-2 focus-visible:ring-[#17382D]/40"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#17382D]/85 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                  {item.badge}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#17382D] transition-colors">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#17382D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#17382D] font-semibold">
                  <span>Lihat Koleksi</span>
                  <span className="text-stone-400 font-normal">Tersedia</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
