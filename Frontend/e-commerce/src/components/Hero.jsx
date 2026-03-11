import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-screen sm:h-[600px] md:h-[650px] lg:h-screen max-h-[850px] flex items-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 " />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 -z-5" />

        {/* Animated Blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center h-full">
              {/* Left Content */}
              <motion.div
                className="space-y-6 md:space-y-8 text-white py-12 sm:py-16"
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full w-fit font-semibold text-sm border border-white/40"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles size={18} />
                  Limited Time Offer
                </motion.div>

                {/* Main Headline */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                    Big Flash Sale
                  </h1>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                    Up to 70% OFF
                  </p>
                </motion.div>

                {/* Description */}
                <motion.p
                  className="text-base sm:text-lg text-white/90 leading-relaxed max-w-md"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  Discover amazing deals on fashion, beauty, accessories, and footwear. Limited stocks available - grab yours before they're gone!
                </motion.p>

                {/* Highlights */}
                <motion.div
                  className="grid grid-cols-2 gap-4 py-4"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold">2000+</p>
                    <p className="text-xs text-white/80">Products On Sale</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 text-center">
                    <p className="text-xl font-bold">⏰ 72hrs</p>
                    <p className="text-xs text-white/80">Offer Ends Soon</p>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl text-base sm:text-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Shop Now
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </motion.button>

                  <motion.button
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 text-base sm:text-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Categories
                  </motion.button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  className="flex flex-col gap-3 pt-6 border-t border-white/20"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Free Shipping</p>
                      <p className="text-xs text-white/80">Orders above $50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Zap size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">2-3 Days Delivery</p>
                      <p className="text-xs text-white/80">Fast & Reliable</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Content - Decorative */}
              <motion.div
                className="hidden lg:flex items-center justify-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Large Sale Badge */}
                <motion.div
                  className="relative w-80 h-80 md:w-96 md:h-96"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {/* Outer Ring */}
                  <div className="absolute inset-0 border-8 border-white/20 rounded-full" />
                  
                  {/* Middle Ring */}
                  <div className="absolute inset-4 border-4 border-white/30 rounded-full" />

                  {/* Center Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.p
                        className="text-white/80 text-xl font-semibold mb-2"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Exclusive Deal
                      </motion.p>
                      <p className="text-7xl font-black text-white">70%</p>
                      <p className="text-xl text-yellow-200 font-bold mt-2">OFF</p>
                      <p className="text-sm text-white/80 mt-4">On Selected Items</p>
                    </div>
                  </div>

                  {/* Floating Dots */}
                  <motion.div
                    className="absolute w-8 h-8 bg-yellow-300 rounded-full"
                    style={{ top: "10%", right: "10%" }}
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute w-6 h-6 bg-pink-300 rounded-full"
                    style={{ bottom: "15%", left: "10%" }}
                    animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute w-5 h-5 bg-purple-300 rounded-full"
                    style={{ top: "30%", left: "-5%" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">Scroll to Explore</p>
          <svg
            className="w-5 h-5 text-white/70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
