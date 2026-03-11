import { Heart, Star, Zap, Tags, ShoppingCart, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingCard({
  products = [],
  featured = false,
  trending = false,
  newArrival = false,
  product
}) {
  const [liked, setLiked] = useState({});
  const navigate = useNavigate();

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const productList = products && products.length > 0 ? products : product ? [product] : [];

  // Get badge config
  const getBadge = () => {
    if (featured) return { icon: Star, label: "Featured", color: "from-amber-400 to-amber-500", textColor: "text-white" };
    if (trending) return { icon: Zap, label: "Trending", color: "from-purple-500 to-pink-500", textColor: "text-white" };
    if (newArrival) return { icon: Tags, label: "New", color: "from-pink-400 to-rose-500", textColor: "text-white" };
    return null;
  };

  const badge = getBadge();
  const discountPercent = (basePrice) => Math.round(((basePrice * 1.3 - basePrice) / (basePrice * 1.3)) * 100);

  return (
    <div className="w-full">
      {productList.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-4 lg:gap-5">
          {productList.map((product) => (
            <div
            onClick={()=>navigate(`/products/${product._id}`)}
              key={product._id}
              className="group relative bg-white rounded-lg md:rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:border-purple-300 hover:shadow-2xl flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                
                {/* Badge */}
                {badge && (
                  <div className={`absolute  md:left-2 z-20 bg-gradient-to-r ${badge.color} ${badge.textColor} px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1 shadow-lg backdrop-blur-sm`}>
                    <badge.icon size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{badge.label}</span>
                  </div>
                )}

                {/* Discount Badge */}
                {product.basePrice && (
                  <div className="absolute top-2 right-0 md:right-2 z-20 bg-red-500 text-white font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs shadow-lg">
                    -{discountPercent(product.basePrice)}%
                  </div>
                )}

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(product._id)}
                  className="absolute bottom-2 md:right-2 z-20 bg-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-110 border border-gray-200"
                  title="Add to wishlist"
                >
                  <Heart
                    
                    className={`w-[1rem] h-[1rem] transition-all ${
                      liked[product._id]
                        ? "fill-red-500 text-red-500 scale-125"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  />
                </button>

                {/* Image */}
                <img
                  src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-2 sm:p-3 md:p-2 flex flex-col flex-grow justify-between gap-1.5 sm:gap-2 md:gap-1">
                
                {/* Title and Category */}
                <div>
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 line-clamp-1 sm:line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 sm:mt-1 hidden sm:flex items-center gap-0.5">
                    <Sparkles size={12} />
                    {product.category?.main || "Premium"}
                  </p>
                </div>
                 <div className="hidden sm:inline absolute right-4 bottom-4  md:bottom-10 opacity-70 hover:opacity-100">
                  <ShoppingCart className="md:w-10 md:h-10"/>
                </div>
                {/* Price Section */}
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{product.basePrice}
                    </span>
                    <span className="text-xs text-gray-400 line-through font-medium  sm:inline">
                      ₹{Math.round(product.basePrice * 1.3)}
                    </span>
                  </div>

               
                </div>

               
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
              <Tags className="text-purple-500" size={40} />
            </div>
            <h3 className="text-gray-800 font-bold text-lg">No Products Available</h3>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              Check back soon for amazing deals and exclusive products
            </p>
          </div>
        </div>
      )}
    </div>
  );
}