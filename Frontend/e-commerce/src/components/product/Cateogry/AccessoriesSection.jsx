export default function AccessoriesSection() {


    const accessories = [
        {
            name: "Bags",
            img: "https://media.self.com/photos/63503faecbcc10f798a3cc8e/1:1/w_3748,h_3748,c_limit/Dermatologist-skincare-tips.jpg",
        },
        {
            name: "Watches",
            img: "https://cloudhaircare.com/cdn/shop/files/Generative_Fill.jpg?v=1723654440",
        },
        {
            name: "Belts",
            img: "https://thumbs.dreamstime.com/b/colorful-cosmetics-arranged-around-clear-space-vanity-mirror-reflection-presenting-lively-collection-makeup-396650265.jpg",
        },
        {
            name: "Sunglasses",
            img: "https://images.stockcake.com/public/5/1/3/513d57f0-5f6e-4d18-9bcf-8a7e9c28331c_large/elegant-perfume-collection-stockcake.jpg",
        },
    ];


    return (
        <section>
            <h1 className="text-4xl font-bold text-center">Accessories</h1>
            <h2 className="italic font-semibold text-3xl tracking-wider text-center">Complete Your Look</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {accessories.map((acc, i) => (
                    <div key={i}
                     className="relative rounded-xl shadow-md group"
                    >
                    <img src={acc.img} alt={acc.name} className="object-cover h-52 w-full rounded-md transition-transform duration-500 group-hover:scale-110"/>
                    <p>{acc.name}</p>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                    </div>
                ))}

            </div>
        </section>
    )
}
