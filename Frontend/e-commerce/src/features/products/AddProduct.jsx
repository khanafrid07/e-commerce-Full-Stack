import { useState } from "react";
import { Plus, ImagePlus, Trash2 } from "lucide-react";
import { useAddProductMutation } from "./productSlice";

export default function AddProduct() {
  const [addProduct] = useAddProductMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: null,
    previewImages: [],
  });

  // Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle main image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: file });
  };

  // Handle preview images upload
  const handlePreviewChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [...formData.previewImages, ...files].slice(0, 5);
    setFormData({ ...formData, previewImages: newPreviews });
    e.target.value = ""; // reset file input
  };

  // Remove a preview image
  const removePreview = (index) => {
    const newPreviews = formData.previewImages.filter((_, i) => i !== index);
    setFormData({ ...formData, previewImages: newPreviews });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("title", formData.title);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("stock", formData.stock);

    if (formData.image) productData.append("image", formData.image);

    formData.previewImages.forEach((file) => {
      productData.append("previewImages", file);
    });

    try {
      const res = await addProduct(productData).unwrap();
      console.log("✅ Product added successfully:", res);
      alert("Product added successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        image: null,
        previewImages: [],
      });
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-base-100 text-base-content p-10 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-2">Product Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="textarea textarea-bordered w-full h-32"
            required
          />
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Price (Rs.)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Stock Available</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Main Image Upload */}
        <div>
          <label className="block font-semibold mb-3">Main Image</label>
          <div className="flex items-center gap-4">
            {formData.image ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: null })}
                  className="absolute top-1 right-1 btn btn-xs btn-circle btn-error text-white"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col justify-center items-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                <Plus size={30} className="text-gray-500" />
                <span className="text-xs text-gray-500 mt-1">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Preview Images Upload */}
        <div>
          <label className="block font-semibold mb-3">Preview Images (max 5)</label>
          <div className="flex flex-wrap gap-4">
            {formData.previewImages.map((file, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded-lg overflow-hidden border"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => removePreview(index)}
                  className="absolute top-1 right-1 btn btn-xs btn-circle btn-error text-white"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* Upload button */}
            {formData.previewImages.length < 5 && (
              <label className="cursor-pointer flex flex-col justify-center items-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                <ImagePlus size={24} className="text-gray-500" />
                <span className="text-xs text-gray-500 mt-1">Add</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePreviewChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary px-8">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
