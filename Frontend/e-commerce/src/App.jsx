import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/auth/authSlice";
import ProductListing from "./components/product/Cateogry/ProductListing";
import UserLayout from "./Pages/UserLayout"; // <- layout wrapper
import ProductList from "./features/products/ProductList";
import ProductDetail from "./features/products/ProductDetail";
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

        <Route path="category/:category" element={<CategoryFilter/>}/>
        <Route path="products" element={<ProductListing />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
        <Route path="orders" element={<Order />} />
        <Route path="orders/:id" element={<OrderDetails />} />
      </Route>


      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="add" element={<ProductForm />} />
        <Route path="manage" element={<ManageProducts />} />
        <Route path="update-product/:id" element={<UpdateProduct />} />
        <Route path="orders" element={<AdminOrder />} />
        <Route path="orders/:id" element={<OrderDetails />} />
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
