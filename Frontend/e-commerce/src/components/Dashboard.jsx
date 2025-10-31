import AddProduct from "../features/products/AddProduct";
import DashboardLayout from "./DashoardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <section className="p-6 overflow:hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Welcome to the Admin Dashboard 👋
        </h2>
        <p className="text-gray-600">
          Here you can manage your products, track orders, and handle users efficiently.
        </p>
      
      </section>
    </DashboardLayout>
  );
}
