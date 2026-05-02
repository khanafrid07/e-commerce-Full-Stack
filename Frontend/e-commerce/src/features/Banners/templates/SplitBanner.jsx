export function SplitBanner({ banner }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-[350px] rounded-2xl overflow-hidden bg-white shadow">

      {/* Left Content */}
      <div className="flex flex-col justify-center px-10 bg-gradient-to-r from-pink-400 to-purple-300">

        <h2 className="text-3xl text-white font-bold">
          {banner.title}
        </h2>
        <p className="mt-2 text-gray-600">
          {banner.heading}
        </p>

        <p className="mt-2 text-gray-600">
          {banner.subHeading}
        </p>

        {banner.ctaText && (
          <a className="mt-4 w-fit px-5 py-2 bg-black text-white rounded-lg">
            {banner.ctaText}
          </a>
        )}

      </div>

      {/* Right Image */}
      <div>
        <img
          src={banner.image.url}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}