import { useMemo, useState } from "react"
import OrderData from "../components/OrderData"
import OrderFilter from "../components/OrderFilter"
import OrdersList from "../components/OrdersList"
import { useGetOrdersQuery } from "../features/orders/orderSlice"

export default function AdminOrder(){

  const { data = [], isLoading, isError } = useGetOrdersQuery()
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredData = useMemo(() => {

    if(filterStatus === "All") return data

    return data.filter(order =>
      order.status?.toLowerCase() === filterStatus.toLowerCase()
    )

  }, [filterStatus, data])

  if(isLoading) return <p>Orders are Loading...</p>
  if(isError) return <p>Error loading orders</p>

  return(
    <div className="min-h-screen">

      <OrderData/>

      <OrderFilter onStatusChange={setFilterStatus}/>

      {filteredData.length === 0
        ? <p className="text-center p-4">No orders found</p>
        : <OrdersList data={filteredData}/>
      }

    </div>
  )
}