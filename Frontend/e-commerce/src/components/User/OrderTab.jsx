import { useState } from "react";
import OrderCard from "./OrderCard";

export default function OrderTab({ orders }) {
  const [activeTab, setActiveTab] = useState("On Shipping");

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "On Shipping")
      return order.products.some(
        (p) => p.status === "Pending" || p.status === "Shipped"
      );
    if (activeTab === "Arrived")
      return order.products.some((p) => p.status === "Delivered");
    if (activeTab === "Cancelled")
      return order.products.some((p) => p.status === "Cancelled");
    return false;
  });
  console.log(filteredOrders)

  return (
    <div className="w-[95%] mx-auto my-12">
      {/* Tabs */}
      <div className="flex gap-4 mb-4 justify-center w-full">
        {["On Shipping", "Arrived", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 w-[22rem] rounded-lg font-medium transition
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      
      <div className="flex flex-col gap-6 w-full">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className="w-full">
              <OrderCard order={order} activeTab={activeTab} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No orders available in "{activeTab}" tab.
          </p>
        )}
      </div>
    </div>
  );
}
