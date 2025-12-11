import { VARIANT_OPTIONS, VARIANT_VALUES } from "./variantConfig";

export default function GeneralInfo({ formData, setFormData }) {
  const categories = ["Clothes", "Footwear", "Accessories", "Beauty"];

  const subCategories = {
    Clothes: ["T-Shirts", "Jeans", "Jacket", "Dresses", "Shirts", "Hoodies"],
    Footwear: ["Sneakers", "Sandals", "Boots", "Formal Shoes"],
    Accessories: ["Bags", "Belts", "Watches", "Sunglasses"],
    Beauty: ["Skincare", "Makeup", "Fragrance", "Haircare"]
  };

  const handleCategoryChange = (main) => {
    setFormData(prev => ({
      ...prev,
      category: { ...prev.category, main, sub: "", gender: "" },
      baseVariant: {
        typeValues: VARIANT_OPTIONS[main]?.reduce((obj, key) => ({ ...obj, [key]: "" }), {}) || {},
        price: prev.basePrice || 0,
        stock: prev.stock || 0
      }
    }));
  };

  const handleSubCategoryChange = (sub) => {
    setFormData(prev => ({
      ...prev,
      category: { ...prev.category, sub }
    }));
  };

  const handleGenderChange = (gender) => {
    setFormData(prev => ({
      ...prev,
      category: { ...prev.category, gender }
    }));
  };

  const handleNumberChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: Number(value) || 0 }));
  };

  const handleBaseVariantChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      baseVariant: {
        ...prev.baseVariant,
        typeValues: { ...prev.baseVariant.typeValues, [type]: value },
        price: prev.basePrice || prev.baseVariant.price,
        stock: prev.stock || prev.baseVariant.stock
      }
    }));
  };

  const selectedCategory = formData?.category?.main;

  const finalPrice = Math.floor(
    (Number(formData.basePrice) || 0) -
    ((Number(formData.basePrice) || 0) * (Number(formData.discount) || 0)) / 100
  );

  return (
    <div className="w-full space-y-6">
      {/* Featured */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-4">
          <input
            type="checkbox"
            className="toggle toggle-success"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          <span className="label-text font-semibold text-lg">Featured Product</span>
        </label>
      </div>

      {/* Product Name */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Product Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter product name"
          className="input input-bordered w-full"
          value={formData.title || ""}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      {/* Product Description */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Product Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full h-32"
          placeholder="Describe your product..."
          value={formData.description || ""}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Main Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.category?.main || ""}
              onChange={(e) => handleCategoryChange(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Sub Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.category?.sub || ""}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              disabled={!formData.category?.main}
              required
            >
              <option value="">
                {formData.category?.main ? "Select Sub Category" : "Select main category first"}
              </option>
              {formData.category?.main &&
                subCategories[formData.category.main]?.map((sub, i) => 
                  <option key={i} value={sub}>{sub}</option>
                )
              }
            </select>
          </div>
        </div>
      </div>

      {/* Gender */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Gender</span>
        </label>
        <div className="flex gap-3">
          {["Men", "Women", "Unisex"].map(label => (
            <button
              key={label}
              type="button"
              className={`btn ${formData.category?.gender === label ? "btn-primary" : "btn-outline"}`}
              onClick={() => handleGenderChange(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing & Stock */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Pricing & Stock</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Base Price (₹)</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              className="input input-bordered w-full"
              value={formData.basePrice || ""}
              onChange={(e) => handleNumberChange("basePrice", e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Stock Quantity</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              className="input input-bordered w-full"
              value={formData.stock || ""}
              onChange={(e) => handleNumberChange("stock", e.target.value)}
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
              placeholder="0"
              className="input input-bordered w-full"
              value={formData.discount || ""}
              onChange={(e) => handleNumberChange("discount", e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Final Price (₹)</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-base-200"
              value={finalPrice}
              disabled
            />
          </div>
        </div>
      </div>

      {/* Base Variant */}
      <div className="space-y-4 p-4 bg-success/10 rounded-xl border-2 border-success/30">
        <div className="flex items-center gap-2">
          <div className="badge badge-success badge-lg">Base Variant</div>
          <span className="text-sm text-base-content/70">(Images: Main product images)</span>
        </div>
        {selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VARIANT_OPTIONS[selectedCategory].map((type) => (
              <div key={type} className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{type}</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={formData.baseVariant?.typeValues?.[type] || ""}
                  onChange={(e) => handleBaseVariantChange(type, e.target.value)}
                  required
                >
                  <option value="">Select {type}</option>
                  {VARIANT_VALUES[type]?.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Select a category first</span>
          </div>
        )}
      </div>
    </div>
  );
}