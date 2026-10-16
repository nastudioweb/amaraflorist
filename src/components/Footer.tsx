import React from 'react';
import { STORE_NAME, STORE_ADDRESS, STORE_PHONE } from '../data/products';
import { MapPin, Phone, Mail, Instagram, Clock, Flower2 } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#10261E] text-stone-300 pt-14 pb-20 md:pb-14 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-emerald-900/40">
          {/* Brand & Boutique Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Flower2 className="w-6 h-6 text-[#C29D62]" />
              <span className="font-serif font-bold text-2xl tracking-tight">
                {STORE_NAME}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Boutique florist dan atelier hampers premium. Melayani parcel Lebaran, Imlek, Natal, buket bunga segar, serta papan bunga ucapan prestisius dengan jangkauan pengiriman Jabodetabek.
            </p>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C29D62] shrink-0 mt-0.5" />
                <span>{STORE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C29D62] shrink-0" />
                <span>WhatsApp Pemesanan: +{STORE_PHONE}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C29D62] shrink-0" />
                <span>Operasional: Senin - Minggu (08.00 - 21.00 WIB)</span>
              </div>
            </div>
          </div>

          {/* Quick Links Categories */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C29D62]">
              Kategori Spesial
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('parcel-lebaran')}
                  className="hover:text-white transition-colors"
                >
                  Parcel Lebaran (Idul Fitri)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('parcel-imlek')}
                  className="hover:text-white transition-colors"
                >
                  Parcel Imlek (Chinese New Year)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('parcel-natal')}
                  className="hover:text-white transition-colors"
                >
                  Parcel Natal & Tahun Baru
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('papan-bunga')}
                  className="hover:text-white transition-colors"
                >
                  Papan Bunga Ucapan (Grand Opening/Wedding)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('buket-bunga')}
                  className="hover:text-white transition-colors"
                >
                  Buket Bunga Segar & Wisuda
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Reassurance */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C29D62]">
              Pembayaran & Pengiriman
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Mendukung checkout otomatis WhatsApp, pembayaran instan QRIS (BCA, Mandiri, BRI, GoPay, OVO, ShopeePay), dan invoice digital resmi untuk kebutuhan korporat.
            </p>
            <div className="pt-2">
              <div className="bg-emerald-950/60 p-3 rounded-lg border border-emerald-900/60 text-[11px] text-stone-300">
                <span className="font-semibold text-white block mb-0.5">Armada Mobil Berpendingin Toko</span>
                Menjamin kue kering tidak berantakan dan kelopak bunga tetap segar mekar saat tiba di alamat penerima.
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <p>© {new Date().getFullYear()} {STORE_NAME}. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Konfirmasi WhatsApp</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
