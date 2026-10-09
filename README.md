# E-Commerce MusicDisc Store (Vinyl & CD)

Aplikasi Web E-Commerce modern untuk toko musik fisik (Piringan Hitam / Vinyl dan Audio CD), dibangun menggunakan **React 19**, **Vite**, **Tailwind CSS**, dan **React Router**.

---

## 5. Hal-Hal yang Dikerjakan dan Dipelajari

### 5.1 Setup Environment
- Inisialisasi proyek berbasis React 19 menggunakan build tool modern **Vite**.
- Konfigurasi styling modern menggunakan **Tailwind CSS v4** dengan integrasi `@tailwindcss/vite`.
- Konfigurasi Single Page Application (SPA) routing menggunakan **React Router v7** (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `useParams`, `useLocation`, `useNavigate`).
- Pengaturan ESLint untuk menjaga kualitas dan konsistensi kode JavaScript/React.

### 5.2 React Component
- Membangun antarmuka modular dengan memecah UI menjadi komponen-komponen terpisah:
  - **Komponen Presentational**: `Navbar`, `Sidebar`, `ProductCard`, `CartToast`.
  - **Layout Templates**: `MainLayout` (User Store) dan `AdminLayout` (Dashboard Admin).
  - **Halaman (Pages)**: `Dashboard` (Katalog), `ProductDetail`, `Cart`, `Checkout`, `AdminDashboard`, `AboutPage`.

### 5.3 Passing Props
- Mengirimkan data dan fungsi antar komponen induk (*parent*) dan anak (*child*):
  - Pengiriman objek produk `p` ke komponen `ProductCard` (`<ProductCard key={product.id} p={product} />`).
  - Pengiriman state dan fungsi kontrol sidebar pada `AdminLayout` ke `Sidebar` (`sidebarOpen`, `setSidebarOpen`).
  - Pengoperan state melalui React Router `Link` (`state={p}`) dan URL parameter (`useParams`).

### 5.4 Conditional Rendering
- Menampilkan elemen UI berdasarkan kondisi tertentu:
  - Menampilkan badge jumlah keranjang hanya ketika item > 0 (`totalQty > 0 && <span ...>`).
  - Tampilan floating notification `CartToast` (`if (!toast.show || !toast.product) return null;`).
  - Tampilan halaman keranjang kosong vs daftar item keranjang di `cart.jsx`.
  - Halaman checkout sukses vs form pengisian data di `checkout.jsx`.
  - Pesan peringatan "Tidak ada disk musik yang cocok" ketika hasil pencarian/filter kosong di katalog.
  - Tampilan tombol toggle tema (☀️ Light / 🌙 Dark) di Navbar.

### 5.5 useState
- Pengelolaan state lokal di berbagai komponen:
  - Form input pencarian dan kategori filter di `CategoryContext` & `MainLayout`.
  - State kuantitas keranjang dan data pemesanan di `cart.jsx` dan `checkout.jsx`.
  - State rating bintang, hover review, dan pesan feedback di `productdetail.jsx`.
  - State modal form (Create & Update) serta filter tabel admin di `admindashboard.jsx`.
  - State buka/tutup sidebar mobile di `AdminLayout.jsx`.

### 5.6 useContext
- Menghindari *prop drilling* dengan mendistribusikan data global secara langsung ke komponen yang membutuhkan:
  - Mengambil data keranjang di `Navbar`, `ProductCard`, `CartToast`, `cart`, dan `checkout`.
  - Mengambil tema aktif di `Navbar` dan `ThemeProvider`.
  - Mengambil data produk di `Dashboard`, `ProductDetail`, dan `AdminDashboard`.

### 5.7 Context Provider & Custom Hooks
- Membungkus seluruh aplikasi dengan Provider terstruktur di `src/main.jsx` via `AppProviders`:
  - `ProductProvider` (`src/utils/productcontext.jsx`)
  - `CartProvider` (`src/utils/cartcontext.jsx`)
  - `CategoryProvider` (`src/utils/categorycontext.jsx`)
  - `ThemeProvider` (`src/utils/themecontext.jsx`)
- Pembuatan Custom Hooks yang aman (*type-safe guard*):
  - `useProduct()`: Mengakses daftar produk dan aksi CRUD (`addProduct`, `updateProduct`, `deleteProduct`, `getProductById`, `resetProducts`).
  - `useCart()`: Mengakses item keranjang, kuantitas, total harga, notifikasi toast, dan aksi keranjang (`addToCart`, `updateQty`, `removeFromCart`, `clearCart`).
  - `useCategory()`: Mengakses filter format aktif, kata kunci pencarian, daftar format, dan fungsi `filterProducts`.
  - `useTheme()`: Mengakses tema aktif dan fungsi `toggleTheme`.

### 5.8 LocalStorage & Data Persistence
- Menyimpan data ke penyimpanan lokal browser agar tidak hilang saat halaman di-refresh:
  - **Persistensi Keranjang Belanja**: Keranjang tetap tersimpan di `localStorage` (`ecommerce_cart`).
  - **Persistensi Data Produk**: Perubahan data katalog / Admin CRUD tersimpan di `localStorage` (`ecommerce_products`).
  - **Persistensi Ulasan Produk**: Ulasan dan rating per album tersimpan di `localStorage` (`reviews_${id}`).
  - **Persistensi Tema Tampilan**: Preferensi Dark/Light mode tersimpan di `localStorage` (`theme`).

---

## 6. Bagian/Fitur Paling Kompleks

### 6.1 Search & Filtering
- **Lokasi Kode**: `src/utils/categorycontext.jsx`, `src/layouts/MainLayout.jsx`, `src/pages/frontpages/dashboard.jsx`
- **Kompleksitas**:
  - Kolom pencarian realtime yang memeriksa multi-properti (nama album, nama artis, genre, format disk, deskripsi).
  - Filter format disk multi-kategori (Semua, Vinyl, Audio CD, Edisi Khusus/Remaster).
  - Tombol pembersih pencarian cepat (*clear button ✕*) dan tombol reset menyeluruh jika tidak ada hasil pencarian.
  - Sinkronisasi otomatis dari header layout ke katalog produk, serta pengalihan halaman (*navigate to catalog*) jika user sedang berada di halaman detail atau keranjang.

### 6.2 Product Detail
- **Lokasi Kode**: `src/pages/frontpages/productdetail.jsx`
- **Kompleksitas**:
  - Pengambilan data produk dinamis berbasis route parameter (`/product/:id`) dengan *fallback* ganda (`location.state` atau `getProductById(id)` dari `ProductContext`).
  - Layout dua kolom responsif: Showcase cover album beresolusi tinggi di sebelah kiri dan spesifikasi lengkap album (artis, format, harga, deskripsi) di sebelah kanan.
  - Tombol aksi "+ Tambah ke Keranjang" yang memicu animasi bounce pada badge keranjang dan popup notifikasi toast.
  - Sistem ulasan interaktif: Pemilihan rating bintang 1–5 dengan efek hover visual, form input ulasan, validasi, dan penyimpanan persisten di `localStorage`.

### 6.3 Product Card + Flexbox
- **Lokasi Kode**: `src/components/ProductCard.jsx`
- **Kompleksitas**:
  - Desain kartu produk grid yang seragam dan rapi menggunakan **Tailwind Flexbox** (`flex flex-col justify-between`).
  - Memastikan cover gambar album memiliki aspect ratio persegi konsisten (`aspect-square object-cover`) tanpa distorsi gambar.
  - Judul album dan metadata tersusun di bagian atas kartu, sementara tautan "Lihat Detail" dan tombol "+ Add to Cart" secara otomatis menempel di bagian bawah (*pinned to bottom*) berkat tata letak flexbox, terlepas dari perbedaan panjang teks judul atau deskripsi album.
  - Efek hover kartu, transisi bayangan (*shadow-lg*), dan animasi tekan tombol (*active:scale-95*).

### 6.4 Admin CRUD
- **Lokasi Kode**: `src/pages/adminpages/admindashboard.jsx`
- **Kompleksitas**:
  - **Create**: Modal dialog interaktif untuk menambahkan disk musik baru lengkap dengan validasi field (nama, artis, format, harga, genre, cover URL, deskripsi).
  - **Read**: Tabel data inventaris dengan thumbnail gambar, format badge, format harga rupiah, dan kolom pencarian realtime internal admin.
  - **Update**: Modal edit yang secara otomatis mengisi form dengan data album yang dipilih dan memperbarui record di `ProductContext`.
  - **Delete**: Konfirmasi penghapusan produk secara aman.
  - **Reset**: Tombol untuk mereset seluruh data kembali ke kondisi default pabrik.
  - **Inventaris Ringkas**: Kartu metrik otomatis yang menghitung total album, total vinyl, total CD, dan akumulasi nilai inventaris dalam rupiah.

### 6.5 Context + LocalStorage Persistence
- **Lokasi Kode**: `src/utils/productcontext.jsx`, `src/utils/cartcontext.jsx`, `src/utils/AppProviders.jsx`
- **Kompleksitas**:
  - Penggunaan *lazy state initialization* pada `useState(() => { ... })` untuk membaca dari `localStorage` saat pertama kali render tanpa *performance overhead*.
  - Sinkronisasi dua arah otomatis menggunakan `useEffect` yang menyimpan setiap perubahan state (`products` dan `cart`) ke `localStorage`.
  - Penanganan kasus edge (seperti *corrupted JSON*, referensi aset gambar Vite yang diimpor, dan pengosongan data pada saat pesanan checkout selesai via `clearCart()`).
  - Arsitektur terpadu `<AppProviders>` yang menggabungkan seluruh context ke dalam satu pipeline bersih di root aplikasi.
