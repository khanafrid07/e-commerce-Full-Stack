import { useGetProductsQuery } from "../features/products/productSlice"
import LandingCard from "./product/LandingCard"
import { Zap } from "lucide-react"
export default function TrendingProducts() {

    const {isLoading, isError, data} = useGetProductsQuery({sort:"trending", limit: 8})
    if(isLoading) return <p>LOading....</p>
   if(data){
    const {allProducts} = data
    return (
        <section>
        <div className="flex items-center flex-col gap-4">
            <span className="flex items-center">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-400 via-indigo-600 to-red-500 bg-clip-text text-transparent">Trending Items</h2>
            
            <Zap color="indigo"/>
            </span>
            <h3 className="text-2xl font-semibold">“What everyone is loving right now”</h3>
            <LandingCard trending = {true} name={"Trending Items"} products={allProducts || []}/>
            

        </div>

        </section>
    )
 }
   }

