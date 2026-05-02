import { useState, useEffect } from "react";
import { Save, X, Package, Info, Layers, Eye } from "lucide-react";
import GeneralInfo from "./GeneralInfo";
import VariantsSection from "./VariantsSection";
import VisibilitySection from "./VisibilitySection";
import { useNavigate, useParams } from "react-router-dom";
import { useViewProductQuery, useAddProductMutation, useUpdateProductMutation } from "../productSlice";
import useProductForm from "../../../hooks/useProductForm";
import { notifyError, notifyInfo, notifySuccess } from "../../../utils/notify";
export default function ProductForm({ isEdit = false }) {
    const [deleteImages, setDeleteImages] = useState([])
    const navigate = useNavigate()

    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useProductForm();
    const [formData, setFormData] = useState({
        variants: [
            {
                attributes: {},
                price: "",
                stock: "",
                discount: 0,
                images: [],
            },
        ],

        images: [],
    });
    const { id } = useParams()
    const { data, isLoading: productLoading, isFetching } = useViewProductQuery(id, { skip: !id })
    const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
    const [updateProduct, { isLoading: isUpdating, refetch }] = useUpdateProductMutation();
    const [activeTab, setActiveTab] = useState("information");

    useEffect(() => {
        if (isEdit && data?.product) {
            const product = data.product;

            reset({
                title: product.title || "",
                slug: product.slug || "",
                description: product.description || "",
                category: product.category || { main: "", sub: "", gender: "" },
                featured: product.featured || false,
                isActive: product.isActive ?? true,
                keyFeatures: product.keyFeatures || [],
                tags: product.tags || []
            });
            setFormData({
                variants: product.variants || [],
                images: product.images || []
            })
        }
    }, [isEdit, data]);

    const onSubmit = async (data) => {

        if (formData.images.length < 3) {
            notifyError("Please add at least 3 images")
            return
        }
        if (formData.variants.length === 0) {
            notifyError("Please add at least one variant")
            return
        }
        try {

            const form = new FormData();
            form.append("title", data.title);
            form.append("description", data.description);
            // form.append("basePrice", Number(data.basePrice));
            form.append("slug", data.slug);
            // form.append("stock", Number(data.stock));
            form.append("category", JSON.stringify(data.category));
            form.append("isFeatured", data.isFeatured);
            form.append("keyFeatures", JSON.stringify(data.keyFeatures));
            form.append("isActive", data.isActive);
            form.append("deleteImages", JSON.stringify(deleteImages));
            form.append("tags", JSON.stringify(data.tags));

            formData.images.forEach((img) => {
                if (img.file && img.isMain) {
                    form.append("mainImage", img.file);
                }

                if (img.file && !img.isMain) {
                    form.append("images", img.file);
                }
            });
            const variants = formData.variants.map((variant, i) => {
                let variantImages = []
                variant.images.forEach((img) => {
                    if (img.file) {
                        form.append(`variantImages_${i}`, img.file);
                    }
                    else {
                        variantImages.push(img)
                    }
                });

                return {
                    attributes: variant.attributes,
                    price: variant.price,
                    stock: variant.stock,
                    discount: variant.discount,
                    images: variantImages,

                };
            });

            form.append("variants", JSON.stringify(variants));
            if (isEdit) {
                const result = await updateProduct({ id, data: form }).unwrap();
                ("Product updated successfully:", result);
                notifySuccess("Product updated successfully!");
                navigate("/dashboard/manage-products")
            } else {
                const result = await addProduct(form).unwrap();
                ("Product added successfully:", result);
                notifySuccess("Product added successfully!");
                navigate("/dashboard/manage-products")
            }



        } catch (error) {
            console.error("Failed to add/update product:", error);
            notifyError(error?.data?.message || "Failed to save product");
        }
    };

    const tabs = [
        { key: "information", label: "Information", icon: Info },
        { key: "variants", label: "Variants", icon: Layers },
        { key: "visibility", label: "Visibility", icon: Eye },
    ];

    if (productLoading) {
        return <div>Loading...</div>
    }
    if (isFetching) {
        return <div>Fetching...</div>
    }

    return (
        <form onSubmit={handleSubmit(
            onSubmit,
            (errors) => {
                const firstError = Object.values(errors)[0];
                const message = firstError?.message || firstError?.root?.message || "Please fill all required fields";
                notifyError(message);
            }
        )}>


            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-base-content">
                                Add New Product
                            </h1>
                            <p className="text-base-content/60 text-sm">
                                Fill in the details below to list a new product
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="btn btn-ghost gap-2" type="button">
                            <X className="w-4 h-4" /> Cancel
                        </button>
                        <button
                            disabled={isAdding || isUpdating}
                            type="submit"
                            className="btn btn-primary gap-2"


                        >
                            {isAdding || isUpdating ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Product
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div role="tablist" className="tabs tabs-border mb-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <a
                                key={tab.key}
                                role="tab"
                                className={`tab md:gap-2 ${activeTab === tab.key ? "tab-active font-semibold" : ""}`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </a>
                        );
                    })}
                </div>

                {/* Tab Content */}
                {activeTab === "information" && (
                    <GeneralInfo
                        register={register}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                        deleteImages={deleteImages}
                        setDeleteImages={setDeleteImages}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {activeTab === "variants" && (
                    <VariantsSection
                        formData={formData}
                        setFormData={setFormData}
                        watch={watch}

                    />
                )}
                {activeTab === "visibility" && (
                    <VisibilitySection
                        register={register}
                        errors={errors}
                        watch={watch}
                    />
                )}
            </div>
        </form>
    );
}

