import { useState } from "react";
import { useAddProductMutation } from "./productSlice";
import GeneralInfo from "./GeneralInfo";
import ImageUploader from "./ImageUploader.jsx";
import VariantSelection from "./VariantSelection.jsx";

export default function ProductForm() {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: { main: "", sub: "", gender: "" },
    basePrice: 0,
    stock: 0,
    discount: 0,
    featured: false,
    baseVariant: { typeValues: {}, price: 0, stock: 0 }
  });

  const [variants, setVariants] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    if (!formData.category.main || !formData.category.sub || !formData.category.gender) {
      alert("Please select category, sub-category and gender");
      return;
    }

    if (newFiles.length === 0) {
      alert("Please upload at least one product image");
      return;
    }

    try {
      const form = new FormData();

      // Main product data
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", JSON.stringify(formData.category));
      form.append("basePrice", formData.basePrice);
      form.append("stock", formData.stock);
      form.append("discount", formData.discount || 0);
      form.append("featured", formData.featured);

      // Base Variant (attributes from GeneralInfo - NO images)
      form.append("baseVariant", JSON.stringify(formData.baseVariant));

      // Additional Variants (with images)
      form.append("variants", JSON.stringify(
        variants.map(v => ({
          typeValues: v.typeValues,
          price: v.price,
          stock: v.stock,
          discount: v.discount,
          thumbnailIndex: v.thumbnailIndex
        }))
      ));

      // Main product images (These ARE the Base Variant images)
      newFiles.forEach(file => form.append("images", file));

      // Additional Variant images
      variants.forEach((variant, i) => {
        variant.images.forEach(imgObj => {
          if (imgObj.file) {
            form.append(`variantImages_${i}`, imgObj.file);
          }
        });
      });

      await addProduct(form).unwrap();
      alert("✅ Product successfully added!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: { main: "", sub: "", gender: "" },
        basePrice: 0,
        stock: 0,
        discount: 0,
        featured: false,
        baseVariant: { typeValues: {}, price: 0, stock: 0 }
      });
      setVariants([]);
      setNewFiles([]);

    } catch (err) {
      console.error(err);
      alert("❌ Error adding product: " + (err.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-base-content/60 mt-2">Fill in the details to create a new product</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6"
        >
          {/* Left Side - General Info */}
          <div className="bg-base-100 rounded-2xl shadow-xl p-6">
            <GeneralInfo formData={formData} setFormData={setFormData} />
          </div>

          {/* Right Side - Images & Variants */}
          <div className="space-y-6">
            {/* Main Product Images */}
            <div className="bg-base-100 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold mb-4">Main Product Images</h3>
              <p className="text-sm text-base-content/60 mb-4">These will be used for the base variant</p>
              <ImageUploader newFiles={newFiles} setNewFiles={setNewFiles} />
            </div>

            {/* Additional Variants */}
            <div className="bg-base-100 rounded-2xl shadow-xl p-6">
              <VariantSelection 
                formData={formData} 
                variants={variants} 
                setVariants={setVariants} 
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`btn btn-primary btn-lg w-full ${isLoading ? "loading" : ""}`}
            >
              {isLoading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
