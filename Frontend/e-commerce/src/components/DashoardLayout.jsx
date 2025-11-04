import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNav";
import AddProduct from "../features/products/AddProduct.jsx";
import ManageProducts from "../features/products/ManageProducts.jsx";
// import ManageProducts from "./ManageProducts";
// import Orders from "./Orders";
import AdminOrder from "../Pages/AdminOrder.jsx";
export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState("home");

  // This function updates which component to show
  const renderContent = () => {
    switch (selectedPage) {
      case "manage":
        return <ManageProducts />;
      case "add":
        return <AddProduct />;
      case "orders":
        return <AdminOrder/>;
      default:
        return <p>Good</p> ;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onSelect={setSelectedPage} />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <DashboardNavbar toggleSidebar={() => setIsOpen(!isOpen)} />
        <main className="p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
