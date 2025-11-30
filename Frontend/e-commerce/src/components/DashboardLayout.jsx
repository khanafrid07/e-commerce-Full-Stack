import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardNav from "./DashboardNav";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    function handleResize() {
      setIsOpen(window.innerWidth >= 1024);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Overlay for small screens */}
      {isOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transform bg-white shadow-lg transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:shadow-none w-64`}
      >
        <Sidebar isOpen={isOpen} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardNav toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
