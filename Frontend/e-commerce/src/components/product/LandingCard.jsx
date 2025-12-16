import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingCard({products, name}){
    const navigate = useNavigate()
    
      return (
        <section className="px-4 py-14 bg-gradient-to-b from-gray-100 to-gray-50">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-10">
            {name}
          </h2>
    
          {/* Grid */}
          <div
            className="
              grid 
              grid-cols-2 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-6
              px-2 sm:px-6
            "
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="
                  bg-white 
                  rounded-xl 
                  shadow-md 
                  overflow-hidden 
                  group 
                  transition-all 
                  duration-300 
                  hover:shadow-2xl 
                  hover:-translate-y-1
                  relative
                "
              >
                {/* 🔖 Featured Ribbon */}
                <span
                  className="
                    absolute top-4 left-[-28px] 
                    bg-pink-600 text-white text-sm font-semibold 
                    px-10 py-1 
                    rotate-[-45deg]
                    shadow-md
                  "
                >
                  FEATURED
                </span>
    
                {/* Wishlist */}
                <button
                  className="
                    absolute 
                    top-3 right-3 
                    bg-white/70 
                    backdrop-blur-md
                    p-2 
                    rounded-full 
                    shadow 
                    hover:bg-pink-500 
                    hover:text-white 
                    transition
                    z-10
                  "
                >
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
    
                {/* Image */}
                <div className="relative w-full h-72 overflow-hidden">
                  <img
                    src={product.images[0]?.url}
                    alt={product.title}
                    className="
                      w-full 
                      h-full 
                      object-cover 
                      transition-transform 
                      duration-500 
                      group-hover:scale-110
                    "
                  />
                </div>
    
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                    {product.title}
                  </h3>
    
                  <p className="text-pink-600 font-bold text-xl mb-4">
                    ₹{product.basePrice}
                  </p>
    
                  {/* 👉 View Details Button */}
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="
                      w-full 
                      py-2 
                      bg-gradient-to-r 
                      from-purple-500 
                      to-pink-500
                      text-white 
                      rounded-lg 
                      font-semibold 
                      transition 
                      duration-300 
                      hover:opacity-90
                      active:scale-95
                    "
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }
    
