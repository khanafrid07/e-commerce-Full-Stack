import { useGetProductsQuery } from "../features/products/productSlice";
import LandingCard from "./product/LandingCard";
import { Zap, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
export default function TrendingProducts({ category, gender }) {
  const { isLoading, isError, data, refetch } = useGetProductsQuery({
    sort: "trending",
    limit: 8,
    category,
    gender
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-3 mx-auto" />
          <p className="text-gray-600 font-semibold">Loading trending products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-red-50 to-pink-100">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-600 font-semibold text-lg mb-4">Failed to load trending products</p>
        <button onClick={() => refetch()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  const { allProducts = [] } = data || {};

  return (
    <section className="relative overflow-hidden">



      <div className="bg-white overflow-hidden ">
        <div className=" ">
          <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>

            {allProducts.length > 0 ? (
              <LandingCard trending={true} products={allProducts} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-purple-500" size={40} />
                  </div>
                  <h3 className="text-gray-800 font-bold text-lg">No Trending Products</h3>
                  <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
                    Check back soon for trending items
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>


    </section >
  );
}