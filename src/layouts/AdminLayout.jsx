import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

// Export Default menandai bahwa komponen ini nantinya dibaca sebagai AdminLayout
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Menggunakan Componen Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar (for mobile) */}
        <div className="md:hidden bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center border-b dark:border-gray-700">
          <h1 className="font-bold text-gray-900 dark:text-white">My Admin</h1>
          <button
            className="p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 My Admin App — v1.0.0
        </footer>
      </div>
    </div>
  );
}
