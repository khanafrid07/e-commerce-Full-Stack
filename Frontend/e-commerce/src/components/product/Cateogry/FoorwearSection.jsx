import { useNavigate } from "react-router-dom";
import {
  Footprints,
  Dumbbell,
  Briefcase,
  Flame,
  Mountain,
  ShoppingBag,
} from "lucide-react";

export default function FootwearSection() {
  const navigate = useNavigate();

  const footwear = [
    {
      title: "Running Shoes",
      desc: "Built for speed & endurance",
      icon: <Footprints size={28} />,
      image:
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=900",
      type: "running",
      badge: "Trending",
    },
    {
      title: "Gym & Training",
      desc: "Maximum grip & support",
      icon: <Dumbbell size={28} />,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900",
      type: "training",
      badge: "Best Seller",
    },
    {
      title: "Casual Wear",
      desc: "Comfort for everyday life",
      icon: <ShoppingBag size={28} />,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900",
      type: "casual",
    },
    {
      title: "Formal Shoes",
      desc: "Professional & elegant",
      icon: <Briefcase size={28} />,
      image:
        "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=900",
      type: "formal",
    },
    {
      title: "Boots",
      desc: "Rugged & durable design",
      icon: <Mountain size={28} />,
      image:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900",
      type: "boots",
    },
    {
      title: "Sandals & Slides",
      desc: "Light & breathable",
      icon: <Flame size={28} />,
      image:
        "https://images.unsplash.com/photo-1600180758895-3f69c78f1f84?w=900",
      type: "sandals",
    },
  ];

  return (
    <section className="px-4 md:px-12 py-20 bg-base-100">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold">
          Step Into Comfort & Style
        </h2>
        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
          Discover footwear designed for performance, comfort, and everyday wear.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {footwear.map((item) => (
          <div
            key={item.type}
            onClick={() =>
              navigate(`/products?category=footwear&type=${item.type}`)
            }
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition cursor-pointer group overflow-hidden"
          >
            {/* Image */}
            <figure className="relative h-52">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Badge */}
              {item.badge && (
                <div className="badge badge-primary absolute top-4 left-4">
                  {item.badge}
                </div>
              )}
            </figure>

            {/* Content */}
            <div className="card-body p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-base-200 text-primary">
                  {item.icon}
                </div>
                <h3 className="card-title text-base md:text-lg">
                  {item.title}
                </h3>
              </div>

              <p className="text-sm text-base-content/70">
                {item.desc}
              </p>

              <div className="card-actions justify-end mt-2">
                <button className="btn btn-sm btn-outline btn-primary">
                  Shop Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <button
          onClick={() => navigate("/products?category=footwear")}
          className="btn btn-primary btn-wide"
        >
          Explore All Footwear
        </button>
      </div>
    </section>
  );
}
