import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartToast from "../components/CartToast";
import { useCategory } from "../utils/categorycontext";

export default function MainLayout() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
  } = useCategory();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Jika user sedang berada di halaman lain (misal /product atau /cart), arahkan kembali ke katalog
    if (location.pathname !== "/" && location.pathname !== "/dashboard") {
      navigate("/");
    }
  };

  const handleFormatChange = (e) => {
    setSelectedCategory(e.target.value);
    if (location.pathname !== "/" && location.pathname !== "/dashboard") {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header/Navbar */}
      <Navbar />

      {/* Search & Filter */}
      <header className="bg-gray-100 dark:bg-gray-800 p-4 flex flex-col md:flex-row gap-2 justify-between items-center transition-colors">
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari disk musik, artis, atau album..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <select
          value={selectedCategory}
          onChange={handleFormatChange}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </header>

      {/* Main Section */}
      <main className="flex-1 p-6">
        <Outlet context={{ searchTerm, setSearchTerm, selectedFormat: selectedCategory, setSelectedFormat: setSelectedCategory }} />
      </main>

      {/* Floating Animated Toast Notification saat Add to Cart */}
      <CartToast />

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white text-center p-4 transition-colors">
        <p>© 2025 E-Commerce Music Disc Store | Version 1.0</p>
      </footer>
    </div>
  );
}