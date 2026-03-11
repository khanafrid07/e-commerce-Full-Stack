import { useGetProductsQuery } from "../features/products/productSlice";
import LandingCard from "./product/LandingCard";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";

export default function NewArrivals() {
  const { isLoading, isError, data, refetch } = useGetProductsQuery({
    sort: "newest",
    limit: 8,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mb-3 mx-auto" />
          <p className="text-gray-600 font-semibold">Loading new arrivals...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-red-50 to-orange-100">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-600 font-semibold text-lg mb-4">Failed to load new arrivals</p>
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
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 -z-10" />

      {/* Decorative blob elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-4000" />

      <div className="max-w-9xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Header Section */}
        <div className=" mb-4">
          <div className="inline-flex   gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
            <Sparkles size={18} />
            Just Arrived
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            New Arrivals
          </h2>

          {/* <p className="text-gray-600 text-sm md:text-base max-w-2xl ">
            Discover the latest additions to our collection. Fresh styles and exclusive items just for you
          </p> */}
        </div>

        {/* Products Container */}
        <div className="relative bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-orange-100/50">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-200/30 to-transparent rounded-full blur-3xl -z-5" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-yellow-200/20 to-transparent rounded-full blur-3xl -z-5" />

          <div className="p-4 sm:p-6 md:p-8 lg:p-12 relative">
            {allProducts.length > 0 ? (
              <LandingCard newArrival={true} products={allProducts} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-orange-500" size={40} />
                  </div>
                  <h3 className="text-gray-800 font-bold text-lg">No New Arrivals Yet</h3>
                  <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
                    Check back soon for exciting new products
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-orange-600">{allProducts.length}</span> new products available
          </p>
        </div>
      </div>
    </section>
  );
}

