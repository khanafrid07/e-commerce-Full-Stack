import { Package, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ProductInfo({ info, product }) {
    const [open, setOpen] = useState(true);

    const hasDiscount = info?.discount > 0;
    const finalPrice = hasDiscount
        ? info?.price * (1 - info?.discount / 100)
        : info?.price;

    return (
        <div className="flex flex-col gap-6 p-4">

            {/* TITLE */}
            <h2 className="font-bold text-2xl sm:text-4xl leading-tight">
                {product?.title}
            </h2>

            {/* PRICE */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-3xl font-bold text-primary">
                        ₹{Math.round(finalPrice)}
                    </p>

                    {hasDiscount && (
                        <>
                            <p className="text-lg line-through text-base-content/40">
                                ₹{info?.price}
                            </p>
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-sm font-semibold">
                                {info.discount}% OFF
                            </span>
                        </>
                    )}
                </div>

                <p className={`text-sm font-medium ${info?.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                    {info?.stock > 0
                        ? `In Stock (${info.stock} items)`
                        : "Out of Stock"}
                </p>
            </div>

            {/* COLLAPSIBLE DESCRIPTION */}
            <div className="border rounded-2xl overflow-hidden">

                {/* HEADER */}
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-base-100 hover:bg-base-200 transition"
                >
                    <div className="flex items-center gap-2">
                        <Package size={18} className="text-primary" />
                        <span className="font-semibold">Product Details</span>
                    </div>

                    <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {/* CONTENT */}
                <div
                    className={`transition-all duration-300 overflow-hidden ${open ? "max-h-[500px] opacity-100 p-4" : "max-h-0 opacity-0"
                        }`}
                >
                    <p className="text-base-content/70 leading-relaxed">
                        {product?.description}
                    </p>

                    {product?.keyFeatures?.length > 0 && (
                        <div className="mt-4">
                            <p className="font-semibold mb-2">Key Features</p>
                            <ul className="space-y-1">
                                {product.keyFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex gap-2 text-base-content/70">
                                        <span className="text-primary">•</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}