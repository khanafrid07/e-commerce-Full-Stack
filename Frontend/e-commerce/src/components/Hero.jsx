import { motion } from "framer-motion"
import landingBanner_1 from "../assets/landingBanner_1.png"
import landingBanner_2 from "../assets/bannerFashion.png"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { useGetBannerQuery } from "../features/Banners/BannerSlice"
import { useNavigate } from "react-router-dom"

export default function Hero() {
  const { data: banners, isLoading } = useGetBannerQuery({ type: "hero" })
  const navigate = useNavigate()

  const [idx, setIdx] = useState(0)
  console.log(banners, "banerf")
  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners])

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
    <section className="relative overflow-hidden h-[30vh] sm:h-[70vh] lg:h-[85vh] w-full  overflow-hidden bg-black p-12">
      <div>


        <motion.div
          key={idx}
          className="absolute w-full inset-0"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={banners && banners[idx]?.image || "/placeholder.png"}
            alt="banner"
            className="w-full  h-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/10 sm:from-black/50 md:from-black/40" />
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

            <motion.p
              variants={itemVariants}
              className="text-black/80 font-extrabold text-lg sm:text-xl md:text-2xl mt-2 mb-2 sm:mb-6"
            >
              {banners && banners[idx]?.title}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-bold text-gray-300 text-sm sm:text-lg tracking-wider"
            >
              {banners && banners[idx]?.heading}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-white text-lg sm:text-xl md:text-2xl font-semibold mt-2 mb-6"
            >
              {banners && banners[idx]?.subHeading}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-col sm:gap-2 gap-0 justify-start"
            >
              <button onClick={() => navigate(`category${banners[idx]?.ctaLink}`)} className="px-1 py-2 w-[40%] btn btn-sm border-none sm:btn-md sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105">
                {banners && banners[idx]?.ctaText}
                <ArrowRight size={18} />
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
          <ChevronDown className="text-white/60" />
        </motion.div>

        {/* Slider Dots */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          {banners?.map((_, n) => (
            <button
              key={n}
              onClick={() => setIdx(n)}
              className={`transition-all duration-300 rounded-full ${n === idx
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