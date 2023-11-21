import { Routes, Route } from "react-router-dom";
import { RequireAuth, RequireSellerAuth } from "./Components/RequireAuth";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingProgress } from "./features/additionalInfo/additionalInfoSlice";
import LoadingBar from "react-top-loading-bar";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import WishlistPage from "./Pages/WishlistPage";
import CartPage from "./Pages/CartPage";
import OrdersPage from "./Pages/OrdersPage";
import SellerAuthPage from "./Pages/SellerAuthPage";
import SellerPage from "./Pages/SellerPage";
import NotfoundPage from "./Pages/NotfoundPage";
import ProductFormPage from "./Pages/ProductFormPage";
import CategoryProductPage from "./Pages/CategoryProductPage";
import SearchProductPage from "./Pages/SearchProductPage";
import ProductOverviewPage from "./Pages/ProductOverviewPage";
import CheckoutPage from "./Pages/CheckoutPage";
import CustomerAddressFormPage from "./Pages/CustomerAddressFormPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import AddressPage from "./Pages/AddressPage";
import SellerOrders from "./Components/SellerOrders";
import SellerOverview from "./Components/SellerOverview";
import SellerListings from "./Components/SellerListings";
import SellerMetrics from "./Components/SellerMetrics";

function App() {
  const dispatch = useDispatch();
  const { loadingProgress } = useSelector((state) => state.additionalInfo);
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={loadingProgress}
        onLoaderFinished={() => dispatch(setLoadingProgress(0))}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductOverviewPage />} />
        <Route path="/search" element={<SearchProductPage />} />
        <Route path={`/category/:type`} element={<CategoryProductPage />} />
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
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
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
          path="/orderDetails/:orderId"
          element={
            <RequireAuth>
              <OrderDetailsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/addresses"
          element={
            <RequireAuth>
              <AddressPage />
            </RequireAuth>
          }
        />
        <Route
          path="/addresses/create"
          element={
            <RequireAuth>
              <CustomerAddressFormPage pageType={"create"} />
            </RequireAuth>
          }
        />
        <Route
          path="/addresses/edit/:addressId"
          element={
            <RequireAuth>
              <CustomerAddressFormPage pageType={"edit"} />
            </RequireAuth>
          }
        />
        <Route
          path="/sellerAuth"
          element={
            <RequireAuth>
              <SellerAuthPage />
            </RequireAuth>
          }
        />
        <Route
          path="/seller"
          element={
            <RequireSellerAuth>
              <SellerPage />
            </RequireSellerAuth>
          }>
          <Route index element={<SellerOverview />} />
          <Route path="listings" element={<SellerListings />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="metrics" element={<SellerMetrics />} />
        </Route>
        <Route
          path="/createProduct"
          element={
            <RequireSellerAuth>
              <ProductFormPage pageType={"create"} />
            </RequireSellerAuth>
          }
        />
        <Route
          path="/editProduct"
          element={
            <RequireSellerAuth>
              <ProductFormPage pageType={"edit"} />
            </RequireSellerAuth>
          }
        />
        <Route path="/*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
}

export default App;
