import React, { useState } from 'react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';
import { X, Upload, Link as LinkIcon, RefreshCw, Check, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface ProductImageCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  customImages: Record<string, string>;
  onSaveCustomImage: (productId: string, imageUrl: string) => void;
  onResetCustomImage: (productId: string) => void;
}

export const ProductImageCustomizerModal: React.FC<ProductImageCustomizerModalProps> = ({
  isOpen,
  onClose,
  products,
  customImages,
  onSaveCustomImage,
  onResetCustomImage,
}) => {
  if (!isOpen) return null;

  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const activeImage = customImages[selectedProductId] || selectedProduct?.image;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar (maksimal 5MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onSaveCustomImage(selectedProductId, event.target.result);
        setSuccessToast(true);
        setTimeout(() => setSuccessToast(false), 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;
    onSaveCustomImage(selectedProductId, imageUrlInput.trim());
    setImageUrlInput('');
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#17382D] text-white flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Upload & Kelola Foto Produk Sendiri
              </h2>
              <p className="text-xs text-stone-500">
                Unggah file gambar dari komputer atau masukkan link URL foto produk
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Note on Spreadsheet Image Copy-Paste */}
        <div className="bg-[#FAF8F5] px-4 py-3 border-b border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#C29D62] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-stone-800">Catatan Salin Tabel Spreadsheet:</span> Ketika tabel Excel/Google Sheets disalin sebagai teks, kolom gambar tidak dapat terkirim melalui chat (ter-paste sebagai koma ganda). Gunakan fitur ini untuk mengunggah file foto asli dari spreadsheet Anda ke katalog!
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Product Selector */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1.5">
              Pilih Produk yang Ingin Diganti Fotonya:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#17382D]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code ? `[${p.code}] ` : ''}{p.name} - {formatRupiah(p.price)}
                </option>
              ))}
            </select>
          </div>

          {/* Current Image Preview & Upload Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-stone-50 p-4 rounded-xl border border-stone-200">
            {/* Image Preview Box (1:1 aspect ratio) */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-stone-200 border border-stone-300 shadow-xs">
              <img
                src={activeImage}
                alt={selectedProduct?.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {customImages[selectedProductId] && (
                <div className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow">
                  Foto Kustom Anda
                </div>
              )}
            </div>

            {/* Upload Controls */}
            <div className="space-y-3">
              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900 mb-0.5">
                  {selectedProduct?.name}
                </h4>
                <div className="text-xs font-bold text-[#17382D] tabular-nums">
                  {formatRupiah(selectedProduct?.price || 0)}
                </div>
              </div>

              {/* File Upload Button */}
              <div>
                <label className="w-full py-2.5 px-3 bg-[#17382D] hover:bg-[#102720] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>Pilih File Foto dari Perangkat</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-[10px] text-stone-400 block text-center mt-1">
                  Mendukung JPG, PNG, WebP (Maksimal 5MB)
                </span>
              </div>

              {/* Reset to Default */}
              {customImages[selectedProductId] && (
                <button
                  type="button"
                  onClick={() => {
                    onResetCustomImage(selectedProductId);
                    setSuccessToast(true);
                    setTimeout(() => setSuccessToast(false), 2000);
                  }}
                  className="w-full py-2 bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium rounded-lg border border-stone-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Kembalikan ke Foto Default</span>
                </button>
              )}
            </div>
          </div>

          {/* Alternative: Image URL Input */}
          <form onSubmit={handleApplyUrl} className="pt-2">
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Atau Tempel Link URL Gambar Online:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="https://example.com/foto-parcel.jpg"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#17382D]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
              >
                Terapkan
              </button>
            </div>
          </form>

          {/* Success Toast */}
          {successToast && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs p-3 rounded-lg flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Foto produk berhasil diperbarui dan tersimpan di katalog!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-[#FAF8F5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#17382D] text-white text-xs font-semibold rounded-lg hover:bg-[#102720]"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
