import { useGetProductsQuery } from "../productSlice";
import LandingCard from "../components/LandingCard";
import { History, Loader2, AlertCircle } from "lucide-react";

export default function ViewedProduct() {
  const recentProducts = JSON.parse(localStorage.getItem("recentProducts")) || [];

  if (recentProducts.length === 0) return null;

  const categories = [...new Set(recentProducts.map((p) => p.category))];
  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    categories: categories.join(","),
    limit: 12,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-3 mx-auto" />
          <p className="text-gray-600 font-semibold">Loading suggestions...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-red-50 to-orange-100">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-600 font-semibold text-lg mb-4">Failed to load suggestions</p>
        <button onClick={() => refetch()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  const { allProducts = [] } = data || {};

  if (allProducts.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 -z-10" />

      {/* Decorative blob elements */}
      <div className="absolute top-32 left-10 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob" />
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        {/* Header Section */}
        <div className="text-center ">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
            <History size={18} />
            Your Recent Picks
          </div>

        </div>

        {/* Products Container */}
        <div className="relative bg-gradient-to-br from-indigo-100 pt-12 px-4 pb-2 via-cyan-100 to-blue-100 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-cyan-100/50">

          <h2 className="text-lg text-center sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent  absolute inset-0">
            Recently Viewed
          </h2>

          <p className="text-gray-600 text-sm md:text-base text-center max-w-2xl mx-auto mb-2">
            Continue shopping from items you've recently viewed. Find exactly what you were looking for
          </p>
          <div className="bg-white rounded-2xl">

            <div className=" sm:p-6 md:p-8 lg:p-12 relative">
              {allProducts.length > 0 ? (
                <LandingCard products={allProducts} />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                      <History className="text-blue-500" size={40} />
                    </div>
                    <h3 className="text-gray-800 font-bold text-lg">No Recent Products</h3>
                    <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
                      Start viewing products to see recommendations here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>


        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-blue-600">{allProducts.length}</span> suggestions based on your browsing
          </p>
        </div>
      </div>
    </section>
  );
}
