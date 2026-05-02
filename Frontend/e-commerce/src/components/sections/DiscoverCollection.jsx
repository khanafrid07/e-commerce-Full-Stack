import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import watch from "../assets/watch.webp";
import shoe from "../assets/shoes.png";
import women from "../assets/woman.png";

export default function DiscoverCollections() {
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
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 -z-10" />

      <div className="max-w-9xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
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
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-500 " />

            <div className="relative h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10  " />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                  Your Style, <br /> Delivered. <br /> Exclusively <br /> Online.
                </h3>
              </motion.div>

              <div className="absolute bottom-0 right-0 w-56 sm:w-64 md:w-72 lg:w-80 h-72 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden">
                <motion.img
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 5 }}
                  src={women}
                  alt="woman"
                  className="w-full h-full object-cover "
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-white text-indigo-600 font-bold text-sm sm:text-base rounded-lg hover:bg-gray-100 transition-all duration-300 w-fit"
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
              className="group cursor-pointer bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-5 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center overflow-hidden rounded-xl"
                >
                  <img
                    src={watch}
                    alt="watch"
                    className="w-32 sm:w-40 md:w-44 h-32 sm:h-40 md:h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col justify-center space-y-3 sm:space-y-4"
                >
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full w-fit">
                    <Sparkles size={14} />
                    <span className="text-xs font-semibold">Premium</span>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-purple-600 font-medium">Timeless Elegance</p>
                    <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-purple-900 mt-1">
                      Discover our <br /> Accessories
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
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-5 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col justify-center space-y-3 sm:space-y-4 order-2 sm:order-1"
                >
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit">
                    <Sparkles size={14} />
                    <span className="text-xs font-semibold">Trending</span>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-blue-600 font-medium">Find Your Perfect Pair</p>
                    <h4 className="text-lg sm:text-2xl md:text-3xl font-black text-blue-900 mt-1">
                      Discover our <br /> Shoes
                    </h4>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-300 w-fit"
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
                    src={shoe}
                    alt="shoes"
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