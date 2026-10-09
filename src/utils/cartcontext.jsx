/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { musicProducts } from "../data/products";

export const CartContext = createContext();

const STORAGE_KEY = "ecommerce_cart";

export function CartProvider({ children }) {
  // 2.5 Persistensi CartContext: Baca data keranjang tersimpan dari localStorage saat inisialisasi
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Sinkronisasi cover gambar produk jika ada data lama yang tersimpan
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
      console.error("Gagal memuat keranjang dari localStorage:", error);
    }
    return [];
  });

  const [toast, setToast] = useState({ show: false, product: null });
  const [badgeBounced, setBadgeBounced] = useState(false);
  const toastTimeoutRef = useRef(null);

  // 2.5 Persistensi CartContext: Simpan perubahan cart ke localStorage secara otomatis
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Gagal menyimpan keranjang ke localStorage:", error);
    }
  }, [cart]);

  // Tambah produk ke keranjang
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    // Memicu notifikasi popup toast & animasi bounce pada badge keranjang
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: true, product });
    setBadgeBounced(true);

    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, product: null });
      setBadgeBounced(false);
    }, 3200);
  };

  // Menutup toast secara manual
  const hideToast = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: false, product: null });
    setBadgeBounced(false);
  };

  // Mengubah kuantitas item
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  // Menghapus item dari keranjang
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Mengosongkan seluruh keranjang (misal setelah selesai checkout pembayaran)
  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Gagal menghapus keranjang dari localStorage:", error);
    }
  };

  // Kalkulasi total kuantitas dan total harga belanjaan
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (typeof item.price === "number" ? item.price : 0) * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalQty,
        totalPrice,
        toast,
        hideToast,
        badgeBounced,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 2.6 Custom Hook: useCart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }
  return context;
};

export default CartContext;