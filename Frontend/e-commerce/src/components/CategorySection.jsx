import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Sparkles, Zap, ArrowRight } from "lucide-react";
import Accessories from "../assets/Accessories.png";
import Beauty from "../assets/Beauty.png";
import Fashion from "../assets/Fashion.png";
import Footwear from "../assets/Footwear.png";

export default function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    { img: Fashion, label: "Fashion", icon: ShoppingBag, color: "from-purple-500 to-pink-500" },
    { img: Beauty, label: "Beauty", icon: Sparkles, color: "from-pink-500 to-rose-500" },
    { img: Accessories, label: "Accessories", icon: ShoppingBag, color: "from-blue-500 to-cyan-500" },
    { img: Footwear, label: "Footwear", icon: Zap, color: "from-orange-500 to-red-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <section className="relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 -z-10" />

      <div className="max-w-9xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8  ">
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 font-semibold text-xs sm:text-sm border border-purple-200">
            <Sparkles size={16} className="sm:w-4 sm:h-4" />
            Shop Categories
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">
            Explore By Category
          </h2>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Discover our curated collections across fashion, beauty, accessories, and footwear
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/category/${cat.label}`)}
                className="group cursor-pointer"
              >
                <div className="relative h-32 sm:h-56 md:h-64 lg:h-80 rounded-lg sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 group-hover:to-black/90 transition-all duration-500" />

                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  <div className="absolute inset-0 flex flex-col items-center justify-end p-3 sm:p-4 md:p-5 lg:p-6 z-10">
                    <div className={`mb-2 sm:mb-3 bg-gradient-to-br ${cat.color} p-2 sm:p-2.5 md:p-3 rounded-full transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                      <Icon  size={20} className="w-4 text-white h-4 sm:w-6 sm:h-6" />
                    </div>

                    <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-black text-center mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-500">
                      {cat.label}
                    </h3>

                    <motion.div
                      className="flex items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      Explore
                      <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm sm:text-base rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto max-w-xs">
            View All Categories
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
