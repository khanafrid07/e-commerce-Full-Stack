export function CleanImage({ banner, rounded }) {
  return (
    <div className={`relative h-[300px] sm:h-[400px] md:h-[500px] w-full ${rounded?"rounded-2xl":"rounded-none"} overflow-hidden`}>

      {/* Image */}
      <img
        src={banner.image}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 "></div>
      <div className="absolute top-10 sm:top-16 md:top-20 left-4 w-[70%] md:w-[70%] px-6 py-4 ">


        <h2 className="text-xl md:text-4xl font-bold text-gray-900">
          {banner.title}
        </h2>
        <p className="text-lg md:text-2xl font-semibold text-gray-800 mt-1">
          {banner.heading}
        </p>

        <p className="text-sm md:text-xl font-semibold text-gray-600 mt-1">
          {banner.subHeading}
        </p>

        {banner.ctaText && (
          <a className="mt-3 inline-block px-4 py-2 text-sm md:text-xl bg-gradient-to-r from-pink-400 to-purple-700 text-white rounded-lg">
            {banner.ctaText}
          </a>
        )}

      </div>
    </div>
  );
}