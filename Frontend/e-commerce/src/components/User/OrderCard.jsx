import { MapPin } from "lucide-react";
import DeliverySteps from "./DeliverySteps";
import { useNavigate } from "react-router-dom";

export default function OrderCard({ order, activeTab }) {
  const navigate = useNavigate();

  const filteredProducts = order.products.filter((p) => {
    if (activeTab === "On Shipping") return p.status === "Pending" || p.status === "Shipped";
    if (activeTab === "Arrived") return p.status === "Delivered";
    if (activeTab === "Cancelled") return p.status === "Cancelled";
  });
console.log(order)
  return (
    <div className="w-[95%] sm:w-[80%] mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6 border border-gray-100">
     
      <h3 className="text-lg font-semibold">#Order ID: {order._id}</h3>

      
      {activeTab !== "Cancelled" && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
       
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>{order.from || "Kathmandu, Nepal"}</span>
          </div>

          
          <div className="relative flex-1 flex items-center justify-center w-full">
            
            <div className="hidden sm:block absolute inset-y-1/2 left-0 right-0 border-t-2 border-dashed border-gray-300"></div>

           
            <div className="block sm:hidden absolute inset-x-1/2 top-0 bottom-0 border-l-2 border-dashed border-gray-300"></div>

            <div className="relative z-10">
              <DeliverySteps activeStatus={activeTab}/>
            </div>
          </div>

        
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-green-500" />
            <span>{order.to || "Pokhara, Nepal"}</span>
          </div>
        </div>
      )}

 
      <div className="space-y-4">
        {filteredProducts.map((p) => (
          <div
            key={p.product._id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border rounded-xl p-3 hover:shadow-md transition-shadow"
          >
            <div className="w-20 h-20 border rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={p.product.images?.find((img) => img.isMain)?.url || "https://via.placeholder.com/80"}
                alt={p.product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <p className="font-semibold text-gray-800">{p.product.title}</p>
              <p className="text-gray-500 text-sm">Qty: {p.quantity}</p>
              <p className="font-medium text-blue-600">Rs {p.product.price?.toLocaleString()}</p>
            </div>
            <div className="text-sm font-medium text-gray-500">{p.status}</div>
          </div>
        ))}
      </div>

     
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t gap-2 sm:gap-0">
        <p className="font-semibold text-lg text-gray-800">
          Total: <span className="text-blue-600">Rs {order.totalPrice?.toLocaleString()}</span>
        </p>
        <button
          onClick={() => navigate(`/orders/${order._id}`)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
