import { ActivityIcon, LayersIcon, ImageIcon, BarChartIcon } from "lucide-react";

export default function BannerStats({ banners }) {
    if (!banners || banners.length === 0) return null;

    // Calculate generic stats
    const totalBanners = banners.length;
    const activeBanners = banners.filter(b => b.isActive).length;
    const inactiveBanners = totalBanners - activeBanners;

    // Group banners by category
    const categoryCounts = banners.reduce((acc, banner) => {
        if (banner.type === "hero" || banner.type === "promo") {
            acc["Homepage/Promo"] = (acc["Homepage/Promo"] || 0) + 1;
        } else if (banner.categoryId?.name) {
            acc[banner.categoryId.name] = (acc[banner.categoryId.name] || 0) + 1;
        } else {
            acc["Uncategorized"] = (acc["Uncategorized"] || 0) + 1;
        }
        return acc;
    }, {});

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Banners Card */}
            <div className="p-6 bg-white border rounded-xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">Total Banners</p>
                    <h3 className="text-3xl font-bold mt-1 text-gray-800">{totalBanners}</h3>
                </div>
                <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                    <ImageIcon className="w-6 h-6" />
                </div>
            </div>

            {/* Active Banners Card */}
            <div className="p-6 bg-white border rounded-xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">Active</p>
                    <h3 className="text-3xl font-bold mt-1 text-green-600">{activeBanners}</h3>
                </div>
                <div className="bg-green-50 p-3 rounded-full text-green-600">
                    <ActivityIcon className="w-6 h-6" />
                </div>
            </div>

            {/* Inactive Banners Card */}
            <div className="p-6 bg-white border rounded-xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">Inactive</p>
                    <h3 className="text-3xl font-bold mt-1 text-gray-600">{inactiveBanners}</h3>
                </div>
                <div className="bg-gray-100 p-3 rounded-full text-gray-500">
                    <LayersIcon className="w-6 h-6" />
                </div>
            </div>

            {/* Category Breakdown Card */}
            <div className="p-6 bg-white border rounded-xl shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                    <BarChartIcon className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-gray-500 font-medium">By Category</p>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-20 pr-2 custom-scrollbar">
                    {Object.entries(categoryCounts).map(([cat, count]) => (
                        <div key={cat} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700 truncate max-w-[120px]" title={cat}>{cat}</span>
                            <span className="bg-purple-100 text-purple-700 py-0.5 px-2 rounded-full text-xs font-semibold">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
