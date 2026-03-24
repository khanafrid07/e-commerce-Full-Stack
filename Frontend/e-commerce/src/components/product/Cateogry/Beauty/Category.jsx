import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Category() {
    const navigate = useNavigate()
    const containerRef = useRef([])
    const itemRef = useRef([])
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        const observer = new IntersectionObserver((entry) => {
            entry.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = itemRef.current.indexOf(entry.target)
                    setActiveIndex(index)
                }
            })
        }, {
            root: containerRef.current,
            rootMargin: "0px",
            threshold: 0.5
        })
        itemRef.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect();
    })

    const category = [
        { name: "Skin Care", img: "https://media.istockphoto.com/id/883019542/photo/keep-your-skin-healthy.jpg?s=612x612&w=0&k=20&c=IRpHXgfvBQwq_FhYb9JOjFF-wEN3VdlhTGap-7TM2JQ=" },
        { name: "Hair Care", img: "https://media.istockphoto.com/id/1365604058/photo/cropped-shot-of-an-unrecognizable-young-woman-using-hairspray-in-studio-against-a-grey.jpg?s=612x612&w=0&k=20&c=kyQ5Nfg8BLE-uWrtOl2nbmaaJMOnKKAujbg6NvRJ7MM=" },
        { name: "Body Care", img: "https://static.vecteezy.com/system/resources/thumbnails/062/443/777/small/cheerful-black-man-washing-body-with-sponge-taking-shower-relaxing-standing-under-falling-hot-water-in-modern-bathroom-indoor-male-daily-hygiene-and-bodycare-concept-cropped-photo.jpg" },
        { name: "Lip Care", img: "https://nilensjord.b-cdn.net/media/b9/a4/45/1717580755/Lbepleje_Mobile_%281%29.png?width=1600" },
        { name: "Eye Care", img: "https://thumbs.dreamstime.com/b/eye-skin-care-beautiful-woman-applying-eye-cream-skin-under-eyes-high-quality-eye-skin-care-beautiful-woman-applying-eye-cream-113864362.jpg" },
        { name: "Fragrance", img: "https://media.istockphoto.com/id/1376552130/photo/studio-shot-of-a-young-woman-spraying-herself-with-perfume.jpg?s=612x612&w=0&k=20&c=q91cciLSUxLqFnc827B0i0pIki7zpU9WKWCtZ9bElR4=" },
    ];
    const progress = ((activeIndex + 1) / category.length) * 100;

    return (
        <section className="px-4 md:px-10 py-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Shop by Category
            </h1>

            <div ref={containerRef} className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory custom-scrollbar">

                {category.map((item, idx) => (
                    <div
                        ref={(el) => (itemRef.current[idx] = el)}
                        key={item.name}
                        className="min-w-[140px] md:min-w-[280px] snap-start group cursor-pointer"
                    >
                        <div className="relative w-full h-[140px] md:h-[280px] rounded-full overflow-hidden">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                            <div className=" absolute inset-0 group bg-gradient-to-t from-black/50 via-black/10 to-transparent hover:blur-xl" />
                            <div className=" text-center absolute right-14 left-8 bottom-2 translate-y-20 transition duration-500 group-hover:translate-y-0 group-hover:right-14 group-hover:bottom-12">
                                <p className="text-white text-lg font-semibold">{item.name}</p>
                                <button onClick={() => navigate(`/products?category=beauty&type=${item.name.replaceAll(" ", "").toLowerCase()}`)} className="btn btn-sm md:btn-md bg-white text-black text-xs font-semibold  rounded-full hover:scale-105 transition">Shop Now</button>
                            </div>
                        </div>

                        <p className="text-center mt-3 text-sm md:text-base font-medium">
                            {item.name}
                        </p>
                    </div>
                ))}

            </div>
            <div className="mt-4 w-40 mx-auto h-[3px] bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-black rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </section>
    );
}