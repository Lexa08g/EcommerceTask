import { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useCart } from "../../utils/cartcontext";
import { musicProducts } from "../../data/products";

export default function ProductDetail() {
  {/* Mengambil ID produk dari URL */}
  const { id } = useParams();
  // Mengambil state yang dikirim dari Link
  const location = useLocation();
  const productFromData = musicProducts.find((item) => String(item.id) === String(id));
  const p = location.state || productFromData || { id, name: `Produk ${id}`, price: 100000 };
  const { addToCart } = useCart();

  // State untuk nama reviewer, rating, dan review
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Mengambil review tersimpan dari localStorage per ID produk
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews_${p.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Review awal sebagai contoh
    return [
      {
        id: 1,
        author: "Kolektor Vinyl",
        rating: 5,
        review: "Kualitas audio master analog-nya sangat bersih dan detail. Kemasan piringan hitamnya tiba dalam kondisi mulus!",
        date: "2 hari yang lalu",
      },
    ];
  });

  // Simpan ke localStorage setiap kali review bertambah
  useEffect(() => {
    localStorage.setItem(`reviews_${p.id}`, JSON.stringify(reviews));
  }, [reviews, p.id]);

  // Handle submit review & rating
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!rating) {
      setErrorMsg("Silakan pilih rating bintang terlebih dahulu.");
      return;
    }
    if (!review.trim()) {
      setErrorMsg("Silakan tulis ulasan atau komentar Anda.");
      return;
    }

    // Membuat objek review baru
    const newReview = {
      id: Date.now(),
      author: authorName.trim() || "Penggemar Musik",
      rating,
      review: review.trim(),
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Menambahkan review baru ke daftar reviews
    setReviews([newReview, ...reviews]);
    setRating(0);
    setHoverRating(0);
    setReview("");
    setAuthorName("");
    setSuccessMsg("Terima kasih! Ulasan dan rating Anda berhasil ditambahkan.");

    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="space-y-6">
      {/* Breadcrumb sederhana */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:underline text-blue-600 dark:text-blue-400">
          Katalog
        </Link>{" "}
        / <span className="text-gray-700 dark:text-gray-300">{p.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Kolom Kiri: Info Produk & Daftar Review */}
        <section className="flex-1 space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-colors">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {p.img && (
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full sm:w-56 aspect-square object-cover rounded-md shadow-md bg-gray-100 dark:bg-gray-700"
                />
              )}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {p.name}
                </h1>
                {p.artist && (
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mt-1">
                    {p.artist} {p.format && `• ${p.format}`}
                  </p>
                )}
                {p.genre && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Genre: <span className="font-medium text-gray-700 dark:text-gray-300">{p.genre}</span>
                  </p>
                )}
                {p.desc && (
                  <p className="text-gray-700 dark:text-gray-300 mt-3 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                )}
                <p className="mt-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Rp {typeof p.price === "number" ? p.price.toLocaleString() : p.price}
                </p>
                <button
                  type="button"
                  onClick={() => addToCart(p)}
                  className="mt-4 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow cursor-pointer transition-all duration-150 active:scale-95"
                >
                  + Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>

          {/* Daftar Review Pengguna */}
          <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-6 shadow transition-colors">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-between">
              <span>Ulasan & Komentar Pengguna</span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                ({reviews.length} ulasan)
              </span>
            </h2>

            {reviews.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                Belum ada review. Jadilah orang pertama yang memberikan ulasan!
              </p>
            ) : (
              <ul className="space-y-4">
                {reviews.map((r) => (
                  <li
                    key={r.id}
                    className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/40 shadow-sm transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">
                          {r.author || "Penggemar Musik"}
                        </span>
                        {/* Menampilkan bintang sesuai rating */}
                        <div className="flex text-sm">
                          {[...Array(r.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                          {[...Array(5 - r.rating)].map((_, i) => (
                            <span key={i} className="text-gray-300 dark:text-gray-600">★</span>
                          ))}
                        </div>
                      </div>
                      {r.date && (
                        <span className="text-xs text-gray-400 dark:text-gray-400">
                          {r.date}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {r.review}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Kolom Kanan: Form Tambah Review & Rating */}
        <section className="w-full md:w-80 lg:w-96 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-6 shadow h-fit transition-colors">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Beri Nilai & Ulasan
          </h2>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium">
              {successMsg}
            </div>
          )}

          {/* Form Rating & Review */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Nama Anda (Opsional):
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Contoh: Rian / Kolektor"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Rating Bintang:{" "}
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                  {activeRating > 0 ? `(${activeRating} dari 5 bintang)` : "(klik untuk memilih)"}
                </span>
              </label>
              <div className="flex gap-1">
                {/* Menampilkan 5 bintang interaktif untuk rating */}
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Beri bintang ${star}`}
                    className={`text-3xl transition-transform hover:scale-125 cursor-pointer ${
                      star <= activeRating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Ulasan / Komentar:
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Ceritakan pengalaman Anda mendengar kualitas musik dan album ini..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow cursor-pointer transition-colors"
            >
              Kirim Ulasan
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}