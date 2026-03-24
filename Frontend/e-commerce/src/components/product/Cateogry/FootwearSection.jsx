import { useNavigate } from "react-router-dom";
import { Footprints, Mountain, Briefcase, Flame, ArrowRight } from "lucide-react";
import PromotionalBanner from "../../PromotionalBanner";
export default function FootwearSection() {
  const navigate = useNavigate();

  const footwear = {
    men: [
      {
        label: "Sneakers",
        icon: <Footprints size={32} />,
        image:
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900",
        type: "sneakers",
        description: "Comfortable & stylish",
      },
      {
        label: "Boots",
        icon: <Mountain size={32} />,
        image:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900",
        type: "boots",
        description: "Rugged & durable",
      },
      {
        label: "Formal Shoes",
        icon: <Briefcase size={32} />,
        image:
          "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=900",
        type: "formal shoes",
        description: "Professional elegance",
      },
    ],
    women: [
      {
        label: "Sandals",
        icon: <Flame size={32} />,
        image:
          "https://images.unsplash.com/photo-1600180758895-3f69c78f1f84?w=900",
        type: "sandals",
        description: "Summer vibes",
      },
      {
        label: "Boots",
        icon: <Mountain size={32} />,
        image:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900",
        type: "boots",
        description: "Bold & confident",
      },
      {
        label: "Sneakers",
        icon: <Footprints size={32} />,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900",
        type: "sneakers",
        description: "Trendy everyday",
      },
    ],
  };

  const renderCards = (items, gender) =>
    items.map((item) => (
      <div
        key={`${gender}-${item.type}`}
        onClick={() =>
          navigate(
            `/products?category=footwear&gender=${gender}&type=${item.type}`
          )
        }
        className="group relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/10 hover:border-white/20"
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.label}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
        </div>

        {/* Icon Badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
          {item.icon}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 group-hover:translate-y-0 transition-transform duration-300">
            {item.label}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 group-hover:text-white transition-colors duration-300">
            {item.description}
          </p>

          {/* Shop Button */}
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white text-black rounded-lg font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-300 w-full hover:gap-3 text-sm sm:text-base">
            <span>Shop Now</span>
            <ArrowRight size={16} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    ));

  return (
    <section className="px-4 py-8 bg-gradient-to-b from-base-100 to-base-200 min-h-screen">
      <div className="max-w-9xl md:px-8 mx-auto">
        {/* Hero Banner */}
        <div className="mb-12 relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200"
            alt="Footwear Collection"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-start p-6 sm:p-8 md:p-12">
            <div className="text-white max-w-md">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Step Into Style
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-6">
                Discover the perfect pair for every occasion
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-focus transition-colors">
                Explore All Footwear
              </button>
            </div>
          </div>
        </div>

        {/* MEN */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/30 rounded-full" />
            <h3 className="text-2xl md:text-3xl font-bold text-primary">Men's Footwear</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {renderCards(footwear.men, "men")}
          </div>
        </div>
        <PromotionalBanner />

        {/* Women's Banner */}
        <div className="mb-12 relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200"
            alt="Women's Footwear Collection"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-secondary/60 via-secondary/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-end p-6 sm:p-8 md:p-12">
            <div className="text-white max-w-md text-right">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Women's Elegance
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-6">
                Find your perfect style with our curated women's collection
              </p>
              <button className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-focus transition-colors">
                Shop Women's Collection
              </button>
            </div>
          </div>
        </div>

        {/* WOMEN */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-secondary to-secondary/30 rounded-full" />
            <h3 className="text-2xl md:text-3xl font-bold text-secondary">Women's Footwear</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {renderCards(footwear.women, "women")}
          </div>
        </div>
      </div>
    </section>
  );
}
