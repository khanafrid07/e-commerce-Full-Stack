import { useParams, useNavigate } from "react-router-dom";
import { useSingleOrderQuery, useUpdateOrderMutation } from "../features/orders/orderSlice";
import { ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import {OrderItems, OrderHeader, PaymentInfo, ShippingAddress, PriceSummary, CustomerInfo} from "../components/OrderDetails/index"
export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useSingleOrderQuery(id);
  const [updateOrder] = useUpdateOrderMutation();

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-3" />
        <p className="text-gray-600 font-semibold">Loading order details...</p>
      </div>
    );
  }

  // Error State
  if (isError || !order) {
    return (
      <div className="flex flex-col justify-center items-center h-96 bg-gradient-to-br from-red-50 to-pink-100">
        <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
        <p className="text-red-600 font-semibold">Error loading order</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    );
  }

  // Handle product status update
  const handleItemStatusChange = async (productId, newStatus) => {
    await updateOrder({
      orderId: order._id,
      productid: productId,
      status: newStatus,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm btn-ghost gap-2 mb-2"
        >
          <ChevronLeft size={18} /> Back to Orders
        </button>

        {/* Order Header */}
        <OrderHeader order={order} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Info */}
          <div className="space-y-6">
            <CustomerInfo user={order.user} />
            <ShippingAddress address={order.shippingAddress} />
            <PaymentInfo order={order} />
          </div>

          {/* Right Column - Price & Products Summary */}
          <div className="lg:col-span-2 space-y-6">
            <PriceSummary
              subtotal={order.totalPrice}
              shipping={order.shipping}
              total={order.totalPrice}
            />
            <OrderItems products={order.products} onStatusChange={handleItemStatusChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
