import { Link } from "react-router-dom";
import { useCart } from "../../utils/cartcontext";

export default function Cart() {
  // Mengambil cart, updateQty, removeFromCart, totalQty dari context useCart
  const { cart, updateQty, removeFromCart, totalQty } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + (typeof item.price === "number" ? item.price : 0) * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Keranjang belanja Anda masih kosong.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Mulai Belanja Disk Musik
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Keranjang Belanja
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Kolom Daftar Item Cart */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm gap-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 aspect-square object-cover rounded-md bg-gray-100 dark:bg-gray-700 shadow-sm"
                  />
                )}
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h2>
                  {item.artist && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.artist} {item.format && `• ${item.format}`}
                    </p>
                  )}
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">
                    Rp {typeof item.price === "number" ? item.price.toLocaleString() : item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-700">
                {/* Input untuk update qty */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Qty:</span>
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    className="w-16 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded text-center py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) updateQty(item.id, val);
                    }}
                  />
                </div>

                <span className="font-semibold text-gray-900 dark:text-white text-sm hidden sm:inline-block w-28 text-right">
                  Rp {(item.price * item.qty).toLocaleString()}
                </span>

                {/* Button untuk remove item dari cart */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Kolom Ringkasan & Option Checkout */}
        <div className="w-full lg:w-80 h-fit border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4 transition-colors">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Total Kuantitas:</span>
              <span className="font-medium text-gray-900 dark:text-white">{totalQty} item</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 dark:border-gray-700 pt-2 text-base font-bold text-gray-900 dark:text-white">
              <span>Total Harga:</span>
              <span className="text-blue-600 dark:text-blue-400">Rp {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Tombol Option Checkout */}
          <div className="pt-2 space-y-2">
            <Link
              to="/checkout"
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-lg shadow transition-colors"
            >
              Lanjut ke Checkout
            </Link>
            <Link
              to="/"
              className="block w-full py-2.5 text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}