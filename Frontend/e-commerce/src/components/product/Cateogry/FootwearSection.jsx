import { useNavigate } from "react-router-dom";
import { Footprints, Mountain, Briefcase, Flame, ArrowRight } from "lucide-react";

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
        className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.label}
            className="h-full w-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
        </div>

        {/* Icon Badge */}
        <div className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
          {item.icon}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:translate-y-0 transition-transform duration-300">
            {item.label}
          </h3>
          <p className="text-sm text-white/80 mb-4 group-hover:text-white transition-colors duration-300">
            {item.description}
          </p>

          {/* Shop Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-300 w-full hover:gap-3">
            <span>Shop Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    ));

  return (
    <section className="px-4 md:px-12 py-24 bg-gradient-to-b from-base-100 to-base-200">
      {/* Header */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            Explore Our Collection
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Premium Footwear
        </h2>
        <p className="text-lg text-base-content/70">
          Discover premium footwear crafted for style, comfort, and confidence. From casual sneakers to formal elegance, find your perfect pair.
        </p>
      </div>

      {/* MEN */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/30 rounded-full" />
          <h3 className="text-3xl font-bold">Men's Footwear</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderCards(footwear.men, "men")}
        </div>
      </div>

      {/* WOMEN */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-secondary to-secondary/30 rounded-full" />
          <h3 className="text-3xl font-bold">Women's Footwear</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderCards(footwear.women, "women")}
        </div>
      </div>
    </section>
  );
}
