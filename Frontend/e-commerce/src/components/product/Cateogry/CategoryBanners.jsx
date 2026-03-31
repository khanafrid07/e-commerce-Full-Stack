import { useGetBannerQuery } from "../../../features/Banners/BannerSlice"

export default function CategoryBanners({ category }) {
    const { data, isLoading } = useGetBannerQuery({ type: "category", category })
    console.log(data, "category banner")
    const VerticalPosition = {
        left: "justify-start",
        right: "justify-end",
        center: "justify-center"
    }
    const HorizontalPosition = {
        top: "items-start",
        bottom: "items-end",
        center: "items-center"
    }


    return (
        <div className="relative w-full">
            <div className={`absolute inset-0 w-full h-full bg-[${data?.[0]?.overlayColor}] opacity-[${data?.[0]?.overlayOpacity}]`} />
            <div className="h-[35vh] sm:h-[40vh] md:h-[50vh]  bg-cover bg-center"
                style={{ backgroundImage: `url(${data?.[0]?.image || "placeholder.png"})` }}>
                <div className={`p-8 sm:p-12 absolute inset-0 flex flex-col z-10 ${HorizontalPosition[data?.[0]?.position]} ${VerticalPosition[data?.[0]?.vertical]}`}>
                    <div className="space-y-3 max-w-2xl">
                        {data?.[0]?.title && (
                            <h1 className={`${data?.[0]?.titleSize || 'text-3xl sm:text-5xl'} ${data?.[0]?.titleWeight || 'font-bold'} drop-shadow-md`} style={{ color: data?.[0]?.titleColor }}>
                                {data?.[0]?.title}
                            </h1>
                        )}
                        {data?.[0]?.heading && (
                            <p className={`${data?.[0]?.headingSize || 'text-xl sm:text-2xl'} ${data?.[0]?.headingWeight || 'font-bold'} drop-shadow-sm`} style={{ color: data?.[0]?.headingColor }}>
                                {data?.[0]?.heading}
                            </p>
                        )}
                        {data?.[0]?.subHeading && (
                            <p className={`${data?.[0]?.subHeadingSize || 'text-base sm:text-lg'} ${data?.[0]?.subHeadingWeight || 'font-bold'} drop-shadow-sm`} style={{ color: data?.[0]?.subHeadingColor }}>
                                {data?.[0]?.subHeading}
                            </p>
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}