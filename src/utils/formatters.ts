import { OrderRecord } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `AMR-${dateStr}-${randomSuffix}`;
}

export function formatWhatsAppOrderMessage(order: OrderRecord): string {
  const itemsText = order.items
    .map((item, index) => {
      const codePrefix = item.product.code ? `[${item.product.code}] ` : '';
      const theme = item.selectedColorTheme ? ` (${item.selectedColorTheme})` : '';
      return `${index + 1}. *${codePrefix}${item.product.name}*${theme}\n   • Qty: ${item.quantity} pcs × ${formatRupiah(item.product.price)}\n   • Subtotal: ${formatRupiah(item.quantity * item.product.price)}`;
    })
    .join('\n\n');

  let boardSection = '';
  if (order.greeting.boardMainText || order.greeting.boardSenderText) {
    boardSection = `\n\n💐 *TULISAN PAPAN BUNGA:*
• *Ucapan Utama:* ${order.greeting.boardMainText || '-'}
• *Nama Pengirim di Papan:* ${order.greeting.boardSenderText || '-'}`;
  }

  let greetingSection = '';
  if (order.greeting.message) {
    greetingSection = `\n\n💌 *KARTU UCAPAN:*
• *Kepada (To):* ${order.greeting.recipientName || order.customer.recipientFullName}
• *Pesan Ucapan:* "${order.greeting.message}"
• *Dari (From):* ${order.greeting.senderName || order.customer.senderFullName}`;
  }

  let paymentMethodLabel = 'QRIS Dinamis Otomatis (Gopay/OVO/BCA/Mandiri/ShopeePay)';
  if (order.paymentMethod === 'bca') paymentMethodLabel = 'Transfer Bank BCA (No. Rek 5420-9988-11 a.n Amara Botanica)';
  if (order.paymentMethod === 'mandiri') paymentMethodLabel = 'Transfer Bank Mandiri (No. Rek 137-00-99881122 a.n Amara Botanica)';
  if (order.paymentMethod === 'bri') paymentMethodLabel = 'Transfer Bank BRI (No. Rek 0341-01-002233-509 a.n Amara Botanica)';

  const message = `✨ *PESANAN BARU - AMARA FLORIST & HAMPERS* ✨
━━━━━━━━━━━━━━━━━━━━━
📋 *NO. PESANAN:* \`${order.orderId}\`
📅 *Tgl Order:* ${order.orderDate}

🛍️ *RINCIAN PRODUK:*
${itemsText}

🚚 *DETAIL PENGIRIMAN:*
• *Penerima:* ${order.customer.recipientFullName} (${order.customer.recipientPhone})
• *Alamat Kirim:* ${order.customer.deliveryAddress}
• *Area/Kota:* ${order.customer.deliveryArea}
• *Jadwal Kirim:* ${order.customer.deliveryDate}
• *Waktu Pengantaran:* ${order.customer.deliveryTimeSlot}
${order.customer.specialInstructions ? `• *Catatan Tambahan:* ${order.customer.specialInstructions}\n` : ''}${boardSection}${greetingSection}

💳 *TOTAL PEMBAYARAN:*
• Subtotal: ${formatRupiah(order.subtotal)}
• Ongkir: ${order.shippingFee === 0 ? 'GRATIS (Radius Promo Jakarta)' : formatRupiah(order.shippingFee)}
• *TOTAL DIBAYAR:* *${formatRupiah(order.total)}*
• *Metode:* ${paymentMethodLabel}

👤 *DATA PEMESAN:*
• *Nama:* ${order.customer.senderFullName}
• *No. WhatsApp:* ${order.customer.senderPhone}
• *Email:* ${order.customer.senderEmail || '-'}
━━━━━━━━━━━━━━━━━━━━━
Halo Admin Amara Florist, saya telah membuat pesanan melalui website dengan No. Order di atas. Mohon bantu konfirmasi ketersediaan dan proses pesanan saya. Terima kasih! 🙏🌸`;

  return message;
}

export function getWhatsAppDirectUrl(phone: string, text: string): string {
  // Clean phone number: remove +, -, spaces
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
