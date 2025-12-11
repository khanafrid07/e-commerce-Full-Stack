export default function VariantSelection({ formData, variants, setVariants, isEditing = false }) {
  const selectedCategory = formData?.category?.main;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Initialize base variant when category changes (only in create mode)
  useEffect(() => {
    if (!isEditing && selectedCategory && VARIANT_CONFIG[selectedCategory]) {
      const config = VARIANT_CONFIG[selectedCategory];
      const baseVariant = {
        typeValues: config.attributes.reduce((obj, key) => ({ ...obj, [key]: "" }), {}),
        price: formData.basePrice || 0,
        stock: formData.stock || 0,
        discount: 0,
        images: [],
        thumbnailIndex: 0
      };
      setVariants([baseVariant]);
      setSelectedVariantIndex(0);
    }
  }, [selectedCategory, isEditing]);

  // Safety check for selectedVariantIndex
  useEffect(() => {
    if (selectedVariantIndex >= variants.length && variants.length > 0) {
      setSelectedVariantIndex(variants.length - 1);
    }
  }, [variants.length, selectedVariantIndex]);

  // Add new variant
  const addVariant = () => {
    if (!selectedCategory) return;
    
    const config = VARIANT_CONFIG[selectedCategory];
    const newVariant = {
      typeValues: config.attributes.reduce((obj, key) => ({ ...obj, [key]: "" }), {}),
      price: 0,
      stock: 0,
      discount: 0,
      images: [],
      thumbnailIndex: 0,
    };
    setVariants([...variants, newVariant]);
    setSelectedVariantIndex(variants.length);
  };

  // Update variant
  const updateVariant = (index, updatedVariant) => {
    const updated = [...variants];
    updated[index] = updatedVariant;
    setVariants(updated);
    
    // Sync base variant with formData
    if (index === 0) {
      formData.baseVariant = updatedVariant;
    }
  };

  // Delete variant
  const deleteVariant = (index) => {
    if (index === 0) return; // Can't delete base variant
    
    const updated = variants.filter((_, idx) => idx !== index);
    setVariants(updated);
    
    if (selectedVariantIndex >= updated.length) {
      setSelectedVariantIndex(updated.length - 1);
    }
  };

  if (!selectedCategory) {
    return (
      <div className="alert alert-info shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Please select a product category first to configure variants</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Variants</h2>
          <p className="text-sm opacity-60 mt-1">Manage different variations of your product</p>
        </div>
        
        <button
          type="button"
          onClick={addVariant}
          className="btn btn-primary gap-2"
        >
          <Plus size={18} />
          Add Variant
        </button>
      </div>

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
              {idx === 0 ? "Base" : `Variant ${idx}`}
            </button>
          ))}
        </div>
      )}

      {/* Current Variant Form */}
      {variants[selectedVariantIndex] && (
        <VariantForm
          variant={variants[selectedVariantIndex]}
          variantIndex={selectedVariantIndex}
          category={selectedCategory}
          onUpdate={(updated) => updateVariant(selectedVariantIndex, updated)}
          onDelete={() => deleteVariant(selectedVariantIndex)}
          isBaseVariant={selectedVariantIndex === 0}
        />
      )}

      {/* Summary Stats */}
      {variants.length > 0 && (
        <div className="stats shadow w-full">
          <div className="stat">
            <div className="stat-title">Total Variants</div>
            <div className="stat-value text-primary">{variants.length}</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Total Stock</div>
            <div className="stat-value text-secondary">
              {variants.reduce((sum, v) => sum + (v.stock || 0), 0)}
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Avg Discount</div>
            <div className="stat-value text-accent">
              {variants.length > 0 
                ? (variants.reduce((sum, v) => sum + (v.discount || 0), 0) / variants.length).toFixed(1)
                : 0}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}