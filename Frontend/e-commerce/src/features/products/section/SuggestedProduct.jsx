import { useGetProductsQuery } from "../productSlice"
import LandingCard from "../components/LandingCard"
export default function SuggestedProduct({ product }) {
    if (!product) return <p>No products</p>

    const { data, isLoading, isError } = useGetProductsQuery({ category: product.category.main })
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error </p>
    const { allProducts } = data
    const similarProduct = allProducts.filter((p) => p._id !== product._id)


    return (
        <div className="w-[100%] bg-base-100 mt-4">
            <h2 className="font-semibold py-4  text-2xl md:text-3xl text-base-content">Related & Similar Products</h2>


            <LandingCard products={similarProduct} />




        </div>
    )
}