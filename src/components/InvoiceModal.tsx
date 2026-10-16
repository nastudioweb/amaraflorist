import React from 'react';
import { OrderRecord } from '../types';
import { formatRupiah } from '../utils/formatters';
import { STORE_NAME, STORE_ADDRESS, STORE_PHONE } from '../data/products';
import { X, Printer, CheckCircle, Flower2 } from 'lucide-react';

interface InvoiceModalProps {
  order: OrderRecord | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actions Bar */}
        <div className="p-4 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#17382D]">
              Invoice Digital Resmi
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-mono text-stone-600">{order.orderId}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#17382D] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 hover:bg-[#102720] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document */}
        <div className="p-6 sm:p-8 overflow-y-auto font-sans text-stone-800 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-[#17382D] mb-1">
                <Flower2 className="w-5 h-5 text-[#C29D62]" />
                <h1 className="font-serif font-bold text-2xl text-[#17382D]">
                  {STORE_NAME}
                </h1>
              </div>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                {STORE_ADDRESS}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                WhatsApp: +{STORE_PHONE} · Web Checkout Order
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block">
                FAKTUR PESANAN
              </span>
              <div className="text-lg font-mono font-bold text-stone-900 mt-0.5">
                {order.orderId}
              </div>
              <p className="text-xs text-stone-500 mt-0.5">Tanggal: {order.orderDate}</p>
              <div className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{order.status}</span>
              </div>
            </div>
          </div>

          {/* Billing & Shipping Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pb-6 border-b border-stone-200">
            <div>
              <h3 className="font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                Data Pemesan (Billed To):
              </h3>
              <p className="font-semibold text-stone-800 text-sm">{order.customer.senderFullName}</p>
              <p className="text-stone-600 mt-0.5">No. WA: {order.customer.senderPhone}</p>
              {order.customer.senderEmail && (
                <p className="text-stone-600">Email: {order.customer.senderEmail}</p>
              )}
            </div>

            <div>
              <h3 className="font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                Tujuan Pengiriman (Ship To):
              </h3>
              <p className="font-semibold text-stone-800 text-sm">{order.customer.recipientFullName}</p>
              <p className="text-stone-600 mt-0.5">No. WA Penerima: {order.customer.recipientPhone}</p>
              <p className="text-stone-600 mt-0.5 leading-relaxed">{order.customer.deliveryAddress}</p>
              <p className="text-stone-700 font-medium mt-1">
                Jadwal: {order.customer.deliveryDate} ({order.customer.deliveryTimeSlot})
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px]">
                  <th className="py-2">Item Produk</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Harga Satuan</th>
                  <th className="py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="py-2">
                    <td className="py-2.5">
                      <div className="font-semibold text-stone-900">
                        {item.product.code && (
                          <span className="font-mono font-bold text-[10px] text-[#17382D] bg-stone-100 border border-stone-200 px-1 py-0.5 rounded mr-1.5">
                            {item.product.code}
                          </span>
                        )}
                        {item.product.name}
                      </div>
                      {item.selectedColorTheme && (
                        <div className="text-[11px] text-stone-500">Nuansa: {item.selectedColorTheme}</div>
                      )}
                    </td>
                    <td className="py-2.5 text-center tabular-nums">{item.quantity}</td>
                    <td className="py-2.5 text-right tabular-nums text-stone-600">
                      {formatRupiah(item.product.price)}
                    </td>
                    <td className="py-2.5 text-right tabular-nums font-semibold text-stone-900">
                      {formatRupiah(item.product.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-stone-200 flex flex-col items-end text-xs space-y-1.5">
            <div className="w-64 flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-stone-900 tabular-nums">{formatRupiah(order.subtotal)}</span>
            </div>
            <div className="w-64 flex justify-between text-stone-600">
              <span>Ongkos Kirim (Jabodetabek):</span>
              <span className="font-semibold text-emerald-700">GRATIS</span>
            </div>
            <div className="w-64 flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
              <span>Total Tagihan:</span>
              <span className="text-base text-[#17382D] tabular-nums">{formatRupiah(order.total)}</span>
            </div>
          </div>

          {/* Greeting or Flower Board Text on Invoice */}
          {(order.greeting.message || order.greeting.boardMainText) && (
            <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200 text-xs space-y-1">
              <span className="font-bold text-stone-900 block">Catatan Ucapan Terlampir:</span>
              {order.greeting.boardMainText && (
                <p>
                  <strong>Tulisan di Papan Bunga:</strong> {order.greeting.boardMainText} ({order.greeting.boardSenderText})
                </p>
              )}
              {order.greeting.message && (
                <p className="italic text-stone-600">
                  "{order.greeting.message}"
                </p>
              )}
            </div>
          )}

          {/* Footer Notes */}
          <div className="pt-4 text-center text-[11px] text-stone-400">
            Terima kasih telah mempercayakan momen istimewa Anda bersama Amara Florist & Hampers.
          </div>
        </div>
      </div>
    </div>
  );
};
