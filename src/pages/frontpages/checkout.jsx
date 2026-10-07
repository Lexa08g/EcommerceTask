import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../utils/cartcontext";

export default function Checkout() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [isOrdered, setIsOrdered] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !address.trim()) {
      alert("Harap lengkapi nama dan alamat pengiriman.");
      return;
    }
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="max-w-md mx-auto text-center py-12 p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow space-y-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-3xl flex items-center justify-center rounded-full mx-auto">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pesanan Berhasil!</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Terima kasih, <span className="font-semibold text-gray-900 dark:text-white">{fullName}</span>. Disk musik Anda akan segera diproses dan dikirim ke alamat Anda.
        </p>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          Total Pembayaran: Rp {total.toLocaleString()}
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout Pembayaran</h1>
        <Link to="/cart" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Kembali ke Keranjang
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow space-y-6 transition-colors">
        {cart.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <p className="text-gray-500 dark:text-gray-400">Keranjang belanja Anda kosong.</p>
            <Link
              to="/"
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Cari Disk Musik
            </Link>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">
                Ringkasan Pesanan
              </h2>
              <div className="space-y-3 mt-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      {item.img && (
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-10 h-10 aspect-square object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.artist} ({item.qty} pcs)
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Rp {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-base text-gray-900 dark:text-white">
                  <span>Total Tagihan:</span>
                  <span className="text-blue-600 dark:text-blue-400">Rp {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Form Informasi Pengiriman */}
            <form onSubmit={handlePay} className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Informasi Pengiriman
              </h2>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Nama Penerima:
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama Lengkap Anda"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Alamat Lengkap:
                </label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="2"
                  placeholder="Alamat jalan, kelurahan, kota, kode pos"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Metode Pembayaran:
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="transfer">Bank Transfer / QRIS (BCA, Mandiri, BRI)</option>
                  <option value="cod">COD (Bayar di Tempat)</option>
                  <option value="ewallet">E-Wallet (GoPay, OVO, Dana)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Konfirmasi & Bayar Sekarang
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
