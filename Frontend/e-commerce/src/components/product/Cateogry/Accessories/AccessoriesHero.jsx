export default function AccessoriesHero() {
  return (
    <section className="relative h-[50vh] md:h-[75vh] w-full overflow-hidden mb-12 md:mb-28">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1600"
          alt="Accessories Hero"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
      </div>

      <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-24 flex flex-col justify-center h-full text-white">
        <span className="text-[10px] sm:text-sm font-medium uppercase tracking-[0.3em] mb-3 md:mb-4 text-white/80 animate-pulse">
          The Finishing Touches
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4 md:mb-6 leading-[1.1]">
          Curated <br />
          <span className="font-semibold italic font-serif tracking-normal">Accessories</span>
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-white/80 max-w-lg mb-8 sm:mb-12 font-light leading-relaxed">
          Elevate your everyday style with our carefully selected premium bags, watches, and intricate jewelry pieces.
        </p>
        <button
          onClick={() => {
            const el = document.getElementById("shop-categories");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-fit px-6 py-3 md:px-8 md:py-4 bg-white text-black text-[10px] md:text-sm uppercase tracking-[0.2em] font-bold hover:bg-white/90 hover:scale-105 transition-all duration-300 rounded-full"
        >
          Discover More
        </button>
      </div>
    </section>
  );
}
