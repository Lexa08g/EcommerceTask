/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { musicProducts } from "../data/products";

export const ProductContext = createContext();

const STORAGE_KEY = "ecommerce_products";

export function ProductProvider({ children }) {
  // 2.4 Persistensi ProductContext: Baca dari localStorage saat inisialisasi awal
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sinkronisasi asset img jika perlu (fallback ke data default)
          return parsed.map((item) => {
            const defaultItem = musicProducts.find((p) => p.id === item.id);
            return {
              ...item,
              img: item.img || defaultItem?.img,
            };
          });
        }
      }
    } catch (error) {
      console.error("Gagal memuat produk dari localStorage:", error);
    }
    return musicProducts;
  });

  // 2.4 Persistensi ProductContext: Simpan ke localStorage setiap ada perubahan data produk
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Gagal menyimpan produk ke localStorage:", error);
    }
  }, [products]);

  // Fungsi helper: ambil produk berdasarkan ID
  const getProductById = (id) => {
    return products.find((item) => String(item.id) === String(id));
  };

  // Fungsi helper: tambah produk baru (misal fitur admin)
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || Date.now(),
    };
    setProducts((prev) => [productWithId, ...prev]);
  };

  // Fungsi helper: update data produk
  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, ...updatedData } : item
      )
    );
  };

  // Fungsi helper: hapus produk
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  // Fungsi helper: reset produk ke data default awal
  const resetProducts = () => {
    setProducts(musicProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(musicProducts));
    } catch (error) {
      console.error("Gagal mereset produk di localStorage:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// 2.6 Custom Hook: useProduct
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct harus digunakan di dalam ProductProvider");
  }
  return context;
};

// Alias plural jika dibutuhkan
export const useProducts = useProduct;
export default ProductContext;
