import homeBanner from "../../../assets/hero.png";

export default function HeroBannerPreview({ heroData }) {
  const displayImage = heroData.heroImage ? URL.createObjectURL(heroData.heroImage) : homeBanner;

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <p className="text-xs sm:text-sm font-semibold text-gray-700">Live Preview</p>
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-56 sm:h-72 md:h-96">
        <div className="relative h-full bg-gray-900">
          <img src={displayImage} className="w-full h-full object-cover opacity-70" alt="Hero Preview" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-4 text-center px-4 sm:px-8 bg-black/20">
            {heroData.titleTop && <p className="text-white/80 text-xs sm:text-sm md:text-lg font-semibold">{heroData.titleTop}</p>}
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-xl leading-tight">{heroData.titleMiddle || "Your Title Here"}</h1>
            {heroData.titleBottom && <p className="text-white/80 text-xs sm:text-sm md:text-xl font-semibold">{heroData.titleBottom}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
