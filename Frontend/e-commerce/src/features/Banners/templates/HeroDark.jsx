export default function HeroDark({ banner }) {
  return (
    <div className="relative h-[40vh] md:h-[70vh] w-full overflow-hidden rounded-2xl">

      <img
        src={banner.image}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col justify-center items-center px-10 text-white">

        <h1 className="text-3xl sm:text-4xl font-bold">
          {banner.title}
        </h1>
        <p className="mt-3 text-xl text-gray-200">
          {banner.heading}
        </p>

        <p className="mt-3 text-lg text-gray-300 font-bold animate-pulse">
          {banner.subHeading}
        </p>

        <a
          href={banner.ctaLink}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-400 text-black rounded-lg font-semibold"
        >
          {banner.ctaText}
        </a>

      </div>
    </div>
  );
}