import fashionBanner from "../../../assets/bannerFashion.png";
import beautyBanner from "../../../assets/beautyBanner.png"
import accessoriesBanner from "../../../assets/accessoriesBanner.png"
import footwearBanner from "../../../assets/footwearBanner.webp"
import { useGetBannerQuery } from "../../../features/Banners/BannerSlice";
export default function CategoryBanner({category}) {

    const{data, isLoading} = useGetBannerQuery({type: "category", category: category})
    const activeBanner = data?.find(banner=>banner.isActive)
    console.log(activeBanner, "acive")

    return (
        <div>
            <img
                src={activeBanner?.image?.url }
                alt="Fashion Banner"
                className="w-full h-full object-cover"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />


            <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
                <div className="mb-6">
                    <p className="text-white/80 text-2xl md:text-2xl font-semibold uppercase tracking-widest mb-3 ">
                       Welcome to
                    </p>
                    <h1 className="animate-pulse text-5xl md:text-7xl font-black text-black capitalize drop-shadow-2xl mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                        {category}
                    </h1>
                </div>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    Discover the latest trends and timeless styles for every occasion
                </p>
            </div>
        </div>

    )
}