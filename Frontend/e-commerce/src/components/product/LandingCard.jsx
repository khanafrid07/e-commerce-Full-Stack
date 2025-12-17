import { Heart, Star, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingCard({ products = [], name = "Featured Products" }) {
  const [liked, setLiked] = useState({});
  const navigate = useNavigate()
  
  const toggleLike = (id) => {
    setLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleNavigate = (id) => {
    console.log(`Navigate to product: ${id}`);
    navigate(`/products/${id}`)
  };

  return (
    <section className="bg-white px-4 py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-purple-600" />
          <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
            Exclusive Collection
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
          {name}
        </h2>
        <p className="text-slate-600 text-lg">
          Discover our handpicked selection of premium products
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="group relative h-full"
          >
            {/* Card Container */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 transition-all duration-500 h-full flex flex-col hover:shadow-xl hover:shadow-purple-200/50">
              
              {/* Image Container */}
              <div className="relative w-full h-80 overflow-hidden bg-gray-100">
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> Hot
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleLike(product._id)}
                  className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 p-3 rounded-full transition-all duration-300 group-hover:scale-110 border border-gray-300 hover:border-pink-400"
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                      liked[product._id]
                        ? "fill-pink-500 text-pink-500"
                        : "text-gray-700 hover:text-pink-400"
                    }`}
                  />
                </button>

                {/* Image */}
                <img
                  src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-all duration-300">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  Premium quality product with exceptional features
                </p>

                {/* Price */}
                <div className="mb-auto pt-2 border-t border-gray-200">
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{product.basePrice}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{Math.round(product.basePrice * 1.3)}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleNavigate(product._id)}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50 uppercase text-sm tracking-wide"
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
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-slate-400 text-lg">No products available</p>
        </div>
      )}
    </section>
  );
}