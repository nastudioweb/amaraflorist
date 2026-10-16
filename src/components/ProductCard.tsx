import React from 'react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';
import { Plus, Eye, Star, Truck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onAddToCart,
}) => {
  return (
    <div className="group rounded-xl border border-stone-200/90 bg-white overflow-hidden hover:border-stone-300 hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Product Image Slot (1:1 aspect ratio) */}
      <div
        className="relative aspect-square w-full bg-stone-100 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Tag (max 1 subtle text tag) */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-[#17382D]/90 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded">
            {product.tag}
          </div>
        )}

        {/* Product Code Badge (e.g. LB-01, IM-02, NT-03) */}
        {product.code && (
          <div className="absolute top-3 right-3 bg-stone-900/85 backdrop-blur-xs text-amber-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm border border-white/20">
            {product.code}
          </div>
        )}

        {/* Quick Action Overlay for Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="px-3 py-1.5 bg-white text-stone-900 text-xs font-medium rounded shadow hover:bg-stone-100 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Detail</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Lead Time unboxed metadata */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 flex-wrap">
            {product.code && (
              <span className="font-mono font-bold text-[10px] bg-stone-100 text-[#17382D] border border-stone-200 px-1.5 py-0.5 rounded">
                {product.code}
              </span>
            )}
            <span className="uppercase tracking-wider font-semibold text-[11px] text-[#C29D62]">
              {product.categoryLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-stone-400" />
              <span>H+0 Siap Antar</span>
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetail(product)}
            className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-snug group-hover:text-[#17382D] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-base sm:text-lg font-bold text-stone-900 font-sans tabular-nums">
              {formatRupiah(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-stone-400 line-through tabular-nums">
                {formatRupiah(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#17382D] hover:bg-[#102720] active:scale-[0.97] text-white text-xs font-semibold rounded-lg transition-all shadow-sm shrink-0 focus-visible:ring-2 focus-visible:ring-[#17382D]/40"
            title="Tambah ke Keranjang"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>
      </div>
    </div>
  );
};
