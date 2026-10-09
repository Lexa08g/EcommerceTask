/* eslint-disable react-refresh/only-export-components */
import { ThemeProvider } from "./themecontext";
import { ProductProvider } from "./productcontext";
import { CategoryProvider } from "./categorycontext";
import { CartProvider } from "./cartcontext";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ProductProvider>
        <CategoryProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </CategoryProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}

export { ProductContext, ProductProvider, useProduct, useProducts } from "./productcontext";
export { CartContext, CartProvider, useCart } from "./cartcontext";
export { CategoryContext, CategoryProvider, useCategory, useCategories, DEFAULT_CATEGORIES } from "./categorycontext";
export { ThemeContext, ThemeProvider, useTheme } from "./themecontext";

export default AppProviders;
