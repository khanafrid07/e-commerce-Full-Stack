import { useGetProductsQuery } from "../features/products/productSlice";
import ProductCard from "./product/ProductCard";
import { ArrowRight, Loader2, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function FeaturedProduct() {
  const { isLoading, isError, data } = useGetProductsQuery({
    sort: "featured",
    limit: 10,
  });

  const scrollRef = useRef();
  const { allProducts = [] } = data || {};

  const scroll = (dir) => {
    if (!scrollRef.current) return;

    const width = scrollRef.current.clientWidth;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="space-y-6 py-4 px-4 sm:px-6 md:px-8">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold">Featured</h2>
          <p className="text-base-content/60 text-sm sm:text-base">
            The pieces everyone is talking about.
          </p>
        </div>

        <button className="text-sm font-semibold flex items-center gap-2 group">
          View All
          <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
        </button>
      </div>

      {/* Scroll Section */}
      <div className="relative group">

        {/* Products Row */}
        <div
          ref={scrollRef}
          className="flex overflow-hidden py-2 gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {allProducts.length > 0 ? (
            allProducts.map((product) => (
              <div
                key={product._id}
                className="min-w-[200px] sm:min-w-[220px] md:min-w-[240px] flex-shrink-0 h-72 sm:h-80"
              >
                <ProductCard product={product} featured={true}/>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-10">
              <Zap className="text-purple-500 mb-3" size={32} />
              <p className="text-gray-500">No Featured Products</p>
            </div>
          )}
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronRight />
        </button>

      </div>
    </section>
  );
}