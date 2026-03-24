import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/auth/authSlice";
import UserLayout from "./Pages/UserLayout";
import Cart from "./components/Cart";
import Checkout from "./Pages/Checkout";
import Payment from "./Pages/Payment";
import Order from "./components/User/Order";
import OrderDetails from "./components/OrderDetails";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./Pages/DashboardHome";
import ProductForm from "./features/products/ProductForm";
import ManageProducts from "./features/products/ManageProducts";
import AdminOrder from "./Pages/AdminOrder";
import UpdateProduct from "./features/products/UpdateProduct";
import Home from "./Pages/Home";
import CategoryFilter from "./components/product/Cateogry/CateogryFilter";
import ProductDetail from "./components/product/detail/productDetails/ProductDetail";
import ProductListing from "./components/product/ProductListing";
import ProtectedRoute from "./components/ProtectedRote"
import Banner from "./features/Banners/Banner";
import BannerForm from "./features/Banners/components/BannerForm";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QlWeFQemhG2QfvsGG1PqGASRwoKpb3CV9iBeVeHpYYiDiXApNSn2i9YiHUU3XiLRb7QPXem90utPmVVJ5f0Ewoh00shYEBk3E")

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* User pages wrapped in UserLayout */}
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />

        <Route path="category/:category" element={<CategoryFilter />} />
        <Route path="products" element={<ProductListing />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Elements stripe={stripePromise}>
          <Payment />

        </Elements>} />
        <Route path="orders" element={<Order />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>




      {/* Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardHome />} />
        <Route path="add" element={<ProductForm />} />
        <Route path="manage" element={<ManageProducts />} />
        <Route path="update-product/:id" element={<UpdateProduct />} />
        <Route path="orders" element={<AdminOrder />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="banners" element={<Banner />} />
        <Route path="banners/create" element={<BannerForm />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
