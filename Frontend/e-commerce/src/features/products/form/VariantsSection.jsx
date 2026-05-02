import { Package, Layers, Hash, Plus, Trash2, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import VariantAdder from "./VariantAdder";
import { useEffect, useState } from "react";

export default function VariantsSection({ formData, setFormData, watch }) {
    const mainCategory = watch("category.main") ?? "";

    const [variants, setVariants] = useState(
        formData?.variants?.length > 0
            ? formData.variants
            : [
                {
                    attributes: {},
                    price: "",
                    stock: "",
                    discount: "",
                    images: [],
                },
            ]
    );

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            variants: variants,
        }));
    }, [variants]);

    const addVariant = () => {
        setVariants((prev) => [
            ...prev,
            { attributes: {}, price: "", stock: "", discount: "", images: [] },
        ]);
    };

    const removeVariant = (idx) => {
        if (variants.length <= 1) return;
        setVariants((prev) => prev.filter((_, i) => i !== idx));
    };

    let totalStock = 3

    const variantStats = [
        {
            title: "Total Variants",
            value: variants.length,
            icon: <Layers className="w-5 h-5 text-primary" />,
            bg: "bg-primary/10",
        },
        {
            title: "Total Stock",
            value: totalStock,
            icon: <Package className="w-5 h-5 text-success" />,
            bg: "bg-success/10",
        },
        {
            title: "Category",
            value: mainCategory || "—",
            icon: <Hash className="w-5 h-5 text-info" />,
            bg: "bg-info/10",
        },
    ];
    (variants)

    return (
        <div className="card bg-base-100 shadow-sm border border-base-200 mt-4">
            <div className="card-body gap-5 p-4 md:p-6">
                {/* ── Section Header ── */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-5 rounded-full bg-primary" />
                        <h2 className="text-sm font-bold uppercase tracking-widest text-base-content/60">
                            Additional Variants
                        </h2>
                        <div className="badge badge-primary badge-sm ml-1">
                            {variants.length}
                        </div>
                    </div>
                </div>

                {/* ── Stats Bar ── */}
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-1 md:gap-3">
                    {variantStats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-base-200/50 rounded-xl sm:p-4 flex items-center gap-3"
                        >
                            <div className={`sm:p-2.5 rounded-lg ${stat.bg}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs text-base-content/50 font-medium">
                                    {stat.title}
                                </p>
                                <p className="text-sm sm:text-lg font-bold text-base-content">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Variant Cards ── */}
                <div className="space-y-4">
                    {variants?.map((variant, idx) => (
                        <div key={idx} className="relative">
                            {/* Remove button (top-right corner) */}
                            {variants.length > 1 && (
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-xs btn-square absolute -top-2 -right-2 z-10 bg-base-100 border border-base-300 shadow-sm hover:btn-error"
                                    onClick={() => removeVariant(idx)}
                                    title="Remove variant"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            )}

                            {/* Variant number badge */}
                            <div className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-lg bg-primary text-primary-content flex items-center justify-center text-xs font-bold shadow-sm">
                                {idx + 1}
                            </div>

                            <VariantAdder
                                category={mainCategory}
                                variant={variant}
                                idx={idx}
                                variants={variants}
                                setVariants={setVariants}
                            />
                        </div>
                    ))}
                </div>

                {/* ── Add Variant Button ── */}
                <button
                    type="button"
                    className="btn btn-outline btn-primary btn-sm w-full border-dashed gap-2"
                    onClick={addVariant}
                >
                    <Plus className="w-4 h-4" />
                    Add Another Variant
                </button>


            </div>
        </div>
    );
}