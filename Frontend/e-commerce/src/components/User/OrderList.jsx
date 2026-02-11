import { useState } from "react";
import { useGetOrdersQuery } from "../../features/orders/orderSlice";
import OrderCard from "./OrderCard";
import OrderTab from "./OrderTab";
export default function OrderList() {
  const { data: orders , isLoading, isError } = useGetOrdersQuery();
 

  if (isLoading) return <p className="text-center text-gray-500">Loading orders...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading orders</p>;

console.log(orders)

  return(
    <OrderTab orders={orders} />

  )
}