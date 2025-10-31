import { Menu } from "lucide-react";

export default function DashboardNav({ toggleSidebar }) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        {/* Show only on mobile */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
          Logout
        </button>
      </div>
    </nav>
  );
}
