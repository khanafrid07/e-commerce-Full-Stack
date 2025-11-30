import { useState } from "react";

export default function GeneralInfo({ formData, setFormData}) {

    const categories = ["Clothes", "Footwear", "Accessories", "Beauty"];

    const subCategories = {
        Clothes: ["T-Shirts", "Jeans", "Jacket", "Dresses"],
        Footwear: ["Sneakers", "Sandals", "Boots"],
        Accessories: ["Bags", "Belts", "Watches"],
        Beauty: ["Skincare", "Makeup", "Fragrance"]
    };
   

    function handleCategoryChange(main) {
        setFormData(prev => ({
            ...prev,
            category: {
                ...prev.category,
                main,
                sub: ""
            }
        }));
    }

    function handleSubCategoryChange(sub) {
        setFormData(prev => ({
            ...prev,
            category: {
                ...prev.category,
                sub
            }
        }));
    }


    function handleGenderChange(gender) {
        setFormData(prev => ({
            ...prev,
            category: {
                ...prev.category,
                gender
            }
        }));
    }



    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col justify-center gap-2">
                <h2 className="text-xl font-semibold mb-2">Set as Featured Product</h2>

                <label className="text-lg flex items-center cursor-pointer">
                    Yes
                    <input
                        type="radio"
                        name="featured"
                        value="yes"
                        checked={formData.featured === true}
                        onChange={() => setFormData({...formData, featured:true})}
                        className="ml-2 radio"
                    />
                </label>

                <label className="text-lg flex items-center cursor-pointer">
                    No
                    <input
                        type="radio"
                        name="featured"
                        value="no"
                        checked={formData.featured === false}
                        onChange={() => setFormData({...formData, featured:false})}
                        className="ml-2 radio"
                    />
                </label>
            </div>

            {/* Product Name */}
            <div className="space-y-1">
                <label className="font-medium">Product Name</label>
                <input
                    className="input input-bordered w-full"
                    value={formData.title}
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, title: e.target.value }))
                    }
                />
            </div>

            {/* Product Description */}
            <div className="space-y-1">
                <label className="font-medium">Product Description</label>
                <textarea
                    value={formData.description}
                    className="textarea textarea-bordered w-full h-28"
                    placeholder="Write product description..."
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, description: e.target.value }))
                    }
                ></textarea>
            </div>

            {/* Category Section */}
            <div className="space-y-3">
                <h2 className="font-semibold text-lg">Category</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* MAIN CATEGORY */}
                    <div className="space-y-1">
                        <label className="font-medium">Product Category</label>
                        <select
                            value={formData.category?.main || ""}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Category</option>
                            {categories.map((c, i) => (
                                <option key={i}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* SUB CATEGORY */}
                    <div className="space-y-1">
                        <label className="font-medium">Product Sub-Category</label>
                        <select
                            value={formData.category?.sub || ""}
                            onChange={(e) => handleSubCategoryChange(e.target.value)}
                            className="select select-bordered w-full"
                            disabled={!formData.category?.main}
                        >
                            <option value="">
                                {formData.category?.main ? "Select Sub Category" : "Pick main category first"}
                            </option>

                            {formData.category?.main &&
                                subCategories[formData.category.main]?.map((sub, i) => (
                                    <option key={i}>{sub}</option>
                                ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-2">
                <p className="font-semibold text-lg">Gender</p>
                <p className="text-sm opacity-70">Pick Available Gender</p>

                <div className="form-control">
                    <div className="flex gap-3">
                        {["Men", "Women", "Unisex"].map(label => (
                            <button
                                key={label}
                                type="button"
                                className={`btn btn-sm ${formData.category?.gender === label
                                    ? "btn-primary text-white"
                                    : "btn-outline"
                                    }`}
                                onClick={() => handleGenderChange(label)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing & Stock */}
            <div className="space-y-3">
                <p className="font-semibold text-lg">Pricing & Stock</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="font-medium">Base Price</label>
                        <input
                            type="number"
                            placeholder="Base Price"
                            className="input input-bordered w-full"
                            value={formData.basePrice}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, basePrice: e.target.value }))
                            }
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="font-medium">Stock</label>
                        <input
                            type="number"
                            placeholder="Total Stock"
                            className="input input-bordered w-full"
                            value={formData.stock}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, stock: e.target.value }))
                            }
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}
