import { Trash2 } from "lucide-react";
import VariantImageUpload from "./VariantImageUpload";
import { VARIANT_OPTIONS, VARIANT_VALUES } from "./variantConfig";

export default function VariantForm({ 
  variant, 
  variantIndex, 
  category, 
  onUpdate, 
  onDelete
}) {
  
  const handleFieldChange = (field, value) => {
    const numericFields = ["price", "stock", "discount"];
    const updatedValue = numericFields.includes(field) ? Number(value) || 0 : value;
    onUpdate({ ...variant, [field]: updatedValue });
  };

  const handleAttributeChange = (attr, value) => {
    onUpdate({
      ...variant,
      typeValues: { ...variant.typeValues, [attr]: value }
    });
  };

  const handleImagesAdd = (files) => {
    const newImages = files.map(file => ({ 
      file,
      url: null,
      fileName: null,
      existing: false
    }));
    const allImages = [...variant.images, ...newImages].slice(0, 5);
    onUpdate({ ...variant, images: allImages });
  };

  const handleImageRemove = (imgIdx) => {
    const updatedImages = variant.images.filter((_, i) => i !== imgIdx);
    const newThumbnailIndex = variant.thumbnailIndex >= updatedImages.length ? 0 : variant.thumbnailIndex;
    onUpdate({ ...variant, images: updatedImages, thumbnailIndex: newThumbnailIndex });
  };

  const handleThumbnailSet = (imgIdx) => {
    onUpdate({ ...variant, thumbnailIndex: imgIdx });
  };

  const finalPrice = variant.price - (variant.price * variant.discount) / 100;

  return (
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-title text-lg">
            Additional Variant {variantIndex}
          </h3>
          
          <button 
            type="button" 
            onClick={onDelete} 
            className="btn btn-error btn-sm gap-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        {/* Attributes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {VARIANT_OPTIONS[category]?.map((attr) => (
            <div key={attr} className="form-control">
              <label className="label">
                <span className="label-text font-medium">{attr}</span>
              </label>
              <select
                value={variant.typeValues[attr] || ""}
                onChange={(e) => handleAttributeChange(attr, e.target.value)}
                className="select select-bordered w-full"
                required
              >
                <option defaultValue={"none"} value="">Select {attr}</option>
                {VARIANT_VALUES[attr]?.map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Price, Stock, Discount */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Price (₹)</span>
            </label>
            <input
              type="number"
              min="0"
              value={variant.price || 0}
              onChange={(e) => handleFieldChange("price", e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Stock</span>
            </label>
            <input
              type="number"
              min="0"
              value={variant.stock || 0}
              onChange={(e) => handleFieldChange("stock", e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Discount (%)</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={variant.discount || 0}
              onChange={(e) => handleFieldChange("discount", e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Final Price</span>
            </label>
            <input
              type="number"
              value={finalPrice.toFixed(2)}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
        </div>

        <div className="divider"></div>
        
        <VariantImageUpload
          images={variant.images}
          maxImages={5}
          onAdd={handleImagesAdd}
          onRemove={handleImageRemove}
          onSetThumbnail={handleThumbnailSet}
          thumbnailIndex={variant.thumbnailIndex}
        />
      </div>
    </div>
  );
}
