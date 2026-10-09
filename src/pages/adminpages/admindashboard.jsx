import { useState } from "react";
import { useProduct } from "../../utils/productcontext";

export default function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProduct();

  // State untuk pencarian tabel admin
  const [adminSearch, setAdminSearch] = useState("");

  // State untuk form modal (Create / Update)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    format: "Vinyl LP",
    price: "",
    genre: "",
    desc: "",
    img: "",
  });
  const [formError, setFormError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Format options
  const formatOptions = [
    "Vinyl LP",
    "Vinyl LP (180g)",
    "Double Vinyl LP",
    "Audio CD",
    "Audio CD (Limited Edition)",
    "Audio CD (Reissue Remastered)",
    "Vinyl LP (Gatefold)",
    "Vinyl LP (Audiophile Remaster)",
  ];

  // Hitung data ringkasan inventaris
  const totalVinyl = products.filter((p) => (p.format || "").toLowerCase().includes("vinyl")).length;
  const totalCD = products.filter((p) => (p.format || "").toLowerCase().includes("cd")).length;
  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);

  // Filter produk pada tabel admin
  const displayedProducts = products.filter((p) => {
    const q = adminSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      (p.name || "").toLowerCase().includes(q) ||
      (p.artist || "").toLowerCase().includes(q) ||
      (p.format || "").toLowerCase().includes(q) ||
      (p.genre || "").toLowerCase().includes(q)
    );
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Buka modal untuk Tambah Baru
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      artist: "",
      format: "Vinyl LP",
      price: "",
      genre: "",
      desc: "",
      img: "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  // Buka modal untuk Edit
  const handleOpenEditModal = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || "",
      artist: product.artist || "",
      format: product.format || "Vinyl LP",
      price: product.price ? String(product.price) : "",
      genre: product.genre || "",
      desc: product.desc || "",
      img: product.img || "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  // Tutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormError("");
  };

  // Handle Simpan (Create / Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.artist.trim() || !formData.price) {
      setFormError("Nama album, artis, dan harga wajib diisi.");
      return;
    }

    const priceNum = Number(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError("Harga harus berupa angka lebih dari 0.");
      return;
    }

    if (editingId !== null) {
      // 6.4 Update Product
      updateProduct(editingId, {
        name: formData.name.trim(),
        artist: formData.artist.trim(),
        format: formData.format,
        price: priceNum,
        genre: formData.genre.trim() || "Music",
        desc: formData.desc.trim() || "Deskripsi disk musik.",
        img: formData.img.trim() || undefined,
      });
      showToast(`Album "${formData.name}" berhasil diperbarui!`);
    } else {
      // 6.4 Create Product
      addProduct({
        name: formData.name.trim(),
        artist: formData.artist.trim(),
        format: formData.format,
        price: priceNum,
        genre: formData.genre.trim() || "Music",
        desc: formData.desc.trim() || "Deskripsi disk musik.",
        img: formData.img.trim() || undefined,
      });
      showToast(`Album "${formData.name}" berhasil ditambahkan!`);
    }

    handleCloseModal();
  };

  // Handle Hapus (Delete)
  const handleDelete = (product) => {
    if (window.confirm(`Yakin ingin menghapus album "${product.name}"?`)) {
      deleteProduct(product.id);
      showToast(`Album "${product.name}" berhasil dihapus.`);
    }
  };

  // Handle Reset Data
  const handleResetData = () => {
    if (window.confirm("Kembalikan katalog album ke data awal default?")) {
      resetProducts();
      showToast("Data produk berhasil direset ke kondisi awal.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-5 py-3 rounded-lg shadow-xl text-sm font-medium animate-bounce">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kelola Disk Musik (CRUD Admin)
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manajemen katalog produk musik terintegrasi langsung dengan ProductContext & LocalStorage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetData}
            className="px-3.5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            ↺ Reset Data Default
          </button>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            + Tambah Album Baru
          </button>
        </div>
      </div>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Total Album
          </span>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {products.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Format Vinyl LP
          </span>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {totalVinyl}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Format Audio CD
          </span>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {totalCD}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Total Nilai Katalog
          </span>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            Rp {totalValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Kontrol Pencarian & Tabel Produk */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <input
              type="text"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="Cari album, artis, atau format..."
              className="w-full px-3.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Menampilkan {displayedProducts.length} dari {products.length} disk
          </span>
        </div>

        {/* Tabel CRUD */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3">Disk</th>
                <th className="px-4 py-3">Artis</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Genre</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    Tidak ada disk musik yang ditemukan.
                  </td>
                </tr>
              ) : (
                displayedProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 flex items-center gap-3">
                      {p.img ? (
                        <img
                          src={p.img}
                          alt={p.name}
                          className="w-10 h-10 aspect-square object-cover rounded-md bg-gray-100 dark:bg-gray-700 shadow-sm flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          ♪
                        </div>
                      )}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {p.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {p.artist}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {p.format}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {p.genre}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                      Rp {Number(p.price).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(p)}
                        className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-700 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p)}
                        className="px-2.5 py-1 text-xs font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 border border-red-300 dark:border-red-700 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah / Edit Produk */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingId !== null ? "Edit Disk Musik" : "Tambah Disk Musik Baru"}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-3 rounded-lg text-xs font-medium">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Judul Album *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Misal: Abbey Road"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Artis / Musisi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  placeholder="Misal: The Beatles"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Format Disk
                  </label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                  >
                    {formatOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Harga (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="450000"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Genre
                  </label>
                  <input
                    type="text"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    placeholder="Misal: Rock / Progressive"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    URL Gambar Cover (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.img}
                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Deskripsi Album
                </label>
                <textarea
                  rows="3"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Informasi seputar album, tracklist unggulan, atau edisi cetakan..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow cursor-pointer"
                >
                  {editingId !== null ? "Simpan Perubahan" : "Tambahkan Album"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}