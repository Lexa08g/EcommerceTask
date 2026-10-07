import { Link } from "react-router-dom";
import { useCart } from "../utils/cartcontext";
import { useTheme } from "../utils/themecontext";

export default function Navbar() {
  // Mengambil totalQty dan badgeBounced dari context UseCart
  const { totalQty, badgeBounced } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white px-6 py-4 flex justify-between items-center transition-colors">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl flex items-center gap-2">
        <span>MusicDisc Store</span>
      </Link>
      {/* Menu Navigasi */}
      <div className="flex items-center gap-6">
        {/* Dashboard Links */}
        <Link to="/" className="hover:text-gray-200">
          Katalog
        </Link>
        <Link to="/cart" className="hover:text-gray-200 flex items-center gap-1.5 relative">
          <span>Keranjang</span>
          {/* Menampilkan totalQty dengan animasi pop jika ada item di keranjang */}
          {totalQty > 0 && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold transition-all duration-300 ${
                badgeBounced
                  ? "animate-pop bg-yellow-400 text-gray-900 scale-125 shadow-lg"
                  : "bg-red-500 text-white scale-100"
              }`}
            >
              {totalQty}
            </span>
          )}
        </Link>
        <Link to="/checkout" className="hover:text-gray-200">
          Checkout
        </Link>
        {/* Toggle Dark / Light Mode */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
          className="p-1.5 px-3 rounded-lg border border-white/30 hover:bg-white/10 text-sm font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}