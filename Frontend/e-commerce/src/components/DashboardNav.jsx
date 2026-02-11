// DashboardNav.jsx
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function DashboardNav({ toggleSidebar }) {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        {/* Hamburger for mobile */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
