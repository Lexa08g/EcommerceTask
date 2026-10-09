import ProductCard from "../../components/ProductCard";
import { useProduct } from "../../utils/productcontext";
import { useCategory } from "../../utils/categorycontext";

export default function Dashboard() {
  // 2.1 & 2.6 Menggunakan data produk dari ProductContext
  const { products } = useProduct();
  // 2.3 & 2.6 Menggunakan kategori dan pencarian dari CategoryContext
  const { searchTerm, selectedCategory, resetFilters, filterProducts } = useCategory();

  // Filter produk secara dinamis menggunakan helper dari CategoryContext
  const filteredProducts = filterProducts(products);

  const handleResetFilter = () => {
    resetFilters();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Katalog Disk Musik (Vinyl & CD)
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Menampilkan {filteredProducts.length} dari {products.length} album
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Tidak ada disk musik yang cocok dengan pencarian atau filter Anda.
          </p>
          {(searchTerm || selectedCategory !== "all") && (
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