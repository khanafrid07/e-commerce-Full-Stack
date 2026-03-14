import { Search, ShoppingCart, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState, useEffect, useRef } from "react";

export default function Navbar({ wishCount = 0 }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);

  const isLoggedIn = !!user;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  function onLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }

  /* ================= SEARCH SUGGESTIONS ================= */

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestion([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/products?search=${encodeURIComponent(
            searchQuery
          )}`
        );

        const data = await res.json();
        setSuggestion(data.allProducts || []);
      } catch (err) {
        console.log(err, "error fetching products");
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestion(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= HANDLERS ================= */

  function handleProductClick(productId) {
    navigate(`/products/${productId}`);
    setShowSuggestion(false);
    setSearchQuery("");
  }

  function handleSearch(e) {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSuggestion(false);
    }
  }

  return (
    <div className="navbar bg-white shadow-md px-4 md:px-6 border-b">

      {/* Mobile menu icon */}
      <Menu className="md:hidden mr-2 cursor-pointer" />

      {/* Brand */}
      <div className="flex-1">
        <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
          ShopSmart
        </Link>
      </div>

      {/* ================= SEARCH ================= */}
      <form onSubmit={handleSearch} className="hidden md:flex">
        <div
          ref={searchRef}
          className="relative flex items-center bg-gray-100 border rounded-lg px-3 py-1"
        >
          <Search className="w-4 h-4 text-gray-500 mr-2" />

          <input
            type="text"
            value={searchQuery}
            placeholder="Search products..."
            className="bg-transparent outline-none text-gray-700 w-56 lg:w-64"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestion(true);
            }}
          />

          {/* Suggestions */}
          {showSuggestion && suggestion.length > 0 && (
            <div className="absolute top-full mt-2 border shadow-md bg-white rounded-lg w-full z-50 max-h-60 overflow-y-auto">
              {suggestion.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="border-b hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm truncate"
                >
                  {product.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex items-center gap-4 md:gap-6">

        {/* Cart */}
        <Link to="/cart" className="relative">
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
          <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
        </Link>

        {/* Auth */}
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="avatar cursor-pointer">
              <div className="bg-neutral text-neutral-content w-10 rounded-full">
                <span className="text-lg">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            </div>

            <ul className="dropdown-content menu mt-3 rounded-box z-[1] w-52 p-2 shadow bg-white">
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/orders">My Orders</Link>
              </li>

              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:scale-105 transition"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}