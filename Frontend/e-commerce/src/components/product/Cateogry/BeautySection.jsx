import CategoryBanner from "./CategoryBanner"
import TrendingProducts from "../../TrendingProducts"
import Collection from "./Beauty/Category"
import Skincare from "./Beauty/skincare"
import Category from "./Beauty/Category"
import ShopConcern from "./Beauty/ShopConcern"
export default function BeautySection() {

  return (
    <>
      {/* Banner — CategoryBanner manages its own height internally */}
      <CategoryBanner category={"Beauty"} />

      <div className="p-2 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-bold">Popular Products</h1>
        <TrendingProducts />
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