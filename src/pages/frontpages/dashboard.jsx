import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { musicProducts } from "../../data/products";

export default function Dashboard() {
  const context = useOutletContext();
  const searchTerm = context?.searchTerm || "";
  const selectedFormat = context?.selectedFormat || "all";
  const setSearchTerm = context?.setSearchTerm;
  const setSelectedFormat = context?.setSelectedFormat;

  // Filter produk berdasarkan pencarian dan pilihan format
  const filteredProducts = musicProducts.filter((product) => {
    // 1. Filter format disk
    let formatMatch = true;
    const formatLower = product.format.toLowerCase();
    if (selectedFormat === "vinyl") {
      formatMatch = formatLower.includes("vinyl");
    } else if (selectedFormat === "cd") {
      formatMatch = formatLower.includes("cd");
    } else if (selectedFormat === "limited") {
      formatMatch =
        formatLower.includes("limited") ||
        formatLower.includes("anniversary") ||
        formatLower.includes("audiophile") ||
        formatLower.includes("remaster");
    }

    // 2. Filter kata kunci pencarian
    const query = searchTerm.trim().toLowerCase();
    const searchMatch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.artist.toLowerCase().includes(query) ||
      product.genre.toLowerCase().includes(query) ||
      product.format.toLowerCase().includes(query) ||
      product.desc.toLowerCase().includes(query);

    return formatMatch && searchMatch;
  });

  const handleResetFilter = () => {
    if (setSearchTerm) setSearchTerm("");
    if (setSelectedFormat) setSelectedFormat("all");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Katalog Disk Musik (Vinyl & CD)
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Menampilkan {filteredProducts.length} dari {musicProducts.length} album
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Tidak ada disk musik yang cocok dengan pencarian atau filter Anda.
          </p>
          {(searchTerm || selectedFormat !== "all") && (
            <button
              onClick={handleResetFilter}
              className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
            >
              Reset Filter & Pencarian
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} p={product} />
          ))}
        </div>
      )}
    </div>
  );
}