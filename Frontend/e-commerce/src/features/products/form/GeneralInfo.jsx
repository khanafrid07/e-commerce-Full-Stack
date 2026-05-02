import {
    Type,
    Link2,
    AlignLeft,
    Layers,
    FolderTree,
    Users,
} from "lucide-react";
import { MAIN_CATEGORIES, SUB_CATEGORIES, GENDERS } from "../config/categoryConfig";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";

function toSlug(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function GeneralInfo({
    register,
    errors,
    watch,
    setValue,
    deleteImages,
    setDeleteImages,
    formData,
    setFormData,
}) {
    const selectedMain = watch("category.main");
    const subs = SUB_CATEGORIES[selectedMain] ?? [];

    const title = watch("title");
    const features = watch("keyFeatures") || [];
    const tags = watch("tags") || [];

    useEffect(() => {
        if (title) {
            setValue("slug", toSlug(title));
        }
    }, [title, setValue]);


    useEffect(() => {
        if (!watch("keyFeatures")) {
            setValue("keyFeatures", [""]);
        }
    }, []);

    const handleAddFeature = () => {
        setValue("keyFeatures", [...features, ""]);
    };

    const handleFeatureChange = (index, value) => {
        const updated = [...features];
        updated[index] = value;
        setValue("keyFeatures", updated);
    };

    const handleFeatureRemove = (index) => {
        setValue(
            "keyFeatures",
            features.filter((_, i) => i !== index)
        );
    };

    const [tagInput, setTagInput] = useState("");

    const addTag = () => {
        const value = tagInput.trim().toLowerCase();
        if (!value || tags.includes(value)) return;

        setValue("tags", [...tags, value]);
        setTagInput("");
    };

    const removeTag = (tagToRemove) => {
        setValue(
            "tags",
            tags.filter((t) => t !== tagToRemove)
        );
    };

    return (
        <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body gap-4 p-3 grid grid-cols-1 md:grid-cols-[4fr_2fr]">

                <div className="space-y-5">

                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1 h-5 rounded-full bg-primary" />
                        <h2 className="text-sm font-bold uppercase tracking-widest text-base-content/60">
                            General Information
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2">

                        <div className="form-control">
                            <label className="label pb-1">
                                <span className="label-text font-semibold flex gap-2 items-center">
                                    <Type className="w-4 h-4 text-primary" />
                                    Product Title
                                </span>
                            </label>
                            <input
                                {...register("title")}
                                className="input input-bordered focus:input-primary"
                                placeholder="Product title"
                            />
                            <p className="text-error text-xs">{errors.title?.message}</p>
                        </div>

                        <div className="form-control flex flex-col">
                            <label className="label pb-1">
                                <span className="label-text font-semibold flex gap-2 items-center">
                                    <Link2 className="w-4 h-4 text-primary" />
                                    Slug
                                </span>
                            </label>
                            <input
                                {...register("slug")}
                                className="input input-bordered focus:input-primary"
                            />
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <textarea
                        {...register("description")}
                        className="textarea w-[90%] textarea-bordered focus:textarea-primary"
                        rows={6}

                        placeholder="Product description..."
                    />

                    {/* FEATURES */}
                    <div>
                        <p className="font-semibold mb-2">Key Features</p>

                        {features.map((f, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input
                                    value={f}
                                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                <button
                                    type="button"
                                    className="btn btn-error btn-sm"
                                    onClick={() => handleFeatureRemove(i)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={handleAddFeature}
                        >
                            + Add Feature
                        </button>
                    </div>

                    {/* TAGS */}
                    <div>
                        <p className="font-semibold mb-2">Tags</p>

                        {/* INPUT */}
                        <div className="flex gap-2 mb-2">
                            <input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addTag();
                                    }
                                }}
                                className="input input-bordered w-full"
                                placeholder="e.g. cleanser, hydration"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="btn btn-primary"
                            >
                                Add
                            </button>
                        </div>

                        {/* TAG LIST */}
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => removeTag(tag)}
                                    >
                                        ✕
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CATEGORY */}
                    <div className="grid sm:grid-cols-3 gap-4">

                        <select
                            {...register("category.main")}
                            className="select select-bordered"
                        >
                            <option value="">Main Category</option>
                            {MAIN_CATEGORIES.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>

                        <select
                            {...register("category.sub")}
                            className="select select-bordered"
                        >
                            <option value="">Sub Category</option>
                            {subs.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>

                        <select
                            {...register("category.gender")}
                            className="select select-bordered"
                        >
                            <option value="">Gender</option>
                            {GENDERS.map((g) => (
                                <option key={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    <ImageUploader
                        deleteImages={deleteImages}
                        setDeleteImages={setDeleteImages}
                        form={formData}
                        setForm={setFormData}
                    />


                </div>
            </div>
        </div>
    );
}