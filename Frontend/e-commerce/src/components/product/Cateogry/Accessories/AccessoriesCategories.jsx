import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Watch, Award, Sparkles, ArrowRight } from "lucide-react";

export default function AccessoriesCategories() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const accessories = {
    men: [
      {
        label: "Bags & Backpacks",
        icon: <ShoppingBag className="w-4 h-4 md:w-6 md:h-6" />,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900",
        type: "bags",
        description: "Premium Canvas",
        span: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
      },
      {
        label: "Watches",
        icon: <Watch className="w-4 h-4 md:w-6 md:h-6" />,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900",
        type: "watches",
        description: "Timeless Elegance",
        span: "col-span-1 row-span-1",
      },
      {
        label: "Belts",
        icon: <Award className="w-4 h-4 md:w-6 md:h-6" />,
        image: "https://www.nappadori.com/cdn/shop/files/everyday-classic-belt-2.jpg?v=1755155414",
        type: "belts",
        description: "The Perfect Fit",
        span: "col-span-1 row-span-1",
      },
    ],
    women: [
      {
        label: "Luxury Handbags",
        icon: <ShoppingBag className="w-4 h-4 md:w-6 md:h-6" />,
        image: "https://mygemma.com/cdn/shop/articles/mygemma-WPD-Top-Blog-Image-6.png?v=1695912828",
        type: "bags",
        description: "Elegant & Spacious",
        span: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
      },
      {
        label: "Perfumes",
        icon: <Sparkles className="w-4 h-4 md:w-6 md:h-6" />,
        image: "https://perfumeunlimited.com/media/wysiwyg/home/Niche_perfumes.jpg",
        type: "perfumes",
        description: "Refined Luxury",
        span: "col-span-1 row-span-1",
      },
      {
        label: "Rings",
        icon: <Award className="w-4 h-4 md:w-6 md:h-6" />,
        image: "https://tmcfinejewellers.com/cdn/shop/files/TMCFineJewellers-07_556dc674-2d66-4b8f-9a0e-d5a34a7f6f03.jpg?v=1766448483&width=1445",
        type: "rings",
        description: "Versatile Beauty",
        span: "col-span-1 row-span-1",
      },
    ],
  };

  const currentItems =
    activeTab === "all"
      ? [
          { ...accessories.women[0], gender: "women" },
          { ...accessories.men[1], gender: "men" },
          { ...accessories.women[1], gender: "women" },
          { ...accessories.men[0], gender: "men" },
          { ...accessories.men[2], gender: "men" },
          { ...accessories.women[2], gender: "women" },
        ]
      : accessories[activeTab].map((i) => ({ ...i, gender: activeTab }));

  const renderCard = (item, index) => (
    <div
      key={`${item.gender}-${item.type}-${index}`}
      onClick={() =>
        navigate(
          `/products?category=accessories&gender=${item.gender}&type=${item.type}`
        )
      }
      className={`group relative rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-base-100 border border-base-content/5 ${item.span || 'col-span-1 row-span-1'}`}
    >
      {/* Dynamic Image Wrapper */}
      <div className="absolute inset-0 overflow-hidden bg-base-200">
        <img
          src={item.image}
          alt={item.label}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Soft Modern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      </div>

      {/* Glassmorphism Gender Badge */}
      {activeTab === "all" && (
        <div className="absolute top-3 left-3 md:top-5 md:left-5 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[8px] md:text-xs font-semibold tracking-wider uppercase shadow-sm">
          {item.gender}
        </div>
      )}

      {/* Floating Icon */}
      <div className="absolute top-3 right-3 md:top-5 md:right-5 p-2 md:p-4 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white/20 transition-all duration-500 group-hover:rotate-6 shadow-sm">
        {item.icon}
      </div>

      {/* Typography Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 flex flex-col justify-end text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide mb-1 opacity-90 group-hover:opacity-100 transition-opacity leading-tight">
          {item.label}
        </h3>
        <p className="hidden md:block text-sm font-light text-white/70 mb-6">
          {item.description}
        </p>

        {/* Animated Link */}
        <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-medium tracking-wide uppercase group-hover:text-primary transition-colors overflow-hidden mt-2 md:mt-0">
          <span className="relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary group-hover:after:w-full after:transition-all after:duration-300">
            Explore Collection
          </span>
          <ArrowRight
            size={14}
            className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 md:w-4 md:h-4 w-3 h-3"
          />
        </div>
      </div>
    </div>
  );

  return (
    <section id="shop-categories" className="mb-20 scroll-mt-24">
      <div className="text-center mb-8 md:mb-16 px-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-base-content mb-3 md:mb-6">
          Shop by Category
        </h2>
        <p className="text-base-content/60 text-sm md:text-lg max-w-2xl mx-auto mb-8 md:mb-12 font-light">
          Find the perfect addition to your wardrobe, designed to complement any style effortlessly.
        </p>

        {/* Premium Pill Tabs */}
        <div className="inline-flex items-center p-1 md:p-1.5 bg-base-200/50 backdrop-blur-md rounded-full border border-base-content/10 shadow-sm max-w-[95%] overflow-x-auto no-scrollbar">
          {["all", "women", "men"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-10 py-2 md:py-3 rounded-full text-[10px] md:text-sm font-semibold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-base-content text-base-100 shadow-md transform scale-105"
                  : "text-base-content/60 hover:text-base-content hover:bg-base-content/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Luxury Masonry Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8 auto-rows-[160px] md:auto-rows-[320px]">
        {currentItems.map((item, idx) => renderCard(item, idx))}
      </div>
    </section>
  );
}
