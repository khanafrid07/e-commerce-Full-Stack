import { useGetProductsQuery } from "../features/products/productSlice.js";
import LandingCard from "./product/LandingCard.jsx";
import { useEffect, useState, useRef } from "react";

export default function FeaturedProduct() {
  const [group, setGroup] = useState(0);
  const { data, isLoading, isError } = useGetProductsQuery({ sort: "featured", limit: 12 });
  const allProducts = data?.allProducts || [];

  let groupSize = 1; // desktop default
  const totalGroup = Math.ceil(allProducts.length / groupSize);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setGroup(prev => (prev + 1) % totalGroup);
    }, 3000);
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
      // swipe right → previous group
      setGroup(prev => (prev - 1 + totalGroup) % totalGroup);
    } else if (deltaX < -50) {
      // swipe left → next group
      setGroup(prev => (prev + 1) % totalGroup);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 py-10">Failed to load products.</p>;

  return (
    <section>
      <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
        <h2 className="text-2xl font-bold mb-4">Featured Product</h2>

        <div
          className="w-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <LandingCard featured products={visibleProduct} />
        </div>

        <div className="flex gap-2 items-center mt-4">
          {Array.from({ length: totalGroup }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full shrink-0 transition-transform duration-300 ${
                index === group ? "bg-purple-600 scale-150" : "bg-gray-400 hover:scale-125"
              }`}
              onClick={() => setGroup(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
