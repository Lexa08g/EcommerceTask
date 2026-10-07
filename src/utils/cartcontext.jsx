/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useRef } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ show: false, product: null });
  const [badgeBounced, setBadgeBounced] = useState(false);
  const toastTimeoutRef = useRef(null);

  // Tambah ke cart dengan memicu animasi notifikasi toast dan badge bounce
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

    // Memicu toast notifikasi & animasi pop pada badge keranjang
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

  const hideToast = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: false, product: null });
    setBadgeBounced(false);
  };

  // Update qty
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  // Hapus item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        totalQty,
        toast,
        hideToast,
        badgeBounced,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);