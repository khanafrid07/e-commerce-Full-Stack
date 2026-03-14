import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import person from "../assets/person.png"
import menFashion from "../assets/menFashion.png"
import womenFashion from "../assets/womensFashion.png"

export default function FashionCollection() {
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
      <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/30 to-pink-50/30 -z-10" />

      <div className="max-w-9xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-pink-400 to-red-500 " />

            <div className="  h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] sm:flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden">
              <div className="  bg-gradient-to-b from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-5" />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute  "
              >
                <h3 className="font-black text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                  Trendy <br /> Styles, <br /> Perfect <br /> Fit.
                </h3>
              </motion.div>

              <div className=" absolute bottom-16 top-1  right-0 w-56 sm:w-64 md:w-72 lg:w-80 h-72 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden">
                <motion.img
                  src={person}
                  alt="fashion"
                  className="w-full h-full object-cover"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" absolute bottom-4 z-10 inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-white text-red-600 font-bold text-sm sm:text-base rounded-lg hover:bg-gray-100 transition-all duration-300 w-fit"
              >
                Explore Collection
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>


          <motion.div
            variants={itemVariants}
            className=" relative rounded-xl shadow-lg grid grid-cols-2 sm:grid-cols-1 gap-4 order-1 lg:order-2"
          >
            <motion.div
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-gradient-to-br from-rose-100 via-rose-50 to-red-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 md:gap-8 p-2 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start justify-center overflow-hidden rounded-xl"
                >
                  <img
                    src={womenFashion}
                    alt="women fashion"
                    className="w-32 sm:w-40 md:w-44 h-32 sm:h-40 md:h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col text-center items-center justify-center space-y-3 sm:space-y-4"
                >
                  <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full w-fit">
                    <Sparkles size={14} />
                    <span className="text-xs font-semibold">Latest</span>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-rose-600 font-medium">Women's Collection</p>
                    <h4 className="text-sm sm:text-2xl md:text-3xl font-black text-rose-900 mt-1">
                      Discover{" "}
                      <span className="hidden sm:inline"><br /></span>
                      Summer Styles
                    </h4>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center just gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-300 w-fit"
                  >
                    Shop Now
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>

              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="group cursor-pointer bg-gradient-to-br from-orange-100 via-orange-50 to-red-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 md:gap-8 p-2 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center sm:items-normal text-center sm:text-none justify-center space-y-3 sm:space-y-4 order-2 sm:order-1"
                >
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full w-fit">
                    <Sparkles size={14} />
                    <span className="text-xs font-semibold">Exclusive</span>
                  </div>

                  <div>
                     <p className="text-xs sm:text-sm text-rose-600 font-medium">Men's Collection</p>
                    <h4 className="text-sm sm:text-2xl md:text-3xl font-black text-rose-900 mt-1">
                      Premium{" "}
                      <span className="hidden sm:inline"><br /></span>
                      Fashion
                    </h4>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-sm rounded-lg hover:shadow-lg transition-all duration-300 w-fit"
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
                    src={menFashion}
                    alt="men fashion"
                    className="w-32 sm:w-40 md:w-44 h-32 sm:h-40 md:h-44 object-cover transition-transform duration-700 group-hover:scale-110"
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
