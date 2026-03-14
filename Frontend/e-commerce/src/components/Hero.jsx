import { motion } from "framer-motion"
import landingBanner_1 from "../assets/landingBanner_1.png"
import landingBanner_2 from "../assets/bannerFashion.png"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export default function Hero() {

  const banners = [landingBanner_1, landingBanner_2]
  const [idx, setIdx] = useState(0)

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="relative overflow-hidden h-[40vh] sm:h-[70vh] lg:h-[85vh] w-full  overflow-hidden bg-black p-12">
      <div>

      
      <motion.div
        key={idx}
        className="absolute w-full inset-0"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={banners[idx]}
          alt="banner"
          className="w-full  h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent sm:from-black/50 md:from-black/30"/>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex items-center justify-center sm:justify-center px-5 sm:px-10 lg:px-20"
      >
        <div className="max-w-xl text-center sm:text-left z-10">

          {/* Badge */}
          <motion.span
            variants={itemVariants}
            className="hidden sm:inline-block mb-4 px-4 py-1 bg-red-600 text-white text-xs font-bold rounded-full"
          >
            LIMITED TIME OFFER
          </motion.span>

          {/* Discount */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none"
          >
            70<span className="text-red-500">%</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 mb-4"
          >
            OFF
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-sm sm:text-lg tracking-wider"
          >
            THE NEW COLLECTION
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-white text-lg sm:text-xl md:text-2xl font-semibold mt-2 mb-6"
          >
            MODERN STYLE FOR HIM AND HER
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-col gap-2 justify-center sm:justify-start"
          >
            <button className="px-3 py-3 w-1/2 sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
              SHOP NOW
              <ArrowRight size={18}/>
            </button>

            <button className="hidden sm:block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 backdrop-blur">
              VIEW COLLECTION
            </button>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-white/60"/>
      </motion.div>

      {/* Slider Dots */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {banners.map((_, n) => (
          <button
            key={n}
            onClick={() => setIdx(n)}
            className={`transition-all duration-300 rounded-full ${
              n === idx
                ? "w-7 h-3 bg-red-600"
                : "w-3 h-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
      </div>

    </section>
  )
}