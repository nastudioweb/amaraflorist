import React, { useState } from 'react';
import { Product } from '../types';
import { formatRupiah, getWhatsAppDirectUrl } from '../utils/formatters';
import { STORE_PHONE } from '../data/products';
import { X, Check, ShoppingBag, MessageCircle, Truck, Clock, ShieldCheck, Sparkles, Camera, Upload } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColorTheme?: string, quantity?: number) => void;
  onSaveCustomImage?: (productId: string, imageUrl: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onSaveCustomImage,
}) => {
  if (!product) return null;

  const [selectedTheme, setSelectedTheme] = useState<string>(
    product.colorThemes ? product.colorThemes[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedTheme, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 900);
  };

  const handleDirectWhatsAppBuy = () => {
    const codePrefix = product.code ? `[${product.code}] ` : '';
    const text = `Halo Admin Amara Florist, saya ingin memesan langsung:
*${codePrefix}${product.name}*
• Jumlah: ${quantity} paket
• Pilihan Nuansa: ${selectedTheme || 'Standar'}
• Total: ${formatRupiah(product.price * quantity)}

Mohon konfirmasi ketersediaan & jadwal pengiriman hari ini. Terima kasih!`;
    window.open(getWhatsAppDirectUrl(STORE_PHONE, text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Tutup Detail"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Image & Badges */}
        <div className="md:w-1/2 relative bg-stone-100 flex flex-col justify-center">
          <div className="relative aspect-square md:aspect-auto md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {product.tag && (
              <div className="absolute top-4 left-4 bg-[#17382D]/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded">
                {product.tag}
              </div>
            )}

            {/* Quick Upload Button for user to customize this product's image */}
            {onSaveCustomImage && (
              <label
                className="absolute bottom-3 left-3 right-3 sm:right-auto bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white text-[11px] font-medium py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                title="Ganti foto produk ini dari file komputer/HP Anda"
              >
                <Camera className="w-3.5 h-3.5 text-[#C29D62]" />
                <span>Ganti Foto dari Perangkat</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      if (typeof ev.target?.result === 'string') {
                        onSaveCustomImage(product.id, ev.target.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Right Column: Specifications & Purchasing Controls */}
        <div className="md:w-1/2 p-6 sm:p-7 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
          <div>
            {/* Category unboxed text */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 flex-wrap">
              {product.code && (
                <span className="font-mono font-bold text-xs bg-[#17382D] text-amber-200 px-2 py-0.5 rounded shadow-xs">
                  Kode: {product.code}
                </span>
              )}
              <span className="uppercase tracking-wider font-semibold text-[#C29D62]">
                {product.categoryLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>Stok Ready</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight mb-2">
              {product.name}
            </h2>

            {/* Price display */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-stone-900 tabular-nums">
                {formatRupiah(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  {formatRupiah(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
              {product.fullDesc}
            </p>

            {/* Package Contents Checklist */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200/80 mb-4">
              <span className="text-xs font-semibold text-stone-900 block mb-2">
                {product.isFlowerBoard ? 'Spesifikasi Papan Bunga:' : 'Isi Kemasan & Kelengkapan:'}
              </span>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {product.contents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#17382D] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color / Theme Selection */}
            {product.colorThemes && product.colorThemes.length > 0 && (
              <div className="mb-4">
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Pilihan Nuansa / Warna Pita:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colorThemes.map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => setSelectedTheme(theme)}
                      className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                        selectedTheme === theme
                          ? 'border-[#17382D] bg-[#17382D] text-white font-medium'
                          : 'border-stone-300 text-stone-700 hover:border-stone-400 bg-white'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensions & Delivery Notice */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-500 mb-4 pt-2 border-t border-stone-100">
              <div>
                <span className="font-semibold text-stone-700 block">Dimensi Ukuran:</span>
                <span>{product.dimensions}</span>
              </div>
              <div>
                <span className="font-semibold text-stone-700 block">Jadwal Pengiriman:</span>
                <span>{product.leadTime}</span>
              </div>
            </div>
          </div>

          {/* Bottom Purchase Actions */}
          <div className="pt-4 border-t border-stone-200">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-medium text-stone-700">Jumlah Pesanan:</span>
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-semibold text-stone-600 hover:bg-stone-100"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold tabular-nums text-stone-900 min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-semibold text-stone-600 hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addedToast}
                className="w-full py-3 bg-[#17382D] hover:bg-[#102720] active:scale-[0.98] text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-[#C29D62]" />
                    <span>Berhasil Masuk Keranjang!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Tambah ke Keranjang ({formatRupiah(product.price * quantity)})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsAppBuy}
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.98] text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pesan Cepat Langsung via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
