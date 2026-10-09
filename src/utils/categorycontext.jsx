/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const CategoryContext = createContext();

export const DEFAULT_CATEGORIES = [
  { id: "all", name: "Semua Format Disk" },
  { id: "vinyl", name: "Vinyl (Piringan Hitam)" },
  { id: "cd", name: "Audio CD" },
  { id: "limited", name: "Edisi Khusus / Remaster" },
];

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Helper untuk mereset seluruh filter & pencarian
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
  };

  // Helper: fungsi filter daftar produk berdasarkan format dan pencarian kata kunci
  const filterProducts = (productsList = []) => {
    return productsList.filter((product) => {
      // 1. Filter kategori format
      let formatMatch = true;
      const formatLower = (product.format || "").toLowerCase();
      if (selectedCategory === "vinyl") {
        formatMatch = formatLower.includes("vinyl");
      } else if (selectedCategory === "cd") {
        formatMatch = formatLower.includes("cd");
      } else if (selectedCategory === "limited") {
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
        (product.name || "").toLowerCase().includes(query) ||
        (product.artist || "").toLowerCase().includes(query) ||
        (product.genre || "").toLowerCase().includes(query) ||
        (product.format || "").toLowerCase().includes(query) ||
        (product.desc || "").toLowerCase().includes(query);

      return formatMatch && searchMatch;
    });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        resetFilters,
        filterProducts,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

// 2.6 Custom Hook: useCategory
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory harus digunakan di dalam CategoryProvider");
  }
  return context;
};

export const useCategories = useCategory;
export default CategoryContext;
