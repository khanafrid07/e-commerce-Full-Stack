import CategoryBanners from "./CategoryBanners"
import TrendingProducts from "../../TrendingProducts"
import Collection from "./Beauty/Category"
import Skincare from "./Beauty/skincare"
import Category from "./Beauty/Category"
import ShopConcern from "./Beauty/ShopConcern"
import { useGetBannerQuery } from "../../../features/Banners/BannerSlice"
import BannerSlot from "../../../features/Banners/BannerSlot"
export default function BeautySection() {
  const { data } = useGetBannerQuery({ type: "category", category: "beauty" })

  return (
    <>
      <div className="max-w-9xl mx-auto px-2 md:px-4">
        <BannerSlot banners={data} placement={"home_top"} rounded={false} />
      </div>
      <div className="p-2 mt-6 sm:p-8">

        <TrendingProducts category={"Beauty"} />
      </div>

      {/* Collection grid — natural height from image */}
      <div className="w-full space-y-6">
        <Skincare />
      </div>
      <div>
        <Category />
      </div>
      <div>
        <ShopConcern />
      </div>
    </>


  )
}