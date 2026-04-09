import ProductCard from "./ProductCard";

export default function LandingCard({
  products = [],
  featured,
  trending,
  newArrival,
}) {
  if (!products.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-6">
      {products.map((item) => (
        <ProductCard
          key={item._id}
          product={item}
          featured={featured}
          trending={trending}
          newArrival={newArrival}
        />
      ))}
    </div>
  );
}