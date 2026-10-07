import { Link } from "react-router-dom";
import { useCart } from "../utils/cartcontext";

export default function CartToast() {
  const { toast, hideToast } = useCart();

  if (!toast.show || !toast.product) return null;

  const product = toast.product;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full sm:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-4 animate-toast transition-all"
    >
      <div className="flex items-start gap-3">
        {/* Thumbnail Album */}
        {product.img ? (
          <img
            src={product.img}
            alt={product.name}
            className="w-14 h-14 aspect-square object-cover rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700 flex-shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-xl flex-shrink-0">
            ♪
          </div>
        )}

        {/* Detail Notifikasi */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
            {product.name}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
            {product.artist} {product.format && `• ${product.format}`}
          </p>

          <div className="mt-2.5 flex items-center gap-2">
            <Link
              to="/cart"
              onClick={hideToast}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-lg shadow transition-colors inline-block"
            >
              Lihat Keranjang →
            </Link>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Rp {typeof product.price === "number" ? product.price.toLocaleString() : product.price}
            </span>
          </div>
        </div>

        {/* Tombol Tutup Toast */}
        <button
          type="button"
          onClick={hideToast}
          aria-label="Tutup notifikasi"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm p-1 rounded transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
