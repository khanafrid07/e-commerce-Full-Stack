import cleanser from "../../../../assets/cleanser.png";

export default function Skincare() {
    return (
        <section className="w-full px-4 md:px-10 py-12">
            <h1 className="text-center text-3xl md:text-4xl font-bold mb-10">
                Skincare Essentials
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">

                {/* BIG CARD */}
                <div className="relative md:col-span-2 md:row-span-2 group overflow-hidden">
                    <img
                        src="https://media.self.com/photos/63503faecbcc10f798a3cc8e/1:1/w_3748,h_3748,c_limit/Dermatologist-skincare-tips.jpg"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
                        <h3 className="text-white text-2xl md:text-4xl font-bold mb-2">
                            Dermatologist Approved
                        </h3>
                        <p className="text-white/90 text-sm md:text-base mb-3">
                            Gentle ingredients for healthy glowing skin.
                        </p>
                        <button className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:scale-105 transition">
                            Shop Now
                        </button>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="relative group overflow-hidden ">
                    <img
                        src={cleanser}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-lg font-semibold">
                            Daily Cleanser
                        </h3>
                    </div>
                </div>

                {/* CARD 3 */}
                <div className="relative group overflow-hidden ">
                    <img
                        src="https://i.shgcdn.com/01686fb6-bd18-4c0a-9fb8-a308b19fe16b/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-lg font-semibold">
                            Hydration Boost
                        </h3>
                    </div>
                </div>

            </div>
        </section>
    );
}