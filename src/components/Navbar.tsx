import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';
import { STORE_PHONE } from '../data/products';

interface NavbarProps {
  totalItems: number;
  subtotal: number;
  onOpenCart: () => void;
  onSelectCategory: (cat: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalItems,
  subtotal,
  onOpenCart,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Reassurance Micro Banner */}
      <div className="bg-[#17382D] text-[#E8DCC4] text-[11px] font-medium py-1.5 px-4 text-center tracking-wider">
        <span>Pengiriman H+0 (Same-Day) Se-Jabodetabek · Foto Hasil Dikirim ke WhatsApp Sebelum Antar · Free Kartu Ucapan</span>
      </div>

      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Action: Cart) */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-18">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#17382D] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          Amara Florist & Hampers
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <a
            href="#katalog"
            onClick={() => onSelectCategory('all')}
            className="hover:text-[#17382D] transition-colors whitespace-nowrap shrink-0"
          >
            Semua Katalog
          </a>
          <a
            href="#katalog"
            onClick={() => onSelectCategory('parcel-lebaran')}
            className="hover:text-[#17382D] transition-colors whitespace-nowrap shrink-0"
          >
            Parcel Lebaran
          </a>
          <a
            href="#katalog"
            onClick={() => onSelectCategory('parcel-imlek')}
            className="hover:text-[#17382D] transition-colors whitespace-nowrap shrink-0"
          >
            Parcel Imlek
          </a>
          <a
            href="#katalog"
            onClick={() => onSelectCategory('parcel-natal')}
            className="hover:text-[#17382D] transition-colors whitespace-nowrap shrink-0"
          >
            Parcel Natal
          </a>
          <a
            href="#katalog"
            onClick={() => onSelectCategory('papan-bunga')}
            className="hover:text-[#17382D] transition-colors whitespace-nowrap shrink-0"
          >
            Papan Bunga
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Cart Drawer Trigger) + Quick CS */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('Halo Admin Amara Florist, saya ingin konsultasi pesanan parcel & bunga.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-[#17382D] transition-colors whitespace-nowrap shrink-0"
            title="Chat WhatsApp Admin"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700" />
            <span>Chat CS</span>
          </a>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-white bg-[#17382D] hover:bg-[#102720] active:scale-[0.98] rounded-full transition-all shadow-sm whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#17382D]/40"
            aria-label="Buka Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Keranjang</span>
            {totalItems > 0 ? (
              <span className="bg-[#C29D62] text-stone-900 text-[11px] font-bold px-2 py-0.5 rounded-full tabular-nums">
                {totalItems} · {formatRupiah(subtotal)}
              </span>
            ) : (
              <span className="text-emerald-200/80 text-[11px]">0 Item</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
