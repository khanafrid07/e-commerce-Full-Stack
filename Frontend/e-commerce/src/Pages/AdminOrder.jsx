import OrderData from "../components/OrderData"
import OrderFilter from "../components/OrderFilter"
import OrdersList from "../components/OrdersList"
export default function AdminOrder(){


    return(
        <div className="min-h-screen">
            
            <OrderData/>
            <OrderFilter/>
            <OrdersList/>
        </div>
    )
}