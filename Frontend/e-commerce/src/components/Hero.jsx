
import { ArrowRight, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react"
import { useGetBannerQuery } from "../features/Banners/BannerSlice"
import { useNavigate } from "react-router-dom"
import BannerRenderer from "../features/Banners/BannerRenderer"

export default function Hero() {
  const { data: banners, isLoading } = useGetBannerQuery({ type: "hero" })
  const navigate = useNavigate()

  const [idx, setIdx] = useState(0)
  console.log(banners, "banerf")
  // Auto slider
  useEffect(() => {
    if (!banners?.length) return
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
  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={idx}
        className="p-2 md:p-4"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.3 }}
      >
        <BannerRenderer banner={banners[idx]} />
      </motion.div>
    </AnimatePresence>
  )
}