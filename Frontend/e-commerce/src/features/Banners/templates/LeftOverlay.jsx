export default function LeftOverlay({ banner, rounded = true }) {
  return (
    <div className={`relative h-[40vh] md:h-[70vh] w-full overflow-hidden  ${rounded?"rounded-xl":"rounded-none"}`}>

      <img
        src={banner.image}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent" />

      <div className="absolute md:w-1/2 inset-0 flex flex-col justify-center p-4 md:px-10 text-white items-start">

        <h2 className="text-md sm:text-3xl md:text-5xl font-bold md:font-semibold">{banner.title}</h2>
        <p className="mt-1 text-gray-300 italic font-serif tracking-normal text-md sm:text-lg md:text-4xl font-semibold">
          {banner.heading}
        </p>

        <p className="mt-2 text-gray-100 text-md sm:text-xl">
          {banner.subHeading}
        </p>

        <a href={banner.ctaLink} className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-700 text-sm sm:text-2xl  to-purple-400 rounded-lg">
          {banner.ctaText}
        </a>

      </div>
    </div>
  );
}