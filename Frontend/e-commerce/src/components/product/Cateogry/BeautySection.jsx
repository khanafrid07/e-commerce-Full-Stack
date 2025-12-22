import LandingCard from "../LandingCard";
import { useGetProductsQuery } from "../../../features/products/productSlice";
export default function BeautySection() {
    const {isLoading, data} = useGetProductsQuery({sort: "featured", category: "Beauty"})
    
    
  const routines = [
    {
      name: "Skincare",
      img: "https://media.self.com/photos/63503faecbcc10f798a3cc8e/1:1/w_3748,h_3748,c_limit/Dermatologist-skincare-tips.jpg",
      
    },
    {
      name: "Haircare",
      img: "https://cloudhaircare.com/cdn/shop/files/Generative_Fill.jpg?v=1723654440",
     
    },
    {
      name: "Makeup",
      img: "https://thumbs.dreamstime.com/b/colorful-cosmetics-arranged-around-clear-space-vanity-mirror-reflection-presenting-lively-collection-makeup-396650265.jpg",
    },
    {
      name: "Fragrance",
      img: "https://images.stockcake.com/public/5/1/3/513d57f0-5f6e-4d18-9bcf-8a7e9c28331c_large/elegant-perfume-collection-stockcake.jpg",
    },
  ];

  const skinConcern = [
    {
      name: "Acne",
      img: "https://www.shutterstock.com/image-photo/comparison-image-acneprone-face-before-600nw-2609899293.jpg",
      color: "border-pink-500"
    },
    {
      name: "Dry Skin",
      img: "https://www.nascent.net.au/wp-content/uploads/dry-skin-type.png",
      color: "border-orange-600"
    },
    {
      name: "Oily Skin",
      img: "https://www.health.com/thmb/2YYPjGjuD7eCAH41JuOELEqtNNU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-OilySkin-2b2dc80d7c8c442286cacef949f2f98f.jpg",
      color: "border-red-300"
    },
    {
      name: "Treatments",
      img: "https://cdn.media.amplience.net/i/deciem/ORD-skin-serum-blog-header-img?fmt=auto&$poi$&sm=aspect&w=500&aspect=1:1",
      color: "border-yellow-600"
    }
  ]

  return (
    <section className="px-4 md:px-10 py-12">
      <h1 className="text-4xl font-semibold text-center tracking-wide">
        Beauty Essentials
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Discover your daily beauty routine
      </p>

      <h2 className="text-2xl font-medium text-center mt-12 mb-8">
        Shop by Routine
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {routines.map((item) => (
          <div
            key={item.name}
            className="
              group relative cursor-pointer
              rounded-xl overflow-hidden
              transition-transform duration-300
              hover:scale-105
              shadow-sm hover:shadow-md
            "
          >
            
            <img
              src={item.img}
              alt={item.name}
              className="
                h-44 w-full object-cover
                transition-transform duration-500
                group-hover:scale-110
              "
            />

           
            <div
              className="
                absolute inset-0 bg-black/40
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
              "
            />

            
            <p
              className="
                absolute bottom-4 left-4
                text-white text-lg font-semibold tracking-wide
                opacity-0 translate-y-4
                transition-all duration-300
                group-hover:opacity-100
                group-hover:translate-y-0
              "
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
        <div>
            <h2 className="text-2xl font-bold tracking-wide text-center mt-8">Trending Products/Best Selling</h2>
            <LandingCard products={data?.allProducts} name="Trending Products"/>
        </div>
        <div className="text-center">
          <h1 className="text-center text-4xl font-bold tracking-wide mb-4">Shop according to your Skin Concern</h1>
          <h2 className="text-3xl font-semibold">What’s Your Skin Concern?</h2>
          <p>We’ve got solutions for every skin type.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {skinConcern.map((concern, i)=>(
              
              <div className={`group relative border h-44 w-44 sm:h-64 sm:w-64 rounded-full border-4 ${concern.color} flex flex-1 items-center justify-center transition-transform duration-500 hover:scale-110`} key={i}>
                <img className="absolute inset-0 rounded-full w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 opacity-100 group-hover:opacity-90 transition duration-500" src={concern.img} alt={concern.name}/>
                
                <p className="text-black font-semibold text-3xl tracking-wide opacity-0 z-10 transition-all transition-opacity translate-y-4 duration-500 group-hover:opacity-100 scale-110 group-hover:translate-y-0">{concern.name}</p>
              </div>

             
            ))}
          </div>
        </div>
    </section>
  );
}
