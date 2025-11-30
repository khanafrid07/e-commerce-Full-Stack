import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Package, PlusSquare, ShoppingBag } from "lucide-react";

export default function Sidebar({ isOpen }) {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/dashboard/manage", label: "Manage Products", icon: Package },
    { path: "/dashboard/add", label: "Add Product", icon: PlusSquare },
    { path: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed lg:static left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-md z-50"
    >
      <div className="p-4 font-bold text-lg border-b bg-primary text-white">
        Admin Panel
      </div>

      <nav className="flex flex-col p-4 text-gray-700 space-y-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
              isActive(path)
                ? "bg-primary text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
