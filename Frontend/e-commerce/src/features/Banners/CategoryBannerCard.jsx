import { Image } from "lucide-react";

export default function CategoryBannerCard({
  category,
  bannerInfo,
  onInputChange,
  onImageChange,
  onSave,
  isLoading,
  colorGradient,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-2">
      {/* Category Header */}
      <div className={`h-20 bg-gradient-to-r ${colorGradient} p-4 flex items-end`}>
        <h3 className="text-white font-bold text-center text-lg">{category}</h3>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Image Upload */}
        <div className="relative group cursor-pointer h-40 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={
              bannerInfo.img
                ? URL.createObjectURL(bannerInfo.img)
                : bannerInfo.defaultImage
            }
            className="w-full h-full object-cover transition group-hover:scale-110"
            alt={category}
          />
          <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <input
              type="file"
              className="hidden"
              onChange={(e) => onImageChange(e.target.files[0])}
              accept="image/*"
            />
            <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full">
              <Image className="text-white" size={24} />
            </div>
          </label>
        </div>

        {/* Title Inputs */}
        <div className="space-y-3">
          <input
            type="text"
            onChange={(e) => onInputChange("titleTop", e.target.value)}
            value={bannerInfo.titleTop}
            placeholder="Top text"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
          />
          <input
            type="text"
            onChange={(e) => onInputChange("titleMiddle", e.target.value)}
            value={bannerInfo.titleMiddle}
            placeholder="Main text"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-semibold text-gray-900 placeholder-gray-500"
          />
          <input
            type="text"
            onChange={(e) => onInputChange("titleBottom", e.target.value)}
            value={bannerInfo.titleBottom}
            placeholder="Bottom text"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
            </span>
          ) : (
            `Save ${category}`
          )}
        </button>
      </div>
    </div>
  );
}
