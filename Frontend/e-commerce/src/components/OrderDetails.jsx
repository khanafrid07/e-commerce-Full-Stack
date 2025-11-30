
import { useParams, useNavigate } from "react-router-dom";
import {
  useSingleOrderQuery,
  useUpdateOrderMutation,
} from "../features/orders/orderSlice";
import {
  ChevronLeft,
  Loader2,
  User,
  MapPin,
  Package,
  CreditCard,
  ClipboardList,
} from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useSingleOrderQuery(id);
  const [updateOrder] = useUpdateOrderMutation();
 console.log(order)

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading order details...
      </div>
    );

  if (isError || !order)
    return <p className="text-center text-red-500 mt-10">Error loading order.</p>;

  const handleOrderStatus = async (e) => {
    await updateOrder({ id: order._id, status: e.target.value });
  };

  const handleItemStatus = async (productid, newStatus) => {
    await updateOrder({
      orderId: order._id,
      productid,
      status: newStatus,
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-base-100 rounded-lg shadow-md border border-base-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-ghost flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <h2 className="text-lg sm:text-xl font-semibold break-words">
            Order #{order._id}
          </h2>
        </div>
        <div className="text-center">
            <p>Order status</p>
            <p className={`border rounded-md font-semibold ${order.status==="Pending"?"bg-secondary":order.status==="Cancelled"?"bg-red-400":order.status==="Delivered"?"bg-green-300":"bg-gray-300"}`}>{order.status}</p>


        </div>
      </div>

      {/* Info Section */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Customer Info */}
        <div className="card bg-base-200 p-4 shadow-lg">
          <h3 className="font-semibold flex items-center gap-2 text-lg mb-3">
            <User className="w-4 h-4" /> Customer Info
          </h3>
          <div className="text-sm space-y-1">
            <p><strong>Name:</strong> {order.user?.name}</p>
            <p><strong>Email:</strong> {order.user?.email}</p>
            <p><strong>Phone:</strong> {order.user?.phone || "N/A"}</p>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="card bg-base-200 p-4 shadow-lg">
          <h3 className="font-semibold flex items-center gap-2 text-lg mb-3">
            <MapPin className="w-4 h-4" /> Shipping Info
          </h3>
          <div className="text-sm space-y-1">
            <p>{order.shippingAddress?.address}</p>
            <p>
              {order.shippingAddress?.city}, {order.shippingAddress?.country}
            </p>
            <p>ZIP: {order.shippingAddress?.zip}</p>
          </div>
        </div>
      </div>

      {/* Ordered Products - GRID Version */}
      <div className="card bg-base-200 p-4">
        <h3 className="font-semibold flex items-center gap-2 text-lg mb-4">
          <Package className="w-4 h-4" /> Ordered Products
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {order.products.map((p, i) => (
            <div
              key={i}
              className="card bg-base-100 border border-base-300 p-4 flex flex-col justify-between"
            >
              <div className="flex gap-3">
                <img
                  src={
                    p.product?.images?.[0]?.url ||
                    "https://via.placeholder.com/100"
                  }
                  alt={p.product?.title}
                  className="w-20 h-20 rounded-lg object-cover border"
                />
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-sm">{p.product?.title}</p>
                  <p className="text-xs text-gray-600">
                    Qty: {p.quantity} × ${p.product?.price?.toFixed(2)}
                  </p>
                  <p className="font-semibold text-sm text-gray-700">
                    Total: ${(p.quantity * p.product?.price).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div
                  className={`badge ${
                    p.status === "Delivered"
                      ? "badge-success"
                      : p.status === "Cancelled"
                      ? "badge-error"
                      : p.status === "Shipped"
                      ? "badge-info"
                      : "badge-warning"
                  } badge-sm`}
                >
                  {p.status}
                </div>

                <select
                  value={p.status}
                  onChange={(e) =>
                    handleItemStatus(p.product._id, e.target.value)
                  }
                  className="select select-bordered select-xs w-[110px]" // fixed width
                >
                  <option>Pending</option>
                
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="card bg-base-200 p-4 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2 text-lg mb-2">
            <CreditCard className="w-4 h-4" /> Payment Details
          </h3>
          <div className="text-sm space-y-1">
            <p>Method: {order.paymentMethod}</p>
            <p>Transaction ID: {order.paymentId || "N/A"}</p>
          </div>
        </div>
        <div className="text-right text-sm sm:text-base">
          <p>Subtotal: ${order.subtotal}</p>
          <p>Shipping: ${order.shipping || 0}</p>
          <p className="font-semibold text-lg sm:text-xl">
            Total: ${order.totalPrice}
          </p>
        </div>
      </div>

    </div>
  );
}
