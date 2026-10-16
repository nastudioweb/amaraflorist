import React from 'react';
import { ShoppingBag, MessageCircle, LayoutGrid, Sparkles } from 'lucide-react';
import { STORE_PHONE } from '../data/products';
import { formatRupiah } from '../utils/formatters';

interface MobileBottomNavProps {
  totalItems: number;
  subtotal: number;
  onOpenCart: () => void;
  onScrollToCatalog: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  totalItems,
  subtotal,
  onOpenCart,
  onScrollToCatalog,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-3 py-2 flex items-center justify-between gap-2 max-h-[60px]">
      {/* Katalog button */}
      <button
        type="button"
        onClick={onScrollToCatalog}
        className="flex flex-col items-center justify-center text-stone-600 hover:text-[#17382D] py-1 px-2.5 transition-colors"
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="text-[10px] font-medium mt-0.5">Katalog</span>
      </button>

      {/* WhatsApp CS Button */}
      <a
        href={`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent('Halo CS Amara Florist, saya ingin tanya pesanan hampers/bunga.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center text-[#25D366] py-1 px-2.5 transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-[10px] font-medium mt-0.5">Chat CS</span>
      </a>

      {/* Floating Cart Trigger with dynamic subtotal */}
      <button
        type="button"
        onClick={onOpenCart}
        className="flex-1 ml-1 py-2 px-3 bg-[#17382D] hover:bg-[#102720] active:scale-[0.98] text-white rounded-lg flex items-center justify-between transition-all shadow-sm"
      >
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C29D62] text-stone-900 text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold">Keranjang</span>
        </div>

        <span className="text-xs font-bold text-[#E8DCC4] tabular-nums">
          {totalItems > 0 ? formatRupiah(subtotal) : 'Rp 0'}
        </span>
      </button>
    </div>
  );
};
