import { Heart, Star, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingCard({
  products = [],
  name = "Featured Products",
}) {
  const [liked, setLiked] = useState({});
  const navigate = useNavigate();

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-white px-4 py-14 md:py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2 text-purple-600 mb-3">
          <Zap size={20} />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Exclusive Collection
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2">
          {name}
        </h2>

        <p className="text-slate-500 text-base md:text-lg">
          Discover our handpicked selection of premium products
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-2xl border border-gray-200 hover:border-purple-300 transition shadow-sm hover:shadow-lg flex flex-col"
          >
            {/* Image */}
            <div className="relative h-56 md:h-64 overflow-hidden rounded-t-2xl bg-gray-100">
              <span className="absolute top-4 left-4 z-10 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star size={14} /> Featured
              </span>

              <button
                onClick={() => toggleLike(product._id)}
                className="absolute top-4 right-4 z-10 bg-white p-2.5 rounded-full border hover:scale-110 transition"
              >
                <Heart
                  size={18}
                  className={
                    liked[product._id]
                      ? "fill-pink-500 text-pink-500"
                      : "text-gray-700"
                  }
                />
              </button>

              <img
                src={
                  product.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                }
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-semibold text-base md:text-lg text-slate-900 line-clamp-2 mb-2 group-hover:text-purple-600 transition">
                {product.title}
              </h3>

              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-purple-600">
                    ₹{product.basePrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{Math.round(product.basePrice * 1.3)}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="w-full py-3 text-base font-semibold rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <p className="text-center text-slate-400 mt-16 text-lg">
          No products available
        </p>
      )}
    </section>
  );
}
