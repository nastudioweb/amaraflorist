# Amara Florist & Hampers (Repository: amaraflorist)

Website e-commerce premium untuk pemesanan hampers Hari Raya (**Parcel Lebaran**, **Parcel Imlek**, **Parcel Natal & Tahun Baru**) serta **Florist & Karangan Papan Bunga** dengan integrasi checkout otomatis via WhatsApp dan penerbitan invoice digital resmi.

---

## ✨ Fitur Utama

1. **Katalog Produk Terstruktur & Foto HD Rasio 1:1 (Persegi)**:
   - **Parcel Lebaran / Idul Fitri (Kode LB-01 s/d LB-08)**: Pilihan hampers besek bambu natural, cookies set nastar/kastengel, trio toples kaca eksklusif, hingga VVIP Royal hamper.
   - **Parcel Imlek / Chinese New Year (Kode IM-01 s/d IM-07)**: Nian gao (kue keranjang), teh premium, jeruk mandarin lokam, red festive chest, dan hiasan plum blossom.
   - **Parcel Natal & Tahun Baru (Kode NT-01 s/d NT-06)**: Sparkling cider picnic basket, gingerbread cookies, scented candles, winter festive hampers.
   - **Florist & Papan Bunga (Kode PB-01 s/d PB-04, BK-01, SF-01, FB-01)**: Karangan bunga ucapan pernikahan, duka cita, pembukaan toko (grand opening), buket mawar segar, dan parcel buah sehat.
2. **Foto Produk Permanen & Aman**:
   - Seluruh foto produk disimpan langsung dalam repositori (`src/assets/images/` dan `public/images/`), sehingga **tidak bergantung pada link eksternal** yang rentan rusak atau kadaluarsa.
3. **Format Rasio Foto 1:1 Presisi**:
   - Tampilan foto di kartu katalog, modal rincian produk, dan sorotan kategori menggunakan rasio persegi (1:1) modern dan rapi.
4. **Checkout Cepat via WhatsApp Terstruktur**:
   - Format pesan otomatis rapi menyertakan kode produk (e.g. `[LB-01]`), tema warna, rincian ucapan, serta alamat penerima.
5. **Invoice & Pembayaran Digital (QRIS / Bank Transfer)**:
   - Dukungan cetak invoice dan simulasi kode bayar instan.
6. **Kustomisasi Foto Produk**:
   - Pengguna/admin dapat mengganti foto langsung dari perangkat (HP/Laptop) secara interaktif dengan preview real-time.

---

## 📁 Struktur Repositori

```text
amaraflorist/
├── public/
│   └── images/                # Backup aset gambar statis (16 foto HD)
├── src/
│   ├── assets/
│   │   └── images/            # Sumber utama aset foto produk & banner (16 foto HD)
│   ├── components/            # Komponen UI React (ProductCard, Navbar, CartDrawer, dsb.)
│   ├── data/
│   │   └── products.ts        # Data katalog lengkap produk, harga, deskripsi & kode
│   ├── utils/
│   │   └── formatters.ts      # Pemformat mata uang Rupiah & template WhatsApp
│   ├── types.ts               # Interface TypeScript
│   ├── App.tsx                # Komponen utama aplikasi
│   ├── main.tsx               # Entry point React
│   └── index.css              # Styling Tailwind CSS
├── .env.example               # Template environment variables
├── .gitignore                 # Konfigurasi file yang diabaikan Git
├── index.html                 # HTML entry point & meta tags
├── package.json               # Konfigurasi paket & dependensi
├── tsconfig.json              # Konfigurasi TypeScript
├── vite.config.ts             # Konfigurasi Vite
└── README.md                  # Dokumentasi proyek
```

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm, pnpm, atau yarn

### 1. Clone Repositori
```bash
git clone https://github.com/<USERNAME-ANDA>/amaraflorist.git
cd amaraflorist
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di alamat `http://localhost:3000`.

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build yang optimal dan siap di-deploy ke Vercel, Netlify, atau Cloudflare Pages akan tersimpan di folder `dist/`.

---

## 📤 Cara Upload ke GitHub (Repository: `amaraflorist`)

Jika Anda ingin mengunggah proyek ini ke akun GitHub Anda:

1. **Buat Repositori Baru di GitHub**:
   - Buka [github.com/new](https://github.com/new)
   - Isi **Repository name**: `amaraflorist`
   - Pilih **Public** atau **Private**
   - *Jangan* centang "Add a README file" (karena sudah ada di sini).
   - Klik **Create repository**.

2. **Jalankan Perintah Git di Terminal Proyek Ini**:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi amaraflorist katalog hampers leberan, imlek, natal & florist lengkap"
   git branch -M main
   git remote add origin https://github.com/<USERNAME-ANDA>/amaraflorist.git
   git push -u origin main
   ```

*(Ganti `<USERNAME-ANDA>` dengan username GitHub Anda).*

---

## 🔒 Jaminan Keamanan Aset Gambar
- Semua gambar (16 file foto asli) telah di-bundle ke dalam folder `src/assets/images/` dan `public/images/`.
- File `.gitignore` dikonfigurasi secara eksplisit untuk **TIDAK MENGABAIKAN** gambar di kedua folder tersebut.
- Dengan demikian, ketika di-push ke GitHub dan di-clone di komputer lain atau di-deploy ke hosting, seluruh foto dipastikan tetap utuh 100%.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion
