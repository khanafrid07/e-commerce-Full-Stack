import { Star, Zap, Tags } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingCard({
  products = [],
  featured = false,
  trending = false,
  newArrival = false,
  product,
}) {
  const navigate = useNavigate();

  const productList =
    products?.length > 0 ? products : product ? [product] : [];

  const getBadge = () => {
    if (featured)
      return {
        icon: Star,
        label: "Featured",
        color: "from-amber-400 to-amber-500",
      };
    if (trending)
      return {
        icon: Zap,
        label: "Trending",
        color: "from-purple-500 to-pink-500",
      };
    if (newArrival)
      return {
        icon: Tags,
        label: "New",
        color: "from-pink-400 to-rose-500",
      };
    return null;
  };

  const badge = getBadge();

  if (!productList.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
            <Tags className="text-purple-500" size={40} />
          </div>
          <h3 className="text-gray-800 font-bold text-lg">
            No Products Available
          </h3>
          <p className="text-gray-500 text-sm mt-2 max-w-xs">
            Check back soon for amazing deals
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ✅ RESPONSIVE GRID FIX */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {productList.map((item) => {
          const image =
            item?.images?.[0]?.url ||
            "https://via.placeholder.com/300";

          const hasDiscount = item?.discountPrice;

          return (
            <div
              key={item._id}
              onClick={() => navigate(`/products/${item._id}`)}
              className="group cursor-pointer bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Image */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={item?.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                {badge && (
                  <div
                    className={`absolute top-2 left-2 bg-gradient-to-r ${badge.color} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow`}
                  >
                    <badge.icon size={12} />
                    <span className="hidden sm:inline">
                      {badge.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2 flex flex-col gap-1">
                <h3 className="text-xs font-medium text-gray-800 line-clamp-2 group-hover:text-purple-600 transition">
                  {item?.title}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-1.5">
                  {hasDiscount ? (
                    <>
                      <span className="text-sm font-bold text-purple-600">
                        ₹{item.discountPrice}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-bold text-purple-600">
                      ₹{item?.price || item?.basePrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}