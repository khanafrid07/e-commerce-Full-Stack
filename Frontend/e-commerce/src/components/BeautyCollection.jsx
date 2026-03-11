import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import beautyBanner from "../assets/beautyBanner.png";
import Beauty from "../assets/Beauty.png";

export default function BeautyCollection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 -z-10" />

            <div className="relative h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-5" />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                  Radiant <br /> Beauty, <br /> Naturally <br /> You.
                </h3>
              </motion.div>

              <div className="absolute bottom-0 right-0 w-56 sm:w-64 md:w-72 lg:w-80 h-72 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden">
                <motion.img
                  src={beautyBanner}
                  alt="beauty"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-white text-pink-600 font-bold text-sm sm:text-base rounded-lg hover:bg-gray-100 transition-all duration-300 w-fit"
              >
                Explore Collection
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-6 md:space-y-8"
          >
            <motion.div
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-5 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center overflow-hidden rounded-xl"
                >
                  <img
                    src={Beauty}
                    alt="skincare"
                    className="w-32 sm:w-40 md:w-44 h-32 sm:h-40 md:h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col justify-center space-y-3 sm:space-y-4"
                >
                  <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full w-fit">
                    <Sparkles size={14} />
                    <span className="text-xs font-semibold">Bestseller</span>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-pink-600 font-medium">Skincare Essentials</p>
                    <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-pink-900 mt-1">
                      Glow <br /> Collection
                    </h4>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-300 w-fit"
                  >
                    Shop Now
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-5 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col justify-center space-y-3 sm:space-y-4 order-2 sm:order-1"
                >
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full w-fit">
                    <Sparkles size={14} />
                    <span className="text-xs font-semibold">Popular</span>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-purple-600 font-medium">Makeup & Color</p>
                    <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-purple-900 mt-1">
                      Color <br /> Express
                    </h4>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-300 w-fit"
                  >
                    Shop Now
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center justify-center overflow-hidden rounded-xl order-1 sm:order-2"
                >
                  <img
                    src={Beauty}
                    alt="makeup"
                    className="w-40 sm:w-48 md:w-52 h-40 sm:h-48 md:h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
