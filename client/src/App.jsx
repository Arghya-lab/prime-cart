import { Routes, Route } from "react-router-dom";
import { RequireAuth, RequireSellerAuth } from "./Components/RequireAuth";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import WishlistPage from "./Pages/WishlistPage";
import CartPage from "./Pages/CartPage";
import OrdersPage from "./Pages/OrdersPage";
import ProfilePage from "./Pages/ProfilePage";
import SellerAuthPage from "./Pages/SellerAuthPage";
import SellerPage from "./Pages/SellerPage";
import NotfoundPage from "./Pages/NotfoundPage";
import ProductCreatePage from "./Pages/ProductCreatePage";
import CategoryProductPage from "./Pages/CategoryProductPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryProductPage />} />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <WishlistPage />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <CartPage />
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth>
              <OrdersPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/sellerAuth" element={<SellerAuthPage />} />
        <Route
          path="/seller"
          element={
            <RequireSellerAuth>
              <SellerPage />
            </RequireSellerAuth>
          }
        />
        <Route
          path="/createProduct"
          element={
            <RequireSellerAuth>
              <ProductCreatePage />
            </RequireSellerAuth>
          }
        />
        <Route path="/*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
}

export default App;
