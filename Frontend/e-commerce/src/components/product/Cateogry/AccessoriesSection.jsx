import { ShoppingBag, Watch, Award, Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function AccessoriesSection() {
  const navigate = useNavigate()
  const accessories = [
    {
      name: "Bags",
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
      icon: ShoppingBag,
      description: "Stylish & Functional",
      color: "from-amber-500 to-orange-600"
    },
    {
      name: "Watches",
      img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
      icon: Watch,
      description: "Timeless Elegance",
      color: "from-blue-500 to-cyan-600"
    },
    {
      name: "Belts",
      img: "https://images.unsplash.com/photo-1624222247344-550fb60583e2?w=500",
      icon: Award,
      description: "Perfect Fit",
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Sunglasses",
      img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      icon: Eye,
      description: "UV Protection",
      color: "from-red-500 to-rose-600"
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 px-4 md:px-10 py-16 overflow-hidden">
    
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative text-center mb-16 space-y-4">
        <div className="inline-block">
          <div className="badge badge-lg badge-primary mb-4 gap-2">
            <Award size={16} />
            Premium Collection
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Accessories
        </h1>
        
        <div className="relative inline-block">
          <h2 className="text-2xl md:text-4xl font-light italic tracking-wider text-base-content/80">
            Complete Your Look
          </h2>
          <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
        
        <p className="text-base-content/60 max-w-2xl mx-auto mt-4">
          Elevate your style with our curated collection of premium accessories
        </p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
        {accessories.map((acc, i) => {
          const Icon = acc.icon;
          return (
            <div
<<<<<<< HEAD
            onClick={()=>navigate(`/products?category=accessories&gender=men&type=${acc.name.toLowerCase()}`)}
=======
            onClick={()=>navigate(`/products?category=accessories&type=${acc.name.toLowerCase()}`)}
>>>>>>> 1a7b0e643b2f8ff447119d1baaa740f2bd406485
              key={i}
              className="group relative cursor-pointer"
            >
             
              <div className="relative bg-base-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
           
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={acc.img}
                    alt={acc.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                 
                  <div className={`absolute inset-0 bg-gradient-to-br ${acc.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`} />

               
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500">
                    <Icon className="text-white" size={24} />
                  </div>

                  <div className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <span className={`bg-gradient-to-br ${acc.color} bg-clip-text text-transparent`}>
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Content - Slides up */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  
                  {/* Category name */}
                  <h3 className="text-white text-3xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {acc.name}
                  </h3>
                  
                  {/* Description - fades in */}
                  <p className="text-white/90 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                    {acc.description}
                  </p>

                  {/* Button - appears with scale */}
                  <button className="btn btn-sm btn-primary gap-2 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 delay-200 shadow-lg">
                    Shop Now
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={`h-1 bg-gradient-to-r ${acc.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          );
        })}
      </div>

      {/* Featured Section */}
      <div className="relative max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full"></div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-4">
              <div className="badge badge-lg bg-white/20 border-white/30 text-white">
                New Collection
              </div>
              <h3 className="text-3xl md:text-5xl font-bold">
                Discover Premium Accessories
              </h3>
              <p className="text-white/90 text-lg">
                Handpicked collection of luxury accessories to complement your unique style
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none gap-2 shadow-xl">
                  <ShoppingBag size={20} />
                  Browse Collection
                </button>
                <button className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary">
                  Learn More
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {accessories.slice(0, 2).map((acc, i) => (
                <div key={i} className="relative group">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={acc.img}
                      alt={acc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "500+", label: "Products" },
            { number: "50K+", label: "Happy Customers" },
            { number: "99%", label: "Satisfaction" },
            { number: "24/7", label: "Support" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-base-content/70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}