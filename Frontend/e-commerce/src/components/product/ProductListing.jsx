import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { useGetProductsQuery } from "../../features/products/productSlice";
import FilterSidebar from "./FilterSidebar";
import LandingCard from "./LandingCard";

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filters = {
    category: searchParams.get("category") || "",
    gender:   searchParams.get("gender")   || "",
    type:     searchParams.get("type")     || "",
    sort:     searchParams.get("sort")     || "",
    discount: searchParams.get("discount") || "",
    search:   searchParams.get("search")   || "",
  };

  function handleChange(key, value) {
    const p = new URLSearchParams(searchParams);
    if (key === "category") { 
      p.delete("type"); 
      if (value === "beauty") p.delete("gender"); 
    }
    if (key === "gender") { 
      p.delete("type"); 
    }
    if (key === "price") {
      // Convert price filter to sort parameter
      p.delete("sort");
      if (value === "low") {
        p.set("sort", "priceLow");
      } else if (value === "high") {
        p.set("sort", "priceHigh");
      }
    } else {
      value ? p.set(key, value.toLowerCase()) : p.delete(key);
    }
    setSearchParams(p);
  }


  const { data, isLoading } = useGetProductsQuery(Object.fromEntries(searchParams));
  console.log(data, "data comds")

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-sm text-gray-400 animate-pulse">Loading products...</span>
    </div>
  );
  if (!data) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">

      <FilterSidebar
        filters={filters}
        onChange={handleChange}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 p-5 md:p-7">
        {/* Mobile filter trigger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-full mb-5 hover:border-gray-400 transition-colors"
        >
          <SlidersHorizontal size={14} />
          Filters
          {Object.values(filters).filter(Boolean).length > 0 && (
            <span className="ml-1 bg-gray-900 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {Object.values(filters).filter(Boolean).length}
            </span>
          )}
        </button>
        {searchParams.get("search")&&<p className="italic mb-4 opacity-50">Search results for {searchParams.get("search")} {data?.allProducts?.length} found.</p>}

        <LandingCard products={data.allProducts} />
      </main>
    </div>
  );
}