import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import person from "../../assets/person.png";
import menFashion from "../../assets/menFashion.png";
import womenFashion from "../../assets/womensFashion.png";
import { useNavigate } from "react-router-dom";

export default function FashionCollection() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-24 overflow-hidden">
      {/* Very subtle background pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-rose-50/20 to-pink-50/30 -z-10" />

      <div className="max-w-full mx-auto px-1 sm:px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <p className="text-sm font-bold tracking-widest text-rose-500 uppercase mb-2 flex items-center gap-2">
            <Sparkles size={16} /> Seasonal Exclusives
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Style</span>
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Large Hero Card - Spans 7 cols */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => navigate("/category/Fashion")}
            className="group cursor-pointer relative lg:col-span-7 flex flex-col justify-between overflow-hidden rounded-[1.3rem] shadow-xl shadow-rose-900/10 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 min-h-[420px] sm:min-h-[500px]"
          >
            {/* Ambient lighting blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/20 blur-3xl rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 p-6 sm:p-10 flex flex-col h-full justify-between w-full lg:w-[65%]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
                  <Sparkles size={14} /> New Collection
                </div>
                <h3 className="font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight drop-shadow-sm">
                  Trendy<br />Styles,<br />Perfect<br />Fit.
                </h3>
              </div>

              <div className="mt-8 sm:mt-12">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/category/Fashion"); }}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-white text-rose-600 font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:bg-rose-50 transition-all duration-300 w-fit group/btn"
                >
                  Explore Collection
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Model Image - Positioned bottom right */}
            <div className="absolute bottom-0 right-0 w-[80%] sm:w-[55%] h-[75%] sm:h-full pointer-events-none flex items-end justify-end">
              <motion.img
                src={person}
                alt="fashion"
                className="w-full h-full object-cover object-top drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 origin-bottom"
              />
              {/* Fade gradient to blend image into background */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-pink-500 to-transparent opacity-80 sm:opacity-100" />
            </div>
          </motion.div>

          {/* Right Column Smaller Cards - Spans 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 h-full">

            {/* Women's Fashion Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => navigate("/category/Fashion#women")}
              className="group cursor-pointer relative flex-1 flex items-center overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-rose-50 to-pink-50 border border-white/60 shadow-lg shadow-rose-900/5 hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
            >
              {/* Background Blob */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              <div className="relative z-10 flex items-center gap-6 w-full">
                {/* Image */}
                <div className="flex-shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-md">
                  <img
                    src={womenFashion}
                    alt="women fashion"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-white text-rose-600 px-2.5 py-1 rounded-md shadow-sm text-[10px] font-bold tracking-widest uppercase w-fit">
                    <Sparkles size={12} /> Latest
                  </div>
                  <h4 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Women's<br />Styles
                  </h4>
                  <button className="inline-flex items-center gap-1 mt-1 text-xs sm:text-sm font-bold text-slate-500 group-hover:text-rose-600 transition-colors">
                    Shop Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Men's Fashion Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => navigate("/category/Fashion#men")}
              className="group cursor-pointer relative flex-1 flex items-center overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-orange-50 to-amber-50 border border-white/60 shadow-lg shadow-orange-900/5 hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
            >
              {/* Background Blob */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-200/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              <div className="relative z-10 flex items-center gap-6 w-full">
                {/* Image */}
                <div className="flex-shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-md">
                  <img
                    src={menFashion}
                    alt="men fashion"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-white text-orange-600 px-2.5 py-1 rounded-md shadow-sm text-[10px] font-bold tracking-widest uppercase w-fit">
                    <Sparkles size={12} /> Exclusive
                  </div>
                  <h4 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Men's<br />Premium
                  </h4>
                  <button className="inline-flex items-center gap-1 mt-1 text-xs sm:text-sm font-bold text-slate-500 group-hover:text-orange-600 transition-colors">
                    Shop Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
