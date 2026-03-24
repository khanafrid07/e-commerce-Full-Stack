import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import PromotionalBanner from "../../PromotionalBanner";
import BeautySection from "./BeautySection";
import TrendingProducts from "../../TrendingProducts";
import AccessoriesSection from "./AccessoriesSection";
import FootwearSection from "./FootwearSection";
import { motion } from "framer-motion";
import CategoryBanner from "./CategoryBanner";
import fashionBanner from "../../../assets/8277025.png"

export default function CategoryFilter() {

  const { category } = useParams();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const fashionCategories = {
    men: [
      { name: "t-shirts", image: "https://www.indianterrain.com/cdn/shop/files/essential-guide-to-mens-tshirt-fashion-unleash-your-style-990x1000.jpg?v=1717501248&width=1500", color: "from-blue-600 to-blue-700" },
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
      <div className="relative">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-14 px-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`bg-gradient-to-r ${sectionColor} p-3 sm:p-4 rounded-2xl shadow-lg`}>
              <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">Curated Collection</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900">{gender}'s Fashion</h2>
            </div>
          </div>
          <Sparkles className={`w-6 h-6 sm:w-8 sm:h-8 text-${isWomen ? 'pink' : 'blue'}-600 hidden md:block`} />
        </div>

        {/* Category Grid */}
        <div className="columns-2  lg:columns-2 gap-2 space-y-">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {items?.map((item, index) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="break-inside-avoid mb-2 sm:mb-5 cursor-pointer group"
                onClick={() =>
                  navigate(`/products?category=clothes&gender=${gender.toLowerCase()}&type=${item.name}`)
                }
              >
                <div
                  className={`relative overflow-hidden shadow-md hover:shadow-2xl transition duration-500 ${index % 4 === 0
                    ? "h-64 sm:h-80"
                    : index % 4 === 1
                      ? "h-60"
                      : index % 4 === 2
                        ? "h-72 md:h-96"
                        : "h-56 md:h-72"
                    }`}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-[2px]" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-lg font-bold capitalize tracking-wide">
                      {item.name}
                    </p>
                  </div>


                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <p className="text-white text-2xl font-black capitalize mb-2">
                      {item.name}
                    </p>

                    <button className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:scale-105 transition">
                      Shop Now
                    </button>
                  </div>


                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    New
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="p-8 space-y-4">
          <h1 className="text-2xl font-bold">Popular Products</h1>
          <TrendingProducts gender={gender} category={"clothes"} />

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {category == "Fashion" && (
        <div>

          <div className="h-[25vh] sm:h-[30vh] md:h-[40vh]  bg-cover bg-center"
            style={{ backgroundImage: `url(${fashionBanner})` }}>

          </div>
          {category === "Fashion" && (

            <div className="max-w-9xl mx-auto px-4 md:px-6 py-8 ">


              {renderSection("Men", fashionCategories.men)}


              <div className="px-4">
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

        </div>
      )}





      {category === "Beauty" && (
        <BeautySection />
      )}
      {category == "Accessories" && (
        <AccessoriesSection />
      )}
      {category == "Footwear" && (
        <FootwearSection />
      )}


      {/* <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 mt-8 md:py-20 text-center">
        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
          Can't Find What You're Looking For?
        </h3>
        <p className="text-white/80 mb-8 text-lg">
          Browse our complete collection or contact our support team for personalized recommendations
        </p>
        <button className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
          View All Products
        </button>
      </div> */}


    </div>


  );
}