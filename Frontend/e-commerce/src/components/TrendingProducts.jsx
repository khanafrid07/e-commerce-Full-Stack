import { useGetProductsQuery } from "../features/products/productSlice";
import LandingCard from "./product/LandingCard";
import { Zap, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
export default function TrendingProducts() {
  const { isLoading, isError, data, refetch } = useGetProductsQuery({
    sort: "trending",
    limit: 8,
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
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 -z-10" />

      {/* Decorative blob elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-4000" />

      <div className="max-w-9xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
            <Zap size={18} />
            On Fire Right Now
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Trending Products
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Discover what's trending now! These are the hottest items everyone is loving and adding to their carts
          </p>
        </div>

        {/* Products Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-2 sm:p-2 md:p-8 lg:p-12">
            <motion.div initial={{x:50, opacity:0}} whileInView={{x:0, opacity:1}} transition={{duration: 0.6}}>

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

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-purple-600">{allProducts.length}</span> trending products available
          </p>
        </div>
      </div>
    </section>
  );
}