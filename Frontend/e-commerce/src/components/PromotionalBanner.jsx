import { ArrowRight, Zap, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PromotionalBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 -z-10" />

      {/* Decorative blur elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-5 animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-5 animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 text-white z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-white/30">
              <Zap size={18} />
              Limited Time Offer
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Flat <span className="text-yellow-300">50% OFF</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-white/90 mb-2 font-semibold">
              On your favorite products!
            </p>

            {/* Description */}
            <p className="text-white/75 text-base md:text-lg mb-8 max-w-md">
              Don't miss out on this amazing deal. Shop now and save big on thousands of items across all categories.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/products")}
              className="group inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              Shop Now
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Additional Info */}
            <p className="text-white/60 text-sm mt-6">
              ✓ Free shipping on orders above $50 | ✓ Easy returns
            </p>
          </div>

          {/* Right Content - Graphic Element */}
          <div className="flex-1 relative z-10 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-sm">
              {/* Main circle with offer */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-2xl flex items-center justify-center animate-pulse">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Gift size={48} className="text-white" />
                  </div>
                  <div className="text-5xl font-black text-white">50%</div>
                  <div className="text-white text-lg font-bold">Off</div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-12 right-0 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg animate-bounce">
                <span className="font-bold text-purple-600 text-sm">Flash Sale</span>
              </div>
              <div className="absolute bottom-12 left-0 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg animate-bounce animation-delay-1000">
                <span className="font-bold text-pink-600 text-sm">Today Only</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-white/20 z-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-300">2K+</div>
            <p className="text-white/75 text-sm">Products Discounted</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-300">50%</div>
            <p className="text-white/75 text-sm">Average Savings</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-300">⏰</div>
            <p className="text-white/75 text-sm">Limited Offer</p>
          </div>
        </div>
      </div>
    </section>
  );
}