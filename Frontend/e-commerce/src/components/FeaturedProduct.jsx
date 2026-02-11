import { useGetProductsQuery } from "../features/products/productSlice.js";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LandingCard from "./product/LandingCard.jsx";

export default function FeaturedProduct() {
  const { data, isLoading, isError } = useGetProductsQuery({sort:"featured", limit: 4});
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 py-10">Failed to load products.</p>;
 const {allProducts} = data


    return (
      <LandingCard name={"Feautred Items"} products={allProducts}/>
    )

  
  
}
