import { Search, ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function Navbar({ wishCount = 0 }) {
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);
  const isLoggedIn = !!user;
  const dispatch = useDispatch()

  function onLogout(e){
    e.preventDefault();
    dispatch(logout())
    
  }

  return (
    <div className="navbar bg-white text-gray-800 shadow-md px-6 py-3 gap-4 ">
      <Menu className="md:hidden" />

      {/* Brand */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          ShopSmart
        </Link>
      </div>

      {/* Search bar */}
      <div className="hidden md:flex items-center bg-gray-100 border rounded-lg px-3 py-1">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none text-gray-700 w-64"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-8">
        <Link to="/wishlist" className="relative font-semibold text-lg">
          {wishCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">
              {wishCount}
            </span>
          )}
          My Wishlist
        </Link>

        <Link to="/cart" className="relative">
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
          <ShoppingCart className="w-8 h-8" />
        </Link>

        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-12 rounded-full">
                <span className="text-2xl">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu mt-2 rounded-box z-[1] w-52 p-2 shadow bg-background text-text"
            >
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><button onClick={onLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-secondary text-white rounded-lg hover:scale-105 transition-transform"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
