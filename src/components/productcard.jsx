import { useNavigate } from "react-router-dom";
import { useCart } from "../utils/cartcontext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Navigasi ke halaman detail produk saat card diklik
  const handleCardClick = () => {
    navigate(`/product/${p.id}`, { state: p });
  };

  // Mencegah card click terpanggil saat tombol Add to Cart diklik
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(p);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-1 flex flex-col justify-between transition-all duration-200 cursor-pointer"
    >
      <div>
        {p.img ? (
          <div className="w-full aspect-square rounded-lg mb-3 overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-xs">
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-full aspect-square rounded-lg mb-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-4xl shadow-xs">
            ♪
          </div>
        )}
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {p.name}
        </h2>
        {p.artist && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">
            {p.artist} {p.format && `• ${p.format}`}
          </p>
        )}
        <p className="text-gray-900 dark:text-gray-100 font-bold text-base mt-1">
          Rp {typeof p.price === "number" ? p.price.toLocaleString() : p.price}
        </p>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700/60">
        <span className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center gap-1 group-hover:underline">
          Lihat Detail <span>→</span>
        </span>
        {/* Tombol Tambah ke Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-2.5 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-150 font-medium text-sm shadow-sm"
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
}