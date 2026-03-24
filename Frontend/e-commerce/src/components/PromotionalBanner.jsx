import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import shoes from "../assets/shoes.png";

export default function PromotionalBanner() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl bg-gray-500 grid grid-cols-1 md:grid-cols-2 min-h-[320px] sm:min-h-[400px] md:min-h-[480px]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-amber-400 to-red-600 opacity-70 z-10" />

          {/* ── LEFT CONTENT ── */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-14 relative z-10">

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-500">
                Featured Product
              </span>
              <span className="text-neutral-700 mx-1">—</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-red-600 font-medium">
                Live Now
              </span>
            </motion.div>

            {/* Headline + Divider + Stars */}
            <div className="flex flex-col gap-4">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Premium<br />
                <em className="not-italic text-[#bba98a]">Air</em> Sneakers
              </motion.h2>

              <div className="w-8 h-px bg-neutral-800" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#c8a96e] text-sm">★</span>
                  ))}
                </div>
                <span className="text-xs text-neutral-600 tracking-wide">124 reviews</span>
              </motion.div>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-baseline gap-4"
              >
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-none tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  $79
                </span>
                <span className="text-lg text-neutral-600 line-through font-light">$129</span>
                <span className="text-[11px] tracking-widest uppercase bg-red-600 text-white px-2.5 py-1 rounded-sm font-medium self-center">
                  40% off
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                className="flex items-center gap-5"
              >
                <Link to="/product/123">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2.5 bg-white text-black text-[13px] font-medium tracking-[0.1em] uppercase px-7 py-3.5 rounded-[4px] transition-colors hover:bg-gray-100"
                  >
                    Shop Now
                    <ArrowRight size={15} />
                  </motion.button>
                </Link>
                <button className="text-[12px] text-neutral-600 tracking-widest uppercase hover:text-neutral-400 transition-colors">
                  + Wishlist
                </button>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT IMAGE ── */}
          <div className="relative flex items-center justify-center overflow-hidden min-h-[280px] md:min-h-0">
            {/* Background radial */}
            <div className="absolute inset-0 " />

            {/* Left border accent */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />

            {/* Ghost number */}
            <span
              className="absolute text-[180px] font-bold text-white/[0.03] leading-none tracking-tighter select-none pointer-events-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              79
            </span>
            

            {/* Shoe image */}
            <motion.img
              src={shoes}
              alt="Premium Air Sneakers"
              className="relative z-10 w-48 sm:w-64 md:w-80 lg:w-96 object-contain drop-shadow-2xl"
              initial={{ opacity: 0, x: 30, rotate: -8 }}
              animate={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ delay: 0.5, duration: 0.9, type: "spring", stiffness: 80 }}
              whileHover={{ y: -10, rotate: -5 }}
            />

            {/* Corner label */}
            <span className="absolute top-6 right-6 text-[10px] tracking-[0.15em] uppercase text-neutral-700 font-normal"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              SS 2026 Collection
            </span>
            <button className="absolute bottom-4 btn btn-lg font-semibold transition-transform duration-300 hover:scale-110">Explore More Collections</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}