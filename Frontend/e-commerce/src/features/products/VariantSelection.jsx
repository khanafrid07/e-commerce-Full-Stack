
import { useState, useEffect } from "react";
import { Plus, Copy } from "lucide-react";
import VariantForm from "./VariantForm";
import { VARIANT_OPTIONS } from "./variantConfig";

export default function VariantSelection({ 
  formData, 
  variants, 
  setVariants, 
  isEditing = false 
}) {
  const selectedCategory = formData?.category?.main;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Safety check for selectedVariantIndex
  useEffect(() => {
    if (selectedVariantIndex >= variants.length && variants.length > 0) {
      setSelectedVariantIndex(variants.length - 1);
    }
  }, [variants.length, selectedVariantIndex]);

  // Add single variant
  const addVariant = () => {
    if (!selectedCategory) return;
    
    const newVariant = {
      typeValues: VARIANT_OPTIONS[selectedCategory].reduce((obj, key) => ({ ...obj, [key]: "" }), {}),
      price: 0,
      stock: 0,
      discount: 0,
      images: [],
      thumbnailIndex: 0,
    };
    setVariants([...variants, newVariant]);
    setSelectedVariantIndex(variants.length);
  };

  // Quick add multiple variants
  const quickAddVariants = () => {
    setShowQuickAdd(true);
  };

  // Update variant
  const updateVariant = (index, updatedVariant) => {
    const updated = [...variants];
    updated[index] = updatedVariant;
    setVariants(updated);
  };

  // Delete variant
  const deleteVariant = (index) => {
    const updated = variants.filter((_, idx) => idx !== index);
    setVariants(updated);
    
    if (selectedVariantIndex >= updated.length && updated.length > 0) {
      setSelectedVariantIndex(updated.length - 1);
    } else if (updated.length === 0) {
      setSelectedVariantIndex(0);
    }
  };

  // Duplicate variant
  const duplicateVariant = (index) => {
    const variantToDuplicate = variants[index];
    const newVariant = {
      ...variantToDuplicate,
      typeValues: { ...variantToDuplicate.typeValues },
      images: [], // Don't copy images
    };
    setVariants([...variants, newVariant]);
    setSelectedVariantIndex(variants.length);
  };

  if (!selectedCategory) {
    return (
      <div className="alert alert-info shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Please select a product category first</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Additional Variants</h2>
          <p className="text-sm opacity-60">Create more product combinations (Optional)</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={addVariant} 
            className="btn btn-primary btn-sm gap-2"
          >
            <Plus size={18} />
            Add Variant
          </button>
          
          {variants.length > 0 && (
            <button 
              type="button" 
              onClick={() => duplicateVariant(selectedVariantIndex)} 
              className="btn btn-outline btn-sm gap-2"
              title="Duplicate current variant"
            >
              <Copy size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Helper Text */}
      {variants.length === 0 && (
        <div className="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <h3 className="font-bold">No additional variants yet</h3>
            <div className="text-xs">
              Click "Add Variant" to create variations like different sizes or colors.
              <br />
              <strong>Tip:</strong> For Black in sizes M, L, XL - create 3 separate variants
            </div>
          </div>
        </div>
      )}

      {/* Variant Tabs */}
      {variants.length > 0 && (
        <div className="tabs tabs-boxed bg-base-200 p-1 gap-1 flex-wrap">
          {variants.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedVariantIndex(idx)}
              className={`tab ${selectedVariantIndex === idx ? "tab-active" : ""}`}
            >
              Variant {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Current Variant Form */}
      {variants[selectedVariantIndex] && (
        <VariantForm
          variant={variants[selectedVariantIndex]}
          variantIndex={selectedVariantIndex + 1}
          category={selectedCategory}
          onUpdate={(updated) => updateVariant(selectedVariantIndex, updated)}
          onDelete={() => deleteVariant(selectedVariantIndex)}
        />
      )}

      {/* Summary Stats */}
      {variants.length > 0 && (
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100">
          <div className="stat">
            <div className="stat-title">Additional Variants</div>
            <div className="stat-value text-primary">{variants.length}</div>
            <div className="stat-desc">Plus 1 base variant</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Total Stock</div>
            <div className="stat-value text-secondary">
              {variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0)}
            </div>
            <div className="stat-desc">From additional variants</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Avg Price</div>
            <div className="stat-value text-accent">
              ₹{variants.length > 0 
                ? (variants.reduce((sum, v) => sum + (Number(v.price) || 0), 0) / variants.length).toFixed(0)
                : 0}
            </div>
            <div className="stat-desc">Average variant price</div>
          </div>
        </div>
      )}
    </div>
  );
}


