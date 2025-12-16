import { useGetProductsQuery } from "../features/products/productSlice"
import LandingCard from "./product/LandingCard"
export default function TrendingProducts() {

    const {isLoading, isError, data} = useGetProductsQuery({sort:"trending", limit: 8})
    if(isLoading) return <p>LOading....</p>
   const {allProducts} = data


    return (
        <LandingCard name={"Trending Items"} products={allProducts}/>
    )
}