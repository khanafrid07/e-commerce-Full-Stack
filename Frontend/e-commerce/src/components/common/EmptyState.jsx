import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function EmptyState({ onAction }) {
    return (
        <div className="flex items-center justify-center pt-12 py-6 px-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center max-w-md"
            >
                {/* Icon */}
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-7 h-7 text-gray-500" />
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-800">
                    Can’t find what you’re looking for?
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Try exploring our full collection — we’ve got something for everyone.
                </p>

                {/* Button */}
                <button
                    onClick={onAction}
                    className="mt-5 px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
                >
                    Browse all products
                </button>
            </motion.div>
        </div>
    );
}