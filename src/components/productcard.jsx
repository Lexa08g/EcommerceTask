// import link router dom
import { Link } from "react-router-dom";
// import useCart dari CartContext
import { useCart } from "../utils/cartcontext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div key={p.id} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg flex flex-col justify-between transition-colors">
      <div>
        {p.img && (
          <img
            src={p.img}
            alt={p.name}
            className="w-full aspect-square object-cover rounded-md mb-3 shadow-sm bg-gray-100 dark:bg-gray-700"
          />
        )}
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{p.name}</h2>
        {p.artist && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {p.artist} {p.format && `• ${p.format}`}
          </p>
        )}
        <p className="text-gray-900 dark:text-gray-200 font-medium">
          Rp {typeof p.price === "number" ? p.price.toLocaleString() : p.price}
        </p>
      </div>
      <div>
        <Link
          to={`/product/${p.id}`}
          state={p}
          className="text-blue-600 dark:text-blue-400 hover:underline mt-2 block font-medium"
        >
          Lihat Detail
        </Link>
        {/* Fungsi Tambah ke cart */}
        <button
          type="button"
          onClick={() => addToCart(p)}
          className="mt-3 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-150 active:scale-95 font-medium text-sm"
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
}