import { useEffect, useState } from "react";
import { useGetBannerQuery } from "../features/Banners/BannerSlice";
import { Link } from "react-router-dom";

export default function PromotionalBanner({ placement = "home_middle" }) {
  const { data: banners = [], isLoading } = useGetBannerQuery({ type: "promo", placement });
  const promoBanners = banners?.filter(banner => banner.placement === placement) || [];
  if (!banners) return null;

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (promoBanners.length > 1) {
      const interval = setInterval(() => {
        setIdx((prevIdx) => (prevIdx + 1) % promoBanners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [promoBanners.length]);

  if (isLoading) {
    return (
      <section className="w-full max-w-7xl mx-auto p-4 sm:p-8">
        <div className="w-full h-[300px] sm:h-[400px] bg-gray-100 animate-pulse rounded-2xl"></div>
      </section>
    );
  }

  if (promoBanners.length === 0) return null;

  const banner = promoBanners[idx];

  const horizontalMap = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const verticalMap = {
    top: "justify-start",
    center: "justify-center",
    bottom: "justify-end",
  };

  return (
    <section className="w-full max-w-7xl mx-auto p-4 sm:p-8">
      <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl group">

        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          src={banner.image}
          alt={banner.title || "Promotional Banner"}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            backgroundColor: banner.overlayColor || "#2563eb",
            opacity: (banner.overlayOpacity || 0) / 100
          }}
        />

        {/* Content */}
        <div className={`absolute inset-0 flex flex-col p-8 sm:p-12 z-10 transition-all duration-500 ${verticalMap[banner.vertical] || verticalMap.center} ${horizontalMap[banner.position] || horizontalMap.center}`}>

          <div className="space-y-3 max-w-2xl transform transition-transform duration-700 translate-y-0 opacity-100">
            {banner.title && (
              <h2 className={`${banner.titleSize || 'text-3xl sm:text-4xl md:text-5xl'} ${banner.titleWeight || 'font-extrabold'} tracking-tight drop-shadow-sm`} style={{ color: banner.titleColor || "#ffffff" }}>
                {banner.title}
              </h2>
            )}

            {banner.heading && (
              <h3 className={`${banner.headingSize || 'text-xl sm:text-2xl'} ${banner.headingWeight || 'font-bold'} drop-shadow-sm`} style={{ color: banner.headingColor || "#ffffff" }}>
                {banner.heading}
              </h3>
            )}

            {banner.subHeading && (
              <p className={`${banner.subHeadingSize || 'text-base sm:text-lg'} ${banner.subHeadingWeight || 'font-medium'} opacity-90 drop-shadow-sm`} style={{ color: banner.subHeadingColor || "#e5e7eb" }}>
                {banner.subHeading}
              </p>
            )}

            {banner.ctaText && (
              <div className="pt-4">
                <Link to={banner.ctaLink || "#"}>
                  <button
                    className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-bold shadow-lg text-sm sm:text-base transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 border border-white/10"
                    style={{
                      color: banner.ctaTextColor,
                      backgroundColor: banner?.ctaBgColor
                    }}
                  >
                    {banner.ctaText}
                  </button>
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* Carousel Indicators (if multiple banners) */}
        {promoBanners.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {promoBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === idx ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}