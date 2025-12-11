import { Plus, Star, X } from "lucide-react";

export default function VariantImageUpload({ 
  images = [], 
  maxImages = 5, 
  onAdd, 
  onRemove, 
  onSetThumbnail, 
  thumbnailIndex = 0 
}) {
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (onAdd) onAdd(files);
  };

  const getImageUrl = (img) => {
    if (img.file instanceof File) {
      return URL.createObjectURL(img.file);
    }
    return img.url || "";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-sm">Variant Images</label>
        <span className="text-xs opacity-60">
          {images.length}/{maxImages} uploaded
        </span>
      </div>

      {images.length < maxImages && (
        <label className="btn btn-outline btn-sm gap-2 cursor-pointer w-full">
          <Plus size={16} />
          Add Images
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative group aspect-square">
              <div className={`w-full h-full rounded-lg overflow-hidden border-2 ${
                thumbnailIndex === idx ? "border-success ring-2 ring-success" : "border-base-300"
              }`}>
                <img
                  src={getImageUrl(img)}
                  alt={`Variant ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() => onSetThumbnail && onSetThumbnail(idx)}
                className="absolute bottom-1 left-1 btn btn-circle btn-xs bg-base-100 border-none shadow-lg"
                title="Set as thumbnail"
              >
                <Star
                  size={12}
                  className={thumbnailIndex === idx ? "fill-success text-success" : ""}
                />
              </button>

              <button
                type="button"
                onClick={() => onRemove && onRemove(idx)}
                className="absolute top-1 right-1 btn btn-circle btn-xs bg-base-100 border-none shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="border-2 border-dashed border-base-300 rounded-lg p-6 text-center">
          <label className="cursor-pointer flex flex-col items-center gap-2 text-base-content/60 hover:text-base-content/80">
            <Plus size={32} />
            <span className="text-sm font-medium">Click to upload images</span>
            <span className="text-xs opacity-60">Max {maxImages} images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>
      )}
    </div>
  );
}