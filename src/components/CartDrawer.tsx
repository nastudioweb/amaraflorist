import React from 'react';
import { CartItem } from '../types';
import { formatRupiah } from '../utils/formatters';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Mail } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#17382D]" />
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Keranjang Belanja
              </h2>
              <span className="text-xs bg-[#17382D] text-white px-2 py-0.5 rounded-full font-sans font-semibold">
                {totalItemCount}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
              aria-label="Tutup Keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-800 mb-1">
                  Keranjang Masih Kosong
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Jelajahi koleksi hampers Lebaran, Imlek, Natal, dan papan bunga eksklusif kami.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#17382D] text-white text-xs font-semibold rounded-lg hover:bg-[#102720] transition-colors"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200/80"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            {item.product.code && (
                              <span className="font-mono font-bold text-[10px] text-[#17382D] bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded mr-1.5">
                                {item.product.code}
                              </span>
                            )}
                            <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug line-clamp-1 inline">
                              {item.product.name}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-400 hover:text-rose-600 p-0.5 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedColorTheme && (
                          <span className="text-[11px] text-stone-500 block">
                            Nuansa: {item.selectedColorTheme}
                          </span>
                        )}

                        <div className="text-xs font-semibold text-stone-900 mt-1 tabular-nums">
                          {formatRupiah(item.product.price)}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-bold tabular-nums text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-stone-900 tabular-nums">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
              {/* Free greeting card notice */}
              <div className="flex items-center gap-2 text-xs text-[#17382D] bg-[#EBF3EF] p-2.5 rounded-lg border border-[#D3E4DB]">
                <Mail className="w-4 h-4 text-[#17382D] shrink-0" />
                <span>Gratis kartu ucapan kustom & pita elegan untuk setiap pesanan.</span>
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 pt-1 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal Produk</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {formatRupiah(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimasi Pengiriman</span>
                  <span className="text-emerald-700 font-medium">
                    Gratis / Kurir Khusus
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Sementara</span>
                  <span className="tabular-nums text-base text-[#17382D]">
                    {formatRupiah(subtotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#17382D] hover:bg-[#102720] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Lanjut ke Formulir & WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-center text-xs text-stone-500 hover:text-stone-800 transition-colors"
              >
                Tambah Produk Lainnya
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
