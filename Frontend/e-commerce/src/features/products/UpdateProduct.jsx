
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useViewProductQuery, useUpdateProductMutation } from "./productSlice";
import GeneralInfo from "./GeneralInfo";
import ImageUploader from "./ImageUploader";
import VariantSelection from "./VariantSelection";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useViewProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: { main: "", sub: "", gender: "" },
    basePrice: 0,
    stock: 0,
    featured: false,
    discount: 0,
    baseVariant: { typeValues: {}, price: 0, stock: 0 }
  });

  const [variants, setVariants] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  // Load product data into form
  useEffect(() => {
    if (data?.product) {
      const p = data.product;

      setFormData({
        title: p.title || "",
        description: p.description || "",
        category: p.category || { main: "", sub: "", gender: "" },
        basePrice: p.basePrice || 0,
        stock: p.stock || 0,
        featured: p.featured || false,
        discount: p.discount || 0,
        baseVariant: p.baseVariant || { typeValues: {}, price: 0, stock: 0 },
      });

      // Load additional variants (NOT base variant)
      const loadedVariants = (p.variants || []).map(v => ({
        ...v,
        images: (v.images || []).map(img => ({
          ...img,
          existing: true
        }))
      }));

      setVariants(loadedVariants);
      
      // Load main product images (Base Variant images)
      setExistingImages(p.images || []);
    }
  }, [data?.product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      // Main product fields
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("basePrice", formData.basePrice);
      form.append("stock", formData.stock);
      form.append("featured", JSON.stringify(formData.featured));
      form.append("discount", formData.discount || 0);
      form.append("category", JSON.stringify(formData.category));

      // Base Variant (attributes from GeneralInfo)
      form.append("baseVariant", JSON.stringify(formData.baseVariant));

      // Additional Variants
      form.append("variants", JSON.stringify(
        variants.map(v => ({
          typeValues: v.typeValues,
          price: Number(v.price) || 0,
          stock: Number(v.stock) || 0,
          discount: Number(v.discount) || 0,
          thumbnailIndex: v.thumbnailIndex || 0,
          images: v.images
            .filter(img => img.existing) // Keep existing images
            .map(img => ({
              url: img.url,
              fileName: img.fileName
            }))
        }))
      ));

      // Existing main product images (Base Variant images)
      form.append("existingImages", JSON.stringify(existingImages));

      // New main product images (Base Variant images)
      newFiles.forEach(file => form.append("images", file));

      // New variant images (for additional variants only)
      variants.forEach((variant, i) => {
        variant.images.forEach(img => {
          if (img.file && !img.existing) {
            form.append(`variantImages_${i}`, img.file);
          }
        });
      });

      await updateProduct({ id, data: form }).unwrap();
      alert("✅ Product updated successfully!");
     
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update product: " + (err.data?.message || err.message));
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loading loading-spinner loading-lg text-primary"></div>
    </div>
  );
  
  if (isError) return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="alert alert-error shadow-lg max-w-md">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error loading product. Please try again.</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Update Product</h1>
          <p className="text-base-content/60 mt-2">Make changes to your product</p>
        </div>

        <form
          onSubmit={handleSubmit}
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
              <p className="text-sm text-base-content/60 mb-4">These are for the base variant</p>
              <ImageUploader
                existingImages={existingImages}
                setExistingImages={setExistingImages}
                newFiles={newFiles}
                setNewFiles={setNewFiles}
              />
            </div>

            {/* Additional Variants */}
            <div className="bg-base-100 rounded-2xl shadow-xl p-6">
              <VariantSelection
                formData={formData}
                variants={variants}
                setVariants={setVariants}
                isEditing={true}
              />
            </div>

            {/* Update Button */}
            <button 
              type="submit" 
              disabled={isUpdating}
              className={`btn btn-primary btn-lg w-full ${isUpdating ? "loading" : ""}`}
            >
              {isUpdating ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

