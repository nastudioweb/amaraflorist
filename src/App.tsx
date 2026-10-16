import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, CartItem, OrderRecord } from './types';
import { PRODUCTS, CATEGORY_FILTERS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryHighlights } from './components/CategoryHighlights';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InvoiceModal } from './components/InvoiceModal';
import { FlowerBoardSpecialGuide } from './components/FlowerBoardSpecialGuide';
import { TrustFeatures } from './components/TrustFeatures';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { ProductImageCustomizerModal } from './components/ProductImageCustomizerModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { Search, SlidersHorizontal, Check, Sparkles, Filter, Upload, Camera } from 'lucide-react';

export default function App() {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeInvoice, setActiveInvoice] = useState<OrderRecord | null>(null);
  const [isImageCustomizerOpen, setIsImageCustomizerOpen] = useState(false);

  // Custom User Images (persisted to localStorage)
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('amara_custom_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleSaveCustomImage = (productId: string, imageUrl: string) => {
    setCustomImages((prev) => {
      const updated = { ...prev, [productId]: imageUrl };
      try {
        localStorage.setItem('amara_custom_images', JSON.stringify(updated));
      } catch (e) {
        console.error('Storage full or error', e);
      }
      return updated;
    });
    showToast('Foto produk berhasil disimpan!');
  };

  const handleResetCustomImage = (productId: string) => {
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      try {
        localStorage.setItem('amara_custom_images', JSON.stringify(updated));
      } catch (e) {
        console.error('Storage error', e);
      }
      return updated;
    });
    showToast('Foto produk dikembalikan ke bawaan.');
  };

  // Products with user custom images applied
  const productsWithCustomImages = useMemo(() => {
    return PRODUCTS.map((p) => ({
      ...p,
      image: customImages[p.id] || p.image,
    }));
  }, [customImages]);

  // Catalog Filter & Search States
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'name'>('popular');

  // Micro toast for item added
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastNotification(message);
    setTimeout(() => {
      setToastNotification(null);
    }, 2400);
  };

  // Cart Operations
  const handleAddToCart = (
    product: Product,
    selectedColorTheme?: string,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${selectedColorTheme || 'default'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: itemId, product, quantity, selectedColorTheme }];
    });
    showToast(`${quantity}x ${product.name} dimasukkan ke keranjang`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Cart Totals
  const totalItems = useMemo(
    () => cart.reduce((acc, it) => acc + it.quantity, 0),
    [cart]
  );
  const subtotal = useMemo(
    () => cart.reduce((acc, it) => acc + it.product.price * it.quantity, 0),
    [cart]
  );

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...productsWithCustomImages];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.code && p.code.toLowerCase().includes(q)) ||
          p.name.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.contents.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // 'popular'
      result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    }

    return result;
  }, [productsWithCustomImages, selectedCategory, searchQuery, sortBy]);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (order: OrderRecord) => {
    // Optionally keep cart or clear after sending to WhatsApp
    // Keep order in invoice preview
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('katalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelectAndScroll = (category: ProductCategory) => {
    setSelectedCategory(category);
    scrollToCatalog();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed top-20 right-4 z-50 bg-[#17382D] text-white text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-emerald-800 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-[#C29D62]" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        totalItems={totalItems}
        subtotal={subtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={handleCategorySelectAndScroll}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onExploreClick={scrollToCatalog} />

        {/* Reassurance Trust Strip */}
        <TrustFeatures />

        {/* Special Category Highlights (Lebaran, Imlek, Natal, Papan Bunga) */}
        <CategoryHighlights onSelectCategory={handleCategorySelectAndScroll} />

        {/* Product Catalog Section */}
        <section id="katalog" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C29D62]">
                Katalog Lengkap
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17382D] mt-1">
                Koleksi Parcel & Bunga Amara
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Menampilkan {filteredProducts.length} pilihan bingkisan dan rangkaian bunga segar
              </p>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Upload Foto Sendiri Button */}
              <button
                type="button"
                onClick={() => setIsImageCustomizerOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#FAF8F5] active:scale-[0.98] text-[#17382D] text-xs font-semibold rounded-lg border border-stone-300 transition-colors shrink-0 shadow-xs"
                title="Ganti foto produk dengan file dari komputer/spreadsheet Anda"
              >
                <Upload className="w-3.5 h-3.5 text-[#C29D62]" />
                <span>Upload Foto Sendiri</span>
              </button>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kode (LB, IM, NT) atau nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-60 pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#17382D]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-transparent text-stone-700 focus:outline-none text-xs cursor-pointer"
                >
                  <option value="popular">Terpopuler</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                  <option value="name">Nama A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Buttons / Segmented Controls */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#17382D] text-white shadow-sm font-semibold'
                      : 'bg-white border border-stone-200/90 text-stone-700 hover:border-stone-400 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-stone-200">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-800">
                Tidak ada produk yang cocok
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                Coba gunakan kata kunci lain atau pilih kategori "Semua Produk".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-[#17382D] text-white text-xs font-semibold rounded-lg hover:bg-[#102720]"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, p.colorThemes?.[0], 1)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Special Papan Bunga Guide & Quality Standards */}
        <FlowerBoardSpecialGuide onSelectCategory={handleCategorySelectAndScroll} />

        {/* Testimonials Carousel Section (Social Proof) */}
        <TestimonialsCarousel />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleCategorySelectAndScroll} />

      {/* Mobile Sticky Bottom Nav (under 15% viewport height cap) */}
      <MobileBottomNav
        totalItems={totalItems}
        subtotal={subtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={
          selectedProduct
            ? { ...selectedProduct, image: customImages[selectedProduct.id] || selectedProduct.image }
            : null
        }
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onSaveCustomImage={handleSaveCustomImage}
      />

      <ProductImageCustomizerModal
        isOpen={isImageCustomizerOpen}
        onClose={() => setIsImageCustomizerOpen(false)}
        products={PRODUCTS}
        customImages={customImages}
        onSaveCustomImage={handleSaveCustomImage}
        onResetCustomImage={handleResetCustomImage}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderCompleted={handleOrderCompleted}
        onViewInvoice={(order) => {
          setIsCheckoutOpen(false);
          setActiveInvoice(order);
        }}
      />

      <InvoiceModal
        order={activeInvoice}
        onClose={() => setActiveInvoice(null)}
      />
    </div>
  );
}
