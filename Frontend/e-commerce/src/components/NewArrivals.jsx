import { useGetProductsQuery } from "../features/products/productSlice"
import LandingCard from "./product/LandingCard"
export default function NewArrivals() {

    const {isLoading, isError, data} = useGetProductsQuery({sort:"newest", limit: 8})
    if(isLoading) return <p>LOading....</p>
    if(data){
         const {allProducts} = data
   console.log(data)
        
    return (
        <LandingCard name={"New Arrivals"} products={allProducts}/>
    )
}
    }
  

