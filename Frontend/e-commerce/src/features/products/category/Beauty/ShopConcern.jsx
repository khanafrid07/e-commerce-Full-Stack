import { Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function ShopConcern() {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);

    const [activeIndex, setActiveIndex] = useState(0);

    const skinConcern = [
        { name: "Acne", img: "https://www.shutterstock.com/image-photo/comparison-image-acneprone-face-before-600nw-2609899293.jpg", gradient: "from-pink-500 to-rose-600" },
        { name: "Dry Skin", img: "https://www.nascent.net.au/wp-content/uploads/dry-skin-type.png", gradient: "from-orange-500 to-amber-600" },
        { name: "Oily Skin", img: "https://www.health.com/thmb/2YYPjGjuD7eCAH41JuOELEqtNNU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-OilySkin-2b2dc80d7c8c442286cacef949f2f98f.jpg", gradient: "from-blue-500 to-cyan-600" },
        { name: "Dark Spots", img: "https://cdn.media.amplience.net/i/deciem/ORD-skin-serum-blog-header-img?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1", gradient: "from-purple-500 to-violet-600" },
        { name: "Pigmentation", img: "https://cdn.media.amplience.net/i/deciem/ORD-skin-serum-blog-header-img?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1", gradient: "from-purple-500 to-violet-600" },
        { name: "Anti Aging", img: "https://cdn.media.amplience.net/i/deciem/ORD-skin-serum-blog-header-img?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1", gradient: "from-pink-500 to-rose-600" }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = itemRefs.current.indexOf(entry.target);
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.6, // 60% visible
            }
        );

        itemRefs.current.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // progress calculation
    const progress = ((activeIndex + 1) / skinConcern.length) * 100;

    return (
        <div className="pl-4 w-full overflow-hidden">
            <h1 className="text-2xl font-bold mb-6">Shop by Concern</h1>

            {/* SCROLL */}
            <div
                ref={containerRef}
                className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6"
            >
                {skinConcern.map((concern, idx) => (
                    <div
                        key={idx}
                        ref={(el) => (itemRefs.current[idx] = el)}
                        className="group min-w-[180px] md:min-w-[240px] flex-shrink-0 snap-start cursor-pointer flex flex-col items-center"
                    >
                        <div className={`relative w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br ${concern.gradient} p-1 transition-all duration-500 hover:scale-110 shadow-xl`}>
                            <div className="relative w-full h-full rounded-full overflow-hidden bg-base-100">
                                <img
                                    src={concern.img}
                                    alt={concern.name}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-75"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <Sparkles className="text-white" size={40} />
                                </div>
                            </div>
                        </div>

                        <h3 className="mt-4 text-lg md:text-xl font-semibold text-center">
                            {concern.name}
                        </h3>
                    </div>
                ))}
            </div>

            {/* 🔥 PROGRESS BAR */}
            <div className="mt-2 w-40 mx-auto h-[3px] bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-black rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}