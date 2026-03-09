export default function CategoryBannerPreview({ bannerInfo, colorGradient, category }) {
  const displayImage = bannerInfo.img ? URL.createObjectURL(bannerInfo.img) : bannerInfo.defaultImage;

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <p className="text-xs sm:text-sm font-semibold text-gray-700">Live Preview</p>
      <div className={`relative h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br ${colorGradient} shadow-xl`}>
        <img src={displayImage} className="w-full h-full object-cover opacity-60" alt={category} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center px-4 sm:px-6 bg-black/20">
          {bannerInfo.titleTop && <p className="text-white/90 text-xs sm:text-sm font-semibold">{bannerInfo.titleTop}</p>}
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg leading-tight">{bannerInfo.titleMiddle || "Category"}</h2>
          {bannerInfo.titleBottom && <p className="text-white/90 text-xs sm:text-sm font-semibold">{bannerInfo.titleBottom}</p>}
        </div>
      </div>
    </div>
  );
}
