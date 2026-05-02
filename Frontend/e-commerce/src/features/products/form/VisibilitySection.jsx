import { Eye, EyeOff, Star, ToggleRight, ArrowLeft } from "lucide-react";

export default function VisibilitySection({ register, errors, watch }) {
    return (
        <div className="card bg-base-100 shadow-sm border border-base-200 mt-4">
            <div className="card-body gap-5 p-4 md:p-6">
                {/* ── Section Header ── */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-5 rounded-full bg-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-base-content/60">
                        Visibility & Status
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Active Toggle */}
                    <div className="bg-base-200/50 rounded-xl p-5 flex items-start gap-4">
                        <div className="p-3 bg-success/10 rounded-lg shrink-0">
                            {watch("isActive") ? (
                                <Eye className="w-5 h-5 text-success" />
                            ) : (
                                <EyeOff className="w-5 h-5 text-base-content/40" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-base-content text-sm">
                                        Product Active
                                    </h3>
                                    <p className="text-xs text-base-content/50 mt-1">
                                        When active, this product is visible to customers
                                        and can be purchased.
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    {...register("isActive")}
                                    className="toggle toggle-success"
                                />
                            </div>
                            <div className="mt-3">
                                <span
                                    className={`badge badge-sm ${watch("isActive")
                                        ? "badge-success"
                                        : "badge-ghost"
                                        }`}
                                >
                                    {watch("isActive") ? "Live" : "Draft"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Toggle */}
                    <div className="bg-base-200/50 rounded-xl p-5 flex items-start gap-4">
                        <div className="p-3 bg-warning/10 rounded-lg shrink-0">
                            <Star
                                className={`w-5 h-5 ${watch("isFeatured")
                                    ? "text-warning fill-warning"
                                    : "text-base-content/40"
                                    }`}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-base-content text-sm">
                                        Featured Product
                                    </h3>
                                    <p className="text-xs text-base-content/50 mt-1">
                                        Featured products appear in highlighted sections
                                        on the homepage and category pages.
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    {...register("isFeatured")}
                                    className="toggle toggle-warning"
                                />
                            </div>
                            <div className="mt-3">
                                <span
                                    className={`badge badge-sm ${watch("isFeatured")
                                        ? "badge-warning"
                                        : "badge-ghost"
                                        }`}
                                >
                                    {watch("isFeatured") ? "Featured" : "Standard"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-base-200/30 rounded-xl p-4 mt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/40 mb-3">
                        Summary
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <span
                            className={`badge ${watch("isActive")
                                ? "badge-success badge-outline"
                                : "badge-ghost"
                                }`}
                        >
                            <ToggleRight className="w-3 h-3 mr-1" />
                            {watch("isActive") ? "Active" : "Inactive"}
                        </span>
                        <span
                            className={`badge ${watch("isFeatured")
                                ? "badge-warning badge-outline"
                                : "badge-ghost"
                                }`}
                        >
                            <Star className="w-3 h-3 mr-1" />
                            {watch("isFeatured") ? "Featured" : "Not Featured"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
