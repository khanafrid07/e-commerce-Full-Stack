import { useGetProductsQuery } from "../features/products/productSlice";
import LandingCard from "./product/LandingCard";
import { MoveRight } from "lucide-react";
export default function ViewedProduct() {
  const recentProducts = JSON.parse(localStorage.getItem("recentProducts")) || [];
console.log(recentProducts, "recent")
  if (recentProducts.length === 0) return null;
  const categories = [...new Set(recentProducts.map(p => p.category))];
  console.log("all cat", categories)

  const { data, isLoading, error } = useGetProductsQuery({
    categories: categories.join(","), // backend accepts array now
    limit: 12,
  });
  console.log("data get", data)

  if (isLoading) return <p>Loading suggestions...</p>;
  if (error || !data) return null;

  // const viewedIds = recentProducts.map(p => p.id);
  // console.log(viewedIds, "ids")

  // const suggestedProducts = data.allProducts.filter(
  //   p => !viewedIds.includes(p._id)
  // );
  // console.log("sugg", suggestedProducts)

  // if (suggestedProducts.length === 0) return null;
  const {allProducts} = data

  return (
    <div className=" flex justify-center items-center  flex-wrap gap-2 bg-blue-200 p-4">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed </h2>
    
    <div className="my-4 mx-4 ml-8">
      <LandingCard products={allProducts} />

    </div>
    
      
      <div className=" bg-white/50 border rounded-full p-2  hover:scale-110 transition">
      <MoveRight size={40} />

      </div>
    </div>
  );
}
