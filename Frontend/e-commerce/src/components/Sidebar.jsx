import { motion } from "framer-motion";
import { Home, Package, PlusSquare, ShoppingBag } from "lucide-react";

export default function Sidebar({ isOpen, onSelect }) {
  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed lg:static left-0 top-0 h-full w-56 bg-white border-r border-gray-200 shadow-md z-50"
    >
      {/* Header */}
      <div className="p-4 font-bold text-lg border-b bg-primary text-white">
        Admin Panel
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col p-4 text-gray-700 space-y-3">
        <button
          onClick={() => onSelect("home")}
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg text-left"
        >
          <Home size={18} /> Dashboard Home
        </button>

        <button
          onClick={() => onSelect("manage")}
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg text-left"
        >
          <Package size={18} /> Manage Products
        </button>

        <button
          onClick={() => onSelect("add")}
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg text-left"
        >
          <PlusSquare size={18} /> Add Product
        </button>

        <button
          onClick={() => onSelect("orders")}
          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg text-left"
        >
          <ShoppingBag size={18} /> Orders
        </button>
      </nav>
    </motion.aside>
  );
}
