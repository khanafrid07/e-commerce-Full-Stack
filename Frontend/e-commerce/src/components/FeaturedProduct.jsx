import { useGetProductsQuery } from "../features/products/productSlice.js";
import LandingCard from "./product/LandingCard.jsx";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
export default function FeaturedProduct() {
  const [group, setGroup] = useState(0);
  const { data, isLoading, isError } = useGetProductsQuery({ sort: "featured", limit: 12 });
  const allProducts = data?.allProducts || [];

  let groupSize = 2;
  const totalGroup = Math.ceil(allProducts.length / groupSize);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setGroup(prev => (prev + 1) % totalGroup);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalGroup]);

  const visibleProduct = allProducts.slice(group * groupSize, group * groupSize + groupSize);

  // Swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const deltaX = touchEndX.current - touchStartX.current;

    if (deltaX > 50) {
      setGroup(prev => (prev - 1 + totalGroup) % totalGroup);
    } else if (deltaX < -50) {
      setGroup(prev => (prev + 1) % totalGroup);
    }
  };

  const handlePrevious = () => {
    setGroup(prev => (prev - 1 + totalGroup) % totalGroup);
  };

  const handleNext = () => {
    setGroup(prev => (prev + 1) % totalGroup);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-purple-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading featured products...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 py-16 bg-gradient-to-br from-red-50 to-pink-100">
        <p className="font-semibold text-lg">Failed to load featured products</p>
      </div>
    );

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-2000" />

      <div className="max-w-9xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        {/* Header Section */}
     

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Main carousel */}
          <div
            className="bg-gradient-to-r from-blue-200 to-pink-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
               <div className="text-center ">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mt-3 font-semibold text-sm">
            <Sparkles size={18} />
            Curated Selection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Discover our handpicked collection of premium products selected just for you
          </p>
        </div>
            <div className="p-4 sm:p-6 md:p-6 lg:p-8">
              <motion.div initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} transition={{duration:1.3}}>
              <LandingCard featured products={visibleProduct} />

              </motion.div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Previous product"
          >
            <ChevronLeft className="text-purple-600" size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Next product"
          >
            <ChevronRight className="text-purple-600" size={24} />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {Array.from({ length: totalGroup }).map((_, index) => (
            <button
              key={index}
              onClick={() => setGroup(index)}
              className={`transition-all duration-300 rounded-full ${
                index === group
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 w-8 h-3"
                  : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>

        {/* Optional: Product counter */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-purple-600">{group + 1}</span> of{" "}
            <span className="font-semibold">{totalGroup}</span> products
          </p>
        </div>
      </div>
    </section>
  );
}
