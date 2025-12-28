import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import fashionBanner from "../../../assets/bannerFashion.png";
import beautyBanner from "../../../assets/beautyBanner.png"
import BeautySection from "./BeautySection";
import accessoriesBanner from "../../../assets/accessoriesBanner.png"
import AccessoriesSection from "./AccessoriesSection";
import FootwearSection from "./FoorwearSection";
export default function CategoryFilter() {
  const { category } = useParams();
  const navigate = useNavigate();

  const fashionCategories = {
    men: [
      { name: "t-shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop", color: "from-blue-600 to-blue-700" },
      { name: "jeans", image: "https://hips.hearstapps.com/hmg-prod/images/mhl-052324-jean-opener-2076-66acf6900d29d.jpg?crop=0.862xw:0.862xh;0.0641xw,0.138xh&resize=1200:*", color: "from-indigo-600 to-indigo-700" },
      { name: "jackets", image: "https://u-mercari-images.mercdn.net/photos/m17793856467_1.jpg", color: "from-gray-600 to-gray-700" },
      { name: "hoodies", image: "https://5.imimg.com/data5/ECOM/Default/2023/12/370112014/BY/BZ/TP/205506747/5630216149-500x500.jpg", color: "from-slate-600 to-slate-700" },
    ],
    women: [
      { name: "tops", image: "https://www.irealife.com/cdn/shop/articles/Top_10_Floral_Tops_for_Women_s_Latest_Design.jpg?v=1716207356", color: "from-pink-600 to-pink-700" },
      { name: "jeans", image: "https://showoffff.in/cdn/shop/files/CHN-88103_Blue_1_af383187-f059-453a-8989-af3d20cbb087.jpg?v=1751545859&width=1080", color: "from-rose-600 to-rose-700" },
      { name: "dresses", image: "https://i.ytimg.com/vi/9ZRuDUejrkQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDuSvO0eIDOksQ4P-SPyXTB3FUaWg", color: "from-purple-600 to-purple-700" },
      { name: "jackets", image: "https://www.instyle.com/thmb/OOPheWbk8K2T2RjnSLXwiIE6lXw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/jackets-fad3552e9c974578b74ffce1768b7ba0.jpg", color: "from-fuchsia-600 to-fuchsia-700" },
    ],
  };

  const renderSection = (gender, items) => {
    const isWomen = gender === "Women";
    const sectionColor = isWomen ? "from-pink-600 to-rose-600" : "from-blue-600 to-indigo-600";
    const sectionBgGradient = isWomen ? "from-pink-50 to-rose-50" : "from-blue-50 to-indigo-50";

    return (
      <div className="mb-24">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-14 px-2">
          <div className="flex items-center gap-4">
            <div className={`bg-gradient-to-r ${sectionColor} p-4 rounded-2xl shadow-lg`}>
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Curated Collection</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">{gender}'s Fashion</h2>
            </div>
          </div>
          <Sparkles className={`w-8 h-8 text-${isWomen ? 'pink' : 'blue'}-600 hidden md:block`} />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 px-2">
          {items.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(`/category/fashion/${gender.toLowerCase()}/${item.name}`)}
              className="group relative h-full transition-all duration-300 hover:-translate-y-4"
            >
              {/* Card Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-64 md:h-72">
                
                {/* Image Background */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

                {/* Dark Overlay for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-2xl md:text-3xl font-black capitalize mb-3">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    Explore <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Static Text at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-white font-bold text-lg capitalize text-center drop-shadow-lg">
                    {item.name}
                  </p>
                </div>

              
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 origin-top-right">
                  <div className={`bg-gradient-to-r ${item.color} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg`}>
                    New
                  </div>
                </div>
              </div>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      
     
      <div className="relative w-full h-[35vh] md:h-[50vh] overflow-hidden border rounded-b-3xl shadow-lg mb-4">
        <img
          src={category=="Fashion"?fashionBanner:category=="Beauty"?beautyBanner:category=="Accessories"?accessoriesBanner:"footwear"}
          alt="Fashion Banner"
          className="w-full h-full object-cover"
        />
        
       
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
      
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
          <div className="mb-6">
            <p className="text-white/80 text-2xl md:text-2xl font-semibold uppercase tracking-widest mb-3 ">
              Welcome to
            </p>
            <h1 className="animate-pulse text-5xl md:text-7xl font-black text-black capitalize drop-shadow-2xl mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              {category}
            </h1>
          </div>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
            Discover the latest trends and timeless styles for every occasion
          </p>
        </div>
      </div>

      {category === "Fashion" && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
          
         
          {renderSection("Men", fashionCategories.men)}

          
          <div className="my-20 px-4">
            <div className="relative h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                  ✨ Explore More ✨
                </p>
              </div>
            </div>
          </div>

          
          {renderSection("Women", fashionCategories.women)}
        </div>
      )}
      {category==="Beauty"&&(
        <BeautySection/>
      )}
      {category=="Accessories" && (
        <AccessoriesSection/>
      )}
       {category=="Footwear" && (
        <FootwearSection/>
      )}

      
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 md:py-20 text-center">
        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
          Can't Find What You're Looking For?
        </h3>
        <p className="text-white/80 mb-8 text-lg">
          Browse our complete collection or contact our support team for personalized recommendations
        </p>
        <button className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
          View All Products
        </button>
      </div>

      
    </div>

   
  );
}