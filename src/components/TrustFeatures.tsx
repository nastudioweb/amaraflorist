import React from 'react';
import { ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  return (
    <section className="py-10 bg-[#FAF8F5] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#17382D]/10 text-[#17382D] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#17382D]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900">Artisan Baker & Fresh Bloom</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Kue kering dipanggang segar dengan butter wisman murni. Bunga segar dipetik langsung hari pengiriman.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#17382D]/10 text-[#17382D] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#17382D]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900">Same-Day & Terjadwal</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Bisa kirim di hari yang sama untuk kebutuhan mendadak atau booking tanggal perayaan jauh hari sebelumnya.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#17382D]/10 text-[#17382D] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#17382D]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900">Armada Berpendingin Khusus</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Menjamin toples kaca tidak pecah dan bunga tidak layu terpapar terik matahari di perjalanan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#17382D]/10 text-[#17382D] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#17382D]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900">Garansi Kepuasan 100%</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Foto dokumentasi sebelum berangkat dan di lokasi penerima langsung dikirimkan ke WhatsApp Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
