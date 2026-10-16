import React, { useState } from 'react';
import { CartItem, CustomerData, GreetingData, PaymentMethod, OrderRecord } from '../types';
import { formatRupiah, generateOrderId, formatWhatsAppOrderMessage, getWhatsAppDirectUrl } from '../utils/formatters';
import { STORE_PHONE, GREETING_TEMPLATES } from '../data/products';
import { X, Send, Copy, Check, QrCode, CreditCard, Calendar, Clock, MapPin, User, FileText, ChevronRight, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: OrderRecord) => void;
  onViewInvoice: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
  onViewInvoice,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  // Free shipping for orders in Jakarta radius, or flat standard 0 promo
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const hasFlowerBoard = items.some((item) => item.product.isFlowerBoard || item.product.category === 'papan-bunga');

  // Customer State
  const [customer, setCustomer] = useState<CustomerData>({
    senderFullName: '',
    senderPhone: '',
    senderEmail: '',
    recipientFullName: '',
    recipientPhone: '',
    deliveryAddress: '',
    deliveryArea: 'Jakarta Selatan',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default tomorrow
    deliveryTimeSlot: 'Siang (12:00 - 16:00)',
    specialInstructions: '',
  });

  // Greeting State
  const [greeting, setGreeting] = useState<GreetingData>({
    recipientName: '',
    senderName: '',
    message: 'Semoga suka dengan bingkisan ini. Salam hangat dan doa terbaik!',
    boardMainText: hasFlowerBoard ? 'SELAMAT & SUKSES ATAS GRAND OPENING' : '',
    boardSenderText: hasFlowerBoard ? 'DARI REKAN KERJA' : '',
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Active Checkout Step (1: Data Pengiriman, 2: Kartu Ucapan, 3: Pembayaran & WhatsApp)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);

  // Handle template selection
  const handleSelectTemplate = (template: typeof GREETING_TEMPLATES[0]) => {
    setGreeting((prev) => ({
      ...prev,
      message: template.text,
      boardMainText: template.boardHeader || prev.boardMainText,
      boardSenderText: template.boardSender || prev.boardSenderText,
    }));
  };

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'message') {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } else {
      setCopiedAccount(type);
      setTimeout(() => setCopiedAccount(null), 2000);
    }
  };

  const createOrderObject = (): OrderRecord => {
    const orderId = generateOrderId();
    const orderRecord: OrderRecord = {
      orderId,
      orderDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      items,
      customer,
      greeting,
      paymentMethod,
      subtotal,
      shippingFee,
      total,
      status: 'Menunggu Pembayaran',
    };
    return orderRecord;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const order = createOrderObject();
    setCreatedOrder(order);
    setActiveStep(3);
  };

  const handleSendToWhatsApp = () => {
    const order = createdOrder || createOrderObject();
    const message = formatWhatsAppOrderMessage(order);
    const url = getWhatsAppDirectUrl(STORE_PHONE, message);
    onOrderCompleted(order);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C29D62]">
                Pemesanan Online
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500">Langkah {activeStep} dari 3</span>
            </div>
            <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 mt-0.5">
              {activeStep === 1 && 'Data Penerima & Jadwal Pengiriman'}
              {activeStep === 2 && 'Kartu Ucapan & Pesan Khusus'}
              {activeStep === 3 && 'Pembayaran & Kirim ke WhatsApp'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Indicators */}
        <div className="grid grid-cols-3 border-b border-stone-200 text-xs text-center font-medium">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`py-2.5 transition-colors ${
              activeStep === 1
                ? 'bg-[#17382D] text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            1. Pengiriman
          </button>
          <button
            type="button"
            onClick={() => {
              if (customer.senderFullName && customer.recipientFullName) {
                setActiveStep(2);
              }
            }}
            className={`py-2.5 transition-colors ${
              activeStep === 2
                ? 'bg-[#17382D] text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            2. Kartu Ucapan
          </button>
          <button
            type="button"
            onClick={() => {
              if (customer.senderFullName && customer.recipientFullName) {
                if (!createdOrder) setCreatedOrder(createOrderObject());
                setActiveStep(3);
              }
            }}
            className={`py-2.5 transition-colors ${
              activeStep === 3
                ? 'bg-[#17382D] text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            3. Pembayaran WA
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* STEP 1: DELIVERY & RECIPIENT FORM */}
          {activeStep === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setActiveStep(2); }} className="space-y-4">
              <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200/80 mb-2">
                <span className="text-xs font-semibold text-[#17382D] block mb-1">
                  Ringkasan Pesanan ({items.length} Macam Item)
                </span>
                <div className="text-xs text-stone-600 space-y-1">
                  {items.map((it) => (
                    <div key={it.id} className="flex justify-between">
                      <span className="truncate max-w-[280px]">
                        {it.product.code && (
                          <span className="font-mono font-bold text-[10px] text-[#17382D] bg-stone-200/80 px-1 py-0.5 rounded mr-1">
                            {it.product.code}
                          </span>
                        )}
                        {it.quantity}x {it.product.name} {it.selectedColorTheme ? `(${it.selectedColorTheme})` : ''}
                      </span>
                      <span className="font-semibold tabular-nums">
                        {formatRupiah(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900">
                    <span>Total Subtotal:</span>
                    <span className="tabular-nums text-[#17382D]">{formatRupiah(total)}</span>
                  </div>
                </div>
              </div>

              {/* Data Pemesan / Pengirim */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 mb-2.5">
                  <User className="w-3.5 h-3.5 text-[#C29D62]" />
                  <span>Data Anda (Pemesan):</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Nama Lengkap Pemesan *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Hendra Kusuma"
                      value={customer.senderFullName}
                      onChange={(e) => setCustomer({ ...customer, senderFullName: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#17382D] focus:border-[#17382D]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Nomor WhatsApp Anda *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 0812xxxxxxxx"
                      value={customer.senderPhone}
                      onChange={(e) => setCustomer({ ...customer, senderPhone: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#17382D] focus:border-[#17382D]"
                    />
                  </div>
                </div>
              </div>

              {/* Data Penerima & Alamat */}
              <div className="pt-3 border-t border-stone-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 mb-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C29D62]" />
                  <span>Tujuan & Penerima Paket:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Nama Penerima *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ibu Rina Hartono / Bpk. William"
                      value={customer.recipientFullName}
                      onChange={(e) => setCustomer({ ...customer, recipientFullName: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#17382D] focus:border-[#17382D]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Nomor Telepon / WA Penerima *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 0813xxxxxxxx"
                      value={customer.recipientPhone}
                      onChange={(e) => setCustomer({ ...customer, recipientPhone: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#17382D] focus:border-[#17382D]"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Area / Kota Pengiriman *
                  </label>
                  <select
                    value={customer.deliveryArea}
                    onChange={(e) => setCustomer({ ...customer, deliveryArea: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#17382D]"
                  >
                    <option value="Jakarta Selatan">Jakarta Selatan (Armada Toko Express)</option>
                    <option value="Jakarta Pusat">Jakarta Pusat (Armada Toko Express)</option>
                    <option value="Jakarta Barat">Jakarta Barat (Armada Toko Express)</option>
                    <option value="Jakarta Utara">Jakarta Utara (Armada Toko Express)</option>
                    <option value="Jakarta Timur">Jakarta Timur (Armada Toko Express)</option>
                    <option value="Tangerang & Tangsel (BSD/Alam Sutera)">Tangerang & Tangsel (BSD/Alam Sutera/Bintaro)</option>
                    <option value="Bekasi Kota & Sekitarnya">Bekasi Kota & Sekitarnya</option>
                    <option value="Depok">Depok</option>
                    <option value="Bogor">Bogor</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Alamat Lengkap Tujuan (Nama Jalan, No Rumah/Gedung/Ruangan, Patokan) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Contoh: Gedung Tamara Center Lt. 12, Jl. Jend Sudirman No. 24, Karet Semanggi, Jakarta Selatan (Titip di Lobby Resepsionis)"
                    value={customer.deliveryAddress}
                    onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#17382D]"
                  />
                </div>

                {/* Jadwal & Waktu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      <span>Tanggal Pengiriman *</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={customer.deliveryDate}
                      onChange={(e) => setCustomer({ ...customer, deliveryDate: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-500" />
                      <span>Slot Jam Pengantaran *</span>
                    </label>
                    <select
                      value={customer.deliveryTimeSlot}
                      onChange={(e) => setCustomer({ ...customer, deliveryTimeSlot: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white"
                    >
                      <option value="Pagi (08:30 - 12:00)">Pagi (08:30 - 12:00)</option>
                      <option value="Siang (12:00 - 16:00)">Siang (12:00 - 16:00)</option>
                      <option value="Sore / Malam (16:00 - 20:00)">Sore / Malam (16:00 - 20:00)</option>
                      <option value="Sesuai Jadwal Acara / Resepsi">Sesuai Jadwal Acara / Resepsi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#17382D] hover:bg-[#102720] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all shadow-sm"
                >
                  <span>Lanjut: Kartu Ucapan & Pesan</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: GREETING & FLOWER BOARD DETAILS */}
          {activeStep === 2 && (
            <div className="space-y-5">
              {/* Quick Template Selector */}
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C29D62]" />
                  <span>Pilih Template Ucapan Cepat (Otomatis Isi):</span>
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-stone-50 rounded-lg border border-stone-200">
                  {GREETING_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectTemplate(tmpl)}
                      className="text-[11px] px-2.5 py-1 bg-white hover:bg-stone-200 rounded border border-stone-200 text-stone-700 transition-colors text-left"
                    >
                      {tmpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* KHUSUS PAPAN BUNGA UCAPAN */}
              {hasFlowerBoard && (
                <div className="bg-[#FAF8F5] p-4 rounded-xl border-2 border-[#17382D]/20 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#17382D]">
                      Format Tulisan Papan Bunga (Styrofoam Timbul)
                    </h4>
                  </div>
                  <p className="text-xs text-stone-500">
                    Tulisan ini akan dibuat besar dan tegas di atas beludru papan bunga oleh perajin kaligrafi kami.
                  </p>

                  <div>
                    <label className="text-xs font-semibold text-stone-800 block mb-1">
                      1. Ucapan Utama di Papan Bunga *
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: SELAMAT & SUKSES ATAS GRAND OPENING CAFE HARMONI"
                      value={greeting.boardMainText || ''}
                      onChange={(e) => setGreeting({ ...greeting, boardMainText: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 font-semibold text-stone-900 bg-white focus:ring-1 focus:ring-[#17382D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-800 block mb-1">
                      2. Nama Pengirim di Papan Bunga (From) *
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: DARI: DIREKSI & KARYAWAN PT MAJU BERSAMA"
                      value={greeting.boardSenderText || ''}
                      onChange={(e) => setGreeting({ ...greeting, boardSenderText: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 font-semibold text-stone-900 bg-white focus:ring-1 focus:ring-[#17382D]"
                    />
                  </div>
                </div>
              )}

              {/* KARTU UCAPAN HARDCOVER / GIFT CARD */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Kartu Ucapan Hardcover (Gratis untuk Setiap Parcel & Bunga)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Kepada / To:
                    </label>
                    <input
                      type="text"
                      placeholder={customer.recipientFullName || 'Nama Penerima'}
                      value={greeting.recipientName}
                      onChange={(e) => setGreeting({ ...greeting, recipientName: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Dari / From:
                    </label>
                    <input
                      type="text"
                      placeholder={customer.senderFullName || 'Nama Anda / Perusahaan'}
                      value={greeting.senderName}
                      onChange={(e) => setGreeting({ ...greeting, senderName: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">
                    Isi Pesan Ucapan:
                  </label>
                  <textarea
                    rows={4}
                    value={greeting.message}
                    onChange={(e) => setGreeting({ ...greeting, message: e.target.value })}
                    className="w-full text-xs p-3 rounded-lg border border-stone-300 leading-relaxed font-sans"
                    placeholder="Tuliskan ucapan hangat Anda di sini..."
                  />
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900"
                >
                  Kembali ke Data Pengiriman
                </button>
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="px-6 py-3 bg-[#17382D] hover:bg-[#102720] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all shadow-sm"
                >
                  <span>Lanjut: Pembayaran & WhatsApp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: INTEGRASI PEMBAYARAN OTOMATIS & DIRECT WHATSAPP */}
          {activeStep === 3 && createdOrder && (
            <div className="space-y-6">
              {/* Order Reference Card */}
              <div className="bg-[#17382D] text-white p-4 sm:p-5 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#C29D62] font-semibold">
                    Pesanan Telah Dibuat
                  </span>
                  <div className="text-lg sm:text-xl font-bold font-mono tracking-tight mt-0.5">
                    {createdOrder.orderId}
                  </div>
                  <p className="text-xs text-emerald-100/80 mt-1">
                    Jadwal Kirim: {createdOrder.customer.deliveryDate} ({createdOrder.customer.deliveryTimeSlot})
                  </p>
                </div>

                <div className="text-right sm:border-l sm:border-emerald-800/80 sm:pl-5">
                  <span className="text-xs text-emerald-200 block">Total Tagihan:</span>
                  <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {formatRupiah(createdOrder.total)}
                  </span>
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#C29D62]" />
                  <span>Pilih Metode Pembayaran Otomatis:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* QRIS Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('qris');
                      setCreatedOrder({ ...createdOrder, paymentMethod: 'qris' });
                    }}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      paymentMethod === 'qris'
                        ? 'border-[#17382D] bg-[#F4F8F6] ring-1 ring-[#17382D]'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#17382D] text-white flex items-center justify-center shrink-0">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-stone-900">QRIS Standar Indonesia</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        BCA, Mandiri, GoPay, OVO, ShopeePay, DANA
                      </div>
                    </div>
                  </button>

                  {/* BCA Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('bca');
                      setCreatedOrder({ ...createdOrder, paymentMethod: 'bca' });
                    }}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      paymentMethod === 'bca'
                        ? 'border-[#17382D] bg-[#F4F8F6] ring-1 ring-[#17382D]'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#005EAA] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      BCA
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-stone-900">Bank Central Asia (BCA)</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Transfer manual antar bank / m-Banking
                      </div>
                    </div>
                  </button>
                </div>

                {/* QRIS Interactive Box */}
                {paymentMethod === 'qris' && (
                  <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center gap-6">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-stone-200 text-center shrink-0">
                      {/* SVG QR Code Simulation */}
                      <div className="w-36 h-36 bg-stone-900 p-2 rounded flex flex-col items-center justify-between text-white">
                        <div className="w-full flex justify-between">
                          <div className="w-10 h-10 border-4 border-white bg-black"></div>
                          <div className="w-10 h-10 border-4 border-white bg-black"></div>
                        </div>
                        <div className="text-[9px] tracking-widest font-mono font-bold uppercase text-[#C29D62]">
                          AMARA QRIS
                        </div>
                        <div className="w-full flex justify-between items-end">
                          <div className="w-10 h-10 border-4 border-white bg-black"></div>
                          <div className="w-8 h-8 grid grid-cols-2 gap-1 p-0.5">
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1 block font-mono">
                        NMID: ID102030495810
                      </span>
                    </div>

                    <div className="text-xs text-stone-600 space-y-1.5 flex-1">
                      <div className="font-bold text-stone-900 text-sm">
                        Instruksi Scan QRIS:
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-stone-600">
                        <li>Buka aplikasi m-Banking (BCA/Mandiri/BRI) atau e-Wallet favorit Anda.</li>
                        <li>Pilih menu <strong>Scan QR / QRIS</strong>.</li>
                        <li>Arahkan kamera ke kode di samping atau screenshot untuk upload.</li>
                        <li>Pastikan nama merchant: <strong>AMARA BOTANICA FLORIST</strong>.</li>
                        <li>Masukkan nominal persis: <strong>{formatRupiah(createdOrder.total)}</strong>.</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Box */}
                {paymentMethod === 'bca' && (
                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-stone-500">Rekening Bank Central Asia (BCA):</span>
                        <div className="text-base sm:text-lg font-mono font-bold text-stone-900 tracking-wider">
                          5420-9988-11
                        </div>
                        <span className="text-xs font-medium text-stone-700">a.n Amara Botanica Indonesia</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyText('5420998811', 'bca')}
                        className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-xs font-medium rounded-lg flex items-center gap-1.5 text-stone-700"
                      >
                        {copiedAccount === 'bca' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin No. Rek</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* DIRECT WHATSAPP CHECKOUT SECTION (MANDATORY USER REQUEST) */}
              <div className="bg-[#EBF7EE] p-5 rounded-2xl border-2 border-[#25D366] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0E5C27]">
                        Kirim Otomatis ke WhatsApp Toko
                      </h4>
                      <p className="text-xs text-[#1E733B]">
                        Format pemesanan lengkap telah dibuat otomatis untuk dikonfirmasi ke admin.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="flex-1 py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesanan ke WhatsApp Sekarang</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyText(formatWhatsAppOrderMessage(createdOrder), 'message')}
                    className="py-3 px-3.5 bg-white hover:bg-stone-50 border border-[#25D366]/40 text-[#0E5C27] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Teks Order</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Digital Invoice Trigger */}
                <div className="pt-2 border-t border-[#D0EBD6] flex items-center justify-between text-xs">
                  <span className="text-[#1E733B]">Butuh bukti pemesanan kantor / PDF?</span>
                  <button
                    type="button"
                    onClick={() => onViewInvoice(createdOrder)}
                    className="font-semibold text-[#0E5C27] hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Lihat Invoice Digital Resmi</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
