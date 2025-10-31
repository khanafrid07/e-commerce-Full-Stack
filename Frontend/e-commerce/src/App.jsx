import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/auth/authSlice";
import UpdateProduct from "./features/products/UpdateProduct";
import Navbar from "./components/Navbar";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ProductList from "./features/products/ProductList";
import ProductDetail from "./features/products/ProductDetail";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import Checkout from "./Pages/Checkout";
import Payment from "./Pages/Payment";
import Order from "./Pages/Order";
function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  // Hide navbar on dashboard routes
  const hideNavbar = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element ={<Cart/>}/>
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/orders" element={<Order/>}/>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
