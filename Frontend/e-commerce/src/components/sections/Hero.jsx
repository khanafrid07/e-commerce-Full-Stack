
import { ArrowRight, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react"
import { useGetBannerQuery } from "../../features/Banners/BannerSlice"
import { useNavigate } from "react-router-dom"
import BannerRenderer from "../../features/Banners/components/BannerRenderer"
import BannerSkeleton from "../skeletons/BannerSkeleton";
import BannerSlot from "../../features/Banners/components/BannerSlot";

export default function Hero() {
  const { data: banners, isLoading } = useGetBannerQuery({ type: "hero" })
  const navigate = useNavigate()

  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const bannerList = banners || []
    if (!bannerList?.length) return
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % bannerList.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners])


  if (isLoading) {
    return <BannerSkeleton />
  }

  return (
    <section className="w-full sm:pl-4 overflow-x-hidden">

      <BannerSlot placement="home_top" banners={banners} />
    </section>

  )
}