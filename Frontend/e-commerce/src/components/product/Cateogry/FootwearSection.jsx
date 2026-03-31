import { useNavigate } from "react-router-dom";
import { Footprints, Mountain, Briefcase, Flame, ArrowRight, Zap } from "lucide-react";
import PromotionalBanner from "../../PromotionalBanner";
import TrendingProducts from "../../TrendingProducts";

import { motion } from "framer-motion";

export default function FootwearSection() {
  const navigate = useNavigate();

  const footwear = {
    men: [
      {
        label: "Sneakers",
        icon: <Footprints size={32} />,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900",
        type: "sneakers",
        description: "Comfortable & stylish everyday wear",
      },
      {
        label: "Boots",
        icon: <Mountain size={32} />,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900",
        type: "boots",
        description: "Rugged durability for any terrain",
      },
      {
        label: "Formal Shoes",
        icon: <Briefcase size={32} />,
        image: "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=900",
        type: "formal shoes",
        description: "Professional elegance and class",
      },
    ],
    women: [
      {
        label: "Sandals",
        icon: <Flame size={32} />,
        image: "https://images.unsplash.com/photo-1600180758895-3f69c78f1f84?w=900",
        type: "sandals",
        description: "Breezy summer vibes & comfort",
      },
      {
        label: "Heels & Boots",
        icon: <Mountain size={32} />,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900",
        type: "boots",
        description: "Bold, confident, and stunning",
      },
      {
        label: "Sneakers",
        icon: <Footprints size={32} />,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900",
        type: "sneakers",
        description: "Trendy everyday essentials",
      },
    ],
  };

  const renderCards = (items, gender) =>
    items.map((item, index) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        key={`${gender}-${item.type}`}
        onClick={() => navigate(`/products?category=footwear&gender=${gender}&type=${item.type}`)}
        className="group relative h-72 sm:h-80 md:h-[22rem] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-white"
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.label}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        </div>

        {/* Floating Icon Badge */}
        <div className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover:bg-white/30 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110 shadow-lg">
          {item.icon}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 text-white text-left">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-1 group-hover:-translate-y-1 transition-transform duration-500 tracking-tight">
            {item.label}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mb-5 group-hover:text-white transition-colors duration-500 line-clamp-2">
            {item.description}
          </p>

          {/* Minimalist Shop Button */}
          <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors duration-300 w-fit">
            <span>Explore</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>
    ));

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* ── Dynamic Category Banner Hero ── */}
      <CategoryBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-16">

        {/* ── Trending Section ── */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex gap-2 items-center text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
                <Zap size={14} className="fill-amber-600" />
                <span>Hot Right Now</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                Trending Footwear
              </h2>
            </div>
            <button
              onClick={() => navigate('/products?category=footwear')}
              className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group w-fit"
            >
              Shop All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          {/* We assume footwear is stored with category "footwear" */}
          <TrendingProducts category={"footwear"} />
        </section>

        {/* ── MEN'S COLLECTION ── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Men's Classics</h3>
            <div className="h-px bg-gray-200 flex-1 ml-4 hidden sm:block"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {renderCards(footwear.men, "men")}
          </div>
        </section>

        {/* ── PROMO BANNER ── */}
        <div className="mb-20 rounded-[2rem] overflow-hidden shadow-2xl relative">
          <PromotionalBanner placement="category_middle" />
        </div>

        {/* ── WOMEN'S COLLECTION ── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Women's Collection</h3>
            <div className="h-px bg-gray-200 flex-1 ml-4 hidden sm:block"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {renderCards(footwear.women, "women")}
          </div>
        </section>

      </div>
    </div>
  );
}
