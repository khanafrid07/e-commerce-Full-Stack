export default function GradientPromo({ banner }) {
  return (
    <div className="relative h-[250px] w-full rounded-xl overflow-hidden">

      {/* IMAGE (optional) */}
      {banner.image && (
        <img
          src={banner.image}
          className="absolute w-full h-full object-cover"
        />
      )}

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 to-blue-200/40" />

      {/* CONTENT */}
      <div className="relative h-full flex items-center justify-between px-10 text-white">

        <div>
          <h2 className="text-3xl font-bold text-red-700">{banner.title}</h2>
          <p className="mt-1 font-semibold text-black/50">{banner.subHeading}</p>
        </div>

        <a className="px-5 py-2 bg-blue-400 text-black rounded-lg font-semibold">
          {banner.ctaText}
        </a>

      </div>
    </div>
  );
}