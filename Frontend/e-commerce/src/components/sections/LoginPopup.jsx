import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Sparkles, ShoppingBag } from "lucide-react";

export default function LoginPopup({ onClose }) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/60 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 backdrop-blur-md transition-all"
                >
                    <X size={20} />
                </button>


                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-80" />

                <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-purple-300/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-pink-300/40 rounded-full blur-3xl pointer-events-none" />

                <div className="relative px-8 pt-12 pb-8 text-center flex flex-col items-center">

                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-40 animate-pulse" />
                        <div className="relative w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3 hover:rotate-6 transition-transform">
                            <ShoppingBag size={28} />
                            <Sparkles size={14} className="absolute -top-2 -right-2 text-yellow-300 drop-shadow-md" />
                        </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                        Unlock the Best of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">ShopSmart</span>
                    </h2>

                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
                        Join now to access exclusive member deals, track your orders easily, and build your ultimate wishlist.
                    </p>


                    <div className="w-full space-y-3">
                        <button
                            onClick={() => navigate("/login")}
                            className="group relative w-full py-4 px-4 bg-slate-900 text-white rounded-xl font-bold tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            <span className="relative z-10 drop-shadow-sm">Sign In / Register</span>
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full py-3 px-4 text-slate-500 font-semibold text-sm hover:text-slate-800 transition-colors"
                        >
                            Continue as Guest
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}