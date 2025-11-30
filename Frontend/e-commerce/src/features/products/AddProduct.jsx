// import { useState, useEffect } from "react";
// import { Plus, Trash2, ImagePlus } from "lucide-react";
// import { useAddProductMutation } from "./productSlice";

import ProductForm from "./ProductForm";


// export default function AddProduct() {
//   const [addProduct] = useAddProductMutation();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     mainImage: null,
//     previewImages: [],
//     variants: []
//   });

//   const categories = ["Clothing", "Footwear", "Accessories", "Beauty"];

//   const variantMap = {
//     Clothing: { Size: ["XS", "S", "M", "L", "XL"], Color: ["Black", "White", "Red", "Blue"] },
//     Footwear: { Size: [36, 37, 38, 39, 40, 41, 42], Color: ["Black", "White", "Brown", "Gray"] },
//     Accessories: { Color: ["Gold", "Silver", "Black", "Brown"], Material: ["Leather", "Metal", "Plastic"] },
//     Beauty: { Shade: ["Light", "Medium", "Dark"], Volume: ["50ml", "100ml", "200ml"] },
//   };

//   const [variantOptions, setVariantOptions] = useState({});
//   const [selectedVariants, setSelectedVariants] = useState({}); // { Size: [{value, stock, price}], Color: [...] }

//   // Update variant options when category changes
//   useEffect(() => {
//     const options = formData.category ? variantMap[formData.category] : {};
//     setVariantOptions(options);

//     // Reset selected variants
//     const initial = {};
//     Object.keys(options).forEach(type => initial[type] = []);
//     setSelectedVariants(initial);
//   }, [formData.category]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleOptionToggle = (type, value) => {
//     setSelectedVariants(prev => {
//       const arr = prev[type] || [];
//       // If already selected, remove
//       if (arr.find(v => v.value === value)) return { ...prev, [type]: arr.filter(v => v.value !== value) };
//       // Else add with default stock 0
//       return { ...prev, [type]: [...arr, { value, stock: 0, price: "" }] };
//     });
//   };

//   const handleVariantStockPriceChange = (type, index, field, value) => {
//     setSelectedVariants(prev => {
//       const arr = [...prev[type]];
//       arr[index][field] = field === "stock" ? Number(value) : value;
//       return { ...prev, [type]: arr };
//     });
//   };

//   const handleMainImageChange = (e) => setFormData({ ...formData, mainImage: e.target.files[0] });

//   const handlePreviewChange = (e) => {
//     const files = Array.from(e.target.files);
//     const total = [...formData.previewImages, ...files].slice(0, 5);
//     setFormData({ ...formData, previewImages: total });
//   };

//   const removePreview = (index) => {
//     const filtered = formData.previewImages.filter((_, i) => i !== index);
//     setFormData({ ...formData, previewImages: filtered });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Transform selectedVariants to array of { type, options }
//     const variants = Object.entries(selectedVariants).map(([type, arr]) => ({
//       type,
//       options: arr.map(v => ({ value: v.value, stock: v.stock, price: v.price }))
//     }));

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     data.append("category", formData.category);
//     data.append("price", formData.price);
//     if (formData.mainImage) data.append("image", formData.mainImage);
//     formData.previewImages.forEach(file => data.append("previewImages", file));
//     data.append("variants", JSON.stringify(variants)); // ✅ Backend-compatible

//     try {
//       await addProduct(data).unwrap();
//       alert("✅ Product added successfully!");
//       setFormData({ title: "", description: "", category: "", price: "", mainImage: null, previewImages: [], variants: [] });
//       setSelectedVariants({});
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to add product.");
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto min-h-screen">
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white/60 p-10 rounded-3xl shadow-2xl border border-white/30">

//         {/* LEFT: General Info */}
//         <div className="space-y-6">
//           <h2 className="text-4xl font-extrabold text-center mb-12">🛍️ Add New Product</h2>

//           <div className="form-control w-full">
//             <label className="label"><span className="label-text font-semibold text-primary">Title</span></label>
//             <input type="text" name="title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" required />
//           </div>

//           <div className="form-control w-full">
//             <label className="label"><span className="label-text font-semibold text-primary">Description</span></label>
//             <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full h-32" />
//           </div>

//           <div className="form-control w-full">
//             <label className="label"><span className="label-text font-semibold text-primary">Base Price</span></label>
//             <input type="number" name="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" placeholder="e.g. 1999" required />
//           </div>

//           <div className="form-control w-full">
//             <label className="label"><span className="label-text font-semibold text-primary">Category</span></label>
//             <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered w-full" required>
//               <option value="">Select Category</option>
//               {categories.map(c => <option key={c}>{c}</option>)}
//             </select>
//           </div>

//           {/* Variant Selection */}
//           {Object.keys(variantOptions).length > 0 && (
//             <div className="p-5 rounded-2xl shadow-inner bg-white/50 border border-white/30">
//               <h4 className="text-lg font-semibold mb-4">Variants</h4>
//               {Object.entries(variantOptions).map(([type, values]) => (
//                 <div key={type} className="mb-4">
//                   <p className="font-medium">{type}:</p>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {values.map(v => (
//                       <button
//                         key={v}
//                         type="button"
//                         onClick={() => handleOptionToggle(type, v)}
//                         className={`px-3 py-1 border rounded-full ${selectedVariants[type]?.find(o => o.value === v) ? "bg-primary text-white" : "bg-white"}`}
//                       >
//                         {v}
//                       </button>
//                     ))}
//                   </div>
//                   {/* Stock & Price for selected options */}
//                   {selectedVariants[type]?.map((opt, idx) => (
//                     <div key={idx} className="flex gap-2 mt-2 items-center">
//                       <span>{opt.value}</span>
//                       <input type="number" placeholder="Stock" value={opt.stock} onChange={(e) => handleVariantStockPriceChange(type, idx, "stock", e.target.value)} className="input input-bordered w-20" />
//                       <input type="number" placeholder="Price" value={opt.price} onChange={(e) => handleVariantStockPriceChange(type, idx, "price", e.target.value)} className="input input-bordered w-24" />
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* RIGHT: Images */}
//         <div className="space-y-8">
//           <div className="flex flex-col items-center p-5 rounded-2xl shadow-lg bg-white/50 border border-white/30">
//             <label className="label"><span className="label-text font-semibold text-primary">Main Image</span></label>
//             {formData.mainImage ? (
//               <div className="relative w-64 h-64 rounded-xl overflow-hidden">
//                 <img src={URL.createObjectURL(formData.mainImage)} alt="Main Preview" className="object-cover w-full h-full" />
//                 <button type="button" onClick={() => setFormData({ ...formData, mainImage: null })} className="absolute top-2 right-2 btn btn-error btn-circle btn-sm">
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             ) : (
//               <label className="flex flex-col justify-center items-center w-64 h-64 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-100">
//                 <Plus size={36} />
//                 <span className="mt-2 text-sm">Upload Main Image</span>
//                 <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
//               </label>
//             )}
//           </div>

//           <div className="p-5 rounded-2xl shadow-lg bg-white/50 border border-white/30">
//             <label className="label"><span className="label-text font-semibold text-primary">Preview Images (max 5)</span></label>
//             <div className="flex flex-wrap gap-4 justify-center">
//               {formData.previewImages.map((file, index) => (
//                 <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border shadow-md">
//                   <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
//                   <button type="button" onClick={() => removePreview(index)} className="absolute top-1 right-1 btn btn-error btn-circle btn-xs">
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//               ))}
//               {formData.previewImages.length < 5 && (
//                 <label className="flex flex-col justify-center items-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
//                   <ImagePlus size={24} />
//                   <span className="text-xs mt-1">Add</span>
//                   <input type="file" multiple accept="image/*" onChange={handlePreviewChange} className="hidden" />
//                 </label>
//               )}
//             </div>
//           </div>

//           <button type="submit" className="btn btn-primary w-full mt-4 font-bold">Add Product</button>
//         </div>
//       </form>
//     </div>
//   );
// }


// export default function AddProduct(){


//   return(
//     <div>
//       <ProductForm/>
//     </div>
//   )
// }