
import { ShoppingCart, Minus, Plus } from "lucide-react";

export default function AddToCartSection({ 
  quantity, 
  setQuantity, 
  stock, 
  finalPrice, 
  onAddToCart, 
  isLoading 
}) {
  return (
    <div className="mt-auto space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="text-sm font-semibold text-base-content/80">Quantity:</span>
        <div className="join shadow-md">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="btn join-item btn-sm sm:btn-md"
            disabled={quantity <= 1}
          >
            <Minus size={18} />
          </button>
          <div className="join-item btn btn-sm sm:btn-md pointer-events-none min-w-[60px] font-bold">
            {quantity}
          </div>
          <button 
            onClick={() => setQuantity(q => Math.min(stock, q + 1))}
            className="btn join-item btn-sm sm:btn-md"
            disabled={quantity >= stock}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <button
        onClick={onAddToCart}
        disabled={stock <= 0 || isLoading}
        className={`btn btn-primary btn-lg w-full gap-3 shadow-xl hover:shadow-2xl transition-all text-base sm:text-lg ${
          isLoading ? "loading" : ""
        }`}
      >
        {isLoading ? (
          "Adding..."
        ) : stock <= 0 ? (
          "Out of Stock"
        ) : (
          <>
            <ShoppingCart size={24} />
            Add to Cart - ₹{(finalPrice * quantity).toFixed(2)}
          </>
        )}
      </button>

      {stock > 0 && stock < 10 && (
        <div className="alert alert-warning shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-sm sm:text-base">Only {stock} left - Order soon!</span>
        </div>
      )}
    </div>
  );
}