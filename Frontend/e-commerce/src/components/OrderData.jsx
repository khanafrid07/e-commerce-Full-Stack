import { useGetOrdersQuery } from "../features/orders/orderSlice";

export default function OrderData() {
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery();

  if (isLoading) return <p className="p-4 text-gray-500">Loading orders...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load orders.</p>;

  const getOrdersByStatus = (status) =>
    orders.filter(
      (order) => order.status?.toLowerCase() === status.toLowerCase()
    );

  const pendingOrders = getOrdersByStatus("Pending");
  const deliveredOrders = getOrdersByStatus("Delivered");
  const cancelledOrders = getOrdersByStatus("Cancelled");

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {/* 👇 Responsive grid: 2 cards per row on mobile, 4 on large */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Orders */}
        <div className="p-3 sm:p-4 bg-gray-100 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-medium text-sm sm:text-base">Total Orders</h3>
          <p className="text-lg sm:text-xl font-bold mt-1">
            {orders.length || "N/A"}
          </p>
        </div>

        {/* Pending Orders */}
        <div className="p-3 sm:p-4 bg-yellow-100 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-medium text-sm sm:text-base">Pending Orders</h3>
          <p className="text-lg sm:text-xl font-bold mt-1">
            {pendingOrders.length || "N/A"}
          </p>
        </div>

        {/* Completed Orders */}
        <div className="p-3 sm:p-4 bg-green-100 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-medium text-sm sm:text-base">Completed Orders</h3>
          <p className="text-lg sm:text-xl font-bold mt-1">
            {deliveredOrders.length || "N/A"}
          </p>
        </div>

        {/* Cancelled Orders */}
        <div className="p-3 sm:p-4 bg-red-100 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-medium text-sm sm:text-base">Cancelled Orders</h3>
          <p className="text-lg sm:text-xl font-bold mt-1">
            {cancelledOrders.length || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
