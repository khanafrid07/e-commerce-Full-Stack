import DeliverySteps from "./DeliverySteps";
import OrderList from "./OrderList.jsx";
import { useGetOrdersQuery } from "../../features/orders/orderSlice.js";

export default function Order() {
  const { data, isLoading, isError } = useGetOrdersQuery(); // ✅ inside component



  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading orders...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error fetching orders
      </div>
    );

  return (
    <div>
      <OrderList/>
    </div>
  );
}
