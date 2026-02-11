
import { Star, Tag } from "lucide-react";

export default function ProductImageGallery({ 
  images, 
  previewImage, 
  setPreviewImage, 
  featured, 
  discount 
}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden bg-base-200 shadow-lg aspect-square">
        <img
          src={previewImage}
          alt="Product"
          className="w-full h-full object-contain p-4 sm:p-8"
        />
        
        {/* Badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
          {featured && (
            <span className="badge badge-warning gap-1 sm:gap-2 shadow-lg text-xs sm:text-sm">
              <Star size={14} className="fill-current" />
              Featured
            </span>
          )}
          {discount > 0 && (
            <span className="badge badge-error gap-1 sm:gap-2 shadow-lg text-xs sm:text-sm">
              <Tag size={14} />
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
        {images.slice(0, 5).map((img, idx) => (
          <button
            key={idx}
            onClick={() => setPreviewImage(img.url)}
            className={`rounded-xl overflow-hidden border-2 transition-all duration-300 aspect-square ${
              previewImage === img.url
                ? "border-primary ring-2 ring-primary ring-offset-2"
                : "border-base-300 hover:border-primary/50"
            }`}
          >
            <img
              src={img.url}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}







