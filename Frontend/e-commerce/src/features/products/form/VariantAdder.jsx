import { DollarSign, Package, Tag, Palette, Ruler, Gem, Droplets, Sun } from "lucide-react";
import { VARIANT_OPTIONS, VARIANT_VALUES } from "../config/variantConfig";
import ImageUploader from "./ImageUploader";

// Icon map for attribute types
const ATTRIBUTE_ICONS = {
    Size: Ruler,
    Color: Palette,
    Material: Gem,
    Volume: Droplets,
    Shade: Sun,
};

export default function VariantAdder({
    category = "Clothing",
    variant,
    idx,
    variants,
    setVariants,
}) {
    const options = VARIANT_OPTIONS[category] ?? [];

    const handleVariantChange = (field, value) => {
        const updatedVariants = [...variants];
        updatedVariants[idx] = { ...updatedVariants[idx], [field]: value };
        setVariants(updatedVariants);
    };

    const handleAttributeChange = (attrName, value) => {
        const updatedVariants = [...variants];
        updatedVariants[idx] = {
            ...updatedVariants[idx],
            attributes: { ...updatedVariants[idx].attributes, [attrName]: value },
        };
        setVariants(updatedVariants);
    };

    return (
        <div className="border border-base-300 rounded-xl shadow-sm bg-base-100 overflow-hidden transition-all hover:shadow-md">
            <div className="p-4 md:p-5 grid md:grid-cols-[1fr_0.4fr] gap-5">

                <div className="space-y-5">
                    {/* Attributes */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/40 mb-3">
                            Attributes
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {options.map((option, idx) => {
                                const Icon = ATTRIBUTE_ICONS[option] || Package;
                                const values = VARIANT_VALUES[option] ?? [];

                                return (
                                    <div key={idx} className="form-control">
                                        <label className="label pb-1">
                                            <span className="label-text font-semibold flex items-center gap-2 text-sm">
                                                <Icon className="w-4 h-4 text-primary" />
                                                {option}
                                                <span className="text-error text-xs">*</span>
                                            </span>
                                        </label>
                                        <select
                                            value={variant.attributes?.[option] ?? ""}
                                            onChange={(e) =>
                                                handleAttributeChange(option, e.target.value)
                                            }
                                            className="select select-bordered select-sm w-full focus:select-primary"
                                        >
                                            <option value="">Select {option}</option>
                                            {values.map((val, idx) => (
                                                <option key={idx} value={val}>
                                                    {val}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="divider my-0" />

                    {/* Pricing & Inventory */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/40 mb-3">
                            Pricing & Inventory
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Price */}
                            <div className="form-control">
                                <label className="label pb-1">
                                    <span className="label-text font-semibold flex items-center gap-2 text-sm">
                                        <DollarSign className="w-4 h-4 text-primary" />
                                        Price
                                        <span className="text-error text-xs">*</span>
                                    </span>
                                </label>
                                <label className="input input-bordered input-sm flex items-center gap-2 focus-within:border-primary focus-within:outline-none">
                                    <DollarSign className="w-3.5 h-3.5 text-base-content/30 shrink-0" />
                                    <input
                                        type="number"
                                        value={variant.price}
                                        onChange={(e) =>
                                            handleVariantChange("price", e.target.value)
                                        }
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        className="grow"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Stock */}
                            <div className="form-control">
                                <label className="label pb-1">
                                    <span className="label-text font-semibold flex items-center gap-2 text-sm">
                                        <Package className="w-4 h-4 text-primary" />
                                        Stock
                                        <span className="text-error text-xs">*</span>
                                    </span>
                                </label>
                                <label className="input input-bordered input-sm flex items-center gap-2 focus-within:border-primary focus-within:outline-none">
                                    <Package className="w-3.5 h-3.5 text-base-content/30 shrink-0" />
                                    <input
                                        type="number"
                                        value={variant.stock}
                                        onChange={(e) =>
                                            handleVariantChange("stock", e.target.value)
                                        }
                                        placeholder="0"
                                        min="0"
                                        className="grow"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Discount */}
                            <div className="form-control">
                                <label className="label pb-1">
                                    <span className="label-text font-semibold flex items-center gap-2 text-sm">
                                        <Tag className="w-4 h-4 text-primary" />
                                        Discount
                                    </span>
                                </label>
                                <label className="input input-bordered input-sm flex items-center gap-2 focus-within:border-primary focus-within:outline-none">
                                    <input
                                        type="number"
                                        value={variant.discount}
                                        onChange={(e) =>
                                            handleVariantChange("discount", e.target.value)
                                        }
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                        className="grow"
                                    />
                                    <span className="text-base-content/40 font-bold shrink-0 text-xs">
                                        %
                                    </span>
                                </label>
                                <label className="label pt-1">
                                    <span className="label-text-alt text-base-content/40">
                                        Optional — leave 0 for no discount.
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="border-l border-base-200 pl-4 hidden md:block">
                    <ImageUploader optional={true} idx={idx} setForm={setVariants} form={variant} maxImages={3} />
                </div>


                <div className="md:hidden">
                    <ImageUploader optional={true} idx={idx} setForm={setVariants} form={variant} maxImages={3} />
                </div>
            </div>
        </div>
    );
}