import { useState, useEffect } from "react";
import { ShoppingCart, Minus, Plus, CheckCircle2, XCircle } from "lucide-react";
import { useAddToCartMutation } from "../features/cart/cart";

export default function ProductDetailCard({ data }) {
  if (!data) return null;

  const [addToCart] = useAddToCartMutation();

  const images = data.images || [];
  const mainImage = images.find((img) => img.isMain)?.url || images[0]?.url || "/placeholder.png";
  const [previewImage, setPreviewImage] = useState(mainImage);

  const variants = data.variants || [];
  const variantTypes = variants[0]?.typeValues ? Object.keys(variants[0].typeValues) : [];

  // ✅ Set default variant to first variant available
  const [selectedVariant, setSelectedVariant] = useState(
    variants[0]?.typeValues || {}
  );

  const [price, setPrice] = useState(variants[0]?.price || 0);
  const [stock, setStock] = useState(variants[0]?.stock || 0);
  const [quantity, setQuantity] = useState(1);

  // Update price and stock when selected variant changes
  useEffect(() => {
    if (!variants.length) return;

    const matched = variants.find((v) => {
      const values = v.typeValues || {};
      return Object.entries(selectedVariant).every(([key, val]) => values[key] === val);
    });

    if (matched) {
      setPrice(matched.price);
      setStock(matched.stock);
    } else {
      setPrice(0);
      setStock(0);
    }
  }, [selectedVariant, variants]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart({
        productId: data._id,
        quantity,
        variants: selectedVariant, // send the selected variant
        price, // send price for this variant
      }).unwrap();
      alert("✅ Product added to cart");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product to cart");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 grid md:grid-cols-[420px_1fr] grid-cols-1 gap-6 lg:gap-10 bg-white rounded-3xl shadow-xl border border-gray-100">
      {/* Image Section */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative w-full rounded-3xl overflow-hidden bg-gray-100 shadow-inner">
          <img
            src={previewImage}
            alt={data.title}
            className="w-full h-[300px] sm:h-[420px] md:h-[480px] lg:h-[500px] object-contain transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto p-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setPreviewImage(img.url)}
              className={`flex-shrink-0 rounded-lg border-2 p-1 transition-all duration-300 ${
                previewImage === img.url
                  ? "border-green-500 scale-105 shadow-md"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={img.url}
                alt={`Thumbnail ${idx}`}
                className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col justify-between gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            {data.title}
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-600">
            ₹{price.toFixed(2)}
          </p>

          <p className={`font-medium mt-1 flex items-center gap-2 ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {stock > 0 ? (
              <>
                <CheckCircle2 size={18} /> In Stock: {stock}
              </>
            ) : (
              <>
                <XCircle size={18} /> Out of Stock
              </>
            )}
          </p>

          {/* Category */}
          {data.category?.main && (
            <p className="text-gray-700 mt-2 text-sm sm:text-base">
              <span className="font-medium">Category:</span> {data.category.main}
              {data.category.sub && ` > ${data.category.sub}`}{" "}
              {data.category.gender && `(${data.category.gender})`}
            </p>
          )}

          {/* Description */}
          {data.description && (
            <div className="mt-4 sm:mt-5">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">{data.description}</p>
            </div>
          )}

          {/* Variants */}
          {variantTypes.length > 0 && (
            <div className="mt-4 sm:mt-6 space-y-3">
              {variantTypes.map((type) => {
                const options = [...new Set(variants.map(v => v.typeValues?.[type] ?? ""))].filter(Boolean);
                return (
                  <div key={type}>
                    <label className="font-medium text-gray-700">{type}:</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedVariant(prev => ({ ...prev, [type]: opt }))}
                          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                            selectedVariant[type] === opt
                              ? "bg-green-600 text-white shadow-md scale-105"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 border-t pt-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition">
              <Minus size={18} />
            </button>
            <span className="text-lg sm:text-xl font-semibold w-8 text-center">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition">
              <Plus size={18} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className="btn btn-success gap-2 w-fit disabled:opacity-50 mt-2 sm:mt-3"
          >
            <ShoppingCart size={20} /> {stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
