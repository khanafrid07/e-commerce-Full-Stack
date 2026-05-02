import { useEffect, useState } from "react";
import BannerRenderer from "./BannerRenderer";

export default function BannerCarousel({ banners = [], rounded = true, interval = 4000 }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!banners.length) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % banners.length);
        }, interval);

        return () => clearInterval(timer);
    }, [banners.length, interval]);

    if (!banners.length) return null;

    return (
        <div className="relative w-full overflow-hidden">

            {/* TRACK */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${activeIndex * 100}%)`,
                }}
            >
                {banners.map((banner) => (
                    <div key={banner._id} className="w-full flex-shrink-0">
                        <BannerRenderer banner={banner} rounded={rounded} />
                    </div>
                ))}
            </div>

            {/* DOT INDICATORS */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-2 w-2 rounded-full transition ${i === activeIndex ? "bg-black scale-125" : "bg-black/30"
                            }`}
                    />
                ))}
            </div>

        </div>
    );
}