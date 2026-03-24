import fashionBanner from "../../../assets/bannerFashion.png";
import beautyBanner from "../../../assets/beautyBanner.png"
import accessoriesBanner from "../../../assets/accessoriesBanner.png"
import footwearBanner from "../../../assets/footwearBanner.webp"
import { useGetBannerQuery } from "../../../features/Banners/BannerSlice";
export default function CategoryBanner({ category }) {

    const { data, isLoading } = useGetBannerQuery({ type: "category", category: category })
    const activeBanner = data?.find(banner => banner.isActive)
    console.log(activeBanner, "acive")

    return (
        <div className="relative h-[25vh] md:h-[50vh]">
            <img
                src="https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/D_1600x.jpg?v=1771838451"
                alt="Fashion Banner"
                className="w-full h-full object-cover"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />



        </div>

    )
}