import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/adminpages/admindashboard";
import AdminLayout from "./layouts/AdminLayout";
import AboutPage from "./pages/adminpages/aboutpages";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/frontpages/dashboard";
import ProductDetail from "./pages/frontpages/productdetail";
import Cart from "./pages/frontpages/cart";
import Checkout from "./pages/frontpages/checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
      {/* Admin Layout wrapper, pendekatan jika menggunakan Outlet pada JSX */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Default route di dalam AdminLayout */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}