import { CheckCircle2, XCircle } from "lucide-react";

export default function ProductInfo({ 
  title, 
  category, 
  price, 
  finalPrice, 
  discount, 
  savings, 
  stock 
}) {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-3 leading-tight">
        {title}
      </h1>

      {category?.main && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-lg badge-primary">{category.main}</span>
          {category.sub && <span className="badge badge-lg badge-ghost">{category.sub}</span>}
          {category.gender && <span className="badge badge-lg badge-outline">{category.gender}</span>}
        </div>
      )}

      {/* Price */}
      <div className="bg-base-200 p-4 sm:p-6 rounded-2xl">
        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <span className="text-3xl sm:text-4xl font-bold text-primary">
            ₹{finalPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <>
              <span className="text-xl sm:text-2xl text-base-content/50 line-through">
                ₹{price.toFixed(2)}
              </span>
              <span className="badge badge-success badge-lg">
                Save ₹{savings.toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className={`flex items-center gap-2 text-sm sm:text-base font-semibold ${
          stock > 0 ? "text-success" : "text-error"
        }`}>
          {stock > 0 ? (
            <>
              <CheckCircle2 size={20} />
              <span>In Stock - {stock} available</span>
            </>
          ) : (
            <>
              <XCircle size={20} />
              <span>Out of Stock</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}