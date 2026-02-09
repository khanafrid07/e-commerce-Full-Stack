import { Sparkles, Heart, Star } from "lucide-react";
import LandingCard from "../LandingCard";
import { useGetProductsQuery } from "../../../features/products/productSlice";
import { useNavigate } from "react-router-dom";

export default function BeautySection() {
  const { isLoading, data } = useGetProductsQuery({ sort: "featured", category: "Beauty", sub: ""});
  const navigate = useNavigate()
  const routines = [
    {
      name: "Skincare",
      img: "https://media.self.com/photos/63503faecbcc10f798a3cc8e/1:1/w_3748,h_3748,c_limit/Dermatologist-skincare-tips.jpg",
      description: "Glow from within"
    },
    {
      name: "Haircare",
      img: "https://cloudhaircare.com/cdn/shop/files/Generative_Fill.jpg?v=1723654440",
      description: "Healthy, beautiful hair"
    },
    {
      name: "Makeup",
      img: "https://thumbs.dreamstime.com/b/colorful-cosmetics-arranged-around-clear-space-vanity-mirror-reflection-presenting-lively-collection-makeup-396650265.jpg",
      description: "Express yourself"
    },
    {
      name: "Fragrance",
      img: "https://images.stockcake.com/public/5/1/3/513d57f0-5f6e-4d18-9bcf-8a7e9c28331c_large/elegant-perfume-collection-stockcake.jpg",
      description: "Signature scents"
    },
  ];

  const skinConcern = [
    {
      name: "Acne",
      img: "https://www.shutterstock.com/image-photo/comparison-image-acneprone-face-before-600nw-2609899293.jpg",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      name: "Dry Skin",
      img: "https://www.nascent.net.au/wp-content/uploads/dry-skin-type.png",
      gradient: "from-orange-500 to-amber-600"
    },
    {
      name: "Oily Skin",
      img: "https://www.health.com/thmb/2YYPjGjuD7eCAH41JuOELEqtNNU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-OilySkin-2b2dc80d7c8c442286cacef949f2f98f.jpg",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      name: "Treatments",
      img: "https://cdn.media.amplience.net/i/deciem/ORD-skin-serum-blog-header-img?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1",
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100 px-4 md:px-10 py-16">

      {/* Hero Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-primary animate-pulse" size={32} />
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Beauty Essentials
          </h1>
          <Sparkles className="text-secondary animate-pulse" size={32} />
        </div>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Discover your perfect beauty routine with our curated collection of premium products
        </p>
      </div>

      {/* Shop by Routine */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Shop by Routine</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {routines.map((item, idx) => (
            <div
            onClick={()=>navigate(`/products?category=beauty&type=${item.name.toLowerCase()}`)}
              key={item.name}
              className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image with zoom effect */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Animated overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content - Slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-2xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.name}
                </h3>
                <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  {item.description}
                </p>
                <button className="mt-3 btn btn-sm btn-primary opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 delay-200">
                  Explore
                </button>
              </div>

              {/* Number badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Products */}
      <div className="">
        <div className="text-center ">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Star className="text-warning fill-warning" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
            <Star className="text-warning fill-warning" size={28} />
          </div>
          <p className="text-base-content/70">Best selling beauty essentials loved by thousands</p>
          <div className="w-24 h-1 bg-gradient-to-r from-warning to-error mx-auto rounded-full "></div>
        </div>
        <LandingCard products={data?.allProducts} name="Best Selling Products" />
      </div>

      
          <div className=" mb-12">
        <div className="relative h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
              ✨ Explore More ✨
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-4 md:p-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="badge badge-lg badge-primary gap-2">
              <Heart size={16} className="fill-current" />
              Personalized Care
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            What's Your Skin Concern?
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Find the perfect solution tailored to your unique skin needs
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skinConcern.map((concern, idx) => (
            <div
            onClick={()=>navigate(`/products?category=beauty&concern=${concern.name}`)}
              key={idx}
              className="group relative cursor-pointer flex flex-col items-center"
            >
              {/* Circle container with gradient border */}
              <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${concern.gradient} p-1 transition-all duration-500 hover:scale-110 hover:rotate-6 shadow-xl hover:shadow-2xl`}>
                {/* Inner circle */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-base-100">
                  <img
                    src={concern.img}
                    alt={concern.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                  />

                  {/* Overlay with icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <Sparkles className="text-white" size={48} />
                    </div>
                  </div>
                </div>

                {/* Pulse effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${concern.gradient} opacity-0 group-hover:opacity-30 animate-ping`} />
              </div>

              {/* Label */}
              <div className="mt-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-primary">
                  {concern.name}
                </h3>
                <button className="btn btn-sm btn-outline btn-primary opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 delay-200">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="inline-block bg-gradient-to-r from-primary to-secondary p-8 md:p-12 rounded-3xl shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Beauty Routine?
          </h3>
          <p className="text-white/90 mb-6 text-lg">
            Join thousands of satisfied customers discovering their perfect products
          </p>
          <button className="btn btn-lg btn-accent gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Sparkles size={20} />
            Start Shopping
            <Sparkles size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}