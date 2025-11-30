import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useViewProductQuery, useUpdateProductMutation } from "./productSlice";
import GeneralInfo from "./GeneralInfo";
import VariantSelector from "./VariantSelector";
import ImageUploader from "./ImageUploader";

export default function UpdateProduct() {
  const { id } = useParams();
  const { data, isLoading, isError } = useViewProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  // MAIN STATES
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: { main: "", sub: "", gender: "" },
    basePrice: 0,
    stock: 0,
    details: [],
    featured:false
  });

  // VARIANTS ARRAY STATE
  const [variants, setVariants] = useState([]);

  // IMAGES STATE
  const [existingImages, setExistingImages] = useState([]); // DB images
  const [newFiles, setNewFiles] = useState([]); // newly uploaded files

  // Load product inside form
  useEffect(() => {
    if (data?.product) {
      const product = data.product;

      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        basePrice: product.basePrice,
        stock: product.stock,
        featured: product.featured || false,
        details: product.details || []
      });

      setVariants(product.variants || []);
      setExistingImages(product.images || []);
    }
  }, [data?.product]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading product.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData for backend
    const form = new FormData();
    form.append("title", formData.title);
      form.append("featured", JSON.stringify(formData.featured));
    form.append("description", formData.description);
    form.append("basePrice", formData.basePrice);
    form.append("stock", formData.stock);
    form.append("category", JSON.stringify(formData.category));
    form.append("variants", JSON.stringify(variants));
    form.append("existingImages", JSON.stringify(existingImages));
    formData.details.forEach((detail, i) =>
      form.append(`details[${i}]`, JSON.stringify(detail))
    );

    // Append new files
    newFiles.forEach(file => form.append("images", file));

    try {
      await updateProduct({ id, data: form }).unwrap();
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 p-8 bg-white rounded-2xl shadow-xl"
    >
      <GeneralInfo formData={formData} setFormData={setFormData} />

      <div className="space-y-6">
        <ImageUploader
          existingImages={existingImages}
          setExistingImages={setExistingImages}
          newFiles={newFiles}
          setNewFiles={setNewFiles}
        />

        <VariantSelector variants={variants} setVariants={setVariants} />

        <button type="submit" className="btn btn-primary w-full font-semibold">
          Update Product
        </button>
      </div>
    </form>
  );
}
