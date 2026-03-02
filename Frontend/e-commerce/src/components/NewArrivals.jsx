import { useGetProductsQuery } from "../features/products/productSlice"
import LandingCard from "./product/LandingCard"
export default function NewArrivals() {

    const {isLoading, isError, data} = useGetProductsQuery({sort:"newest", limit: 8})
    if(isLoading) return <p>LOading....</p>
    if(data){
         const {allProducts} = data
   console.log(data)
        
    return (
        <div className="flex justify-center flex-col gap-4 bg-red-100 shadow-md">
            <h2 className="text-center font-semibold text-2xl">New Arrivals</h2>

            <LandingCard newArrival = {true} name={"New Arrivals"} products={allProducts}/>
        </div>
    )
}
    }
  

