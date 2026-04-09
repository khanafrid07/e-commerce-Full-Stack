import { useGetProductsQuery } from "../features/products/productSlice";
import LandingCard from "./product/LandingCard";
import {ArrowRight, Zap, Loader2, AlertCircle } from "lucide-react";
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


  const { allProducts = [] } = data || {};

  return (
    <section className="relative px-4 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-14 gap-2">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl  tracking-tight text-base-content mb-2 sm:mb-4">
            Most Popular
          </h2>
          <p className="text-base-content/60 text-sm sm:text-xl font-light">
            The pieces everyone is talking about.
          </p>
        </div>
        <button className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-base-content hover:text-primary transition-colors flex items-center gap-2 group w-fit">
          View All
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>


      <div className="bg-white ">
        <div className=" ">
          <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>

            {allProducts.length > 0 ? (
              <LandingCard trending={true} products={allProducts} />
            ) : (
              <div className="flex flex-col items-center justify-center ">
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