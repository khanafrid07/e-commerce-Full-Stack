import Accessories from "../assets/Accessories.png"
import Beauty from "../assets/Beauty.png"
import Fashion from "../assets/Fashion.png"
import Footwear from "../assets/Footwear.png"
import { useNavigate } from "react-router-dom"
export default function CategorySection() {
    const navigate = useNavigate()
    const categories = [
        { img: Fashion, label: "Fashion" },
        { img: Beauty, label: "Beauty" },
        { img: Accessories, label: "Accessories" },
        { img: Footwear, label: "Footwear" },
    ];

    return (
        <section className="px-4">
            <h2 className="font-bold text-2xl text-center mb-6">
                Shop Our Top Category
            </h2>

            <div
                className="
                grid grid-cols-2 gap-3
                h-[26vh]     
                sm:h-[36vh]
                md:h-[55vh]
                lg:h-[75vh]
                "
            >
                {categories.map((cat, i) => (
                    <div
                        onClick={()=>navigate(`/category/${cat.label}`)}
                        key={i}
                        className="relative rounded-xl overflow-hidden shadow-md group"
                    >
                        <img
                            src={cat.img}
                            alt={cat.label}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Dark gradient overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

                        {/* Label */}
                        <p className="absolute bottom-3 left-3 text-white text-lg font-semibold tracking-wide">
                            {cat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
