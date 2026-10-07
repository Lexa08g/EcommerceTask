import { Link } from "react-router-dom";

// SidebarOpen menerima destructuring props.
// Artinya Sidebar menerima sebuah objek props yang dikirim dari parent component (misalnya dari AdminLayout).
// sidebarOpen sebuah state boolean (true/false) untuk menentukan sidebar sedang terbuka atau tertutup.
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 shadow-md transition-colors`}
    >
      <div className="p-4 font-bold text-xl flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
        <span>My Admin</span>
        <button
          type="button"
          className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        {/* Navigasi Link ke halaman dashboard */}
        <Link
          to="/admin/dashboard"
          onClick={() => setSidebarOpen(false)}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors text-gray-700 dark:text-gray-200"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/about"
          onClick={() => setSidebarOpen(false)}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors text-gray-700 dark:text-gray-200"
        >
          About
        </Link>
      </nav>
    </div>
  );
}