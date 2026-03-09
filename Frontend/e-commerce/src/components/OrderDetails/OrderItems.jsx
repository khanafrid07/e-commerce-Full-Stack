import { Package } from "lucide-react";
import ProductCard from "./ProductCard";

export default function OrderItems({ products, onStatusChange }) {
  return (
    <div>
      <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-800">
        <div className="bg-orange-100 p-2 rounded-lg">
          <Package size={24} className="text-orange-600" />
        </div>
        Order Items ({products.length})
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            product={product}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
