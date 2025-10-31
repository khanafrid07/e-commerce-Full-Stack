import { useState } from "react";
import { useAddToCartMutation } from "../features/cart/cart.js";

export default function ProductDetailCard({ data }) {
  // ✅ Determine main image
  const mainImageUrl =
    data.images.find(img => img.isMain)?.url || // pick main image if exists
    data.images[0]?.url || // fallback: first image
    "/placeholder.png"; // fallback placeholder

  // ✅ Preview images (all images except main)
  const previewImages = data.images.filter(img => img.url !== mainImageUrl);

  // ✅ State
  const [previewImage, setPreviewImage] = useState(mainImageUrl);
  const [quantity, setQuantity] = useState(1);

  const [addToCart, { isLoading, isSuccess, isError }] = useAddToCartMutation();

  // ✅ Add to cart handler
  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: data?._id, quantity }).unwrap();
      alert("✅ Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Failed to add to cart");
    }
  };

  return (
    <div className="grid w-full md:grid-cols-[2fr_2fr] sm:grid-cols-1 gap-4">
      {/* 🖼️ Image Section */}
      <div className="shadow-lg border rounded-xl overflow-hidden p-4 bg-white">
        <div className="relative">
          <img
            src={previewImage}
            alt={data?.title || "Product image"}
            className="w-full max-h-96 object-contain rounded-lg"
          />
          <p className="text-center text-sm text-gray-500 mt-2">
            Click an image below to view full preview
          </p>
        </div>

        {/* 🔳 Thumbnails */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {/* Main image thumbnail */}
          <div
            onClick={() => setPreviewImage(mainImageUrl)}
            className="border rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <img
              src={mainImageUrl}
              alt="Main Thumbnail"
              className="h-24 object-cover w-full"
            />
          </div>

          {/* Preview thumbnails */}
          {previewImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setPreviewImage(img.url)}
              className="border rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={img.url}
                alt={`Thumbnail ${index}`}
                className="h-24 object-cover w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 📦 Product Info */}
      <div className="flex flex-col justify-center gap-4 p-6">
        <p className="text-2xl font-bold text-gray-800">{data?.title}</p>
        <h3 className="text-lg font-semibold text-gray-700">Product Details</h3>

        {/* Description */}
        {Array.isArray(data?.description) ? (
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {data.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">{data?.description}</p>
        )}

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-3">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        <button
          disabled={isLoading}
          onClick={handleAddToCart}
          className="bg-green-500 text-white font-semibold rounded-md h-10 w-40 shadow-md hover:scale-105 transition-all duration-200"
        >
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>

        {isSuccess && <p className="text-green-600">Added successfully!</p>}
        {isError && <p className="text-red-600">Error adding to cart.</p>}
      </div>
    </div>
  );
}
