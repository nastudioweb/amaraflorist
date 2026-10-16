export type ProductCategory = 
  | 'all'
  | 'parcel-lebaran'
  | 'parcel-imlek'
  | 'parcel-natal'
  | 'papan-bunga'
  | 'buket-bunga'
  | 'standing-flower'
  | 'parcel-buah';

export interface Product {
  id: string;
  code?: string; // Kode produk: e.g. LB-01, IM-02, NT-03
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  tag?: string;
  shortDesc: string;
  fullDesc: string;
  contents: string[];
  dimensions: string;
  freshnessGuarantee: string;
  colorThemes?: string[];
  isFlowerBoard?: boolean;
  leadTime: string;
}

export interface CartItem {
  id: string; // unique item id (product.id + colorTheme)
  product: Product;
  quantity: number;
  selectedColorTheme?: string;
}

export interface GreetingData {
  recipientName: string;
  senderName: string;
  message: string;
  boardMainText?: string;   // Khusus Papan Bunga: "Selamat & Sukses", "Turut Berduka Cita", dsb.
  boardSenderText?: string; // Khusus Papan Bunga: "Dari: Direksi & Karyawan PT XYZ"
}

export interface CustomerData {
  senderFullName: string;
  senderPhone: string;
  senderEmail: string;
  recipientFullName: string;
  recipientPhone: string;
  deliveryAddress: string;
  deliveryArea: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  specialInstructions?: string;
}

export type PaymentMethod = 'qris' | 'bca' | 'mandiri' | 'bri';

export interface OrderRecord {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  customer: CustomerData;
  greeting: GreetingData;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Menunggu Pembayaran' | 'Diproses' | 'Siap Dikirim';
}
