import { useGetProductsQuery } from "../../../features/products/productSlice"
import LandingCard from "../LandingCard"
export default function SuggestedProduct({product}){
   if(!product) return <p>No products</p>

   const {data, isLoading, isError} = useGetProductsQuery({category:product.category.main, sub:product.category.sub, gender:product.category.gender})
   if(isLoading) return <p>Loading...</p>
   if(isError) return <p>Error </p>
   const{allProducts} =data
   const similarProduct = allProducts.filter((p)=>p._id!==product._id)
   console.log("similar",similarProduct)

    return(
        <div className="border rounded-lg shadow-ms w-[100%] bg-base-100 mt-4">
            <h2 className="font-semibold  text-center text-2xl text-base-content">Related & Similar Products</h2>
          

                <LandingCard products={similarProduct}/>
                
           
           

        </div>
    )
}