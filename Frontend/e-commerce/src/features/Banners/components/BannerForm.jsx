
import { useState } from "react"
import BannerPreview from "./BannerPreview";
import BannerInputs from "./BannerInputs"
import { useCreateBannerMutation } from "../BannerSlice";
export default function BannerForm() {
    const [createBanner, { isLoading }] = useCreateBannerMutation()
    const [form, setForm] = useState({
        title: "",
        heading: "",
        subHeading: "",
        ctaText: "",
        ctaLink: "",
        type: "hero",
        placement: "home_top",
        position: "left",
        vertical: "center",
        isActive: true,

        image: null,
        imageUrl: "",
    });



    const horizontalMap = {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right",
    };

    const verticalMap = {
        top: "justify-start",
        center: "justify-center",
        bottom: "justify-end",
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        const dataObj = {
            title: form.title,
            heading: form.heading,
            subHeading: form.subHeading,
            ctaText: form.ctaText,
            ctaLink: form.ctaLink,
            type: form.type,
            placement: form.placement,
            position: form.position,
            vertical: form.vertical,
            isActive: form.isActive,
            categoryId: form.categoryId,
            priority: form.priority,

        };
        formData.append("data", JSON.stringify(dataObj));
        formData.append("img", form.image);
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        console.log(formData, "Form Data")
        try {

            await createBanner(formData).unwrap()
            alert("banner created successfully")
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
            <div className="flex items-center justify-between border-b pb-5">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Banner</h1>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Left Column: Form Inputs */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                            <h2 className="text-xl font-bold text-gray-800">Banner Details</h2>
                        </div>
                        <BannerInputs form={form} setForm={setForm} />
                    </div>
                    
                    {/* Right Column: Preview & Action */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                <h2 className="text-xl font-bold text-gray-800">Live Preview</h2>
                            </div>
                            <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center p-4">
                                <BannerPreview form={form} verticalMap={verticalMap} horizontalMap={horizontalMap} />
                            </div>
                        </div>

                        {/* Submit Actions Box */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <p className="text-sm text-gray-500 max-w-sm">Ensure your banner image meets size requirements and looks good in preview before saving.</p>
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className={`px-8 py-3 rounded-xl font-semibold shadow-md transition-all ${
                                    isLoading 
                                    ? "bg-gray-400 text-white cursor-not-allowed" 
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:-translate-y-0.5"
                                }`}
                            >
                                {isLoading ? "Saving..." : "Save Banner"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
