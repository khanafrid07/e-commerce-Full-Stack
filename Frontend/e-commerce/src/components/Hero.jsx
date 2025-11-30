import { motion } from "framer-motion";
import hero from "../assets/hero.png";
import useTypingEffect from "../hooks/useTypingEffect";
export default function Hero() {

     const text = useTypingEffect(
    ["Big Winter Sale Coming Soon!", "New Arrivals", "Limited Offers!"],
    120,
    800
  );
    return (
        <section className="relative w-full h-auto md:h-[80vh] bg-gray-200 overflow-hidden">

            {/* Subtle overlay */}
            <div className="text-center mt-4 italic h-8 text-xl">
                <h2>{text}</h2>
            </div>

            <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 h-full">

                {/* Image Section */}
                <motion.div
                    className="flex items-center justify-center order-1 md:order-2"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.img
                        src={hero}
                        alt="Hero"
                        className="object-contain max-h-[400px] md:h-full w-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>

                {/* Text Section */}
                <motion.div
                    className="flex flex-col justify-center px-8 py-12 text-center md:text-left order-2 md:order-1"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >

                    {/* Promo Badge */}
                    <motion.p
                        className="uppercase text-sm tracking-wide text-gray-500 font-semibold mb-2"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                       ✨New Season • 🔥New Style • Shop the Latest Trends
                    </motion.p>

                    {/* Main Headline */}
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Welcome to Our Store
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        className="text-gray-700 text-lg md:text-xl mb-6 max-w-lg mx-auto md:mx-0"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        Discover Beauty, Fashion & Essentials in One Place
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <motion.button
                            className="px-8 py-3 text-white rounded-full bg-gradient-to-r from-purple-500 to-pink-200
                             hover:from-pink-300 hover:to-pink-400 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                        >
                            Shop Now
                        </motion.button>
                        <button className="px-8 py-3 text-gray-800 bg-gray-200 hover:bg-white rounded-full transition">
                            Explore Categories
                        </button>

                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-700 mb-6 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <span className="flex items-center gap-1">✔ Fast Delivery</span>
                        <span className="flex items-center gap-1">✔ Easy Returns</span>
                        <span className="flex items-center gap-1">✔ 24/7 Support</span>
                        <span className="flex items-center gap-1">✔ Secure Payments</span>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
