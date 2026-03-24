import { useGetCategoriesQuery } from "../categorySlice";

export default function BannerInputs({ form, setForm }) {
    const { data: categories } = useGetCategoriesQuery()
    console.log("caetgories", categories)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // size check
        if (file.size > 2 * 1024 * 1024) {
            alert("Max size is 2MB");
            return;
        }

        // type check
        if (!file.type.startsWith("image/")) {
            alert("Only images allowed");
            return;
        }
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const ratio = img.width / img.height;

            if (ratio < 1.5 || ratio > 1.9) {
                alert("Use ~16:9 image for best result");
            }
        };
        const imageUrl = URL.createObjectURL(file);

        setForm((prev) => ({
            ...prev,
            imageUrl: imageUrl,
            image: file, // store original file for upload
        }));
    };

    const InputLabel = ({ children }) => (
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">{children}</span>
    );

    const inputClasses = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-gray-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none";

    return (
        <div className="flex flex-col gap-6">
            
            {/* Basic Info & Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label>
                    <InputLabel>Title</InputLabel>
                    <input type="text" name="title" placeholder="E.g. Summer Sale 2026" value={form.title} onChange={handleChange} className={inputClasses} />
                </label>
                <label>
                    <InputLabel>Image (Max 2MB)</InputLabel>
                    <input type="file" onChange={handleImage} className="w-full border border-gray-200 rounded-xl px-2 py-2 text-gray-500 bg-gray-50 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer" />
                </label>
            </div>

            <div className="h-px bg-gray-100 w-full my-1"></div>

            {/* Typography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label>
                    <InputLabel>Heading</InputLabel>
                    <input type="text" name="heading" placeholder="Main banner text" value={form.heading} onChange={handleChange} className={inputClasses} />
                </label>
                <label>
                    <InputLabel>Sub Heading</InputLabel>
                    <input type="text" name="subHeading" placeholder="Secondary small text" value={form.subHeading} onChange={handleChange} className={inputClasses} />
                </label>
            </div>

            <div className="h-px bg-gray-100 w-full my-1"></div>

            {/* CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label>
                    <InputLabel>CTA Text</InputLabel>
                    <input type="text" name="ctaText" placeholder="E.g. Shop Now" value={form.ctaText} onChange={handleChange} className={inputClasses} />
                </label>
                <label>
                    <InputLabel>CTA Link</InputLabel>
                    <input type="text" name="ctaLink" placeholder="/shop/category" value={form.ctaLink} onChange={handleChange} className={inputClasses} />
                </label>
            </div>

            <div className="h-px bg-gray-100 w-full my-1"></div>

            {/* Type & Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label>
                    <InputLabel>Banner Role / Type</InputLabel>
                    <select name="type" value={form.type} onChange={handleChange} className={inputClasses}>
                        <option value="hero">Hero (Main Slider)</option>
                        <option value="category">Category (Specific Page)</option>
                        <option value="promo">Promo (Small Callouts)</option>
                    </select>
                </label>

                {form.type === "category" ? (
                    <label>
                        <InputLabel>Target Category</InputLabel>
                        <select value={form.categoryId || ""} name="categoryId" onChange={handleChange} className={inputClasses}>
                            <option value="">Select Category</option>
                            {categories?.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </label>
                ) : form.type === "promo" ? (
                    <label>
                        <InputLabel>Placement Area</InputLabel>
                        <select name="placement" value={form.placement} onChange={handleChange} className={inputClasses}>
                            <option value="">Select Placement</option>
                            <option value="home_top">Home Top</option>
                            <option value="home_middle">Home Middle</option>
                            <option value="home_bottom">Home Bottom</option>
                        </select>
                    </label>
                ) : (
                    <div className="hidden sm:block"></div>
                )}
            </div>

            <div className="h-px bg-gray-100 w-full my-1"></div>

            {/* Position Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                <label>
                    <InputLabel>Text Horizontal Align</InputLabel>
                    <select name="position" value={form.position} onChange={handleChange} className={inputClasses}>
                        <option value="left">Left Justified</option>
                        <option value="center">Centered</option>
                        <option value="right">Right Justified</option>
                    </select>
                </label>
                <label>
                    <InputLabel>Text Vertical Align</InputLabel>
                    <select name="vertical" value={form.vertical} onChange={handleChange} className={inputClasses}>
                        <option value="top">Top Aligned</option>
                        <option value="center">Middle Aligned</option>
                        <option value="bottom">Bottom Aligned</option>
                    </select>
                </label>
            </div>

            <div className="h-px bg-gray-100 w-full my-1"></div>

            {/* Delivery Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <label>
                    <InputLabel>Priority (Sort Order)</InputLabel>
                    <input type="number" name="priority" value={form.priority} onChange={handleChange} className={inputClasses} placeholder="0" />
                </label>
                <label>
                    <InputLabel>Start Date</InputLabel>
                    <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={inputClasses} />
                </label>
                <label>
                    <InputLabel>End Date</InputLabel>
                    <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={inputClasses} />
                </label>
            </div>

            {/* Status Toggle */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-gray-800">Banner Visibility</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Toggle active status to hide or show on frontend</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={form.isActive} onChange={() => setForm(prev => ({ ...prev, isActive: !prev.isActive }))} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>
    );
}