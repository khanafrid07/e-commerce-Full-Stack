import { Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateProductMutation, useViewProductQuery } from "./productSlice";
import { useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const { data, refetch } = useViewProductQuery(id);
  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    if (data) {
      setFormData(data?.product)
    }
  }, [data])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: []
  });

  // MAIN IMAGE
  function handleMainImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const newMain = { url: URL.createObjectURL(file), file, isMain: true };
    const others = formData.images.filter(img => !img.isMain);

    setFormData(prev => ({
      ...prev,
      images: [newMain, ...others]
    }));
  }

  // PREVIEWS
  function handlePreviewChange(e) {
    const files = Array.from(e.target.files);
    const newImgs = files.map(f => ({
      url: URL.createObjectURL(f),
      file: f,
      isMain: false
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImgs]
    }));
  }


  function handleRemoveImg(url) {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.url !== url)
    }));
  }

  function handleInputChange(e) {
    setFormData((prevData) => ({
      ...prevData, [e.target.name]: e.target.value
    }))
  }

  const mainImage = formData.images.find(img => img.isMain);
  const previews = formData.images.filter(img => !img.isMain);


  async function onFormSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("stock", formData.stock);
    form.append("category", formData.category);

    // 1️⃣ Append uploaded files
    formData.images.forEach((img, index) => {
      if (img.file) {
        form.append("images", img.file);
        form.append(`isMain_${index}`, img.isMain); // main status of this new file
      }
    });

    // 2️⃣ Append existing images (without file) once
    const existingImages = formData.images
      .filter(img => !img.file)
      .map(img => ({ url: img.url, isMain: img.isMain }));

    form.append("existingImages", JSON.stringify(existingImages));

    try {
      await updateProduct({ id, data: form }).unwrap();
      alert("✅ Product Updated Successfully");
      refetch()
    } catch (err) {
      console.log("Error updating product:", err);
      alert("❌ Error updating product");
    }
    
  }




  return (
    <form onSubmit={onFormSubmit}>
      <div className="max-w-4xl mx-auto bg-base-100 p-10 rounded-2xl shadow-xl flex flex-col">
        <h1 className="text-center text-3xl font-semibold mb-4">Update Product</h1>

        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleInputChange} className="input input-bordered w-full" />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} className="textarea textarea-bordered w-full" />

        <div className="flex gap-4 mt-2">
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="input input-bordered w-full" />
          <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="Stock" className="input input-bordered w-full" />
        </div>

        <label className="mt-2">Category</label>
        <select name="category" value={formData.category} onChange={handleInputChange} className="select select-neutral">
          <option value="" disabled>Choose Category</option>
          <option value="Fashion">Fashion</option>
          <option value="Tech">Tech</option>
          <option value="Furniture">Furniture</option>
        </select>

        {/* Main Image */}
        <div className="flex items-center mt-2">
          {mainImage ? (
            <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
              <img src={mainImage.url} alt="main" className="object-cover w-full h-full" />
              <button type="button" onClick={((e) => (
                e.preventDefault(),
                handleRemoveImg(mainImage.url)
              ))} className="btn btn-error btn-circle btn-sm absolute top-1 right-1 text-white">
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <label className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer">
              <Plus />
              <span>Add Main Image</span>
              <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
            </label>
          )}
        </div>

        {/* Preview Images */}
        <div className="flex flex-wrap gap-4 mt-4">
          {previews.map((img, idx) => (
            <div key={idx} className="relative w-32 h-32 border rounded-lg overflow-hidden">
              <img src={img.url} alt={`preview-${idx}`} className="object-cover w-full h-full" />
              <button type="button" onClick={((e) => (
                e.preventDefault(),
                handleRemoveImg(img.url)
              ))} className="btn btn-error btn-circle btn-sm absolute top-1 right-1 text-white">
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {previews.length < 5 && (
            <label className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer">
              <Plus />
              <span>Add Preview</span>
              <input type="file" multiple accept="image/*" onChange={handlePreviewChange} className="hidden" />
            </label>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="btn btn-success mt-4">
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </div>
    </form>
  );
}

