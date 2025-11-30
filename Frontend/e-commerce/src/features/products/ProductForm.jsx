import { useState } from "react";
import { useAddProductMutation } from "./productSlice";
import GeneralInfo from "./GeneralInfo";
import VariantSelector from "./VariantSelector";
import ImageUploader from "./ImageUploader";

export default function ProductForm() {
  const [addProduct] = useAddProductMutation();

  // MAIN FORM DATA (without variants)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: { main: "", sub: "", gender: "" },
    basePrice: 0,
    stock: 0,
    images: [],

  });


  const [variants, setVariants] = useState([]);

    const [newFiles, setNewFiles] = useState([]);
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const form = new FormData();

      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", JSON.stringify(formData.category));
      form.append("basePrice", formData.basePrice);
      form.append("stock", formData.stock);
      
      newFiles.forEach(file => form.append("images", file));

      // Variants array
      form.append("variants", JSON.stringify(variants));

      // Details array
      form.append("details", JSON.stringify(formData.details));

      await addProduct(form).unwrap();
      alert("Product successfully added");

     
      setFormData({
        title: "",
        description: "",
        category: { main: "", sub: "", gender: "" },
        basePrice: 0,
        stock: 0,
        images: [],
       
      });
      setVariants([]);

    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 p-8 bg-white rounded-2xl shadow-xl"
    >
      <GeneralInfo formData={formData} setFormData={setFormData} />

      <div className="space-y-6">
        <ImageUploader newFiles={newFiles} setNewFiles={setNewFiles} />

        {/* VARIANT SELECTOR */}
        <VariantSelector variants={variants} setVariants={setVariants} />

        <button
          type="submit"
          className="btn btn-primary w-full font-semibold"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
